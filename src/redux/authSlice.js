import { createSlice } from "@reduxjs/toolkit";
import {
     axiosInstance as axios,
     getLoginData,
     LOGIN,
     URL,
} from "../services/Api";

const userData = localStorage.getItem("userData");
let localData = null;
if (userData) {
     const data = JSON.parse(userData);
     const timeStamps = new Date(data.timeStamps);
     const currentTime = new Date();
     if (currentTime.getDate() !== timeStamps.getDate()) {
          localStorage.removeItem("userData");
     } else {
          localData = data.data;
     }
}
console.log(localData);

const authSlice = createSlice({
     name: "loginV2",
     initialState: {
          data: localData,
          isLoading: false,
          isError: false,
          errorMessage: "",
          checkLogin: false,
          networkError: false,
     },
     reducers: {
          loginInial(state) {
               state.data = localData;
               state.isLoading = false;
               state.isError = false;
               state.checkLogin = false;
               state.networkError = false;
          },
          loginStart: (state) => {
               state.isLoading = true;
               state.isError = false;
               state.checkLogin = false;
               state.networkError = false;
          },
          loginSuccess: (state, action) => {
               state.isLoading = false;
               state.data = action.payload;
               state.checkLogin = true;
               state.isError = false;
               state.errorMessage = "";
               state.networkError = false;
          },
          loginFailure: (state, action) => {
               state.isLoading = false;
               state.isError = true;
               state.errorMessage = action.payload;
               state.checkLogin = false;
               state.data = null;
               state.networkError = false;
          },
          networkError: (state, action) => {
               state.isLoading = false;
               state.isError = true;
               state.errorMessage = action.payload;
               state.checkLogin = false;
               state.data = null;
               state.networkError = true;
          },
          logout: (state) => {
               state.data = null;
               state.isLoading = false;
               state.isError = false;
               state.errorMessage = "";
               state.checkLogin = false;
               state.networkError = false;
          },
     },
});

export const {
     loginInial,
     loginStart,
     loginSuccess,
     loginFailure,
     logout,
     networkError,
} = authSlice.actions;

const API = LOGIN;

export const login = (username, password) => async (dispatch) => {
     dispatch(loginStart());
     try {
          //check if the username and password are empty
          if (!username || !password) {
               return dispatch(
                    loginFailure("Username and Password are required"),
               );
          }
          //check from local storage if the user is already logged in

          const response = await axios().post(API, {
               username,
               password,
          });
          const data = {
               data: response.data,
               timeStamps: new Date(),
          };
          if (response.data?.loginStatus || false) {
               localStorage.setItem("userData", JSON.stringify(data));
               dispatch(loginSuccess(response.data));
          } else {
               dispatch(loginFailure(response.data?.message || "Login failed"));
          }
     } catch (error) {
          console.log(" login : " + error);
          // Check if it's a network error
          if (
               error.code === "ERR_NETWORK" ||
               error.message === "Network Error"
          ) {
               dispatch(
                    networkError(
                         "Network connection failed. Please check your internet connection.",
                    ),
               );
          } else {
               dispatch(
                    loginFailure(
                         error.response?.data?.message || "Login failed",
                    ),
               );
          }
     }
};

export const validateLogin = () => async (dispatch) => {
     try {
          const response = await axios().get("check");
     } catch (error) {
          console.log("validateLogin : ", error);
          let loginData = getLoginData();
          const token = loginData?.token;
          localData = JSON.stringify(loginData);
          console.log("validateLogin : " + loginData);
          console.log("token : " + token);
          dispatch(
               loginFailure(error.response?.data?.message || "Login failed"),
          );

          //handle here
          if (
               error.code === "ERR_NETWORK" ||
               error.message === "Network Error"
          ) {
               // Dispatch network error action instead of login failure
               dispatch(
                    networkError(
                         "Network connection failed. Please check your internet connection.",
                    ),
               );
               return;
          }

          if (
               localData.token === null ||
               localData.token === "" ||
               localData.token === undefined
          ) {
               localStorage.removeItem("userData");
               dispatch(logout());
          }
     }
};

export default authSlice.reducer;
