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
     Table
} from "@mui/joy";
import TableHead from "../table/TableHead.jsx";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "../../state/Customers.jsx";
import UpdateCustomerCell, { NUMBER, TEXT } from "../edit/UpdateCustomerCell.jsx";
import { notNull } from "../../helpers.jsx/Validation.jsx";
import { UPDATE_CUSTOMER, UPDATE_USER } from "../../services/Api.jsx";

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

const ViewCustomer = () => {

     const dispatch = useDispatch();
     const customerData = useSelector((state) => state.customers);
     const updateCustomer = useSelector((state) => state.updateCustomer);

     const { gasLoading, gasList, gasError } = useSelector((state) => state.gasList);
     //console.log({gasLoading, gasList, gasError})

     const [searchText, setSearchText] = useState("");

     const [customerDetailsModel, setCustomerDetailsModel] = useState(false);

     let [selectedCustomer, setSelectedCustomer] = useState(null);
     const connection = useSelector((state) => state.connections);
     let xcombineData = null
     const loadConnection = (id) => {
          //console.log(id)
          const customer = xcombineData.find((user) => user.id == id)
          setSelectedCustomer(customer)
          setCustomerDetailsModel(true);
          dispatch(resetConnection());
          dispatch(fetchConnectionByCustomerId(id));
     };
     //console.log(connection);
     //console.log(selectedCustomer)
     const data = [];
     if (notNull(customerData.data)) {
          if (customerData.data.data.length > 0) {
               let temp = combineData(customerData.data.data, customerData.data.userdata);
               xcombineData = temp
               if (searchText.length > 0) {
                    temp = temp.filter((item) => {
                         return item.user.name.toLowerCase().includes(searchText.toLowerCase());
                    });
               }

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
          const addGasIdList = (id, qty) => {
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
               setGasIdList((prevList) => [...prevList, { id: id, qty: qty }]);
          };
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

                                        if (gasIdList.length == 0) {
                                             alert("Please select a gas");
                                             return;
                                        }

                                        //get the form data in json format
                                        const formData = new FormData(e.target);
                                        const t = {};
                                        formData.forEach((value, key) => {
                                             t[key] = value;
                                        })
                                        //console.log(t)

                                        let data = JSON.stringify({
                                             "name": t.name,
                                             "phone_no": t.phone,
                                             "address": t.address,
                                             "gas": gasIdList,
                                             "diaryNumber": t.diary_no,
                                             "aadhar_card_no": t.aadhar_card_no,
                                             "accessories": accessoryList
                                        });
                                        //console.log(data)
                                        let config = {
                                             method: 'post',
                                             maxBodyLength: Infinity,
                                             url: 'https://adminsr.life/public/api/createCustomer',
                                             headers: {
                                                  'Content-Type': 'application/json'
                                             },
                                             data: data
                                        };
                                        setOpenNewConnection(false);
                                        axios.request(config)
                                             .then((response) => {
                                                  //console.log(JSON.stringify(response.data));
                                                  dispatch(fetchCustomerData());
                                             })
                                             .catch((error) => {
                                                  console.log(error);
                                             });

                                   }
                              }
                         >
                              <Stack spacing={2}
                                   direction={"column"}
                              >
                                   <Input placeholder="Name" name="name" required />
                                   <Input placeholder="Phone" name="phone" required type="number" />
                                   <Input placeholder="Address" name="address" required />
                                   <Input placeholder="Aadhar Card No." type="number" name="aadhar_card_no" required />
                                   <Input placeholder="Diary No." type="number" name="diary_no" required />
                                   <List>
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
                                                  >{gas.company_name} : {gas.kg}KG : {item.qty} QTY</ListItemContent>
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
                                        <Button
                                             onClick={() => {
                                                  addGasIdList(tempSelectedId, tempQty)
                                             }}
                                        >Add Gas</Button>
                                   </Stack>
                                   <List>
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
                                   <Stack direction={"row"} gap={1}>
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
                                   <Button type="submit"
                                   >Add Customer</Button>
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
     /*new_connection =
     [
    {
        "id": 3,
        "custome_id": 120,
        "gas_id": 2,
        "gas_qty": 2,
        "gas_price": 100.5,
        "accessorie": "Regulator",
        "accessorie_price": 25,
        "created_at": "2025-01-09T14:09:26.000000Z"
    },
    {
        "id": 4,
        "custome_id": 120,
        "gas_id": 2,
        "gas_qty": 2,
        "gas_price": 100.5,
        "accessorie": "Regulator",
        "accessorie_price": 25,
        "created_at": "2025-01-09T14:09:34.000000Z"
    }
]
     */
     new_connection = new_connection ? new_connection : []
     console.log(new_connection)
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
                                                  <ListItem>
                                                       <ListItemContent>
                                                            <Stack direction={"row"} spacing={1} >
                                                                 <pre>New Connections</pre>
                                                                 <List>
                                                                      {
                                                                           new_connection.map((item, index) => {
                                                                                return <ListItem key={"new_connection_" + index}>
                                                                                     <ListItemContent>
                                                                                          <Stack direction={"row"} spacing={1} alignItems="center" justifyContent="flex-start">
                                                                                               <pre>{
                                                                                                    formatDateTDDMMYY(new Date(item.created_at))
                                                                                               }</pre>
                                                                                               <pre>Gas</pre>
                                                                                               <pre>Price</pre>
                                                                                               <pre>Qty</pre>
                                                                                          </Stack>
                                                                                     </ListItemContent>
                                                                                </ListItem>
                                                                           })
                                                                      }
                                                                 </List>
                                                            </Stack>
                                                       </ListItemContent>
                                                  </ListItem>
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
                         window.location.href = `/admin/#/admin/deliveryHistory/?customer_id=${data.id}`;
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
               justifyContent: "flex-start",
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