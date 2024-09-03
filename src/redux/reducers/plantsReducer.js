import {
     GET_PLANTS,
     GET_PLANTS_SUCCESS,
     GET_PLANTS_FAILURE,
     GET_PLANTS_REQUEST,
     GET_PLANTS_INIT,
} from "../actions/plantsActions.js";

const initialState = {
     plants: [],
     plantsLoading: false,
     plantsError: null,
     plantsUpdateSuccess: false,
};

export const plantsReducer = (state = initialState, action) => {
     switch (action.type) {
          case GET_PLANTS_INIT:
               return {
                    state,
               };
          case GET_PLANTS:
               return {
                    ...state,
                    plantsLoading: true,
                    plantsError: null,
               };
          case GET_PLANTS_SUCCESS:
               return {
                    ...state,
                    plants: action.payload,
                    plantsLoading: false,
                    plantsError: null,
               };
          case GET_PLANTS_FAILURE:
               return {
                    ...state,
                    plantsLoading: false,
                    plantsError: action.error,
                    plantsUpdateSuccess: false,
               };

          default:
               return state;
     }
};

export default plantsReducer;
