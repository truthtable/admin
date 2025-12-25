// src/redux/reducers/deliveryReducer.js
import {
    DELETE_DELIVERY,
    DELETE_DELIVERY_SUCCESS,
    FETCH_DELIVERIES_FAILURE,
    FETCH_DELIVERIES_REQUEST,
    FETCH_DELIVERIES_SUCCESS,
    INIT_STATE,
    UPDATE_DELIVERY_SUCCESS,
    UPDATE_DELIVERY_SUCCESS_RESET,
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
        case FETCH_DELIVERIES_SUCCESS: {
            // Merge old + new
            const merged = [
                ...(state.deliveries ? state.deliveries : []),
                ...action.payload,
            ];

            // Keep the last occurrence of each id (new data replaces old)
            const uniqueDeliveries = merged.filter(
                (delivery, index, self) =>
                    index ===
                    self.findLastIndex((d) => d.id === delivery.id),
            );

            return {
                loading: false,
                deliveries: uniqueDeliveries,
                error: false,
                updateSuccess: false,
            };
        }
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
        //DANGER ZONE
        case DELETE_DELIVERY_SUCCESS: {
            console.log("deleteDeliverySuccess : ", action.payload);
            console.log("state : ", state);
            const ids = Array.isArray(action.payload) ? action.payload : [action.payload];
            //remove these id deliveries from state
            return {
                deliveries: state.deliveries
                    ? state.deliveries.filter(
                        (delivery) => !ids.includes(delivery.id),
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
