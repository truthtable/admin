import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box, Input, LinearProgress, Button, ListItemContent, List, ListItem, ListItemButton, Divider, Stack } from "@mui/joy";

import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerSearchData } from "../../state/SearchCustomer";
import { updateDelivery } from "../../state/UpdateDelivery";
import { fetchDeliveryHistory } from "../../state/DeliveryAPI";

import React from "react";
import { json_to_x_www_form_urlencoded } from "../../state/UpdateGas";
import { notNull } from "../../helpers.jsx/Validation";

export const TEXT_INPUT = 0;
export const NUMBER_INPUT = 1;
export const BOOLEAN_INPUT = 2;
export const MULTIPLE_CHOICE = 3;

export const CUSTOMER = 4;
export const GAS = 5;
export const RECEVIED_GAS = 6;
export const GAS_QUANTITY = 7;
export const RECEVIED_GAS_QUANTITY = 8;
export const AMOUNT = 9;
export const CLEAR_MISTAKE = 10;

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
     let searchData = []
     if (notNull(searchCustomerData.data)) {
          searchData = searchCustomerData.data;
     }

     let customer_search_input = value;
     const handleSearchCustomer = () => {
          setLoading(true)
          dispatch(fetchCustomerSearchData(customer_search_input));
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
                    fetchCustomerSearchData(""),
               )
          }
     }

     //SEARCH CUSTOMER

     //GAS
     const gasData = useSelector((state) => state.gas);
     //filter go gas  
     let gasDataFiltered = [];
     if (gasData.data && type === GAS) {
          gasDataFiltered = gasData.data.data.filter((item) => item.company_name === "GO GASS");
     }

     const reset = () => {
          dispatch(
               updateDelivery({
                    reset: true,
               })
          );
     }


     let gas_value = value

     let backgroundColor = "transparent";
     if (bool) {
          backgroundColor = "#ff00007d";
     }

     let hoverColor = "rgb(75 112 245 / 25%)";
     if (disabled) {
          hoverColor = backgroundColor;
     }

     return (
          <>
               <Box
                    sx={{
                         //hover
                         padding: "0px",
                         // mx: "2px",
                         backgroundColor: backgroundColor,
                         transition: "background-color 0.3s",
                         "&:hover": {
                              backgroundColor: hoverColor,
                         },
                        height: "100%",
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

                         >
                              Change
                         </Typography>
                         <Divider sx={{
                              my: 1
                         }} />
                         <Box
                              sx={{
                                   fontWeight: "bold",
                              }}
                              className="rounded-md p-2 bg-gray-100 text-sm"
                         >{scr}</Box>
                         <Divider sx={{
                              my: 1
                         }} />
                         <Typography
                              component="span"
                              textColor="inherit"
                              fontWeight="lg"
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
                         {(type == CUSTOMER && notNull(searchData)) && <div>{
                              searchData.map(
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
                                                                 handleUpdate({ customer_id: item.id });
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
                         {type === GAS && <Stack
                              direction="column"
                              justifyContent="center"
                              alignItems="stretch"
                              spacing={1}
                         >
                              {gasDataFiltered.map((item, index) => (
                                   <Button
                                        variant="outlined"
                                        key={index}
                                        onClick={() => {
                                             handleUpdate({ gas_id: item.id });
                                        }}
                                   >
                                        {item.company_name} - {item.kg} kg
                                   </Button>
                              ))}
                         </Stack>}
                         {(type === RECEVIED_GAS && notNull(gasData.data) && notNull(gasData.data.data)) && <Stack
                              direction="column"
                              justifyContent="center"
                              alignItems="stretch"
                              spacing={1}
                         >
                              {
                                   gasData.data.data.map((item, index) => (
                                        <Button
                                             variant="outlined"
                                             key={index}
                                             onClick={() => {
                                                  handleUpdate({ received_cylinder: item.id });
                                             }}
                                        >
                                             {item.company_name} - {item.kg} kg
                                        </Button>
                                   ))
                              }
                         </Stack>
                         }
                         {type === GAS_QUANTITY && <Stack>
                              <Input

                                   defaultValue={gas_value}
                                   fullWidth
                                   type="number"
                                   sx={{ my: 2 }}
                                   onChange={(e) => {
                                        gas_value = e.target.value;
                                   }}
                              />
                              <Button
                                   onClick={() => {
                                        handleUpdate({ quantity: gas_value });
                                   }}
                              >Save</Button>
                         </Stack>
                         }
                         {
                              type === AMOUNT && <Stack>
                                   <Input

                                        defaultValue={gas_value}
                                        fullWidth
                                        type="number"
                                        sx={{ my: 2 }}
                                        onChange={(e) => {
                                             gas_value = e.target.value;
                                        }}
                                   />
                                   <Button
                                        onClick={() => {
                                             handleUpdate({ received_amount: gas_value });
                                        }}
                                   >Save</Button>
                              </Stack>
                         }
                         {type === RECEVIED_GAS_QUANTITY && <Stack>
                              <Input

                                   defaultValue={gas_value}
                                   fullWidth
                                   type="number"
                                   sx={{ my: 2 }}
                                   onChange={(e) => {
                                        gas_value = e.target.value;
                                   }}
                              />
                              <Button
                                   sx={{
                                        mt: 2
                                   }}
                                   onClick={() => {
                                        handleUpdate({ received_amount: gas_value });
                                   }}
                              >Save</Button>
                         </Stack>
                         }
                         {
                              (type === CLEAR_MISTAKE && bool) && <Stack>
                                   <Button
                                        onClick={() => {
                                             handleUpdate({ correction: 0 });
                                        }}
                                   >Clear Mistake</Button>
                              </Stack>
                         }
                         {
                              (type === CLEAR_MISTAKE && !bool) && <Stack>
                                   <Button
                                        onClick={() => {
                                             handleUpdate({ correction: 1 });
                                        }}
                                   >Mark Mistake</Button>
                              </Stack>
                         }
                         <div
                              style={{
                                   display: "flex",
                                   justifyContent: "flex-end",
                                   marginTop: "10px",
                              }}
                         >
                              <Button

                                   variant="soft"
                                   onClick={() => {
                                        setOpen(false);
                                        reset();
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
