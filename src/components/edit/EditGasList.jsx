import {
    Box,
    Button,
    Chip,
    Divider,
    Input,
    LinearProgress,
    List,
    ListItem,
    ListItemContent,
    Option,
    Select,
    Stack,
    Typography
} from "@mui/joy";
import React, {useState} from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import {RxCross2} from "react-icons/rx";
import {CgAdd} from "react-icons/cg";
import {useDispatch, useSelector} from "react-redux";
import {gasDeliverys} from "../../state/UpdateGasDelivery.jsx";

export default function EditGasList({gasList, correction, allgasList, isReceved, delivery_id}) {
    const [openModel, setOpenModel] = useState(false);
    const [openUpdateModel, setOpenUpdateModel] = useState(false);
    const [gasListState, setGasListState] = useState(gasList);

    // let updateGasRowId = 0;
    // let updateGasId = 0;
    // let updateGasQuantity = 0;
    // let updateGasPrice = 0;
    const [updateGasRowId, setUpdateGasRowId] = useState(0);
    const [updateGasId, setUpdateGasId] = useState(0);
    const [updateGasQuantity, setUpdateGasQuantity] = useState(0);
    const [updateGasPrice, setUpdateGasPrice] = useState(0);

    const dispatch = useDispatch();

    const apiResponse = useSelector((state) => state.gasDeliverys);

    if (apiResponse.isSuccessful) {
        location.reload();
    }

    const GasOptions = []
    for (let key in allgasList) {
        if (allgasList[key].company_name != "GO GASS" && !isReceved) {
            continue;
        }
        if(
            gasListState.filter((gas) => gas.gas_id == allgasList[key].id).length > 0
        ){
            continue;
        }
        GasOptions.push(<Option key={key}
                                value={allgasList[key].id}>{`${allgasList[key].company_name} ${allgasList[key].kg}KG`}</Option>)
    }
    const makeGasListUI = (gaslist, correction) => {
        let backgroundColor = "transparent";
        if (correction) {
            backgroundColor = "#ff00007d";
        }
        let hoverColor = "rgb(75 112 245 / 25%)";
        return <List
        >
            {gasListState.map((gas, index) => {
                return <ListItem sx={{
                    margin: 0,
                    px: 1,
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
    const makeText = (gas) => {
        // return `Gas:${gas.company_name} | ${gas.kg}KG | ${(gas.price == 0) ? "":`Rate :  ${gas.price}₹ | `} Qty:${gas.quantity}`
        return <Chip
            variant="solid"
            color={gas.price == 0 ? "warning" : "success"}
            sx={{
                width: "100%",
            }}
        >
            {`Gas:${gas.company_name} ${gas.kg}KG - ${(!isReceved) ? "" : `${gas.price}₹ x `} Qty:${gas.quantity} ${(gas.price == 0) ? "" : ` = ${gas.price * gas.quantity}₹`}`}
        </Chip>
    }
    let hoverColor = "rgb(75 112 245 / 25%)";
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
                        maxWidth: 1000,
                        borderRadius: "md",
                        p: 3,
                        boxShadow: "lg",
                        maxHeight: "100vh"
                    }}
                >
                    <ModalClose variant="plain" sx={{m: 1}}/>
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                    >
                        Change Gas List
                    </Typography>
                    <LinearProgress
                        sx={{
                            my: 1,
                            width: "100%",
                            display: apiResponse.isLoading ? "block" : "none",
                        }}

                    />
                    <Divider sx={{
                        my: 1
                    }}/>
                    {gasListState.map((gas, index) => {
                        console.log(gas,index);
                        return <ListItem key={index}
                        >
                            <ListItemContent
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                }}
                            >
                                <Sheet variant="body1"
                                       sx={{
                                           color: "black",
                                           fontWeight: "bold",
                                           fontSize: "0.875rem",
                                           backgroundColor: "transparent",
                                           paddingRight: 2,
                                           cursor: "pointer",
                                       }}
                                       onClick={() => {
                                           // setOpenUpdateModel(true);
                                           // setUpdateGasRowId(gas.id);
                                           // setUpdateGasId(gas.gas_id);
                                           // setUpdateGasQuantity(gas.quantity);
                                           // setUpdateGasPrice(gas.price);
                                       }}
                                >{makeText(gas)}</Sheet>
                                <Button
                                    sx={{
                                        backgroundColor: "transparent",
                                        transition: "background-color 0.3s",
                                        "&:hover": {
                                            backgroundColor: "lightcoral",
                                        }
                                    }}
                                    onClick={() => {
                                        dispatch(
                                            gasDeliverys({
                                                id: gas.id,
                                                opration: "delete",
                                            })
                                        );
                                    }}
                                >
                                    <RxCross2
                                        style={{
                                            color: "white",
                                            backgroundColor: "rgb(186,43,43)",
                                            borderRadius: "50%",
                                            padding: "2px",
                                            fontSize: "1.2em",
                                        }}
                                    />
                                </Button>
                            </ListItemContent>

                        </ListItem>
                    })}
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const selectedGas = formJson.gas;
                            const quantity = formJson.quantity;
                            const price = formJson.price;

                            if (
                                selectedGas == "" || quantity == ""
                            ) {
                                alert("Please fill all the fields");
                                return;
                            }

                            const data = {
                                gas_id: selectedGas,
                                quantity: quantity,
                                price: (price == undefined || price == "") ? 0 : price,
                                opration: "insert",
                                delivery_id: delivery_id,
                                is_empty: isReceved,
                            }
                            console.log(data);
                            dispatch(
                                gasDeliverys(data)
                            )
                        }}
                    >
                        <Stack
                            direction="row"
                            gap={1}
                            sx={{
                                width: "100%",
                                borderRadius: "md",
                                padding: 1,
                                marginTop: 1,
                                backgroundColor: "transparent",
                                color: "black",
                                border: "1px dashed",
                            }}>
                            <Select
                                placeholder="Choose Gas"
                                name="gas"
                            >
                                {
                                    GasOptions
                                }

                            </Select>
                            <Input
                                placeholder="Quantity"
                                type="number"
                                name="quantity"
                            />
                            {
                                isReceved ? "" : <Input
                                    placeholder="Price"
                                    type="number"
                                    name="price"
                                />
                            }
                            <Button
                                startDecorator={
                                    <CgAdd/>
                                }
                                type="submit"
                            >
                                Save
                            </Button>
                        </Stack>
                    </form>
                </Sheet>
            </Modal>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openUpdateModel}
                onClose={() => setOpenUpdateModel(false)}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 1000,
                        borderRadius: "md",
                        p: 3,
                        boxShadow: "lg",
                        maxHeight: "100vh"
                    }}
                >
                    <ModalClose variant="plain" sx={{m: 1}}/>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            console.log(formJson);
                        }}
                    >
                        <Divider
                            sx={{
                                mt: 4,
                                opacity: 0,
                            }}
                        />
                        <Stack
                            direction="row"
                            gap={1}
                            sx={{
                                width: "100%",
                                borderRadius: "md",
                                padding: 1,
                                marginTop: 1,
                                backgroundColor: "transparent",
                                color: "black",
                                border: "1px dashed",
                            }}>
                            <Select
                                placeholder="Choose Gas"
                                name="gas"
                                value={updateGasId}
                            >
                                {
                                    GasOptions
                                }

                            </Select>
                            <Input
                                placeholder="Quantity"
                                type="number"
                                name="quantity"
                                value={updateGasQuantity}
                            />
                            {
                                isReceved ? "" : <Input
                                    placeholder="Price"
                                    type="number"
                                    name="price"
                                    value={updateGasPrice}
                                />
                            }
                            <Button
                                startDecorator={
                                    <CgAdd/>
                                }
                                type="submit"
                            >
                                Save
                            </Button>
                        </Stack>
                    </form>
                </Sheet>
            </Modal>
        </Box>

    )
}