import { createSlice } from "@reduxjs/toolkit";
import { getLocalCustomers, storeCustomer } from "../../db/db.js";

const localCustomersSlice = createSlice({
     name: "localCustomers",
     initialState: {
          customers: [],
          isSuccessful: false,
     },
     reducers: {
          getLocalCustomersSuccess: (state, action) => {
               state.customers = action.payload;
          },
          storeCustomerSuccess: (state) => {
               state.isSuccessful = true;
          },
     },
});

export const fetchLocalCustomers = () => async (dispatch) => {
     try {
          const customers = await getLocalCustomers();
          dispatch(getLocalCustomersSuccess(customers));
     } catch (error) {
          console.error("Failed to fetch local customers:", error);
     }
};
export const { getLocalCustomersSuccess, storeCustomerSuccess } =
     localCustomersSlice.actions;
export default localCustomersSlice.reducer;
