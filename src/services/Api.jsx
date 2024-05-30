export const URL = "https://adminsr.life/public/";
export const CUSTOMER_DATA = URL + "api/customer_data";
export const LOGIN = URL + "api/token";
export const CHECK_LOGIN = URL + "api/check";
export const GET_WEATHOUSE_DATA = URL + "api/warehouse_index";
export const GET_COUNTS = URL + "api/count";
export const GET_DELIVERY_HISTORY =
     URL + "api/delivery_history?start=0&end=500";
export const GAS_DATA = URL + "api/gas_cylinder_data";
export const SEARCH_CUSTOMER = URL + "api/search";
export const UPDATE_DELIVERY = URL + "api/delivery_update/";

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
