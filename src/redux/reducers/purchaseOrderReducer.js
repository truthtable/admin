import {
     FETCH_ORDERS_REQUEST,
     FETCH_ORDERS_SUCCESS,
     FETCH_ORDERS_FAILURE,
     CREATE_ORDER_SUCCESS,
     UPDATE_ORDER_SUCCESS,
     DELETE_ORDER_SUCCESS,
     ORDER_INIT,
} from "../actions/purchaseOrderActions";

const initialState = {
     loading: false,
     orders: [],
     error: null,
     updateOrderSuccsess: false,
};

const purchaseOrderReducer = (state = initialState, action) => {
     switch (action.type) {
          case ORDER_INIT:
               return initialState;
          case FETCH_ORDERS_REQUEST:
               return { ...state, loading: true };
          case FETCH_ORDERS_SUCCESS:
               return { ...state, loading: false, orders: action.payload };
          case FETCH_ORDERS_FAILURE:
               return { ...state, loading: false, error: action.error };
          case CREATE_ORDER_SUCCESS:
               return {
                    ...state,
                    orders: [...state.orders, action.payload],
                    loading: false,
               };
          case UPDATE_ORDER_SUCCESS:
               return {
                    ...state,
                    //orders: [...state.orders, action.payload],
                    loading: false,
                    updateOrderSuccsess: true,
               };
          case DELETE_ORDER_SUCCESS:
               return {
                    ...state,
                    orders: state.orders.filter(
                         (order) => order.id !== action.payload,
                    ),
                    loading: false,
               };
          default:
               return state;
     }
};

export default purchaseOrderReducer;
