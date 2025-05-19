import { axiosInstance as axios } from "../../services/Api";

//actions
export const FETCH_GAS_REQUEST = "FETCH_GAS_REQUEST";
export const FETCH_GAS_SUCCESS = "FETCH_GAS_SUCCESS";
export const FETCH_GAS_FAILURE = "FETCH_GAS_FAILURE";
export const GAS_INI = "GAS_INI";

//action creators

export const fetchGasRequest = () => ({
     type: FETCH_GAS_REQUEST,
});

export const fetchGasSuccess = (gas) => ({
     type: FETCH_GAS_SUCCESS,
     payload: gas,
});

export const fetchGasFailure = (error) => ({
     type: FETCH_GAS_FAILURE,
     payload: error,
});

const API = "https://srdgas.online/public/api/gas";

export const fetchGas = () => {
     return async (dispatch) => {
          dispatch(fetchGasRequest());
          try {
               const response = await axios().get(API);
               dispatch(fetchGasSuccess(response.data));
          } catch (error) {
               dispatch(fetchGasFailure(error));
          }
     };
};
