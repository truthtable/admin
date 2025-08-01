// src/redux/reducers/deliveryReducer.js
import { update } from "firebase/database";
import {
     INIT_STATE,
     FETCH_DELIVERIES_REQUEST,
     FETCH_DELIVERIES_SUCCESS,
     FETCH_DELIVERIES_FAILURE,
     UPDATE_DELIVERY_SUCCESS,
     UPDATE_DELIVERY_SUCCESS_RESET,
     DELETE_DELIVERY_SUCCESS,
     DELETE_DELIVERY,
} from "../actions/deliveryActions";

const initialState = {
     loading: false,
     deliveries: null,
     error: false,
     updateSuccess: false,
};

const deliverysReducer = (state = initialState, action) => {
     switch (action.type) {
          case INIT_STATE:
               return {
                    loading: false,
                    deliveries: null,
                    error: false,
                    updateSuccess: false,
               };
          case FETCH_DELIVERIES_REQUEST:
               return {
                    ...state,
                    loading: true,
                    updateSuccess: false,
                    error: false,
               };
          case FETCH_DELIVERIES_SUCCESS:
               return {
                    loading: false,
                    deliveries: action.payload,
                    error: false,
                    updateSuccess: false,
               };
          case UPDATE_DELIVERY_SUCCESS_RESET:
               return {
                    ...state,
                    updateSuccess: false,
               };
          case FETCH_DELIVERIES_FAILURE:
               return {
                    loading: false,
                    deliveries: null,
                    error: true,
                    updateSuccess: false,
               };
          case UPDATE_DELIVERY_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    updateSuccess: true,
                    error: false,
               };
          case DELETE_DELIVERY: {
               return {
                    ...state,
                    loading: true,
                    updateSuccess: false,
                    error: false,
               };
          }
          case DELETE_DELIVERY_SUCCESS: {
               console.log("deleteDeliverySuccess : ", action.payload);
               console.log("state : ", state);
               const id = action.payload;
               //remove this id delivery from state
               return {
                    deliveries: state.deliveries
                         ? state.deliveries.filter(
                                (delivery) => delivery.id !== id,
                           )
                         : null,
                    loading: false,
                    updateSuccess: true,
                    error: false,
               };
          }
          default:
               return state;
     }
};

export default deliverysReducer;
