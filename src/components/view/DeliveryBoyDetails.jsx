import { Box, Button, Input, LinearProgress, Stack } from "@mui/joy";
import { BsSearch } from "react-icons/bs";
import DataTable from "../table/DataTable.jsx";
import TableHead from "../table/TableHead.jsx";

import { useDispatch, useSelector } from "react-redux";
import { fetchGetData } from "../../state/GetData.jsx";
import React, { useEffect, useState } from "react";
import { GET_COURIER_BOY_DATA, UPDATE_COURIER_BOY, UPDATE_USER, } from "../../services/Api.jsx";
import UpdateCustomerCell, { NUMBER, TEXT } from "../edit/UpdateCustomerCell.jsx";
import DeliveryBoyCard from "./DeliveryBoyCard.jsx";

export default function DeliveryBoyDetails() {
     const dispatch = useDispatch();
     const data = useSelector((state) => state.getData);

     const update = useSelector((state) => state.updateCustomer);

     const rows = [];
     const deliveryBoyData = []

     if (data.data !== null) {
          if (data.data.data.length > 0 && data.url == GET_COURIER_BOY_DATA) {
               data.data.data.forEach((item) => {
                    rows.push(makeRow(item));
                    deliveryBoyData.push(item);
               });
          }
     }

     //console.log(update);

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

     return (
          <div
               style={{
                    width: "100%",
                    overflow: "auto",
                    padding: "10px",
               }}
          >
               <Stack direction="row" mb={1} spacing={1} justifyContent="flex-end">
                    <Input placeholder="Name" />
                    <Button startDecorator={<BsSearch />}>Search</Button>
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
               <Box
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
               </Box>
          </div>
     );
}

function makeRow(item) {
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
          <UpdateCustomerCell
               updateUser={false}
               key={item.id}
               userId={item.userId}
               custId={item.id}
               text={"134"}
               value={123}
               table={UPDATE_COURIER_BOY}
               type={NUMBER}
               name='expense'
          />,
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