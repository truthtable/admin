import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance as axios, getLoginData } from "../services/Api";
import { LOGIN } from "../services/Api";

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
     },
     reducers: {
          loginInial(state) {
               state.data = localData;
               state.isLoading = false;
               state.isError = false;
               state.checkLogin = false;
          },
          loginStart: (state) => {
               state.isLoading = true;
               state.isError = false;
               state.checkLogin = false;
          },
          loginSuccess: (state, action) => {
               state.isLoading = false;
               state.data = action.payload;
               state.checkLogin = true;
               state.isError = false;
               state.errorMessage = "";
          },
          loginFailure: (state, action) => {
               state.isLoading = false;
               state.isError = true;
               state.errorMessage = action.payload;
               state.checkLogin = false;
               state.data = null;
          },
          logout: (state) => {
               state.data = null;
               state.isLoading = false;
               state.isError = false;
               state.errorMessage = "";
               state.checkLogin = false;
          },
     },
});

export const { loginInial, loginStart, loginSuccess, loginFailure, logout } =
     authSlice.actions;

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
          dispatch(
               loginFailure(error.response?.data?.message || "Login failed"),
          );
     }
};

export const validateLogin = () => async (dispatch) => {
     try {
          const response = await axios().get("check");
     } catch (error) {
          console.log("validateLogin : ", error);
          let loginData = getLoginData();
          loginData = JSON.stringify(loginData);
          console.log("validateLogin : " + loginData);
          dispatch(
               loginFailure(error.response?.data?.message || "Login failed"),
          );
          localStorage.removeItem("userData");
     }
};

export default authSlice.reducer;
