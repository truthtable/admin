import { Sheet, Typography, ModalClose, Modal, Box, Input, LinearProgress, Button, ListItemContent, List, ListItem, ListItemButton, Divider, Stack, Table } from "@mui/joy";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

export const NAME = "name";
export const ADDRESS = "address";
export const PHONE = "phone";

export const TEXT = "text";
export const NUMBER = "number";

export default function UpdateCustomerCell({ userId, custId, text, type, name, value }) {

     //Capitalized the first letter of the name and removed the underscore
     const src = name.charAt(0).toUpperCase() + name.slice(1).replace("_", " ");

     let inputValue = value;

     const [open, setOpen] = useState(false);

     const handleUpdate = () => {
          console.log(userId, custId, name, inputValue);
     }

     return (
          <>
               <Box
                    sx={{
                         padding: "0px",
                         margin: "0px",
                         backgroundColor: "transparent",
                         mx: "2px",
                         transition: "background-color 0.3s",
                         "&:hover": {
                              backgroundColor: "rgb(75 112 245 / 25%)",
                         },
                         pl: 1

                    }}>
                    <Button
                         style={{
                              flexGrow: 1,
                              width: "100%",
                              height: "100%",
                              margin: "0px",
                              padding: "0px",
                              borderRadius: "0px",
                              color: "black",
                              backgroundColor: "transparent",
                              whiteSpace: "nowrap",
                              textAlign: "left",
                              disabled: true,
                              justifyContent: "flex-start"
                         }}
                         onClick={() => {
                              setOpen(true);
                         }}
                    >
                         {text}
                    </Button>
               </Box >
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

                         <Typography
                              component="span"
                              textColor="inherit"
                              fontWeight="lg"
                         >
                              {src}
                         </Typography>
                         <LinearProgress
                              sx={{
                                   display: (false) ? "block" : "none",
                                   marginTop: "10px",
                              }}
                         />
                         {/* {
                              (type === TEXT && (name == NAME || name == ADDRESS || name == PHONE)) && ( */}
                         <Input
                              variant="soft"
                              placeholder={text}
                              type={type}
                              sx={{
                                   marginTop: "10px",
                              }}

                              onChange={(e) => {
                                   inputValue = e.target.value;
                              }}
                         />
                         {/* )
                         } */}
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
                                   }}
                              >
                                   Cancel
                              </Button>
                              <Button

                                   variant="solid"
                                   onClick={handleUpdate}
                                   sx={{
                                        ml: 1
                                   }}
                              >
                                   Save
                              </Button>
                         </div>
                    </Sheet>
               </Modal>
          </>
     );
}