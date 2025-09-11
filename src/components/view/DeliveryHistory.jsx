/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Box, Chip, Divider, LinearProgress, Select, Stack, Tab, Table, TabList, TabPanel, Tabs, Option, Button, Modal, Sheet, ModalClose, Typography, Input, List, ListItem, ListItemButton, ListItemDecorator, ListItemContent, FormControl, FormLabel, RadioGroup, Radio, Card, IconButton, CircularProgress, Autocomplete, TextField } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { deleteDeliveryById, fetchDeliveries, UPDATE_DELIVERY_SUCCESS_RESET, updateDelivery, updateDeliverySuccess } from "../../redux/actions/deliveryActions.js";
import { fetchGasData } from "../../state/GasList.jsx";
import { fetchUser, fetchUserRequest } from "../../redux/actions/userActions.js";
import { RxFontStyle } from "react-icons/rx";
import { FcHighPriority } from "react-icons/fc";
import { CgClose, CgUser } from "react-icons/cg";
import { MdDone, MdEdit, MdKeyboardArrowDown, MdKeyboardArrowRight, MdKeyboardArrowUp } from "react-icons/md";
import { IoMdClose, IoMdDoneAll } from "react-icons/io";
import { TbCylinder } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { addGasDelivery, deleteGasDelivery, gasDeliverySuccessReset, UPDATE_GAS_DELIVERY_SUCCESS_RESET, updateCreateDelete, updateGasDelivery } from "../../redux/actions/gasDeliveryActions.js";
import { off, set } from "firebase/database";
import { RiDeleteBinFill } from "react-icons/ri";
import gasServices from "../../services/gas-services.jsx";
import PropTypes from 'prop-types';
import { decimalFix, titleCase, updateUrlParams } from "../../Tools.jsx";
import ExportCSV from "../ExportCSV.jsx";
import { updateGas } from "../../state/UpdateGas.jsx";
import { updateOrCreateCustomerPayments } from "../../redux/customerPaymentsUpdateOrCreate.js";
import Switch, { switchClasses } from '@mui/joy/Switch';
import { BsArrowDown, BsCalendar } from "react-icons/bs";
import { FaArrowDown, FaCalendarAlt } from "react-icons/fa";
const COLORS = {
     WHITE: "#ffffff",
     KG_4: "#fde3e3",
     KG_12: "#e3f2fd",
     KG_15: "#e8f5e9",
     KG_17: "#fff3e0",
     KG_21: "#f3e5f5"
};

