import {axiosInstance as axios, URL} from "../../services/Api";
import {loginInial} from "../authSlice";

export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";
export const ORDER_INIT = "ORDER_INIT";

export const orderIniState = () => async (dispatch) => {
    dispatch({type: ORDER_INIT});
};

export const fetchOrders = (options) => async (dispatch) => {
    dispatch({type: FETCH_ORDERS_REQUEST});
    //console.log("params", options);
    try {
        const response = await axios().get(URL + "api/purchase-orders", {
            params: options,
        });
        let logs = response.headers["x-log-data"];
        logs = decodeURIComponent(logs);
        //console.log("xlog : ", logs);
        //console.log(response.data);
        dispatch({type: FETCH_ORDERS_SUCCESS, payload: response.data});
    } catch (error) {
        //401
        if (error.response.status === 401) {
            dispatch(loginInial());
        }
        dispatch({type: FETCH_ORDERS_FAILURE, error});
    }
};

export const createOrder = (orderData) => async (dispatch) => {
    dispatch({type: FETCH_ORDERS_REQUEST});
    try {
        const response = await axios().post(
            URL + "api/purchase-orders",
            orderData,
        );
        //console.log(response);
        dispatch({type: CREATE_ORDER_SUCCESS, payload: response.data});
    } catch (error) {
        if (error.response.status === 401) {
            dispatch(loginInial());
        }
        dispatch({type: FETCH_ORDERS_FAILURE, error});
    }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
    dispatch({type: FETCH_ORDERS_REQUEST});
    try {
        const response = await axios().put(
            URL + `api/purchase-orders/${id}`,
            orderData,
        );
        console.log(response.data);
        dispatch({type: UPDATE_ORDER_SUCCESS, payload: response.data});
    } catch (error) {
        if (error.response.status === 401) {
            dispatch(loginInial());
        }
        dispatch({type: FETCH_ORDERS_FAILURE, error});
    }
};

export const deleteOrder = (id) => async (dispatch) => {
    dispatch({type: FETCH_ORDERS_REQUEST});
    try {
        await axios().delete(URL + `api/purchase-orders/${id}`);
        dispatch({type: DELETE_ORDER_SUCCESS, payload: id});
    } catch (error) {
        if (error.response.status === 401) {
            dispatch(loginInial());
        }
        dispatch({type: FETCH_ORDERS_FAILURE, error});
    }
};
