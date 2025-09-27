import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {json_to_x_www_form_urlencoded} from "./UpdateGas";
import {axiosInstance as axios, URL} from "../services/Api.jsx";
import {removeAllLocalCustomers} from "../db/db.js";


export const updateCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async (data) => {
        let isSuccessful = false;
        let error = true;
        let errorMessage = "";

        //console.log(data);

        if (data.reset) {
            error = false;
            //console.log("reset");
            return {isSuccessful, error, errorMessage};
        }

        try {
            //console.log(data.url);
            const token = sessionStorage.getItem("authToken");
            const response = await fetch(data.url, {
                method: "put",
                headers: new Headers({
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                }),
                body: json_to_x_www_form_urlencoded(data.data),
            });
            const result = await response.json();
            isSuccessful = result.isSuccesfull;
            console.log({result, isSuccessful});
            error = false;
        } catch (e) {
            console.warn(e);
            error = true;
            errorMessage = e.message;
        }
        return {isSuccessful, error, errorMessage};
    },
);
export const deleteCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (userId) => {
        let isSuccessful = false;
        let error = true;
        let errorMessage = "";
        let deleted = null;
        try {
            const response = await axios().post(
                `${URL}api/deleteCustomer`,
                {userId: userId}
            );
            const result = await response.data;
            if (result.success) {
                isSuccessful = true;
                error = false;
                deleted = true;
                await removeAllLocalCustomers()
                //refresh page
                alert(result.message)
                window.location.reload();
            } else {
                errorMessage = result.message;
                deleted = false;
                error = true;
                isSuccessful = false;
                alert("Error: " + result);
            }
        } catch (e) {
            alert(e.response.data);
            console.warn(e);
            error = true;
            errorMessage = e.message;
        }
        return {isSuccessful, error, errorMessage, deleted};
    },
);
const updateCustomerSlice = createSlice({
    name: "updateCustomer",
    initialState: {
        isSuccessful: false,
        isLoading: false,
        isError: false,
        errorMessage: "",
        deleted: null
    },
    extraReducers: (builder) => {
        builder.addCase(updateCustomer.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateCustomer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload.error;
            state.errorMessage = action.payload.errorMessage;
            state.isSuccessful = action.payload.isSuccessful;
        });
        builder.addCase(updateCustomer.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export default updateCustomerSlice.reducer;