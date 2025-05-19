import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_DELIVERY_HISTORY, getLoginData } from "../services/Api";

export const fetchDeliveryHistory = createAsyncThunk(
     "delivery/fetchDeliveryHistory",
     async () => {
          let error = true;
          let data = null;
          let errorMessage = "";
          try {
               const token = getLoginData()?.token;
               const response = await fetch(GET_DELIVERY_HISTORY, {
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
          return { data, error, errorMessage };
     },
);

const deliverySlice = createSlice({
     name: "delivery",
     initialState: {
          isLoading: false,
          data: null,
          isError: false,
          errorMessage: "",
     },
     extraReducers: (builder) => {
          builder.addCase(fetchDeliveryHistory.pending, (state, action) => {
               state.isLoading = true;
          });
          builder.addCase(fetchDeliveryHistory.fulfilled, (state, action) => {
               state.isLoading = false;
               state.data = action.payload.data;
               state.isError = action.payload.error;
               state.errorMessage = action.payload.errorMessage;
          });
          builder.addCase(fetchDeliveryHistory.rejected, (state, action) => {
               state.isLoading = false;
               state.isError = true;
          });
     },
});

export default deliverySlice.reducer;
