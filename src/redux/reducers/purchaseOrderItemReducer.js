import {
     FETCH_ITEMS_REQUEST,
     FETCH_ITEMS_SUCCESS,
     FETCH_ITEMS_FAILURE,
     CREATE_ITEM_SUCCESS,
     UPDATE_ITEM_SUCCESS,
     DELETE_ITEM_SUCCESS,
     INITIAL_ITEMS,
} from "../actions/purchaseOrderItemActions";

const initialState = {
     itemLoading: false,
     items: [],
     itemError: null,
     itemUpdateSuccess: false,
};

const purchaseOrderItemReducer = (state = initialState, action) => {
     switch (action.type) {
          case INITIAL_ITEMS:
               return initialState;
          case FETCH_ITEMS_REQUEST:
               return { ...state, itemLoading: true };
          case FETCH_ITEMS_SUCCESS:
               return { ...state, itemLoading: false, items: action.payload };
          case FETCH_ITEMS_FAILURE:
               return {
                    ...state,
                    itemLoading: false,
                    itemError: action.itemError,
               };
          case CREATE_ITEM_SUCCESS:
               return {
                    ...state,
                    itemLoading: false,
                    itemError: null,
                    itemUpdateSuccess: true,
               };
          case UPDATE_ITEM_SUCCESS:
               return {
                    ...state,
                    items: action.payload,
                    itemLoading: false,
                    itemError: null,
                    itemUpdateSuccess: true,
               };
          case DELETE_ITEM_SUCCESS:
               return {
                    ...state,
                    itemLoading: false,
                    itemError: null,
                    itemUpdateSuccess: true,
               };
          default:
               return state;
     }
};

export default purchaseOrderItemReducer;
