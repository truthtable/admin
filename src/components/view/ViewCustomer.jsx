import React, { useEffect, useState } from "react";
import "../../crud/crud-css/read.css";
import { BsSearch, } from "react-icons/bs";
import gasDataService from "../../services/gas-services.jsx";
import DataTable from "../table/DataTable.jsx";
import {
     Box,
     Button,
     Input,
     Stack,
     Typography,
     Modal,
     ModalClose,
     Sheet,
     Container,
     Divider,
     Select,
     Option,
     LinearProgress,
     List,
     ListItem,
     ListItemButton,
     ListItemContent,
     Table,
     FormControl,
     FormLabel,
     Checkbox,
     Radio,
     RadioGroup
} from "@mui/joy";
import TableHead from "../table/TableHead.jsx";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "../../state/Customers.jsx";
import UpdateCustomerCell, { NUMBER, TEXT } from "../edit/UpdateCustomerCell.jsx";
import { notNull } from "../../helpers.jsx/Validation.jsx";
import { getLoginData, UPDATE_CUSTOMER, UPDATE_USER, URL } from "../../services/Api.jsx";

import { TbHomePlus } from "react-icons/tb";
import { fetchGas } from "../../redux/actions/gasAction.js";
import { CgClose, CgCross } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import gasServices from "../../services/gas-services.jsx";
import { formatDateTDDMMYY, urlDecodeAndParseJson } from "../../Tools.jsx";
import { FaInfoCircle } from "react-icons/fa";
import { use } from "react";
import {
     fetchConnectionByCustomerId,
     resetConnection
} from '../../redux/connectionSlice.js'
import { set } from "firebase/database";
let CUSTOMERS = [];
const ViewCustomer = () => {

     const dispatch = useDispatch();
     const customerData = useSelector((state) => state.customers);
     const updateCustomer = useSelector((state) => state.updateCustomer);

     const { gasLoading, gasList, gasError } = useSelector((state) => state.gasList);
     //console.log({gasLoading, gasList, gasError})

     const [searchText, setSearchText] = useState("");

     const [customerDetailsModel, setCustomerDetailsModel] = useState(false);

     const BALANCE_SORT = "balance";
     const CUSTOMER_NAME_SORT = "customer_name";
     const ADDRESS_SORT = "address";
     const [sortBy, setSortBy] = useState(BALANCE_SORT);

     let [selectedCustomer, setSelectedCustomer] = useState(null);
     const connection = useSelector((state) => state.connections);
     let xcombineData = null
     const loadConnection = (id) => {
          //console.log(id)
          const customer = xcombineData.find((user) => user.id == id)
          setSelectedCustomer(customer)
          setCustomerDetailsModel(true);
          dispatch(resetConnection());
          //dispatch(fetchConnectionByCustomerId(id));
     };
     //console.log(connection);
     //console.log(selectedCustomer)
     const data = [];
     if (notNull(customerData.data)) {
          if (customerData.data.data.length > 0) {
               let temp = combineData(customerData.data.data, customerData.data.userdata);

               //sort by Balance
               if (sortBy == CUSTOMER_NAME_SORT) {
                    temp.sort((a, b) => a.user.name.localeCompare(b.user.name));
               } else if (sortBy == BALANCE_SORT) {
                    temp.sort((a, b) => b.totalBalance - a.totalBalance);
               } else if (sortBy == ADDRESS_SORT) {
                    temp.sort((a, b) => a.user.address.localeCompare(b.user.address));
               }



               xcombineData = temp
               if (searchText.length > 0) {
                    temp = temp.filter((item) => {
                         return item.user.name.toLowerCase().includes(searchText.toLowerCase());
                    });
               }

               console.log(temp)

               temp.forEach((item) => {
                    data.push(makeRow(item, loadConnection));
               });

          }
     }
     useEffect(() => {
          if (customerData.data == null && !customerData.isLoading && !customerData.isError) {
               dispatch(fetchCustomerData());
          }
          if (gasList.length == 0 && !gasLoading) {
               dispatch(fetchGas())
          }
     });
     useEffect(() => {
          if (updateCustomer.isSuccessful) {
               dispatch(fetchCustomerData());
          }
     });
     useEffect(() => {
          gasServices.listenDataChange(() => {
               if (
                    !customerData.isLoading
               ) {
                    //console.log("fetchCustomerData...");
                    dispatch(fetchCustomerData());

               }
          });
     }, []);
     const [openNewConnection, setOpenNewConnection] = useState(false);
     const NewConnectionForm = () => {
          const [gasIdList, setGasIdList] = useState(new Array());
          const [noGas, setNoGas] = useState(true);
          const [noAccessory, setNoAccessory] = useState(true);
          const addGasIdList = (id, qty, price) => {
               if (qty < 1) {
                    alert("Quantity should be greater than 0");
                    return;
               }
               if (gasIdList.find((item) => item.id === id)) {
                    alert("Gas already selected");
                    return;
               }
               //gas not found
               if (gasList.find((item) => item.id === id) == null) {
                    alert("Select A Gas");
                    return;
               }

               //console.log(id, qty);
               setGasIdList((prevList) => [...prevList, { id: id, qty: qty, price: price }]);
          };
          console.log(gasIdList)
          const removeGasItem = (index) => {
               setGasIdList((prevList) => {
                    let temp = [...prevList];
                    temp.splice(index, 1);
                    return temp;
               })
          };
          const [accessory, setAccessory] = useState("");
          const [price, setPrice] = useState("");
          const [accessoryList, setAccessoryList] = useState(new Array());
          const [loadingSubmit, setLoadingSubmit] = useState(false);
          const addAccessory = (accessory, price) => {
               if (price < 1) {
                    alert("Price should be greater than 0");
                    return;
               }
               if (accessory.length === 0) {
                    alert("Accessory should not be empty");
                    return;
               }
               setAccessoryList((prevList) => [...prevList, { accessory: accessory, price: price }]);
               setAccessory("");
               setPrice("");
          };
          console.log(accessoryList)
          const removeAccessory = (index) => {
               setAccessoryList((prevList) => {
                    let temp = [...prevList];
                    temp.splice(index, 1);
                    return temp;
               })
          };
          ///
          return <Modal
               open={openNewConnection}
               onClose={() => setOpenNewConnection(false)}
               title="New Connection"
               sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
               }}
          >
               <Container>
                    <Sheet
                         sx={{
                              padding: "20px",
                              borderRadius: "10px",
                              backgroundColor: "#fff",
                              boxShadow: "0px 0px 10px 0px #0000001a",
                         }}
                    >
                         <ModalClose variant="outlined" />
                         <Typography>New Connection</Typography>
                         <Divider sx={{
                              p: 1,
                              opacity: 0,
                         }} />
                         <form
                              //hande submit
                              onSubmit={
                                   (e) => {
                                        e.preventDefault();

                                        setLoadingSubmit(true);

                                        //get the form data in json format
                                        const formData = new FormData(e.target);
                                        const t = {};
                                        formData.forEach((value, key) => {
                                             t[key] = value;
                                        })
                                        //console.log(t)

                                        let diaryNo = t.diary_no;
                                        if (diaryNo.length > 0) {
                                             //check if diary number is already taken
                                             let isTaken = false;
                                             CUSTOMERS.forEach((customer) => {
                                                  if (customer.diaryNumber == diaryNo) {
                                                       isTaken = true;
                                                  }
                                             });
                                             if (isTaken) {
                                                  alert("Diary Number already taken");
                                                  setLoadingSubmit(false);
                                                  return;
                                             }
                                        }

                                        let data = JSON.stringify({
                                             "name": t.name,
                                             "phone_no": t.phone,
                                             "address": t.address,
                                             "gas": noGas ? [] : gasIdList,
                                             "diaryNumber": t.diary_no,
                                             "aadhar_card_no": t.aadhar_card_no,
                                             "accessories": noAccessory ? [] : accessoryList
                                        });
                                        console.log(data)

                                        const token = sessionStorage.getItem("authToken");
                                        let config = {
                                             method: 'post',
                                             maxBodyLength: Infinity,
                                             url: URL + 'api/createCustomer',
                                             headers: {
                                                  'Content-Type': 'application/json',
                                                  'Authorization': `Bearer ${token}`,
                                             },
                                             data: data
                                        };

                                        axios.request(config)
                                             .then((response) => {
                                                  console.log(JSON.stringify(response.data));
                                                  if (response.data.success == true) {
                                                       dispatch(fetchCustomerData());
                                                       setOpenNewConnection(false);
                                                       setLoadingSubmit(false);
                                                  } else {
                                                       alert("Error Adding Customer");
                                                       console.log(response.data);
                                                       setLoadingSubmit(false);
                                                  }

                                             })
                                             .catch((error) => {
                                                  alert("Error Adding Customer");
                                                  console.log(error);
                                                  setLoadingSubmit(false);
                                             });

                                   }
                              }
                         >
                              <Stack spacing={2}
                                   direction={"column"}
                              >
                                   <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Input placeholder="Name" name="name" required />
                                   </FormControl>
                                   <FormControl>
                                        <FormLabel>Phone Number</FormLabel>
                                        <Input
                                             placeholder="Phone"
                                             name="phone"
                                             required
                                             type="tel"
                                             onChange={(e) => {

                                                  //remove + from phone number if present
                                                  if (e.target.value.startsWith('+')) {
                                                       e.target.value = e.target.value.substring(1);
                                                  }

                                                  const value = e.target.value;
                                                  // Allow only digits and + symbol
                                                  const sanitized = value.replace(/[^\d+]/g, '');
                                                  e.target.value = sanitized;
                                             }}
                                             onBlur={(e) => {
                                                  const value = e.target.value.trim();
                                                  const patterns = [
                                                       /^\+91\d{10}$/, // +919876543210 (13 characters)
                                                       /^91\d{10}$/,   // 919876543210 (12 characters)
                                                       /^\d{10}$/      // 9876543210 (10 characters)
                                                  ];

                                                  const isValid = patterns.some(pattern => pattern.test(value));

                                                  if (!isValid && value.length > 0) {
                                                       alert('Phone number must be in one of these formats:\n+919876543210 (13 digits)\n919876543210 (12 digits)\n9876543210 (10 digits)');
                                                       // Remove the focus() call to prevent infinite loop
                                                  }
                                             }}
                                             pattern="^(\+91\d{10}|91\d{10}|\d{10})$"
                                             title="Phone number must be: +919876543210 or 919876543210 or 9876543210"
                                        />
                                   </FormControl>
                                   <FormControl>
                                        <FormLabel>Address</FormLabel>
                                        <Input placeholder="Address" name="address" required />
                                   </FormControl>
                                   <FormControl>
                                        <FormLabel>Aadhar Card No.</FormLabel>
                                        <Input placeholder="Aadhar Card No." type="number" name="aadhar_card_no" />
                                   </FormControl>
                                   <FormControl>
                                        <FormLabel>Diary No.</FormLabel>
                                        <Input placeholder="Diary No." type="number" name="diary_no" />
                                   </FormControl>
                                   <FormLabel sx={{ opacity: noGas ? 0.5 : 1 }}>Gas List</FormLabel>
                                   <List sx={{ display: noGas ? "none" : "block" }}>
                                        {gasIdList.map((item, index) => {
                                             const gas = gasList.find((gas) => gas.id === item.id);
                                             return <ListItem
                                                  key={"gas_sel_" + index}
                                                  sx={{
                                                       // border stroke
                                                       borderWidth: 2,
                                                       borderRadius: "lg",
                                                       display: "flex",
                                                       mt: 1
                                                  }}
                                             >
                                                  <ListItemContent
                                                       sx={{
                                                            fontWeight: "bold",
                                                            flexGrow: 1
                                                       }}
                                                  >{gas.company_name} : {gas.kg}KG : {item.qty} QTY : Price ₹{item.price} : TOTAL ₹{item.qty * item.price}</ListItemContent>
                                                  <Box
                                                       sx={{
                                                            display: "flex",
                                                            justifyContent: "end",
                                                            padding: 1,
                                                            borderRadius: "lg",
                                                            //hover effect
                                                            '&:hover': {
                                                                 backgroundColor: "#CC2B52",
                                                                 color: "#fff",
                                                            }
                                                       }}
                                                       onClick={() => {
                                                            removeGasItem(index)
                                                       }}
                                                  ><CgClose /></Box>
                                             </ListItem>
                                        })
                                        }
                                   </List>
                                   <Stack
                                        direction={"row"}
                                        gap={1}
                                        sx={{ display: noGas ? "none" : "flex" }}
                                   >
                                        <Select sx={{ flexGrow: 1 }}
                                             placeholder="Select Gas"
                                             onChange={(event, value) => {
                                                  tempSelectedId = value
                                             }}
                                        >
                                             {
                                                  gasList.map((item) => {
                                                       if (gasIdList.find((gas) => gas.id === item.id)) {
                                                            return null;
                                                       }
                                                       return <Option key={item.id}
                                                            value={item.id}>{item.company_name} : {item.kg}KG</Option>
                                                  })
                                             }
                                        </Select>
                                        <Input type="number" placeholder="Quantity" name="qty" defaultValue={tempQty}
                                             onChange={(e) => {
                                                  tempQty = Number(e.target.value)
                                             }}
                                             startDecorator={<Typography>Quantity : </Typography>}
                                        />
                                        <Input type="number" placeholder="Price" name="price" defaultValue={tempPrice}
                                             onChange={(e) => {
                                                  tempPrice = Number(e.target.value)
                                             }}
                                             startDecorator={<Typography>Price : </Typography>}
                                        />
                                        <Button
                                             onClick={() => {
                                                  addGasIdList(tempSelectedId, tempQty, tempPrice)
                                             }}
                                        >Add Gas</Button>
                                   </Stack>
                                   <FormLabel sx={{ opacity: noAccessory ? 0.5 : 1 }}>Accessory List</FormLabel>
                                   <List
                                        sx={{ display: noAccessory ? "none" : "block" }}
                                   >
                                        {accessoryList.map((item, index) => {
                                             return <ListItem
                                                  key={"accessory_" + index}
                                                  sx={{
                                                       // border stroke
                                                       borderWidth: 2,
                                                       borderRadius: "lg",
                                                       display: "flex",
                                                       mt: 1
                                                  }}
                                             >
                                                  <ListItemContent
                                                       sx={{
                                                            fontWeight: "bold",
                                                            flexGrow: 1
                                                       }}
                                                  >{item.accessory} : ₹{item.price}</ListItemContent>
                                                  <Box
                                                       sx={{
                                                            display: "flex",
                                                            justifyContent: "end",
                                                            padding: 1,
                                                            borderRadius: "lg",
                                                            //hover effect
                                                            '&:hover': {
                                                                 backgroundColor: "#CC2B52",
                                                                 color: "#fff",
                                                            }
                                                       }}
                                                       onClick={() => {
                                                            removeAccessory(index)
                                                       }}
                                                  ><CgClose /></Box>
                                             </ListItem>
                                        })
                                        }
                                   </List>
                                   <Stack direction={"row"} gap={1} sx={{ display: noAccessory ? "none" : "flex" }}>
                                        <Input sx={{ flexGrow: 1 }} placeholder="Accessory" value={accessory}
                                             onChange={(e) => {
                                                  setAccessory(e.target.value)
                                             }}
                                        />
                                        <Input sx={{ flexGrow: .1 }} placeholder="Price" type="number" value={price}
                                             onChange={(e) => {
                                                  setPrice(e.target.value)
                                             }}
                                        />
                                        <Button
                                             onClick={() => {
                                                  addAccessory(accessory, price)
                                             }}
                                        >Add Accessory</Button>
                                   </Stack>
                                   <Divider sx={{ opacity: 0, m: 1 }} />
                                   <Stack direction={"row"} gap={1}>
                                        <Stack
                                             gap={1}
                                             sx={{
                                                  flexDirection: { xs: 'column', md: 'row' },
                                                  alignItems: { xs: 'flex-start', md: 'center' }
                                             }}
                                        >
                                             <Checkbox
                                                  label=""
                                                  size="lg"
                                                  checked={noGas}
                                                  onChange={(e) => {
                                                       setNoGas(e.target.checked);
                                                  }}
                                             />
                                             <span style={{
                                                  fontWeight: "bold",
                                                  color: "black",
                                                  minWidth: { xs: '100%', md: 'auto' },
                                                  whiteSpace: 'nowrap'
                                             }}>
                                                  No Gas :
                                             </span>

                                             <Stack
                                                  gap={1}
                                                  sx={{
                                                       flexDirection: { xs: 'column', md: 'row' },
                                                       alignItems: { xs: 'flex-start', md: 'center' }
                                                  }}
                                             >
                                                  <Checkbox
                                                       label=""
                                                       size="lg"
                                                       checked={noAccessory}
                                                       onChange={(e) => {
                                                            setNoAccessory(e.target.checked);
                                                       }}
                                                  />
                                                  <span style={{
                                                       fontWeight: "bold",
                                                       color: "black",
                                                       minWidth: { xs: '100%', md: 'auto' },
                                                       whiteSpace: 'nowrap'
                                                  }}>
                                                       No Accessory :
                                                  </span>
                                             </Stack>
                                        </Stack>
                                   </Stack>
                                   <Divider sx={{ opacity: 0, m: 1 }} />
                                   {
                                        loadingSubmit ? <LinearProgress /> : <>
                                             <Button type="submit"
                                             >Add Customer</Button>
                                        </>
                                   }
                              </Stack>
                         </form>
                    </Sheet>
               </Container>
          </Modal>
     }

     if (customerData.data == null || gasList.length == 0) {
          return <div style={{
               width: "100%",
               height: "100%",
               overflow: "auto",
               padding: "10px",
               backgroundColor: "#f5f5f5",
               borderRadius: "16px",
          }}>
               <LinearProgress></LinearProgress>
          </div>
     }
     let tempQty = 1
     let tempPrice = 0
     let tempSelectedId = gasList[0].id
     let new_connection = null
     try {
          //console.log(connection.data.new_connection)
          if (connection.data.new_connection) {
               new_connection = connection.data.new_connection
          }
     } catch (e) {
          //console.log(e)
     }
     new_connection = new_connection ? new_connection : []
     //console.log(new_connection)
     return (
          <div style={{
               width: "100%",
               height: "100%",
               overflow: "auto",
               padding: "10px",
               backgroundColor: "#f5f5f5",
               borderRadius: "16px",
          }}>
               <NewConnectionForm />
               <Stack direction="row" mb={1} spacing={1} justifyContent="flex-end">
                    <Button onClick={
                         () => {
                              setOpenNewConnection(true);
                         }
                    } startDecorator={<TbHomePlus />}>New Connection</Button>
                    <div style={{ flexGrow: 1 }} />
                    <Typography
                         variant="h4"
                         style={{
                              display: "flex",
                              alignItems: "center",
                         }}
                    >Sort By</Typography>
                    <Select defaultValue="balance">
                         <Option value="balance" onClick={() => setSortBy(BALANCE_SORT)}>Balance</Option>
                         <Option value="customer_name" onClick={() => setSortBy(CUSTOMER_NAME_SORT)}>Customer Name</Option>
                         <Option value="address" onClick={() => setSortBy(ADDRESS_SORT)}>Address</Option>
                    </Select>
                    <Typography
                         variant="h4"
                         style={{
                              display: "flex",
                              alignItems: "center",
                         }}
                    >Search Customer</Typography>
                    <Input
                         placeholder="Name"
                         value={searchText}
                         onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button startDecorator={<BsSearch />}>Search</Button>

               </Stack>
               <>
                    <Modal
                         open={customerDetailsModel}
                         onClose={() => setCustomerDetailsModel(false)}
                         title="All Data"
                         sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "10px",
                         }}
                    >
                         <Container
                         >
                              <Sheet
                                   sx={{
                                        padding: "20px",
                                        borderRadius: "10px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0px 0px 10px 0px #0000001a",
                                        overflow: "auto",
                                        height: "80vh",
                                   }}
                              >
                                   <ModalClose variant="outlined" />
                                   <Typography>All Data</Typography>
                                   <Divider sx={{
                                        p: 1,
                                        opacity: 0,
                                   }} />
                                   <List>
                                        {
                                             connection.isLoading ? <LinearProgress /> : <>
                                                  <ListItem>
                                                       <ListItemContent>
                                                            <Stack direction={"row"} spacing={1} alignItems="center" justifyContent="flex-start">
                                                                 <pre>Name</pre>
                                                                 :
                                                                 <pre>{selectedCustomer ? selectedCustomer.user.name : ''}</pre>
                                                            </Stack>
                                                       </ListItemContent>
                                                  </ListItem>
                                                  <Divider />
                                                  <ListItem>
                                                       <ListItemContent>
                                                            <Stack direction={"row"} spacing={1} alignItems="center" justifyContent="flex-start">
                                                                 <pre>Address</pre>
                                                                 :
                                                                 <pre>{selectedCustomer ? selectedCustomer.user.address : ""}</pre>
                                                            </Stack>
                                                       </ListItemContent>
                                                  </ListItem>
                                                  <Divider />
                                                  <ListItem>
                                                       <ListItemContent>
                                                            <Stack direction={"row"} spacing={1} alignItems="center" justifyContent="flex-start">
                                                                 <pre>Phone Number</pre>
                                                                 :
                                                                 <pre>{selectedCustomer ? selectedCustomer.user.phone_no : ""}</pre>
                                                            </Stack>
                                                       </ListItemContent>
                                                  </ListItem>
                                                  <Divider />
                                                  <ListItem>
                                                       <ListItemContent>
                                                            <Stack direction={"row"} spacing={1} alignItems="center" justifyContent="flex-start">
                                                                 <pre>Aadhar Card Number</pre>
                                                                 <UpdateCustomerCell
                                                                      userId={(selectedCustomer != null) ? selectedCustomer.user_id : null}
                                                                      custId={(selectedCustomer != null) ? selectedCustomer.user_id : null}
                                                                      updateUser={false}
                                                                      key="aadhar_card_no"
                                                                      name="aadhar_card_no"
                                                                      type={NUMBER}
                                                                      text={(selectedCustomer != null) ? (selectedCustomer.aadhar_card_no ? selectedCustomer.aadhar_card_no : 0) : 0}
                                                                      value={(selectedCustomer != null) ? (selectedCustomer.aadhar_card_no ? selectedCustomer.aadhar_card_no : 0) : 0}
                                                                      table={UPDATE_CUSTOMER}
                                                                 />
                                                            </Stack>
                                                       </ListItemContent>
                                                  </ListItem>
                                                  <Divider />
                                                  <ListItem>
                                                       <ListItemContent>
                                                            <Stack direction={"row"} spacing={1} alignItems="center" justifyContent="flex-start">
                                                                 <pre>Diary Number</pre>
                                                                 :
                                                                 <pre>{selectedCustomer ? selectedCustomer.diaryNumber : ""}</pre>
                                                            </Stack>
                                                       </ListItemContent>
                                                  </ListItem>
                                                  <Divider />
                                             </>
                                        }
                                   </List>
                              </Sheet>
                         </Container>
                    </Modal>
               </>
               <DataTable
                    thead={[
                         <TableHead key={"all_data"}><FaInfoCircle /></TableHead>,
                         <TableHead key={"diary_no"}>Diary No.</TableHead>,
                         <TableHead key={"name"}>Name</TableHead>,
                         <TableHead key={"address"}>Address</TableHead>,
                         <TableHead key={"phone_no"}>Phone No.</TableHead>,
                         <TableHead key={"balance"}>Balance</TableHead>,
                         <TableHead key={"history"}>History</TableHead>,
                    ]}
                    tbody={data}
                    loading={customerData.isLoading}
               />
          </div>
     );
};

