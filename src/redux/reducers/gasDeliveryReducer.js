// src/redux/reducers/gasDeliveryReducer.js
import {
     INI_GAS_DELIVERIES,
     GET_GAS_DELIVERIES,
     ADD_GAS_DELIVERY,
     UPDATE_GAS_DELIVERY,
     DELETE_GAS_DELIVERY,
     GAS_DELIVERY_ERROR,
     LOADING,
     UPDATE_CREATE_DELETE,
} from "../actions/gasDeliveryActions";

const initialState = {
     gasDeliverysSucsess: false,
     loading: false,
     error: null,
};

const gasDeliveryReducer = (state = initialState, action) => {
     switch (action.type) {
          case INI_GAS_DELIVERIES:
               return {
                    gasDeliverysSucsess: false,
                    loading: false,
                    error: null,
               };
          case LOADING:
               return {
                    ...state,
                    loading: true,
               };
          case GET_GAS_DELIVERIES:
               return {
                    ...state,
                    gasDeliverysSucsess: true,
                    loading: false,
               };
          case ADD_GAS_DELIVERY:
               return {
                    ...state,
                    gasDeliverysSucsess: true,
                    loading: false,
               };
          case UPDATE_GAS_DELIVERY:
               return {
                    ...state,
                    gasDeliverysSucsess: true,
                    loading: false,
               };
          case DELETE_GAS_DELIVERY:
               return {
                    ...state,
                    gasDeliverysSucsess: true,
                    loading: false,
               };
          case GAS_DELIVERY_ERROR:
               return {
                    ...state,
                    error: action.payload,
                    loading: false,
                    gasDeliverysSucsess: false,
               };
          case UPDATE_CREATE_DELETE:
               return {
                    ...state,
                    gasDeliverysSucsess: true,
                    loading: false,
               };
          default:
               return state;
     }
};

export default gasDeliveryReducer;
