import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_COUNTS } from "../services/Api";

export const fetchCount = createAsyncThunk(
     "count/fetchCount",
     async (_, { getState }) => {
          let error = true;
          let data = {
               today_delivery: 0,
               courier_boy_count: 0,
               customer_count: 0,
               gas_count: 0,
          };
          let errorMessage = "";

          const token = getState().login.token;

          //console.log(token);
          try {
               const response = await fetch(GET_COUNTS, {
                    method: "get",
                    headers: new Headers({
                         "ngrok-skip-browser-warning": "69420",
                         Authorization: `Bearer ${token}`,
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

const countSlice = createSlice({
     name: "count",
     initialState: {
          isLoading: false,
          data: {
               today_delivery: 0,
               courier_boy_count: 0,
               customer_count: 0,
               gas_count: 0,
          },
          isError: false,
          errorMessage: "",
     },
     extraReducers: (builder) => {
          builder.addCase(fetchCount.pending, (state, action) => {
               state.isLoading = true;
               state.isError = false;
               state.errorMessage = "";
          });
          builder.addCase(fetchCount.fulfilled, (state, action) => {
               state.isLoading = false;
               state.data = action.payload.data;
               state.isError = action.payload.error;
               state.errorMessage = action.payload.errorMessage;
          });
          builder.addCase(fetchCount.rejected, (state, action) => {
               state.isLoading = false;
               state.isError = true;
          });
     },
});

export default countSlice.reducer;
