import React from "react";
import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControl,
    FormLabel,
    Input,
    LinearProgress,
    Sheet,
    Stack,
    Table,
    Tooltip,
    Typography,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import {
    fetchAttendance,
    optimisticToggle,
    rollbackToggle,
    toggleAttendance,
} from "../../redux/reducers/attendanceSlice.js";

/* ─── date helpers ─── */
const toDateInputValue = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const getMonthStart = () =>
    toDateInputValue(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

const getMonthEnd = () =>
    toDateInputValue(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));

const getToday = () => toDateInputValue(new Date());

const buildDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return [];
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);
    if (isNaN(start) || isNaN(end) || start > end) return [];
    const dates = [];
    const cursor = new Date(start);
    while (cursor <= end) {
        const key = toDateInputValue(cursor);
        dates.push({
            key,
            label: cursor.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            }),
        });
        cursor.setDate(cursor.getDate() + 1);
    }
    return dates;
};

/* ─── staff extraction ─── */
/**
 * API returns logins[] with role=2. Each login has:
 *   .id                              — login id (used as delivery_boy_login_id in POST)
 *   .courier_boy.user.name           — Laravel serialises camelCase relation as snake_case
 */
const extractStaff = (records = []) =>
    records
        .map((rec) => ({
            loginId: rec.id,
            name:
                rec.courier_boy?.user?.name ||
                rec.courier_boy?.name ||
                rec.username ||
                `Staff #${rec.id}`,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

/* ─── component ─── */
export default function Attendance() {
    const dispatch = useDispatch();
    const attendanceState = useSelector((state) => state.attendance);

    const [startDate, setStartDate] = React.useState(getMonthStart);
    const [endDate, setEndDate] = React.useState(getMonthEnd);
    const [search, setSearch] = React.useState("");
    const [sortDir, setSortDir] = React.useState(
        () => localStorage.getItem("attendance_sortDir") || "desc"
    ); // "asc" | "desc"


    /* Fetch whenever date range changes */
    React.useEffect(() => {
        if (!startDate || !endDate) return;
        if (new Date(startDate) > new Date(endDate)) return;
        dispatch(fetchAttendance({ startDate, endDate }));
    }, [startDate, endDate, dispatch]);

    const dates = React.useMemo(
        () => buildDateRange(startDate, endDate),
        [startDate, endDate],
    );
    const visibleDates = React.useMemo(
        () => sortDir === "desc" ? [...dates].reverse() : [...dates],
        [dates, sortDir],
    );
    const validRange =
        startDate && endDate && new Date(startDate) <= new Date(endDate);

    const staff = React.useMemo(
        () => extractStaff(attendanceState.records),
        [attendanceState.records],
    );

    const filteredStaff = React.useMemo(() => {
        const q = search.trim().toLowerCase();
        return q ? staff.filter((p) => p.name.toLowerCase().includes(q)) : staff;
    }, [search, staff]);

    const map = attendanceState.map;
    const toggling = attendanceState.toggling;

    const getChecked = (loginId, dateKey) => Boolean(map[`${loginId}:${dateKey}`]);

    /* Toggle handler: optimistic update + API call with rollback on error */
    const handleToggle = (loginId, dateKey, currentChecked) => {
        const key = `${loginId}:${dateKey}`;
        if (toggling[key]) return;
        dispatch(optimisticToggle({ key, currentChecked }));
        dispatch(toggleAttendance({ delivery_boy_login_id: loginId, created_at: dateKey }))
            .unwrap()
            .catch(() => {
                dispatch(rollbackToggle({ key, currentChecked }));
            });
    };

    const handleTableWheel = (event) => {
        const container = event.currentTarget;
        if (
            Math.abs(event.deltaY) <= Math.abs(event.deltaX) ||
            container.scrollWidth <= container.clientWidth
        ) return;
        event.preventDefault();
        container.scrollLeft += event.deltaY;
    };

    return (
        <Box
            sx={{
                backgroundColor: "white",
                color: "neutral.900",
                height: "100%",
                overflow: "hidden",
                paddingTop: 1,
                paddingX: 1,
            }}
        >
            <Stack gap={1.5} sx={{ height: "100%" }}>
                {/* Header row */}
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    gap={1.5}
                    alignItems={{ xs: "stretch", md: "flex-end" }}
                    justifyContent="space-between"
                >
                    <Stack gap={0.5}>
                        <Typography level="h3">Attendance</Typography>
                        <Typography level="body-sm" textColor="neutral.600">
                            Mark delivery staff present or absent for the selected days.
                        </Typography>
                    </Stack>

                    <Stack direction={{ xs: "column", sm: "row" }} gap={1} alignItems={{ sm: "flex-end" }}>
                        <FormControl size="sm">
                            <FormLabel>Sort order</FormLabel>
                            <Tooltip
                                title={sortDir === "desc" ? "Newest first" : "Oldest first"}
                                placement="top"
                            >
                                <Button
                                    size="sm"
                                    variant="outlined"
                                    color="neutral"
                                    startDecorator={sortDir === "desc" ? <TbSortDescending /> : <TbSortAscending />}
                                    onClick={() => {
                                        setSortDir((d) => {
                                            const next = d === "desc" ? "asc" : "desc";
                                            localStorage.setItem("attendance_sortDir", next);
                                            return next;
                                        });
                                    }}
                                    aria-label="Toggle date sort order"
                                >
                                    Sort
                                </Button>
                            </Tooltip>
                        </FormControl>
                        <FormControl size="sm">
                            <FormLabel>Start Date</FormLabel>
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </FormControl>
                        <FormControl size="sm">
                            <FormLabel>End Date</FormLabel>
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </FormControl>
                        <FormControl size="sm">
                            <FormLabel>Search</FormLabel>
                            <Input
                                placeholder="Name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </FormControl>
                    </Stack>
                </Stack>



                {/* Alerts */}
                {!validRange && (
                    <Alert color="warning" variant="soft">Select a valid date range.</Alert>
                )}
                {attendanceState.isError && (
                    <Alert color="danger" variant="soft">
                        {attendanceState.errorMessage || "Failed to load attendance."}
                    </Alert>
                )}

                {/* Loading bar */}
                {attendanceState.isLoading && (
                    <Box sx={{ height: "10px" }}>
                        <LinearProgress />
                    </Box>
                )}

                <Divider />

                {/* Table */}
                <Sheet
                    variant="outlined"
                    onWheel={handleTableWheel}
                    sx={{
                        borderRadius: "sm",
                        flex: 1,
                        minHeight: 0,
                        overflow: "auto",
                    }}
                >
                    <Table
                        stickyHeader
                        hoverRow
                        size="sm"
                        sx={{
                            minWidth: Math.max(760, 190 + visibleDates.length * 96),
                            "--TableCell-headBackground": "var(--joy-palette-neutral-100)",
                            "& thead th:first-of-type, & tbody td:first-of-type": {
                                backgroundClip: "padding-box",
                                left: 0,
                                maxWidth: 190,
                                minWidth: 190,
                                position: "sticky",
                                width: 190,
                            },
                            "& thead th:first-of-type": {
                                backgroundColor: "neutral.100",
                                boxShadow: "1px 0 0 var(--joy-palette-divider)",
                                top: 0,
                                zIndex: 20,
                            },
                            "& tbody td:first-of-type": {
                                backgroundColor: "background.surface",
                                boxShadow: "1px 0 0 var(--joy-palette-divider)",
                                zIndex: 10,
                            },
                        }}
                    >
                        <thead>
                            <tr>
                                <th>Name</th>
                                {visibleDates.map((date) => (
                                    <th key={date.key} style={{ width: 70, textAlign: "center" }}>
                                        <Typography level="body-xs" fontWeight="lg">
                                            {date.label}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {validRange &&
                                filteredStaff.map((person) => (
                                    <tr key={person.loginId}>
                                        <td>
                                            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
                                                <Typography
                                                    level="body-sm"
                                                    fontWeight="lg"
                                                    //dont break text
                                                    noWrap
                                                >
                                                    {person.name}
                                                </Typography>
                                                <Typography
                                                    level="body-xs"
                                                    sx={{ fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}
                                                >
                                                    {(() => {
                                                        const p = visibleDates.filter((d) => getChecked(person.loginId, d.key)).length;
                                                        const a = visibleDates.length - p;
                                                        return (
                                                            <>
                                                                <span style={{ color: "#16a34a" }}>P:{p}</span>
                                                                <span style={{ color: "#a2a8b2ff" }}> | </span>
                                                                <span style={{ color: "#dc2626" }}>A:{a}</span>
                                                            </>
                                                        );
                                                    })()}
                                                </Typography>
                                            </Stack>
                                        </td>
                                        {visibleDates.map((date) => {
                                            const key = `${person.loginId}:${date.key}`;
                                            const checked = getChecked(person.loginId, date.key);
                                            const inFlight = Boolean(toggling[key]);
                                            return (
                                                <td
                                                    key={key}
                                                    onClick={() =>
                                                        handleToggle(person.loginId, date.key, checked)
                                                    }
                                                    style={{
                                                        backgroundColor: inFlight
                                                            ? "#f3f4f6"
                                                            : checked
                                                                ? "#dcfce7"
                                                                : "#fee2e2",
                                                        cursor: inFlight ? "wait" : "pointer",
                                                        textAlign: "center",
                                                        transition: "background-color 120ms ease",
                                                    }}
                                                >
                                                    {inFlight ? (
                                                        <CircularProgress size="sm" sx={{ "--CircularProgress-size": "16px" }} />
                                                    ) : (
                                                        <Checkbox
                                                            size="sm"
                                                            color={checked ? "success" : "danger"}
                                                            checked={checked}
                                                            checkedIcon={<FaCheck />}
                                                            uncheckedIcon={<FaTimes />}
                                                            slotProps={{
                                                                input: {
                                                                    "aria-label": `${person.name} ${date.key}`,
                                                                },
                                                            }}
                                                            onClick={(e) => e.stopPropagation()}
                                                            onChange={() =>
                                                                handleToggle(person.loginId, date.key, checked)
                                                            }
                                                        />
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                        </tbody>
                    </Table>

                    {validRange && !attendanceState.isLoading && filteredStaff.length === 0 && (
                        <Stack alignItems="center" justifyContent="center" sx={{ height: 180 }}>
                            <Typography textColor="neutral.600">No delivery staff found.</Typography>
                        </Stack>
                    )}
                </Sheet>
            </Stack>
        </Box>
    );
}
