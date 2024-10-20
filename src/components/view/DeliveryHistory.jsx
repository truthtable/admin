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
import { ImCross } from "react-icons/im";
import { addGasDelivery, deleteGasDelivery, gasDeliveriesIniState } from "../../redux/actions/gasDeliveryActions";
import { gasDeliverys } from "../../state/UpdateGasDelivery";
const headColor = "white";
export default function deliveryHistory() {
     const dispatch = useDispatch();
     const { deliveries, loading, updateSuccess } = useSelector((state) => state.deliverys);
     //console.log(updateSuccess);
     const allGasData = useSelector((state) => state.gas);
     const { userDataLoading, users, userDataError } = useSelector((state) => state.user);
     const gasDelivery = useSelector((state) => state.gasDelivery);
     console.log(gasDelivery);
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
          if (gasDelivery.gasDeliverysSucsess == true) {
               dispatch(gasDeliveriesIniState());
               dispatch(deliveriesIniState());
          }
     });
     if (allGasData.data === null || deliveries == null || deliveries.length == 0 || users == null || users.length == 0) {
          return <Box sx={{ height: "100%", width: "100%", backgroundColor: "white", borderRadius: "lg", overflow: "auto" }}>
               <LinearProgress color="primary" variant="soft" sx={{ backgroundColor: "transparent", m: .5, display: "block" }} />
          </Box>
     }
     let gasList = new Map();
     let deleveryGasEditUiGasList = [];
     allGasData.data.data.forEach((value) => {
          gasList.set(value.id, value)
          deleveryGasEditUiGasList.push(<Option key={value.id} value={value.id}>{value.company_name} - {value.kg}KG</Option>)
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

     const GasEditUi = ({ selectedGasList, customer, deliveryBoy, deleveryId }) => {
          const [edit, setEdit] = useState(false);
          const [editName, setEditName] = useState("");
          let glist = [];
          let tempGas = new Map();
          selectedGasList.forEach((gas) => {
               tempGas.set(gas.id, gas)
          })
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
               tempGas.set("new_" + gasData.size + 1, { id: "new_" + gasData.size + 1, is_empty: 0, quantity: 0, price: 0, gas_id: + gasId })
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
                              <List>
                                   {
                                        [...gasData.values()].map((data) => {
                                             return <ListItem key={data.id} sx={{ width: "100%" }}>
                                                  <ListItemContent sx={{ color: "black", fontWeight: "bold" }}>
                                                       {/* {gas.company_name} - {gas.kg}KG {data.quantity}Qty ₹{data.price} */}
                                                       <Stack direction="row" spacing={1} alignItems={"center"} >
                                                            <RadioGroup
                                                                 value={data.is_empty ?? 0} // Ensure a fallback value if data.is_empty is undefined
                                                                 name="radio-buttons-group"
                                                                 orientation="horizontal"
                                                                 required
                                                                 onChange={(event) => {
                                                                      handleSetGasData(data.id, "is_empty", event.target.value); // Update gasData with the selected value
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
                                                            <Input required={(data.is_empty == 0)} sx={{ width: "168px", visibility: (data.is_empty == 0) ? "visible" : "hidden" }} type="number" value={data.price} startDecorator={<span>Amt : </span>} onChange={(event) => {
                                                                 handleSetGasData(data.id, "price", event.target.value);
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
                         <Stack direction="row" gap={1} justifyContent={"flex-end"}>
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

                                   console.log(newGasDataNoIds)

                                   dispatch(
                                        //Delete
                                        deleteGasDelivery(deleteDeliveryGasIds),
                                   )
                                   dispatch(
                                        //Create
                                        addGasDelivery(newGasDataNoIds),
                                        //Update
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
                              <GasEditUi selectedGasList={delivery.gas_deliveries} customer={delivery.courier_boy.username} deliveryBoy={user.name} deleveryId={delivery.id} />
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
               <Box><LinearProgress color="primary" variant="soft" sx={{ backgroundColor: "transparent", m: .5, display: (loading || gasDelivery.loading) ? "block" : "none" }} /></Box>
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