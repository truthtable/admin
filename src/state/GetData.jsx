import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetData = createAsyncThunk(
     "data/fetchGetData",
     async (url) => {
          let error = true;
          let data = null;
          let errorMessage = "";
          const turl = url + "?" + new URLSearchParams({
               startDate: getStartDate(),
               endDate: getEndDate(),
          }).toString();
          console.log(turl);
          try {
               const response = await fetch(turl, {
                    method: "get",
               });
               data = await response.json();
               //get X-Log-Data
               const xLogData = response.headers.get("X-Log-Data");
               //urldecode
               const urlDecodedXLogData = decodeURIComponent(xLogData);
               console.log(urlDecodedXLogData);
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

const getStartDate = () => {
     const firstDateOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

     const year = firstDateOfCurrentMonth.getFullYear();
     const month = String(firstDateOfCurrentMonth.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
     const day = String(firstDateOfCurrentMonth.getDate()).padStart(2, '0');

     const formattedDate = `${year}-${month}-${day}`;
     return formattedDate;
}
const getEndDate = () => {
     const lastDateOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

     const year = lastDateOfCurrentMonth.getFullYear();
     const month = String(lastDateOfCurrentMonth.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
     const day = String(lastDateOfCurrentMonth.getDate()).padStart(2, '0');

     const formattedDate = `${year}-${month}-${day}`;
     return formattedDate;
}