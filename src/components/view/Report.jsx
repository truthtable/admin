import React, { useEffect } from "react";
import { Button, Divider, Input, LinearProgress, Option, Select, Stack } from "@mui/joy";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from "../../redux/actions/customerActions";
import { fetchReport } from "../../redux/actions/reportActions";

const CUSTOMER = "customer";
const DELIVERY = "delivery";

export const Report = () => {
     const currentUrl = window.location.href;
     const hashIndex = currentUrl.indexOf('#');
     const hashPart = currentUrl.substring(hashIndex + 1);
     const url = new URL(hashPart, window.location.origin);
     const searchParams = new URLSearchParams(url.search);

     const [selected, setSelected] = React.useState(CUSTOMER);

     const dispatch = useDispatch();

     const {
          customersLoading,
          customers,
          customersError
     } = useSelector((state) => state.customer);

     const {
          reportLoading,
          report,
          reportError
     } = useSelector((state) => state.reports);

     console.log({
          reportLoading,
          report,
          reportError
     });

     const Customer = () => {
          const [selectedCustomer, setSelectedCustomer] = React.useState(Number(searchParams.get('customer')) || null);

          const [startDate, setStartDate] = React.useState(() => {
               if (searchParams.get('start_date')) {
                    return searchParams.get('start_date');
               } else {
                    const now = new Date();
                    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                    const formattedDate = startOfMonth.toLocaleDateString('en-GB').split('/').reverse().join('-');
                    return formattedDate;
               }
          });

          const [endDate, setEndDate] = React.useState(() => {
               if (searchParams.get('end_date')) {
                    return searchParams.get('end_date');
               } else {
                    const now = new Date();
                    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                    const formattedDate = endOfMonth.toLocaleDateString('en-GB').split('/').reverse().join('-');
                    return formattedDate;
               }
          });

          const handleSubmit = () => {
               console.log(selectedCustomer, startDate, endDate);
               if (
                    selectedCustomer === undefined ||
                    selectedCustomer === null ||
                    startDate === undefined ||
                    startDate === null ||
                    !checkValidDate(startDate) ||
                    endDate === undefined ||
                    endDate === null ||
                    !checkValidDate(endDate)
               ) {
                    alert("Please select valid customer and date range");
                    return;
               }
               let url = window.location.href;
               url = url.split("?")[0];
               url = url + `?customer=${selectedCustomer}&start_date=${startDate}&end_date=${endDate}`;
               window.location.href = url;

               // Fetch report data
               dispatch(fetchReport({ customer: selectedCustomer, startDate: startDate, endDate: endDate }));
          };

          useEffect(() => {
               if (customers.length === 0 && !customersLoading) {
                    dispatch(fetchCustomers());
               }
          }, []);

          return (
               <Stack sx={{ width: "100%", height: "100%", padding: 1 }} direction={"row"} gap={1}>
                    <Stack gap={1}>
                         <Stack>
                              <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                   <span style={{ fontWeight: "bold", color: "black" }}>Customer&nbsp;:&nbsp;</span>
                                   <Select
                                        placeholder="Select User"
                                        variant="outlined"
                                        sx={{ width: "100%" }}
                                        onChange={(event, value) => {
                                             setSelectedCustomer(value);
                                        }}
                                        defaultValue={selectedCustomer}
                                   >
                                        {customers.map((customer, index) => (
                                             <Option key={index} value={customer.id}>
                                                  {customer.user.name} : <span> {customer.user.address}</span>
                                             </Option>
                                        ))}
                                   </Select>
                              </Stack>
                         </Stack>
                         <Divider sx={{ backgroundColor: "#979797" }} />
                         <Stack>
                              <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                   <span style={{ fontWeight: "bold", color: "black" }}>Date&nbsp;Start&nbsp;:&nbsp;</span>
                                   <Input
                                        type="date"
                                        sx={{ width: "100%" }}
                                        onChange={(event) => {
                                             setStartDate(event.target.value);
                                        }}
                                        defaultValue={startDate}
                                   />
                              </Stack>
                         </Stack>
                         <Stack>
                              <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                   <span style={{ fontWeight: "bold", color: "black" }}>End&nbsp;Start&nbsp;:&nbsp;</span>
                                   <Input
                                        type="date"
                                        sx={{ width: "100%" }}
                                        onChange={(event) => {
                                             setEndDate(event.target.value);
                                        }}
                                        defaultValue={endDate}
                                   />
                              </Stack>
                         </Stack>
                         <Divider sx={{ backgroundColor: "#979797" }} />
                         <Button
                              variant="contained"
                              sx={{ backgroundColor: "#263043", color: "white", width: "100%" }}
                              onClick={() => handleSubmit()}
                         >
                              OK
                         </Button>
                    </Stack>
                    <Divider orientation={"vertical"} sx={{ m: 1, backgroundColor: "#979797" }} />
                    <Stack>dsfds</Stack>
               </Stack>
          );
     };

     const DeliveryBoy = () => {
          return (
               <Stack sx={{ width: "100%", height: "100%" }}>
                    Delivery reports
               </Stack>
          );
     };

     return (
          <Stack sx={{ height: "100%", width: "100%", borderRadius: "16px", backgroundColor: "white", padding: 1 }}>
               <LinearProgress sx={{ display: (reportLoading || customersLoading) ? "block" : "none" }} />
               <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    <Button variant="soft" onClick={() => setSelected(CUSTOMER)}>
                         Customer
                    </Button>
                    <Button variant="soft" onClick={() => setSelected(DELIVERY)}>
                         Delivery Boy
                    </Button>
               </Stack>
               <Divider sx={{ m: 1, backgroundColor: "#979797" }} />
               {selected === CUSTOMER && <Customer />}
               {selected === DELIVERY && <DeliveryBoy />}
          </Stack>
     );
};

function checkValidDate(date) {
     return date.match(/^\d{4}-\d{2}-\d{2}$/);
}