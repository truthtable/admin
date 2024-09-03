/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Box, Chip, LinearProgress, Stack, Tab, Table, TabList, TabPanel, Tabs } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveries } from "../../redux/actions/deliveryActions";

export default function deliveryHistory() {
     const dispatch = useDispatch();
     const { deliveries, loading } = useSelector((state) => state.deliverys);
     useEffect(() => {
          if (deliveries == null || deliveries.length == 0) {
               dispatch(fetchDeliveries());
          }
     }, []);
     let deliveryRows = [];
     deliveries.forEach(delivery => {
          delivery.gas_deliveries.forEach(gasDeliverie => {
               deliveryRows.push(
                    <tr key={"delivery_" + delivery.id + "_" + gasDeliverie.id}>
                         <td>{gasDeliverie.gas_id}</td>
                    </tr>
               )
          })
     });
     return <Box sx={{ height: "100%", width: "100%", backgroundColor: "white", borderRadius: "lg", overflow: "auto" }}>
          <Stack
               sx={{
                    height: "100%",
                    width: "100%",
               }}
          >
               <Box><LinearProgress color="primary" variant="soft" sx={{ backgroundColor: "transparent", m: .5, display: loading ? "block" : "none" }} /></Box>
               <Tabs aria-label="Basic tabs" defaultValue={0} >
                    <TabList>
                         <Tab>All Deliveries</Tab>
                         <Tab>
                              Correction Deliveries
                              <Chip color="danger" variant="solid" size="sm">
                                   {0}
                              </Chip>
                         </Tab>
                    </TabList>
                    <TabPanel sx={{ p: 0, m: 0 }} value={0}>
                         <TableUI head={[]} body={deliveryRows} />
                    </TabPanel>
                    <TabPanel sx={{ p: 0, m: 0 }} value={1}>
                         <TableUI head={[]} body={[]} />
                    </TabPanel>
               </Tabs>
          </Stack>
     </Box>
}
const TableUI = ({ head, body }) => {
     return <Table>
          <thead>
               {head}
          </thead>
          <tbody>
               {body}
          </tbody>
     </Table>
}