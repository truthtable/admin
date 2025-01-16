import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance as axios } from "../services/Api";

const connectionSlice = createSlice({
     name: "connections",
     initialState: {
          data: null,
          isLoading: false,
          isError: false,
          errorMessage: "",
     },
     reducers: {
          connectionByCustomerId: (state, action) => {
               state.data = action.payload;
               state.isLoading = false;
               state.isError = false;
          },
          connectionError: (state, action) => {
               state.isLoading = false;
               state.isError = true;
               state.errorMessage = action.payload;
          },
          connectionReset: (state) => {
               state.data = null;
               state.isLoading = false;
               state.isError = false;
               state.errorMessage = "";
          },
          connectionLoading: (state) => {
               state.isLoading = true;
               state.isError = false;
          },
     },
});

export const fetchConnectionByCustomerId = (id) => async (dispatch) => {
     dispatch(connectionLoading());
     try {
          const response = await axios().get(`new-connections/${id}`);
          //console.log(response.data);
          dispatch(connectionByCustomerId(response.data));
     } catch (error) {
          console.log(error);
          dispatch(connectionError(id));
     }
};
export const resetConnection = () => async (dispatch) => {
     dispatch(connectionReset());
};

export const {
     connectionByCustomerId,
     connectionError,
     connectionReset,
     connectionLoading,
} = connectionSlice.actions;

export default connectionSlice.reducer;
