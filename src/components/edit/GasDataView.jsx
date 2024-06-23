import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GAS_DATA, UPDATE_GAS } from "../../services/Api";
import { fetchGetData } from "../../state/GetData";
import DataTable from "../table/DataTable";
import TableHead from "../table/TableHead";
import UpdateCustomerCell, { TEXT } from "./UpdateCustomerCell";
const GasDataView = () => {

     const dispatch = useDispatch();
     const data = useSelector((state) => state.getData);
     const update = useSelector((state) => state.updateCustomer);

     console.log(data);

     let rows = [];

     if (data.data !== null) {
          if (data.data.data.length > 0) {
               data.data.data.forEach((item) => {
                    rows.push([
                         // <UpdateCustomerCell
                         //      updateUser={false}
                         //      key={item.id}
                         //      userId={item.id}
                         //      custId={item.id}
                         //      text={item.company_name}
                         //      value={item.company_name}
                         //      type={TEXT}
                         //      table={UPDATE_GAS}
                         //      name="company_name"
                         // />
                         item.company_name,
                         item.kg + " kg",
                         // item.price + "₹",
                         <UpdateCustomerCell
                              updateUser={false}
                              key={item.id}
                              userId={item.id}
                              custId={item.id}
                              text={item.price + "₹"}
                              value={item.price}
                              type={TEXT}
                              table={UPDATE_GAS}
                              name="price"
                         />
                    ]);
               });
          }
     }

     useEffect(() => {
          if (data.data == null || data.url != GAS_DATA) {
               dispatch(fetchGetData(GAS_DATA))
          }
          if (update.isSuccessful) {
               dispatch(fetchGetData(GAS_DATA));
          }
     });

     return (
          <div
               style={{
                    width: "100%",
                    overflow: "auto",
                    padding: "10px",
               }}
          >
               <DataTable
                    thead={[
                         <TableHead>Company Name</TableHead>,
                         <TableHead>Weight</TableHead>,
                         <TableHead>Price</TableHead>,
                    ]}
                    tbody={rows}
                    loading={data.isLoading}
               />
          </div >
     )
}
export default GasDataView;