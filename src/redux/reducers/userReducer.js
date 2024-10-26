import {
     FETCH_USER_REQUEST,
     FETCH_USER_SUCCESS,
     FETCH_USER_FAILURE,
} from "../actions/userActions";

const initialState = {
     userDataLoading: false,
     users: null,
     userDataError: false,
};
const userReducer = (state = initialState, action) => {
     switch (action.type) {
          case FETCH_USER_REQUEST:
               return {
                    ...state,
                    userDataLoading: true,
                    userDataError: false,
               };
          case FETCH_USER_SUCCESS:
               return {
                    userDataLoading: false,
                    users: action.payload,
                    userDataError: false,
               };
          case FETCH_USER_FAILURE:
               return {
                    userDataLoading: false,
                    users: null,
                    userDataError: true,
               };
          default:
               return state;
     }
};
export default userReducer;
