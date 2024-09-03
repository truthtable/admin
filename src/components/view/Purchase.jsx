/* eslint-disable react/prop-types */
import { AccordionGroup, Box, Button, Card, CardContent, Chip, CircularProgress, Container, Divider, Grid, Input, LinearProgress, List, ListItem, ListItemButton, ListItemContent, ListItemDecorator, Option, Select, Stack, Table, Typography } from "@mui/joy";
import { CgAdd, CgBorderRight, CgEditContrast, CgFilters, CgHome, CgTrash } from "react-icons/cg";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import React, { useEffect, useState } from "react";
import { MdDelete, MdDone, MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, deleteOrder, fetchOrders, updateOrder, orderIniState } from "../../redux/actions/purchaseOrderActions.js";
import DataTable from "../table/DataTable.jsx";
import { FaCheck, FaCompressArrowsAlt, FaEdit, FaFilter, FaRegPlusSquare } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { createItem, deleteItem, updateItem, iniState } from "../../redux/actions/purchaseOrderItemActions.js";
import { fetchGasData } from "../../state/GasList.jsx";
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd, IoMdMedical } from "react-icons/io";
import { ImCross, ImCheckmark } from "react-icons/im";
import { Collapse } from "@mui/material";
import { FaArrowTurnDown } from "react-icons/fa6";
import AddPurchaseUI from "./AddPurchaseUI.jsx";
import { getPlants } from "../../redux/actions/plantsActions.js";
let gasList = [];
let gasListMap = new Map();
export default function Purchase() {
     const dispatch = useDispatch();

     const allGases = useSelector(state => state.gas);
     const { plants, plantsLoading, plantsError, plantsUpdateSuccess } = useSelector(state => state.plants);
     const { updateOrderSuccsess, orders, loading, error } = useSelector(state => state.purchaseOrders);

     //console.log(orders);

     if (error) { console.warn(error); }

     const { itemLoading, items, itemError, itemUpdateSuccess } = useSelector(state => state.purchaseOrderItems);

     //console.log(itemLoading, items, itemError, itemUpdateSuccess);

     if (itemError) { console.warn(itemError); }


     let grandTotalBallance = 0
     let grandTotalPayAmt = 0

     //console.log(orders);

     const currentDate = new Date().toISOString().split('T')[0];
     const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1))
          .toISOString()
          .split('T')[0];
     const [startDate, setStartDate] = useState(oneMonthAgo);
     const [endDate, setEndDate] = useState(currentDate);

     useEffect(() => {
          dispatch(fetchOrders({ startDate, endDate }));
          if (plants.length === 0) {
               dispatch(getPlants());
          }
          if (allGases.data === null) {
               dispatch(fetchGasData());
          }
     }, [dispatch, startDate, endDate]);
     useEffect(() => {
          if (itemUpdateSuccess || updateOrderSuccsess) {
               dispatch(iniState());
               dispatch(orderIniState());
               dispatch(fetchOrders({ startDate, endDate }));
               if (plants.length === 0) {
                    dispatch(getPlants());
               }
               if (allGases.data === null) {
                    dispatch(fetchGasData());
               }
          }
     });
     const orderRows = []
     if (allGases.data != null) {
          allGases.data.data.forEach(gas => {
               gasListMap.set(gas.id, gas)
          })
          gasList = allGases.data.data
     }
     console.log({ orders });
     if (allGases.data != null && orders != null && orders.length > 0) {
          orders.forEach((order, index) => {

               const orderNumber = order.order_no;
               const orderDate = order.date;
               const orderSchemeType = order.scheme_type;
               const orderTtotalPayAmt = Number(order.pay_amt);
               const orderTCS = Number(order.tcs);
               const orderFOR = Number(order.for_charges);
               const orderSchemeRate = Number(order.scheme);
               const orderPlant = plants.filter(plant => plant.id === order.plant_id)[0]

               let orderTotalQty = 0;
               let orderTotalKg = 0;
               let orderTotalAmt = 0;
               let orderTotalTCS = 0;
               let orderTotalFOR = 0;
               let orderTotalScheme = 0;
               let orderTotalRemainingAmt = 0;
               let orderTotalReturnQty = 0;
               let orderTotalReturnKg = 0;

               if (order.items.length === 0) {
                    orderRows.push(
                         <tr key={`order-row-empty-${order.id}`}>
                              <td style={{ borderWidth: 0, padding: 6, margin: 0, backgroundColor: "#FFB0B0" }} colSpan={12}>
                                   <Stack
                                        direction="row"
                                        gap={1}
                                   >
                                        <span style={{ fontWeight: "bold" }}>{`Order No. ${orderNumber}`}</span>
                                        <span style={{ fontWeight: "bold" }}>|{` ${orderDate}`}</span>
                                        <span style={{ fontWeight: "bold" }}>|{` Scheme ${orderSchemeType}`}</span>
                                        <span style={{ fontWeight: "bold" }}>|{` Scheme Rate ${orderSchemeRate}`}</span>
                                   </Stack>
                                   <Stack
                                        direction="row"
                                        gap={1}
                                   >
                                        <FaArrowTurnDown style={{
                                             fontSize: "20px",
                                             transform: "scaleX(-1)",
                                        }} />
                                        <span style={{ fontWeight: "bold" }}>No Gas Added Please Add Gas from the edit option</span>
                                   </Stack>

                              </td>
                         </tr>
                    );
               }
               order.items.forEach((item, index) => {

                    const gas = gasListMap.get(item.gas_id);

                    const kg = gas.kg
                    const qty = item.qty
                    const returnQty = item.return_cyl_qty
                    const rate = item.rate

                    const totalKg = kg * qty
                    const totalReturnKg = kg * returnQty
                    const totalAmt = totalKg * rate

                    orderTotalQty += qty
                    orderTotalKg += totalKg
                    orderTotalReturnKg += totalReturnKg
                    orderTotalAmt += totalAmt

                    orderRows.push(
                         <tr key={`order-row-${order.id}-${index}`}>
                              <Cell id={order.id} data={orderNumber} tableName="purchase_orders" column="order_no" />
                              <Cell id={order.id} data={orderDate} tableName="purchase_orders" column="date" />
                              {/* <Cell id={order.id} data={orderPlant.name} tableName="" column="" /> */}
                              <td
                                   style={{
                                        borderWidth: 0, padding: 0, margin: 0,
                                   }}
                              >
                                   <form
                                        onSubmit={(event) => {
                                             event.preventDefault();
                                             const formData = new FormData(event.currentTarget);
                                             const formJson = Object.fromEntries(formData.entries());
                                             console.log(formJson);
                                             //dispatch(updateOrder(order.id, { [column]: editValue }))
                                        }}
                                   >

                                        <Select
                                             placeholder="Plant"
                                             name="plant_id"
                                             size="sm"
                                             defaultValue={orderPlant.id}
                                             sx={{
                                                  backgroundColor: "transparent",
                                                  borderColor: "transparent",
                                             }}
                                             onChange={(event, newValue) => {
                                                  //console.log(newValue)
                                                  const change = confirm(`Change Plant from ${orderPlant.name} to ${plants.filter(plant => plant.id === newValue)[0].name} ?`)
                                                  if (change) {
                                                       dispatch(updateOrder(order.id, { plant_id: newValue }))
                                                  }
                                             }}
                                        >
                                             {
                                                  plants.map(plant => {
                                                       return (<Option key={plant.id} value={plant.id}>{plant.name}</Option>)
                                                  })
                                             }
                                        </Select>

                                   </form>
                              </td>
                              <Cell id={order.id} data={orderSchemeType} tableName="purchase_orders" column="scheme_type" />
                              <Cell id={order.id} data={orderSchemeRate} tableName="purchase_orders" column="scheme" />
                              <Cell id={item.id} data={gas} tableName="purchase_order_items" column="gas_id" />
                              <Cell id={item.id} data={qty} tableName="purchase_order_items" column="qty" />
                              <Cell id={order.id} data={totalKg + " KG"} editable={false} tableName="" column="" />
                              <Cell id={item.id} data={rate} tableName="purchase_order_items" column="rate" />
                              <Cell id={order.id} data={"₹" + totalAmt.toFixed(2)} editable={false} tableName="" column="" />
                              <Cell id={item.id} data={returnQty} tableName="purchase_order_items" column="return_cyl_qty" />
                              <Cell id={order.id} data={totalReturnKg + " KG"} editable={false} tableName="" column="" />
                         </tr >
                    )
               })

               orderTotalFOR = (orderFOR * orderTotalKg)
               orderTotalTCS = (orderTCS * orderTotalAmt)
               orderTotalScheme = (orderSchemeRate * orderTotalKg)

               orderTotalAmt += (orderTotalFOR + orderTotalTCS) - orderTotalScheme

               grandTotalBallance += orderTotalAmt
               grandTotalPayAmt += orderTtotalPayAmt

               orderTotalRemainingAmt = orderTotalAmt - orderTtotalPayAmt

               orderRows.push(<tr key={`order-row-total-${order.id}-${index}`}>
                    <td style={{ borderWidth: 0, padding: 0, margin: 0, height: 24, }} colSpan={12}>
                         <React.Fragment>
                              <TotalRow
                                   order={order}
                                   data={
                                        {
                                             kg: orderTotalKg,
                                             qty: orderTotalQty,
                                             amt: orderTotalAmt.toFixed(2),
                                             pay_amt: orderTtotalPayAmt,
                                             remaning_amt: orderTotalRemainingAmt.toFixed(2),
                                             rKg: orderTotalReturnKg,
                                             rQty: orderTotalReturnQty,
                                        }
                                   }>
                                   <div
                                        style={{
                                             width: "100%",
                                             flexGrow: 1,
                                        }}
                                   />

                                   <List
                                        sx={{

                                        }}
                                        size="md">
                                        {
                                             [
                                                  { label: "Total Kg", value: orderTotalKg },
                                                  { label: "Total Qty", value: orderTotalQty },
                                                  { label: "Total Return Kg", value: orderTotalReturnKg },
                                                  { label: "Total Return Qty", value: orderTotalReturnQty },
                                                  //TODO FIX THIS td in span
                                                  {
                                                       label: "Scheme", value: <React.Fragment> <Cell
                                                            column=""
                                                            id={order.id}
                                                            data={orderSchemeRate}
                                                            tableName=""
                                                       /></React.Fragment>
                                                  },
                                                  {
                                                       label: "TCS", value: <React.Fragment> <Cell
                                                            column=""
                                                            id={order.id}
                                                            data={orderTCS}
                                                            tableName=""
                                                       /></React.Fragment>
                                                  },
                                                  {
                                                       label: "FOR", value: <React.Fragment><Cell
                                                            column=""
                                                            id={order.id}
                                                            data={orderFOR}
                                                            tableName=""
                                                       /></React.Fragment>
                                                  },
                                                  { label: "Total Amt", value: orderTotalAmt.toFixed(2) },
                                                  {
                                                       label: "Pay Amt", value: <React.Fragment> <Cell
                                                            column="pay_amt"
                                                            id={order.id}
                                                            data={orderTtotalPayAmt}
                                                            tableName="purchase_orders"
                                                       /></React.Fragment>
                                                  },
                                                  { label: "Pending Amt", value: orderTotalRemainingAmt.toFixed(2) },
                                             ].map((data, index) => (
                                                  <ListItem key={index}>
                                                       <ListItemContent
                                                            sx={{
                                                                 textAlign: "end",
                                                            }}
                                                       >{data.label}</ListItemContent>
                                                       <ListItemDecorator>:</ListItemDecorator>
                                                       <ListItemDecorator
                                                            sx={{
                                                                 textAlign: "left",
                                                                 width: "256px",
                                                            }}
                                                       >{data.value}</ListItemDecorator>
                                                       <ListItemDecorator />
                                                  </ListItem>
                                             ))
                                        }
                                   </List>
                              </TotalRow>
                         </React.Fragment>
                    </td>
               </tr >)
          })
     }
     const thStyle = {
          color: "white",
          whiteSpace: "nowrap",
          transition: "background-color 0.3s",
          fontWeight: "900",
          backgroundColor: "#263043",
          "&:hover": {
          },
     }
     if (allGases.data === null || allGases.data.length === 0 || plants.length === 0) {
          return <Box
               sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
               }}
          >
               <CircularProgress />
          </Box>
     }
     return (
          <Sheet
               sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "lg",
                    backgroundColor: "#263043",
               }}
          >
               <Box>
                    <LinearProgress
                         sx={{
                              padding: "0px",
                              margin: "0px",
                              width: "100%",
                              backgroundColor: "#263043",
                              color: "#efefef",
                              borderRadius: "0px",
                              display: (itemLoading || loading) ? "block" : "none",
                         }}
                    />
               </Box>
               <Stack
                    direction="row"
                    sx={{
                         backgroundColor: "#263043",
                         padding: 1,
                         display: (itemLoading || loading) ? "none" : "flex",
                    }}
                    gap={1}
               >
                    <Chip
                         sx={
                              {

                                   alignItems: "center",
                                   justifyContent: "center",
                                   backgroundColor: "#a33e23",
                                   display: loading ? "none" : "flex",
                                   px: 2
                              }
                         }
                         size="sm"
                    >
                         <span
                              style={{
                                   color: "white",
                                   fontWeight: "bold",
                              }}
                         >{`Pending Payment : ₹${(grandTotalBallance - grandTotalPayAmt).toFixed(2)}`}</span>
                    </Chip>
                    <Chip
                         sx={
                              {

                                   alignItems: "center",
                                   justifyContent: "center",
                                   backgroundColor: "#0a6847",
                                   display: loading ? "none" : "flex",
                                   px: 2
                              }
                         }
                         size="sm"
                    >
                         <span
                              style={{
                                   color: "white",
                                   fontWeight: "bold",
                              }}
                         >{`Payment Done : ₹${grandTotalPayAmt}`}</span>
                    </Chip>
                    <Divider
                         sx={{
                              flexGrow: 1,
                              backgroundColor: "transparent",
                         }}
                    />
                    <Stack direction="row" gap={1} >
                         <Box
                              sx={{
                                   display: "flex",
                                   alignItems: "center",
                                   justifyContent: "center",
                              }}
                         >
                              <span style={{ color: "white", fontWeight: "bold" }}>From:</span>
                         </Box>
                         <Input
                              placeholder="Start Date"
                              type="date"
                              name="date"
                              required
                              size="sm"
                              value={startDate}
                              onKeyDown={(e) => {
                                   try { e.preventDefault() } catch (e) { console.warn(e) }
                              }
                              }
                              onFocus={(e) => { try { e.target.showPicker() } catch (e) { console.warn(e) } }
                              }
                              onClick={(e) => { try { e.target.showPicker() } catch (e) { console.warn(e) } }
                              }
                              onChange={(e) => { try { setStartDate(e.target.value) } catch (e) { console.warn(e) } }
                              }
                              sx={{
                                   width: '100%',
                                   flexGrow: 1,
                                   backgroundColor: "#263043",
                                   color: "white",
                                   innerSpinnerColor: "white",
                                   colorScheme: "dark",

                              }}
                         />
                         <Box
                              sx={{
                                   display: "flex",
                                   alignItems: "center",
                                   justifyContent: "center",
                              }}
                         >
                              <span style={{ color: "white", fontWeight: "bold" }}>To:</span>
                         </Box>
                         <Input
                              placeholder="Start Date"
                              type="date"
                              name="date"
                              required
                              size="sm"
                              value={endDate}
                              onKeyDown={(e) => {
                                   try { e.preventDefault() } catch (e) { console.warn(e) }
                              }}
                              onFocus={(e) => {
                                   try { e.target.showPicker() } catch (e) { console.warn(e) }
                              }}
                              onClick={(e) => {
                                   try { e.target.showPicker() } catch (e) { console.warn(e) }
                              }}
                              onChange={(e) => {
                                   try { setEndDate(e.target.value) } catch (e) { console.warn(e) }
                              }}
                              sx={{
                                   width: '100%',
                                   flexGrow: 1,
                                   backgroundColor: "#263043",
                                   color: "white",
                                   innerSpinnerColor: "white",
                                   colorScheme: "dark",

                              }}
                         />
                    </Stack>
                    <AddPurchaseUI gaslistData={gasList} plants={plants} />
               </Stack>
               <Box sx={{ borderRadius: "lg", height: "100%", overflow: "auto", backgroundColor: "white" }}>
                    <Box
                         sx={{
                              overflow: "auto",
                         }}
                    >
                         <Table
                              borderAxis="bothBetween"
                              color="neutral"
                              size="md"
                              stickyFooter={false}
                              stickyHeader={true}
                              stripe="odd"
                              variant="soft"
                              sx={{
                                   tableLayout: "auto",
                                   fontWeight: "bold",
                              }}

                         >
                              <thead>
                                   <tr>
                                        {
                                             ["Order No.", "Date", "Plant", "Scheme Type", "Scheme Rate", "Gas", "Qty", "Total Kg", "Rate", "Total", "Return Qty", "Return Total Kg"]
                                                  .map((label, index) => {
                                                       return <th key={index} style={thStyle}>{label}</th>
                                                  })
                                        }
                                   </tr>
                              </thead>
                              <tbody>
                                   {orderRows}
                              </tbody>
                         </Table>
                    </Box>
               </Box>
          </Sheet >)
}
export const Cell = ({ id, data, tableName, column, editable = true }) => {
     const [editMode, setEditMode] = useState(false);
     const [editValue, setEditValue] = useState(data);
     const dispatch = useDispatch();
     const DataDisplay = () => {
          return <Box
               sx={{
                    color: "black",
                    borderRadius: 0,
                    backgroundColor: "transparent",
                    whiteSpace: "nowrap",
                    transition: "background-color 0.3s",
                    fontWeight: "bold",
                    flexGrow: 1,
                    width: "100%",
                    height: "100%",
                    "&:hover": {
                         backgroundColor: (editable) ? "#c1ebd4" : "transparent",
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderLeftWidth: "0.1px",
                    borderColor: (column !== "pay_amt") ? "#9cafbe" : "transparent",
               }}
               onClick={() => {
                    if (tableName != "")
                         setEditMode(true)
               }}
          >
               <span
                    style={{
                         display: "flex",
                         fontWeight: "bold",
                    }}
               >
                    {data}
               </span>
          </Box>
     }
     const gas = data
     let gasId = null
     if (column === "gas_id") {
          //console.log(gas)
          gasId = gas.id
          data = `${data.company_name} : ${data.kg} KG`

     }
     if (column === "pay_amt") {
          return (!editMode) ? (<Box>
               <Stack direction="row" alignContent="center" justifyContent="center" alignItems={"center"} sx={{ width: "100%" }}>
                    <DataDisplay />
                    <Stack sx={
                         {
                              color: "black",
                              padding: 1,
                              borderRadius: "md",
                              "&:hover": {
                                   backgroundColor: "#a33e23",
                                   color: "white",
                              },
                         }
                    } direction="row"
                         onClick={() => {
                              setEditMode(true)
                         }}
                    >
                         <MdModeEditOutline style={{ fontSize: "25px" }} />
                    </Stack>
               </Stack>
          </Box>) : <Input
               sx={{
                    color: "black",
                    flexGrow: 1,

               }}
               type="number"
               value={editValue}
               onChange={(e) => { setEditValue(e.target.value) }}
               endDecorator={
                    <Stack direction="row"
                         sx={{
                              padding: 0,
                         }}
                    >
                         <Box
                              sx={{
                                   display: "flex",
                                   alignItems: "center",
                                   justifyContent: "center",
                                   p: 1,
                                   m: 0,
                                   transition: "all 0.3s",
                                   cursor: "pointer",
                                   color: "#b34349",
                                   borderRadius: "md",
                                   "&:hover": {
                                        backgroundColor: "#b34349",
                                        color: "white",
                                   },
                              }}
                              onClick={() => {
                                   setEditMode(false)
                              }}
                         >
                              <ImCross />
                         </Box>
                         <Box
                              sx={{
                                   display: "flex",
                                   alignItems: "center",
                                   justifyContent: "center",
                                   p: 1,
                                   m: 0,
                                   transition: "all 0.3s",
                                   cursor: "pointer",
                                   color: "#0a6847",
                                   borderRadius: "md",
                                   "&:hover": {
                                        backgroundColor: "#0a6847",
                                        color: "white",
                                   },
                              }}
                              onClick={() => {
                                   setEditMode(false)
                                   //console.log(id, tableName, column, editValue)
                                   if (tableName === "purchase_orders") {
                                        dispatch(updateOrder(id, { [column]: editValue }))
                                   }
                                   if (tableName === "purchase_order_items") {
                                        dispatch(updateItem(id, { [column]: editValue }))
                                   }
                              }}
                         >
                              <ImCheckmark />
                         </Box>
                    </Stack>
               }
          />
     }
     if (!editMode) {
          return <td style={{
               borderWidth: 0, padding: 0, margin: 0,
          }}>
               <DataDisplay />
          </td>
     }

     if (column === "gas_id") {
          return <td
               style={{ padding: 0, borderWidth: 0, minWidth: "200px" }}
          >
               <Stack alignContent="center"
                    justifyContent="center"
                    alignItems="center" direction="row" sx={{ width: "100%" }}>
                    <Select
                         defaultValue={gas.id}
                         size="sm"
                         sx={{ flexGrow: 1 }}
                         onChange={(event, newValue) => {
                              gasId = newValue

                         }}
                    >
                         {
                              gasList.map(gas => {
                                   if (gas.company_name === "GO GASS")
                                        return (<Option key={gas.id} value={gas.id}>{gas.company_name} : {gas.kg} KG</Option>)
                              })
                         }
                    </Select>
                    <Box
                         sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              p: 1,
                              m: 0,
                              transition: "all 0.3s",
                              cursor: "pointer",
                              color: "#b34349",
                              borderRadius: "md",
                              "&:hover": {
                                   backgroundColor: "#b34349",
                                   color: "white",
                              },

                         }}
                         onClick={() => {
                              setEditMode(false)

                         }}
                    >
                         <ImCross />
                    </Box>
                    <Box
                         sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              p: 1,
                              m: 0,
                              transition: "all 0.3s",
                              cursor: "pointer",
                              color: "#0a6847",
                              borderRadius: "md",
                              "&:hover": {
                                   backgroundColor: "#0a6847",
                                   color: "white",
                              },
                         }}
                         onClick={() => {
                              setEditMode(false)
                              dispatch(updateItem(id, { [column]: gasId }))
                         }}
                    >
                         <ImCheckmark />
                    </Box>
               </Stack>
          </td >
     }

     let type = "text"
     switch (column) {
          case "qty":
               type = "number"
               break;
          case "rate":
               type = "number"
               break;
          case "return_cyl_qty":
               type = "number"
               break;
          case "date":
               type = "date"
               break;
     }
     return <td style={{ borderWidth: 0, padding: 0, margin: 0 }}>{editMode ? (
          <Stack direction="row" sx={{ width: "100%" }}>
               <Input
                    sx={{
                         color: "black",
                         // backgroundColor: "#c1ebd4",
                         flexGrow: 1,
                    }}
                    name={column}
                    size="sm"
                    type={type}
                    value={(editMode) ? editValue : ""}
                    onChange={(e) => { setEditValue(e.target.value) }}
                    endDecorator={
                         <Stack direction="row"
                              sx={{
                                   padding: 0,
                              }}
                         >
                              <Box
                                   sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        p: 1,
                                        m: 0,
                                        transition: "all 0.3s",
                                        cursor: "pointer",
                                        color: "#b34349",
                                        borderRadius: "md",
                                        "&:hover": {
                                             backgroundColor: "#b34349",
                                             color: "white",
                                        },
                                   }}
                                   onClick={() => {
                                        setEditMode(false)
                                   }}
                              >
                                   <ImCross />
                              </Box>
                              <Box
                                   sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        p: 1,
                                        m: 0,
                                        transition: "all 0.3s",
                                        cursor: "pointer",
                                        color: "#0a6847",
                                        borderRadius: "md",
                                        "&:hover": {
                                             backgroundColor: "#0a6847",
                                             color: "white",
                                        },
                                   }}
                                   onClick={() => {
                                        setEditMode(false)
                                        //console.log(id, tableName, column, editValue)
                                        if (tableName === "purchase_orders") {
                                             dispatch(updateOrder(id, { [column]: editValue }))
                                        }
                                        if (tableName === "purchase_order_items") {
                                             dispatch(updateItem(id, { [column]: editValue }))
                                        }
                                   }}
                              >
                                   <ImCheckmark />
                              </Box>
                         </Stack>
                    }
               />
          </Stack>
     ) : <DataDisplay />}
     </td >
}
const TotalRow = ({ children, data, order }) => {
     const [show, setShow] = useState(false);
     const {
          kg, qty, amt, pay_amt, remaning_amt, rKg, rQty
     } = data;
     const duration = 0.5;
     return (
          <Sheet
               sx={{
                    height: "auto",
                    transition: `all ${duration}s`,
                    backgroundColor: (show) ? "#D1E9F6" : "transparent",
                    borderTop: "1px solid #323b4d54",
                    borderBottom: "1px solid #323b4d54",

               }}
          >
               <Divider orientation="vertical" />
               <Box
                    sx={{
                         transition: `all ${duration}s`,
                         maxHeight: (show) ? "500px" : "0px",
                         opacity: (show) ? 1 : 0,
                         transform: (show) ? "scaleY(1)" : "scaleY(0)",

                    }}
               >
                    {children}
               </Box>
               <Stack
                    direction="row"
                    gap={1}
                    sx={{
                         //fontWeight: "bold",
                         opacity: 0.90,
                         py: 1,
                         fontSize: "14px",
                    }}
               >
                    <AddGas order={order} />
                    <Divider sx={{
                         flexGrow: 1,
                         backgroundColor: "transparent",
                    }} orientation="vertical" />
                    <Box
                         sx={{
                              fontWeight: "bold",
                              display: show ? "none" : "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              px: 1,
                              margin: show ? 1 : 0,
                              transition: "all 0.3s",
                              cursor: "pointer",
                              borderRadius: "md",
                              color: "#185ea5",
                         }}
                    >
                         <span style={{ fontWeight: "bold" }}>Total Qty : <span style={{ color: "#263043" }}>{qty}</span></span>
                         <Divider sx={{ width: "2px", mx: 1 }} orientation="vertical" />
                         <span style={{ fontWeight: "bold" }}>Total Kg : <span style={{ color: "#263043" }}>{kg}</span></span>
                         <Divider sx={{ width: "2px", mx: 1 }} orientation="vertical" />
                         <span style={{ fontWeight: "bold" }}>Total Amount : <span style={{ color: "#263043" }}>₹{amt}</span></span>
                         <Divider sx={{ width: "2px", mx: 1 }} orientation="vertical" />
                         <span style={{ fontWeight: "bold" }}>Paid Amount : <span style={{ color: "#263043" }}>₹{pay_amt}</span></span>
                         <Divider sx={{ width: "2px", mx: 1 }} orientation="vertical" />
                         <span style={{ fontWeight: "bold" }}>Remainng Amount : <span style={{ color: "#263043" }}>₹{remaning_amt}</span></span>
                    </Box>
                    <Box
                         sx={{
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              px: 1,
                              margin: show ? 1 : 0,
                              transition: "all 0.3s",
                              cursor: "pointer",
                              outline: show ? "1px solid #C80036" : "1px solid transparent",
                              color: show ? "#C80036" : "#185ea5",
                              borderRadius: "md",
                              "&:hover": {
                                   backgroundColor: show ? "#F8EDED" : "#12467b7a",
                                   color: show ? "#C80036" : "white",
                              },
                         }}
                         onClick={() => setShow(!show)}
                    >{show ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </Box>
                    <Divider sx={{
                         width: "2px",
                         opacity: 0,
                    }} orientation="vertical" />
               </Stack>

          </Sheet>
     )
}

const TotalData = ({ text, value, bgColor, input = false }) => {
     const tdStyle = {
          borderWidth: "0px",

          backgroundColor: (bgColor) ? bgColor : "transparent",

     }
     if (input) {
          return <tr>
               {/* <td style={tdStyle}><p>{text}</p></td> */}
               {value}
          </tr>
     }
     return (
          <tr>
               <td
                    style={tdStyle}
               >
                    <p>{text}</p>
               </td>
               <td
                    style={tdStyle}
               ><p>{value}</p></td>
          </tr>
     )
}

const AddGas = ({ order }) => {
     const [open, setOpen] = React.useState(false);
     //console.log(order)
     const dispatch = useDispatch();

     const [gas_id, setGasId] = useState(0);
     const [qty, setQty] = useState(0);
     const [rate, setRate] = useState(0);
     const [return_cyl_qty, setReturnCylQty] = useState(0);
     let totalKg = 0
     try {
          totalKg = gasListMap.get(gas_id).kg * qty
     } catch (e) {
          totalKg = 0
     }
     let totalAmt = qty * rate
     return (
          <React.Fragment>
               <Box
                    sx={{
                         fontWeight: "bold",
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "flex-end",
                         px: 1,
                         m: 0,
                         transition: "all 0.3s",
                         cursor: "pointer",
                         color: "#185ea5",
                         borderRadius: "md",
                         "&:hover": {
                              backgroundColor: "#12467b7a",
                              color: "white",
                         },
                    }}
                    onClick={() => {
                         setOpen(true)
                    }}
               > <MdModeEditOutline />&nbsp;Edit
               </Box>
               <Modal
                    aria-labelledby="modal-title-12"
                    aria-describedby="modal-desc"
                    open={open}
                    sx={{
                         borderWidth: "0px",
                         backgroundColor: "transparent",
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",

                    }}
                    onClose={() => setOpen(false)}
               >
                    <Sheet
                         sx={{
                              borderRadius: 'md',
                              p: 3,
                              boxShadow: 'lg',
                         }}
                    >
                         <ModalClose variant="plain" sx={{ m: 1 }} />
                         <Stack
                              direction="row"
                              gap={1}
                              alignContent={"center"}
                              mb={1}
                         >
                              <Typography
                                   component="h2"
                                   id="modal-title"
                                   level="h4"
                                   textColor="inherit"
                                   fontWeight="lg"
                                   mx={1}
                              >
                                   {`Order No. ${order.order_no}`}
                              </Typography>

                              <Button
                                   variant="soft"
                                   startDecorator={
                                        <MdDelete />
                                   }
                                   color="danger"
                                   onClick={() => {
                                        const deleteThisOrder = prompt("Type Order No. to delete", "");
                                        if (deleteThisOrder === order.order_no) {
                                             dispatch(deleteOrder(order.id))
                                        }
                                        setOpen(false)
                                   }}
                              >
                                   Delete
                              </Button>
                         </Stack>
                         <form
                              onSubmit={(event) => {
                                   event.preventDefault();
                                   const formData = new FormData(event.currentTarget);
                                   const formJson = Object.fromEntries(formData.entries());
                                   formJson.order_id = order.id
                                   //console.log(formJson);
                                   dispatch(createItem(formJson));
                                   setOpen(false)
                              }}
                         >
                              <Table
                                   sx={{
                                        tableLayout: "auto",
                                        fontWeight: "bold",

                                   }}
                              >
                                   <thead>
                                        <tr>
                                             <th>Gas&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                             <th >Qty.</th>
                                             <th >Rate</th>
                                             <th >Total Kg</th>
                                             <th >Total Amt</th>
                                             <th >Return Qty</th>
                                             <th >Option</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {
                                             order.items.map((item, index) => {
                                                  //console.log(item)
                                                  const gas = gasListMap.get(item.gas_id)
                                                  return (
                                                       <tr key={index}>
                                                            <td >{`${gas.company_name} : ${gas.kg} KG`}</td>
                                                            <td >{item.qty}</td>
                                                            <td >{item.rate}</td>
                                                            <td >{gas.kg * item.qty}</td>
                                                            <td >{item.qty * item.rate}</td>
                                                            <td >{item.return_cyl_qty}</td>
                                                            <td >
                                                                 <Button
                                                                      variant="outlined"
                                                                      color="danger"
                                                                      sx={{ width: "100%" }}
                                                                      onClick={() => {
                                                                           dispatch(deleteItem(item.id))
                                                                      }}
                                                                 >
                                                                      <CgTrash />
                                                                 </Button>
                                                            </td>
                                                       </tr>
                                                  )
                                             })
                                        }
                                   </tbody>
                                   <tfoot>
                                        <tr>
                                             <td>
                                                  <Select
                                                       placeholder="select Gas"
                                                       name="gas_id"
                                                       required
                                                       onChange={
                                                            (event, newValue) => {
                                                                 setGasId(newValue)
                                                            }
                                                       }
                                                  >
                                                       {gasList.map(gas => {
                                                            if (
                                                                 gas.company_name === "GO GASS"

                                                            ) return (<Option
                                                                 key={gas.id}
                                                                 value={gas.id}
                                                                 label={`${gas.company_name} : ${gas.kg} KG`}
                                                            >
                                                                 {`${gas.company_name} : ${gas.kg} KG`}
                                                            </Option>)
                                                       })}
                                                  </Select>
                                             </td>
                                             <td>
                                                  <Input
                                                       placeholder="Qty"
                                                       type="number"
                                                       name="qty"
                                                       required
                                                       onChange={(e) => setQty(e.target.value)}
                                                  />
                                             </td>
                                             <td>
                                                  <Input
                                                       placeholder="Rate"
                                                       type="number"
                                                       name="rate"
                                                       required
                                                       onChange={(e) => setRate(e.target.value)}
                                                  />
                                             </td>
                                             <td>
                                                  {totalKg}
                                             </td>
                                             <td>
                                                  {totalAmt}
                                             </td>
                                             <td>
                                                  <Input
                                                       placeholder="Return Qty"
                                                       type="number"
                                                       name="return_cyl_qty"
                                                       required
                                                       onChange={(e) => setReturnCylQty(e.target.value)}
                                                  />
                                             </td>
                                             <td>
                                                  <Button
                                                       type="submit"
                                                       color="success"
                                                       sx={{ width: "100%" }}
                                                  >
                                                       <MdDone />
                                                  </Button>
                                             </td>
                                        </tr>

                                   </tfoot>
                              </Table>
                         </form>
                    </Sheet>

               </Modal>
          </React.Fragment >
     );
}