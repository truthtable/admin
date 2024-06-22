import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { json_to_x_www_form_urlencoded } from "./UpdateGas";

export const updateCustomer = createAsyncThunk(
     "customer/updateCustomer",
     async (data) => {
          let isSuccessful = false;
          let error = true;
          let errorMessage = "";

          //console.log(data);

          if (data.reset) {
               error = false;
               return { isSuccessful, error, errorMessage };
          }

          // let url = UPDATE_CUSTOMER;

          // if (data.updateUser) {
          //      url = UPDATE_USER;
          // }

          try {
               const response = await fetch(data.url, {
                    method: "put",
                    headers: new Headers({
                         "Content-Type": "application/x-www-form-urlencoded",
                    }),
                    body: json_to_x_www_form_urlencoded(data.data),
               });
               const result = await response.json();
               isSuccessful = result.isSuccesfull;
               //console.log(result);
               error = false;
          } catch (e) {
               console.warn(e);
               error = true;
               errorMessage = e.message;
          }
          return { isSuccessful, error, errorMessage };
     },
);
const updateCustomerSlice = createSlice({
     name: "updateCustomer",
     initialState: {
          isSuccessful: false,
          isLoading: false,
          isError: false,
          errorMessage: "",
     },
     extraReducers: (builder) => {
          builder.addCase(updateCustomer.pending, (state, action) => {
               state.isLoading = true;
          });
          builder.addCase(updateCustomer.fulfilled, (state, action) => {
               state.isLoading = false;
               state.isError = action.payload.error;
               state.errorMessage = action.payload.errorMessage;
               state.isSuccessful = action.payload.isSuccessful;
          });
          builder.addCase(updateCustomer.rejected, (state, action) => {
               state.isLoading = false;
               state.isError = true;
          });
     },
});

export default updateCustomerSlice.reducer;