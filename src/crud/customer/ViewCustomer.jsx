//delivery_history.jsx
import React, { useEffect, useState } from "react";
import "../crud-css/read.css";
import {
     BsSearch,
} from "react-icons/bs";
import gasDataService from "../../services/gas-services";
import DataTable from "../../components/table/DataTable";
import { Button, Input, Stack, Typography } from "@mui/joy";
import TableHead from "../../components/table/TableHead";

import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "../../state/Customers";
import UpdateCustomerCell, { NUMBER, TEXT } from "../../components/edit/UpdateCustomerCell";
import { notNull } from "../../helpers.jsx/Validation";
import { UPDATE_CUSTOMER, UPDATE_USER } from "../../services/Api";

const ViewCustomer = () => {

     const dispatch = useDispatch();
     const customerData = useSelector((state) => state.customers);
     const updateCustomer = useSelector((state) => state.updateCustomer);

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
          gasDataService.listenDataChange(() => {
               dispatch(fetchCustomerData());
          });
     }, []);

     useEffect(() => {
          if (updateCustomer.isSuccessful) {
               dispatch(fetchCustomerData());
          }
     });

     return (
          <div style={{
               width: "100%",
               overflow: "auto",
               padding: "10px",
          }}>
               <Stack direction="row" mb={1} spacing={1} justifyContent="flex-end">
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
                         // <TableHead>Action</TableHead>,
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
          <UpdateCustomerCell
               userId={data.user_id}
               custId={data.id}
               updateUser={false}
               key="Balance"
               name="Balance"
               type={NUMBER}
               text={`${data.Balance}₹`}
               value={data.Balance}
               table={UPDATE_CUSTOMER}
          />,
     ];
}
