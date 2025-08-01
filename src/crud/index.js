import insert from "./GasCylinders/insert";
import read from "./GasCylinders/read";
import update from "./GasCylinders/update";
import deletegas from "./GasCylinders/delete";

import addDeliveryBoy from "./addDeliveryBoy/insert";
//import DeliveryBoyDetails from "./addDeliveryBoy/DeliveryBoyDetails";
import updateDeliveryBoy from "./addDeliveryBoy/update";

import addWherehouse from "./wherehouse/insert";
import readWherehouse from "./wherehouse/read";
import updateWherehouse from "./wherehouse/update";

import InsertReport from "./report/InsertReport";
import readReport from "./report/ReadReport";
import UpdateReport from "./report/UpdateReport";
import PrintReport from "./report/PrintReport";

import add_delivery_history from "./DeliveryHistory/add_delivery_history";
import deliveryHistory from "../components/view/__DeliveryHistory.jsx";
import edit_delivery_history from "./DeliveryHistory/edit_delivery_history";

//import InsertCustomer from "./customer/insertcustomer";
import ViewCustomer from "../components/view/ViewCustomer.jsx";
import UpdateCustomer from "./customer/UpdateCustomer";

import InsertAdmin from "./Admin/InsertAdmin";
import ViewAdmin from "./Admin/ViewAdmin";
import UpdateAdmin from "./Admin/UpdateAdmin";

export {
     // product
     insert,
     read,
     update,
     deletegas,

     // delivery boy
     addDeliveryBoy,
     // DeliveryBoyDetails,
     updateDeliveryBoy,

     // wherehouse
     addWherehouse,
     readWherehouse,
     updateWherehouse,

     //delivery history
     add_delivery_history,
     deliveryHistory,
     edit_delivery_history,

     //report
     InsertReport,
     UpdateReport,
     readReport,
     PrintReport,

     //customers
     // InsertCustomer,
     ViewCustomer,
     UpdateCustomer,

     //admin
     InsertAdmin,
     ViewAdmin,
     UpdateAdmin,
};
