import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box } from "@mui/joy";

export default function UpdateData(props) {
     const [open, setOpen] = React.useState<boolean>(false);
     return (
          <>
               <Box
                    sx={{
                         //hover
                         padding: "0px",
                         mx: "2px",
                         backgroundColor: "lightred",
                         "&:hover": {
                              backgroundColor: "rgb(75 112 245 / 25%)",
                         },
                    }}
               >
                    <Button
                         onClick={() => setOpen(true)}
                         disabled={props.disabled}
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
                              This is the modal title
                         </Typography>
                         <Typography id="modal-desc" textColor="text.tertiary">
                              Make sure to use <code>aria-labelledby</code> on
                              the modal dialog with an optional{" "}
                              <code>aria-describedby</code> attribute.
                         </Typography>
                    </Sheet>
               </Modal>
          </>
     );
}
