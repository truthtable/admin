import { axiosInstance as axios } from "../../services/Api";

export const GET_PLANTS = "GET_PLANTS";
export const GET_PLANTS_SUCCESS = "GET_PLANTS_SUCCESS";
export const GET_PLANTS_FAILURE = "GET_PLANTS_FAILURE";
export const GET_PLANTS_REQUEST = "GET_PLANTS_REQUEST";
export const GET_PLANTS_INIT = "GET_PLANTS_INIT";

export const getPlantsInit = () => async (dispatch) => {
     dispatch({ type: GET_PLANTS_INIT });
};

export const getPlants = () => async (dispatch) => {
     dispatch({ type: GET_PLANTS_REQUEST });
     try {
          const response = await axios().get(
               "https://srdgas.online/public/api/plants",
          );
          dispatch({ type: GET_PLANTS_SUCCESS, payload: response.data });
     } catch (error) {
          dispatch({ type: GET_PLANTS_FAILURE, error });
     }
};
