import {
     FETCH_GAS_REQUEST,
     FETCH_GAS_SUCCESS,
     FETCH_GAS_FAILURE,
     GAS_INI,
} from "../actions/gasAction";

const initialState = {
     gasLoading: false,
     gasList: [],
     gasError: false,
};

const newGasReducer = (state = initialState, action) => {
     switch (action.type) {
          case FETCH_GAS_REQUEST:
               return {
                    ...state,
                    gasLoading: true,
                    gasError: false,
               };
          case FETCH_GAS_SUCCESS:
               return {
                    gasLoading: false,
                    gasList: action.payload,
                    gasError: false,
               };
          case FETCH_GAS_FAILURE:
               return {
                    gasLoading: false,
                    gasList: [],
                    gasError: true,
               };
          case GAS_INI:
               return {
                    gasLoading: false,
                    gasList: [],
                    gasError: false,
               };
          default:
               return state;
     }
};
export default newGasReducer;
