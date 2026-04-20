import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CUSTOMER_DATA} from "../services/Api";
import {storeCustomer} from "../db/db";
import {fetchLocalCustomers} from "../redux/localData/localCustomers.js";

export const fetchCustomerData = createAsyncThunk(
    "customer/fetchCustomerData",
    async (_, {dispatch}) => {
        let error = true;
        let data = null;
        let errorMessage = "";
        try {
            const token = sessionStorage.getItem("authToken");
            const response = await fetch(CUSTOMER_DATA + "?isAdmin=" + true, {
                method: "get",
                headers: new Headers({
                    "ngrok-skip-browser-warning": "69420",
                    Authorization: `Bearer ${token}`,
                }),
            });
            data = await response.json();
            // Fixed: use && instead of || and check if arrays have length
            if (data?.data && data?.userdata && data.data.length > 0 && data.userdata.length > 0) {
                try {
                    const customers = data.data;
                    const users = data.userdata;
                    customers.forEach((customer) => {
                        const user = users.find((user) => user.id == customer.user_id);
                        if (user) { // Check if user exists before accessing properties
                            //console.log(user, customer);
                            storeCustomer(
                                customer.id,
                                customer.user_id,
                                user.name,
                                customer.aadhar_card_no,
                                customer.diaryNumber,
                                user.address,
                                user.phone_no,
                                (Number(customer.totalPrice) - Number(customer.totalPaid)) + Number(customer.deliveryBalance)
                            );
                        }
                    });
                    dispatch(fetchLocalCustomers());
                } catch (e) {
                    console.log(e);
                }
            }
            error = false;
        } catch (e) {
            console.warn(e);
            error = true;
            errorMessage = e.message;
        }
        return {data, error, errorMessage};
    },
);

const customerSlice = createSlice({
    name: "customer",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
        errorMessage: "",
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCustomerData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCustomerData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.isError = action.payload.error;
            state.errorMessage = action.payload.errorMessage;
        });
        builder.addCase(fetchCustomerData.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export default customerSlice.reducer;