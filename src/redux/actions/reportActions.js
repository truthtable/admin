import { axiosInstance as axios, URL } from "../../services/Api";

// Action Types
export const INIT_STATE = "REPORT_INIT_STATE";
export const FETCH_REQUEST = "REPORT_FETCH_REQUEST";
export const FETCH_SUCCESS = "REPORT_FETCH_SUCCESS";
export const FETCH_FAILURE = "REPORT_FETCH_FAILURE";

// Action Creators
export const initialState = () => ({
     type: INIT_STATE,
});
export const fetchRequest = () => ({
     type: FETCH_REQUEST,
});
export const fetchSuccess = (report) => ({
     type: FETCH_SUCCESS,
     payload: report,
});
export const fetchFailure = (error) => ({
     type: FETCH_FAILURE,
     payload: error,
});
const API = URL + "api/report";
//initial state
export const reportIniState = () => {
     return async (dispatch) => {
          dispatch(initialState());
     };
};
// Async Action to Fetch Report
export const fetchReport = (params) => {
     console.log("report params : ", params);
     return async (dispatch) => {
          dispatch(fetchRequest());
          try {
               const response = await axios().get(API, {
                    params: params,
               });
               const report = response.data;
               dispatch(fetchSuccess(report));
          } catch (error) {
               console.log("report : ", error);
               dispatch(fetchFailure(error));
          }
     };
};
