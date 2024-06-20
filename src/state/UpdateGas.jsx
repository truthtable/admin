import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UPDATE_GAS } from "../services/Api";
export const updateGas = createAsyncThunk(
     "gas/updateGas",
     async (data) => {
          let isSuccessful = false;
          let error = true;
          let errorMessage = "";
          //x-www-form-urlencoded payload
          let payload = json_to_x_www_form_urlencoded({ price: data.price });
          console.log(payload);
          try {
               const response = await fetch(UPDATE_GAS + data.id, {
                    method: "put",
                    headers: new Headers({
                         "Content-Type": "application/x-www-form-urlencoded",
                    }),
                    body: payload,
               });
               const result = await response.json();
               isSuccessful = result.result;
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
const updateGasSlice = createSlice({
     name: "updateGas",
     initialState: {
          isSuccessful: false,
          isLoading: false,
          isError: false,
          errorMessage: "",
     },
     extraReducers: (builder) => {
          builder.addCase(updateGas.pending, (state, action) => {
               state.isLoading = true;
          });
          builder.addCase(updateGas.fulfilled, (state, action) => {
               state.isLoading = false;
               state.isError = action.payload.error;
               state.errorMessage = action.payload.errorMessage;
               state.isSuccessful = action.payload.isSuccessful;
          });
          builder.addCase(updateGas.rejected, (state, action) => {
               state.isLoading = false;
               state.isError = true;
          });
     },
});
export default updateGasSlice.reducer;
export const json_to_x_www_form_urlencoded = (json) => {
     const data = Object.keys(json)
          .map(function (key) {
               return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
          })
          .join("&");
     return data
}