const columns = [
     //Info
     { column: "date", color: COLORS.WHITE },
     { column: "customer", color: COLORS.WHITE },

     //4KG Group
     { column: "4kg cyl", color: COLORS.KG_4 },
     { column: "mt", color: COLORS.KG_4 },
     { column: "rate", color: COLORS.KG_4 },
     { column: "total", color: COLORS.KG_4 },

     // 12KG Group 
     { column: "12kg cyl", color: COLORS.KG_12 },
     { column: "mt", color: COLORS.KG_12 },
     { column: "rate", color: COLORS.KG_12 },
     { column: "total", color: COLORS.KG_12 },

     // 15KG Group
     { column: "15kg cyl", color: COLORS.KG_15 },
     { column: "mt", color: COLORS.KG_15 },
     { column: "rate", color: COLORS.KG_15 },
     { column: "total", color: COLORS.KG_15 },

     // 21KG Group
     { column: "21kg cyl", color: COLORS.KG_21 },
     { column: "mt", color: COLORS.KG_21 },
     { column: "rate", color: COLORS.KG_21 },
     { column: "total", color: COLORS.KG_21 },

     // Summary rows  
     { column: "sub total", color: COLORS.WHITE },
     { column: "received", color: COLORS.WHITE },
     { column: "balance", color: COLORS.WHITE }
];
const CUSTOMER_LIST = [];
const ADMIN_LIST = new Map();
const DELIVERY_BOY_LIST = new Map();
let gasList = new Map();
let deleveryGasEditUiGasList = [];
let ncGasDeliveryList = {};
function setGasDeliveryList(parentKey, childKey, value) {
     if (!ncGasDeliveryList[parentKey]) {
          ncGasDeliveryList[parentKey] = {};
     }
     ncGasDeliveryList[parentKey][childKey] = value;
}
export default function deliveryHistory() {

     const dispatch = useDispatch();
     const deliveriesData = useSelector((state) => state.deliverys);
     let deliveries = deliveriesData.deliveries;
     const loading = deliveriesData.loading;
     const updateSuccess = deliveriesData.updateSuccess;
     const error = deliveriesData.error;
     //console.log(deliveries);
     const { userDataLoading, users, userDataError } = useSelector((state) => state.user);
     const allGasData = useSelector((state) => state.gas);
     const { gasDeliverysSucsess } = useSelector((state) => state.gasDelivery);
     const [page, setPage] = useState(1);

     deleveryGasEditUiGasList.length = 0;
     gasList.clear();

     if (allGasData.data != null) {
          allGasData.data.data.forEach((value) => {
               gasList.set(value.id, value)
               deleveryGasEditUiGasList.push(<Option key={value.id} value={value.id}>{value.company_name} - {value.kg}KG</Option>)
          })
     }
     //console.log(users);

     //clear customer list
     CUSTOMER_LIST.length = 0
     if (users != null && users != undefined) {
          const customerOptions = users.map((user) => {
               if (user.courier_boys.length != 0) {
                    if (user.courier_boys[0]?.login?.role == 2) {
                         DELIVERY_BOY_LIST.set(user.courier_boys[0].id, user)
                    } else {
                         ADMIN_LIST.set(user.courier_boys[0].id, user)
                    }
               }
               if (user.customers.length == 0) {
                    return null;
               }
               const customerId = user.customers[0]?.id;
               const customerName = titleCase(user.name);
               const address = titleCase(user.address);
               return {
                    id: customerId,
                    label: `${customerName} (${address})`,
               }
          }).filter(Boolean);

          CUSTOMER_LIST.push(...customerOptions);
     }
     //console.log(CUSTOMER_LIST)

     const currentUrl = window.location.href;
     const hashIndex = currentUrl.indexOf('#');
     const hashPart = currentUrl.substring(hashIndex + 1);
     const url = new URL(hashPart, window.location.origin);
     const searchParams = new URLSearchParams(url.search);
     const urlCustomerId = searchParams.get('customerId');
     const urlCourierBoyId = searchParams.get('deliverBoyId');
     const date_start = searchParams.get('dateStart');
     const date_end = searchParams.get('dateEnd');

     //console.log(deliveries);

     let tempUrlCustomerId = urlCustomerId ? Number(urlCustomerId) : null;
     let tempUrlCourierBoyId = urlCourierBoyId ? Number(urlCourierBoyId) : null;

     //console.log([{ urlCustomerId, tempUrlCustomerId }, { urlCourierBoyId, tempUrlCourierBoyId }]);

     const [customerId, setTheCustomerId] = useState(tempUrlCustomerId);
     const [deliverBoyId, setDeliverTheBoyId] = useState(tempUrlCourierBoyId);
     const [dateStart, setDateStartState] = useState(
          () => {
               if (date_start) {
                    return formatDate(new Date(date_start));
               }
               return formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
          }
     );
     const [dateEnd, setDateEndState] = useState(
          () => {
               if (date_end) {
                    return formatDate(new Date(date_end));
               }
               //date of current month end date
               let date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
               return formatDate(date)
          }
     );

     const setCustomerId = (customerId) => {
          setTheCustomerId(customerId);
          loadData(true);
     }
     const setDeliverBoyId = (deliverBoyId) => {
          setDeliverTheBoyId(deliverBoyId);
          loadData(true);
     }
     const setDateStart = (date) => {
          setDateStartState(date);
          loadData(true);
     }
     const setDateEnd = (date) => {
          setDateEndState(date);
          loadData(true);
     }

     const loadData = (force = false, resetPage = false) => {
          let tempPage = page
          if (resetPage) {
               setPage(1);
               tempPage = 1
          }
          const fetchDeliveriesParams = { dateStart: dateStart, dateEnd: dateEnd, customer_id: customerId, courier_boy_id: deliverBoyId, page: tempPage }
          if (force) {
               dispatch(fetchDeliveries(fetchDeliveriesParams));
          } else if (
               ((deliveries == null || deliveries == undefined) && loading == false)
          ) {
               dispatch(fetchDeliveries(fetchDeliveriesParams));
          }
     }

     const loadMore = () => {
          setPage(page + 1);
          loadData(true);
     }

     const updateUrlParams = (dateStart, dateEnd, customerId, deliverBoyId) => {
          // Grab everything after the #
          const fullHash = window.location.hash.substring(1);            // e.g. "/admin/deliveryHistory?foo=bar"
          const [path, rawQuery = ''] = fullHash.split('?');             // separate path and query

          const params = new URLSearchParams(rawQuery);

          // Set or delete each filter
          const updates = { dateStart, dateEnd, customerId, deliverBoyId };
          Object.entries(updates).forEach(([key, val]) => {
               if (val == null || val === '') {
                    params.delete(key);
               } else {
                    params.set(key, val);
               }
          });

          // Rebuild and replace the hash (no history entry)
          const newHash = path + (params.toString() ? `?${params}` : '');
          if (`#${newHash}` !== window.location.hash) {
               window.location.replace(window.location.pathname + window.location.search + `#${newHash}`);
          }
     }

     updateUrlParams(
          dateStart,
          dateEnd,
          customerId,
          deliverBoyId
     )

     useEffect(() => {
          loadData();
          if (
               userDataLoading === false
               && (users == null || users == undefined)
               && loading == false
          ) {
               console.log("fetchUser...");
               dispatch(fetchUser());
          }
          if (
               !(allGasData.isError)
               && !allGasData.isLoading
               && !loading
               && !userDataLoading
               && (allGasData.data == null || allGasData.data.data.length === 0)
          ) {
               console.log("fetchGasData...");
               dispatch(fetchGasData());
          }
     })

     useEffect(() => {
          gasServices.listenDataChange(() => {
               if (
                    loading === false
               ) {
                    console.log("fetchDeliveries...Fire");
                    loadData(true, true);
               }
          });
     }, []);

     //console.log(gasDeliverysSucsess, updateSuccess)
     if (gasDeliverysSucsess) {
          dispatch({
               type: UPDATE_GAS_DELIVERY_SUCCESS_RESET,
          });
          loadData(true);
     }
     if (updateSuccess) {
          dispatch({
               type: UPDATE_DELIVERY_SUCCESS_RESET
          })
          loadData(true);
     }
     //loadData(true);

     // First, let's add a helper function to calculate gas group totals

     // Update the createData function to be more organized
     function createData(date, info, gasInfo, kg4Data, kg12Data, kg15Data, kg21Data, received, ncToatl, isOutstanding) {

          const kg4 = calculateGasGroup(kg4Data.cylinders, kg4Data.mt, kg4Data.rate);
          const kg12 = calculateGasGroup(kg12Data.cylinders, kg12Data.mt, kg12Data.rate);
          const kg15 = calculateGasGroup(kg15Data.cylinders, kg15Data.mt, kg15Data.rate);
          const kg21 = calculateGasGroup(kg21Data.cylinders, kg21Data.mt, kg21Data.rate);

          const subTotal = kg4.total + kg12.total + kg15.total + kg21.total + ncToatl;

          return {
               date,
               customer: info.customer,
               info: info,
               gasInfo: gasInfo,
               kg4,
               kg12,
               kg15,
               kg21,
               subTotal,
               received,
               isOutstanding
          };
     }

     // Update the rows data with the new structure
     let rows = []
     let csvData = []
     //console.log(ADMIN_LIST)
     if (deliveries != null || deliveries != undefined) {
          if (!deliveries.noData) {

               deliveries.sort((a, b) => {
                    const dateA = new Date(a.created_at);
                    const dateB = new Date(b.created_at);
                    return dateB - dateA;
               });

               ncGasDeliveryList = {}
               rows = deliveries.map((delivery) => {

                    if (deliverBoyId != null || deliverBoyId != undefined) {
                         if (delivery.courier_boy.id != deliverBoyId) {
                              return;
                         }
                    }
                    if (customerId != null || customerId != undefined) {
                         if (delivery.customer.id != customerId) {
                              return;
                         }
                    }

                    if (
                         (date_start && date_end) &&
                         (
                              new Date(delivery.created_at) < new Date(date_start) ||
                              new Date(delivery.created_at) > new Date(date_end)
                         )
                    ) {
                         return;
                    }


                    let isAdmin = false
                    const date = formatDateToDDMMYY_HHMM(delivery.created_at)
                    if (ADMIN_LIST.get(delivery.courier_boy.id)) {
                         isAdmin = true
                         delivery.payments.forEach((payment) => {
                              csvData.push([
                                   //"Date",
                                   date + "",
                                   //"Customer",
                                   titleCase(delivery.customer.name) + "",
                                   "Outstanding",
                                   //"4KG CYL",
                                   "",
                                   //"MT",
                                   "",
                                   //"Rate",
                                   "",
                                   //"Total",
                                   "",
                                   //"12KG CYL",
                                   "",
                                   //"MT",
                                   "",
                                   //"Rate",
                                   "",
                                   //"Total",
                                   "",
                                   //"15KG CYL",
                                   "",
                                   //"MT",
                                   "",
                                   //"Rate",
                                   "",
                                   //"Total",
                                   "",
                                   //"21KG CYL",
                                   "",
                                   //"MT",
                                   "",
                                   //"Rate",
                                   "",
                                   //"Total",
                                   "",
                                   //"Sub Total",
                                   "",
                                   //"Received",
                                   payment.amount + "",
                                   //"Balance"
                                   ""
                              ])
                         })
                    }

                    let totalCash = 0
                    let totalOnline = 0

                    let cyl4KgQty = 0
                    let cyl4KgNcQty = 0
                    let cyl4KgMt = 0
                    let cyl4KgRate = 0
                    let cyl4KgNcRate = 0

                    let cyl12KgQty = 0
                    let cyl12KgNcQty = 0
                    let cyl12KgMt = 0
                    let cyl12KgRate = 0
                    let cyl12KgNcRate = 0

                    let cyl15KgQty = 0
                    let cyl15KgNcQty = 0
                    let cyl15KgMt = 0
                    let cyl15KgRate = 0
                    let cyl15KgNcRate = 0

                    let cyl21KgQty = 0
                    let cyl21KgNcQty = 0
                    let cyl21KgMt = 0
                    let cyl21KgRate = 0
                    let cyl21KgNcRate = 0

                    delivery.payments.forEach((payment) => {
                         if (payment.method == 0) {
                              totalCash += Number(payment.amount)
                         } else {
                              totalOnline += Number(payment.amount)
                         }
                    })

                    const cylinder_list = delivery.gas_deliveries.map((gas) => {

                         if (gas.nc) {
                              //console.log(gas);
                              setGasDeliveryList("d_" + delivery.id, "kg_" + gas.kg, gas)
                              if (gas.kg == 4) {
                                   cyl12KgNcQty = Number(gas.quantity)
                                   cyl12KgNcRate = Number(gas.gas_price)
                              } else if (gas.kg == 12) {
                                   cyl12KgNcQty = Number(gas.quantity)
                                   cyl12KgNcRate = Number(gas.gas_price)
                              } else if (gas.kg == 15) {
                                   cyl15KgNcQty = Number(gas.quantity)
                                   cyl15KgNcRate = Number(gas.gas_price)
                              } else if (gas.kg == 21) {
                                   cyl21KgNcQty = Number(gas.quantity)
                                   cyl21KgNcRate = Number(gas.gas_price)
                              }
                              //dont add in nc gas return
                              return
                         }
                         if (gas.kg == 4) {
                              if (!gas.is_empty) {
                                   cyl4KgQty = Number(gas.quantity)
                                   cyl4KgRate = Number(gas.gas_price)
                              } else {
                                   cyl4KgMt += Number(gas.quantity)
                              }
                         }
                         if (gas.kg == 12) {
                              if (!gas.is_empty) {
                                   cyl12KgQty = Number(gas.quantity)
                                   cyl12KgRate = Number(gas.gas_price)
                              } else {
                                   cyl12KgMt += Number(gas.quantity)
                              }
                         }
                         if (gas.kg == 15) {
                              if (!gas.is_empty) {
                                   cyl15KgQty = Number(gas.quantity)
                                   cyl15KgRate = Number(gas.gas_price)
                              } else {
                                   cyl15KgMt += Number(gas.quantity)
                              }
                         }
                         if (gas.kg == 21) {
                              if (!gas.is_empty) {
                                   cyl21KgQty = Number(gas.quantity)
                                   cyl21KgRate = Number(gas.gas_price)
                              } else {
                                   cyl21KgMt += Number(gas.quantity)
                              }
                         }
                         return {
                              cylinder: gas.brand,
                              qty: Number(gas.quantity),
                              kg: 15
                         }
                    })

                    let total4Kg = Number(cyl4KgQty) * Number(cyl4KgRate)
                    let total4KgNc = Number(cyl4KgNcQty) * Number(cyl4KgNcRate)

                    let total12Kg = Number(cyl12KgQty) * Number(cyl12KgRate)
                    let total12KgNc = Number(cyl12KgNcQty) * Number(cyl12KgNcRate)

                    let total15Kg = Number(cyl15KgQty) * Number(cyl15KgRate)
                    let total15KgNc = Number(cyl15KgNcQty) * Number(cyl15KgNcRate)

                    let total21Kg = Number(cyl21KgQty) * Number(cyl21KgRate)
                    let total21KgNc = Number(cyl21KgNcQty) * Number(cyl21KgNcRate)

                    let ncTotal = Number(total4KgNc) + Number(total12KgNc) + Number(total15KgNc) + Number(total21KgNc)

                    let totalTotal = Number(total12Kg) + Number(total15Kg) + Number(total21Kg) + Number(total4Kg)

                    let received = Number(totalCash) + Number(totalOnline)

                    let balance = 0

                    if ((ncTotal + totalTotal > 0)) {
                         balance = totalTotal - received + ncTotal
                    }

                    // if (isAdmin) {
                    //      console.log(ncTotal + totalTotal, balance, isAdmin)
                    // }

                    if (
                         total4KgNc + total12KgNc + total15KgNc + total21KgNc > 0
                    ) {
                         csvData.push([

                              //"Date",
                              date + "",
                              //"Customer",
                              titleCase(delivery.customer.name) + "",

                              "NC",
                              //"4KG CYL",
                              cyl4KgNcQty + "",
                              //"MT",
                              "",
                              //"Rate",
                              cyl4KgNcRate + "",
                              //"Total",
                              total4KgNc + "",

                              //"12KG CYL",
                              cyl12KgNcQty + "",
                              //"MT",
                              "",
                              //"Rate",
                              cyl12KgNcRate + "",
                              //"Total",
                              total12KgNc + "",

                              //"15KG CYL",
                              cyl15KgNcQty + "",
                              //"MT",
                              "",
                              //"Rate",
                              cyl15KgNcRate + "",
                              //"Total",
                              total15KgNc + "",

                              //"21KG CYL",
                              cyl21KgNcQty + "",
                              //"MT",
                              "",
                              //"Rate",
                              cyl21KgNcRate + "",
                              //"Total",
                              total21KgNc + "",
                              //"Sub Total",

                              ncTotal + "",
                              //"Received",
                              "",
                              //"Balance"
                              ncTotal + ""
                         ])
                    }
                    if (total4Kg + total12Kg + total15Kg + total21Kg > 0) {
                         csvData.push([
                              //"Date",
                              date + "",
                              //"Customer",
                              titleCase(delivery.customer.name) + "",
                              "",
                              //"4KG CYL",
                              cyl4KgQty + "",
                              //"MT",
                              cyl4KgMt + "",
                              //"Rate",
                              cyl4KgRate + "",
                              //"Total",
                              total4Kg + "",
                              //"12KG CYL",
                              cyl12KgQty + "",
                              //"MT",
                              cyl12KgMt + "",
                              //"Rate",
                              cyl12KgRate + "",
                              //"Total",
                              total12Kg + "",
                              //"15KG CYL",
                              cyl15KgQty + "",
                              //"MT",
                              cyl15KgMt + "",
                              //"Rate",
                              cyl15KgRate + "",
                              //"Total",
                              total15Kg + "",
                              //"21KG CYL",
                              cyl21KgQty + "",
                              //"MT",
                              cyl21KgMt + "",
                              //"Rate",
                              cyl21KgRate + "",
                              //"Total",
                              total21Kg + "",
                              //"Sub Total",
                              totalTotal + "",
                              //"Received",
                              received + "",
                              //"Balance"
                              balance + ""
                         ])
                    }
                    return createData(
                         // date
                         date,
                         // info
                         {
                              dileveryId: delivery.id,
                              custId: delivery.customer.id,
                              customer: titleCase(delivery.customer.name),
                              //diaryNumber: delivery.customer.diaryNumber,
                              adress: delivery.customer.address,
                              deliveredBy: delivery.courier_boy.name,
                              deliverBoyId: delivery.courier_boy.id,
                              cash: totalCash,
                              online: totalOnline,
                              correction: delivery.correction,
                              paid: delivery.payments.length > 0,
                              gasList: delivery.gas_deliveries,
                              payments: delivery.payments,
                         },
                         //gasInfo
                         cylinder_list,
                         // 4KG Group
                         { cylinders: cyl4KgQty, mt: cyl4KgMt, rate: cyl4KgRate },
                         // 12KG Group
                         { cylinders: cyl12KgQty, mt: cyl12KgMt, rate: cyl12KgRate },
                         // 15KG Group
                         { cylinders: cyl15KgQty, mt: cyl15KgMt, rate: cyl15KgRate },
                         // 21KG Group
                         { cylinders: cyl21KgQty, mt: cyl21KgMt, rate: cyl21KgRate },
                         // received amount
                         (totalCash + totalOnline),
                         // nc total
                         ncTotal,
                         // is outstanding
                         isAdmin
                    )
               });
          }
     }

     //console.log(ncGasDeliveryList);

     const headers = columns.map((col) => col.column);

     //add NC column at 3rd position
     headers.splice(2, 0, "remark");

     return <Stack
          sx={{
               //height: "100%",
               width: "100%",
               backgroundColor: "white",
               borderRadius: "lg",
               overflow: "auto",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               color: "black",
               flexGrow: 1
          }}
     >
          <Box
               sx={{
                    width: "100%",
                    display: loading ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center",
               }}
          >
               <LinearProgress />
          </Box>

          <Stack
               sx={{
                    width: "100%",
                    overflow: "auto",
                    flexGrow: 1,
                    alignItems: "center",
               }}
               direction="row"
               gap={1}
               mt={.5}
               mb={.5}
               pr={.5}
               alignContent={"end"}
               justifyContent={"flex-end"}
          >
               <ExportCSV
                    headers={headers}
                    data={csvData}
                    filename={
                         "deliveries_" + formatDateToDDMMYY(dateStart) + "_TO_" + formatDateToDDMMYY(dateEnd) + ".csv"
                    }
               >Download File</ExportCSV>
               <Divider
                    sx={{
                         flexGrow: 1,
                         opacity: 0,
                    }}
               />
               <span
                    style={{
                         fontWeight: "bold",
                         color: "black",
                    }}
               >Customer :</span>
               <Select
                    defaultValue={customerId ? customerId : null}
                    placeholder="Select Customer"
                    onChange={(event, value) => {
                         if (value === "") {
                              setCustomerId(null);
                              return;
                         }
                         setCustomerId(value);
                    }}
               >
                    <Option value="">Show All</Option>
                    {
                         CUSTOMER_LIST.map((user) => (
                              <Option key={user.id} value={user.id}>
                                   {titleCase(user.label)}
                              </Option>
                         ))
                    }
               </Select>
               <span
                    style={{
                         fontWeight: "bold",
                         color: "black",
                    }}
               >Delivery Boy :</span>
               <Select
                    defaultValue={deliverBoyId ? deliverBoyId : null}
                    placeholder="Select Delivery Boy"
                    onChange={(event, value) => {
                         if (value === "") {
                              setDeliverBoyId(null);
                              return;
                         }
                         setDeliverBoyId(value);
                    }}
               >
                    <Option value="">Show All</Option>
                    {[...DELIVERY_BOY_LIST.entries()].map(([courierId, user]) => (
                         <Option key={courierId} value={courierId}>
                              {titleCase(user.name)}
                         </Option>
                    ))}
               </Select>
               <span
                    style={{
                         fontWeight: "bold",
                         color: "black",
                    }}
               >Date :</span>
               <Input
                    type="date"
                    defaultValue={dateStart}
                    onChange={(event) => {
                         // Handle date start change
                         // setParamsUpdate(true);
                         setDateStart(event.target.value);
                    }}
               />
               <Input
                    type="date"
                    defaultValue={dateEnd}
                    onChange={(event) => {
                         // Handle date start change
                         // setParamsUpdate(true);
                         setDateEnd(event.target.value);
                    }}
               />
               {/* <Button
                    sx={{
                         borderRadius: "md",
                    }}
                    onClick={() => { loadData(true) }}>Load</Button> */}
          </Stack>
          <Stack sx={{ backgroundColor: "lightblue", width: "100%", flexGrow: 1, }}>
               <Sheet
                    sx={{
                         flexGrow: 1
                    }}
               >
                    <Table
                         aria-label="collapsible table"
                         size="md"
                         stickyHeader={true}
                         sx={{
                              wordBreak: "keep-all",
                              tableLayout: "auto",
                              fontWeight: "bold",
                              //0px padding and margin in td and th and tr
                              "& td, & tr": {
                                   padding: 0,
                                   margin: 0,
                                   //important to override mui default border
                                   borderBottomWidth: 0,
                                   height: "unset",
                                   verticalAlign: "middle",
                              }
                         }}
                    >
                         <thead>
                              <tr>
                                   {/* <th style={{ width: 40 }} aria-label="empty" />
                                   <th style={{ width: '40%' }}>Dessert (100g serving)</th> */}
                                   <th style={{ width: 40 }} aria-label="empty" />
                                   {
                                        columns.map((col, index) => (
                                             <th
                                                  key={index + "_" + col.column}
                                                  style={{
                                                       textAlign: "center",
                                                       backgroundColor: col.color,
                                                       //break word
                                                       wordBreak: "break-space",
                                                  }}
                                             >
                                                  {col.column}
                                             </th>
                                        ))
                                   }
                              </tr>
                         </thead>
                         <tbody>
                              {rows.map((row, index) => {
                                   if (row == null || row == undefined) {
                                        return null;
                                   }
                                   return (
                                        <Row
                                             key={row.date + "_" + index}
                                             row={row}
                                             initialOpen={false}
                                             updateCustomer={(customer) => {
                                                  console.log(customer);
                                                  const ok = window.confirm("Please Confirm Change");
                                                  if (ok) {
                                                       dispatch(updateDelivery({ id: row.info.dileveryId, customer_id: customer.id }))
                                                  }
                                                  return ok;
                                             }}
                                             deleteDelivery={() => {
                                                  const id = window.prompt(`Please Input ${row.info.dileveryId} to Delete`);
                                                  const ok = id == row.info.dileveryId
                                                  if (ok) {
                                                       //console.log("id", id);
                                                       dispatch(deleteDeliveryById(row.info.dileveryId))
                                                  }
                                                  return ok;
                                             }}
                                             updateGas={(payload) => {
                                                  console.log("updateGas : ", payload);
                                                  dispatch(
                                                       updateCreateDelete(
                                                            payload
                                                       )
                                                  )
                                             }}
                                        />
                                   )
                              })}
                              {
                                   ((rows.length == 0) ? <tr>
                                        <td colSpan={columns.length + 1} style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.8em" }}>No Data</td>
                                   </tr> : null
                                   )
                              }
                              {
                                   (!(rows.length == 0) ? <tr>
                                        <td colSpan={columns.length + 1} style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.8em" }}>
                                             <Button
                                                  sx={{
                                                       borderRadius: "md",
                                                       mb: 1,
                                                       mt: 1,
                                                  }}
                                                  onClick={() => {
                                                       loadMore()
                                                  }}
                                             >
                                                  <Stack
                                                       direction="row"
                                                       gap={1}
                                                       alignItems="center"
                                                       justifyContent="center"

                                                  >
                                                       {
                                                            loading ? <CircularProgress
                                                                 sx={{
                                                                      width: "1.5em",
                                                                      height: "1.5em",
                                                                      borderRadius: "50%",
                                                                      color: "white",
                                                                 }}
                                                            /> : <FaArrowDown />
                                                       }
                                                       <span className="b">Load Mores</span>
                                                  </Stack>

                                             </Button>
                                        </td>
                                   </tr> : null
                                   )
                              }
                         </tbody>
                    </Table>
               </Sheet>
          </Stack>
     </Stack>
}
function Row({
     row,
     initialOpen = false,
     updateCustomer,
}) {

     const dispatch = useDispatch();

     const [open, setOpen] = React.useState(initialOpen);
     const [openEdit, setOpenEdit] = React.useState(false);

     let balance = row.subTotal - row.received
     //o if nagative
     if (row.subTotal == 0) {
          balance = 0
     }

     console.log("rendering");
     // Define the cell groups for easier mapping

     const Cell = (cell, id, kg, type) => {
          let nc = false;
          let data = null;
          try {
               nc = true
               data = ncGasDeliveryList["d_" + id]["kg_" + kg]
               //console.log("ncGasDeliveryList", data);
               if (type == "total") {
                    data = data.gas_price * data.quantity
               } else {
                    data = data[type]
               }
               if (type == "total" || type == "gas_price") {
                    data = decimalFix(data, true)
               }
               //console.log("ncGasDeliveryList", data);
          } catch (e) {
               nc = false
          }
          return <Stack
               direction="column"
          >
               <span>{cell}</span>
               {
                    nc ? <>
                         <Divider orientation="horizontal" sx={{ flexGrow: 1 }} />
                         <span className="b" style={{ color: "#093FB4" }}>{data}</span>
                    </> : null
               }
          </Stack>
     }
     //console.log(row.info.dileveryId);
     const did = row.info.dileveryId;
     const cellGroups = [
          {
               key: 'info', cells: [
                    { value: row.date },
                    { value: row.info.customer }
               ], color: COLORS.WHITE
          },
          {
               key: 'kg4', cells: [
                    { value: Cell(decimalFix(row.kg4.cylinders), did, 4, "quantity") },
                    { value: decimalFix(row.kg4.mt) },
                    { value: Cell(decimalFix(row.kg4.rate, true), did, 4, "gas_price") },
                    { value: Cell(decimalFix(row.kg4.total, true), did, 4, "total") }
               ],
               color: COLORS.KG_4
          },
          {
               key: 'kg12', cells: [
                    { value: Cell(decimalFix(row.kg12.cylinders), did, 12, "quantity") },
                    { value: decimalFix(row.kg12.mt) },
                    { value: Cell(decimalFix(row.kg12.rate, true), did, 12, "gas_price") },
                    { value: Cell(decimalFix(row.kg12.total, true), did, 12, "total") }
               ], color: COLORS.KG_12
          },
          {
               key: 'kg15', cells: [
                    { value: Cell(decimalFix(row.kg15.cylinders), did, 15, "quantity") },
                    { value: decimalFix(row.kg15.mt) },
                    { value: Cell(decimalFix(row.kg15.rate, true), did, 15, "gas_price") },
                    { value: Cell(decimalFix(row.kg15.total, true), did, 15, "total") }
               ], color: COLORS.KG_15
          },
          {
               key: 'kg21', cells: [
                    { value: Cell(decimalFix(row.kg21.cylinders), did, 21, "quantity") },
                    { value: decimalFix(row.kg21.mt) },
                    { value: Cell(decimalFix(row.kg21.rate, true), did, 21, "gas_price") },
                    { value: Cell(decimalFix(row.kg21.total, true), did, 21, "total") }
               ], color: COLORS.KG_21
          },
          {
               key: 'summary', cells: [
                    { value: decimalFix(row.subTotal, true) },
                    { value: decimalFix(row.received, true) },
                    //balance
                    {
                         value: decimalFix(balance, true)
                    }
               ], color: COLORS.WHITE
          }
     ];
     const DropEditor = () => {
          return (<Box>
               <IconButton
                    aria-label="expand row"
                    variant="plain"
                    color="neutral"
                    size="sm"
                    onClick={() => setOpen(!open)}
               >
                    {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
               </IconButton>
          </Box>)
     }
     const DropSheet = () => {
          function toDateTimeLocal(str) {
               // str = "04/09/25 - 05:44 PM"
               const [datePart, timePart] = str.split(" - ");
               const [day, month, year2] = datePart.split("/");
               let [time, ampm] = timePart.split(" ");
               let [hours, minutes] = time.split(":").map(Number);

               if (ampm.toUpperCase() === "PM" && hours < 12) hours += 12;
               if (ampm.toUpperCase() === "AM" && hours === 12) hours = 0;

               const date = new Date(
                    2000 + Number(year2),   // 25 → 2025
                    Number(month) - 1,      // JS months 0-indexed
                    Number(day),
                    hours,
                    minutes
               );

               const pad = (n) => String(n).padStart(2, "0");
               return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
          }

          function DateTimeInputToggle({ initialDate }) {
               const [value, setValue] = useState(toDateTimeLocal(initialDate));
               const inputRef = useRef(null);
               const [dateUpdated, setDateUpdated] = useState(false);

               const handleClick = () => {
                    if (inputRef.current) {
                         if (inputRef.current.showPicker) {
                              inputRef.current.showPicker();
                         } else {
                              inputRef.current.click();
                         }
                    }
               };

               return (
                    <Box sx={{ position: "relative" }}>
                         <Button
                              startDecorator={<FaCalendarAlt />}
                              variant="soft"
                              color="success"
                              onClick={handleClick}>
                              {value
                                   ? new Date(value).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                   })
                                   : "Select Date & Time"}
                         </Button>
                         <input
                              ref={inputRef}
                              type="datetime-local"
                              value={value}
                              onChange={(e) => {
                                   setDateUpdated(true);
                                   setValue(e.target.value)
                              }}
                              style={{
                                   position: "absolute",
                                   opacity: 0,
                                   pointerEvents: "none",
                              }}
                         />
                         {dateUpdated && (
                              <Button
                                   onClick={() => {
                                        setDateUpdated(false);
                                        dispatch(updateDelivery({ id: row.info.dileveryId, created_at: value }))
                                   }}
                              >Save</Button>
                         )}
                    </Box>
               );
          }
          return (
               <Sheet
                    variant="soft"
                    sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)', m: 0 }}
               >
                    <Typography level="body-lg" component="div">
                         Details
                    </Typography>
                    <Table
                         borderAxis="bothBetween"
                         size="md"
                         stickyFooter={false}
                         stickyHeader={false}
                         stripe="even"
                         sx={{
                              fontWeight: "bold",
                              tableLayout: "auto",
                              '& thead td:nth-child(1)': { width: '256px' },
                              // '& thead td:nth-child(2)': { width: '80%' }
                         }}
                    >
                         <thead>
                              {/* <tr>
                                   <td>Diary Number</td>
                                   <td>
                                        {row.info.diaryNumber}
                                   </td>
                              </tr> */}
                              <tr>
                                   <td>Date & Time</td>
                                   <td>
                                        <DateTimeInputToggle initialDate={row.date} />
                                   </td>
                              </tr>
                              <tr>
                                   <td>Customer</td>
                                   <td>
                                        {/* {titleCase(row.info.customer)} */}
                                        <UpdateCell
                                             value={{
                                                  cust_id: row.info.custId,
                                                  name: row.info.customer
                                             }}
                                             onChange={(customer) => {
                                                  return updateCustomer(customer)
                                             }}
                                        />
                                   </td>
                              </tr>
                              <tr>
                                   <td>Address</td>
                                   <td>
                                        {titleCase(row.info.adress)}
                                   </td>
                              </tr>
                              <tr>
                                   <td>Delivered By</td>
                                   <td>
                                        {titleCase(row.info.deliveredBy)}
                                   </td>
                              </tr>
                              <tr>
                                   <td>Cash</td>
                                   <td>
                                        {decimalFix(row.info.cash)}
                                   </td>
                              </tr>
                              <tr>
                                   <td>Online</td>
                                   <td>
                                        {
                                             decimalFix(row.info.online)
                                        }
                                   </td>
                              </tr>
                              <tr>
                                   <td>Correction</td>
                                   <td>
                                        {row.info.correction ? "Yes" : "No"}
                                   </td>
                              </tr>
                              <tr>
                                   <td
                                        colSpan={2}
                                   >
                                        <GasEditUi
                                             selectedGasList={row.info.gasList}
                                             customer={
                                                  row.info.custId
                                             }
                                             deliveryBoy={
                                                  row.info.deliverBoyId
                                             }
                                             deleveryId={row.info.dileveryId}
                                             payments={
                                                  row.info.payments
                                             }
                                             correction={row.info.correction}
                                             openEdit={openEdit}
                                             isOutstanding={row.isOutstanding}
                                        />
                                   </td>
                              </tr>
                         </thead>
                         <tbody>

                         </tbody>
                    </Table>
               </Sheet>
          )
     }
     if (row.isOutstanding) {
          //console.log(row);
          return (<>
               <tr>
                    <td
                         style={{
                              textAlign: "center",
                         }}
                    >
                         <DropEditor />
                    </td>
                    <td
                         style={{
                              textAlign: "center",
                         }}
                    >
                         {row.date}
                    </td>
                    <td
                         style={{
                              textAlign: "center",
                         }}
                    >
                         {row.info.customer}
                    </td>
                    <td
                         colSpan={columns.length + 1 - 5}
                         style={{
                              textAlign: "center",
                         }}
                    >
                         Outstanding
                    </td>
                    <td
                         style={{
                              textAlign: "center",
                         }}
                    >
                         {decimalFix(row.received, true)}
                    </td>
                    <td
                         style={{
                              textAlign: "center",
                         }}
                    >
                         -
                    </td>
               </tr>
               {open && (
                    <tr>
                         <td style={{ height: 0, padding: 0 }} colSpan={columns.length + 1}>

                              <DropSheet />

                         </td>
                    </tr>
               )}
          </>
          )
     }
     return (
          <React.Fragment>
               <tr style={{
                    textAlign: "center",
                    borderTopColor: (row.info.correction == true) ? "red" : "",
                    borderBottomColor: (row.info.correction == true) ? "red" : ""
               }}>
                    <td style={{
                         textAlign: "center", backgroundColor: COLORS.WHITE,
                         borderTopColor: (row.info.correction == true) ? "red" : "",
                         borderBottomColor: (row.info.correction == true) ? "red" : ""
                    }}>
                         <DropEditor />
                    </td>

                    {cellGroups.map(group => (
                         group.cells.map((cell, cellIndex) => (
                              <td
                                   key={`${group.key}-${cellIndex}`}
                                   style={{
                                        backgroundColor: group.color,
                                        textAlign: "center",
                                        borderTopColor: (row.info.correction == true) ? "red" : "",
                                        borderBottomColor: (row.info.correction == true) ? "red" : ""
                                   }}
                              >
                                   {cell.value}
                              </td>
                         ))
                    ))}
               </tr>
               {open && (
                    <tr>
                         <td style={{ height: 0, padding: 0 }} colSpan={columns.length + 1}>
                              <DropSheet />
                         </td>
                    </tr>
               )}
          </React.Fragment>
     );
}
const UpdateCell = ({ value, onChange }) => {
     const [valueState, setValueState] = React.useState(value);

     // Use CUSTOMER_LIST directly as it's now properly structured
     const options = CUSTOMER_LIST;

     // Find the current value in options
     const currentValue = options.find((opt) => opt.id === valueState.cust_id) || null;

     return (
          <Autocomplete
               key={`autocomplete-${valueState.cust_id}`} // Add unique key
               variant="outlined"
               placeholder={titleCase(valueState.name)}
               options={options}
               value={currentValue}
               onChange={(_, newOption) => {
                    if (newOption) {
                         const confirm = onChange(newOption);
                         if (confirm) {
                              setValueState({ cust_id: newOption.id, name: newOption.label });
                         }
                    }
               }}
               getOptionLabel={(option) => option.label || ''}
               isOptionEqualToValue={(option, val) => option && val && option.id === val.id}
               clearOnBlur={false}
               disableClearable
               freeSolo={false}
               openOnFocus={true}
               sx={{
                    fontWeight: 900,
                    color: 'black',
                    backgroundColor: 'white',
                    '& .MuiInput-root': {
                         fontWeight: "bold",
                    }
               }}
               slotProps={{
                    input: {
                         sx: {
                              fontWeight: 900,
                              color: 'black',
                         }
                    }
               }}
          />
     );
};

