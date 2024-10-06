import axios from "axios";

// Action Types
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

// Action Creators
export const fetchUserRequest = () => ({
     type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (user) => ({
     type: FETCH_USER_SUCCESS,
     payload: user,
});

export const fetchUserFailure = (error) => ({
     type: FETCH_USER_FAILURE,
     payload: error,
});

const API = "https://adminsr.life/public/api/userData";

// Async Action to Fetch User
export const fetchUser = () => {
     return async (dispatch) => {
          dispatch(fetchUserRequest());
          try {
               const response = await axios.get(API);
               const user = response.data;
               dispatch(fetchUserSuccess(user));
          } catch (error) {
               dispatch(fetchUserFailure(error.message));
          }
     };
};
