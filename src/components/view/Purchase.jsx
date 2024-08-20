import {
     AccordionGroup,
     Box,
     Button,
     Card,
     CardContent,
     Chip,
     Container,
     Divider,
     Grid,
     Input,
     LinearProgress, List, ListItem, ListItemButton, ListItemContent, ListItemDecorator, Option,
     Select,
     Stack,
     Table,
     Typography
} from "@mui/joy";
import { CgAdd, CgBorderRight, CgEditContrast, CgFilters, CgHome, CgTrash } from "react-icons/cg";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import React, { useEffect, useState } from "react";
import { MdDone, MdModeEditOutline } from "react-icons/md";
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
let gasList = [];
let gasListMap = new Map();
export default function Purchase() {

     const [addPurchaseModel, setAddPurchaseModel] = useState(false);
     const [orderItems, setOrderItems] = useState([]);
     const handleItemChange = (index, field, value) => {
          if (field === 'id') {
               setOrderItems(orderItems.map((item, i) => {
                    if (i === index) {
                         return { ...item, [field]: value }
                    }
                    return item
               }))
               return
          }
          try {
               const updatedItems = orderItems.map((item, i) => {

                    const s = value.split('');
                    let n = '';

                    let dotCont = 0;
                    s.forEach(c => {
                         if (
                              c === '.'
                              || c === ','
                              || field === 'qty'
                              || field === 'return_cyl_qty'
                              || field === 'gas_id'
                         ) {
                              dotCont++;
                         }
                         if (c.match(/[0-9]/)) {
                              n += c;
                         }
                         if (c === '.' && dotCont <= 1) {
                              n += c;
                         }
                    });
                    if (n.startsWith('.')) {
                         n = '0' + n;
                    }
                    n = n.replace(/^0+(\d)/, '$1');
                    if (n.length === 0) {
                         n = 0;
                    }
                    return i === index ? { ...item, [field]: n } : item
               }
               );
               setOrderItems(updatedItems);
          } catch (e) {
               console.warn(e);
          }
     };
     const addEmptyItem = () => {
          try {
               const goGasId = gasList.find(gas => (gas.company_name === "GO GASS") && (orderItems.find(item => item.gas_id === gas.id) == null)).id;
               //console.log(goGasId)
               const updatedItems = [...orderItems, { gas_id: goGasId, qty: 0, rate: 0, return_cyl_qty: 0 }];
               setOrderItems(updatedItems);
          } catch (e) {
               //console.warn(e);
               return;
          }
     };

     const [paid_val, setPaid_val] = useState(0);
     const [tcs, setTcs] = useState(0.01);

     let totalAmt = 0
     let totalQty = 0
     let totalKg = 0
     let ballance = 0
     let totalReturnQty = 0
     let totalReturnKg = 0




     const removeItem = (index) => {
          const updatedItems = orderItems.filter((_, i) => i !== index);
          setOrderItems(updatedItems);
     };

     const allGases = useSelector(state => state.gas);

     const dispatch = useDispatch();
     const { updateOrderSuccsess, orders, loading, error } = useSelector(state => state.purchaseOrders);

     //console.log(orders);

     if (error) {
          console.warn(error);
     }

     const { itemLoading, items, itemError, itemUpdateSuccess } = useSelector(state => state.purchaseOrderItems);

     //console.log(itemLoading, items, itemError, itemUpdateSuccess);

     if (itemError) {
          console.warn(itemError);
     }


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

          //console.log(startDate, endDate);

          dispatch(fetchGasData());
          dispatch(fetchOrders({ startDate, endDate }));
     }, [dispatch, startDate, endDate]);

     useEffect(() => {
          if (itemUpdateSuccess || updateOrderSuccsess) {
               dispatch(iniState());
               dispatch(orderIniState());
               dispatch(fetchGasData());
               dispatch(fetchOrders());
          }
     });

     const orderRows = []

     const noOutlineHead = { borderWidth: 0, width: 1, };
     const noOutline = { borderWidth: 0, };

     if (allGases.data != null) {
          allGases.data.data.forEach(gas => {
               gasListMap.set(gas.id, gas)
          })
          gasList = allGases.data.data
     }

     if (allGases.data != null && orders != null && orders.length > 0) {
          try {

               totalAmt = orderItems.reduce((acc, item) => parseFloat(acc) + parseFloat(item.qty) * parseFloat(item.rate), 0);
               totalAmt = (totalAmt * tcs) + totalAmt;
               ballance = totalAmt - paid_val;
               totalQty = orderItems.reduce((acc, item) => parseFloat(acc) + parseFloat(item.qty), 0);
               totalKg = orderItems.reduce((acc, item) => {
                    return acc + parseFloat(item.qty) * parseFloat(gasListMap.get(item.gas_id).kg)
               }, 0);
               totalReturnQty = orderItems.reduce((acc, item) => parseFloat(acc) + parseFloat(item.return_cyl_qty), 0);
               totalReturnKg = orderItems.reduce((acc, item) => {
                    return acc + parseFloat(item.return_cyl_qty) * parseFloat(gasListMap.get(item.gas_id).kg)
               }, 0);

          } catch (e) {
               console.warn(e);
          }

          orders.forEach((order, index) => {
               let totalQty = 0;
               let totalKg = 0;
               let totalAmt = 0;
               let totalPayAmt = Number(order.pay_amt);
               let ballance = 0;
               let totalReturnQty = 0;
               let totalReturnKg = 0;

               if (order.items.length === 0) {
                    orderRows.push(
                         <tr key={`order-row-empty-${order.id}`}>
                              <td style={{ borderWidth: 0, padding: 6, margin: 0, backgroundColor: "#FFB0B0" }} colSpan={11}>
                                   <Stack

                                        direction="row"
                                        gap={1}
                                   >
                                        <span style={{ fontWeight: "bold" }}>{`Order No. ${order.order_no}`}</span>
                                        <span style={{ fontWeight: "bold" }}>|{` ${order.date}`}</span>
                                        <span style={{ fontWeight: "bold" }}>|{` Scheme ${order.scheme}`}</span>
                                        <span style={{ fontWeight: "bold" }}>|{` Scheme Type ${order.scheme_type}`}</span>

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

                    //const gas = gasList.find(gas => gas.id === item.gas_id);

                    const gas = gasListMap.get(item.gas_id);

                    totalQty += item.qty;
                    totalKg += gas.kg * item.qty;
                    totalAmt += item.qty * item.rate;
                    totalReturnQty += item.return_cyl_qty;
                    totalReturnKg += gas.kg * item.return_cyl_qty;

                    orderRows.push(
                         <tr
                              key={`order-row-${order.id}-${index}`}
                         >
                              <Cell id={order.id} data={order.order_no} tableName="purchase_orders" column="order_no" />
                              <Cell id={order.id} data={order.date} tableName="purchase_orders" column="date" />
                              <Cell id={order.id} data={order.scheme} tableName="purchase_orders" column="scheme" />
                              <Cell id={order.id} data={order.scheme_type} tableName="purchase_orders" column="scheme_type" />
                              <Cell id={item.id} data={gas} tableName="purchase_order_items" column="gas_id" />
                              <Cell id={item.id} data={item.qty} tableName="purchase_order_items" column="qty" />
                              <Cell id={order.id} data={item.qty * gas.kg + " KG"} editable={false} tableName="" column="" />
                              <Cell id={item.id} data={item.rate} tableName="purchase_order_items" column="rate" />
                              <Cell id={order.id} data={"₹" + (item.qty * item.rate).toFixed(2)} editable={false} tableName="" column="" />
                              <Cell id={item.id} data={item.return_cyl_qty} tableName="purchase_order_items" column="return_cyl_qty" />
                              <Cell id={order.id} data={item.return_cyl_qty * gas.kg + " KG"} editable={false} tableName="" column="" />
                         </tr >
                    )
               })
               // console.log(gasListMap);
               ballance = totalAmt - totalPayAmt;
               grandTotalBallance += ballance
               grandTotalPayAmt += totalPayAmt
               orderRows.push(<tr key={`order-row-total-${order.id}-${index}`}>
                    <td style={{ borderWidth: 0, padding: 0, margin: 0, height: 24, }} colSpan={11}>
                         <React.Fragment>
                              <TotalRow
                                   order={order}
                                   data={
                                        {
                                             kg: totalKg,
                                             qty: totalQty,
                                             amt: totalAmt,
                                             pay_amt: totalPayAmt,
                                             remaning_amt: ballance,
                                             rKg: totalReturnKg,
                                             rQty: totalReturnQty,
                                        }
                                   }>
                                   <div
                                        style={{
                                             width: "100%",
                                             flexGrow: 1,
                                        }}
                                   />
                                   <List size="md">
                                        {
                                             [
                                                  { label: "Total Kg", value: totalKg },
                                                  { label: "Total Qty", value: totalQty },
                                                  { label: "Total Return Kg", value: totalReturnKg },
                                                  { label: "Total Return Qty", value: totalReturnQty },
                                                  { label: "Total Amt", value: totalAmt },
                                                  { label: "Pending Amt", value: ballance },
                                                  {
                                                       label: "Pay Amt", value: <Cell
                                                            column="pay_amt"
                                                            id={order.id}
                                                            data={order.pay_amt}
                                                            tableName="purchase_orders"
                                                       />
                                                  },
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

                                                            }}
                                                       >{data.value}</ListItemDecorator>
                                                       <ListItemDecorator />

                                                  </ListItem>
                                             ))
                                        }
                                   </List>
                                   <Table
                                        borderAxis="none"
                                        color="neutral"
                                        size="sm"
                                        sx={{
                                             tableLayout: "auto",
                                             fontWeight: "bold",
                                             textAlign: 'right',
                                             display: "none",
                                        }}
                                        variant="soft"
                                   >
                                        <tbody>
                                             <TotalData text="Total Qty :-" value={totalQty} />
                                             <TotalData text="Total KG :-" value={totalKg + " KG"} />
                                             <TotalData text="Total Amount :-" value={"₹" + totalAmt} bgColor={"#C8A1E0"} />
                                             <tr
                                                  style={{
                                                       borderWidth: 0,
                                                       padding: 0,
                                                       margin: 0,
                                                       height: 24,
                                                       backgroundColor: "#D5ED9F"
                                                  }}
                                             >
                                                  <td style={{
                                                       borderWidth: 0, padding: 0, margin: 0, height: 24,
                                                       backgroundColor: "#7ABA78"
                                                  }} >Pay Amt :-</td>

                                                  <Cell data={totalPayAmt} />
                                             </tr>
                                             <TotalData text="Payment Pending :-" value={"₹" + ballance} bgColor={"#F4A261"} />
                                             <TotalData text="Total Return Qty :-" value={totalReturnQty + " KG"} />
                                             <TotalData text="Total Return KG :-" value={totalReturnKg + " KG"} />
                                        </tbody>
                                   </Table>
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
     return (
          <Sheet
               sx={{
                    width: "100%",
               }}
          >
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
                         >{`Pending Payment : ₹${grandTotalBallance}`}</span>
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
                    <Stack
                         direction="row"
                         gap={1}
                    >
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
                              onKeyDown={(e) => e.preventDefault()}
                              onFocus={(e) => e.target.showPicker()}
                              onClick={(e) => e.target.showPicker()}

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
                              onKeyDown={(e) => e.preventDefault()}
                              onFocus={(e) => e.target.showPicker()}
                              onClick={(e) => e.target.showPicker()}

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
                    <Button
                         variant="solid"
                         size="sm"
                         sx={{
                              backgroundColor: "#12467b",
                              display: loading ? "none" : "flex",
                         }}
                         startDecorator={<CgAdd />}
                         onClick={() => setAddPurchaseModel(true)}
                    >
                         Add Purchase
                    </Button>
               </Stack>
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
                              <th style={thStyle}>Order No.</th>
                              <th style={thStyle}>Date</th>
                              <th style={thStyle}>Scheme</th>
                              <th style={thStyle}>Scheme Type</th>
                              <th style={thStyle}>Gas</th>
                              <th style={thStyle}>Qty</th>
                              <th style={thStyle}>Total Kg</th>
                              <th style={thStyle}>Rate</th>
                              <th style={thStyle}>Total</th>
                              <th style={thStyle}>Return Qty</th>
                              <th style={thStyle}>Return Total Kg</th>
                         </tr>
                    </thead>
                    <tbody>
                         {
                              orderRows
                         }
                    </tbody>
               </Table>
               {
                    gasListMap.size > 0 ? <Modal
                         aria-labelledby="modal-title"
                         aria-describedby="modal-desc"
                         open={addPurchaseModel}
                         onClose={() => setAddPurchaseModel(false)}
                         sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                         }}
                    >
                         <Container
                              maxWidth="lg"
                         >
                              <Sheet
                                   variant="outlined"
                                   sx={{
                                        borderRadius: "md",
                                        p: 3,
                                        boxShadow: "lg",
                                        maxHeight: "100vh",
                                        overflow: "auto"
                                   }}
                              >
                                   <ModalClose variant="plain" sx={{ m: 1 }} />
                                   <Typography
                                        component="h2"
                                        id="modal-title"
                                        level="h4"
                                        textColor="inherit"
                                        fontWeight="lg"
                                   >
                                        Add Purchase
                                   </Typography>
                                   <LinearProgress
                                        sx={{
                                             my: 1,
                                             width: "100%",
                                             display: (false) ? "block" : "none",
                                        }}

                                   />
                                   <Divider sx={{
                                        my: 1
                                   }} />
                                   <form
                                        onSubmit={(event) => {
                                             event.preventDefault();
                                             const formData = new FormData(event.currentTarget);
                                             const formJson = Object.fromEntries(formData.entries());
                                             //let date_str = formJson.date;
                                             // let date_epoch = new Date(date_str).getTime();
                                             formJson.purchase_order_items = orderItems;
                                             //console.log(formJson);
                                             dispatch(createOrder(formJson));
                                             setAddPurchaseModel(false);
                                        }}
                                   >
                                        <Stack
                                             direction="column"
                                             gap={1}
                                             sx={{
                                                  width: "100%",
                                                  borderRadius: "md",
                                                  padding: 1,
                                                  marginTop: 1,
                                                  backgroundColor: "transparent",
                                                  color: "black",
                                             }}>
                                             <Stack
                                                  direction="row"
                                                  gap={1}
                                             >
                                                  <Input
                                                       placeholder="Date"
                                                       type="date"
                                                       name="date"
                                                       required
                                                       size="sm"
                                                       onKeyDown={(e) => e.preventDefault()}
                                                       onFocus={(e) => e.target.showPicker()}
                                                       onClick={(e) => e.target.showPicker()}
                                                       sx={{
                                                            width: "100%",
                                                            flexGrow: 1,
                                                       }}
                                                  />
                                                  <Input
                                                       placeholder="Order No."
                                                       type="text"
                                                       name="order_no"
                                                       size="sm"
                                                       required
                                                       sx={{
                                                            width: "100%",
                                                            flexGrow: 1,
                                                       }}
                                                  />
                                                  <Input sx={{
                                                       width: "100%",
                                                       flexGrow: 1,
                                                  }} placeholder="Scheme" size="sm" type="text" name="scheme" required />
                                                  <Input sx={{
                                                       width: "100%",
                                                       flexGrow: 1,
                                                  }} placeholder="Scheme Type" size="sm" type="text" name="scheme_type" required />
                                             </Stack>
                                             <Card >
                                                  <CardContent
                                                       sx={{
                                                            display: "flex",
                                                       }}
                                                  >

                                                       <Table
                                                            sx={{

                                                                 width: "100%",
                                                                 flexGrow: 1,
                                                                 tableLayout: "fixed",
                                                                 fontWeight: "bold",


                                                            }}
                                                            size="sm"
                                                       >
                                                            <thead>

                                                                 <tr>
                                                                      <th style={noOutlineHead}>


                                                                           <Box
                                                                                sx={{
                                                                                     display: "flex",
                                                                                     alignItems: "center",
                                                                                     justifyContent: "center",
                                                                                }}
                                                                           >
                                                                                <span
                                                                                     style={{
                                                                                          fontWeight: "bold",
                                                                                     }}
                                                                                > Cyl.</span>
                                                                           </Box>

                                                                      </th>
                                                                      <th style={noOutlineHead}>


                                                                           <Box
                                                                                sx={{
                                                                                     display: "flex",
                                                                                     alignItems: "center",
                                                                                     justifyContent: "center",
                                                                                }}
                                                                           >
                                                                                <span
                                                                                     style={{
                                                                                          fontWeight: "bold",
                                                                                     }}
                                                                                > </span>
                                                                           </Box>

                                                                      </th>
                                                                      <th style={noOutlineHead}>
                                                                           <Box
                                                                                sx={{
                                                                                     display: "flex",
                                                                                     alignItems: "center",
                                                                                     justifyContent: "center",
                                                                                }}
                                                                           >
                                                                                <span
                                                                                     style={{
                                                                                          fontWeight: "bold",
                                                                                     }}
                                                                                > Qty.</span>
                                                                           </Box>
                                                                      </th>
                                                                      <th style={noOutlineHead}>
                                                                           <Box
                                                                                sx={{
                                                                                     display: "flex",
                                                                                     alignItems: "center",
                                                                                     justifyContent: "center",
                                                                                }}
                                                                           >
                                                                                <span
                                                                                     style={{
                                                                                          fontWeight: "bold",
                                                                                     }}
                                                                                >Total Kg</span>
                                                                           </Box>
                                                                      </th>
                                                                      <th style={noOutlineHead}>
                                                                           <Box
                                                                                sx={{
                                                                                     display: "flex",
                                                                                     alignItems: "center",
                                                                                     justifyContent: "center",
                                                                                }}
                                                                           >
                                                                                <span
                                                                                     style={{
                                                                                          fontWeight: "bold",
                                                                                     }}
                                                                                >Rate</span>
                                                                           </Box>
                                                                      </th>
                                                                      <th style={noOutlineHead}>
                                                                           <Box
                                                                                sx={{
                                                                                     display: "flex",
                                                                                     alignItems: "center",
                                                                                     justifyContent: "center",
                                                                                }}
                                                                           >
                                                                                <span
                                                                                     style={{
                                                                                          fontWeight: "bold",
                                                                                     }}
                                                                                >Total Amt</span>
                                                                           </Box></th>

                                                                      <th style={noOutlineHead}>
                                                                           <Box
                                                                                sx={{
                                                                                     display: "flex",
                                                                                     alignItems: "center",
                                                                                     justifyContent: "center",
                                                                                }}
                                                                           >
                                                                                <span
                                                                                     style={{
                                                                                          fontWeight: "bold",
                                                                                     }}
                                                                                >Return Cyl. Qty.</span>
                                                                           </Box>
                                                                      </th>
                                                                      <th style={noOutlineHead}>Total</th>

                                                                 </tr>
                                                                 <tr>
                                                                      <th colSpan={8}
                                                                           style={
                                                                                {
                                                                                     borderWidth: 0, width: 1,
                                                                                     height: 1,
                                                                                }
                                                                           }
                                                                      >
                                                                           <Divider orientation="horizontal" />
                                                                      </th>
                                                                 </tr>
                                                            </thead>
                                                            <tbody>
                                                                 {
                                                                      orderItems.map((item, index) => {
                                                                           return (
                                                                                <tr key={`order-item-${item.id}-${index}`}>
                                                                                     <td style={
                                                                                          {
                                                                                               borderWidth: 0,


                                                                                          }

                                                                                     }
                                                                                          colSpan={2}>


                                                                                          <Select
                                                                                               color="neutral"
                                                                                               placeholder="select Gas"
                                                                                               size="sm"
                                                                                               variant="outlined"
                                                                                               name="gas_id"
                                                                                               defaultValue={item.gas_id}
                                                                                               onChange={(event, newValue) => {
                                                                                                    //console.log(orderItems.find(item => item.gas_id === newValue) == null)
                                                                                                    if (orderItems.find(item => item.gas_id === newValue) != null) {
                                                                                                         alert("Gas already added")
                                                                                                         return
                                                                                                    }
                                                                                                    handleItemChange(index, 'gas_id', newValue)

                                                                                               }}
                                                                                               required
                                                                                               sx={{
                                                                                                    flexGrow: 1,
                                                                                                    width: "100%",
                                                                                               }}

                                                                                          >
                                                                                               {gasList.map(gas => {



                                                                                                    if (
                                                                                                         gas.company_name === "GO GASS"

                                                                                                    ) return (<Option
                                                                                                         key={gas.id}
                                                                                                         value={gas.id}
                                                                                                         label={`${gas.company_name} : ${gas.kg} KG`}
                                                                                                         sx={{
                                                                                                              backgroundColor: "transparent",
                                                                                                              color: "black",

                                                                                                         }}
                                                                                                         onClick={() => {
                                                                                                              // handleItemChange(index, 'gas_id', gas.id)
                                                                                                         }}

                                                                                                    >
                                                                                                         {`${gas.company_name} : ${gas.kg} KG`}
                                                                                                    </Option>)
                                                                                               })}
                                                                                          </Select>

                                                                                     </td>
                                                                                     <td colSpan={2} style={noOutline}>
                                                                                          <Input
                                                                                               placeholder="Quantity"
                                                                                               type="text"
                                                                                               name="qty"
                                                                                               size="sm"
                                                                                               sx={{
                                                                                                    flexGrow: 1,
                                                                                                    width: "100%",
                                                                                               }}
                                                                                               required
                                                                                               value={item.qty}
                                                                                               onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                                                                                               endDecorator={
                                                                                                    <Chip
                                                                                                         style={{

                                                                                                              fontWeight: "bold",
                                                                                                              backgroundColor: "#474747",
                                                                                                              color: "white",
                                                                                                         }}
                                                                                                    >
                                                                                                         {`Total : ${(item.qty) * (gasListMap.get(item.gas_id).kg)} KG`}
                                                                                                    </Chip>
                                                                                               }
                                                                                          />
                                                                                     </td>

                                                                                     <td colSpan={2} style={noOutline}>
                                                                                          <Input
                                                                                               placeholder="Rate"
                                                                                               type="text"
                                                                                               name="rate"
                                                                                               size="sm"
                                                                                               sx={{
                                                                                                    flexGrow: 1,
                                                                                                    width: "100%",
                                                                                               }}
                                                                                               required
                                                                                               endDecorator={
                                                                                                    <Chip
                                                                                                         style={{

                                                                                                              fontWeight: "bold",
                                                                                                              backgroundColor: "#0A6847",
                                                                                                              color: "white",
                                                                                                         }}
                                                                                                    >
                                                                                                         {`Total : ₹${((item.qty) * (1)) * (item.rate)}`}
                                                                                                    </Chip>
                                                                                               }
                                                                                               value={item.rate}
                                                                                               onChange={(e) => handleItemChange(index, 'rate', e.target.value)}

                                                                                          />
                                                                                     </td>


                                                                                     <td colSpan={2} style={noOutline}>
                                                                                          <Stack
                                                                                               direction="row"
                                                                                               gap={1}
                                                                                          >
                                                                                               <Input
                                                                                                    placeholder="Return Qty"
                                                                                                    type="text"
                                                                                                    name="return_cyl_qty"
                                                                                                    size="sm"
                                                                                                    sx={{
                                                                                                         flexGrow: 1,
                                                                                                    }}
                                                                                                    required
                                                                                                    value={item.return_cyl_qty}
                                                                                                    onChange={(e) => handleItemChange(index, 'return_cyl_qty', e.target.value)}
                                                                                                    endDecorator={
                                                                                                         <Chip
                                                                                                              style={{

                                                                                                                   fontWeight: "bold",
                                                                                                                   backgroundColor: "#474747",
                                                                                                                   color: "white",
                                                                                                              }}
                                                                                                         >
                                                                                                              {`Total : ${(item.return_cyl_qty) * (gasListMap.get(item.gas_id).kg)} KG`}
                                                                                                         </Chip>
                                                                                                    }
                                                                                               />
                                                                                               <Button
                                                                                                    variant="outlined"
                                                                                                    color="danger"

                                                                                                    onClick={() => removeItem(index)}
                                                                                               >
                                                                                                    <CgTrash />
                                                                                               </Button>
                                                                                          </Stack>
                                                                                     </td>
                                                                                </tr>

                                                                           )
                                                                      })}
                                                                 <tr>
                                                                      <td style={noOutline} colSpan={8}>
                                                                           <Button
                                                                                startDecorator={
                                                                                     <FaRegPlusSquare />
                                                                                }
                                                                                variant="outlined"
                                                                                sx={{
                                                                                     marginTop: 1,
                                                                                     width: "100%",
                                                                                }}
                                                                                onClick={() => addEmptyItem()}
                                                                           >
                                                                                Add
                                                                           </Button>
                                                                      </td>
                                                                 </tr>
                                                            </tbody>
                                                       </Table>
                                                  </CardContent>
                                             </Card>
                                             <Stack
                                                  direction="row"
                                                  gap={1}
                                                  alignContent="center"
                                             >
                                                  <Box
                                                       sx={
                                                            {
                                                                 display: "flex",
                                                                 alignItems: "center",
                                                                 justifyContent: "center",
                                                            }
                                                       }
                                                  >
                                                       <span
                                                            style={{

                                                                 fontWeight: "bold",
                                                            }}
                                                       >TCS :</span>
                                                  </Box>
                                                  <Input
                                                       placeholder="TCS"
                                                       type="number"
                                                       name="pay_amt"
                                                       required
                                                       value={tcs}
                                                       onChange={(e) => setTcs(e.target.value)}
                                                  />
                                                  <Divider orientation="vertical" />
                                                  <Box
                                                       sx={
                                                            {
                                                                 display: "flex",
                                                                 alignItems: "center",
                                                                 justifyContent: "center",
                                                            }
                                                       }
                                                  >
                                                       <span
                                                            style={{
                                                                 color: "green",
                                                                 fontWeight: "bold",
                                                            }}
                                                       >Total : ₹{totalAmt}</span>
                                                  </Box>
                                                  <Divider orientation="vertical" />
                                                  <Box
                                                       sx={
                                                            {
                                                                 display: "flex",
                                                                 alignItems: "center",
                                                                 justifyContent: "center",
                                                            }
                                                       }
                                                  >
                                                       <span
                                                            style={{

                                                                 fontWeight: "bold",
                                                            }}
                                                       >Paid :</span>
                                                  </Box>
                                                  <Input
                                                       placeholder="Amt Pay"
                                                       type="number"
                                                       name="pay_amt"
                                                       required
                                                       value={paid_val}
                                                       onChange={(e) => setPaid_val(e.target.value)}
                                                  />
                                             </Stack>

                                             <Divider sx={{
                                                  my: 1
                                             }} />
                                             <Stack
                                                  direction="row"
                                             >
                                                  <Table
                                                       sx={{
                                                            tableLayout: "auto",
                                                            fontWeight: "bold",
                                                       }}
                                                       size="sd"
                                                       borderAxis="none"
                                                  >
                                                       <tbody>
                                                            <tr>
                                                                 <th style={{ width: 1, borderWidth: 0 }} >Ballance</th>
                                                                 <td style={{ borderWidth: 0, width: 1, }}>&nbsp;:&nbsp;</td>
                                                                 <td style={{ borderWidth: 0 }}>₹{ballance}</td>
                                                            </tr>
                                                            <tr>
                                                                 <th style={{ width: 1, borderWidth: 0 }} >Total Qty</th>
                                                                 <td style={{ borderWidth: 0, width: 1, }}>&nbsp;:&nbsp;</td>
                                                                 <td style={{ borderWidth: 0 }}>{totalQty}</td>
                                                            </tr>
                                                            <tr>
                                                                 <th style={{ width: 1, borderWidth: 0 }} >Total Kg</th>
                                                                 <td style={{ borderWidth: 0, width: 1, }}>&nbsp;:&nbsp;</td>
                                                                 <td style={{ borderWidth: 0 }}>{totalKg}</td>
                                                            </tr>
                                                            <tr>
                                                                 <th style={{ width: 1, borderWidth: 0 }} >Total Return Qty</th>
                                                                 <td style={{ borderWidth: 0, width: 1, }}>&nbsp;:&nbsp;</td>
                                                                 <td style={{ borderWidth: 0 }}>{totalReturnQty}</td>
                                                            </tr>
                                                            <tr>
                                                                 <th style={{ width: 1, borderWidth: 0 }} >Total Return Kg</th>
                                                                 <td style={{ borderWidth: 0, width: 1, }}>&nbsp;:&nbsp;</td>
                                                                 <td style={{ borderWidth: 0 }}>{totalReturnKg}</td>
                                                            </tr>
                                                       </tbody>
                                                  </Table>
                                                  <Box
                                                       sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                       }}
                                                  >
                                                       <Button
                                                            variant="outlined"
                                                            onClick={() => setAddPurchaseModel(false)}
                                                       >
                                                            Cancel
                                                       </Button>
                                                       <span
                                                            style={{ width: "10px" }}
                                                       />
                                                       <Button
                                                            startDecorator={
                                                                 <CgAdd />
                                                            }
                                                            type="submit"
                                                       >
                                                            Save
                                                       </Button>
                                                  </Box>
                                             </Stack>
                                        </Stack>
                                   </form>
                              </Sheet>
                         </Container>
                    </Modal> : <></>
               }

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
                              <ImCross

                              />
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
                         <ImCross

                         />
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
                         <ImCheckmark

                         />
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
                                   <ImCross

                                   />
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
                         fontWeight: "bold",
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
                         <span style={{ fontWeight: "bold" }}>Total Qty : ₹{qty}</span>
                         <Divider sx={{ width: "2px", mx: 1 }} orientation="vertical" />
                         <span style={{ fontWeight: "bold" }}>Total Kg : ₹{kg}</span>
                         <Divider sx={{ width: "2px", mx: 1 }} orientation="vertical" />
                         <span style={{ fontWeight: "bold" }}>Total Amount : ₹{amt}</span>
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

                    }}
                    onClose={() => setOpen(false)}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
               >

                    <Sheet
                         sx={{
                              borderRadius: 'md',
                              p: 3,
                              boxShadow: 'lg',
                         }}
                    >
                         <ModalClose variant="plain" sx={{ m: 1 }} />
                         <Typography
                              component="h2"
                              id="modal-title"
                              level="h4"
                              textColor="inherit"
                              fontWeight="lg"
                              mb={1}
                         >
                              {`Order No. ${order.order_no}`}
                         </Typography>
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
                                                  return (
                                                       <tr key={index}>
                                                            <td >{gasListMap.get(item.gas_id).company_name}</td>
                                                            <td >{item.qty}</td>
                                                            <td >{item.rate}</td>
                                                            <td >{item.return_cyl_qty * gasListMap.get(item.gas_id).kg}</td>
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