// src/redux/actions/gasDeliveryActions.js
import { axiosInstance as axios } from "../../services/Api";

export const INI_GAS_DELIVERIES = "INI_GAS_DELIVERIES";
export const GET_GAS_DELIVERIES = "GET_GAS_DELIVERIES";
export const ADD_GAS_DELIVERY = "ADD_GAS_DELIVERY";
export const UPDATE_GAS_DELIVERY = "UPDATE_GAS_DELIVERY";
export const DELETE_GAS_DELIVERY = "DELETE_GAS_DELIVERY";
export const GAS_DELIVERY_ERROR = "GAS_DELIVERY_ERROR";
export const LOADING = "LOADING";
export const UPDATE_CREATE_DELETE = "UPDATE_CREATE_DELETE";
export const UPDATE_GAS_DELIVERY_SUCCESS_RESET =
     "UPDATE_GAS_DELIVERY_SUCCESS_RESET";

// Initial state
export const gasDeliveriesIniState = () => async (dispatch) => {
     dispatch({
          type: INI_GAS_DELIVERIES,
     });
};

// Fetch all gas deliveries
export const getGasDeliveries = () => async (dispatch) => {
     try {
          const res = await axios().get(
               "https://srdgas.online/public/api/gasDeliverys",
          );

          dispatch({
               type: GET_GAS_DELIVERIES,
          });
     } catch (error) {
          dispatch({
               type: GAS_DELIVERY_ERROR,
          });
     }
};

// Add a new gas delivery
export const addGasDelivery = (deliveries) => async (dispatch) => {
     console.log("adding gas delivery");
     if (deliveries.length === 0) {
          return;
     }
     dispatch({
          type: LOADING,
     });
     try {
          const res = await axios().post(
               "https://srdgas.online/public/api/gasDeliverys",
               {
                    deliveries,
               },
          );
          console.log(res);
          dispatch({
               type: ADD_GAS_DELIVERY,
          });
     } catch (error) {
          dispatch({
               type: GAS_DELIVERY_ERROR,
          });
     }
};

// Update an existing gas delivery
export const updateGasDelivery = (deliveries) => async (dispatch) => {
     if (deliveries.length === 0) {
          return;
     }
     dispatch({
          type: LOADING,
     });
     try {
          const res = await axios().put(
               `https://srdgas.online/public/api/gasDeliverys/0`,
               {
                    deliveries,
               },
          );
          console.log(res);
          dispatch({
               type: UPDATE_GAS_DELIVERY,
          });
     } catch (error) {
          dispatch({
               type: GAS_DELIVERY_ERROR,
          });
     }
};

// Delete a gas delivery
export const deleteGasDelivery = (ids) => async (dispatch) => {
     console.log("deleting gas delivery");
     //return if no ids
     if (ids.length === 0) {
          return;
     }
     dispatch({
          type: LOADING,
     });
     try {
          const res = await axios().delete(
               `https://srdgas.online/public/api/gasDeliverys/0`,
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
                    data: {
                         ids: ids,
                    },
               },
          );
          console.log(res);
          dispatch({
               type: DELETE_GAS_DELIVERY,
          });
     } catch (error) {
          dispatch({
               type: GAS_DELIVERY_ERROR,
          });
     }
};

export const updateCreateDelete = (data) => async (dispatch) => {
     console.log("updateCreateDelete : ", data);
     dispatch({
          type: LOADING,
     });
     try {
          const res = await axios().post(
               `https://srdgas.online/public/api/updateOrCreateOrDelete`,
               {
                    data,
               },
          );
          console.log(res.data);
          dispatch({
               type: UPDATE_CREATE_DELETE,
          });
     } catch (error) {
          dispatch({
               type: GAS_DELIVERY_ERROR,
          });
     }
};
export const gasDeliverySuccessReset = () => async (dispatch) => {
     dispatch({
          type: UPDATE_GAS_DELIVERY_SUCCESS_RESET,
     });
};
