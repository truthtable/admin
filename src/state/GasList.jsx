import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GAS_DATA } from "../services/Api";

export const fetchGasData = createAsyncThunk("gas/fetchGasData", async () => {
     let error = true;
     let data = null;
     let errorMessage = "";
     try {
          const response = await fetch(GAS_DATA, {
               method: "get",
               headers: new Headers({
                    "ngrok-skip-browser-warning": "69420",
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
     return { data, error, errorMessage };
});

const gasSlice = createSlice({
     name: "gas",
     initialState: {
          isLoading: false,
          data: null,
          isError: false,
          errorMessage: "",
     },
     extraReducers: (builder) => {
          builder.addCase(fetchGasData.pending, (state, action) => {
               state.isLoading = true;
          });
          builder.addCase(fetchGasData.fulfilled, (state, action) => {
               state.isLoading = false;
               state.data = action.payload.data;
               state.isError = action.payload.error;
               state.errorMessage = action.payload.errorMessage;
          });
          builder.addCase(fetchGasData.rejected, (state, action) => {
               state.isLoading = false;
               state.isError = true;
          });
     },
});

export default gasSlice.reducer;
