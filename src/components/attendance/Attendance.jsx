import React from "react";
import {
    Alert,
    Box,
    Checkbox,
    Chip,
    Divider,
    FormControl,
    FormLabel,
    Input,
    LinearProgress,
    Sheet,
    Stack,
    Table,
    Typography,
} from "@mui/joy";
import {useDispatch, useSelector} from "react-redux";
import {FaCheck, FaTimes} from "react-icons/fa";
import {fetchCustomerData} from "../../state/Customers.jsx";

const STORAGE_KEY = "attendanceState";
const TEMP_STAFF = [
    {id: "temp-1", name: "Ramesh Patel"},
    {id: "temp-2", name: "Mahesh Sharma"},
    {id: "temp-3", name: "Suresh Yadav"},
    {id: "temp-4", name: "Amit Kumar"},
    {id: "temp-5", name: "Vijay Singh"},
];

const toDateInputValue = (date) => {
    const value = new Date(date);
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const getMonthStart = () => toDateInputValue(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

const getToday = () => toDateInputValue(new Date());

const getDateKey = (date) => toDateInputValue(date);

const getAttendanceKey = (staffId, dateKey) => `${staffId}:${dateKey}`;

const buildDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) {
        return [];
    }

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
        return [];
    }

    const dates = [];
    const cursor = new Date(start);

    while (cursor <= end) {
        dates.push({
            key: getDateKey(cursor),
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

const getSavedAttendance = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
        return {};
    }
};

const extractDeliveryStaff = (users = []) => {
    return users
        .filter((user) => user?.courier_boys?.[0]?.login?.role === 2)
        .map((user) => ({
            id: user.courier_boys[0].id,
            name: user.name || user.courier_boys[0].name || `Staff ${user.courier_boys[0].id}`,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
};

export default function Attendance() {
    const dispatch = useDispatch();
    const customerState = useSelector((state) => state.customers);
    const staff = React.useMemo(
        () => {
            const deliveryStaff = extractDeliveryStaff(customerState?.data?.userdata);
            return deliveryStaff.length > 0 ? deliveryStaff : TEMP_STAFF;
        },
        [customerState?.data?.userdata],
    );

    const [startDate, setStartDate] = React.useState(getMonthStart);
    const [endDate, setEndDate] = React.useState(getToday);
    const [search, setSearch] = React.useState("");
    const [attendance, setAttendance] = React.useState(getSavedAttendance);

    React.useEffect(() => {
        if (!customerState?.data && !customerState?.isLoading) {
            dispatch(fetchCustomerData());
        }
    }, [customerState?.data, customerState?.isLoading, dispatch]);

    React.useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(attendance));
    }, [attendance]);

    const dates = React.useMemo(() => buildDateRange(startDate, endDate), [startDate, endDate]);
    const validRange = startDate && endDate && new Date(startDate) <= new Date(endDate);

    const visibleDates = React.useMemo(() => [...dates].reverse(), [dates]);
    const filteredStaff = React.useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) {
            return staff;
        }
        return staff.filter((person) => person.name.toLowerCase().includes(query));
    }, [search, staff]);

    const visibleKeys = React.useMemo(() => {
        return filteredStaff.flatMap((person) =>
            visibleDates.map((date) => getAttendanceKey(person.id, date.key)),
        );
    }, [filteredStaff, visibleDates]);

    const presentCount = visibleKeys.reduce((count, key) => count + (attendance[key] ? 1 : 0), 0);
    const totalCount = visibleKeys.length;
    const absentCount = totalCount - presentCount;

    const setAttendanceValue = (staffId, dateKey, checked) => {
        setAttendance((current) => ({
            ...current,
            [getAttendanceKey(staffId, dateKey)]: checked,
        }));
    };

    const handleTableWheel = (event) => {
        const container = event.currentTarget;

        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || container.scrollWidth <= container.clientWidth) {
            return;
        }

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
                paddingX:1
                // p: 2,
            }}
        >
            <Stack gap={1.5} sx={{height: "100%"}}>
                <Stack
                    direction={{xs: "column", md: "row"}}
                    gap={1.5}
                    alignItems={{xs: "stretch", md: "flex-end"}}
                    justifyContent="space-between"
                >
                    <Stack gap={0.5}>
                        <Typography level="h3">Attendance</Typography>
                        <Typography level="body-sm" textColor="neutral.600">
                            Mark delivery staff present or absent for the selected days.
                        </Typography>
                    </Stack>

                    <Stack direction={{xs: "column", sm: "row"}} gap={1} alignItems={{sm: "flex-end"}}>
                        <FormControl size="sm">
                            <FormLabel>Start Date</FormLabel>
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(event) => {
                                    setStartDate(event.target.value);
                                }}
                            />
                        </FormControl>
                        <FormControl size="sm">
                            <FormLabel>End Date</FormLabel>
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(event) => {
                                    setEndDate(event.target.value);
                                }}
                            />
                        </FormControl>
                        <FormControl size="sm">
                            <FormLabel>Search</FormLabel>
                            <Input
                                placeholder="Name"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                        </FormControl>
                    </Stack>
                </Stack>

                <Stack
                    direction={{xs: "column", lg: "row"}}
                    gap={1}
                    alignItems={{xs: "stretch", lg: "center"}}
                    justifyContent="space-between"
                >
                    <Stack direction="row" gap={1} flexWrap="wrap">
                        <Chip color="success" variant="soft">Present: {presentCount}</Chip>
                        <Chip color="danger" variant="soft">Absent: {absentCount}</Chip>
                    </Stack>
                </Stack>

                {!validRange ? (
                    <Alert color="warning" variant="soft">
                        Select a valid date range.
                    </Alert>
                ) : null}

                {customerState?.isLoading ? <Box
                    sx={{
                        height: "10px",
                    }}
                ><LinearProgress /></Box> : null}

                <Divider />

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
                                <th key={date.key} style={{width: 96, textAlign: "center"}}>
                                    <Typography level="body-xs" fontWeight="lg">{date.label}</Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {validRange && filteredStaff.map((person) => (
                            <tr key={person.id}>
                                <td>
                                    <Typography level="body-sm" fontWeight="lg">{person.name}</Typography>
                                </td>
                                {visibleDates.map((date) => {
                                    const key = getAttendanceKey(person.id, date.key);
                                    const checked = Boolean(attendance[key]);
                                    return (
                                        <td
                                            key={key}
                                            onClick={() => setAttendanceValue(person.id, date.key, !checked)}
                                            style={{
                                                backgroundColor: checked ? "#dcfce7" : "#fee2e2",
                                                cursor: "pointer",
                                                textAlign: "center",
                                                transition: "background-color 120ms ease",
                                            }}
                                        >
                                            <Checkbox
                                                size="sm"
                                                color={checked ? "success" : "danger"}
                                                checked={checked}
                                                checkedIcon={<FaCheck />}
                                                uncheckedIcon={<FaTimes />}
                                                slotProps={{input: {"aria-label": `${person.name} ${date.key}`}}}
                                                onClick={(event) => event.stopPropagation()}
                                                onChange={(event) => setAttendanceValue(person.id, date.key, event.target.checked)}
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    {validRange && filteredStaff.length === 0 ? (
                        <Stack alignItems="center" justifyContent="center" sx={{height: 180}}>
                            <Typography textColor="neutral.600">
                                No delivery staff found.
                            </Typography>
                        </Stack>
                    ) : null}
                </Sheet>
            </Stack>
        </Box>
    );
}
