import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CUSTOMER_DATA } from "../services/Api";

export const fetchCustomerData = createAsyncThunk(
     "customer/fetchCustomerData",
     async () => {
          let error = true;
          let data = null;
          let errorMessage = "";
          try {
               const response = await fetch(CUSTOMER_DATA, {
                    method: "get",
                    headers: new Headers({
                         "ngrok-skip-browser-warning": "69420",
                    }),
               });
               data = await response.json();
               error = false;
          } catch (e) {
               console.warn(e);
               error = true;
               errorMessage = e.message;
          }
          return { data, error, errorMessage };
     },
);

const customerSlice = createSlice({
     name: "customer",
     initialState: {
          isLoading: false,
          data: null,
          isError: false,
          errorMessage: "",
     },
     extraReducers: (builder) => {
          builder.addCase(fetchCustomerData.pending, (state, action) => {
               state.isLoading = true;
          });
          builder.addCase(fetchCustomerData.fulfilled, (state, action) => {
               state.isLoading = false;
               state.data = action.payload.data;
               state.isError = action.payload.error;
               state.errorMessage = action.payload.errorMessage;
          });
          builder.addCase(fetchCustomerData.rejected, (state, action) => {
               state.isLoading = false;
               state.isError = true;
          });
     },
});

export default customerSlice.reducer;