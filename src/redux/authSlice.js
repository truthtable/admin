import {createSlice} from "@reduxjs/toolkit";
import {axiosInstance as axios, getLoginData, LOGIN, URL,} from "../services/Api";
import {storeU} from "../db/users.js";

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
//console.log(localData);

const authSlice = createSlice({
    name: "loginV2",
    initialState: {
        data: localData,
        isLoading: false,
        isError: false,
        errorMessage: "",
        checkLogin: false,
        networkError: false,
        updated: false,
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
            state.updated = false;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.checkLogin = true;
            state.isError = false;
            state.errorMessage = "";
            state.networkError = false;
            state.updated = true;
        },
        loginUpdatedReset: (state) => {
            state.updated = false;
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
        clearError: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.errorMessage = "";
            state.checkLogin = false;
            state.data = null;
            state.networkError = false;
        },
        logout: (state) => {
            state.data = null;
            state.isLoading = false;
            state.isError = false;
            state.errorMessage = "";
            state.checkLogin = false;
            state.networkError = false;
        },
        otpVerified: (state) => {
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
    clearError,
    loginUpdatedReset,
} = authSlice.actions;

const API = LOGIN;

export const login = (username, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        //check if the username and password are empty
        sessionStorage.removeItem("otpToken");
        sessionStorage.removeItem("authToken");
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
        console.log(response.data);
        if (response.data?.loginStatus) {
            //localStorage.setItem("userData", JSON.stringify(data));
            //console.log(data.data.token);
            storeU(username, password);
            sessionStorage.setItem("otpToken", response.data.token);
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
export const validateOtp = (otp) => async (dispatch) => {
    try {
        dispatch(loginStart());
        const response = await axios().post("verify-otp", {otp});
        console.log(response.data);
        //sessionStorage.removeItem('otpToken')
        //dispatch(otpVerified(response.data));
        if (response.data.success) {
            sessionStorage.setItem("authToken", response.data.token);
            sessionStorage.id = response.data.id;
            sessionStorage.removeItem("otpToken");
            //reload window
            window.location.reload();
        }
        console.log(response);
    } catch (error) {
        console.log("validateLogin : ", error);
        dispatch(loginFailure(error.response?.data?.message || "OTP failed"));
    }
    dispatch(loginSuccess(null));
};
//! DELETE
export const validateLogin_X = () => async (dispatch) => {
    try {
        const response = await axios().get("check");
    } catch (error) {
        console.log("validateLogin : ", error);
        let loginData = getLoginData();
        const token = loginData?.token;
        localData = JSON.stringify(loginData);
        //console.log("validateLogin : " + loginData);
        //console.log("token : " + token);
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
//update the user data
export const updateLoginData = (data) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const response = await axios().post(URL + "api/updateLogin", data);
        console.log(response.data);
        //alert if not success
    } catch (error) {
        console.error(error);
        alert(error.response.data.message);
    }
    dispatch(loginSuccess(null));
};

export default authSlice.reducer;
