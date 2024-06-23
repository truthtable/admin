import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetData = createAsyncThunk(
     "data/fetchGetData",
     async (url) => {
          let error = true;
          let data = null;
          let errorMessage = "";
          try {
               const response = await fetch(url, {
                    method: "get",
               });
               data = await response.json();
               error = false;
          } catch (e) {
               console.warn(e);
               error = true;
               errorMessage = e.message;
               console.error(errorMessage);
          }
          return { data, error, errorMessage, url };
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
               url: "",
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
                    state.url = action.payload.url;
               });
               builder.addCase(fetchGetData.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
               });
          },
     },
);

export default getDataSlice.reducer;

//funtion for json to object
