import {EXPENSES_FAILURE, EXPENSES_REQUEST, EXPENSES_SUCCESS, INIT_STATE,} from "../actions/expencesActions";

const initialState = {
    expenceLoading: false,
    expenses: null,
    expenceError: false,
};

const expencesReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_STATE:
            return {
                expenceLoading: false,
                expenses: [],
                expenceError: false,
            };
        case EXPENSES_REQUEST:
            return {
                ...state,
                expenceLoading: true,
                expenceErroxr: false,
            };
        case EXPENSES_SUCCESS:
            return {
                expenceLoading: false,
                expenses: action.payload,
                expenceError: false,
            };
        case EXPENSES_FAILURE:
            return {
                expenceLoading: false,
                expenses: [],
                expenceError: true,
            };
        default:
            return state;
    }
};

export default expencesReducer;