function formatDateToDDMMYY(dateString) {
     //convert to epoch
     var date = new Date(dateString);
     var dd = String(date.getDate()).padStart(2, '0');
     var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yy = date.getFullYear();
     var yyyy = yy.toString().slice(2, 4);
     return dd + "/" + mm + "/" + yyyy;
}
function formatDateToDDMMYY_HHMM(dateString) {
     //convert to epoch
     var date = new Date(dateString);
     var dd = String(date.getDate()).padStart(2, '0');
     var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yy = date.getFullYear();
     var yyyy = yy.toString().slice(2, 4);
     let str = dd + "/" + mm + "/" + yyyy;
     let time = date.toLocaleTimeString("en-IN", {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata'
     });
     time = time.toUpperCase();
     return str + " - " + time;
}
const formatDate = (date) => {
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     return `${year}-${month}-${day}`;
};
function calculateGasGroup(cylinders, mt, rate) {
     rate = Number(rate)
     cylinders = Number(cylinders)
     mt = Number(mt)
     return {
          cylinders,
          mt,
          rate,
          total: Number(cylinders) * Number(rate)
     };
}
const GasEditUi = ({
     selectedGasList,
     customer,
     deliveryBoy,
     deleveryId,
     payments,
     correction,
     openEdit,
     isOutstanding
}) => {
     //console.log("isOutstanding", isOutstanding)
     const dispatch = useDispatch();
     let onlinePayment = { id: null, amount: 0, method: null };
     let cashPayment = { id: null, amount: 0, method: null };

     const [checked, setChecked] = useState(correction);

     payments.forEach((payment) => {
          if (payment.method == 0) {
               cashPayment = {
                    id: payment.id,
                    amount: Number(payment.amount),
                    method: payment.method
               }
          } else {
               onlinePayment = {
                    id: payment.id,
                    amount: Number(payment.amount),
                    method: payment.method
               }
          }
     })

     const [cashAmount, setCashAmountState] = useState(cashPayment);
     const [onlineAmount, setOnlineAmountState] = useState(onlinePayment);

     let online = 0
     let cash = 0

     const setOnlineAmount = (amount) => {
          online = Number(amount)
          setOnlineAmountState({ id: onlinePayment.id, amount: Number(amount), method: onlinePayment.method })
     }
     const setCashAmount = (amount) => {
          cash = Number(amount)
          setCashAmountState({ id: cashPayment.id, amount: Number(amount), method: cashPayment.method })
     }

     //console.log(cashPayment);
     // console.log(onlinePayment);

     const [edit, setEdit] = useState(openEdit);
     const [editName, setEditName] = useState("");
     let glist = [];
     let tempGas = new Map();
     selectedGasList.forEach((gas) => {
          tempGas.set(gas.id, gas)
     })
     //console.log(tempGas);
     const [gasData, setGasData] = useState(tempGas);
     const [deletedGasData, setDeletedGasData] = useState(new Map())
     const handleSetGasData = (id, key, value) => {
          let tempGas = new Map(gasData);
          tempGas.set(id, { ...tempGas.get(id), [key]: value })
          //console.log([...tempGas.values()])
          setGasData(tempGas)
     }
     const handleAddGasData = (gasId) => {
          let tempGas = new Map(gasData);
          //check if gas is already added
          tempGas.set("new_" + gasData.size + 1, { id: "new_" + gasData.size + 1, is_empty: false, quantity: 0, price: 0, gas_id: gasId })
          setGasData(tempGas)
     }
     const handleDeleteGasData = (gasId) => {
          let tempDeletedGas = new Map(deletedGasData); // Clone the current deletedGasData Map
          tempDeletedGas.set(gasId, gasData.get(gasId)); // Add deleted gas to the map

          setDeletedGasData(tempDeletedGas); // Update the deletedGasData state

          let tempGas = new Map(gasData); // Clone current gasData
          tempGas.delete(gasId); // Remove the gas by id
          setGasData(tempGas); // Update the gasData state
     }
     for (const [index, gas] of gasList.entries()) {
          if ((gas.company_name.toLowerCase().includes(editName.toLowerCase()) && editName.length > 0)) {
               glist.push(
                    <ListItem key={index}>
                         <ListItemButton onClick={() => {
                              handleAddGasData(gas.id)
                              setEditName("")
                         }}>
                              <ListItemDecorator>
                                   <TbCylinder />
                              </ListItemDecorator>
                              <ListItemContent sx={{ color: "black", fontWeight: "bold" }}>
                                   {gas.company_name} : {gas.kg}{"kg"}
                              </ListItemContent>
                              <ListItemDecorator>
                                   <MdKeyboardArrowRight />
                              </ListItemDecorator>
                         </ListItemButton>
                    </ListItem>
               )
          }
     }
     if (!edit) {
          return <Button
               onClick={() => {
                    setEdit(true);
               }}
               startDecorator={<MdEdit />}
          >Edit</Button>
     }
     return <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={edit}
          onClose={() => setEdit(false)}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', mb: 10 }}
     >
          <form
               onSubmit={(event) => {
                    event.preventDefault();
                    //dispatch();
               }}
          >
               <Sheet
                    variant="outlined"
                    sx={{ borderRadius: 'md', p: 3, boxShadow: 'lg', my: 10, overflow: "auto" }}
               >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                         component="h2"
                         id="modal-title"
                         level="h4"
                         textColor="inherit"
                         sx={{ fontWeight: 'lg', mb: 1 }}
                    >
                         Edit Delivery of {customer} by {deliveryBoy}
                    </Typography>
                    <Sheet>
                         <Stack direction={"row"} gap={1} alignContent={"center"} sx={{ mb: 1 }}>
                              <Chip
                                   size="lg"
                                   color="success"
                                   sx={{
                                        fontWeight: "bold"
                                   }}
                              >
                                   Online
                              </Chip>
                              <Input
                                   startDecorator={<span>₹</span>}
                                   type="number"
                                   value={
                                        onlineAmount.amount === null ? "" : onlineAmount.amount
                                   }
                                   onChange={(event) => {
                                        setOnlineAmount(event.target.value)
                                   }}
                                   required
                                   sx={{
                                        maxWidth: "128px",
                                   }}
                              />
                              <Chip
                                   size="lg"
                                   color="warning"
                                   sx={{
                                        fontWeight: "bold"
                                   }}
                              >
                                   Cash
                              </Chip>
                              <Input
                                   startDecorator={<span>₹</span>}
                                   type="number"
                                   value={
                                        cashAmount.amount === null ? "" : cashAmount.amount
                                   }
                                   onChange={(event) => {
                                        setCashAmount(event.target.value)
                                   }}
                                   required
                                   sx={{
                                        maxWidth: "128px",
                                   }}
                              />
                         </Stack>
                         {
                              !isOutstanding ? (<>
                                   <span className="b">&nbsp;Gas List</span>
                                   <List
                                        sx={{
                                             backgroundColor: "#FFF1DB"
                                        }}
                                   >
                                        {
                                             [...gasData.values()].map((data) => {
                                                  console.log("nc", data.nc);
                                                  return <ListItem key={data.id} sx={{ width: "100%" }}>
                                                       <ListItemContent sx={{ color: "black", fontWeight: "bold" }}>
                                                            {/* {gas.company_name} - {gas.kg}KG {data.quantity}Qty ₹{data.price} */}

                                                            <Stack direction="row" spacing={1} alignItems={"center"} >
                                                                 {(!data.is_empty) ? <>
                                                                      <span>NC</span>
                                                                      <Switch
                                                                           checked={data.nc}
                                                                           onChange={(event) => {
                                                                                //console.log(event.target.checked)
                                                                                handleSetGasData(data.id, "nc", event.target.checked);
                                                                           }}
                                                                      />
                                                                 </> : null}
                                                                 <RadioGroup
                                                                      value={data.is_empty == true ? 1 : 0} // Ensure a fallback value if data.is_empty is undefined
                                                                      name="radio-buttons-group"
                                                                      orientation="horizontal"
                                                                      required
                                                                      onChange={(event) => {
                                                                           handleSetGasData(data.id, "is_empty", event.target.value == 1); // Update gasData with the selected value
                                                                      }}
                                                                 >
                                                                      <Radio value={0} label="Delivered" variant="outlined" color="success" />
                                                                      <Radio value={1} label="Received" variant="outlined" color="danger" />
                                                                 </RadioGroup>
                                                                 <Select required sx={{ width: "220px", ml: 2 }} defaultValue={data.gas_id}
                                                                      onChange={(event, value) => {
                                                                           handleSetGasData(data.id, "gas_id", value);
                                                                      }}
                                                                 >
                                                                      {
                                                                           deleveryGasEditUiGasList
                                                                      }
                                                                 </Select>
                                                                 <Input required sx={{ width: "168px" }} type="number" value={data.quantity} startDecorator={<span>Qty : </span>}
                                                                      onChange={(event) => {
                                                                           handleSetGasData(data.id, "quantity", event.target.value);
                                                                      }}
                                                                 />
                                                                 <Input required={(!data.is_empty)} sx={{ width: "168px", visibility: (!data.is_empty) ? "visible" : "hidden" }} type="number" value={data.gas_price} startDecorator={<span>Amt : </span>} onChange={(event) => {
                                                                      handleSetGasData(data.id, "gas_price", event.target.value);
                                                                 }} />
                                                                 <Box
                                                                      onClick={() => {
                                                                           handleDeleteGasData(data.id)
                                                                      }}
                                                                      sx={{
                                                                           padding: "6px",
                                                                           backgroundColor: "#e34a4c",
                                                                           color: "white",
                                                                           borderRadius: "16px",
                                                                      }}
                                                                 ><ImCross /></Box>
                                                            </Stack>
                                                       </ListItemContent>
                                                  </ListItem>
                                             })
                                        }
                                        <ListItem>
                                             <ListItemContent>
                                                  <Input value={editName} onChange={(event) => { setEditName(event.target.value) }} placeholder="Add Gas" />
                                             </ListItemContent>
                                        </ListItem>
                                   </List>
                                   <span className="b">&nbsp;Correction</span>
                                   <Stack direction="row" gap={1} alignContent={"center"} sx={{ mb: 1 }}>
                                        <Switch
                                             checked={checked}
                                             onChange={(event) => setChecked(event.target.checked)}
                                             sx={(theme) => ({
                                                  '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
                                                  '--Switch-thumbSize': '27px',
                                                  '--Switch-trackWidth': '51px',
                                                  '--Switch-trackHeight': '31px',
                                                  '--Switch-trackBackground': 'rgb(48 209 88)', // Green color for off state
                                                  [`& .${switchClasses.thumb}`]: {
                                                       transition: 'width 0.2s, left 0.2s',
                                                  },
                                                  '&:hover': {
                                                       '--Switch-trackBackground': 'rgb(48 209 88)', // Green color on hover when off
                                                  },
                                                  '&:active': {
                                                       '--Switch-thumbWidth': '32px',
                                                  },
                                                  [`&.${switchClasses.checked}`]: {
                                                       '--Switch-trackBackground': 'rgb(220 53 69)', // Red color for on state
                                                       '&:hover': {
                                                            '--Switch-trackBackground': 'rgb(220 53 69)', // Red color on hover when on
                                                       },
                                                  },
                                             })}
                                        />
                                   </Stack>
                              </>) : ""
                         }

                    </Sheet>
                    <Sheet sx={{
                         overflow: "auto",
                         maxHeight: "90vh",
                    }}>
                         <List>
                              {
                                   glist
                              }
                         </List>
                    </Sheet>
                    <Stack direction="row" gap={1} justifyContent={"flex-end"} alignItems={"flex-end"}>
                         <Box
                              sx={{
                                   color: "#B8001F",
                                   p: 1,
                                   borderRadius: "16px",
                                   '&:hover': {
                                        color: "white",
                                        backgroundColor: "#B8001F",
                                   },
                              }}
                              onClick={() => {
                                   const confirm = window.prompt(`Are you sure you want to delete this delivery? Type ${deleveryId} to confirm.`);
                                   if (Number(confirm) === Number(deleveryId)) {
                                        console.log("Delete", deleveryId)
                                        dispatch(deleteDeliveryById(deleveryId));
                                   }
                                   setEdit(false)
                              }}
                         >
                              <RiDeleteBinFill />
                         </Box>
                         <Divider orientation="horizontal" sx={{ flexGrow: 1, opacity: 0 }} />
                         {/* <Button
                              color={
                                   correction ? "success" : "warning"
                              }
                              variant="outlined"
                              onClick={() => {
                                   console.log(correction)
                                   setEdit(false)
                                   dispatch(updateDelivery({ id: deleveryId, correction: !correction }))
                              }}>
                              Mark {
                                   correction ? "Ok" : "Correction"
                              }
                         </Button> */}
                         <Button color="warning" variant="outlined" onClick={() => {
                              setEdit(false)
                         }}>
                              Cancel
                         </Button>
                         <Button type="submit" onClick={() => {
                              //setEdit(false)
                              let tempGasData = new Map(gasData);
                              //console.log(tempGasData)
                              let newGasAdded = [...tempGasData.values()].filter(
                                   (gas) => {
                                        return `${gas.id}`.startsWith("new_")
                                   }
                              )
                              //remove id fied or key from each gas and add delivery id
                              newGasAdded.forEach((gas, index) => {
                                   gas.delivery_id = deleveryId;
                                   newGasAdded[index] = gas;
                              });

                              tempGasData = new Map(gasData);
                              let updateGasData = [...tempGasData.values()].filter(
                                   (gas) => {
                                        return !(`${gas.id}`.startsWith("new_"))
                                   }
                              )
                              //console.log(newGasAdded, updateGasData, deletedGasData)
                              //call API

                              //console.log(deletedGasData)
                              const deleteDeliveryGasIds = [...deletedGasData.values()].map((gas) => {
                                   return gas.id
                              })

                              //remove id fied or key from each gas and add delivery id
                              const newGasDataNoIds = newGasAdded.map(
                                   (gas) => {
                                        delete gas.id;
                                        return gas;
                                   }
                              )
                              const tempPayment = [
                                   {
                                        deliverie_id: deleveryId,
                                        customer_id: customer,
                                        courier_boy_id: deliveryBoy,
                                        id: onlinePayment.id,
                                        amount: onlineAmount.amount,
                                        method: 1
                                   },
                                   {
                                        deliverie_id: deleveryId,
                                        customer_id: customer,
                                        courier_boy_id: deliveryBoy,
                                        id: cashPayment.id,
                                        amount: cashAmount.amount,
                                        method: 0
                                   }
                              ]
                              //console.log(tempPayment)
                              //paisa
                              dispatch(
                                   updateOrCreateCustomerPayments(
                                        tempPayment
                                   )
                              )
                              dispatch(
                                   //Delete
                                   deleteGasDelivery(deleteDeliveryGasIds),
                              )
                              dispatch(
                                   //Create
                                   addGasDelivery(newGasDataNoIds),
                              )
                              dispatch(updateDelivery({ id: deleveryId, correction: checked }))
                              const temp = updateGasData.map((gas) => (
                                   {
                                        id: gas.id,
                                        gas_id: gas.gas_id,
                                        price: gas.gas_price,
                                        quantity: gas.quantity,
                                        is_empty: gas.is_empty,
                                        nc: gas.nc
                                   }
                              ))
                              dispatch(
                                   //Update
                                   updateGasDelivery(temp),
                              )
                              setEdit(false)
                         }}>
                              Save
                         </Button>
                    </Stack>
               </Sheet>
          </form>
     </Modal>
}
const Cell = ({ onClick, children }) => {
     return <Box
          onClick={() => {
               onClick()
          }}
          sx={{
               backgroundColor: "transparent",
               border: "none",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               color: "black",
               fontWeight: "bold",
          }}
     >
          <span>{
               children
          }</span>
     </Box>
}