import {
    CREATE_WAREHOUSE_REQUEST,
    CREATE_WAREHOUSE_SUCCESS,
    DELETE_WAREHOUSE_FAILURE,
    DELETE_WAREHOUSE_REQUEST,
    DELETE_WAREHOUSE_SUCCESS,
    FETCH_WAREHOUSES_FAILURE,
    FETCH_WAREHOUSES_REQUEST,
    FETCH_WAREHOUSES_SUCCESS,
    UPDATE_WAREHOUSE_FAILURE,
    UPDATE_WAREHOUSE_REQUEST,
    UPDATE_WAREHOUSE_SUCCESS,
    CREATE_WAREHOUSE_FAILURE
} from "../actions/warehouseActions.js";

const initialState = {
    loading: false,
    warehouses: [],
    error: null,
};

const warehouseReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WAREHOUSES_REQUEST:
        case CREATE_WAREHOUSE_REQUEST:
        case UPDATE_WAREHOUSE_REQUEST:
        case DELETE_WAREHOUSE_REQUEST:
            return {...state, loading: true};
        case FETCH_WAREHOUSES_SUCCESS:
            return {...state, loading: false, warehouses: action.payload};
        case CREATE_WAREHOUSE_SUCCESS:
            return {...state, loading: false, warehouses: [...state.warehouses, action.payload]};
        case UPDATE_WAREHOUSE_SUCCESS:
            return {
                ...state,
                loading: false,
                warehouses: state.warehouses.map(warehouse =>
                    warehouse.id === action.payload.id ? action.payload : warehouse
                ),
            };
        case DELETE_WAREHOUSE_SUCCESS:
            return {
                ...state,
                loading: false,
                warehouses: state.warehouses.filter(warehouse => warehouse.id !== action.payload),
            };
        case FETCH_WAREHOUSES_FAILURE:
        case CREATE_WAREHOUSE_FAILURE:
        case UPDATE_WAREHOUSE_FAILURE:
        case DELETE_WAREHOUSE_FAILURE:
            return {...state, loading: false, error: action.error};
        default:
            return state;
    }
};

export default warehouseReducer;