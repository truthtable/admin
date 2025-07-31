/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Box, Chip, Divider, LinearProgress, Select, Stack, Tab, Table, TabList, TabPanel, Tabs, Option, Button, Modal, Sheet, ModalClose, Typography, Input, List, ListItem, ListItemButton, ListItemDecorator, ListItemContent, FormControl, FormLabel, RadioGroup, Radio, Card, IconButton, CircularProgress, Autocomplete, TextField } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { deleteDeliveryById, deliveriesIniState, fetchDeliveries, updateDelivery } from "../../redux/actions/deliveryActions.js";
import { fetchGasData } from "../../state/GasList.jsx";
import { fetchUser, fetchUserRequest } from "../../redux/actions/userActions.js";
import { RxFontStyle } from "react-icons/rx";
import { FcHighPriority } from "react-icons/fc";
import { CgClose, CgUser } from "react-icons/cg";
import { MdDone, MdEdit, MdKeyboardArrowDown, MdKeyboardArrowRight, MdKeyboardArrowUp } from "react-icons/md";
import { IoMdClose, IoMdDoneAll } from "react-icons/io";
import { TbCylinder } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { addGasDelivery, deleteGasDelivery, gasDeliveriesIniState, updateGasDelivery } from "../../redux/actions/gasDeliveryActions.js";
import { set } from "firebase/database";
import { RiDeleteBinFill } from "react-icons/ri";
import gasServices from "../../services/gas-services.jsx";
import PropTypes from 'prop-types';
import { decimalFix, titleCase, updateUrlParams } from "../../Tools.jsx";
import ExportCSV from "../ExportCSV.jsx";
const COLORS = {
     WHITE: "#ffffff",
     KG_12: "#e3f2fd",
     KG_15: "#e8f5e9",
     KG_17: "#fff3e0",
     KG_21: "#f3e5f5"
};

