import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box, Input, LinearProgress, Button, ListItemContent, List, ListItem, ListItemButton } from "@mui/joy";

import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchGasData } from "../../state/GasList";
import { fetchCustomerData } from "../../state/SearchCustomer";
import { updateDelivery } from "../../state/UpdateDelivery";
import { fetchDeliveryHistory } from "../../state/DeliveryAPI";
import React from "react";
import { json_to_x_www_form_urlencoded } from "../../state/UpdateGas";

export const TEXT_INPUT = 0;
export const NUMBER_INPUT = 1;
export const BOOLEAN_INPUT = 2;
export const MULTIPLE_CHOICE = 3;

export const CUSTOMER = 4;

export const UpdateDeliveryCell = (props) => {
     const dispatch = useDispatch();
     const { text, value, bool, disabled, src, inputTitle, type, id } = props;
     const [open, setOpen] = React.useState(false);
     const [loading, setLoading] = React.useState(false);
     const scr = src.split("/n").map(function (item, idx) {
          return <p key={idx}>{item}</p>;
     });

     //CUSTOMER
     const searchCustomerData = useSelector((state) => state.search_customer);
     let customer_search_input = value;
     const handleSearchCustomer = () => {
          setLoading(true)
          dispatch(fetchCustomerData(customer_search_input));
     };
     const handleUpdate = (data) => {
          dispatch(updateDelivery({
               id: id,
               data: data,
          }));
     }
     const updateDeliveryData = useSelector((state) => state.updateDeliveryData);
     if (open) {
          if (updateDeliveryData.isSuccessful) {
               setOpen(false);
               dispatch(
                    updateDelivery({
                         reset: true,
                    }),
                    fetchDeliveryHistory(),
                    fetchCustomerData("")
               )
          }
     }
     //GAS
     return (
          <>
               <Box
                    sx={{
                         //hover
                         padding: "0px",
                         // mx: "2px",
                         backgroundColor: bool ? "#ff00007d" : "transparent",
                         transition: "background-color 0.3s",
                         "&:hover": {
                              backgroundColor: "rgb(75 112 245 / 25%)",
                         },
                    }}
               >
                    <Button
                         onClick={() => setOpen(true)}
                         disabled={disabled}
                         style={{
                              flexGrow: 1,
                              width: "100%",
                              height: "100%",
                              margin: "0px",
                              paddingTop: "0px",
                              paddingBottom: "0px",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                              borderRadius: "0px",
                              color: "black",
                              backgroundColor: "transparent",
                              whiteSpace: "nowrap",
                              //hover
                         }}
                    >
                         {props.text}
                    </Button>
               </Box>

               <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={() => setOpen(false)}
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
                              overflow: "auto",
                              boxShadow: "lg",
                              maxHeight: "100vh"
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
                              Change
                         </Typography>
                         <Box mb={2}>{scr}</Box>
                         <Typography
                              component="span"
                              textColor="inherit"
                              fontWeight="lg"
                              mb={1}
                         >
                              {inputTitle}
                         </Typography>
                         <LinearProgress
                              sx={{
                                   display: (searchCustomerData.isLoading || updateDeliveryData.isLoading) ? "block" : "none",
                                   marginTop: "10px",
                              }}
                         />
                         {type === CUSTOMER && (
                              <Input
                                   placeholder={text}
                                   defaultValue={value}
                                   fullWidth
                                   sx={{ mb: 2 }}
                                   onChange={(e) => {
                                        customer_search_input = e.target.value;
                                   }}
                              />
                         )}
                         {type === CUSTOMER && <Button
                              onClick={handleSearchCustomer}
                         >Search</Button>}
                         {type == CUSTOMER && <div>{searchCustomerData.data.map(
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
                                                            handleUpdate({ customer_id: item.id, correction: 0 });
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
                         )}</div>}

                         <div
                              style={{
                                   display: "flex",
                                   justifyContent: "flex-end",
                                   marginTop: "10px",
                              }}
                         >
                              <Button
                                   onClick={() => {

                                   }}
                              >
                                   Back
                              </Button>
                         </div>
                    </Sheet>
               </Modal>
          </>
     );
};
