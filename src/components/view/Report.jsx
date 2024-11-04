import React from "react"
import { Button, Divider, Input, Option, Select, Stack } from "@mui/joy"

const CUSTOMER = "customer";
const DELIVERY = "delivery";

export const Report = () => {
     const [selected, setSelected] = React.useState(CUSTOMER);
     const Customer = () => {

          const [selectedCustomer, setSelectedCustomer] = React.useState();

          //set state current month start date
          const [startDate, setStartDate] = React.useState(() => {
               const now = new Date();
               const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
               const formattedDate = startOfMonth.toLocaleDateString('en-GB').split('/').reverse().join('-');
               return formattedDate;
          });
          //set state current month end date
          const [endDate, setEndDate] = React.useState(() => {
               const now = new Date();
               const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
               const formattedDate = endOfMonth.toLocaleDateString('en-GB').split('/').reverse().join('-');
               return formattedDate;
          });

          const handeSubmit = () => {
               console.log(
                    selectedCustomer,
                    startDate,
                    endDate
               );
          }

          return (
               <Stack
                    sx={{
                         width: "100%",
                         height: "100%",
                         padding: 1,
                    }}
                    direction={"row"}
                    gap={1}
               >
                    <Stack
                         gap={1}
                    >
                         <Stack>
                              <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                   <span style={{ fontWeight: "bold", color: "black" }}>Customer&nbsp;:&nbsp;</span>
                                   <Select
                                        placeholder="Select User"
                                        variant="outlined"
                                        sx={{ width: "100%" }}
                                        onChange={(event, value) => {
                                             setSelectedCustomer(value)
                                        }}
                                   >
                                        <Option value={1}>Customer1</Option>
                                        <Option value={2}>Customer2</Option>
                                   </Select>
                              </Stack>
                         </Stack>
                         <Divider sx={{ backgroundColor: "#979797" }} />
                         <Stack>
                              <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                   <span style={{ fontWeight: "bold", color: "black" }}>Date&nbsp;Start&nbsp;:&nbsp;</span>
                                   <Input type="date" sx={{ width: "100%" }}
                                        onChange={(event) => {
                                             setStartDate(event.target.value)
                                        }}
                                        defaultValue={startDate}
                                   />
                              </Stack>
                         </Stack>
                         <Stack>
                              <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                   <span style={{ fontWeight: "bold", color: "black" }}>End&nbsp;Start&nbsp;:&nbsp;</span>
                                   <Input type="date" sx={{ width: "100%" }}
                                        onChange={(event) => {
                                             setEndDate(event.target.value)
                                        }}
                                        defaultValue={endDate}
                                   />
                              </Stack>
                         </Stack>
                         <Divider sx={{ backgroundColor: "#979797" }} />
                         <Button
                              variant="contained"
                              sx={{
                                   backgroundColor: "#263043",
                                   color: "white",
                                   width: "100%",
                              }}
                              onClick={() => handeSubmit()}
                         >OK</Button>
                    </Stack>
                    <Divider orientation={"vertical"} sx={{ m: 1, backgroundColor: "#979797" }} />
                    <Stack>
                         dsfds
                    </Stack>
               </Stack>
          )
     }

     const DeliveryBoy = () => {
          return (
               <Stack
                    sx={{
                         width: "100%",
                         height: "100%",
                    }}
               >
                    Delivery reports
               </Stack>
          )
     }

     return <Stack>
          <span style={{ fontWeight: "bold", color: "white" }}>Updating soon..</span>
     </Stack>

     // return <Stack
     //      sx={{
     //           height: "100%",
     //           width: "100%",
     //           borderRadius: "16px",
     //           backgroundColor: "white",
     //           padding: 1,
     //      }}
     // >
     //      <Stack
     //           sx={{
     //                display: "flex",
     //                flexDirection: "row",
     //                gap: 1,
     //           }}
     //      >
     //           <Button
     //                variant="soft"
     //                onClick={() => setSelected(CUSTOMER)}
     //           >
     //                Customer
     //           </Button>
     //           <Button
     //                variant="soft"
     //                onClick={() => setSelected(DELIVERY)}
     //           >
     //                Delivery Boy
     //           </Button>
     //      </Stack>
     //      <Divider
     //           sx={{ m: 1, backgroundColor: "#979797" }}
     //      />
     //      {selected === CUSTOMER && <Customer />}
     //      {selected === DELIVERY && <DeliveryBoy />}
     // </Stack>
}

const colorList = [
     "#000B58",
     "#740938",
     "#3D5300",
     "#3B1E54",
     "#EB8317",
     "#640D5F",
     "#1A1A1A",
]

function getRandomColorWithSeed(seed) {
     return colorList[seed % colorList.length]
}