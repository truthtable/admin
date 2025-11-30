import {createSlice} from "@reduxjs/toolkit";
import {axiosInstance as axios, URL as API_URL} from "../../services/Api.jsx";

const purchaseKgSlice = createSlice({
    name: "purchaseKg",
    initialState: {
        isSuccessful: false,
        isLoading: false,
        error: null,
        kg: null,
    },
    reducers: {
        purchaseKgSuccess: (state, action) => {
            state.isSuccessful = true;
            state.isLoading = false;
            state.error = null;
            state.kg = action.payload;
        },
        purchaseKgFailed: (state, action) => {
            state.isSuccessful = false;
            state.isLoading = false;
            state.error = action.payload;
        },
        purchaseKgLoading: (state) => {
            state.isLoading = true;
            state.isSuccessful = false;
            state.error = null;
        },
        purchaseKgReset: (state) => {
            state.isSuccessful = false;
            state.isLoading = false;
            state.error = null;
            state.kg = null;
        },
    },
});
export const getPurchaseKg = (dates) => async (dispatch) => {
    try {
        dispatch(purchaseKgSlice.actions.purchaseKgLoading());
        const api_url = API_URL + `api/get-total-ordersKg?startDate=${dates.startDate}&endDate=${dates.endDate}`;
        const response = await axios().get(api_url);
        if (response?.data?.success) {
            dispatch(purchaseKgSlice.actions.purchaseKgSuccess(response?.data?.totalKg));
        } else {
            dispatch(purchaseKgSlice.actions.purchaseKgFailed(response.message));
        }
    } catch (e) {
        console.log(e);
        dispatch(purchaseKgSlice.actions.purchaseKgFailed(e.message));
    }
}
export const resetPurchaseKg = () => async (dispatch) => {
    dispatch(purchaseKgSlice.actions.purchaseKgReset());
}
export default purchaseKgSlice.reducer;