//DeliveryHistory.jsx
import React, { useEffect, useState } from "react";
import "../../crud/crud-css/read.css";
import { BsSearch, } from "react-icons/bs";
import gasDataService from "../../services/gas-services.jsx";
import DataTable from "../table/DataTable.jsx";
import { Box, Button, Input, Stack, Typography, Modal, ModalClose, Sheet, Container, Divider, Select, Option, LinearProgress, List, ListItem, ListItemButton, ListItemContent } from "@mui/joy";
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

const ViewCustomer = () => {

     const dispatch = useDispatch();
     const customerData = useSelector((state) => state.customers);
     const updateCustomer = useSelector((state) => state.updateCustomer);

     const { gasLoading, gasList, gasError } = useSelector((state) => state.gasList);
     console.log({ gasLoading, gasList, gasError })

     const [searchText, setSearchText] = useState("");

     const data = [];
     if (notNull(customerData.data)) {
          if (customerData.data.data.length > 0) {
               let temp = combineData(customerData.data.data, customerData.data.userdata);

               if (searchText.length > 0) {
                    temp = temp.filter((item) => {
                         return item.user.name.toLowerCase().includes(searchText.toLowerCase());
                    });
               }

               temp.forEach((item) => {
                    data.push(makeRow(item));
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
                    console.log("fetchCustomerData...");
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

               console.log(id, qty);
               setGasIdList((prevList) => [...prevList, { id: id, qty: qty }]);
          };

          const removeGasItem = (index) => {
               setGasIdList((prevList) => {
                    let temp = [...prevList];
                    temp.splice(index, 1);
                    return temp;
               })
          };

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
                         <Typography >New Connection</Typography>
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
                                        console.log(t)

                                        let data = JSON.stringify({
                                             "name": t.name,
                                             "phone_no": t.phone,
                                             "address": t.address,
                                             "gas": gasIdList
                                        });

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
                                                  console.log(JSON.stringify(response.data));
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
                                   <Input placeholder="Aadhar Card No." name="aadhar_card_no" required />
                                   <Input placeholder="Diary No." name="diary_no" required />
                                   <List >
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
                                                       //dont include the gas that is already selected
                                                       if (gasIdList.find((gas) => gas.id === item.id)) {
                                                            return null;
                                                       }
                                                       return <Option key={item.id} value={item.id}>{item.company_name} : {item.kg}KG</Option>
                                                  })
                                             }
                                        </Select>
                                        <Input type="number" placeholder="Quantity" name="qty" defaultValue={tempQty} onChange={(e) => {
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
                                        <ListItem>
                                             <ListItemContent sx={{ fontWeight: "bold" }}>Accessories</ListItemContent>
                                        </ListItem>
                                        <ListItem>
                                             <ListItemContent sx={{ fontWeight: "bold" }}>Price</ListItemContent>
                                        </ListItem>
                                   </List>
                                   <Stack direction={"row"} gap={1}>
                                        <Input placeholder="Accessory" />
                                        <Input placeholder="Price" type="number" />
                                   </Stack>
                                   <Button type="submit"
                                   >Add</Button>
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
               <DataTable
                    thead={[
                         <TableHead>Name</TableHead>,
                         <TableHead>Address</TableHead>,
                         <TableHead>Phone No.</TableHead>,
                         <TableHead>Balance</TableHead>,
                         <TableHead>History</TableHead>,
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

function makeRow(data) {
     //console.log(data);
     return [
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

