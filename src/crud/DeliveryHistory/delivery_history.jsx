import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../crud-css/read.css";
import gasDataService from "../../services/gas-services";
import DataTable from "../../components/table/DataTable";
import { Button, Chip, Snackbar, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { TbLetterX } from "react-icons/tb";

import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryHistory } from "../../state/DeliveryAPI";
import { fetchGasData } from "../../state/GasList";
import { TEXT_INPUT, NUMBER_INPUT, CUSTOMER, UpdateDeliveryCell as UpdateData, GAS, RECEVIED_GAS, GAS_QUANTITY, RECEVIED_GAS_QUANTITY } from "../../components/edit/UpdateDeliveryCell";

const delivery_history = () => {
     const dispatch = useDispatch();
     const deliveryData = useSelector((state) => state.delivery);

     const BOLD = "bold";
     const NORMAL = "normal";
     const RED = "red";
     const BLACK = "black";

     const colomnNames = [
          "ID",
          "Date & Time",
          "Courier Boy Name",
          "Customer Name",
          "Address",
          "Gas Company",
          "Gas kg",
          "Quantity",
          "Recived Company",
          "Recived kg",
          "Recived Quantity",
          "Recived Amount",
          // "Mistake",
     ];

     let show = false;
     let message = "";
     let color = "danger";

     const tableData = [];
     const correctionTableData = [];
     const setSnackbarLoading = (m) => {
          show = true;
          message = m;
          color = "warning";
     };
     const setSnackbarSuccess = (m) => {
          show = true;
          message = m;
          color = "success";
     };
     const setSnackbarError = (m) => {
          show = true;
          message = m;
          color = "danger";
     };
     const setSnackbarClose = () => {
          show = false;
          message = "";
     };
     useEffect(() => {
          gasDataService.listenDataChange(() => {
               dispatch(fetchDeliveryHistory());
               dispatch(fetchGasData());
          });
     }, []);

     gasDataService.notifyDataChange();

     if (
          !deliveryData.isError &&
          !deliveryData.isLoading &&
          deliveryData.data !== null
     ) {
          deliveryData.data.data.map((value, index) =>
               tableData.push(makeRow(SPAN, value, index)),
          );
          const filteredData = deliveryData.data.data.filter((user) => {
               return user.correction == 1;
          });
          filteredData.map((value, index) =>
               correctionTableData.push(makeRow(SPAN, value, index)),
          );
     }
     if (deliveryData.isLoading) {
          setSnackbarLoading("Loading data");
     }
     if (deliveryData.isError) {
          setSnackbarError(deliveryData.errorMessage);
     }

     const updateDeliveryData = useSelector((state) => state.updateDeliveryData);
     if (updateDeliveryData.isSuccessful) {
          dispatch(fetchDeliveryHistory());
     }
     return (
          <div className="table-container">
               <Snackbar
                    open={show}
                    onClose={() => {
                         setSnackbarClose();
                    }}
                    color={color}
                    variant="soft"
                    endDecorator={
                         <Button
                              onClick={() => {
                                   setSnackbarClose();
                              }}
                              size="sm"
                              variant="soft"
                              color={color}
                         >
                              <TbLetterX />
                         </Button>
                    }
               >
                    {message}
               </Snackbar>
               <Tabs aria-label="Basic tabs" defaultValue={0}>
                    <TabList>
                         <Tab>All Deliveries</Tab>
                         <Tab>
                              Correction Deliveries
                              <Chip color="danger" variant="solid" size="sm">
                                   {correctionTableData.length}
                              </Chip>
                         </Tab>
                    </TabList>
                    <TabPanel value={0}>
                         <DataTable
                              thead={colomnNames}
                              tbody={tableData}
                              loading={deliveryData.isLoading}
                         />
                    </TabPanel>
                    <TabPanel value={1}>
                         <DataTable
                              thead={colomnNames}
                              tbody={correctionTableData}
                              loading={deliveryData.isLoading}
                         />
                    </TabPanel>
               </Tabs>
               <div className="md:hidden lg:hidden text-center p-4">
                    <p className="text-gray-600">
                         Please switch to desktop mode for a better experience.
                    </p>
               </div>
          </div>
     );

     function SPAN(correction, value, text, disabled = false, src = "", inputType = TEXT_INPUT, inputTitle = "", id) {
          return (
               <UpdateData id={id} text={text} bool={correction} value={value} disabled={disabled} src={src} type={inputType} inputTitle={inputTitle} />
          );
     }
};
function makeRow(SPAN, value, index) {
     const scr = makeRowSting(value)
     return [
          SPAN(value.correction == 1, value.id, value.id, true, "", value, value.id),
          SPAN(value.correction == 1, value.updated_at, formatDateTime(value.updated_at), true, "", value.id),
          SPAN(value.correction == 1, value.courier_boy_id.name, titleCase(value.courier_boy_id.name), true, "", value.id),
          SPAN(value.correction == 1, value.customer_id.name, titleCase(value.customer_id.name), false, scr, CUSTOMER, "Customer Name", value.id),
          SPAN(value.correction == 1, value.customer_id.address, value.customer_id.address, true, scr, TEXT_INPUT, "Address", value.id),
          SPAN(value.correction == 1, value.gas_id.company_name, titleCase(value.gas_id.company_name), false, scr, GAS, "Gas", value.id,),
          SPAN(value.correction == 1, value.gas_id.kg, value.gas_id.kg + " KG", false, scr, GAS, "Gas", value.id),
          SPAN(value.correction == 1, value.quantity, value.quantity, false, scr, GAS_QUANTITY, "Quantity", value.id),
          SPAN(value.correction == 1, value.received_cylinder.company_name, titleCase(value.received_cylinder.company_name), false, scr, RECEVIED_GAS, "Recevid Gas", value.id),
          SPAN(value.correction == 1, value.received_cylinder.kg, value.received_cylinder.kg + " KG", false, scr, RECEVIED_GAS, "Recevid Gas", value.id),
          SPAN(value.correction == 1, value.received_cylinder_quantity, value.received_cylinder_quantity, false, scr, RECEVIED_GAS_QUANTITY, "Recevid Quantity", value.id),
          // <div key={index} className="flex flex-row items-center">
          //      <Link
          //           to="/admin/edit_delivery_history"
          //           state={{
          //                data: value,
          //           }}
          //      >
          //           <button
          //                style={{
          //                     backgroundColor: "#114232",
          //                     border: "1px solid black",
          //                }}
          //                className="px-4 py-2 text-white rounded-lg"
          //           >
          //                Edit
          //           </button>
          //      </Link>
          // </div>,
          SPAN(value.correction == 1, value.received_amount, value.received_amount + "₹", false, scr, NUMBER_INPUT, "Received Amount", value.id),
     ];
}
function makeRowSting(value) {
     var data = ""
     data =
          "/nCourier Boy : " + titleCase(value.courier_boy_id.name) +
          "/nCustomer Name : " + titleCase(value.customer_id.name) +
          "/nAddress : " + value.customer_id.address +
          "/nGas : " + titleCase(value.gas_id.company_name) +
          " - " + value.gas_id.kg + "Kg" +
          " - Qty : " + value.quantity +
          "/nReceived Gas : " + titleCase(value.received_cylinder.company_name) +
          " - " + value.received_cylinder.kg + "Kg" +
          " - Qty : " + value.received_cylinder_quantity +
          "/nAmount : " + value.received_amount + "₹"
     return data
}
function titleCase(str) {
     return str
          .toLowerCase()
          .split(" ")
          .map(function (word) {
               return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
}
function formatDateTime(dateString) {
     const date = new Date(dateString);
     const day = date.getDate().toString().padStart(2, "0");
     const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
     const year = date.getFullYear().toString();
     const hours = date.getHours().toString().padStart(2, "0");
     const minutes = date.getMinutes().toString().padStart(2, "0");
     const seconds = date.getSeconds().toString().padStart(2, "0");

     return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export default delivery_history;
