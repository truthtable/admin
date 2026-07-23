import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ATTENDANCE_URL } from "../../services/Api";

const getToken = () => sessionStorage.getItem("authToken");

/**
 * Fetch attendance for all delivery boys within [startDate, endDate].
 * Returns array of login objects each with nested .attendance array.
 */
export const fetchAttendance = createAsyncThunk(
    "attendance/fetch",
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            const res = await fetch(
                `${ATTENDANCE_URL}?startDate=${startDate}&endDate=${endDate}`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        Accept: "application/json",
                    },
                },
            );
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

/**
 * Toggle attendance for one delivery boy on one date.
 * Payload: { delivery_boy_login_id: number, created_at: "YYYY-MM-DD" }
 */
export const toggleAttendance = createAsyncThunk(
    "attendance/toggle",
    async ({ delivery_boy_login_id, created_at }, { rejectWithValue }) => {
        try {
            const res = await fetch(ATTENDANCE_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ delivery_boy_login_id, created_at }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json(); // updated Attendance record
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);

/**
 * attendanceMap: { "<loginId>:<YYYY-MM-DD>": bool }
 * attendance=true means present.
 */
const buildMap = (records) => {
    const map = {};
    records.forEach((loginRecord) => {
        (loginRecord.attendance || []).forEach((a) => {
            const dateKey = a.created_at.split("T")[0].split(" ")[0]; // "YYYY-MM-DD"
            map[`${loginRecord.id}:${dateKey}`] = Boolean(a.attendance);
        });
    });
    return map;
};

const attendanceSlice = createSlice({
    name: "attendance",
    initialState: {
        records: [],       // raw API response array
        map: {},           // { "loginId:YYYY-MM-DD": bool }
        isLoading: false,
        isError: false,
        errorMessage: "",
        toggling: {},      // { "loginId:YYYY-MM-DD": true } – cells currently in-flight
    },
    reducers: {
        // Optimistic toggle – flip map immediately before API round-trip.
        // currentChecked is the effective displayed value (handles undefined-as-true for July 2026+).
        optimisticToggle(state, action) {
            const { key, currentChecked } = action.payload;
            state.map[key] = !currentChecked;
        },
        // Roll back to original value if API fails
        rollbackToggle(state, action) {
            const { key, currentChecked } = action.payload;
            state.map[key] = currentChecked;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendance.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = "";
            })
            .addCase(fetchAttendance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.records = action.payload;
                state.map = buildMap(action.payload);
            })
            .addCase(fetchAttendance.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload ?? "Failed to fetch attendance";
            })
            .addCase(toggleAttendance.pending, (state, action) => {
                const { delivery_boy_login_id, created_at } = action.meta.arg;
                state.toggling[`${delivery_boy_login_id}:${created_at}`] = true;
            })
            .addCase(toggleAttendance.fulfilled, (state, action) => {
                const { delivery_boy_login_id, created_at } = action.meta.arg;
                const key = `${delivery_boy_login_id}:${created_at}`;
                state.map[key] = Boolean(action.payload.attendance);
                delete state.toggling[key];
            })
            .addCase(toggleAttendance.rejected, (state, action) => {
                const { delivery_boy_login_id, created_at } = action.meta.arg;
                delete state.toggling[`${delivery_boy_login_id}:${created_at}`];
            });
    },
});

export const { optimisticToggle, rollbackToggle } = attendanceSlice.actions;
export default attendanceSlice.reducer;
