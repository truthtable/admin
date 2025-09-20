import {createSlice} from "@reduxjs/toolkit";
import {getLocalCustomers, storeCustomer} from "../../db/db.js";

const localCustomersSlice = createSlice({
    name: "localCustomers",
    initialState: {
        customers: await getLocalCustomers(),
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
export const storeLocalCustomer = (list) => async (dispatch) => {
    try {
        for (const customer of list) {
            await storeCustomer(
                customer.id,
                customer.user_id,
                customer.name,
                customer.aadhar_card_no,
                customer.diaryNumber,
                customer.address,
                customer.phone_no,
                customer.totalBalance
            );
        }
        dispatch(storeCustomerSuccess());
    } catch (error) {
        console.error("Failed to store local customers:", error);
    }
}
export const fetchLocalCustomers = () => async (dispatch) => {
    try {
        const customers = await getLocalCustomers();
        dispatch(getLocalCustomersSuccess(customers));
    } catch (error) {
        console.error("Failed to fetch local customers:", error);
    }
};
export const {getLocalCustomersSuccess, storeCustomerSuccess} =
    localCustomersSlice.actions;
export default localCustomersSlice.reducer;
