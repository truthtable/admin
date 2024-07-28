
import {Box, Button, Chip, Divider, List, ListDivider, ListItem, ListItemContent, Stack, Typography} from "@mui/joy";
import React, {useState} from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import {RxCross2} from "react-icons/rx";
import {CgAdd} from "react-icons/cg";

export default function EditGasList({gasList, correction,allgasList}) {
    const [openModel, setOpenModel] = useState(false);
    const [gasListState,setGasListState] = useState(gasList);
    const makeGasListUI = (gaslist,correction) => {
        let backgroundColor = "transparent";
        if (correction) {
            backgroundColor = "#ff00007d";
        }
        let hoverColor = "rgb(75 112 245 / 25%)";
        return <List
        >
            {gasListState.map((gas, index) => {
                return <ListItem sx={{
                    margin : 0,
                    px   : 1,
                    width: "100%",

                }} key={index}>
                    <ListItemContent
                        sx={{
                            width: "100%",
                        }}>
                       {
                            makeText(gas)
                        }

                    </ListItemContent>
                </ListItem>
            })}
        </List>
    }
    const makeText = (gas) =>{
        // return `Gas:${gas.company_name} | ${gas.kg}KG | ${(gas.price == 0) ? "":`Rate :  ${gas.price}₹ | `} Qty:${gas.quantity}`
        return <Chip
                color="primary"
                variant="solid"
                color={gas.price == 0 ? "warning" : "success"}
                sx={{
                    width: "100%",
                }}
            >
                {`Gas:${gas.company_name} ${gas.kg}KG - ${(gas.price == 0) ? "":`${gas.price}₹ x `} Qty:${gas.quantity} ${(gas.price == 0) ? "":` = ${gas.price*gas.quantity}₹`}`}
            </Chip>
    }
    let hoverColor = "rgb(75 112 245 / 25%)";
    console.log(correction)
    return (
        <Box
            sx={{
                backgroundColor: correction ? "#ff00007d" : "transparent",
                transition: "background-color 0.3s",
                height: "100%",
                "&:hover": {
                    backgroundColor: hoverColor,
                },
                cursor: "pointer",
            }}
        >
            <Button
            onClick={() => setOpenModel(true)}
            style={{
                flexGrow: 1,
                width: "100%",
                height: "100%",
                margin: "0px",
                paddingTop: "0px",
                paddingBottom: "0px",
                paddingLeft: "0px",
                paddingRight: "0px",
                borderRadius: "0px",
                color: "black",
                backgroundColor: "transparent",
                whiteSpace: "nowrap",
                //hover
            }}
        >
            {makeGasListUI(gasList, correction)}
        </Button>
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={openModel}
            onClose={() => setOpenModel(false)}
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
                    Change Gas List
                </Typography>
                <Divider sx={{
                    my: 1
                }} />
                {gasListState.map((gas, index) => {
                    return <ListItem key={index}
                                     onClick={() => {
                                            let newGasList = [...gasListState];
                                            newGasList.splice(index, 1);
                                            setGasListState(newGasList);
                                     }}
                    sx={{
                        cursor: "pointer",
                        padding:1,
                        transition: "background-color 0.3s",
                        "&:hover": {
                            backgroundColor: "rgb(75 112 245 / 25%)",
                        }
                    }}
                    >
                        <ListItemContent
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                        }}
                        >
                            <Typography variant="body1" sx={{
                                color: "black",
                                fontWeight: "bold",
                                fontSize: "0.875rem",
                                paddingRight:2,
                            }}>{makeText(gas)}</Typography>
                            <RxCross2 />
                        </ListItemContent>

                    </ListItem>
                })}
                <Sheet
                    sx={{
                        width: "100%",
                        borderRadius: "md",
                        padding: 1,
                        marginTop: 1,
                        backgroundColor: "transparent",
                        color: "black",
                        border: "1px dashed",
                    }}>
ADD
                </Sheet>
            </Sheet>
        </Modal>
        </Box>

    )
}