import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { json_to_x_www_form_urlencoded } from "./UpdateGas";
import {DELETE_GAS_DELIVERY, INSERT_GAS_DELIVERY} from "../services/Api.jsx";

export const gasDeliverys = createAsyncThunk(
    "gasDeliverys/gasDeliverys",
    async (data) => {
        let isSuccessful = false;
        let error = true;
        let errorMessage = "";

        try {
            if(data.opration=="insert"){
                const response = await fetch(INSERT_GAS_DELIVERY, {
                    method: "post",
                    headers: new Headers({
                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                console.log(result);
                isSuccessful = result.isSuccessFull;
                error = false;
            }
            if(data.opration=="delete"){
                const response = await fetch(DELETE_GAS_DELIVERY + data.id, {
                    method: "delete",
                    headers: new Headers({
                        "Content-Type": "application/x-www-form-urlencoded",
                    }),
                });
                const result = await response.json();
                console.log(result);
                isSuccessful = result.isSuccessFull;
                error = false;
            }
        } catch (e) {
            console.warn(e);
            error = true;
            errorMessage = e.message;
        }
        return { isSuccessful, error, errorMessage };
    },
);

const gasDeliverysSlice = createSlice(
    {
        name: "gasDeliverys",
        initialState: {
            isSuccessful: false,
            isLoading: false,
            isError: false,
            errorMessage: "",
        },
        extraReducers: (builder) => {
            builder.addCase(gasDeliverys.pending, (state, action) => {
                state.isLoading = true;
            });
            builder.addCase(gasDeliverys.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccessful = action.payload.isSuccessful;
                state.isError = action.payload.error;
                state.errorMessage = action.payload.errorMessage;
            });
        },
    }
);

export default gasDeliverysSlice.reducer;