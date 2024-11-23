import { axiosInstance as axios } from "../../services/Api";
import { loginInial } from "../authSlice";

export const FETCH_ITEMS_REQUEST = "FETCH_ITEMS_REQUEST";
export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
export const FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE";
export const CREATE_ITEM_SUCCESS = "CREATE_ITEM_SUCCESS";
export const UPDATE_ITEM_SUCCESS = "UPDATE_ITEM_SUCCESS";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const INITIAL_ITEMS = "INITIAL_ITEMS";

export const iniState = () => async (dispatch) => {
     dispatch({ type: INITIAL_ITEMS });
};

export const fetchItems = () => async (dispatch) => {
     dispatch({ type: FETCH_ITEMS_REQUEST });
     try {
          const response = await axios().get(
               "https://adminsr.life/public/api/purchase-order-items",
          );
          dispatch({ type: FETCH_ITEMS_SUCCESS, payload: response.data });
     } catch (error) {
          if (error.response.status === 401) {
               dispatch(loginInial());
          }
          dispatch({ type: FETCH_ITEMS_FAILURE, error });
     }
};

export const createItem = (itemData) => async (dispatch) => {
     dispatch({ type: FETCH_ITEMS_REQUEST });
     try {
          const response = await axios().post(
               "https://adminsr.life/public/api/purchase-order-items",
               itemData,
          );
          dispatch({ type: CREATE_ITEM_SUCCESS, payload: response.data });
     } catch (error) {
          if (error.response.status === 401) {
               dispatch(loginInial());
          }
          console.error(error);
     }
};

export const updateItem = (id, itemData) => async (dispatch) => {
     dispatch({ type: FETCH_ITEMS_REQUEST });
     try {
          //console.log(id, itemData);
          const response = await axios().put(
               `https://adminsr.life/public/api/purchase-order-items/${id}`,
               itemData,
          );
          //console.log(response);
          dispatch({ type: UPDATE_ITEM_SUCCESS, payload: response.data });
     } catch (error) {
          if (error.response.status === 401) {
               dispatch(loginInial());
          }
          dispatch({ type: FETCH_ITEMS_FAILURE, error });
          console.error(error);
     }
};

export const deleteItem = (id) => async (dispatch) => {
     dispatch({ type: FETCH_ITEMS_REQUEST });
     try {
          await axios().delete(
               `https://adminsr.life/public/api/purchase-order-items/${id}`,
          );
          dispatch({ type: DELETE_ITEM_SUCCESS, payload: id });
     } catch (error) {
          if (error.response.status === 401) {
               dispatch(loginInial());
          }
          console.error(error);
     }
};
