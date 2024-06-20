import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box, Input, LinearProgress, Button, ListItemContent, List, ListItem, ListItemButton, Divider, Stack } from "@mui/joy";

import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
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
export const GAS = 5;
export const RECEVIED_GAS = 6;
export const GAS_QUANTITY = 7;
export const RECEVIED_GAS_QUANTITY = 8;

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
                    fetchCustomerData(""),
               )
          }
     }
     //GAS
     const gasData = useSelector((state) => state.gas);
     /*
     [
    {
        "id": 1,
        "company_name": "jio",
        "kg": 9,
        "price": 100,
        "created_at": "2024-03-26T11:04:53.000000Z",
        "updated_at": "2024-06-17T04:05:58.000000Z"
    },
    {
        "id": 2,
        "company_name": "GO GASS",
        "kg": 12,
        "price": 870,
        "created_at": "2024-03-26T11:05:44.000000Z",
        "updated_at": "2024-03-26T11:05:44.000000Z"
    },
    {
        "id": 3,
        "company_name": "GO GASS",
        "kg": 15,
        "price": 33,
        "created_at": "2024-03-26T11:05:55.000000Z",
        "updated_at": "2024-06-17T07:51:39.000000Z"
    },
    {
        "id": 4,
        "company_name": "GO GASS",
        "kg": 17,
        "price": 445,
        "created_at": "2024-03-26T11:06:05.000000Z",
        "updated_at": "2024-06-17T07:51:52.000000Z"
    },
    {
        "id": 5,
        "company_name": "GO GASS",
        "kg": 21,
        "price": 999,
        "created_at": "2024-03-26T11:06:14.000000Z",
        "updated_at": "2024-06-17T04:07:16.000000Z"
    },
    {
        "id": 6,
        "company_name": "RELIANCE",
        "kg": 12,
        "price": 5645,
        "created_at": "2024-03-26T11:06:48.000000Z",
        "updated_at": "2024-06-17T07:52:04.000000Z"
    }
]
     */
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
     let gas_quantity = value
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
                         {type === RECEVIED_GAS && <Stack>
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
                                   placeholder={gas_quantity}
                                   defaultValue={gas_quantity}
                                   fullWidth
                                   sx={{ my: 2 }}
                                   onChange={(e) => {
                                        gas_quantity = e.target.value;
                                   }}
                              />
                              <Button
                                   onClick={() => {
                                        handleUpdate({ quantity: gas_quantity });
                                   }}
                              >Save</Button>
                         </Stack>
                         }
                         {type === RECEVIED_GAS_QUANTITY && <Stack>
                              <Input
                                   placeholder={gas_quantity}
                                   defaultValue={gas_quantity}
                                   fullWidth
                                   sx={{ my: 2 }}
                                   onChange={(e) => {
                                        gas_quantity = e.target.value;
                                   }}
                              />
                              <Button
                                   onClick={() => {
                                        handleUpdate({ received_cylinder_quantity: gas_quantity });
                                   }}
                              >Save</Button>
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
