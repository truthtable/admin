export const URL = "https://adminsr.life/public/";
export const LOGIN = URL + "api/token";
export const CHECK_LOGIN = URL + "api/check";

export const CUSTOMER_DATA = URL + "api/customer_data";
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
               data = { ...data, [key]: value };
          });
          //console.log(data);
          if (data.token === undefined || data.token === "") {
               data = null;
          }
     } catch (e) {
          console.warn(e);
     }
     return data;
};
