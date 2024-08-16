import {
     Box,
     Button,
     Card,
     CardContent,
     Chip,
     Container,
     Divider,
     Grid,
     Input,
     LinearProgress, Option,
     Select,
     Stack,
     Table,
     Typography
} from "@mui/joy";
import { CgAdd, CgBorderRight, CgFilters, CgTrash } from "react-icons/cg";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { createOrder, deleteOrder, fetchOrders, updateOrder } from "../../redux/actions/purchaseOrderActions.js";
import DataTable from "../table/DataTable.jsx";
import { FaCheck, FaCompressArrowsAlt, FaFilter, FaRegPlusSquare } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { createItem, deleteItem, updateItem } from "../../redux/actions/purchaseOrderItemActions.js";
import { fetchGasData } from "../../state/GasList.jsx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


let gasList = [];
export default function Purchase() {

     const [addPurchaseModel, setAddPurchaseModel] = useState(false);
     const [orderItems, setOrderItems] = useState([

     ]);
     const handleItemChange = (index, field, value) => {
          if (field === 'gas_id') {
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

     let gasListMap = new Map();


     const removeItem = (index) => {
          const updatedItems = orderItems.filter((_, i) => i !== index);
          setOrderItems(updatedItems);
     };

     const allGases = useSelector(state => state.gas);

     const dispatch = useDispatch();
     const { orders, loading, error } = useSelector(state => state.purchaseOrders);

     let grandTotalBallance = 0


     //console.log(orders);

     useEffect(() => {
          dispatch(fetchGasData());
          dispatch(fetchOrders());
     }, [dispatch]);

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
               let totalPayAmt = order.pay_amt;
               let ballance = 0;
               let totalReturnQty = 0;
               let totalReturnKg = 0;

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
                              <Cell id={order.id} data={`${gas.company_name} : ${gas.kg} KG`} tableName="purchase_order_items" column="gas_id" />
                              <Cell id={order.id} data={item.qty} tableName="purchase_order_items" column="quantity" />
                              <Cell id={order.id} data={item.qty * gas.kg + " KG"} tableName="" column="" />
                              <Cell id={order.id} data={item.rate} tableName="purchase_order_items" column="rate" />
                              <Cell id={order.id} data={"₹" + (item.qty * item.rate).toFixed(2)} tableName="" column="" />
                              <Cell id={order.id} data={item.return_cyl_qty} tableName="purchase_order_items" column="return_cylinder" />
                              <Cell id={order.id} data={item.return_cyl_qty * gas.kg + " KG"} tableName="" column="" />
                         </tr >
                    )
               })
               // console.log(gasListMap);
               ballance = totalAmt - totalPayAmt;
               grandTotalBallance += ballance
               orderRows.push(<tr key={`order-row-total-${order.id}-${index}`}>
                    <td colSpan={11}>
                         <React.Fragment>
                              <TotalRow>
                                   <div
                                        style={{
                                             width: "100%",
                                             flexGrow: 1,
                                        }}
                                   />
                                   <Table
                                        borderAxis="none"
                                        color="neutral"
                                        size="sm"
                                        sx={{
                                             tableLayout: "auto",
                                             fontWeight: "bold",
                                             textAlign: 'right'
                                        }}
                                        variant="soft"
                                   >
                                        <tbody>
                                             <TotalData text="Total Qty :-" value={totalQty} />
                                             <TotalData text="Total KG :-" value={totalKg + " KG"} />
                                             <TotalData text="Total Amount :-" value={"₹" + totalAmt} bgColor={"#A1DD70"} />
                                             <TotalData text="Pay Amt :-" value={"₹" + totalPayAmt} bgColor={"#FFA27F"} />
                                             <TotalData text="Ballance :-" value={"₹" + ballance} />
                                             <TotalData text="Total Return Qty :-" value={totalReturnQty + " KG"} />
                                             <TotalData text="Total Return KG :-" value={totalReturnKg + " KG"} />
                                        </tbody>
                                   </Table>
                              </TotalRow>
                         </React.Fragment>
                    </td>
               </tr>)
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
                    }}
                    gap={1}
               >
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
                    >
                         <span
                              style={{
                                   color: "white",
                                   fontWeight: "bold",
                              }}
                         >{`Total Ballance : ₹${grandTotalBallance}`}</span>
                    </Chip>
                    <Divider
                         sx={{
                              flexGrow: 1,
                              backgroundColor: "transparent",
                         }}
                    />
                    <Button
                         variant="solid"
                         sx={{
                              backgroundColor: "#8C3061",
                              display: loading ? "none" : "flex",
                         }}
                         startDecorator={<FaFilter />}
                         onClick={() => { }}
                    >
                         Filter
                    </Button>

                    <Button
                         variant="solid"
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
                         display: (loading) ? "block" : "none",

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

