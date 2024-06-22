import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SEARCH_CUSTOMER } from "../services/Api";

export const fetchCustomerSearchData = createAsyncThunk(
     "customer/fetchCustomerSearchData",
     async (search) => {
          let error = true;
          let data = [];
          let errorMessage = "";
          //reset if empty ot " " use trim
          if (search.trim() === "") {
               error = false;
               return { data, error, errorMessage };
          }
          try {
               const response = await fetch(
                    SEARCH_CUSTOMER + "?name=" + search,
                    {
                         method: "get",
                         headers: new Headers({
                              "ngrok-skip-browser-warning": "69420",
                         }),
                    },
               );
               let res = await response.json();
               data = res.data;
               error = false;
               //console.log(data);
          } catch (e) {
               console.warn(e);
               error = true;
               errorMessage = e.message;
          }
          return { data, error, errorMessage };
     },
);

const customerSlice = createSlice({
     name: "search_customer",
     initialState: {
          isLoading: false,
          data: [],
          isError: false,
          errorMessage: "",
     },
     extraReducers: (builder) => {
          builder.addCase(fetchCustomerSearchData.pending, (state, action) => {
               state.isLoading = true;
          });
          builder.addCase(fetchCustomerSearchData.fulfilled, (state, action) => {
               state.isLoading = false;
               state.data = action.payload.data;
               state.isError = action.payload.error;
               state.errorMessage = action.payload.errorMessage;
          });
          builder.addCase(fetchCustomerSearchData.rejected, (state, action) => {
               state.isLoading = false;
               state.isError = true;
          });
     },
});

export default customerSlice.reducer;
