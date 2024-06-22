import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetData = createAsyncThunk(
     "data/fetchGetData",
     async (url) => {
          let error = true;
          let data = null;
          let errorMessage = "";
          console.log(url);
          try {
               const response = await fetch(url, {
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
const getDataSlice = createSlice(
     {
          name: "getData",
          initialState: {
               data: null,
               isLoading: false,
               isError: false,
               errorMessage: "",
          },
          extraReducers: (builder) => {
               builder.addCase(fetchGetData.pending, (state, action) => {
                    state.isLoading = true;
               });
               builder.addCase(fetchGetData.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = action.payload.error;
                    state.errorMessage = action.payload.errorMessage;
                    state.data = action.payload.data;
               });
               builder.addCase(fetchGetData.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
               });
          },
     },
);

export default getDataSlice.reducer;