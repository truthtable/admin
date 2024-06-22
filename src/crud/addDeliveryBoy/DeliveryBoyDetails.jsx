import { Button, Input, Stack } from "@mui/joy";
import { BsSearch } from "react-icons/bs";
import DataTable from "../../components/table/DataTable";
import TableHead from "../../components/table/TableHead";

import { useDispatch, useSelector } from "react-redux";
import { fetchGetData } from "../../state/GetData";
import React, { useEffect, useState } from "react";
import { GET_COURIER_BOY_DATA } from "../../services/Api";

export default function DeliveryBoyDetails() {
     const dispatch = useDispatch();
     const data = useSelector((state) => state.getData);
     console.log(data);

     const rows = [];

     if (data.data !== null) {
          if (data.data.data.length > 0) {
               data.data.data.forEach((item) => {
                    rows.push(makeRow(item));
               });
          }
     }

     useEffect(() => {
          console.log("useEffect");
          dispatch(fetchGetData(GET_COURIER_BOY_DATA));
     }, []); // Add an empty dependency array here

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
                         <TableHead>User Name</TableHead>,
                         <TableHead>Password</TableHead>,
                         // <TableHead>Expense</TableHead>,
                         // <TableHead>Truck</TableHead>,
                    ]}
                    tbody={rows}
               />
          </div>
     );
}

function makeRow(item) {
     return [
          // item.name,
          item.name,
          item.password,
          // item.expense,
          // item.truck,
     ];
}
