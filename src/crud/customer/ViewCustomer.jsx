//delivery_history.jsx
import React, { useEffect, useState } from "react";
import "../crud-css/read.css";
import {
     BsFillExclamationOctagonFill,
     BsFillPencilFill,
     BsFilter,
     BsSearch,
} from "react-icons/bs";
import gasDataService from "../../services/gas-services";
import DataTable from "../../components/table/DataTable";
import { CUSTOMER_DATA } from "../../services/Api";
import { Button, Input, Stack, Typography } from "@mui/joy";
import TableHead from "../../components/table/TableHead";

import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "../../state/Customers";

const ViewCustomer = () => {

     const dispatch = useDispatch();
     const customerData = useSelector((state) => state.customers);

     const data = [];
     //customerData.data = []
     //check if data is not empty
     if (customerData.data.data.length > 0) {
          const temp = combineData(customerData.data.data, customerData.data.userdata);
          temp.forEach((item) => {
               data.push(makeRow(item));
          });
          console.log(temp);
     }

     useEffect(() => {
          gasDataService.listenDataChange(() => {
               dispatch(fetchCustomerData());
               //console.log("Data changed");
          });
     }, []);

     return (
          <div style={{
               width: "100%",
               padding: "10px",
          }}>
               <Stack direction="row" mb={1} spacing={2} justifyContent="flex-end">
                    <Typography
                         variant="h4"
                         style={{
                              display: "flex",
                              alignItems: "center",
                         }}
                    >Search Customer</Typography>
                    <Input
                         startDecorator={<BsSearch />}
                         placeholder="Name"
                    />

               </Stack>
               <DataTable
                    thead={[
                         <TableHead>Name</TableHead>,
                         <TableHead>Address</TableHead>,
                         <TableHead>Phone No.</TableHead>,
                         <TableHead>Balance</TableHead>,
                         <TableHead>Action</TableHead>,]}
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
     return [
          data.user.name,
          data.user.address,
          data.user.phone_no,
          data.Balance,
          <Button variant="solid" startDecorator={<BsFillPencilFill />}>
               Edit
          </Button>,
     ];
}
