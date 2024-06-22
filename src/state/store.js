import { configureStore } from "@reduxjs/toolkit";
import deliveryReducer from "./DeliveryAPI";
import loginReducer from "./LoginAPI";
import countReducer from "./Count";
import checkLoginReducer from "./CheckLogin";
import gasReducer from "./GasList";
import customerSearhReducer from "./SearchCustomer";
import UpdateDeliveryReducer from "./UpdateDelivery";
import UpdateGasReducer from "./UpdateGas";
import customerReducer from "./Customers";
import updateCustomerReducer from "./CustomerUpdate";
import getDataReducer from "./GetData";

export const store = configureStore({
     reducer: {
          login: loginReducer,

          checkLogin: checkLoginReducer,

          delivery: deliveryReducer,

          count: countReducer,

          gas: gasReducer,

          search_customer: customerSearhReducer,

          customers: customerReducer,

          updateDeliveryData: UpdateDeliveryReducer,

          updateGas: UpdateGasReducer,

          updateCustomer: updateCustomerReducer,

          getData: getDataReducer,
     },
});
