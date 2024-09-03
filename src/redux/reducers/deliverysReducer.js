// src/redux/reducers/deliveryReducer.js
import {
     FETCH_DELIVERIES_REQUEST,
     FETCH_DELIVERIES_SUCCESS,
     FETCH_DELIVERIES_FAILURE,
} from "../actions/deliveryActions";

const initialState = {
     loading: false,
     deliveries: [],
     error: "",
};

const deliverysReducer = (state = initialState, action) => {
     switch (action.type) {
          case FETCH_DELIVERIES_REQUEST:
               return {
                    ...state,
                    loading: true,
               };
          case FETCH_DELIVERIES_SUCCESS:
               return {
                    loading: false,
                    deliveries: action.payload,
                    error: "",
               };
          case FETCH_DELIVERIES_FAILURE:
               return {
                    loading: false,
                    deliveries: [],
                    error: action.payload,
               };
          default:
               return state;
     }
};

export default deliverysReducer;
