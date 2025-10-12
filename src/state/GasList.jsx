import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance, GAS_DATA, URL} from "../services/Api";

export const fetchGasData = createAsyncThunk("gas/fetchGasData", async () => {
    let error = true;
    let data = null;
    let errorMessage = false;
    try {
        const token = sessionStorage.getItem("authToken");
        const response = await fetch(GAS_DATA, {
            method: "get",
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`,
            }),
        });
        data = await response.json();
        //console.log(data);
        error = false;
    } catch (e) {
        console.warn(e);
        error = true;
        errorMessage = e.message;
    }
    return {data, error, errorMessage};
});

// implement update gas
export const updateGasData = createAsyncThunk(
    "gas/updateGasData",
    async (data) => {
        try {
            console.log(data)
            //The updated data is returned from the API
            const response = await axiosInstance().put(
                `${URL}api/gas/${data.id}`,
                data
            )
            return {id: data.id, updatedData: data};
        } catch (e) {
            console.warn(e);
            // Pass the error message to the reducer
            return {error: true, errorMessage: e.message};
        }
    }
);

export const addGasData = createAsyncThunk(
    "gas/addGasData",
    async (data) => {
        try {
            try {
                console.log(data)
                //The updated data is returned from the API
                const response = await axiosInstance().post(
                    `${URL}api/gas`,
                    {
                        company_name: data.company_name,
                        kg: data.kg
                    }
                )
                if (response.data.success) {
                    return {id: data.id, updatedData: data};
                }
                return {id: data.id, updatedData: data};
            } catch (e) {
                console.warn(e);
                // Pass the error message to the reducer
                return {error: true, errorMessage: e.message};
            }
        } catch (e) {
            console.warn(e);
            return {error: true, errorMessage: e.message};
        }
    }
);

const gasSlice = createSlice({
    name: "gas",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
        errorMessage: "",
        updateSuccessful: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGasData.pending, (state, action) => {
            state.data = null;
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(fetchGasData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.isError = false;
        });
        builder.addCase(fetchGasData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });

        // Reducers for updateGasData
        builder.addCase(updateGasData.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = "";
        });
        builder.addCase(updateGasData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updateSuccessful = true;
        });
        builder.addCase(updateGasData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });

        //Reducers for addGasData
        builder.addCase(addGasData.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = "";
        });
        builder.addCase(addGasData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updateSuccessful = true;
        });
        builder.addCase(addGasData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    },
});

export default gasSlice.reducer;
