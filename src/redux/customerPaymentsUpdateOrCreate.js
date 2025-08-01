import { createSlice } from "@reduxjs/toolkit";
import {
     axiosInstance as axios,
     UPDATE_CUSTOMER_PAYMENTS,
} from "../services/Api";

const customerPaymentsUpdateOrCreateSlice = createSlice({
     name: "customerPaymentsUpdateOrCreate",
     initialState: {
          isCustomerPaymentsUpdateOrCreateLoading: false,
          isCustomerPaymentsUpdateOrCreateError: false,
          customerPaymentsUpdateOrCreateErrorMessage: "",
          isCustomerPaymentsUpdateOrCreateSuccess: false,
     },
     reducers: {
          customerPaymentsUpdateOrCreateLoading: (state) => {
               state.isCustomerPaymentsUpdateOrCreateLoading = true;
               state.isCustomerPaymentsUpdateOrCreateError = false;
               state.isCustomerPaymentsUpdateOrCreateSuccess = false;
          },
          customerPaymentsUpdateOrCreateSuccess: (state) => {
               state.isCustomerPaymentsUpdateOrCreateLoading = false;
               state.isCustomerPaymentsUpdateOrCreateError = false;
               state.isCustomerPaymentsUpdateOrCreateSuccess = true;
          },
          customerPaymentsUpdateOrCreateError: (state, action) => {
               state.isCustomerPaymentsUpdateOrCreateLoading = false;
               state.isCustomerPaymentsUpdateOrCreateError = true;
               state.customerPaymentsUpdateOrCreateErrorMessage =
                    action.payload;
               state.isCustomerPaymentsUpdateOrCreateSuccess = false;
          },
          customerPaymentsUpdateOrCreateReset: (state) => {
               state.isCustomerPaymentsUpdateOrCreateLoading = false;
               state.isCustomerPaymentsUpdateOrCreateError = false;
               state.customerPaymentsUpdateOrCreateErrorMessage = "";
               state.isCustomerPaymentsUpdateOrCreateSuccess = false;
          },
     },
});
export const updateOrCreateCustomerPayments = (payload) => async (dispatch) => {
     dispatch(customerPaymentsUpdateOrCreateLoading());
     try {
          const response = await axios().post(
               UPDATE_CUSTOMER_PAYMENTS,
               payload,
          );
          console.log(response.data);
          dispatch(customerPaymentsUpdateOrCreateSuccess());
     } catch (error) {
          console.log(error);
          dispatch(
               customerPaymentsUpdateOrCreateError(
                    error.message ||
                         "Failed to update or create customer payments",
               ),
          );
     }
};

export const {
     customerPaymentsUpdateOrCreateLoading,
     customerPaymentsUpdateOrCreateSuccess,
     customerPaymentsUpdateOrCreateError,
     customerPaymentsUpdateOrCreateReset,
} = customerPaymentsUpdateOrCreateSlice.actions;

export default customerPaymentsUpdateOrCreateSlice.reducer;
