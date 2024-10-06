import {
     FETCH_USER_REQUEST,
     FETCH_USER_SUCCESS,
     FETCH_USER_FAILURE,
} from "../actions/userActions";

const initialState = {
     userDataLoading: false,
     users: null,
     userDataError: "",
};
const userReducer = (state = initialState, action) => {
     switch (action.type) {
          case FETCH_USER_REQUEST:
               return {
                    ...state,
                    userDataLoading: true,
               };
          case FETCH_USER_SUCCESS:
               return {
                    userDataLoading: false,
                    users: action.payload,
                    userDataError: "",
               };
          case FETCH_USER_FAILURE:
               return {
                    userDataLoading: false,
                    users: null,
                    userDataError: action.payload,
               };
          default:
               return state;
     }
};
export default userReducer;