export default ViewCustomer;

function combineData(data, userdata) {
     return data.map((item) => {
          const user = userdata.find((user) => user.id === item.user_id);
          return {
               ...item,
               user,
          };
     });
}

function makeRow(data, onAllDataClick) {
     //console.log(data);
     return [
          <AllData
               key="all_data"
               data={data}
               onClick={onAllDataClick}
          />,
          <UpdateCustomerCell
               userId={data.user_id}
               custId={data.id}
               updateUser={false}
               key="diaryNumber"
               name="diaryNumber"
               type={NUMBER}
               text={data.diaryNumber ? data.diaryNumber : 0}
               value={data.diaryNumber ? data.diaryNumber : 0}
               table={UPDATE_CUSTOMER}
          />,
          <UpdateCustomerCell
               userId={data.user_id}
               custId={data.id}
               updateUser={true}
               key="name"
               name="name"
               type={TEXT}
               text={data.user.name}
               value={data.user.name}
               table={UPDATE_USER}
          />,
          <UpdateCustomerCell
               userId={data.user_id}
               custId={data.id}
               updateUser={true}
               key="address"
               name="address"
               type={TEXT}
               text={data.user.address}
               value={data.user.address}
               table={UPDATE_USER}
          />,
          <UpdateCustomerCell
               userId={data.user_id}
               custId={data.id}
               updateUser={true}
               key="phone_no"
               name="phone_no"
               type={NUMBER}
               text={data.user.phone_no}
               value={data.user.phone_no}
               table={UPDATE_USER}
          />,
          <span key="tb" className="b ps1">{`₹${data.totalBalance}`}</span>,
          <Box
               key="chb"
               sx={{
                    padding: "0px",
                    margin: "0px",
                    backgroundColor: "transparent",
                    mx: "2px",
                    transition: "background-color 0.3s",
                    "&:hover": {
                         backgroundColor: "rgb(75 112 245 / 25%)",
                    },
                    pl: 1

               }}>
               <Button style={{
                    flexGrow: 1,
                    width: "100%",
                    height: "100%",
                    margin: "0px",
                    padding: "0px",
                    borderRadius: "0px",
                    backgroundColor: "transparent",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    disabled: true,
                    justifyContent: "flex-start",
                    color: "#185ea5",
               }}

                    onClick={() => {
                         window.location.href = `/admin/#/admin/deliveryHistory/?customerId=${data.id}`;
                    }}

               >History</Button>
          </Box>
     ];
}

function AllData({ data, onClick }) {
     return <Box
          key="chb"
          sx={{
               padding: "0px",
               margin: "0px",
               backgroundColor: "transparent",
               mx: "2px",
               transition: "background-color 0.3s",
               "&:hover": {
                    backgroundColor: "rgb(75 112 245 / 25%)",
               },

          }}>
          <Button style={{
               flexGrow: 1,
               width: "100%",
               height: "100%",
               margin: "0px",
               padding: "0px",
               borderRadius: "0px",
               backgroundColor: "transparent",
               whiteSpace: "nowrap",
               textAlign: "center",
               disabled: true,
               //justifyContent: "flex-start",
               color: "#377e3a",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
          }}
               onClick={() => {
                    //window.location.href = `/admin/#/admin/deliveryHistory/?customer_id=${data.id}`;
                    //console.log(data)
                    onClick(data.id);
               }}
          >
               <FaInfoCircle />
          </Button>
     </Box>
}