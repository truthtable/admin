import React, {useState} from "react";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Chip,
    Divider,
    Input,
    List,
    ListItem,
    ListItemButton,
    ListItemContent,
    ListItemDecorator,
    Modal,
    ModalClose,
    Radio,
    RadioGroup,
    Select,
    Sheet,
    Stack,
    Switch,
    switchClasses,
    Typography
} from "@mui/joy";
import {useDispatch} from "react-redux";
import {TbCylinder} from "react-icons/tb";
import {MdEdit, MdKeyboardArrowRight} from "react-icons/md";
import {RiDeleteBinFill} from "react-icons/ri";
import {ImCross} from "react-icons/im";
import {deleteDeliveryById} from "../../redux/actions/deliveryActions.js";
import {updateOrCreateCustomerPayments} from "../../redux/customerPaymentsUpdateOrCreate.js";
import {addGasDelivery, deleteGasDelivery, updateGasDelivery} from "../../redux/actions/gasDeliveryActions";
import {updateDelivery} from "../../state/UpdateDelivery.jsx";
import DateTimePickerField from "../DateTimePickerField.tsx";
import FormLabel from "@mui/joy/FormLabel";
import {addNewGasDelivery} from "../../redux/delivery/gasEditDelivery.js";
import {decimalFix, toNumber} from "../../Tools.jsx";

