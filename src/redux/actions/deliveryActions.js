// src/redux/actions/deliveryActions.js
import axios from "axios";

// Action Types
export const FETCH_DELIVERIES_REQUEST = "FETCH_DELIVERIES_REQUEST";
export const FETCH_DELIVERIES_SUCCESS = "FETCH_DELIVERIES_SUCCESS";
export const FETCH_DELIVERIES_FAILURE = "FETCH_DELIVERIES_FAILURE";

// Action Creators
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

const API = "https://adminsr.life/public/api/delivery";

// Async Action to Fetch Deliveries
export const fetchDeliveries = () => {
     return async (dispatch) => {
          dispatch(fetchDeliveriesRequest());
          try {
               const response = await axios.get(API);
               const deliveries = response.data;
               dispatch(fetchDeliveriesSuccess(deliveries));
          } catch (error) {
               dispatch(fetchDeliveriesFailure(error.message));
          }
     };
};
