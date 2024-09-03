import { useEffect } from "react";
import "../../crud/crud-css/read.css";
import gasDataService from "../../services/gas-services.jsx";
import DataTable from "../table/DataTable.jsx";
import { Box, Button, Chip, Snackbar, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { TbLetterX } from "react-icons/tb";

import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryHistory } from "../../state/DeliveryAPI.jsx";
import { fetchGasData } from "../../state/GasList.jsx";
import {
     AMOUNT,
     CLEAR_MISTAKE,
     CUSTOMER,
     TEXT_INPUT,
     UpdateDeliveryCell as UpdateData
} from "../edit/UpdateDeliveryCell.jsx";
import EditGasList from "../edit/EditGasList.jsx";

//key value pair of gas id and gas data
let allGasDataMap = {}

const deliveryHistory = () => {
     const dispatch = useDispatch();
     const deliveryData = useSelector((state) => state.delivery);
     const allGasData = useSelector((state) => state.gas);

     const currentUrl = window.location.href;
     const hashIndex = currentUrl.indexOf('#');
     const hashPart = currentUrl.substring(hashIndex + 1);
     const url = new URL(hashPart, window.location.origin);
     const searchParams = new URLSearchParams(url.search);

     const urlCustomerId = searchParams.get('customerId');

     useEffect(() => {
          gasDataService.listenDataChange(() => {
               if (deliveryData.data === null) {
                    dispatch(fetchDeliveryHistory());
               }
               //dispatch(fetchDeliveryHistory());
               if (allGasData.data == null || allGasData.data.data.length == 0) {
                    dispatch(fetchGasData());
               }
          });
     }, []);

     const updateDeliveryData = useSelector((state) => state.updateDeliveryData);
     if (updateDeliveryData.isSuccessful) {
          dispatch(fetchDeliveryHistory());
     }

     const BOLD = "bold";
     const NORMAL = "normal";
     const RED = "red";
     const BLACK = "black";

     const makeHead = (text) => {
          return (<Box
               sx={{
                    padding: "0px",
                    margin: "0px",
                    backgroundColor: "transparent",
                    mx: "8px",
               }}>
               <Button
                    style={{
                         flexGrow: 1,
                         width: "100%",
                         height: "100%",
                         margin: "0px",
                         padding: "0px",
                         borderRadius: "0px",
                         color: "black",
                         backgroundColor: "transparent",
                         whiteSpace: "nowrap",
                         disabled: true
                    }}
               >
                    {text}
               </Button>
          </Box>)
     }

     const colomnNames = [
          <Box
               key="created_at"
               sx={{
                    padding: "0px",
                    margin: "0px",
                    backgroundColor: "transparent",
                    transition: "background-color 0.3s",
                    "&:hover": {
                         backgroundColor: "rgb(75 112 245 / 25%)",
                    },
               }}
          >
               <Button
                    style={{
                         flexGrow: 1,
                         width: "100%",
                         height: "100%",
                         margin: "0px",
                         padding: "0px",
                         borderRadius: "0px",
                         color: "black",
                         backgroundColor: "transparent",
                         whiteSpace: "nowrap",
                    }}
               >
                    Entry
               </Button>
          </Box>,
          <Box
               key="updated_at"
               sx={{
                    padding: "0px",
                    margin: "0px",
                    backgroundColor: "transparent",
                    transition: "background-color 0.3s",
                    "&:hover": {
                         backgroundColor: "rgb(75 112 245 / 25%)",
                    },
               }}
          >
               <Button

                    style={{
                         flexGrow: 1,
                         width: "100%",
                         height: "100%",
                         margin: "0px",
                         padding: "0px",
                         borderRadius: "0px",
                         color: "black",
                         backgroundColor: "transparent",
                         whiteSpace: "nowrap",
                    }}
               >
                    Update
               </Button>
          </Box>,
          makeHead("Delivery Boy"),
          makeHead("Customer"),
          makeHead("Address"),
          makeHead("Delivery Gas"),
          makeHead("Received Gas"),
          makeHead("Amount"),
          makeHead("balance"),
          makeHead("Correction"),
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

     //gasDataService.notifyDataChange();

     if (
          !deliveryData.isError &&
          !deliveryData.isLoading &&
          deliveryData.data !== null &&
          !allGasData.isError &&
          !allGasData.isLoading &&
          allGasData.data !== null
     ) {

          allGasData.data.data.forEach((value, index) => {
               allGasDataMap[value.id] = value
          })

          if (deliveryData.data.data.length > 0) {

               deliveryData.data.data.map((value, index) => {

                    if (urlCustomerId != null) {
                         if (value.customer_id.id == urlCustomerId) {
                              return tableData.push(makeRow(SPAN, value, index, deliveryData.data.gas_data))
                         }
                    } else {
                         return tableData.push(makeRow(SPAN, value, index, deliveryData.data.gas_data))
                    }
               }
               );
               const filteredData = deliveryData.data.data.filter((user) => {
                    return user.correction == 1;
               });
               filteredData.map((value, index) =>
                    correctionTableData.push(makeRow(SPAN, value, index, deliveryData.data.gas_data)),
               );
          }
     }
     if (deliveryData.isLoading || allGasData.isLoading) {
          setSnackbarLoading("Loading data");
     }
     if (deliveryData.isError || allGasData.isError) {
          setSnackbarError(deliveryData.errorMessage);
     }
     return (
          <Box sx={{ width: "100%", height: "100%", overflow: "auto", backgroundColor: "white", borderRadius: "lg" }}>
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
               <Tabs aria-label="Basic tabs" defaultValue={0} >
                    <TabList>
                         <Tab>All Deliveries</Tab>
                         <Tab>
                              Correction Deliveries
                              <Chip color="danger" variant="solid" size="sm">
                                   {correctionTableData.length}
                              </Chip>
                         </Tab>
                    </TabList>
                    <TabPanel sx={{ p: 0, m: 0 }} value={0}>
                         <DataTable
                              thead={colomnNames}
                              tbody={tableData}
                              loading={deliveryData.isLoading}
                         />
                    </TabPanel>
                    <TabPanel sx={{ p: 0, m: 0 }} value={1}>
                         <DataTable
                              thead={colomnNames}
                              tbody={correctionTableData}
                              loading={deliveryData.isLoading}
                         />
                    </TabPanel>
               </Tabs>
               <div className="md:hidden lg:hidden text-center">
                    <p className="text-gray-600">
                         Please switch to desktop mode for a better experience.
                    </p>
               </div>
          </Box >

     );

     function SPAN(correction, value, text, disabled = false, src = "", inputType = TEXT_INPUT, inputTitle = "", id) {
          return (
               <UpdateData id={id} text={text} bool={correction} value={value} disabled={disabled} src={src}
                    type={inputType} inputTitle={inputTitle} />
          );
     }
};

function makeRow(SPAN, value, index, gas_data) {
     // console.log(value)
     // return[]
     const scr = makeRowSting(value)
     const t = gas_data.filter((gas) => {
          return gas.delivery_id == value.id;
     })
     const deliveryGas = t.filter((value, index) => {
          return value.is_empty === 0
     })
     const receivedGas = t.filter((value, index) => {
          return value.is_empty === 1
     })
     const dGas = deliveryGas.map((value, index) => {
          try {
               const gas = allGasDataMap[value.gas_id]
               return {
                    company_name: gas.company_name,
                    delivery_id: value.delivery_id,
                    gas_id: value.gas_id,
                    id: value.id,
                    is_empty: false,
                    quantity: value.quantity,
                    kg: gas.kg,
                    price: value.price
               }

          } catch (e) {
               console.warn(e)
          }
          return null
     })
     const rGas = receivedGas.map((value, index) => {
          try {
               const gas = allGasDataMap[value.gas_id]
               return {
                    company_name: gas.company_name,
                    delivery_id: value.delivery_id,
                    gas_id: value.gas_id,
                    id: value.id,
                    is_empty: false,
                    quantity: value.quantity,
                    kg: gas.kg,
                    price: 0
               }
          } catch (e) {
               console.warn(e)
          }
          return null
     })
     return [
          SPAN(value.correction == 1, value.created_at, formatDateTime(value.created_at), true, "", value.id),
          SPAN(value.correction == 1, value.updated_at, formatDateTime(value.updated_at), true, "", value.id),
          SPAN(value.correction == 1, value.courier_boy_id.name, titleCase(value.courier_boy_id.name), true, "", value.id),
          SPAN(value.correction == 1, value.customer_id.name, titleCase(value.customer_id.name), false, scr, CUSTOMER, "Customer Name", value.id),
          SPAN(value.correction == 1, value.customer_id.address, value.customer_id.address, true, scr, TEXT_INPUT, "Address", value.id),
          <EditGasList gasList={dGas} correction={value.correction == 1} allgasList={allGasDataMap} isReceved={false}
               delivery_id={value.id} />,
          <EditGasList gasList={rGas} correction={value.correction == 1} allgasList={allGasDataMap} isReceved={true}
               delivery_id={value.id} />,
          SPAN(value.correction == 1, value.received_amount, `${(value.payment_method == 0) ? "Cash" : "UPI"} : ${value.received_amount}₹`, false, scr, AMOUNT, "Received Amount", value.id),
          SPAN(value.correction == 1, value.balance, `${(value.balance)}₹`, true, scr, "", "Balance", value.id),
          SPAN(value.correction == 1, value.correction, value.correction == 1 ? "Yes" : "No", false, scr, CLEAR_MISTAKE, "Correction", value.id),
     ];
}

function makeRowSting(value) {
     var data = ""
     data =
          "/nCourier Boy : " + titleCase(value.courier_boy_id.name) +
          "/nCustomer Name : " + titleCase(value.customer_id.name) +
          "/nAddress : " + value.customer_id.address +
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
     //convert to epoch
     var date = new Date(dateString);
     var epoch = date.getTime();
     //convert to date with 5:30 UTC use 12 hour format
     var date = new Date(epoch);
     var hours = date.getHours();
     var minutes = date.getMinutes();
     var ampm = hours >= 12 ? "PM" : "AM";
     hours = hours % 12;
     hours = hours ? hours : 12; // the hour '0' should be '12'
     minutes = minutes < 10 ? "0" + minutes : minutes;
     var strTime = hours + ":" + minutes + " " + ampm;
     return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + strTime;
}

export default deliveryHistory;