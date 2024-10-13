/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Box, Chip, Divider, LinearProgress, Select, Stack, Tab, Table, TabList, TabPanel, Tabs, Option, Button, Modal, Sheet, ModalClose, Typography, Input, List, ListItem, ListItemButton, ListItemDecorator, ListItemContent, FormControl, FormLabel, RadioGroup, Radio } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { deliveriesIniState, fetchDeliveries, updateDelivery } from "../../redux/actions/deliveryActions";
import { fetchGasData } from "../../state/GasList";
import { fetchUser, fetchUserRequest } from "../../redux/actions/userActions";
import { RxFontStyle } from "react-icons/rx";
import { FcHighPriority } from "react-icons/fc";
import { CgUser } from "react-icons/cg";
import { MdDone, MdEdit, MdKeyboardArrowRight } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { TbCylinder } from "react-icons/tb";
const headColor = "white";
export default function deliveryHistory() {
     const dispatch = useDispatch();
     const { deliveries, loading, updateSuccess } = useSelector((state) => state.deliverys);
     //console.log(updateSuccess);
     const allGasData = useSelector((state) => state.gas);
     const { userDataLoading, users, userDataError } = useSelector((state) => state.user);
     useEffect(() => {
          if (deliveries == null || deliveries.length == 0) {
               dispatch(fetchDeliveries());
          }
          if (allGasData.data == null || allGasData.data.data.length == 0) {
               dispatch(fetchGasData());
          }
          if (users == null || users.length == 0) {
               dispatch(fetchUser());
          }
     }, [dispatch, deliveries, allGasData, users]);
     useEffect(() => {
          if (updateSuccess == true) {
               dispatch(deliveriesIniState());
               console.log("updateSuccess");
          }
     });
     if (allGasData.data === null || deliveries == null || deliveries.length == 0 || users == null || users.length == 0) {
          return <Box sx={{ height: "100%", width: "100%", backgroundColor: "white", borderRadius: "lg", overflow: "auto" }}>
               <LinearProgress color="primary" variant="soft" sx={{ backgroundColor: "transparent", m: .5, display: "block" }} />
          </Box>
     }
     let gasList = new Map();
     allGasData.data.data.forEach((value) => {
          gasList.set(value.id, value)
     })
     let usersList = new Map();
     users.forEach((value) => {
          usersList.set(value.id, value)
     })

     const CostomerEditUI = ({ name, id }) => {
          const [edit, setEdit] = useState(false);
          const [editName, setEditName] = useState(name);
          //find matching user name
          const usersOptions = users.filter((user) => {
               return user.name.toLowerCase().includes(editName.toLowerCase())
          }).slice(0, 20);
          //only show 10 users at a time
          if (!edit) {
               return <Button variant="outlined" sx={{ color: "black", backgroundColor: "transparent", width: "100%", fontWeight: "bold", outlineColor: "transparent", borderWidth: "0px" }}
                    onClick={() => {
                         setEdit(true)
                    }}
               >
                    {name}
               </Button >
          }
          return <Modal
               aria-labelledby="modal-title"
               aria-describedby="modal-desc"
               open={edit}
               onClose={() => setEdit(false)}
               sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}
          >
               <Sheet
                    variant="outlined"
                    sx={{ borderRadius: 'md', p: 3, boxShadow: 'lg', mt: 10 }}
               >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                         component="h2"
                         id="modal-title"
                         level="h4"
                         textColor="inherit"
                         sx={{ fontWeight: 'lg', mb: 1 }}
                    >
                         Customer : {name}
                    </Typography>
                    <Box id="modal-desc" sx={{ width: "512px" }}>
                         <Input value={editName} onChange={(event) => { setEditName(event.target.value) }} placeholder="Enter Customer Name" />
                    </Box>
                    <Sheet sx={{
                         overflow: "auto",
                         maxHeight: "90vh",
                    }}>
                         <List>
                              {
                                   usersOptions.map((user) => {
                                        return <ListItem key={user.id}>
                                             <ListItemButton onClick={() => {
                                                  setEdit(true)
                                                  dispatch(updateDelivery({ id: id, customer_id: user.id }))
                                             }}>
                                                  <ListItemDecorator>
                                                       <CgUser />
                                                  </ListItemDecorator>
                                                  <ListItemContent sx={{ color: "black", fontWeight: "bold" }}>
                                                       {user.name} : {user.address}
                                                  </ListItemContent>
                                                  <ListItemDecorator>
                                                       <MdKeyboardArrowRight />
                                                  </ListItemDecorator>
                                             </ListItemButton>
                                        </ListItem>
                                   })
                              }
                         </List>
                    </Sheet>
               </Sheet>
          </Modal>
     }

     const NumberTextEditUi = ({ value, id, columnName }) => {
          const [edit, setEdit] = useState(false);
          const [editValue, setEditValue] = useState(value);
          if (!edit) {
               return <Button variant="outlined" sx={{ color: "black", backgroundColor: "transparent", width: "100%", fontWeight: "bold", outlineColor: "transparent", borderWidth: "0px" }}
                    onClick={() => {
                         setEdit(true)
                    }}
               >
                    {value}
               </Button>
          }
          return <Input value={editValue} type="number" placeholder={"Input Value"} onChange={(event) => { setEditValue(event.target.value) }} endDecorator={
               <Stack direction="row" spacing={1}>
                    <IoMdClose style={{ color: "white", backgroundColor: "#FF6600" }} onClick={() => { setEdit(false) }} />
                    <MdDone style={{ color: "white", backgroundColor: "green" }} onClick={() => {
                         setEdit(false);
                         console.log({ id: id, [columnName]: editValue });
                         dispatch(updateDelivery({ id: id, [columnName]: editValue, columnName: columnName }))
                    }} />
               </Stack>
          }
               sx={{
                    width: "100%",
               }}
          />
     }

     const GasEditUi = ({ selectedGasList, customer, deliveryBoy }) => {
          const [edit, setEdit] = useState(false);
          const [editName, setEditName] = useState("");
          let glist = [];
          for (const [index, gas] of gasList.entries()) {
               if ((gas.company_name.toLowerCase().includes(editName.toLowerCase()) && editName.length > 0)) {
                    glist.push(
                         <ListItem key={index}>
                              <ListItemButton onClick={() => {
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
               return <Button variant="outlined" sx={{ borderRadius: "16px", fontWeight: "bold", fontStyle: "oblique" }}
                    onClick={() => {
                         setEdit(true);
                    }}
                    startDecorator={<MdEdit />}
               >Change</Button>
          }
          return <Modal
               aria-labelledby="modal-title"
               aria-describedby="modal-desc"
               open={edit}
               onClose={() => setEdit(false)}
               sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', mb: 10 }}
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
                         <List>
                              {
                                   selectedGasList.map((gasData) => {
                                        const gas = gasList.get(gasData.gas_id)
                                        console.log(gasData)
                                        return <ListItem key={gasData.id} sx={{ width: "100%" }}>
                                             <ListItemContent sx={{ color: "black", fontWeight: "bold" }}>
                                                  {/* {gas.company_name} - {gas.kg}KG {gasData.quantity}Qty ₹{gasData.price} */}
                                                  <Stack direction="row" spacing={1} alignItems={"center"}>
                                                       <RadioGroup defaultValue="outlined" name="radio-buttons-group" orientation="horizontal">
                                                            <Radio value="1" label="Recived" variant="outlined" color="danger" />
                                                            <Radio value="0" label="Delivered" variant="outlined" color="success" />
                                                       </RadioGroup>
                                                       <Select sx={{ width: "220px", ml: 2 }} defaultValue={"1"} >
                                                            <Option value="1">GO GASS - 12KG</Option>
                                                            <Option value="2">2</Option>
                                                       </Select>
                                                       <Input sx={{ width: "168px" }} value={gasData.quantity} startDecorator={<span>Qty : </span>} />
                                                       {
                                                            (gasData.is_empty == 1) ? <Input sx={{ width: "168px" }} value={gasData.price} startDecorator={<span>Amt : </span>} /> : <></>
                                                       }
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
               </Sheet>
          </Modal>
     }

     let deliveryRows = [];
     const borderColor = "#26304369";
     const tdStyle = {
          fontWeight: "bold",
          wordBreak: "keep-all",
     }
     const sentGasCell = {
          backgroundColor: "#DEF9C4",
     }
     const receivedGasCell = {
          backgroundColor: "#EEEEEE",
     }
     const correctionCell = {
          backgroundColor: "#FFD2D2",
     }
     const tableHead = [
          "Entry",
          // "Update",
          "Delivery Boy",
          "Customer",
          "Address",
          "Gas",
          "Qty",
          "Rate",
          "Correction",
     ];
     const colspan = tableHead.length;
     deliveries.forEach(delivery => {
          let totalPrice = 0;
          const receivedAmount = delivery.received_amount;

          const correction = (delivery.correction == 1)
          const user = usersList.get(delivery.customer.user_id)
          //console.log(delivery)
          //console.log(user);
          deliveryRows.push(<tr key={"delivery_" + delivery.id + "header"}>
               <td colSpan={colspan} style={{
                    borderColor: "transparent",
                    height: "1px",
               }}></td>
          </tr>)
          deliveryRows.push(<tr key={"delivery_" + delivery.id + "header1"}>
               <td colSpan={colspan} style={{
                    borderColor: borderColor,
                    borderBottomColor: "transparent",
                    borderWidth: "1px",
                    borderTopRightRadius: "16px",
                    borderTopLeftRadius: "16px",
                    marginTop: "1px",
                    paddingLeft: "16px",
               }}>
                    {`Delivery No : ${delivery.id}`}
               </td>
          </tr>)
          delivery.gas_deliveries.forEach(gasDeliverie => {
               const delevered = gasDeliverie.is_empty == 0
               if (delevered) {
                    totalPrice += gasDeliverie.quantity * gasDeliverie.price
               }
               const gasStyle = delevered ? sentGasCell : receivedGasCell;
               const tdsx = correction ? { ...tdStyle, ...correctionCell, } : { ...tdStyle, };
               const gas = gasList.get(gasDeliverie.gas_id)
               //console.log(gasDeliverie)

               deliveryRows.push(
                    <tr key={"delivery_" + delivery.id + "_" + gasDeliverie.id}>
                         <td style={tdsx}>{formatDateTime(delivery.created_at)}</td>
                         {/* <td style={tdsx}>{formatDateTime(delivery.updated_at)}</td> */}
                         <td style={tdsx}>{delivery.courier_boy.username}</td>
                         <td style={tdsx}><CostomerEditUI name={user.name} id={delivery.id} /></td>
                         <td style={tdsx}>{user.address}</td>
                         <td style={{ ...tdsx, }}>
                              <Stack direction="row" spacing={1}>
                                   <Box
                                        sx={{
                                             flexGrow: 1,
                                        }}
                                   >{`${gas.company_name} - ${gas.kg}KG`}</Box>
                                   <Box
                                        sx={{
                                             color: "#FFF0D1",
                                             backgroundColor: delevered ? "#117554" : "#FF6600",
                                             py: .1,
                                             px: 1,
                                             m: 0,
                                             borderRadius: "xl",
                                             flexGrow: 1,
                                             maxWidth: "136px",
                                             fontWeight: "bold",
                                        }}
                                   >
                                        {delevered ? "Delivered" : "Recived"}
                                   </Box> </Stack>
                         </td>
                         <td style={{ ...tdsx }}>
                              <NumberTextEditUi value={gasDeliverie.quantity} id={gasDeliverie.id} columnName={"quantity"} />
                         </td>
                         <td style={{ ...tdsx, }}>
                              {
                                   //`₹${gasDeliverie.price}`
                                   delevered ? <NumberTextEditUi value={gasDeliverie.price} id={gasDeliverie.id} columnName={"price"} /> : "-"
                              }
                         </td>
                         <td style={tdsx}>
                              {/* {correction ? "Yes" : "No"} */}
                              <Select defaultValue={correction ? "Mistake" : "No"} endDecorator={correction ? <FcHighPriority /> : null}
                                   onChange={
                                        (event, value) => {
                                             //console.log(value)
                                             if (value === "Mistake") {
                                                  dispatch(updateDelivery({ id: delivery.id, correction: 1 }))
                                             }
                                             if (value === "No") {
                                                  dispatch(updateDelivery({ id: delivery.id, correction: 0 }))
                                             }
                                        }
                                   }
                                   sx={{
                                        color: correction ? "#C80036" : "black",
                                   }}
                              >
                                   <Option value="Mistake">Mistake</Option>
                                   <Option value="No">No</Option>
                              </Select>
                         </td>
                    </tr>
               )
          })
          deliveryRows.push(
               <tr key={"delivery_" + delivery.id + "total"}>
                    <td colSpan={colspan} style={{
                         borderColor: borderColor,
                         borderTopColor: "transparent",
                         borderWidth: "1px",
                         borderBottomRightRadius: "16px",
                         borderBottomLeftRadius: "16px",
                    }}>
                         <Stack sx={{ fontWeight: "bold", fontStyle: "oblique", pr: 1 }} direction="row" justifyContent="flex-end" justifyItems="flex-end" alignItems="center" spacing={1}>
                              <GasEditUi selectedGasList={delivery.gas_deliveries} customer={delivery.courier_boy.username} deliveryBoy={user.name} />
                              <Divider orientation="horizontal" sx={{ flexGrow: 1, opacity: 0 }} />
                              <Box>{`Total : ₹${totalPrice.toFixed(2)}`}</Box>
                              <Divider orientation="vertical" />
                              <Box >
                                   {`Received : ₹${receivedAmount.toFixed(2)}`}
                              </Box>
                              <Divider orientation="vertical" />
                              <Box >
                                   {`${delivery.payment_method == 0 ? "Cash" : "Online"}`}
                              </Box>
                              <Divider orientation="vertical" />
                              <Box >
                                   {`Remaining : ₹${(totalPrice - receivedAmount).toFixed(2)}`}
                              </Box>
                         </Stack>
                    </td>
               </tr>
          )
     });
     return <Box sx={{ height: "100%", width: "100%", backgroundColor: "white", borderRadius: "lg", overflow: "auto", px: 1 }}>
          <Stack
               sx={{
                    height: "100%",
                    width: "100%",
               }}
          >
               <Box><LinearProgress color="primary" variant="soft" sx={{ backgroundColor: "transparent", m: .5, display: loading ? "block" : "none" }} /></Box>
               <Tabs aria-label="Basic tabs" defaultValue={0} >
                    <TabList sx={{ backgroundColor: headColor, }}>
                         <Tab>All Deliveries</Tab>
                         <Tab>
                              Correction Deliveries
                              <Chip color="danger" variant="solid" size="sm">
                                   {0}
                              </Chip>
                         </Tab>
                    </TabList>
                    <TabPanel sx={{ p: 0, m: 0, backgroundColor: "white" }} value={0}>
                         <TableUI head={
                              <tr>
                                   {tableHead.map((head, index) => {
                                        return <th style={{ fontWeight: "bold", backgroundColor: headColor, }} key={index}>
                                             {head}
                                        </th>
                                   })}
                              </tr>
                         } body={deliveryRows} />
                    </TabPanel>
                    <TabPanel sx={{ p: 0, m: 0 }} value={1}>
                         <TableUI head={[]} body={[]} />
                    </TabPanel>
               </Tabs>
          </Stack>
     </Box>
}
const TableUI = ({ head, body }) => {
     return <Table
          sx={{
               tableLayout: "auto",
          }}
     >
          <thead>
               {head}
          </thead>
          <tbody>
               {body}
          </tbody>
     </Table>
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