import React from "react";
import {
     Box,
     Button,
     Card,
     Chip,
     CircularProgress,
     Stack,
     Table,
     Typography
} from "@mui/joy";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlants } from "../../redux/actions/plantsActions";
import { fetchGasData } from "../../state/GasList";
import { fetchOrders } from "../../redux/actions/purchaseOrderActions";
import { fetchWarehouses } from "../../redux/actions/warehouseActions";

const Warehouse = () => {
     const dispatch = useDispatch();

     const allGases = useSelector(state => state.gas);
     const { warehouses, loading, error } = useSelector(state => state.warehouses);

     //console.log({ warehouses });

     useEffect(() => {
          dispatch(fetchWarehouses());
          if (allGases.data === null) {
               dispatch(fetchGasData());
          }
     }, []);

     if (allGases.data === null || warehouses == null || warehouses.length === 0) {

          if (!loading && warehouses.length === 0) {
               return <Box
                    sx={{
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center",
                         height: "100%",
                         width: "100%",
                    }}>
                    <Typography variant="h5">No Data Available</Typography>
               </Box>
          }

          return <Box
               sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
               }}>
               <CircularProgress />
          </Box>
     }

     let rows = []

     let fullMap = new Map();
     let emptyMap = new Map();

     if (warehouses === null) return <span>Error</span>

     warehouses.forEach(warehouse => {
          if (warehouse.is_empty == 1) return
          fullMap.set(warehouse.gas_cylinder_id, warehouse.count)
     })

     warehouses.forEach(warehouse => {
          if (warehouse.is_empty == 0) return
          emptyMap.set(warehouse.gas_cylinder_id, warehouse.count)
     })

     //console.log(fullMap, emptyMap);

     allGases.data.data.forEach(gas => {
          let full = 0
          let empty = 0

          try {
               full = fullMap.get(gas.id)
               empty = emptyMap.get(gas.id)
          } catch (e) {
               full = 0
               empty = 0
          }
          rows.push(
               {
                    gasId: gas.id,
                    name: gas.company_name,
                    kg: gas.kg,
                    full_quantity: full,
                    empty_quantity: empty,
               }
          )
     });

     rows = rows.filter(
          (row) => (
               (row.empty_quantity != undefined && row.empty_quantity != null && row.empty_quantity != 0)
               || (row.full_quantity != undefined && row.full_quantity != null && row.full_quantity != 0)
          )
     )

     rows = rows.map((row) => {
          return {
               name: row.name,
               kg: row.kg,
               full_quantity: (row.full_quantity == undefined || row.full_quantity == null) ? 0 : row.full_quantity,
               empty_quantity: (row.empty_quantity == undefined || row.empty_quantity == null) ? 0 : row.empty_quantity,
          }
     })

     let totalFull = 0
     let totalEmpty = 0

     rows = rows.map((row, index) => {
          totalFull += row.full_quantity
          totalEmpty += row.empty_quantity
          return <tr key={index}>
               <td>{row.name}</td>
               <td>{row.kg} KG</td>
               <td>{row.full_quantity}</td>
               <td>{row.empty_quantity}</td>
          </tr>
     })

     return <Stack
          sx={{
               backgroundColor: "white",
               height: "100%",
               width: "100%",
               overflow: "auto",
               p: 1,
               borderRadius: "lg",
          }}
          direction="column"
          alignContent="flex-start"
          justifyContent="flex-start"
          alignItems="stretch"
          gap={1}
     >
          <Stack
               direction="row"
          >
               <Card
                    sx={{
                         p: 1,
                         m: 1,
                         backgroundColor: "#BDE8CA",
                         fontWeight: "bold",
                    }}
               >
                    <Stack mx={1} direction="row" alignContent={"center"} justifyContent="center" alignItems={"center"}>
                         Total&nbsp;Full&nbsp;:&nbsp;
                         <Chip size="lg" sx={{ backgroundColor: "#0D7C66", color: "white", fontWeight: "bold" }}>{totalFull}</Chip>
                    </Stack>
               </Card>
               <Card
                    sx={{
                         p: 1,
                         m: 1,
                         backgroundColor: "#F1F3C2",
                         fontWeight: "bold",
                    }}
               >
                    <Stack mx={1} direction="row" alignContent={"center"} justifyContent="center" alignItems={"center"}>
                         Total&nbsp;Empty&nbsp;:&nbsp;
                         <Chip size="lg" sx={{ backgroundColor: "#CD5C08", color: "white", fontWeight: "bold" }}>{totalEmpty}</Chip>
                    </Stack>
               </Card>
          </Stack>
          <Card
               sx={{
                    p: 0,
                    m: 0,
               }}
          >
               <Table
                    sx={{
                         fontWeight: "bold",
                         tableLayout: "fixed",
                         "& td, & tr": {
                              padding: .5,
                              paddingLeft: 1,
                              margin: 0,
                              //important to override mui default border
                              borderBottomWidth: 0,
                              height: "unset",
                         }
                    }}
               >
                    <thead>
                         <tr>
                              {
                                   ["Gas Name", "KG", "Full Quantity", "Empty quantity"]
                                        .map((label, index) => {
                                             return <th key={index} style={{ color: "white", backgroundColor: "#16423C", fontWeight: "bold" }}>{label}</th>
                                        })
                              }
                         </tr>
                    </thead>
                    <tbody>
                         {rows}
                    </tbody>
               </Table>
          </Card>
     </Stack>
};
export default Warehouse;