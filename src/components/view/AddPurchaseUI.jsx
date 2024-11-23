/* eslint-disable react/prop-types */
import { Box, Button, Card, CardContent, Chip, Container, Divider, Input, LinearProgress, Modal, ModalClose, Option, Select, Sheet, Stack, Table, Tooltip, Typography } from "@mui/joy";
import { useState } from "react";
import { CgAdd, CgTrash } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/purchaseOrderActions";
import { FaRegPlusSquare } from "react-icons/fa";

export default function AddPurchaseUI({ gaslistData, plants }) {

     // console.log(
     //      calculatePurchaseSummary(
     //           [
     //                { qty: 6, kg: 12, rate: 10, return_cyl_qty: 4 }, // GO GASS : 12 KG
     //                { qty: 10, kg: 15, rate: 12, return_cyl_qty: 2 }, // GO GASS : 15 KG
     //                { qty: 7, kg: 17, rate: 45, return_cyl_qty: 1 }   // GO GASS : 17 KG
     //           ],
     //           0.01,
     //           3.41,
     //           5000
     //      )
     // )

     const dispatch = useDispatch();

     const [paid_val, setPaid_val] = useState(0);
     const [tcs, setTcs] = useState(0.01);
     const [for_charges, setFor_charges] = useState(0.01);
     const [scheme_rate, setSchemeRate] = useState(0);

     const [addPurchaseModel, setAddPurchaseModel] = useState(false);
     const [orderItems, setOrderItems] = useState([]);

     if ((gaslistData != null) && (gaslistData.length === 0) || (plants === undefined || plants === null || plants.length === 0)) {
          return <></>
     }

     const gasListMap = new Map();

     gaslistData.forEach(gas => {
          gasListMap.set(gas.id, gas)
     })

     const noOutlineHead = { borderWidth: 0, width: 1, };
     const noOutline = { borderWidth: 0, };

     let totalAmt = 0
     let totalQty = 0
     let totalKg = 0
     let ballance = 0
     let totalReturnQty = 0
     let totalReturnKg = 0

     orderItems.forEach(item => {
          totalQty += Number(item.qty)
          totalKg += Number(item.qty) * Number(gasListMap.get(item.gas_id).kg)
          totalAmt += Number(item.qty) * Number(gasListMap.get(item.gas_id).kg) * Number(item.rate)
          totalReturnQty += Number(item.return_cyl_qty)
          totalReturnKg += Number(item.return_cyl_qty) * Number(gasListMap.get(item.gas_id).kg)
     })

     const totalScheme = (totalKg * scheme_rate)

     const totalTcs = tcs * totalAmt
     const totalFor = for_charges * totalKg

     const billing = totalAmt + totalTcs + totalFor - totalScheme

     ballance = billing - paid_val

     if (paid_val === undefined) {
          ballance = billing
     }

     //console.log({ totalQty, totalKg, totalReturnQty, totalReturnKg, totalAmt, totalScheme, billing, totalTcs, totalFor })

     const removeItem = (index) => {
          const updatedItems = orderItems.filter((_, i) => i !== index);
          setOrderItems(updatedItems);
     };
     const handleItemChange = (index, field, value) => {
          if (field === 'id' || field === 'gas_id') {
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
               const goGasId = gaslistData.find(gas => (gas.company_name === "GO GASS") && (orderItems.find(item => item.gas_id === gas.id) == null)).id;
               //console.log(goGasId)
               const updatedItems = [...orderItems, { gas_id: goGasId, qty: 0, rate: 0, return_cyl_qty: 0 }];
               setOrderItems(updatedItems);
          } catch (e) {
               //console.warn(e);
               return;
          }
     };
     return (
          <>
               <Button
                    variant="solid"
                    size="sm"
                    sx={{
                         backgroundColor: "#12467b",
                    }}
                    startDecorator={<CgAdd />}
                    onClick={() => setAddPurchaseModel(true)}
               >
                    Add Purchase
               </Button>
               <Modal
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
                         maxWidth="xl"
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
                                        display: "none",
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
                                        formJson.scheme = scheme_rate
                                        formJson.purchase_order_items = orderItems;
                                        formData.tcs = tcs
                                        formData.for_charges = for_charges
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
                                                  onKeyDown={(e) => {
                                                       try {
                                                            e.preventDefault()
                                                       } catch (e) {
                                                            console.warn(e)
                                                       }
                                                  }}
                                                  onFocus={(e) => {
                                                       try {
                                                            e.target.showPicker()
                                                       } catch (e) {
                                                            console.warn(e)
                                                       }
                                                  }}
                                                  onClick={(e) => {
                                                       try {
                                                            e.target.showPicker()
                                                       } catch (e) {
                                                            console.warn(e)
                                                       }
                                                  }}
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
                                             <Select
                                                  placeholder="Plant"
                                                  required
                                                  name="plant_id"
                                                  size="sm"
                                                  sx={{
                                                       width: "100%",
                                                       flexGrow: 1,
                                                  }}
                                             >
                                                  {
                                                       plants.map(plant => {
                                                            return (<Option key={plant.id} value={plant.id}>{plant.name}</Option>)
                                                       })
                                                  }
                                             </Select>
                                             <Input sx={{
                                                  width: "100%",
                                                  flexGrow: 1,
                                             }} placeholder="Scheme" size="sm" type="text" name="scheme_type" required />
                                             <Input sx={{
                                                  width: "100%",
                                                  flexGrow: 1,
                                             }}
                                                  value={
                                                       scheme_rate
                                                  }
                                                  onChange={(e) => {
                                                       const value = e.target.value;
                                                       const s = value.split('');
                                                       let n = '';
                                                       let dotCont = 0;
                                                       s.forEach(c => {
                                                            if (c === '.' || c === ',') {
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
                                                       setSchemeRate(n);
                                                  }}

                                                  placeholder="Scheme Rate" size="sm" type="number" name="scheme_rate" required
                                                  endDecorator={
                                                       <Chip
                                                            variant="outlined"
                                                            style={{
                                                                 fontWeight: "bold",
                                                                 backgroundColor: "#47474721",
                                                            }}>
                                                            ₹{totalScheme.toFixed(2)}
                                                       </Chip>
                                                  }
                                             />
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
                                                                                          {gaslistData.map(gas => {
                                                                                               if (gas.company_name === "GO GASS") return (<Option
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
                                                                                                    {`Total : ${parseInt((item.qty) * (gasListMap.get(item.gas_id).kg))} KG`}
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
                                                                                                    {`Total : ₹${((gasListMap.get(item.gas_id).kg) * item.qty * (item.rate)).toFixed(2)
                                                                                                         }`}
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
                                                                                               onChange={(e) => {
                                                                                                    console.log(item)
                                                                                                    if (item.qty <= e.target.value) {
                                                                                                         alert("Return qty should be less than qty")
                                                                                                         return
                                                                                                    }
                                                                                                    handleItemChange(index, 'return_cyl_qty', e.target.value)
                                                                                               }}
                                                                                               endDecorator={
                                                                                                    <Chip
                                                                                                         style={{

                                                                                                              fontWeight: "bold",
                                                                                                              backgroundColor: "#474747",
                                                                                                              color: "white",
                                                                                                         }}
                                                                                                    >
                                                                                                         {`Total : ${parseInt((item.return_cyl_qty) * (gasListMap.get(item.gas_id).kg) + "")} KG`}
                                                                                                    </Chip>
                                                                                               }
                                                                                          />
                                                                                          <Button
                                                                                               variant="outlined"
                                                                                               color="danger"

                                                                                               onClick={() => {
                                                                                                    const confirm = window.confirm("Are you sure you want to delete this item?");
                                                                                                    if (confirm) {
                                                                                                         removeItem(index);
                                                                                                    }
                                                                                               }}
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
                                                  >TCS&nbsp;:</span>
                                             </Box>
                                             <Input
                                                  placeholder="TCS"
                                                  type="number"
                                                  name="tcs"
                                                  required
                                                  value={tcs}
                                                  onChange={(e) => setTcs(e.target.value)}
                                                  endDecorator={
                                                       <Chip
                                                            variant="outlined"
                                                            style={{
                                                                 fontWeight: "bold",
                                                                 backgroundColor: "#47474721",
                                                            }}>
                                                            ₹{totalTcs.toFixed(2)}
                                                       </Chip>
                                                  }
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

                                                            fontWeight: "bold",
                                                       }}
                                                  >FOR&nbsp;:</span>
                                             </Box>
                                             <Input
                                                  placeholder="FOR"
                                                  type="number"
                                                  name="for_charges"
                                                  required
                                                  value={for_charges}
                                                  onChange={(e) => setFor_charges(e.target.value)}
                                                  endDecorator={
                                                       <Chip
                                                            variant="outlined"
                                                            style={{
                                                                 fontWeight: "bold",
                                                                 backgroundColor: "#47474721",
                                                            }}>
                                                            ₹{totalFor.toFixed(2)}
                                                       </Chip>
                                                  }
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

                                                            fontWeight: "bold",
                                                       }}
                                                  >Paid&nbsp;:</span>
                                             </Box>
                                             <Input
                                                  placeholder="Amt Pay"
                                                  type="number"
                                                  name="pay_amt"
                                                  required
                                                  value={paid_val}
                                                  onChange={(e) => {
                                                       setPaid_val(e.target.value)
                                                  }}
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
                                                            <th style={{ width: 1, borderWidth: 0 }} >Billing Amt</th>
                                                            <td style={{ borderWidth: 0, width: 1, }}>&nbsp;:&nbsp;</td>
                                                            <td style={{ borderWidth: 0 }}>
                                                                 <Stack
                                                                      direction="row"
                                                                      gap={1}
                                                                      alignItems={"center"}
                                                                 >
                                                                      <Tooltip
                                                                           placement="right"
                                                                           size="lg"
                                                                           color="success"
                                                                           arrow
                                                                           variant="outlined"
                                                                           title={`${totalAmt.toFixed(2)} + ${totalTcs.toFixed(2)} + ${totalFor.toFixed(2)} - ${totalScheme.toFixed(2)}`}
                                                                      >
                                                                           <span
                                                                                style={{
                                                                                     color: "green",
                                                                                     fontWeight: "bold",
                                                                                }}
                                                                           >{`₹${billing.toFixed(2)}`}</span>
                                                                      </Tooltip>
                                                                      {/* <span style={{
                                                                           color: "grey",
                                                                           fontSize: "12px",
                                                                      }}>({totalAmt.toFixed(2)} - {totalScheme.toFixed(2)} of Scheme)</span> */}
                                                                 </Stack>
                                                            </td>
                                                       </tr>
                                                       <tr>
                                                            <th style={{ width: 1, borderWidth: 0 }} >Ballance</th>
                                                            <td style={{ borderWidth: 0, width: 1, }}>&nbsp;:&nbsp;</td>
                                                            <td style={{ borderWidth: 0 }}>
                                                                 <Tooltip
                                                                      placement="right"
                                                                      size="lg"
                                                                      arrow
                                                                      variant="outlined"
                                                                      title={`${billing.toFixed(2)} - ${paid_val}`}
                                                                 >
                                                                      <span
                                                                           style={{
                                                                                fontWeight: "bold",
                                                                           }}
                                                                      >
                                                                           ₹{ballance.toFixed(2)}
                                                                      </span>
                                                                 </Tooltip>
                                                            </td>
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
               </Modal>
          </>
     );
}
function calculatePurchaseSummary(items, tcsRate, forChargePerItem, paid) {
     // Initialize totals
     let totalAmt = 0;
     let totalQty = 0;
     let totalKg = 0;
     let totalReturnQty = 0;
     let totalReturnKg = 0;

     // Array to store minimal calculations for each item
     const itemCalculations = [];

     // Loop through each item to calculate individual and total values
     items.forEach(item => {
          const { qty, kg, rate, return_cyl_qty } = item;

          // Calculate minimal item values
          const itemTotalKg = qty * kg;
          const itemTotalAmt = qty * rate;
          const itemReturnKg = return_cyl_qty * kg;

          // Add minimal item calculations to the array
          itemCalculations.push({
               itemTotalKg,
               itemTotalAmt,
               itemReturnKg
          });

          // Accumulate totals
          totalAmt += itemTotalAmt;
          totalQty += qty;
          totalKg += itemTotalKg;
          totalReturnQty += return_cyl_qty;
          totalReturnKg += itemReturnKg;
     });

     // Calculate TCS as a flat rate (e.g., 0.01 of total amount)
     const tcs = totalAmt * tcsRate;

     // Calculate FOR as a fixed charge per item
     const forCharge = items.length * forChargePerItem;

     // Calculate the final billing amount
     const billingAmt = totalAmt + tcs + forCharge;
     const balance = billingAmt - paid;

     // Return all calculations as an object
     return {
          itemCalculations, // Minimal calculations for each item
          totalAmt,
          totalQty,
          totalKg,
          totalReturnQty,
          totalReturnKg,
          tcs,
          forCharge,
          billingAmt,
          balance
     };
}
