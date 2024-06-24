import { Button, Input, Stack } from "@mui/joy";
import { BsSearch } from "react-icons/bs";
import DataTable from "../table/DataTable";
import TableHead from "../table/TableHead";

import { useDispatch, useSelector } from "react-redux";
import { fetchGetData } from "../../state/GetData";
import React, { useEffect, useState } from "react";
import { GET_COURIER_BOY_DATA, UPDATE_COURIER_BOY, UPDATE_USER, } from "../../services/Api";
import UpdateCustomerCell, { NUMBER, TEXT } from "./UpdateCustomerCell";

export default function DeliveryBoyDetails() {
     const dispatch = useDispatch();
     const data = useSelector((state) => state.getData);

     const update = useSelector((state) => state.updateCustomer);

     const rows = [];

     if (data.data !== null) {
          if (data.data.data.length > 0) {
               data.data.data.forEach((item) => {
                    rows.push(makeRow(item));
               });
          }
     }

     console.log(update);

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
               <DataTable
                    thead={[
                         // <TableHead>Name</TableHead>,
                         // <TableHead>Name</TableHead>,
                         <TableHead>User ID</TableHead>,
                         <TableHead>Password</TableHead>,
                         // <TableHead>Expense</TableHead>,
                         // <TableHead>Truck</TableHead>,
                    ]}
                    tbody={rows}
                    loading={data.isLoading}
               />
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
//data
/*
{
    "data": [
        {
            "id": 1,
            "user_id": 112,
            "username": "NITESH1",
            "password": "NITESH12",
            "created_at": "2024-03-26T07:14:23.000000Z",
            "updated_at": "2024-03-26T07:14:23.000000Z"
        },
        {
            "id": 2,
            "user_id": 113,
            "username": "PRABHAT",
            "password": "PRABHAT12",
            "created_at": "2024-03-26T07:15:15.000000Z",
            "updated_at": "2024-03-26T07:15:15.000000Z"
        },
        {
            "id": 3,
            "user_id": 114,
            "username": "SUNIL1",
            "password": "SUNIL12",
            "created_at": "2024-03-26T07:15:41.000000Z",
            "updated_at": "2024-03-26T07:15:41.000000Z"
        },
        {
            "id": 4,
            "user_id": 115,
            "username": "BHUPENDRA",
            "password": "BHUPENDRA12",
            "created_at": "2024-03-26T07:16:04.000000Z",
            "updated_at": "2024-03-26T07:16:04.000000Z"
        },
        {
            "id": 5,
            "user_id": 116,
            "username": "JITENDRA",
            "password": "JITENDRA12",
            "created_at": "2024-03-26T07:16:45.000000Z",
            "updated_at": "2024-03-26T07:16:45.000000Z"
        },
        {
            "id": 7,
            "user_id": 74,
            "username": "tester",
            "password": "test",
            "created_at": null,
            "updated_at": "2024-06-23T08:04:10.000000Z"
        }
    ],
    "user_data": [
        {
            "id": 74,
            "name": "XEROX GALI",
            "address": "GUNJAN",
            "phone_no": null,
            "created_at": "2024-03-26T06:11:40.000000Z",
            "updated_at": "2024-06-23T08:10:24.000000Z"
        },
        {
            "id": 112,
            "name": "NITESH KUMAR SAKET",
            "address": null,
            "phone_no": "7874258169",
            "created_at": "2024-03-26T06:38:14.000000Z",
            "updated_at": "2024-03-26T06:38:14.000000Z"
        },
        {
            "id": 113,
            "name": "PRABHAT KUMAR SAKET",
            "address": null,
            "phone_no": "9713179841",
            "created_at": "2024-03-26T06:38:38.000000Z",
            "updated_at": "2024-03-26T06:38:38.000000Z"
        },
        {
            "id": 114,
            "name": "SUNIL KUMAR SAKET",
            "address": null,
            "phone_no": "7567063929",
            "created_at": "2024-03-26T06:38:58.000000Z",
            "updated_at": "2024-03-26T06:38:58.000000Z"
        },
        {
            "id": 115,
            "name": "BHUPENDRA KUMAR",
            "address": null,
            "phone_no": "7030588937",
            "created_at": "2024-03-26T06:39:28.000000Z",
            "updated_at": "2024-03-26T06:39:28.000000Z"
        },
        {
            "id": 116,
            "name": "JITENDRA PANDEY",
            "address": null,
            "phone_no": "7984240723",
            "created_at": "2024-03-26T06:39:48.000000Z",
            "updated_at": "2024-03-26T06:39:48.000000Z"
        }
    ]
}
*/