export const GasEditUi = ({
                              createdAt,
                              selectedGasList,
                              customer,
                              custId = null,
                              deliveryBoy,
                              deleveryId,
                              deliveryBoyId = null,
                              payments,
                              correction,
                              openEdit,
                              isOutstanding,
                              gasList,
                              CUSTOMER_LIST,
                              DELIVERY_BOY_LIST,
                              isAddNewDeliveryModal = false,
                              deleveryGasEditUiGasList,
                              onSuccess,
                              onClose = () => {
                              }
                          }) => {
    const dispatch = useDispatch();
    let onlinePayment = {id: null, amount: 0, method: null};
    let cashPayment = {id: null, amount: 0, method: null};
    const [customerId, setCustomerId] = useState(custId);
    const [deliverBoyId, setDeliverBoyId] = useState(deliveryBoyId);
    const [checked, setChecked] = useState(correction);
    //console.log({customerId, deliverBoyId})
    const [timeStamp, setTimeStamp] = useState(() => {
        if (createdAt) {
            function parseToEpoch(dateStr) {
                const [datePart, timePart, ampm] = dateStr.split(/[- ]+/);
                const [day, month, year] = datePart.split("/").map(Number);
                let [hours, minutes] = timePart.split(":").map(Number);
                if (ampm.toUpperCase() === "PM" && hours !== 12) hours += 12;
                if (ampm.toUpperCase() === "AM" && hours === 12) hours = 0;
                const fullYear = 2000 + year;
                const date = new Date(fullYear, month - 1, day, hours, minutes);
                return Math.floor(date.getTime() / 1000); // epoch seconds
            }

            const epochTime = parseToEpoch(createdAt);
            const now = new Date(epochTime * 1000);
            const createdAtDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
            return createdAtDate;
        } else {
            const now = new Date();
            // create a datetime-local string from current date
            return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        }
    });
    payments.forEach((payment) => {
        if (payment.method == 0) {
            cashPayment = {
                id: payment.id,
                amount: Number(payment.amount),
                method: payment.method
            }
        } else if (payment.method == 1) {
            onlinePayment = {
                id: payment.id,
                amount: Number(payment.amount),
                method: payment.method
            }
        }
    })
    const [cashAmount, setCashAmountState] = useState(cashPayment);
    const [onlineAmount, setOnlineAmountState] = useState(onlinePayment);
    let online = 0
    let cash = 0
    let grandTotal = 0;
    const setOnlineAmount = (amount) => {
        online = Number(amount)
        setOnlineAmountState({id: onlinePayment.id, amount: Number(amount), method: onlinePayment.method})
    }
    const setCashAmount = (amount) => {
        cash = Number(amount)
        setCashAmountState({id: cashPayment.id, amount: Number(amount), method: cashPayment.method})
    }
    const [edit, setTheEdit] = useState(openEdit);
    const setEdit = (value) => {
        setTheEdit(value);
        onClose();
    }
    const [editName, setEditName] = useState("");
    let glist = [];
    let tempGas = new Map();
    selectedGasList.forEach((gas) => {
        tempGas.set(gas.id, gas)
    })
    const [gasData, setGasData] = useState(tempGas);
    const [deletedGasData, setDeletedGasData] = useState(new Map())
    const handleSetGasData = (id, key, value) => {
        let tempGas = new Map(gasData);
        let gas = {...tempGas.get(id)}; // clone the gas object

        // Create a combination check function
        const checkCombinationExists = (gasId, nc, isEmpty) => {
            for (const [_, existingGas] of tempGas) {
                if (existingGas.id === id) continue; // Skip current gas being edited
                if (existingGas.gas_id === gasId &&
                    existingGas.nc === nc &&
                    existingGas.is_empty === isEmpty) {
                    return true;
                }
            }
            return false;
        };

        // Handle NC changes
        if (key === 'nc') {
            if (gas.is_empty && value) {
                alert("Empty gas cannot be NC");
                return;
            }
            if (checkCombinationExists(gas.gas_id, value, gas.is_empty)) {
                alert("This combination already exists");
                return;
            }
        }

        // Handle is_empty changes
        if (key === 'is_empty') {
            if (gas.nc && value) {
                alert("NC gas cannot be empty");
                return;
            }
            if (checkCombinationExists(gas.gas_id, gas.nc, value)) {
                alert("This combination already exists");
                return;
            }
        }

        // Handle gas_id changes
        if (key === 'gas_id') {
            if (checkCombinationExists(value, gas.nc, gas.is_empty)) {
                alert("This combination already exists");
                return;
            }
        }

        // Update the value if all checks pass
        if (key === 'gas_price') {
            gas.gas_price = value;
        } else {
            gas[key] = value;
        }

        tempGas.set(id, gas);
        setGasData(tempGas);
    };
    const handleAddGasData = (gasId) => {
        let tempGas = new Map(gasData);

        // Check existing combinations
        const combinations = [
            {nc: false, is_empty: false},
            {nc: true, is_empty: false},
            {nc: false, is_empty: true},
        ];

        // Find which combination is available
        let availableCombination = null;
        for (const combo of combinations) {
            let exists = false;
            for (const [_, gas] of tempGas) {
                if (gas.gas_id === gasId &&
                    gas.nc === combo.nc &&
                    gas.is_empty === combo.is_empty) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                availableCombination = combo;
                break;
            }
        }

        if (!availableCombination) {
            alert("All allowed combinations for this gas are already used");
            return;
        }

        tempGas.set("new_" + gasData.size + 1, {
            id: "new_" + gasData.size + 1,
            is_empty: availableCombination.is_empty,
            quantity: "",
            gas_price: "",
            gas_id: gasId,
            nc: availableCombination.nc
        });

        setGasData(tempGas);
    }
    const handleDeleteGasData = (gasId) => {
        let tempDeletedGas = new Map(deletedGasData); // Clone the current deletedGasData Map
        tempDeletedGas.set(gasId, gasData.get(gasId)); // Add deleted gas to the map
        setDeletedGasData(tempDeletedGas); // Update the deletedGasData state
        let tempGas = new Map(gasData); // Clone current gasData
        tempGas.delete(gasId); // Remove the gas by id
        setGasData(tempGas); // Update the gasData state
    }
    for (const [index, gas] of gasList.entries()) {
        if ((gas.company_name.toLowerCase().includes(editName.toLowerCase()) && editName.length > 0)) {
            glist.push(
                <ListItem key={index}>
                    <ListItemButton onClick={() => {
                        handleAddGasData(gas.id)
                        setEditName("")
                    }}>
                        <ListItemDecorator>
                            <TbCylinder/>
                        </ListItemDecorator>
                        <ListItemContent sx={{color: "black", fontWeight: "bold"}}>
                            {gas.company_name} : {gas.kg}{"kg"}
                        </ListItemContent>
                        <ListItemDecorator>
                            <MdKeyboardArrowRight/>
                        </ListItemDecorator>
                    </ListItemButton>
                </ListItem>
            )
        }
    }
    if (!edit && isAddNewDeliveryModal) {
        return <Button
            onClick={() => {
                setEdit(true);
            }}
            startDecorator={<MdEdit/>}
            sx={{
                whiteSpace: "nowrap"
            }}
        >{
            isAddNewDeliveryModal ? "Add New Delivery" : "Edit"
        }</Button>
    }
    let deliveryGasList = []
    let mtGasList = []
    for (const [key, value] of gasData) {
        if (value.is_empty == false) {
            deliveryGasList.push({
                gas_id: Number(value.gas_id),
                quantity: Number(value.quantity),
                price: Number(value.gas_price),
                is_empty: value.is_empty,
                nc: value.nc ? true : false,
            })
        } else {
            mtGasList.push({
                gas_id: Number(value.gas_id),
                quantity: Number(value.quantity),
                price: Number(value.gas_price),
                is_empty: value.is_empty,
                nc: value.nc ? true : false,
            })
        }
    }
    const handleCustomerChange = (value) => {
        if (value === "") return;
        setCustomerId(value);
    };
    const handleDeliveryBoyChange = (value) => {
        if (value === "") {
            setDeliverBoyId(null);
            return;
        }
        setDeliverBoyId(value);
    };
    const handleOnlineAmountChange = (value) => {
        online = Number(value);
        setOnlineAmountState({id: onlinePayment.id, amount: Number(value), method: onlinePayment.method});
    };
    const handleCashAmountChange = (value) => {
        cash = Number(value);
        setCashAmountState({id: cashPayment.id, amount: Number(value), method: cashPayment.method});
    };
    const handleCorrectionChange = (checked) => {
        setChecked(checked);
    };
    const handleGasSearchChange = (value) => {
        setEditName(value);
    };
    const handleSubmit = async () => {
        let tempGasData = new Map(gasData);
        let newGasAdded = [...tempGasData.values()].filter(
            (gas) => {
                return `${gas.id}`.startsWith("new_")
            }
        )
        newGasAdded = newGasAdded.map((gas) => ({
            ...gas,
            delivery_id: deleveryId
        }));
        tempGasData = new Map(gasData);
        let updateGasData = [...tempGasData.values()].filter(
            (gas) => {
                return !(`${gas.id}`.startsWith("new_"))
            }
        )
        const deleteDeliveryGasIds = [...deletedGasData.values()].map((gas) => {
            return gas.id
        })
        const newGasDataNoIds = newGasAdded.map(
            (gas) => {
                const {id, ...rest} = gas;
                return rest;
            }
        )
        const tempPayment = [
            {
                deliverie_id: deleveryId,
                customer_id: customerId,
                courier_boy_id: deliverBoyId,
                id: onlinePayment.id,
                amount: onlineAmount.amount,
                method: 1
            },
            {
                deliverie_id: deleveryId,
                customer_id: customerId,
                courier_boy_id: deliverBoyId,
                id: cashPayment.id,
                amount: cashAmount.amount,
                method: 0
            }
        ]
        if (isAddNewDeliveryModal) {
            const tDeliveryGasList = deliveryGasList.map((gas) => {
                //console.log(gas);
                return {
                    gas_id: gas.gas_id,
                    quantity: gas.quantity,
                    price: gas.price,
                    is_empty: false,
                    nc: gas.nc ? true : false,
                }
            })
            const tMtGasList = mtGasList.map((gas) => {
                //console.log(gas);
                return {
                    gas_id: gas.gas_id,
                    quantity: gas.quantity,
                    price: 0,
                    is_empty: true,
                    nc: false,
                }
            })
            try {
                dispatch(addNewGasDelivery({
                    deliverBoyId: deliverBoyId,
                    customerId: customerId,
                    delivery_gas_list: tDeliveryGasList,
                    received_gas_list: tMtGasList,
                    payments: tempPayment,
                    timeStamp: timeStamp
                }))
                setCustomerId(null);
                setDeliverBoyId(null);
                setChecked(false);
                setOnlineAmountState({id: null, amount: 0, method: null});
                setCashAmountState({id: null, amount: 0, method: null});
                setGasData(new Map());
                setDeletedGasData(new Map());
                setEditName("");
                setEdit(false);
            } catch (error) {
                console.error("API Error:", error);
            }
        } else {
            dispatch(updateOrCreateCustomerPayments(tempPayment))
            dispatch(deleteGasDelivery(deleteDeliveryGasIds))
            const tempNewGasDataNoIds = newGasDataNoIds.map((gas) => ({
                delivery_id: deleveryId,
                gas_id: gas.gas_id,
                quantity: gas.quantity,
                price: gas.gas_price,
                is_empty: gas.is_empty,
                nc: gas.nc,
            }));
            dispatch(addGasDelivery(tempNewGasDataNoIds))
            console.log(timeStamp)
            dispatch(updateDelivery({
                id: deleveryId,
                correction: checked,
                created_at: timeStamp,
            }))
            if (updateGasData.length > 0) {
                // Handle updateGasData if needed
                const tempPayload = updateGasData.map((gas) => ({
                    delivery_id: deleveryId,
                    id: gas.id,
                    gas_id: gas.gas_id,
                    quantity: gas.quantity,
                    price: gas.gas_price,
                    is_empty: gas.is_empty,
                    nc: gas.nc,
                }));
                dispatch(updateGasDelivery(tempPayload))
            }
        }
        setEdit(false)
    };

    return <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={edit}
        onClose={() => setEdit(false)}
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            mb: 10,
            height: "100vh",
            width: "100vw",
            overflowX: 'auto',
        }}
    >
        <form
            onSubmit={async (event) => {
                event.preventDefault();
                await handleSubmit();
            }}
        >
            <Sheet
                variant="outlined"
                sx={{borderRadius: 'md', p: 3, boxShadow: 'lg', my: 10, overflow: "auto"}}
            >
                <ModalClose variant="plain" sx={{m: 1}}/>
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    sx={{fontWeight: 'lg', mb: 1}}
                >
                    {isAddNewDeliveryModal ? "Add Delivery" : "Edit Delivery"}
                </Typography>

                <Sheet className="mb-3">
                    <DateTimePickerField value={timeStamp} onChange={(date) => {
                        setTimeStamp(date)
                    }}/>
                </Sheet>

                <Sheet className="mb-3">
                    <FormLabel>Customer</FormLabel>
                    <Autocomplete
                        placeholder={
                            (customerId === null) ? "Select Customer" : CUSTOMER_LIST.find(c => c.id === customerId).label
                        }
                        options={CUSTOMER_LIST}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(_, value) => handleCustomerChange(value ? value.id : null)}
                        sx={{
                            fontWeight: 'bold',
                        }}
                    />
                </Sheet>

                <Sheet className="mb-3">
                    <FormLabel>Delivery Boy</FormLabel>
                    <Autocomplete
                        placeholder={
                            (deliveryBoy === null) ? "Select Delivery Boy" : deliveryBoy
                        }
                        options={[...DELIVERY_BOY_LIST.entries()].map(([courierId, user]) => ({
                            id: courierId,
                            label: user.name,
                        }))}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(_, value) => handleDeliveryBoyChange(value ? value.id : null)}
                        sx={{
                            fontWeight: 'bold',
                        }}
                    />
                </Sheet>
                <FormLabel>Amount</FormLabel>
                <Sheet>
                    <Stack direction={"row"} gap={1} alignContent={"center"} sx={{mb: 1}} alignItems="center">
                        <Chip
                            size="lg"
                            color="success"
                            sx={{
                                fontWeight: "bold"
                            }}
                        >
                            Online
                        </Chip>
                        <Input
                            startDecorator={<span>₹</span>}
                            type="number"
                            value={
                                onlineAmount.amount === null ? "" : onlineAmount.amount
                            }
                            onChange={(event) => handleOnlineAmountChange(event.target.value)}
                            required
                            sx={{
                                maxWidth: "128px",
                            }}
                        />
                        <Chip
                            size="lg"
                            color="warning"
                            sx={{
                                fontWeight: "bold"
                            }}
                        >
                            Cash
                        </Chip>
                        <Input
                            startDecorator={<span>₹</span>}
                            type="number"
                            value={
                                cashAmount.amount === null ? "" : cashAmount.amount
                            }
                            onChange={(event) => handleCashAmountChange(event.target.value)}
                            required
                            sx={{
                                maxWidth: "128px",
                            }}
                        />
                        <Chip
                            size="lg"
                            color="primary"
                            sx={{
                                fontWeight: "bold"
                            }}
                        >
                            Total :
                        </Chip>
                        <span className="b">
                           ₹{decimalFix(toNumber(onlineAmount.amount) + toNumber(cashAmount.amount))}
                        </span>
                    </Stack>
                    {
                        !isOutstanding ? (<>
                            <span className="b">&nbsp;Gas List</span>
                            <List
                                sx={{
                                    backgroundColor: "#FFF1DB",
                                }}
                            >
                                {
                                    [...gasData.values()].map((data) => {
                                        return <ListItem key={data.id} sx={{width: "100%"}}>
                                            <ListItemContent sx={{color: "black", fontWeight: "bold"}}>

                                                <Stack direction="row" spacing={1} alignItems={"center"}>

                                                    <span>NC</span>
                                                    <Switch
                                                        checked={Boolean(data.nc)}
                                                        onChange={(event) => {
                                                            //console.log(event.target.checked)
                                                            if (data.is_empty) {
                                                                alert("MT Gas cannot be NC");
                                                                return;
                                                            }
                                                            handleSetGasData(data.id, "nc", event.target.checked);
                                                        }}
                                                    />
                                                    <RadioGroup
                                                        value={data.is_empty == true ? 1 : 0} // Ensure a fallback value if data.is_empty is undefined
                                                        name="radio-buttons-group"
                                                        orientation="horizontal"
                                                        required
                                                        onChange={(event) => {
                                                            if (data.nc) {
                                                                alert("MT Gas cannot be NC");
                                                                return;
                                                            }
                                                            handleSetGasData(data.id, "is_empty", event.target.value == 1); // Update gasData with the selected value
                                                        }}
                                                    >
                                                        <Radio value={0} label="Delivered" variant="outlined"
                                                               color="success"/>
                                                        <Radio value={1} label="Received" variant="outlined"
                                                               color="danger"/>
                                                    </RadioGroup>
                                                    <Select required sx={{width: "220px", ml: 2}}
                                                            defaultValue={data.gas_id}
                                                            onChange={(event, value) => {
                                                                handleSetGasData(data.id, "gas_id", value);
                                                            }}
                                                    >
                                                        {
                                                            deleveryGasEditUiGasList
                                                        }
                                                    </Select>
                                                    <Input required sx={{width: "168px"}} type="number"
                                                           value={data.quantity} startDecorator={<span>Qty : </span>}
                                                           onChange={(event) => {
                                                               handleSetGasData(data.id, "quantity", event.target.value);
                                                           }}
                                                    />
                                                    <Input required={(!data.is_empty)} sx={{
                                                        width: "168px",
                                                        visibility: (!data.is_empty) ? "visible" : "hidden"
                                                    }} type="number" value={data.gas_price}
                                                           startDecorator={<span>Amt : </span>} onChange={(event) => {
                                                        handleSetGasData(data.id, "gas_price", event.target.value);
                                                    }}/>
                                                    <Box
                                                        onClick={() => {
                                                            handleDeleteGasData(data.id)
                                                        }}
                                                        sx={{
                                                            padding: "6px",
                                                            backgroundColor: "#e34a4c",
                                                            color: "white",
                                                            borderRadius: "16px",
                                                        }}
                                                    ><ImCross/></Box>
                                                </Stack>
                                            </ListItemContent>
                                        </ListItem>
                                    })
                                }
                                <ListItem>
                                    <ListItemContent>
                                        <Input value={editName}
                                               onChange={(event) => handleGasSearchChange(event.target.value)}
                                               placeholder="Add Gas"/>
                                    </ListItemContent>
                                </ListItem>
                            </List>
                            <Card
                                color="warning"
                                invertedColors
                                orientation="vertical"
                                size="sm"
                                variant="soft"
                                sx={{
                                    display: "flex",
                                    overflow: "auto",
                                    p: 0,
                                    mt: 0,
                                    maxHeight: "90vh",
                                    borderTopRightRadius: 0,
                                    borderTopLeftRadius: 0,
                                }}>
                                <List>
                                    {
                                        glist
                                    }
                                </List>
                            </Card>
                            <span className="b">&nbsp;Correction</span>
                            <Stack direction="row" gap={1} alignContent={"center"} sx={{mb: 1}}>
                                <Switch
                                    checked={checked}
                                    onChange={(event) => handleCorrectionChange(event.target.checked)}
                                    sx={(theme) => ({
                                        '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
                                        '--Switch-thumbSize': '27px',
                                        '--Switch-trackWidth': '51px',
                                        '--Switch-trackHeight': '31px',
                                        '--Switch-trackBackground': 'rgb(48 209 88)', // Green color for off state
                                        [`& .${switchClasses.thumb}`]: {
                                            transition: 'width 0.2s, left 0.2s',
                                        },
                                        '&:hover': {
                                            '--Switch-trackBackground': 'rgb(48 209 88)', // Green color on hover when off
                                        },
                                        '&:active': {
                                            '--Switch-thumbWidth': '32px',
                                        },
                                        [`&.${switchClasses.checked}`]: {
                                            '--Switch-trackBackground': 'rgb(220 53 69)', // Red color for on state
                                            '&:hover': {
                                                '--Switch-trackBackground': 'rgb(220 53 69)', // Red color on hover when on
                                            },
                                        },
                                    })}
                                />
                            </Stack>
                        </>) : ""
                    }
                </Sheet>
                <Card size="sm" className="mb-1 !p-1 !text-black">
                    <Stack direction="column" spacing={.5}>
                        {(() => {
                            const l = [...gasData.values()].map((data) => {
                                if (data.is_empty) {
                                    return
                                }
                                let total = toNumber(data.gas_price) * toNumber(data.quantity);
                                grandTotal += total;
                                return (<span className="!text-black font-bold" key={"ttle_gas_edit" + data.id}>
                                    {
                                        data.nc ? "NC " : ""
                                    }
                                    {
                                        (deleveryGasEditUiGasList.find((gas) => gas.props.value == data.gas_id).props.children)
                                    }
                                    {" - "}
                                    Total :
                                    {" "}
                                    ₹{decimalFix(total)}
                                </span>)
                            })
                            return (l);
                        })()}
                        <Divider orientation="horizontal"/>
                        <span className="!text-black font-bold">
                        Sub Total : ₹{decimalFix(grandTotal)}
                        </span>
                        <Divider orientation="horizontal"/>
                        <span className="!text-black font-bold">
                        Balance : ₹{decimalFix(grandTotal - (toNumber(onlineAmount.amount) + toNumber(cashAmount.amount)))}
                        </span>
                    </Stack>
                </Card>
                <Stack direction="row" gap={1} justifyContent={"flex-end"} alignItems={"flex-end"}>
                    <Box
                        sx={{
                            color: "#B8001F",
                            p: 1,
                            borderRadius: "16px",
                            '&:hover': {
                                color: "white",
                                backgroundColor: "#B8001F",
                            },
                        }}
                        onClick={() => {
                            const confirm = window.prompt(`Are you sure you want to delete this delivery? Type ${deleveryId} to confirm.`);
                            if (Number(confirm) === Number(deleveryId)) {
                                dispatch(deleteDeliveryById(deleveryId));
                            }
                            setEdit(false)
                        }}
                    >
                        <RiDeleteBinFill/>
                    </Box>
                    <Divider orientation="horizontal" sx={{flexGrow: 1, opacity: 0}}/>
                    <Button color="warning" variant="outlined" onClick={() => {
                        setEdit(false)
                    }}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Save
                    </Button>
                </Stack>
            </Sheet>
        </form>
    </Modal>
}