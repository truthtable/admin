import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UPDATE_DELIVERY } from "../services/Api";
import { json_to_x_www_form_urlencoded } from "./UpdateGas";

export const updateDelivery = createAsyncThunk(
     "delivery/updateDelivery",
     async (data) => {
          let isSuccessful = false;
          let error = true;
          let errorMessage = "";
          try {
               const response = await fetch(UPDATE_DELIVERY + data.id, {
                    method: "put",
                    headers: new Headers({
                         "Content-Type": "application/x-www-form-urlencoded",
                    }),
                    body: json_to_x_www_form_urlencoded(data.data),
               });
               const result = await response.json();
               isSuccessful = result.isSuccessful;
               console.log(result);
               error = false;
          } catch (e) {
               console.warn(e);
               error = true;
               errorMessage = e.message;
          }
          return { isSuccessful, error, errorMessage };
     },
);

const updateDeliverySlice = createSlice({
     name: "updateDelivery",
     initialState: {
          isSuccessful: false,
          isLoading: false,
          isError: false,
          errorMessage: "",
     },
     extraReducers: (builder) => {
          builder.addCase(updateDelivery.pending, (state, action) => {
               state.isLoading = true;
          });
          builder.addCase(updateDelivery.fulfilled, (state, action) => {
               state.isLoading = false;
               state.isError = action.payload.error;
               state.errorMessage = action.payload.errorMessage;
               state.isSuccessful = action.payload.isSuccessful;
          });
          builder.addCase(updateDelivery.rejected, (state, action) => {
               state.isLoading = false;
               state.isError = true;
          });
     },
});

export default updateDeliverySlice.reducer;
