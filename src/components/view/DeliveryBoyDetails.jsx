import { Box, Button, Container, Divider, Input, LinearProgress, Modal, ModalClose, Sheet, Stack, Table, Typography } from "@mui/joy";
import { BsSearch } from "react-icons/bs";
import DataTable from "../table/DataTable.jsx";
import TableHead from "../table/TableHead.jsx";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { fetchGetData } from "../../state/GetData.jsx";
import React, { useEffect, useState } from "react";
import { GET_COURIER_BOY_DATA, UPDATE_COURIER_BOY, UPDATE_USER, } from "../../services/Api.jsx";
import UpdateCustomerCell, { NUMBER, TEXT } from "../edit/UpdateCustomerCell.jsx";
import DeliveryBoyCard from "./DeliveryBoyCard.jsx";
import { Link } from "react-router-dom";

export default function DeliveryBoyDetails() {
     const dispatch = useDispatch();
     const data = useSelector((state) => state.getData);

     const update = useSelector((state) => state.updateCustomer);

     const rows = [];
     const deliveryBoyData = []

     if (data.data !== null) {
          if (data.data.data.length > 0 && data.url == GET_COURIER_BOY_DATA) {
               data.data.data.forEach((item) => {
                    let expenses = 0;
                    try {
                         let temp = data.data.expenses.find((element) => {
                              if (element.user_id === item.id) {
                                   expenses = element.expense;
                                   return true;
                              }
                              return false;
                         })
                         expenses = temp.total_expense
                    } catch (e) {
                         expenses = 0;
                    }
                    console.log(expenses);
                    rows.push(makeRow(item, expenses));
                    deliveryBoyData.push(item);
               });
          }
     }

     console.log(data);

     useEffect(() => {
          if (data.data == null || data.url != GET_COURIER_BOY_DATA) {
               //console.log("fetch");
               dispatch(fetchGetData(GET_COURIER_BOY_DATA))
          }

          //console.log("useEffect");
          if (update.isSuccessful) {
               //console.log("update");
               dispatch(fetchGetData(GET_COURIER_BOY_DATA));
          }
          //dispatch(fetchGetData(GET_COURIER_BOY_DATA));

          // console.log(update);
     },); // Add an empty dependency array here

     const NewBoy = () => {
          const [open, setOpen] = useState(false);
          if (!open) {
               return (
                    <Button sx={
                         {
                              mb: 1
                         }
                    }
                         onClick={() => setOpen(true)}
                    >New Delivery Boy</Button>
               )
          }
          return (
               <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    title="New Connection"
                    sx={{
                         display: "flex",
                         flexDirection: "column",
                         justifyContent: "center",
                         alignItems: "center",
                         gap: "10px",
                    }
                    }
               >
                    <Container maxWidth={"xs"}>
                         <Sheet
                              sx={{
                                   padding: "20px",
                                   borderRadius: "10px",
                                   backgroundColor: "#fff",
                                   boxShadow: "0px 0px 10px 0px #0000001a",
                              }}
                         >
                              <ModalClose variant="outlined" />
                              <Typography >New Delivery Boy</Typography>
                              <Divider sx={{
                                   p: 1,
                                   opacity: 0,
                              }} />
                              <form
                                   //hande submit
                                   onSubmit={
                                        (e) => {
                                             e.preventDefault();
                                             //get the form data in json format
                                             const formData = new FormData(e.target);
                                             const t = {};
                                             formData.forEach((value, key) => {
                                                  t[key] = value;
                                             })
                                             console.log(t)

                                             let data = JSON.stringify({
                                                  "name": t.name,
                                                  "username": t.username,
                                                  "password": t.password,
                                             });

                                             console.log(data);

                                             // return;

                                             let config = {
                                                  method: 'post',
                                                  maxBodyLength: Infinity,
                                                  url: 'https://adminsr.life/public/api/createDeliveryBoy',
                                                  headers: {
                                                       'Content-Type': 'application/json'
                                                  },
                                                  data: data
                                             };
                                             setOpen(false);
                                             axios.request(config)
                                                  .then((response) => {
                                                       console.log(response.data);
                                                       dispatch(fetchGetData(GET_COURIER_BOY_DATA))
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
                                        <Input placeholder="Full Name" name="name" required />
                                        <Input placeholder="User Name" name="username" required />
                                        <Input placeholder="Password" name="password" required />
                                        <Button type="submit"
                                        >Add</Button>
                                   </Stack>
                              </form>
                         </Sheet>
                    </Container>
               </Modal>
          )
     }

     return (
          <div
               style={{
                    height: "100%",
                    width: "100%",
                    overflow: "auto",
                    padding: "10px",
                    backgroundColor: 'white',
                    borderRadius: '10px',
               }}
          >
               <Stack direction="row" mb={1} spacing={1} justifyContent="flex-end">
                    {/* <Input placeholder="Name" />
                    <Button startDecorator={<BsSearch />}>Search</Button> */}
                    <NewBoy />
               </Stack>

               {/* <DataTable
                    thead={[
                         // <TableHead>Name</TableHead>,
                         // <TableHead>Name</TableHead>,
                         <TableHead>User ID</TableHead>,
                         <TableHead>Password</TableHead>,
                         <TableHead>Expense</TableHead>,
                         // <TableHead>Truck</TableHead>,
                    ]}
                    tbody={rows}
                    loading={data.isLoading}
               /> */}
               <div style={{ display: data.isLoading ? "block" : "none" }}>
                    <LinearProgress color="primary" variant="soft" />
               </div>
               {/* <Box
                    sx={{
                         display: 'flex',
                         justifyContent: 'center',
                         flexWrap: 'wrap',
                         gap: 1,
                         marginTop: 5

                    }}
               >
                    {
                         deliveryBoyData.map((item, index) => {
                              return (
                                   <DeliveryBoyCard
                                        key={index}
                                        title={item.username}
                                        id={item.id}
                                        expence={[]}
                                   />
                              )
                         }
                         )
                    }
               </Box> */}
               <Table>
                    <thead>
                         <tr>
                              <th>Username</th>
                              <th>Password</th>
                              <th colSpan={3}>Expense</th>
                         </tr>
                    </thead>
                    <tbody>
                         {rows.map((row, index) => (
                              <tr key={index}>
                                   {row.map((cell, index) => (
                                        <td key={index}>{cell}</td>
                                   ))}
                                   {

                                        <td>
                                             <Link
                                                  to={"/admin/expence?user_id=" + deliveryBoyData[index].id + "&user_name=" + deliveryBoyData[index].username}
                                             ><Button
                                                  variant="soft"
                                                  color="success"
                                                  sx={{
                                                       width: '100%',
                                                  }}
                                             >
                                                       View Expences
                                                  </Button>
                                             </Link></td>
                                   }
                                   {
                                        <td>
                                             <Link
                                                  to={`/admin/deliveryHistory?courier_boy_id=${deliveryBoyData[index].id}`}
                                             >
                                                  <Button
                                                       variant="soft"
                                                       color="warning"
                                                       sx={{
                                                            width: '100%',
                                                       }}
                                                  >
                                                       View Deliveries
                                                  </Button>
                                             </Link>
                                        </td>
                                   }
                              </tr>
                         ))}
                    </tbody>
               </Table>
          </div>
     );
}

function makeRow(item, expense) {
     //console.log(item);
     return [

          // <UpdateCustomerCell
          //      updateUser={true}
          //      key={item.id}
          //      userId={item.userId}
          //      custId={item.id}
          //      text={item.name}
          //      type={TEXT}
          //      value={item.name}
          //      table={UPDATE_USER}
          //      name="name"
          // />,
          //item.name,
          <UpdateCustomerCell
               updateUser={false}
               key={item.id}
               userId={item.userId}
               custId={item.id}
               text={item.username}
               value={item.username}
               type={TEXT}
               table={UPDATE_COURIER_BOY}
               name="username"
          />,
          //item.username,
          <UpdateCustomerCell
               updateUser={false}
               key={item.id}
               userId={item.userId}
               custId={item.id}
               text={item.password}
               value={item.password}
               table={UPDATE_COURIER_BOY}
               type={TEXT}
               name='password'
          />,
          <span
               style={{
                    fontSize: '1.2em',
                    fontWeight: 'bold',
               }}
          >₹{expense}</span>,
          //item.password,
          // item.expense,
          // item.truck,
     ];
}
function combineData(data, user_data) {
     let result = [];
     data.forEach((item) => {
          let user = user_data.find((element) => element.id === item.user_id);
          result.push({ ...item, ...user });
     });
     return result;
}