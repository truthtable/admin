import {
    FETCH_ITEMS_REQUEST,
    FETCH_ITEMS_SUCCESS,
    FETCH_ITEMS_FAILURE,
    CREATE_ITEM_SUCCESS,
    UPDATE_ITEM_SUCCESS,
    DELETE_ITEM_SUCCESS,
} from '../actions/purchaseOrderItemActions';

const initialState = {
    loading: false,
    items: [],
    error: null,
};

const purchaseOrderItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEMS_REQUEST:
            return { ...state, loading: true };
        case FETCH_ITEMS_SUCCESS:
            return { ...state, loading: false, items: action.payload };
        case FETCH_ITEMS_FAILURE:
            return { ...state, loading: false, error: action.error };
        case CREATE_ITEM_SUCCESS:
            return { ...state, items: [...state.items, action.payload] };
        case UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                items: state.items.map(item => item.id === action.payload.id ? action.payload : item),
            };
        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
                loading: false,
            };
        default:
            return state;
    }
};

export default purchaseOrderItemReducer;
