// src/redux/actions/deliveryActions.js
import axios from "axios";

// Action Types
export const INIT_STATE = "INIT_STATE";
export const FETCH_DELIVERIES_REQUEST = "FETCH_DELIVERIES_REQUEST";
export const FETCH_DELIVERIES_SUCCESS = "FETCH_DELIVERIES_SUCCESS";
export const FETCH_DELIVERIES_FAILURE = "FETCH_DELIVERIES_FAILURE";
export const UPDATE_DELIVERY_SUCCESS = "UPDATE_DELIVERY_SUCCESS";

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

const API = "https://adminsr.life/public/api/delivery";
const GAS_API = "https://adminsr.life/public/api/gasDeliverys";

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
          console.log(params);
          try {
               const response = await axios.get(API, {
                    params: params,
               });

               let logs = response.headers["x-log-data"];
               //conver url encoded string to json
               logs = decodeURIComponent(logs);
               logs = JSON.parse(logs);
               console.log(logs);

               const deliveries = response.data;
               dispatch(fetchDeliveriesSuccess(deliveries));
          } catch (error) {
               dispatch(fetchDeliveriesFailure(error.message));
          }
     };
};

//update delivery
export const updateDelivery = (delivery) => {
     console.log("req", delivery);
     return async (dispatch) => {
          dispatch(updateDeliveryRequest());
          try {
               let response;
               if (
                    delivery.columnName != null &&
                    (delivery.columnName == "quantity" ||
                         delivery.columnName == "price")
               ) {
                    response = await axios.put(
                         `${GAS_API}/${delivery.id}`,
                         delivery,
                    );
               } else {
                    response = await axios.put(
                         `${API}/${delivery.id}`,
                         delivery,
                    );
               }
               console.log("res", response.data);
               const deliveries = response.data;
               if (deliveries.success == false) {
                    //error
                    dispatch(fetchDeliveriesFailure(deliveries.message));
               } else {
                    dispatch(updateDeliverySuccess(deliveries));
               }
          } catch (error) {
               dispatch(fetchDeliveriesFailure(error.message));
          }
     };
};
