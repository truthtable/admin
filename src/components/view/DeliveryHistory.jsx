/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Box, Chip, Divider, LinearProgress, Select, Stack, Tab, Table, TabList, TabPanel, Tabs, Option, Button, Modal, Sheet, ModalClose, Typography, Input, List, ListItem, ListItemButton, ListItemDecorator, ListItemContent, FormControl, FormLabel, RadioGroup, Radio } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { deleteDeliveryById, deliveriesIniState, fetchDeliveries, updateDelivery } from "../../redux/actions/deliveryActions";
import { fetchGasData } from "../../state/GasList";
import { fetchUser, fetchUserRequest } from "../../redux/actions/userActions";
import { RxFontStyle } from "react-icons/rx";
import { FcHighPriority } from "react-icons/fc";
import { CgClose, CgUser } from "react-icons/cg";
import { MdDone, MdEdit, MdKeyboardArrowRight } from "react-icons/md";
import { IoMdClose, IoMdDoneAll } from "react-icons/io";
import { TbCylinder } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { addGasDelivery, deleteGasDelivery, gasDeliveriesIniState, updateGasDelivery } from "../../redux/actions/gasDeliveryActions";
import { set } from "firebase/database";
import { RiDeleteBinFill } from "react-icons/ri";
import gasServices from "../../services/gas-services.jsx";
import { Paper } from "@mui/material";
const headColor = "white";
export default function deliveryHistory() {
     const dispatch = useDispatch();
     const { deliveries, loading, updateSuccess, error } = useSelector((state) => state.deliverys);
     console.log(deliveries);
     const allGasData = useSelector((state) => state.gas);
     const { userDataLoading, users, userDataError } = useSelector((state) => state.user);
     const gasDelivery = useSelector((state) => state.gasDelivery);
     //console.log(gasDelivery);

     const formatDateToYYYYMMDD = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
     };
     //cuurent month start date
     const [dateStart, setDateStart] = useState(
          formatDateToYYYYMMDD(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
     );
     //cuurent month end date
     const [dateEnd, setDateEnd] = useState(
          formatDateToYYYYMMDD(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0))
     );
     //
     const currentUrl = window.location.href;
     const hashIndex = currentUrl.indexOf('#');
     const hashPart = currentUrl.substring(hashIndex + 1);
     const url = new URL(hashPart, window.location.origin);
     const searchParams = new URLSearchParams(url.search);
     const urlCustomerId = searchParams.get('customer_id');
     const urlCourierBoyId = searchParams.get('courier_boy_id');
     // console.log(urlCustomerId, urlCourierBoyId);
     //
     const [customerId, setCustomerId] = useState(urlCustomerId ? Number(urlCustomerId) : null);
     const [deliverBoyId, setDeliverBoyId] = useState(urlCourierBoyId ? Number(urlCourierBoyId) : null);

     //console.log({ dateStart, dateEnd, customerId, deliverBoyId });

     //console.log(deliverBoyId)

     const fetchDeliveriesData = (cid = customerId, did = deliverBoyId) => {
          dispatch(fetchDeliveries({ dateStart: dateStart, dateEnd: dateEnd, customer_id: cid, courier_boy_id: did }));
     }

     useEffect(() => {
          const networkCall = () => {
               if (
                    !error
                    && !loading
                    && !allGasData.isLoading
                    && !userDataLoading
                    && (deliveries == null || deliveries.length === 0)
               ) {
                    console.log("fetchDeliveries...");
                    fetchDeliveriesData();

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
               if (
                    !userDataError
                    && !userDataLoading
                    && !allGasData.isLoading
                    && !loading
                    && (users == null || users.length === 0)
               ) {
                    console.log("fetchUser...");
                    dispatch(fetchUser());
               }
          }
          networkCall();
     }, [dispatch, deliveries, allGasData, users, loading, userDataLoading, error, userDataError, deliverBoyId, dateStart, dateEnd]);
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

     useEffect(() => {
          gasServices.listenDataChange(() => {
               if (
                    !loading
               ) {
                    console.log("fetchDeliveries...");
                    fetchDeliveriesData();

               }
          });
     }, []);

     // console.log({
     //      userError: userDataError,
     //      gasDataError: allGasData.isError,
     //      deliveriesError: error
     // })

     if (userDataError || allGasData.isError || error) {
          return <Box
               sx={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "lg",
                    overflow: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
               }}
          >
               <Stack>
                    <Typography
                         sx={{
                              color: "#FF6600",
                              fontWeight: "bold",
                         }}
                    >
                         Problem In Server please try again later
                    </Typography>
                    <Button
                         onClick={() => {
                              dispatch(fetchUserRequest());
                              dispatch(fetchGasData());
                              dispatch(fetchDeliveries());
                         }}
                         sx={{
                              color: "white",
                              backgroundColor: "#FF6600",
                              fontWeight: "bold",
                         }}
                    >
                         Retry
                    </Button>
               </Stack>
          </Box>
     }

     let customers = [];
     let deliveryBoys = [];
     const usersMap = new Map();

     if (users != null) {
          users.forEach((user) => {
               usersMap.set(user.id, user)
               if (user.courier_boys.length > 0) {
                    deliveryBoys.push(user.courier_boys[0])
               }
               if (user.customers.length > 0) {
                    customers.push(user.customers[0])
               }
          })
     }

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
               return <Button size="sm" variant="outlined" sx={{ color: "black", backgroundColor: "transparent", width: "100%", fontWeight: "bold", outlineColor: "transparent", borderWidth: "0px" }}
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
               return <Button size="sm" variant="outlined" sx={{ color: "black", backgroundColor: "transparent", width: "100%", fontWeight: "bold", outlineColor: "transparent", borderWidth: "0px" }}
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

     const GasEditUi = ({ selectedGasList, customer, deliveryBoy, deleveryId, receivedAmount, paymentMethod }) => {
          const [received_amount, setReceivedAmount] = useState(receivedAmount);
          const [payment_method, setPaymentMethod] = useState(paymentMethod);
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
               return <Chip size="sm" variant="outlined" color="danger" sx={{ borderRadius: "16px", fontWeight: "bold", fontStyle: "oblique" }}
                    onClick={() => {
                         setEdit(true);
                    }}
                    startDecorator={<MdEdit />}
               >Change</Chip>
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
                                   >Received Amount</Chip>
                                   <Input
                                        startDecorator={<span>₹</span>}
                                        type="number"
                                        value={received_amount}
                                        onChange={(event) => {
                                             setReceivedAmount(event.target.value)
                                        }}
                                        required
                                        sx={{
                                             maxWidth: "128px",
                                        }}
                                   />
                                   <Select defaultValue={payment_method}
                                        onChange={(event, value) => {
                                             setPaymentMethod(value)
                                        }}
                                   >
                                        <Option value={0}>Cash</Option>
                                        <Option value={1}>Online</Option>
                                   </Select>
                              </Stack>
                              <span className="b">&nbsp;Gas List</span>
                              <List
                                   sx={{
                                        backgroundColor: "#FFF1DB"
                                   }}
                              >
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

                                   console.log(updateGasData)

                                   dispatch(
                                        updateDelivery(
                                             {
                                                  id: deleveryId,
                                                  received_amount: received_amount,
                                                  payment_method: payment_method,
                                             }
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
                                   dispatch(
                                        //Update
                                        updateGasDelivery(updateGasData),
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
     const correctionsRowsIndex = [];
     const colspan = tableHead.length;
     try {
          deliveries.forEach(delivery => {
               let totalPrice = 0;
               const receivedAmount = delivery.received_amount;
               let totalRecievedQTY = 0;
               let totalPendingQTY = 0;
               const correction = (delivery.correction == 1)
               const user = usersList.get(delivery.customer.user_id)
               //console.log(delivery.id, delivery.gas_deliveries)
               //console.log(user);
               deliveryRows.push(<tr key={"delivery_" + delivery.id + "header"}>
                    <td colSpan={colspan} style={{
                         borderColor: "transparent",
                         height: "1px",
                    }}></td>
               </tr>)
               correction ? correctionsRowsIndex.push(deliveryRows.length) : null
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
                         <Stack
                              direction={"row"}
                              alignContent={"center"}
                         >
                              <span
                                   style={{
                                        //middle text
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "bold",
                                        fontStyle: "oblique",
                                        opacity: 0.8,
                                   }}
                              >
                                   {`Delivery No : ${delivery.id}`}
                              </span>
                              <Divider orientation="horizontal" sx={{ opacity: 0, flexGrow: 1 }} />
                              <GasEditUi selectedGasList={delivery.gas_deliveries} customer={delivery.courier_boy.username} deliveryBoy={user.name} deleveryId={delivery.id} receivedAmount={delivery.received_amount} paymentMethod={delivery.payment_method} />
                         </Stack>

                    </td>
               </tr>)
               correction ? correctionsRowsIndex.push(deliveryRows.length) : null
               delivery.gas_deliveries.forEach(gasDeliverie => {
                    const delevered = gasDeliverie.is_empty == 0
                    if (delevered) {
                         totalPrice += gasDeliverie.quantity * gasDeliverie.price
                         totalRecievedQTY += gasDeliverie.quantity
                    } else {
                         totalPendingQTY += gasDeliverie.quantity
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
                                   <Stack direction="row">
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
                                   <Select size="sm" defaultValue={correction ? "Mistake" : "No"} endDecorator={correction ? <FcHighPriority /> : null}
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
                    correction ? correctionsRowsIndex.push(deliveryRows.length) : null
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
                                             color: !delivery.cleared ? "#185ea5" : "white",
                                             backgroundColor: !delivery.cleared ? "transparent" : "#0a6847",
                                             borderRadius: "md",
                                             "&:hover": {
                                                  backgroundColor: "#12467b7a",
                                                  color: "white",
                                             },
                                        }}
                                        onClick={() => {
                                             const doOpraton = prompt(`Type Deliviry No.: ${delivery.id} to ${delivery.cleared ? "Unclear" : "Clear"}`, "");
                                             if (Number(doOpraton) == Number(delivery.id)) {
                                                  dispatch(updateDelivery({ id: delivery.id, cleared: !delivery.cleared }))
                                             } else {
                                                  alert("Invalid Deliviry No.")
                                             }
                                        }}
                                   > {
                                             !delivery.cleared ? <><IoMdDoneAll />&nbsp;Mark Cleared</> : <><IoMdDoneAll />&nbsp;Cleared</>
                                        }
                                   </Box>
                                   <Divider orientation="horizontal" sx={{ flexGrow: 1, opacity: 0 }} />
                                   <Box>{`Total Received QTY : ${totalPendingQTY}`}</Box>
                                   <Divider orientation="vertical" />
                                   <Box>{`Total Pending QTY : ${totalRecievedQTY - totalPendingQTY}`}</Box>
                                   <Divider orientation="vertical" />
                                   <Box>{`Total : ${totalPrice}`}</Box>
                                   <Divider orientation="vertical" />
                                   <Box >
                                        {`Received : ₹${receivedAmount.toFixed(2)}`}
                                   </Box>
                                   <Divider orientation="vertical" />
                                   <Box >
                                        {/* {`${delivery.payment_method == 0 ? "Cash" : "Online"}`} */}
                                        <PaymetsModal />
                                   </Box>
                                   <Divider orientation="vertical" />
                                   <Box >
                                        {`Remaining : ₹${(totalPrice - receivedAmount).toFixed(2)}`}
                                   </Box>
                              </Stack>
                         </td>
                    </tr>
               )
               correction ? correctionsRowsIndex.push(deliveryRows.length) : null
          });
     } catch (e) {
          console.log(deliveries)
          deliveryRows = <tr>
               <td colSpan={tableHead.length} style={{ textAlign: "center", fontWeight: "bold" }}>No Data</td>
          </tr>

     }
     const tableHeadRow = tableHead.map((head, index) => {
          return <th style={{ fontWeight: "bold", backgroundColor: headColor, }} key={index}>
               {head}
          </th>
     })
     return <Box sx={{ height: "100%", width: "100%", backgroundColor: "white", borderRadius: "lg", overflow: "auto", px: 1 }}>
          {/*Filtering the deliveries */}
          <form>
               <Stack direction="row" spacing={1} alignItems="center" sx={{ m: .6 }}>
                    <Divider sx={{ opacity: 0, flexGrow: 1 }} />
                    <span
                         style={{ fontWeight: "bold", fontStyle: "oblique" }}
                    >From :</span>
                    <FormControl>
                         <Input
                              type="date"
                              defaultValue={dateStart}
                              onChange={(event) => {
                                   // Handle date start change
                                   // setParamsUpdate(true);
                                   // dateStart = event.target.value;
                                   setDateStart(event.target.value);
                                   fetchDeliveriesData(customerId, deliverBoyId);
                              }}
                         />
                    </FormControl>
                    <span
                         style={{ fontWeight: "bold", fontStyle: "oblique" }}
                    >To :</span>
                    <FormControl>
                         <Input
                              type="date"
                              defaultValue={dateEnd}
                              onChange={(event) => {
                                   // Handle date end change
                                   // setParamsUpdate(true);
                                   //dateEnd = event.target.value
                                   setDateEnd(event.target.value);
                                   fetchDeliveriesData(customerId, deliverBoyId);
                              }}
                         />
                    </FormControl>
                    <span
                         style={{ fontWeight: "bold", fontStyle: "oblique" }}
                    >Customer :</span>
                    <FormControl>
                         <Select
                              defaultValue={customerId ? customerId : "null"}
                              onChange={(event, value) => {
                                   console.log(value)
                                   // Handle customer change
                                   let temp = (value === "null") ? null : value;
                                   //clear url params
                                   let url = new URL(window.location.href);
                                   url.searchParams.delete('customer_id');
                                   window.history.pushState({}, '', url);
                                   setCustomerId(temp)
                                   fetchDeliveriesData(temp, deliverBoyId);
                                   //dispatch(deliveriesIniState());
                              }}
                         >
                              <Option value={"null"}>All Customers</Option>
                              {/* {users.map((user) => (
                                   <Option key={user.id} value={user.id}>
                                        {user.name}
                                   </Option>
                              ))} */}
                              {
                                   customers.map((user) => {
                                        {
                                             const data = usersMap.get(user.user_id)
                                             //console.log(user, data)
                                             return <Option key={user.id} value={user.id}>
                                                  {data.name}
                                             </Option>
                                        }
                                        // <Option key={usersMap.get(user.user_id)} value={usersMap.get(user.user_id)}>
                                        //      {usersMap.get(user.user_id).name}
                                        // </Option>
                                   })
                              }
                         </Select>
                    </FormControl>
                    <span
                         style={{ fontWeight: "bold", fontStyle: "oblique" }}
                    >Delivery Boy :</span>
                    <FormControl>
                         <Select
                              defaultValue={deliverBoyId ? deliverBoyId : "null"}
                              onChange={(event, value) => {
                                   // Handle delivery boy change
                                   let temp = (value === "null") ? null : value;
                                   setDeliverBoyId(temp)
                                   fetchDeliveriesData(customerId, temp);
                              }}
                         >
                              <Option value={"null"}>All Delivery Boys</Option>
                              {deliveryBoys.map((user) => (
                                   <Option key={user.id} value={user.id}>
                                        {user.username}
                                   </Option>
                              ))}
                         </Select>
                    </FormControl>
               </Stack>
          </form>
          <Divider sx={{ my: 1 }} />
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
                         </Tab>
                    </TabList>
                    <TabPanel sx={{ p: 0, m: 0, backgroundColor: "white" }} value={0}>
                         <TableUI head={
                              <tr>
                                   {tableHeadRow}
                              </tr>
                         } body={deliveryRows} />
                    </TabPanel>
                    <TabPanel sx={{ p: 0, m: 0 }} value={1}>
                         <TableUI head={
                              <tr>
                                   {tableHeadRow}
                              </tr>
                         } body={
                              correctionsRowsIndex.map(
                                   (index) => {
                                        return deliveryRows[index]
                                   }
                              )
                         } />
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
          size="md"
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

const PaymetsModal = () => {
     const [open, setOpen] = useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
     return (
          <>
               <Button
                    variant="soft"
                    size="sm"
                    color="success"
                    onClick={handleOpen}
               >Payments</Button>
               <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                         display: 'flex',
                         justifyContent: 'center',
                         alignItems: 'center',
                         flexDirection: 'column',
                    }}
               >
                    <Sheet
                         sx={{
                              borderRadius: 'md',
                              p: 3,
                              boxShadow: 'lg',
                              maxHeight: '90vh',
                         }}
                    >
                         <Stack direction="column" spacing={1} alignItems="center" sx={{ m: .6 }}>
                              <Stack direction="row" spacing={1} alignItems="center" sx={{ m: .6 }}>
                                   <span
                                        style={{ fontWeight: "bold" }}
                                   >Customer Paymets</span>
                                   <Button
                                        variant="soft"
                                        size="sm"
                                        color="danger"
                                        onClick={handleClose}
                                   >
                                        <CgClose />
                                   </Button>
                              </Stack>

                         </Stack>
                    </Sheet>
               </Modal>
          </>
     )
}