const columns = [
     //Info
     { column: "Date", color: COLORS.WHITE },
     { column: "Customer", color: COLORS.WHITE },

     // 12KG Group 
     { column: "12KG CYL", color: COLORS.KG_12 },
     { column: "MT", color: COLORS.KG_12 },
     { column: "Rate", color: COLORS.KG_12 },
     { column: "Total", color: COLORS.KG_12 },

     // 15KG Group
     { column: "15KG CYL", color: COLORS.KG_15 },
     { column: "MT", color: COLORS.KG_15 },
     { column: "Rate", color: COLORS.KG_15 },
     { column: "Total", color: COLORS.KG_15 },

     // 17KG Group
     { column: "17KG CYL", color: COLORS.KG_17 },
     { column: "MT", color: COLORS.KG_17 },
     { column: "Rate", color: COLORS.KG_17 },
     { column: "Total", color: COLORS.KG_17 },

     // 21KG Group
     { column: "21KG CYL", color: COLORS.KG_21 },
     { column: "MT", color: COLORS.KG_21 },
     { column: "Rate", color: COLORS.KG_21 },
     { column: "Total", color: COLORS.KG_21 },

     // Summary rows  
     { column: "Sub Total", color: COLORS.WHITE },
     { column: "Received", color: COLORS.WHITE },
     { column: "Balance", color: COLORS.WHITE }
];
const CUSTOMER_LIST = []
export default function deliveryHistory() {

     const dispatch = useDispatch();
     const { deliveries, loading, updateSuccess, error } = useSelector((state) => state.deliverys);
     const { userDataLoading, users, userDataError } = useSelector((state) => state.user);

     //console.log(CUSTOMER_LIST);

     //clear customer list
     CUSTOMER_LIST.length = 0
     if (users != null && users != undefined) {
          const customerOptions = users.map((user) => {
               if (user.customers.length == 0) {
                    return null;
               }
               const customerId = user.customers[0]?.id;
               const customerName = titleCase(user.name);
               const address = titleCase(user.address);

               return {
                    id: customerId,
                    label: `${customerName} (${address})`,
                    // Or alternatively, just use the name but ensure React keys are unique
                    // label: customerName
               }
          }).filter(Boolean); // Remove null entries

          CUSTOMER_LIST.push(...customerOptions); // Spread the array instead of nesting
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

     const [customerId, setCustomerId] = useState(tempUrlCustomerId);
     const [deliverBoyId, setDeliverBoyId] = useState(tempUrlCourierBoyId);

     const setDateStart = (date) => {
          setDateStartState(date);
          updateUrlParams(date, dateEnd, customerId, deliverBoyId);
     }
     const [dateStart, setDateStartState] = useState(
          () => {
               if (date_start) {
                    return formatDate(new Date(date_start));
               }
               return formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
          }
     );
     const setDateEnd = (date) => {
          setDateEndState(date);
          updateUrlParams(dateStart, date, customerId, deliverBoyId);
     }
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

     const loadData = () => {
          dispatch(fetchDeliveries({ dateStart: dateStart, dateEnd: dateEnd, customer_id: customerId, courier_boy_id: deliverBoyId }));
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

     //console.log(deliveries);
     useEffect(() => {
          if ((deliveries == null || deliveries == undefined) && loading == false) {
               dispatch(fetchDeliveries());
               console.log("fetchDeliveries...");
          }
          if (
               userDataLoading === false
               && (users == null || users == undefined)
               && loading == false
          ) {
               console.log("fetchUser...");
               dispatch(fetchUser());
          }
     })

     useEffect(() => {
          gasServices.listenDataChange(() => {
               if (
                    loading === false
               ) {
                    console.log("fetchDeliveries...Fire");
                    loadData();
               }
          });
     }, []);

     // First, let's add a helper function to calculate gas group totals


     // Update the createData function to be more organized
     function createData(date, info, gasInfo, kg12Data, kg15Data, kg17Data, kg21Data, received) {
          const kg12 = calculateGasGroup(kg12Data.cylinders, kg12Data.mt, kg12Data.rate);
          const kg15 = calculateGasGroup(kg15Data.cylinders, kg15Data.mt, kg15Data.rate);
          const kg17 = calculateGasGroup(kg17Data.cylinders, kg17Data.mt, kg17Data.rate);
          const kg21 = calculateGasGroup(kg21Data.cylinders, kg21Data.mt, kg21Data.rate);

          const subTotal = kg12.total + kg15.total + kg17.total + kg21.total;

          return {
               date,
               customer: info.customer,
               info: info,
               gasInfo: gasInfo,
               kg12,
               kg15,
               kg17,
               kg21,
               subTotal,
               received
          };
     }

     // Update the rows data with the new structure
     let rows = []
     let csvData = []

     if (deliveries != null || deliveries != undefined) {
          if (!deliveries.noData) {
               rows = deliveries.map((delivery) => {
                    let totalCash = 0
                    let totalOnline = 0

                    let cyl12KgQty = 0
                    let cyl12KgMt = 0
                    let cyl12KgRate = 0

                    let cyl15KgQty = 0
                    let cyl15KgMt = 0
                    let cyl15KgRate = 0

                    let cyl17KgQty = 0
                    let cyl17KgMt = 0
                    let cyl17KgRate = 0

                    let cyl21KgQty = 0
                    let cyl21KgMt = 0
                    let cyl21KgRate = 0

                    delivery.payments.forEach((payment) => {
                         if (payment.method == 0) {
                              totalCash += payment.amount
                         } else {
                              totalOnline += payment.amount
                         }
                    })
                    const cylinder_list = delivery.gas_deliveries.map((gas) => {
                         if (gas.kg == 12) {
                              if (gas.is_empty == 0) {
                                   cyl12KgQty = gas.quantity
                                   cyl12KgRate = gas.gas_price
                              } else {
                                   cyl12KgMt += gas.quantity
                              }
                         }
                         if (gas.kg == 15) {
                              if (gas.is_empty == 0) {
                                   cyl15KgQty = gas.quantity
                                   cyl15KgRate = gas.gas_price
                              } else {
                                   cyl15KgMt += gas.quantity
                              }
                         }
                         // 17KG Group
                         if (gas.kg == 17) {
                              if (gas.is_empty == 0) {
                                   cyl17KgQty = gas.quantity
                                   cyl17KgRate = gas.gas_price
                              } else {
                                   cyl17KgMt += gas.quantity
                              }
                         }
                         //21KG Group
                         if (gas.kg == 21) {
                              if (gas.is_empty == 0) {
                                   cyl21KgQty = gas.quantity
                                   cyl21KgRate = gas.gas_price
                              } else {
                                   cyl21KgMt += gas.quantity
                              }
                         }
                         return {
                              cylinder: gas.brand,
                              qty: gas.quantity,
                              kg: 15
                         }
                    })
                    const date = formatDateToDDMMYY(delivery.created_at)
                    let total12Kg = cyl12KgQty * cyl12KgRate
                    let total15Kg = cyl15KgQty * cyl15KgRate
                    let total17Kg = cyl17KgQty * cyl17KgRate
                    let total21Kg = cyl21KgQty * cyl21KgRate
                    let totalTotal = total12Kg + total15Kg + total17Kg + total21Kg
                    let received = totalCash + totalOnline
                    let balance = totalTotal - received
                    if (balance < 0) {
                         balance = 0
                    }
                    csvData.push([
                         //"Date",
                         date,
                         //"Customer",
                         titleCase(delivery.customer.name),
                         //"12KG CYL",
                         cyl12KgQty,
                         //"MT",
                         cyl12KgMt,
                         //"Rate",
                         cyl12KgRate,
                         //"Total",
                         total12Kg,
                         //"15KG CYL",
                         cyl15KgQty,
                         //"MT",
                         cyl15KgMt,
                         //"Rate",
                         cyl15KgRate,
                         //"Total",
                         total15Kg,
                         //"17KG CYL",
                         cyl17KgQty,
                         //"MT",
                         cyl17KgMt,
                         //"Rate",
                         cyl17KgRate,
                         //"Total",
                         total17Kg,
                         //"21KG CYL",
                         cyl21KgQty,
                         //"MT",
                         cyl21KgMt,
                         //"Rate",
                         cyl21KgRate,
                         //"Total",
                         total21Kg,
                         //"Sub Total",
                         totalTotal,
                         //"Received",
                         received,
                         //"Balance"
                         balance

                    ])
                    return createData(
                         // date
                         date,
                         // info
                         {
                              dileveryId: delivery.id,
                              custId: delivery.customer.id,
                              customer: delivery.customer.name,
                              diaryNumber: delivery.customer.diaryNumber,
                              adress: delivery.customer.address,
                              deliveredBy: delivery.courier_boy.name,
                              cash: totalCash,
                              online: totalOnline,
                              correction: delivery.correction,
                              paid: delivery.payments.length > 0,
                         },
                         //gasInfo
                         cylinder_list,
                         // 12KG Group
                         { cylinders: cyl12KgQty, mt: cyl12KgMt, rate: cyl12KgRate },
                         // 15KG Group
                         { cylinders: cyl15KgQty, mt: cyl15KgMt, rate: cyl15KgRate },
                         // 17KG Group
                         { cylinders: cyl17KgQty, mt: cyl17KgMt, rate: cyl17KgRate },
                         // 21KG Group
                         { cylinders: cyl21KgQty, mt: cyl21KgMt, rate: cyl21KgRate },
                         // received amount
                         (totalCash + totalOnline)
                    )
               });
          }
     }
     const headers = columns.map((col) => col.column);

     return <Stack
          sx={{
               // height: "100%",
               width: "100%",
               backgroundColor: "white",
               borderRadius: "lg",
               overflow: "auto",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               color: "black",

          }}
     >
          <CircularProgress
               sx={{
                    backgroundColor: "transparent",
                    display: loading ? "flex" : "none"
               }}
          />
          <Stack
               sx={{
                    width: "100%",
                    display: loading ? "none" : "flex",
                    overflow: "auto",
               }}
               direction="row"
               gap={.5}
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
               />
               <Divider
                    sx={{
                         flexGrow: 1,
                         opacity: 0,
                    }}
               />
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
               <Button
                    sx={{
                         borderRadius: "md",
                    }}
                    onClick={() => { loadData() }}>Force Load</Button>
          </Stack>
          <Stack sx={{ backgroundColor: "lightblue", width: "100%", flexGrow: 1, display: loading ? "none" : "flex" }}>
               <Sheet>
                    <Table
                         aria-label="collapsible table"
                         size="md"
                         sx={{
                              wordBreak: "keep-all",
                              tableLayout: "auto",
                              fontWeight: "bold",
                         }
                         }
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
                                                       backgroundColor: col.color
                                                  }}
                                             >
                                                  {col.column}
                                             </th>
                                        ))
                                   }
                              </tr>
                         </thead>
                         <tbody>
                              {rows.map((row, index) => (
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
                                   />
                              ))}
                              {
                                   ((rows.length == 0) ? <tr>
                                        <td colSpan={columns.length + 1} style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.8em" }}>No Data</td>
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
     const [open, setOpen] = React.useState(initialOpen);

     let balance = row.subTotal - row.received
     //o if nagative
     if (balance < 0) {
          balance = 0
     }

     // Define the cell groups for easier mapping
     const cellGroups = [
          {
               key: 'info', cells: [
                    { value: row.date },
                    {
                         value: <UpdateCell
                              value={{
                                   cust_id: row.info.custId,
                                   name: row.info.customer
                              }}
                              onChange={(customer) => {
                                   return updateCustomer(customer)
                              }}
                         />
                    }
               ], color: COLORS.WHITE
          },
          {
               key: 'kg12', cells: [
                    { value: decimalFix(row.kg12.cylinders) },
                    { value: decimalFix(row.kg12.mt) },
                    { value: decimalFix(row.kg12.rate, true) },
                    { value: decimalFix(row.kg12.total, true) }
               ], color: COLORS.KG_12
          },
          {
               key: 'kg15', cells: [
                    { value: decimalFix(row.kg15.cylinders) },
                    { value: decimalFix(row.kg15.mt) },
                    { value: decimalFix(row.kg15.rate, true) },
                    { value: decimalFix(row.kg15.total, true) }
               ], color: COLORS.KG_15
          },
          {
               key: 'kg17', cells: [
                    { value: decimalFix(row.kg17.cylinders) },
                    { value: decimalFix(row.kg17.mt) },
                    { value: decimalFix(row.kg17.rate, true) },
                    { value: decimalFix(row.kg17.total, true) }
               ], color: COLORS.KG_17
          },
          {
               key: 'kg21', cells: [
                    { value: decimalFix(row.kg21.cylinders) },
                    { value: decimalFix(row.kg21.mt) },
                    { value: decimalFix(row.kg21.rate, true) },
                    { value: decimalFix(row.kg21.total, true) }
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
                         <Box>
                              <IconButton
                                   aria-label="expand row"
                                   variant="plain"
                                   color="neutral"
                                   size="sm"
                                   onClick={() => setOpen(!open)}
                              >
                                   {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                              </IconButton>
                         </Box>
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
               <tr>
                    <td style={{ height: 0, padding: 0 }} colSpan={columns.length + 1}>
                         {open && (
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
                                             <tr>
                                                  <td>Diary Number</td>
                                                  <td>
                                                       {row.info.diaryNumber}
                                                  </td>
                                             </tr>
                                             <tr>
                                                  <td>Date</td>
                                                  <td>
                                                       {row.date}
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
                                             {/* <tr>
                                                       <td>Paid</td>
                                                       <td>
                                                            {row.info.paid ? "Yes" : "No"}
                                                       </td>
                                                  </tr> */}
                                             <tr>
                                                  <td>Correction</td>
                                                  <td>
                                                       {row.info.correction ? "Yes" : "No"}
                                                  </td>
                                             </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                   </Table>
                              </Sheet>
                         )}
                    </td>
               </tr>
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

const UpdateCellValue = ({ tableName, columnName, value }) => {
     const [valueState, setValueState] = React.useState(value);
     return <>
          {/* {value} */}
          <input
               style={{
                    width: "100%",
                    padding: 0,
                    margin: 0,
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
               }}
               type="text"
               value={
                    titleCase(valueState)
               }
               onChange={(event) => {
                    setValueState(event.target.value);
               }}
          />
     </>
}

function formatDateToDDMMYY(dateString) {
     //convert to epoch
     var date = new Date(dateString);
     var dd = String(date.getDate()).padStart(2, '0');
     var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yy = date.getFullYear();
     var yyyy = yy.toString().slice(2, 4);
     return dd + "/" + mm + "/" + yyyy;
}

const formatDate = (date) => {
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     return `${year}-${month}-${day}`;
};

function calculateGasGroup(cylinders, mt, rate) {
     return {
          cylinders,
          mt,
          rate,
          total: cylinders * rate
     };
}