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
import gasDeliverysReducer from "./UpdateGasDelivery";
import purchaseOrderReducer from "../redux/reducers/purchaseOrderReducer.js";
import purchaseOrderItemReducer from "../redux/reducers/purchaseOrderItemReducer.js";
import warehouseReducer from "../redux/reducers/warehouseReducer.js";
import plantsReducer from "../redux/reducers/plantsReducer.js";
import { deliveryHistory } from "../crud/index.js";
import deliverysReducer from "../redux/reducers/deliverysReducer.js";
import userReducer from "../redux/reducers/userReducer.js";
import gasDeliveryReducer from "../redux/reducers/gasDeliveryReducer.js";

export const store = configureStore({
     reducer: {
          login: loginReducer,

          checkLogin: checkLoginReducer,

          delivery: deliveryReducer,
          deliverys: deliverysReducer,

          count: countReducer,

          gas: gasReducer,

          search_customer: customerSearhReducer,

          customers: customerReducer,

          updateDeliveryData: UpdateDeliveryReducer,

          updateGas: UpdateGasReducer,

          updateCustomer: updateCustomerReducer,

          getData: getDataReducer,

          //old
          gasDeliverys: gasDeliverysReducer,

          //new
          gasDelivery: gasDeliveryReducer,

          purchaseOrders: purchaseOrderReducer,

          purchaseOrderItems: purchaseOrderItemReducer,

          plants: plantsReducer,

          warehouses: warehouseReducer,

          user: userReducer,
     },
     devTools: process.env.NODE_ENV !== "production",
});
