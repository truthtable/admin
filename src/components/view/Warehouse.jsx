import { Button, Divider, Stack, Typography } from "@mui/joy";
import DataTable from "../table/DataTable.jsx";
import TableHead from "../table/TableHead.jsx";
import { BsPlus } from "react-icons/bs";

const Warehouse = () => {

     const fullCylinders = [
          ["Company 1", "100 kg",
               1
          ],
          ["Company 2", "200 kg", 2],
          ["Company 3", "300 kg", 3],
          ["Company 4", "400 kg", 4],
          ["Company 5", "500 kg", 5],
     ];
     const emptyCylinders = [
          ["Company 1", "100 kg", 1],
          ["Company 2", "200 kg", 2],
          ["Company 3", "300 kg", 3],
          ["Company 4", "400 kg", 4],
          ["Company 5", "500 kg", 5],
     ];
     return (
          <div
               style={{
                    width: "100%",
                    overflow: "auto",
                    padding: "10px",
               }}
          >
               <Stack
                    direction="row"
                    justifyContent="end"
                    alignItems="right"
                    spacing={1}
                    mb={1}
                    sx={{
                         width: "100%",
                    }}
               >
                    <Button
                         variant="soft"
                         startDecorator={
                              <BsPlus />
                         }
                    >
                         Add Cylinder
                    </Button>

               </Stack>

               <Stack
                    direction="row-reverse"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
               >
                    <div
                         style={{
                              flexGrow: 1,
                              backgroundColor: "#f5f5f5",
                         }}
                    >
                         <Button
                              sx={{
                                   width: "100%",
                                   borderRadius: "0px",
                                   backgroundColor: "#379777",
                                   color: "white",

                              }}
                         >
                              Full cylinders
                         </Button>
                        <DataTable thead={[
                            <TableHead>Company Name</TableHead>,
                            <TableHead>Weight</TableHead>,
                            <TableHead>Total</TableHead>,
                        ]} tbody={fullCylinders} loading={false}/>
                         <Button
                              sx={{
                                   width: "100%",
                                   borderRadius: "0px",
                                   backgroundColor: "#379777",
                                   color: "white",

                              }}
                         >
                              Total
                         </Button>
                    </div>
                    <div
                         style={{
                              flexGrow: 1,
                         }}
                    >
                         <Button
                              sx={{
                                   width: "100%",
                                   borderRadius: "0px",
                                   backgroundColor: "#FF9800",
                                   color: "white",
                              }}
                         >
                              Empty cylinders
                         </Button>
                         <DataTable
                              thead={[
                                   <TableHead>Company Name</TableHead>,
                                   <TableHead>Weight</TableHead>,
                                   <TableHead>Total</TableHead>,
                              ]}
                              tbody={emptyCylinders}
                              loading={false}
                         />
                         <Button
                              sx={{
                                   width: "100%",
                                   borderRadius: "0px",
                                   backgroundColor: "#FF9800",
                                   color: "white",
                              }}
                         >
                              Total
                         </Button>
                    </div>
               </Stack >
          </div >
     );
};
export default Warehouse;
