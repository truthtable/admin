import {
     INIT_STATE,
     FETCH_REQUEST,
     FETCH_SUCCESS,
     FETCH_FAILURE,
} from "../actions/customerActions";

const initialState = {
     customersLoading: false,
     customers: [],
     customersError: false,
};

const customersReducer = (state = initialState, action) => {
     switch (action.type) {
          case INIT_STATE:
               return {
                    customersLoading: false,
                    customers: [],
                    customersError: false,
               };
          case FETCH_REQUEST:
               return {
                    ...state,
                    customersLoading: true,
                    customersError: false,
               };
          case FETCH_SUCCESS:
               return {
                    customersLoading: false,
                    customers: action.payload,
                    customersError: false,
               };
          case FETCH_FAILURE:
               return {
                    customersLoading: false,
                    customers: [],
                    customersError: true,
               };
          default:
               return state;
     }
};

export default customersReducer;
