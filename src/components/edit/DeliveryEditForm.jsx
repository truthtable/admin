import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchGasData } from "../../state/GasList";
import { fetchCustomerSearchData } from "../../state/SearchCustomer";
import { updateDelivery } from "../../state/UpdateDelivery";
import {
     Box,
     Button,
     Modal,
     Sheet,
     Typography,
     Input,
     LinearProgress,
     List,
     ListItem,
     ListItemButton,
     ListItemContent,
     ModalClose,
     FormControl,
     FormLabel,
     RadioGroup,
     Radio,
     Stack,
     Divider,
} from "@mui/joy";

const DeliveryEditForm = () => {
     //set params from the location
     const prams = useLocation();
     if (prams.state === undefined || prams.state === null) {
          document.location.href = "/";
     }

     const [modalCustomerOpen, setModalCustomerOpen] = useState(false);
     const [modalGas, setModalGasOpen] = useState(false);
     const dispatch = useDispatch();
     const searchCustomerData = useSelector((state) => state.search_customer);
     const updateDeliveryData = useSelector(
          (state) => state.updateDeliveryData,
     );

     //console.log(updateDeliveryData);

     let customer_search_input = "";

     const data = prams.state.data;
     console.log(data);
     let {
          customer_id: { id: customerId, name: customerName, address },
          gas_id: { id: gasId, company_name: companyName, kg },
          quantity,
          received_amount: receivedAmount,
          received_cylinder: {
               id: receivedCylinderId,
               company_name: receivedCompanyName,
               kg: receivedKg,
          },
          received_cylinder_quantity: receivedCylinderQuantity,
          payment_method: paymentMethod,
          correction,
          courier_boy_id: { id: courierBoyId, name: courierBoyName },
     } = data;

     const [customer, setCustomer] = useState(`${customerName} : ${address}`);
     let gas = `${companyName} : ${kg} KG : Qty : ${quantity}`;
     let received_gas = `${receivedCompanyName} : ${receivedKg} KG : Qty : ${receivedCylinderQuantity}`;

     const fields = [
          {
               label: "Customer",
               value: customer,
               input: (
                    <Box>
                         <Button
                              size="lg"
                              variant="soft"
                              onClick={() => setModalCustomerOpen(true)}
                         >
                              Change
                         </Button>
                         <Modal
                              aria-labelledby="modal-title"
                              aria-describedby="modal-desc"
                              open={modalCustomerOpen}
                              onClose={() => setModalCustomerOpen(false)}
                              sx={{
                                   display: "flex",
                                   justifyContent: "center",
                                   alignItems: "center",
                              }}
                         >
                              <Sheet
                                   variant="outlined"
                                   sx={{
                                        maxWidth: 500,
                                        borderRadius: "md",
                                        p: 3,
                                        boxShadow: "lg",
                                   }}
                              >
                                   <ModalClose onClick={() => setModalCustomerOpen(false)} variant="plain" sx={{ m: 1 }} />
                                   <Typography
                                        component="h2"
                                        id="modal-title"
                                        level="h4"
                                        textColor="inherit"
                                        fontWeight="lg"
                                        mb={1}
                                   >
                                        Search Customer
                                   </Typography>
                                   <Box
                                        sx={{
                                             display: "flex",
                                        }}
                                   >
                                        <Input
                                             disabled={false}
                                             placeholder="Search"
                                             size="lg"
                                             variant="outlined"
                                             onChange={(e) => {
                                                  customer_search_input =
                                                       e.target.value;
                                             }}
                                        />
                                        <Button
                                             size="lg"
                                             variant="outlined"
                                             onClick={() => {
                                                  if (
                                                       customer_search_input !==
                                                       "" &&
                                                       customer_search_input.length >
                                                       1
                                                  ) {
                                                       dispatch(
                                                            fetchCustomerSearchData(
                                                                 customer_search_input,
                                                            ),
                                                       );
                                                  }
                                             }}
                                        >
                                             Search
                                        </Button>
                                   </Box>
                                   <LinearProgress
                                        color="primary"
                                        size="lg"
                                        variant="solid"
                                        sx={{
                                             display: searchCustomerData.isLoading
                                                  ? "block"
                                                  : "none",
                                        }}
                                   />
                                   {searchCustomerData.data.map(
                                        (item, index) => (
                                             <Box
                                                  key={index + "box"}
                                                  sx={{
                                                       overflow: "auto",
                                                  }}
                                             >
                                                  <List>
                                                       <ListItem
                                                            key={index + "list"}
                                                       >
                                                            <ListItemButton
                                                                 color="primary"
                                                                 selected={
                                                                      false
                                                                 }
                                                                 variant="soft"
                                                                 onClick={() => {
                                                                      customerId =
                                                                           item.id;
                                                                      setCustomer(
                                                                           `${item.name} : ${item.address}`,
                                                                      );
                                                                      setModalCustomerOpen(
                                                                           false,
                                                                      );
                                                                      dispatch(
                                                                           updateDelivery(
                                                                                {
                                                                                     data: {
                                                                                          customer_id:
                                                                                               customerId,
                                                                                          correction: 0,
                                                                                     },
                                                                                     id: data.id,
                                                                                },
                                                                           ),
                                                                      );
                                                                 }}
                                                            >
                                                                 <ListItemContent>
                                                                      <strong>
                                                                           {
                                                                                item.name
                                                                           }
                                                                      </strong>
                                                                      :
                                                                      {
                                                                           item.address
                                                                      }
                                                                      :
                                                                      {
                                                                           item.phone_no
                                                                      }
                                                                 </ListItemContent>
                                                            </ListItemButton>
                                                       </ListItem>
                                                  </List>
                                             </Box>
                                        ),
                                   )}
                              </Sheet>
                         </Modal>
                    </Box>
               ),
          },
          {
               label: "Gas",
               value: gas,
               input: (
                    <Box>
                         <Button size="lg" variant="soft" onClick={() => setModalGasOpen(true)}>
                              Change
                         </Button>
                         <Modal
                              aria-labelledby="modal-title"
                              aria-describedby="modal-desc"
                              open={modalGas}
                              onClose={() => setModalGasOpen(false)}
                              sx={{
                                   display: "flex",
                                   justifyContent: "center",
                                   alignItems: "center",
                              }}
                         >
                              <Sheet
                                   variant="outlined"
                                   sx={{
                                        maxWidth: 500,
                                        borderRadius: "md",
                                        p: 3,
                                        boxShadow: "lg",
                                   }}
                              >
                                   <ModalClose variant="plain" sx={{ m: 1 }} />
                                   <Typography
                                        component="h2"
                                        id="modal-title"
                                        level="h4"
                                        textColor="inherit"
                                        fontWeight="lg"
                                        mb={1}
                                   >
                                        Received Gas
                                   </Typography>
                                   <Box
                                        sx={{
                                             display: "flex",
                                             flexDirection: "column",
                                        }}
                                   >
                                        <Stack
                                             direction="row"
                                             justifyContent="center"
                                             alignItems="stretch"
                                             spacing={2}
                                        >
                                             <FormControl>
                                                  <FormLabel>Gas Name</FormLabel>
                                                  <RadioGroup defaultValue="outlined" name="radio-buttons-group">
                                                       <Radio value="outlined" label="Go Gas" orientation="vertical" size="lg" variant="solid" />
                                                       <Radio value="soft" label="Go Gas" orientation="vertical" size="lg" variant="solid" />
                                                       <Radio value="solid" label="Go Gas" orientation="vertical" size="lg" variant="solid" />
                                                       <Radio value="plain" label="Go Gas" orientation="vertical" size="lg" variant="solid" />
                                                  </RadioGroup>
                                             </FormControl>
                                             <Divider orientation="vertical" />
                                             <FormControl>
                                                  <FormLabel>Gas Kg</FormLabel>
                                                  <RadioGroup defaultValue="outlined" name="radio-buttons-group">
                                                       <Radio value="outlined" label="1" orientation="vertical" size="lg" variant="solid" />
                                                       <Radio value="soft" label="2" orientation="vertical" size="lg" variant="solid" />
                                                       <Radio value="solid" label="4" orientation="vertical" size="lg" variant="solid" />
                                                       <Radio value="plain" label="6" orientation="vertical" size="lg" variant="solid" />
                                                  </RadioGroup>
                                             </FormControl>

                                        </Stack>
                                        <Divider orientation="horizontal" />
                                        <FormControl sx={{ mt: 2 }}>
                                             <FormLabel>Gas Quantity</FormLabel>
                                             <Input
                                                  size="lg"
                                                  variant="outlined"
                                                  type="number"
                                                  placeholder="Enter Gas Quantity"

                                             />
                                        </FormControl>
                                        <Button
                                             sx={{ mt: 2 }}
                                             size="lg"
                                             variant="outlined"
                                             onClick={() => setModalGasOpen(false)}
                                        >
                                             Save
                                        </Button>
                                   </Box>
                              </Sheet>
                         </Modal>
                    </Box>
               ),
          },
          {
               label: "Received Gas",
               value: received_gas,
               input: (
                    <Box>
                         <Button size="lg" variant="soft" onClick={() => { }}>
                              Change
                         </Button>
                    </Box>
               ),
          },
          {
               label: "Received Amount",
               value: receivedAmount,
               input: (
                    <Box>
                         <Button size="lg" variant="soft" onClick={() => { }}>
                              Change
                         </Button>
                    </Box>
               ),
          },
     ];

     return (
          <Box>
               <table className="hidden md:block lg:block w-full">
                    <tbody>
                         {fields.map(({ label, value, input }) => (
                              <tr key={label}>
                                   <td>{label}</td>
                                   <td>{value}</td>
                                   <td>{input}</td>
                              </tr>
                         ))}
                    </tbody>
               </table>
               <Button onClick={() => { }}>Close</Button>
          </Box>
     );
};

export default DeliveryEditForm;
