import {axiosInstance as axios, URL} from "../../services/Api";

// Action Types

export const INIT_STATE = "CUSTOMER_INIT_STATE";
export const FETCH_REQUEST = "CUSTOMER_FETCH_REQUEST";
export const FETCH_SUCCESS = "CUSTOMER_FETCH_SUCCESS";
export const FETCH_FAILURE = "CUSTOMER_FETCH_FAILURE";

// Action Creators
export const initialState = () => ({
    type: INIT_STATE,
});
export const fetchRequest = () => ({
    type: FETCH_REQUEST,
});
export const fetchSuccess = (customers) => ({
    type: FETCH_SUCCESS,
    payload: customers,
});
export const fetchFailure = (error) => ({
    type: FETCH_FAILURE,
    payload: error,
});
const API = URL + "api/customers";
//initial state
export const customersIniState = () => {
    return async (dispatch) => {
        dispatch(initialState());
    };
};
// Async Action to Fetch Customers
export const fetchCustomers = () => {
    //console.log("fetchCustomers");
    return async (dispatch) => {
        dispatch(fetchRequest());
        try {
            const response = await axios().get(API);
            const customers = response.data;
            dispatch(fetchSuccess(customers));
        } catch (error) {
            console.log("customer : ", error);
            dispatch(fetchFailure(error));
        }
    };
};
