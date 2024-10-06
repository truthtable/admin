// src/redux/reducers/deliveryReducer.js
import { update } from "firebase/database";
import {
     INIT_STATE,
     FETCH_DELIVERIES_REQUEST,
     FETCH_DELIVERIES_SUCCESS,
     FETCH_DELIVERIES_FAILURE,
     UPDATE_DELIVERY_SUCCESS,
} from "../actions/deliveryActions";

const initialState = {
     loading: false,
     deliveries: [],
     error: "",
     updateSuccess: false,
};

const deliverysReducer = (state = initialState, action) => {
     switch (action.type) {
          case INIT_STATE:
               return {
                    loading: false,
                    deliveries: [],
                    error: "",
                    updateSuccess: false,
               };
          case FETCH_DELIVERIES_REQUEST:
               return {
                    ...state,
                    loading: true,
                    updateSuccess: false,
               };
          case FETCH_DELIVERIES_SUCCESS:
               return {
                    loading: false,
                    deliveries: action.payload,
                    error: "",
                    updateSuccess: false,
               };
          case FETCH_DELIVERIES_FAILURE:
               return {
                    loading: false,
                    deliveries: [],
                    error: action.payload,
                    updateSuccess: false,
               };
          case UPDATE_DELIVERY_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    updateSuccess: true,
               };
          default:
               return state;
     }
};

export default deliverysReducer;
