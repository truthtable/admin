import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../crud-css/read.css";
import gasDataService from "../../services/gas-services";
import DataTable from "../../components/table/DataTable";
import { Button, Chip, Snackbar, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { TbLetterX } from "react-icons/tb";

import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryHistory } from "../../state/DeliveryAPI";
import UpdateData from "../../components/edit/UpdateData";

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
          "Recived Amount",
          "Recived Company",
          "Recived kg",
          "Recived Quantity",
          "Mistake",
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

     function SPAN(correction, value) {
          return (
               <UpdateData text={value} />
          );
     }
};
function makeRow(SPAN, value, index) {
     return [
          SPAN(value.correction == 1, value.id),
          SPAN(value.correction == 1, formatDateTime(value.updated_at)),
          SPAN(value.correction == 1, titleCase(value.courier_boy_id.name)),
          SPAN(value.correction == 1, titleCase(value.customer_id.name)),
          SPAN(value.correction == 1, value.customer_id.address),
          SPAN(value.correction == 1, titleCase(value.gas_id.company_name)),
          SPAN(value.correction == 1, value.gas_id.kg + " KG"),
          SPAN(value.correction == 1, value.quantity),
          SPAN(value.correction == 1, value.received_amount + "₹"),
          SPAN(
               value.correction == 1,
               titleCase(value.received_cylinder.company_name),
          ),
          SPAN(value.correction == 1, value.received_cylinder.kg + " KG"),
          SPAN(value.correction == 1, value.received_cylinder_quantity),
          <div key={index} className="flex flex-row items-center">
               <Link
                    to="/admin/edit_delivery_history"
                    state={{
                         data: value,
                    }}
               >
                    <button
                         style={{
                              backgroundColor: "#114232",
                              border: "1px solid black",
                         }}
                         className="px-4 py-2 text-white rounded-lg"
                    >
                         Edit
                    </button>
               </Link>
          </div>,
     ];
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
