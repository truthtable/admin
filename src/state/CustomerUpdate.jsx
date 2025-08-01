import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { json_to_x_www_form_urlencoded } from "./UpdateGas";
import { getLoginData } from "../services/Api";


export const updateCustomer = createAsyncThunk(
     "customer/updateCustomer",
     async (data) => {
          let isSuccessful = false;
          let error = true;
          let errorMessage = "";

          //console.log(data);

          if (data.reset) {
               error = false;
               console.log("reset");
               return { isSuccessful, error, errorMessage };
          }

          // let url = UPDATE_CUSTOMER;

          // if (data.updateUser) {
          //      url = UPDATE_USER;
          // }

          try {
               //console.log(data.url);
               const token = getLoginData()?.token;
               const response = await fetch(data.url, {
                    method: "put",
                    headers: new Headers({
                         "Content-Type": "application/x-www-form-urlencoded",
                         Authorization: `Bearer ${token}`,
                    }),
                    body: json_to_x_www_form_urlencoded(data.data),
               });
               const result = await response.json();
               isSuccessful = result.isSuccesfull;
               console.log(result, isSuccessful);
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