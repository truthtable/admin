// src/redux/actionTypes.js

export const FETCH_WAREHOUSES_REQUEST = "FETCH_WAREHOUSES_REQUEST";
export const FETCH_WAREHOUSES_SUCCESS = "FETCH_WAREHOUSES_SUCCESS";
export const FETCH_WAREHOUSES_FAILURE = "FETCH_WAREHOUSES_FAILURE";

export const CREATE_WAREHOUSE_REQUEST = "CREATE_WAREHOUSE_REQUEST";
export const CREATE_WAREHOUSE_SUCCESS = "CREATE_WAREHOUSE_SUCCESS";
export const CREATE_WAREHOUSE_FAILURE = "CREATE_WAREHOUSE_FAILURE";

export const UPDATE_WAREHOUSE_REQUEST = "UPDATE_WAREHOUSE_REQUEST";
export const UPDATE_WAREHOUSE_SUCCESS = "UPDATE_WAREHOUSE_SUCCESS";
export const UPDATE_WAREHOUSE_FAILURE = "UPDATE_WAREHOUSE_FAILURE";

export const DELETE_WAREHOUSE_REQUEST = "DELETE_WAREHOUSE_REQUEST";
export const DELETE_WAREHOUSE_SUCCESS = "DELETE_WAREHOUSE_SUCCESS";
export const DELETE_WAREHOUSE_FAILURE = "DELETE_WAREHOUSE_FAILURE";

import { axiosInstance as axios, URL } from "../../services/Api";

const API_URL = URL + "api/warehouses";

export const fetchWarehouses = () => async (dispatch) => {
     dispatch({ type: FETCH_WAREHOUSES_REQUEST });
     try {
          const response = await axios().get(API_URL);
          dispatch({ type: FETCH_WAREHOUSES_SUCCESS, payload: response.data });
     } catch (error) {
          dispatch({ type: FETCH_WAREHOUSES_FAILURE, error: error.message });
     }
};

export const createWarehouse = (warehouse) => async (dispatch) => {
     dispatch({ type: CREATE_WAREHOUSE_REQUEST });
     try {
          const response = await axios().post(API_URL, warehouse);
          dispatch({ type: CREATE_WAREHOUSE_SUCCESS, payload: response.data });
     } catch (error) {
          dispatch({ type: CREATE_WAREHOUSE_FAILURE, error: error.message });
     }
};

export const updateWarehouse = (id, warehouse) => async (dispatch) => {
     dispatch({ type: UPDATE_WAREHOUSE_REQUEST });
     try {
          const response = await axios().put(`${API_URL}/${id}`, warehouse);
          dispatch({ type: UPDATE_WAREHOUSE_SUCCESS, payload: response.data });
     } catch (error) {
          dispatch({ type: UPDATE_WAREHOUSE_FAILURE, error: error.message });
     }
};

export const deleteWarehouse = (id) => async (dispatch) => {
     dispatch({ type: DELETE_WAREHOUSE_REQUEST });
     try {
          await axios().delete(`${API_URL}/${id}`);
          dispatch({ type: DELETE_WAREHOUSE_SUCCESS, payload: id });
     } catch (error) {
          dispatch({ type: DELETE_WAREHOUSE_FAILURE, error: error.message });
     }
};
