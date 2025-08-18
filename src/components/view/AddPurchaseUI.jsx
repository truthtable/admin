/* eslint-disable react/prop-types */
import React from "react";
import {
     Box,
     Button,
     Card,
     CardContent,
     Chip,
     Container,
     Divider,
     FormControl,
     FormLabel,
     Input,
     LinearProgress,
     Modal,
     ModalClose,
     Option,
     Select,
     Sheet,
     Stack,
     Table,
     Tooltip,
     Typography
} from "@mui/joy";
import { useState } from "react";
import { CgAdd, CgTrash } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/purchaseOrderActions";
import { FaRegPlusSquare } from "react-icons/fa";
import { set } from "firebase/database";
import { Form } from "react-router-dom";
import { all } from "axios";
import { decimalFix } from "../../Tools";

export default function AddPurchaseUI({ gaslistData, plants }) {

     const dispatch = useDispatch();

     const [paid_val, setPaid_val] = useState(0);
     const [tcs, setTcs] = useState(0.01);
     const [for_charges, setFor_charges] = useState(0.01);
     const [scheme_rate, setSchemeRate] = useState(0);

     const [addPurchaseModel, setAddPurchaseModel] = useState(false);
     const [orderItems, setOrderItems] = useState([]);
     const [ncOrderItems, setNcOrderItems] = useState([]);
     //console.log(ncOrderItems);

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
     let defective_amount = 0

     orderItems.forEach(item => {
          totalQty += Number(item.qty)
          totalKg += Number(item.qty) * Number(gasListMap.get(item.gas_id).kg)
          totalAmt += Number(item.qty) * Number(gasListMap.get(item.gas_id).kg) * Number(item.rate)
          totalReturnQty += Number(item.return_cyl_qty)
          const gas = gasListMap.get(item.gas_id)
          const trkg = Number(item.return_cyl_qty) * Number(gas.kg)
          totalReturnKg += trkg
          defective_amount += (trkg * Number(item.rate))
     })

     ncOrderItems.forEach(item => {
          totalQty += Number(item.qty)
          totalKg += Number(item.qty) * Number(gasListMap.get(item.gas_id).kg)
          totalAmt += Number(item.qty) * Number(item.rate)
     })

     const totalScheme = (totalKg * scheme_rate)

     const totalTcs = tcs * totalAmt
     const totalFor = for_charges * totalKg

     const billing = totalAmt + totalTcs + totalFor - totalScheme - defective_amount

     ballance = billing - paid_val

     if (paid_val === undefined) {
          ballance = billing
     }

     //console.log({ totalQty, totalKg, totalReturnQty, totalReturnKg, totalAmt, totalScheme, billing, totalTcs, totalFor })

     const removeItem = (index, nc = false) => {
          let oi = orderItems
          if (nc) {
               oi = ncOrderItems
          }
          const updatedItems = oi.filter((_, i) => i !== index);
          if (nc) {
               setNcOrderItems(updatedItems);
          } else {
               setOrderItems(updatedItems);
          }
     };
     const handleItemChange = (index, field, value, nc = false) => {
          let oi = []
          if (nc) { oi = ncOrderItems }
          else { oi = orderItems }
          if (field === 'id' || field === 'gas_id') {
               const temp = oi.map((item, i) => {
                    if (i === index) {
                         return { ...item, [field]: value }
                    }
                    return item
               })
               if (nc) { setNcOrderItems(temp) }
               else { setOrderItems(temp) }
               return
          }
          try {
               const updatedItems = oi.map((item, i) => {
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
               if (nc) {
                    setNcOrderItems(updatedItems);
               } else {
                    setOrderItems(updatedItems);
               }
          } catch (e) {
               console.warn(e);
          }
     };
     const addEmptyItem = (nc = false) => {
          try {
               if (nc) {
                    const availableGas = gaslistData.find(gas =>
                         (gas.company_name === "GO GAS") &&
                         (ncOrderItems.find(item => item.gas_id === gas.id) == null)
                    );
                    const updatedItems = [...ncOrderItems, {
                         gas_id: availableGas.id,
                         qty: 0,
                         rate: 0,
                         return_cyl_qty: 0,
                         nc: nc
                    }];
                    setNcOrderItems(updatedItems);
               } else {
                    const availableGas = gaslistData.find(gas =>
                         (gas.company_name === "GO GAS") &&
                         (orderItems.find(item => item.gas_id === gas.id) == null)
                    );
                    const updatedItems = [...orderItems, {
                         gas_id: availableGas.id,
                         qty: 0,
                         rate: 0,
                         return_cyl_qty: 0,
                         nc: nc
                    }];
                    setOrderItems(updatedItems);
               }
          } catch (e) {
               console.warn(e);
               return;
          }
     };
     return (
          <>
               <Button
                    variant="solid"
                    size="sm"
                    className="bg-[#12467b]"
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
                    className="flex justify-center items-center"
               >
                    <Container
                         maxWidth="xl"
                    >
                         <Sheet
                              variant="outlined"
                              className="rounded-md p-3 shadow-lg max-h-screen overflow-auto"
                         >
                              <ModalClose variant="plain" className="m-1" />
                              <Typography
                                   component="h2"
                                   id="modal-title"
                                   level="h4"
                                   textColor="inherit"
                                   className="font-bold"
                              >
                                   Add Purchase
                              </Typography>
                              <LinearProgress className="my-1 w-full" sx={{
                                   display: "none",
                              }} />
                              <Divider className="my-1" />
                              <form
                                   onSubmit={(event) => {
                                        event.preventDefault();
                                        const formData = new FormData(event.currentTarget);
                                        const formJson = Object.fromEntries(formData.entries());
                                        formJson.scheme = scheme_rate;
                                        let allOrderItems = [...orderItems, ...ncOrderItems];
                                        formJson.purchase_order_items = allOrderItems;
                                        formData.tcs = tcs;
                                        formData.for_charges = for_charges;
                                        formData.defective_amount = defective_amount;
                                        console.log(formJson);
                                        dispatch(createOrder(formJson));
                                        setAddPurchaseModel(false);
                                   }}
                              >
                                   <Stack
                                        direction="column"
                                        gap={1}
                                        className="w-full rounded-md p-1 mt-1 bg-transparent text-black">
                                        <Stack
                                             direction="row"
                                             gap={1}
                                        >
                                             <FormControl className="w-full flex-grow">
                                                  <FormLabel>Date</FormLabel>
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
                                                       className="w-full flex-grow"
                                                  />
                                             </FormControl>
                                             <FormControl className="w-full flex-grow">
                                                  <FormLabel>Order No.</FormLabel>
                                                  <Input
                                                       placeholder="Order No."
                                                       type="text"
                                                       name="order_no"
                                                       size="sm"
                                                       required
                                                       className="w-full flex-grow"
                                                  />
                                             </FormControl>
                                             <FormControl className="w-full flex-grow">
                                                  <FormLabel>Plant</FormLabel>
                                                  <Select
                                                       placeholder="Plant"
                                                       required
                                                       name="plant_id"
                                                       size="sm"
                                                       className="w-full flex-grow"
                                                  >
                                                       {
                                                            plants.map(plant => {
                                                                 return (<Option key={plant.id} value={plant.id}>{plant.name}</Option>)
                                                            })
                                                       }
                                                  </Select>
                                             </FormControl>
                                             <FormControl className="w-full flex-grow">
                                                  <FormLabel>Scheme</FormLabel>
                                                  <Input className="w-full flex-grow" placeholder="Scheme" size="sm" type="text" name="scheme_type" required />
                                             </FormControl>
                                             <FormControl className="w-full flex-grow">
                                                  <FormLabel>Scheme Rate</FormLabel>
                                                  <Input className="w-full flex-grow"
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
                                                                 className="font-bold bg-gray-100"
                                                            >
                                                                 ₹{totalScheme.toFixed(2)}
                                                            </Chip>
                                                       }
                                                  />
                                             </FormControl>
                                        </Stack>
                                        <Card>
                                             <CardContent
                                                  className="flex"
                                             >
                                                  <Table
                                                       className="w-full flex-grow table-fixed font-bold text-right"
                                                       size="md"
                                                  >
                                                       <thead>
                                                            <tr>
                                                                 <th style={noOutlineHead}>
                                                                      <span className="font-bold" > Cyl.</span>
                                                                 </th>
                                                                 <th style={noOutlineHead}>
                                                                      <span
                                                                           className="font-bold"
                                                                      > </span>
                                                                 </th>
                                                                 <th style={noOutlineHead}>
                                                                      <span
                                                                           className="font-bold"
                                                                      > Qty.</span>
                                                                 </th>
                                                                 <th style={{ ...noOutlineHead, textAlign: "end" }}>
                                                                      <span className="font-bold"
                                                                      >Total Kg</span>
                                                                 </th>
                                                                 <th style={noOutlineHead}>
                                                                      <span
                                                                           className="font-bold"
                                                                      >Rate</span>
                                                                 </th>
                                                                 <th style={{ ...noOutlineHead, textAlign: "end" }}>
                                                                      <span
                                                                           className="font-bold"
                                                                      >Total Amt</span>
                                                                 </th>

                                                                 <th style={noOutlineHead}>
                                                                      <span
                                                                           className="font-bold"
                                                                      >Return Cyl. Qty.</span>
                                                                 </th>
                                                                 <th style={{ ...noOutlineHead, textAlign: "center" }}>Total</th>

                                                            </tr>

                                                       </thead>
                                                       <tbody>
                                                            {orderItems.map((item, index) => (
                                                                 <OrderItemRow
                                                                      key={`order-item-${item.id}-${index}`}
                                                                      item={item}
                                                                      index={index}
                                                                      gaslistData={gaslistData}
                                                                      gasListMap={gasListMap}
                                                                      orderItems={orderItems}
                                                                      handleItemChange={handleItemChange}
                                                                      removeItem={removeItem}
                                                                      noOutline={noOutline}
                                                                      nc={false}
                                                                 />
                                                            ))}
                                                            {
                                                                 ncOrderItems.length > 0 && <tr>
                                                                      <td style={{ ...noOutline }} colSpan={3}>
                                                                           <Divider className="my-1" />
                                                                      </td>
                                                                      <td style={{ ...noOutline, textAlign: "center" }} colSpan={2}>
                                                                           New Connection
                                                                      </td>
                                                                      <td style={{ ...noOutline }} colSpan={3}>
                                                                           <Divider className="my-1" />
                                                                      </td>
                                                                 </tr>
                                                            }
                                                            {ncOrderItems.map((item, index) => (
                                                                 <OrderItemRow
                                                                      key={`order-nc-item-${item.id}-${index}`}
                                                                      item={item}
                                                                      index={index}
                                                                      gaslistData={gaslistData}
                                                                      gasListMap={gasListMap}
                                                                      orderItems={ncOrderItems}
                                                                      handleItemChange={handleItemChange}
                                                                      removeItem={removeItem}
                                                                      noOutline={noOutline}
                                                                      nc={true}
                                                                 />
                                                            ))}
                                                            <tr>
                                                                 <td style={noOutline} colSpan={8}>
                                                                      <Stack
                                                                           direction="row"
                                                                           gap={1}
                                                                           className="w-full"
                                                                           alignContent={"end"}
                                                                           justifyContent={"end"}
                                                                      >
                                                                           <Button
                                                                                startDecorator={
                                                                                     <FaRegPlusSquare />
                                                                                }
                                                                                variant="soft"
                                                                                color="success"
                                                                                className="mt-1 w-40"
                                                                                onClick={() => addEmptyItem(true)}
                                                                           >
                                                                                Add NC
                                                                           </Button>
                                                                           <Button
                                                                                startDecorator={
                                                                                     <FaRegPlusSquare />
                                                                                }
                                                                                variant="soft"
                                                                                className="mt-1 w-40"
                                                                                onClick={() => addEmptyItem()}
                                                                           >
                                                                                Add
                                                                           </Button>
                                                                      </Stack>
                                                                 </td>
                                                            </tr>
                                                            <tr>
                                                            </tr>
                                                       </tbody>
                                                  </Table>
                                             </CardContent>
                                        </Card>
                                        <Stack
                                             direction="row"
                                             gap={1}
                                             className="items-center"
                                        >
                                             <Box className="flex items-center justify-center">
                                                  <span
                                                       className="font-bold"
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
                                                            className="font-bold bg-gray-100"
                                                       >
                                                            <span className="font-bold">₹{totalTcs.toFixed(2)}</span>
                                                       </Chip>
                                                  }
                                             />
                                             <Divider orientation="vertical" />
                                             <Box
                                                  className="flex items-center justify-center"
                                             >
                                                  <span
                                                       className="font-bold"
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
                                                            className="font-bold bg-gray-100"
                                                       >
                                                            <span className="font-bold">₹{totalFor.toFixed(2)}</span>
                                                       </Chip>
                                                  }
                                             />
                                             <Divider orientation="vertical" />
                                             {/* <Box
                                                  className="flex items-center justify-center"
                                             >
                                                  <span
                                                       className="font-bold"
                                                  >Defective Amount&nbsp;:</span>
                                             </Box>
                                             <Input
                                                  placeholder="Defective Pay"
                                                  type="number"
                                                  name="defective_amount"
                                                  required
                                                  value={defective_amount}
                                                  onChange={(e) => {
                                                       setDefectiveAmount(
                                                            e.target.value
                                                       )
                                                  }}
                                             /> */}
                                             <Box
                                                  className="flex items-center justify-center"
                                             >
                                                  <span
                                                       className="font-bold"
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
                                        <Divider className="my-1" />
                                        <Stack direction="row">
                                             <table
                                                  style={{
                                                       tableLayout: "auto",
                                                       textAlign: "end",
                                                       backgroundColor: "white",
                                                  }}
                                             >
                                                  <tbody
                                                       style={{
                                                            textAlign: "end",
                                                            backgroundColor: "white",
                                                       }}
                                                  >
                                                       <tr>
                                                            <th className="border-0 bg-white p-0 m-0">Billing Amt</th>
                                                            <td className="border-0 bg-white  p-0 m-0 w-1">&nbsp;:&nbsp;</td>
                                                            <td className="border-0 bg-white  p-0 m-0">
                                                                 <Stack
                                                                      direction="row"
                                                                      gap={1}
                                                                      className="items-center"
                                                                 >
                                                                      <Tooltip
                                                                           placement="right"
                                                                           size="lg"
                                                                           color="success"
                                                                           arrow
                                                                           variant="outlined"
                                                                           title={`${totalAmt.toFixed(2)} + ${totalTcs.toFixed(2)} + ${totalFor.toFixed(2)} - ${totalScheme.toFixed(2)} - ${defective_amount}`}
                                                                      >
                                                                           <span
                                                                                className="text-green-600 font-bold"
                                                                           >{`₹${billing.toFixed(2)}`}</span>
                                                                      </Tooltip>
                                                                      {/* <span className="text-gray-500 text-xs">({totalAmt.toFixed(2)} - {totalScheme.toFixed(2)} of Scheme)</span> */}
                                                                 </Stack>
                                                            </td>
                                                       </tr>
                                                       <tr>
                                                            <th className="border-0 bg-white  p-0 m-0 w-40">Balance</th>
                                                            <td className="border-0 bg-white  p-0 m-0 w-1">&nbsp;:&nbsp;</td>
                                                            <td className="border-0 bg-white  p-0 m-0">
                                                                 <Tooltip
                                                                      placement="right"
                                                                      size="lg"
                                                                      arrow
                                                                      variant="outlined"
                                                                      title={`${billing.toFixed(2)} - ${paid_val}`}
                                                                 >
                                                                      <span className="font-bold">
                                                                           ₹{ballance.toFixed(2)}
                                                                      </span>
                                                                 </Tooltip>
                                                            </td>
                                                       </tr>
                                                       <tr>
                                                            <th className="border-0 bg-white  p-0 m-0  w-40">Total Qty</th>
                                                            <td className="border-0 bg-white  p-0 m-0 w-1">&nbsp;:&nbsp;</td>
                                                            <td className="border-0 bg-white  p-0 m-0 font-bold">{totalQty}</td>
                                                       </tr>
                                                       <tr>
                                                            <th className="border-0 bg-white  p-0 m-0  w-40">Total Kg</th>
                                                            <td className="border-0 bg-white  p-0 m-0 w-1">&nbsp;:&nbsp;</td>
                                                            <td className="border-0 bg-white  p-0 m-0 font-bold">{totalKg}</td>
                                                       </tr>
                                                       <tr>
                                                            <th className="border-0 bg-white  p-0 m-0  w-40">Total Return Qty</th>
                                                            <td className="border-0 bg-white  p-0 m-0 w-1">&nbsp;:&nbsp;</td>
                                                            <td className="border-0 bg-white  p-0 m-0 font-bold">{totalReturnQty}</td>
                                                       </tr>
                                                       <tr>
                                                            <th className="border-0 bg-white  p-0 m-0  w-40">Total Return Kg</th>
                                                            <td className="border-0 bg-white  p-0 m-0 w-1">&nbsp;:&nbsp;</td>
                                                            <td className="border-0 bg-white  p-0 m-0 font-bold">{totalReturnKg}</td>
                                                       </tr>
                                                  </tbody>
                                             </table>
                                             <span className="flex-grow"></span>
                                             <Box
                                                  className="flex place-items-end"
                                             >
                                                  <Button
                                                       variant="outlined"
                                                       onClick={() => setAddPurchaseModel(false)}
                                                  >
                                                       Cancel
                                                  </Button>
                                                  <span
                                                       className="w-2.5"
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

function OrderItemRow({
     item,
     index,
     gaslistData,
     gasListMap,
     orderItems,
     handleItemChange,
     removeItem,
     noOutline,
     nc
}) {
     let totalAmt = 0
     let totalKg = 0
     let totalReturnKg = 0
     const gas = gasListMap.get(item.gas_id)
     totalKg = (item.qty) * (gas.kg)
     totalReturnKg = (item.return_cyl_qty) * (gas.kg)
     if (nc) {
          totalAmt = item.qty * item.rate
     } else {
          totalAmt = item.qty * gas.kg * item.rate
     }

     const handleGasChange = (newValue) => {
          let ok = true;
          if (orderItems.find(item => item.gas_id === newValue) != null) {
               alert("Gas already added");
               ok = false;
               return;
          }
          if (ok) {
               handleItemChange(index, 'gas_id', newValue, nc);
          }
     }

     const gasList = gaslistData.map(gas => {
          if (gas.company_name === "GO GAS") return (
               <Option
                    key={gas.id}
                    value={gas.id}
                    label={`${gas.company_name} : ${gas.kg} KG`}
                    className="bg-transparent text-black"
               >
                    {`${gas.company_name} : ${gas.kg} KG`}
               </Option>
          );
     })

     return (
          <tr key={`order-${nc ? 'nc-' : ''}item-${item.id}-${index}`}>
               <td style={{ borderWidth: 0 }} colSpan={2}>
                    <Select
                         color="neutral"
                         placeholder="select Gas"
                         size="sm"
                         variant="outlined"
                         name="gas_id"
                         required
                         className="flex-grow w-full"
                         //defaultValue={item.gas_id}
                         value={item.gas_id}
                         onChange={(event, newValue) => {
                              handleGasChange(newValue);
                         }}
                    >
                         {gasList}
                    </Select>
               </td>
               <td colSpan={2} style={noOutline}>
                    <Input
                         placeholder="Quantity"
                         type="text"
                         name="qty"
                         size="sm"
                         className="flex-grow w-full"
                         required
                         value={item.qty}
                         onChange={(e) => handleItemChange(index, 'qty', e.target.value, nc)}
                         endDecorator={
                              <Chip className="font-bold bg-gray-700 text-white">
                                   <span className="font-bold">{`Total : ${totalKg} KG`}</span>
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
                         className="flex-grow w-full"
                         required
                         endDecorator={
                              <Chip className="font-bold bg-green-700 text-white">
                                   <span className="font-bold"> {`Total : ₹${totalAmt.toFixed(2)}`}</span>
                              </Chip>
                         }
                         value={item.rate}
                         onChange={(e) => handleItemChange(index, 'rate', e.target.value, nc)}
                    />
               </td>
               <td colSpan={2} style={noOutline}>
                    <Stack direction="row" gap={1}>
                         {
                              (!nc ? <Input
                                   placeholder="Return Qty"
                                   type="text"
                                   name="return_cyl_qty"
                                   size="sm"
                                   className="flex-grow"
                                   required
                                   value={item.return_cyl_qty}
                                   onChange={(e) => {
                                        console.log(item.qty, e.target.value);
                                        if (item.qty < e.target.value) {
                                             alert("Return qty should be less than qty");
                                             return;
                                        }
                                        handleItemChange(index, 'return_cyl_qty', e.target.value, nc);
                                   }}
                                   endDecorator={
                                        <Chip className="font-bold bg-gray-700 text-white">
                                             <span className="font-bold">{`Total : ${totalReturnKg} KG | Amt : ${decimalFix(totalReturnKg * item.rate, true)}`}</span>
                                        </Chip>
                                   }
                              /> : <></>)
                         }
                         <Button
                              variant="outlined"
                              color="danger"
                              onClick={() => {
                                   const confirm = window.confirm("Are you sure you want to delete this item?");
                                   if (confirm) {
                                        removeItem(index, nc);
                                   }
                              }}
                         >
                              <CgTrash />
                         </Button>
                    </Stack>
               </td>
          </tr>
     );
}