export const Cell = ({ id, data, tableName, column }) => {
     const [editMode, setEditMode] = useState(false);
     const [editValue, setEditValue] = useState(data);
     const dispatch = useDispatch();
     return <td>{editMode ? <Stack
          direction="row"

     >
          <Input
               sx={{
                    color: "black",
                    backgroundColor: "#c1ebd4",
                    flexGrow: 1,
               }}
               name={column}
               type="text"
               value={editValue}
               onChange={(e) => setEditValue(e.target.value)}
               endDecorator={
                    <Stack direction="row"
                         sx={{
                              padding: 1,
                         }}
                         gap={2}>
                         <FaCompressArrowsAlt
                              onClick={() => {
                                   setEditMode(false)
                              }}
                         />
                         <FaCheck
                              onClick={() => {
                                   setEditMode(false)
                                   if (tableName === "purchase_orders") {
                                        dispatch(updateOrder(id, { [column]: editValue }))
                                   }
                                   if (tableName === "purchase_order_items") {
                                        dispatch(updateItem(id, { [column]: editValue }))
                                   }
                              }}
                         />
                    </Stack>
               }

          />
     </Stack> : <Box
          sx={{
               color: "black",
               borderRadius: 0,
               backgroundColor: "transparent",
               whiteSpace: "nowrap",
               transition: "background-color 0.3s",
               fontWeight: "bold",
               "&:hover": {
                    backgroundColor: "#c1ebd4",
               },
          }}
          onClick={() => {
               if (tableName != "")
                    setEditMode(true)
          }}
     >
          {data}
     </Box>}
     </td>
}

const TotalRow = ({ children }) => {
     const [show, setShow] = useState(false);
     return (
          <Stack>
               <Divider orientation="vertical" />
               <Box
                    sx={{
                         transition: "all 0.3s",
                         height: (show) ? "auto" : 0,
                         opacity: (show) ? 1 : 0,
                         zIndex: (show) ? 100 : -1,
                         transform: (show) ? "scaleY(1)" : "scaleY(0)",
                         display: "flex",
                    }}
               >
                    {children}
               </Box>
               <Divider orientation="vertical" sx={{
                    height: "1px",
                    width: "100%",
                    opacity: 0.4,
                    mb: 1,
                    display: (show) ? "block" : "none",
                    backgroundColor: "black",
               }} />
               <Box
                    sx={{
                         fontWeight: "bold",
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "flex-end",
                         padding: 1,
                         transition: "all 0.3s",
                         cursor: "pointer",
                         color: "#185ea5",
                         borderRadius: "md",
                         "&:hover": {
                              backgroundColor: "#12467b7a",
                              color: "white",
                         },
                    }}
                    onClick={() => setShow(!show)}
               >{show ? "Hide Total" : "Show Total"}
                    {show ? <IoIosArrowUp /> : <IoIosArrowDown />}
               </Box>
          </Stack>
     )
}

const TotalData = ({ text, value, bgColor }) => {
     const tdStyle = {
          borderWidth: "0px",
          backgroundColor: (bgColor) ? bgColor : "transparent",

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