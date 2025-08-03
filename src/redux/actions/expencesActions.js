import { axiosInstance as axios, URL } from "../../services/Api";

const API = URL + "api/expenses";

//Action Types
export const INIT_STATE = "EXPENSES_INIT_STATE";
export const EXPENSES_REQUEST = "EXPENSES_REQUEST";
export const EXPENSES_SUCCESS = "EXPENSES_SUCCESS";
export const EXPENSES_FAILURE = "EXPENSES_FAILURE";
// Action Creators
export const expenceInitialState = () => ({
     type: INIT_STATE,
});

export const expenceRequest = () => ({
     type: EXPENSES_REQUEST,
});

export const expenceSuccess = (expenses) => ({
     type: EXPENSES_SUCCESS,
     payload: expenses,
});

export const expenceFailure = (error) => ({
     type: EXPENSES_FAILURE,
     payload: error,
});

export const expencesIniState = () => {
     return async (dispatch) => {
          dispatch(expenceInitialState());
     };
};

export const fetchExpences = (params) => {
     return async (dispatch) => {
          dispatch(expenceRequest());
          console.log("params : ", params);
          try {
               const response = await axios().get(API, {
                    params: params,
               });

               let logs = response.headers["x-log-data"];
               //conver url encoded string to json
               logs = decodeURIComponent(logs);
               console.log("xlog : ", logs);
               dispatch(expenceSuccess(response.data));
          } catch (error) {
               dispatch(expenceFailure(error.message));
          }
     };
};

export const updateExpence = (data) => {
     return async (dispatch) => {
          dispatch(expenceRequest());
          try {
               const response = await axios().put(API + "/" + data.id, data);
               dispatch(fetchExpences());
          } catch (error) {
               dispatch(expenceFailure(error.message));
          }
     };
};

export const addExpence = (data) => {
     return async (dispatch) => {
          dispatch(expenceRequest());
          try {
               const response = await axios().post(API, data);
               dispatch(fetchExpences());
          } catch (error) {
               dispatch(expenceFailure(error.message));
          }
     };
};

export const deleteExpence = (id) => {
     return async (dispatch) => {
          dispatch(expenceRequest());
          try {
               const response = await axios().delete(API + "/" + id);
               dispatch(fetchExpences());
          } catch (error) {
               dispatch(expenceFailure(error.message));
          }
     };
};
