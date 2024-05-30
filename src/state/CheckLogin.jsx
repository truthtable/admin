import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CHECK_LOGIN } from "../services/Api";
export const fetchCheckLogin = createAsyncThunk(
     "login/fetchCheckLogin",
     async (token) => {
          let isError = true;
          let errorMessage = "";
          let status = false;
          try {
               const response = await fetch(CHECK_LOGIN, {
                    method: "get",
                    headers: {
                         "ngrok-skip-browser-warning": "69420",
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${token}`,
                    },
               }).catch((e) => {
                    console.warn(e);
                    isError = true;
                    errorMessage = e.message;
               });
               let data = await response.json();
               if (data.status === "true") {
                    status = true;
               }
               isError = false;
          } catch (e) {
               console.warn(e);
               isError = true;
               errorMessage = e.message;
          }
          return { status, isError, errorMessage };
     },
);

const checkLoginSlice = createSlice({
     name: "checkLogin",
     initialState: {
          isLoading: false,
          status: false,
          isError: false,
          errorMessage: "",
     },
     extraReducers: (builder) => {
          builder.addCase(fetchCheckLogin.pending, (state, action) => {
               state.isLoading = true;
          });
          builder.addCase(fetchCheckLogin.fulfilled, (state, action) => {
               state.isLoading = false;
               state.status = action.payload.status;
               state.isError = action.payload.isError;
               state.errorMessage = action.payload.errorMessage;
          });
          builder.addCase(fetchCheckLogin.rejected, (state, action) => {
               state.isLoading = false;
               state.isError = true;
          });
     },
});

export default checkLoginSlice.reducer;
