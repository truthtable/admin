import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GAS_DATA, UPDATE_GAS, URL } from "../../services/Api.jsx";
import { fetchGetData } from "../../state/GetData.jsx";
import DataTable from "../table/DataTable.jsx";
import TableHead from "../table/TableHead.jsx";
import UpdateCustomerCell, { TEXT } from "../edit/UpdateCustomerCell.jsx";
import { Box, Button, Card, CardContent, Chip, Divider, Stack, Typography, Modal, ModalClose, ModalDialog } from "@mui/joy";
import PropTypes from 'prop-types';
import { RiAddFill } from "react-icons/ri";
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
                         // <UpdateCustomerCell
                         //      updateUser={false}
                         //      key={item.id}
                         //      userId={item.id}
                         //      custId={item.id}
                         //      text={item.price + "₹"}
                         //      value={item.price}
                         //      type={TEXT}
                         //      table={UPDATE_GAS}
                         //      name="price"
                         // />
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
               {/* <DataTable
                    thead={[
                         <TableHead>Company Name</TableHead>,
                         <TableHead>Weight</TableHead>,
                         // <TableHead>Price</TableHead>,
                    ]}
                    tbody={rows}
                    loading={data.isLoading}
               /> */}
               <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                         display: 'flex',
                         justifyContent: 'end',

                    }}
               >
                    <Button
                         startDecorator={
                              <RiAddFill />
                         }
                    >
                         Add Gas
                    </Button>
               </Stack>
               <Box
                    sx={{
                         display: 'flex',
                         justifyContent: 'center',
                         flexWrap: 'wrap',
                         gap: 1,
                         marginTop: 1
                    }}
               >
                    <GasCard name={"Go Gsa"} />
                    <GasCard name={"Hp"} />
                    <GasCard name={"Jio"} />
                    <GasCard name={"Tata"} />
               </Box>

          </div >
     )
}
export default GasDataView;

const GasCard = ({
     name,
     children
}) => {

     GasCard.propTypes = {
          name: PropTypes.string.isRequired,
          children: PropTypes.node
     }

     const weights = [1, 2];

     const [open, setOpen] = useState(false);

     return (
          <>
               <Card
                    sx={{
                         width: 200,
                         backgroundColor: getColor(name.charAt(0)),
                         color: 'white',
                         //hover
                         transition: 'all 0.2s',
                         '&:hover': {
                              cursor: 'pointer',
                              transform: 'scale(1.05)',
                              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                         },
                    }}
                    variant="soft"
                    onClick={() => setOpen(true)}
               >
                    <CardContent>
                         <Typography variant="h5" component="h2"
                              sx={{
                                   textAlign: 'center',
                                   color: 'white'
                              }}
                         >
                              <strong>{name}</strong>
                         </Typography>
                         <Divider sx={{ backgroundColor: 'white', marginBottom: 1.5 }} />
                         <Box
                              sx={{
                                   display: 'flex',
                                   justifyContent: 'center',
                                   flexWrap: 'wrap',
                                   gap: 1,

                              }}
                         >
                              {
                                   weights.map((weight, index) => {
                                        return (
                                             <Chip size="lg"
                                                  variant="soft" sx={{
                                                       backgroundColor: 'white',
                                                       color: getColor(name.charAt(0)),

                                                  }} key={index} ><strong>{weight + " kg"}</strong></Chip>
                                        )
                                   })
                              }
                         </Box>
                         {children}
                    </CardContent>
               </Card>
               <Modal
                    open={open}
                    onClose={() => setOpen(false)}
               >
                    <ModalDialog variant="outlined">
                         <ModalClose />
                         <Typography>{name} : Add or Remove Kg</Typography>
                    </ModalDialog>
               </Modal>
          </>
     )
}

//funtion to color gasCard with background color, with white text give random color as material color theory
function getColor(seed) {
     //list of material color

     const colors = [
          "#f44336",
          "#e91e63",
          "#9c27b0",
          "#673ab7",
          "#3f51b5",
          "#2196f3",
          "#03a9f4",
          "#00bcd4",
          "#009688",
          "#4caf50",
          "#8bc34a",
          "#cddc39",
          "#ffeb3b",
          "#ffc107",
          "#ff9800",
          "#ff5722",
          "#795548",
     ]
     //use seed to get random color
     const random = seed.charCodeAt(0) % colors.length;
     return colors[random];
}