// src/redux/actions/gasDeliveryActions.js
import axios from "axios";

export const INI_GAS_DELIVERIES = "INI_GAS_DELIVERIES";
export const GET_GAS_DELIVERIES = "GET_GAS_DELIVERIES";
export const ADD_GAS_DELIVERY = "ADD_GAS_DELIVERY";
export const UPDATE_GAS_DELIVERY = "UPDATE_GAS_DELIVERY";
export const DELETE_GAS_DELIVERY = "DELETE_GAS_DELIVERY";
export const GAS_DELIVERY_ERROR = "GAS_DELIVERY_ERROR";

// Initial state
export const gasDeliveriesIniState = () => async (dispatch) => {
     dispatch({
          type: INI_GAS_DELIVERIES,
     });
};

// Fetch all gas deliveries
export const getGasDeliveries = () => async (dispatch) => {
     try {
          await axios.get("https://adminsr.life/public/api/gasDeliverys");
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
     try {
          const res = await axios.post(
               "https://adminsr.life/public/api/gasDeliverys",
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
export const updateGasDelivery = (updatedData) => async (dispatch) => {
     try {
          await axios.put(
               `https://adminsr.life/public/api/gasDeliverys/`,
               updatedData,
          );
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
     try {
          const res = await axios.delete(
               `https://adminsr.life/public/api/gasDeliverys/0`,
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
