import {createSlice} from "@reduxjs/toolkit";
import {axiosInstance as axios, URL as API_URL} from "../../services/Api.jsx";

const gasEditDeliverySlice = createSlice({
    name: "gasEditDelivery",
    initialState: {
        isSuccessful: false,
        isLoading: false,
        error: null,
        response: null,
    },
    reducers: {
        deliverySuccess: (state) => {
            state.isSuccessful = true;
            state.isLoading = false;
            state.error = null;
        },
        deliveryFailed: (state, action) => {
            state.isSuccessful = false;
            state.isLoading = false;
            state.error = action.payload;
        },
        deliveryLoading: (state) => {
            state.isLoading = true;
            state.isSuccessful = false;
            state.error = null;
        },
        deliveryReset: (state) => {
            state.isSuccessful = false;
            state.isLoading = false;
            state.error = null;
            state.response = null;
        },
    },
});
export const addNewGasDeliveryReset = () => async (dispatch) => {
    dispatch(gasEditDeliverySlice.actions.deliveryReset());
}
export const addNewGasDelivery = (deliveryData) => async (dispatch) => {
    try {
        dispatch(gasEditDeliverySlice.actions.deliveryLoading());
        const api_url = API_URL + "api/storeList";
        const linuxEpoch = new Date(deliveryData.timeStamp).getTime() / 1000;
        const mPayload = {
            courier_boy_id: Number(deliveryData.deliverBoyId),
            customer_id: Number(deliveryData.customerId),
            delivery_gas_list: deliveryData.delivery_gas_list,
            received_gas_list: deliveryData.received_gas_list,
            payments: deliveryData.payments,
            created_at: linuxEpoch,
        }
        const response = await axios().post(api_url, mPayload);
        if (response?.data?.isSuccessfull) {
            dispatch(gasEditDeliverySlice.actions.deliverySuccess());
        } else {
            dispatch(gasEditDeliverySlice.actions.deliveryFailed(response.message));
        }
        console.log(response)
    } catch (e) {
        console.log(e);
        dispatch(gasEditDeliverySlice.actions.deliveryFailed(e.message));
    }
}
export const updateGasDeliveryNew = (deliveryData) => async (dispatch) => {
    try {
        dispatch(gasEditDeliverySlice.actions.deliveryLoading());
        const api_url = API_URL + "api/update_delivery_admin";
        const response = await axios().post(api_url, deliveryData);
        if (response?.data?.isSuccessful) {
            console.log("Update successful");
            dispatch(gasEditDeliverySlice.actions.deliverySuccess());
        } else {
            console.log("Update failed");
            dispatch(gasEditDeliverySlice.actions.deliveryFailed(response.message));
        }
        console.log(response)
    } catch (error) {
        console.log(error);
        dispatch(gasEditDeliverySlice.actions.deliveryFailed(error.message));
    }
}
export default gasEditDeliverySlice.reducer;

