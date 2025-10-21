import axios from 'axios';

export const URL = "https://srdgas.online/";
export const LOGIN = URL + "api/token";
export const CHECK_LOGIN = URL + "api/check";

export const CUSTOMER_DATA = URL + "api/customer_data-v2";
export const GET_WEATHOUSE_DATA = URL + "api/warehouse_index";
export const GET_COUNTS = URL + "api/count";
export const GET_DELIVERY_HISTORY = URL + "api/delivery_history?start=0&end=500";
export const GET_COURIER_BOY_DATA = URL + "api/courier_boy_info";

export const GAS_DATA = URL + "api/gas_cylinder_data";
export const DELETE_GAS_DELIVERY = URL + "api/deleteGasDeliverys/";
export const INSERT_GAS_DELIVERY = URL + "api/insertGasDeliverys";

export const SEARCH_CUSTOMER = URL + "api/search";

export const UPDATE_DELIVERY = URL + "api/delivery_update/";
export const UPDATE_GAS = URL + "api/update_cylinder/";
export const UPDATE_CUSTOMER = URL + "api/update_customer/";
export const UPDATE_USER = URL + "api/update_user/";
export const UPDATE_COURIER_BOY = URL + "api/update_courier_boy/";

export const UPDATE_CREATE_DELETE = URL + "api/updateOrCreateOrDelete/";
//customer_payments_update_or_create
export const UPDATE_CUSTOMER_PAYMENTS = URL + "api/customer_payments_update_or_create";
//adjustBalance
export const ADJUST_BALANCE = URL + "api/adjustBalance";

export const getUserDataFromCookie = () => {
    let data = null;
    try {
        const cookie = document.cookie;
        const cookieArray = cookie.split(";");
        //console.log(cookieArray);
        cookieArray.forEach((element) => {
            let temp = element.trim().split("=");
            const key = temp[0];
            const value = temp[1];
            data = {...data, [key]: value};
        });
        if (data.token === undefined || data.token === "") {
            data = null;
        }
    } catch (e) {
        console.warn(e);
    }
    return data;
};

export const getLoginData = () => {
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
    return localData;
}

const axiosInstance_ = axios.create({
    baseURL: URL + 'api/',
});

export const axiosInstance = () => {
    // Add a request interceptor to attach the token
    axiosInstance_.interceptors.request.use(
        (config) => {
            const optToken = sessionStorage.getItem("otpToken");
            const authToken = sessionStorage.getItem("authToken");
            let token = null
            if (optToken) {
                token = optToken
            }
            if (authToken) {
                token = authToken
            }
            //console.log({ optToken, authToken, token });
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    // Add a response interceptor to handle 401 errors
    axiosInstance_.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            //check for all unauthorized
            if (error.response && error.response.status === 401) {
                sessionStorage.removeItem("authToken");
                sessionStorage.removeItem("otpToken");
                window.location.reload();
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance_;
}

export default axiosInstance();