// src/redux/actions/deliveryActions.js
import { axiosInstance as axios, URL } from "../../services/Api";

// Action Types
export const INIT_STATE = "DELIVERIES_INIT_STATE";
export const FETCH_DELIVERIES_REQUEST = "FETCH_DELIVERIES_REQUEST";
export const FETCH_DELIVERIES_SUCCESS = "FETCH_DELIVERIES_SUCCESS";
export const FETCH_DELIVERIES_FAILURE = "FETCH_DELIVERIES_FAILURE";
export const UPDATE_DELIVERY_SUCCESS = "UPDATE_DELIVERY_SUCCESS";
export const UPDATE_DELIVERY_SUCCESS_RESET = "UPDATE_DELIVERY_SUCCESS_RESET";
export const DELETE_DELIVERY = "DELETE_DELIVERY";
export const DELETE_DELIVERY_SUCCESS = "DELETE_DELIVERY_SUCCESS";

// Action Creators
export const initialState = () => ({
     type: INIT_STATE,
});

export const fetchDeliveriesRequest = () => ({
     type: FETCH_DELIVERIES_REQUEST,
});

export const fetchDeliveriesSuccess = (deliveries) => ({
     type: FETCH_DELIVERIES_SUCCESS,
     payload: deliveries,
});

export const fetchDeliveriesFailure = (error) => ({
     type: FETCH_DELIVERIES_FAILURE,
     payload: error,
});

export const updateDeliveryRequest = () => ({
     type: FETCH_DELIVERIES_REQUEST,
});

export const updateDeliverySuccess = (deliveries) => ({
     type: UPDATE_DELIVERY_SUCCESS,
     payload: deliveries,
});

export const deleteDelivery = () => ({
     type: DELETE_DELIVERY,
});

export const deleteDeliverySuccess = (id) => ({
     type: DELETE_DELIVERY_SUCCESS,
     payload: id,
});

const API = URL + "api/delivery";
const GAS_API = URL + "api/gasDeliverys";

//initial state
export const deliveriesIniState = () => {
     return async (dispatch) => {
          dispatch(initialState());
     };
};

// Async Action to Fetch Deliveries
export const fetchDeliveries = (params) => {
     return async (dispatch) => {
          dispatch(fetchDeliveriesRequest());
          try {
               const response = await axios().get(API, {
                    params: params,
               });
               //let deliveries = response.data.noData ? [] : [...response.data];
               const deliveries = response.data.noData
                    ? []
                    : JSON.parse(JSON.stringify(response.data));
               dispatch(fetchDeliveriesSuccess(deliveries));
          } catch (error) {
               console.log("error", error);
               dispatch(fetchDeliveriesFailure(error.message));
          }
     };
};

//update delivery
export const updateDelivery = (delivery) => {
     console.log("req", delivery);
     return async (dispatch) => {
          dispatch(updateDeliveryRequest());
          //console.log("updateDelivery : ", delivery);
          try {
               let response;
               if (
                    delivery.columnName != null &&
                    (delivery.columnName == "quantity" ||
                         delivery.columnName == "price")
               ) {
                    response = await axios().put(
                         `${GAS_API}/${delivery.id}`,
                         delivery,
                    );
               } else {
                    response = await axios().put(
                         `${API}/${delivery.id}`,
                         delivery,
                    );
               }
               //console.log("res", response.data);
               const deliveries = response.data;
               if (deliveries.success == false) {
                    //error
                    dispatch(fetchDeliveriesFailure(deliveries.message));
               } else {
                    dispatch(updateDeliverySuccess(deliveries));
               }
          } catch (error) {
               console.log("error", error);
               dispatch(fetchDeliveriesFailure(error.message));
          }
     };
};

//delete delivery
export const deleteDeliveryById = (id) => {
     console.log("deleteDeliveryById : ", id);
     if (id == null) {
          return;
     }
     return async (dispatch) => {
          try {
               dispatch(deleteDelivery());
               let response = await axios().delete(`${API}/${id}`);
               console.log("res", response.data);
               const deliveries = response.data;
               if (deliveries.success == false) {
                    //error
                    dispatch(fetchDeliveriesFailure(deliveries.message));
               } else {
                    dispatch(deleteDeliverySuccess(id));
               }
          } catch (error) {
               dispatch(fetchDeliveriesFailure(error.message));
          }
     };
};

export const updateDeliverySuccessReset = () => async (dispatch) => {
     dispatch({
          type: UPDATE_DELIVERY_SUCCESS_RESET,
     });
};
