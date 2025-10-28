import {createSlice} from "@reduxjs/toolkit";
import {axiosInstance as axios} from "../services/Api";

const billSlice = createSlice({
    name: "bill",
    initialState: {
        isBillLoading: false,
        isBillError: false,
        billErrorMessage: "",
        isBillSuccess: false,
    },
    reducers: {
        billLoading: (state) => {
            state.isBillLoading = true;
            state.isBillError = false;
            state.isBillSuccess = false;
        },
        billSuccess: (state) => {
            state.isBillLoading = false;
            state.isBillError = false;
            state.isBillSuccess = true;
        },
        billError: (state, action) => {
            state.isBillLoading = false;
            state.isBillError = true;
            state.billErrorMessage = action.payload;
            state.isBillSuccess = false;
        },
        billReset: (state) => {
            state.isBillLoading = false;
            state.isBillError = false;
            state.billErrorMessage = "";
            state.isBillSuccess = false;
        },
    },
});

export const sendBillToCustomer =
    (link, customerNumber, amount) => async (dispatch) => {
        const transformedLink = transformUrl(link);

        dispatch(billLoading());
        try {
            const response = await axios().post("sendBillSms", {
                link: transformedLink,
                customerNumber,
                amount,
            });
            console.log(response);
            dispatch(billSuccess());
        } catch (error) {
            console.log(error);
            dispatch(billError(error.message || "Failed to send bill"));
        }
    };

export const resetBillState = () => (dispatch) => {
    dispatch(billReset());
};

export const {billLoading, billSuccess, billError, billReset} =
    billSlice.actions;

export default billSlice.reducer;

const transformUrl = (url) => {
    // Remove http:// if present
    const withoutHttp = url.replace(/^http:\/\//, "");

    // Parse the URL to handle query parameters
    const [base, query] = withoutHttp.split("?");

    if (!query) return withoutHttp;

    // Convert query string to object
    const params = new URLSearchParams(query);

    // Set page to 1
    params.set("p", "1");

    // Reconstruct URL
    return `${base}?${params.toString()}`;
};
