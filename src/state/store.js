import { configureStore } from "@reduxjs/toolkit";
import deliveryReducer from "./DeliveryAPI";
import loginReducer from "./LoginAPI";
import countReducer from "./Count";
import checkLoginReducer from "./CheckLogin";
import gasReducer from "./GasList";
import customerSearhReducer from "./SearchCustomer";
import UpdateDeliveryReducer from "./UpdateDelivery";

export const store = configureStore({
     reducer: {
          login: loginReducer,
          checkLogin: checkLoginReducer,
          delivery: deliveryReducer,
          count: countReducer,
          gas: gasReducer,
          search_customer: customerSearhReducer,
          updateDeliveryData: UpdateDeliveryReducer,
     },
});
