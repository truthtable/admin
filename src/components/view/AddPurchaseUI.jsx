/* eslint-disable react/prop-types */
import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Input,
    LinearProgress,
    Modal,
    ModalClose,
    Option,
    Select,
    Sheet,
    Stack,
    Switch,
    Table,
    Tooltip,
    Typography
} from "@mui/joy";
import {CgAdd, CgTrash} from "react-icons/cg";
import {useDispatch, useSelector} from "react-redux";
import {FaRegPlusSquare} from "react-icons/fa";
import {decimalFix, toNumber} from "../../Tools";
import {FcCancel, FcOk} from "react-icons/fc";
import {getPurchaseKg} from "../../redux/purchase/purchaseData.js";
import {createOrder} from "../../redux/actions/purchaseOrderActions.js";

export default function AddPurchaseUI({gaslistData, plants}) {

    const dispatch = useDispatch();

    const [paid_val, setPaid_val] = useState(0);
    const [tcs, setTcs] = useState(0.01);
    const [for_charges, setFor_charges] = useState(0.01);
    const [scheme_rate, setSchemeRate] = useState(0);

    const [addPurchaseModel, setAddPurchaseModel] = useState(false);
    const [orderItems, setOrderItems] = useState([]);
    const [ncOrderItems, setNcOrderItems] = useState([]);
    const [showTargetOption, setShowTargetOption] = React.useState(false);
    const [targetAchieved, setTargetAchieved] = React.useState(false);
    const [targetStartDate, setTargetStartDate] = React.useState("");
    const [targetEndDate, setTargetEndDate] = React.useState("");
    const [targetRate, setTagetRate] = React.useState(0);

    const purchaseData = useSelector((state) => state.purchaseData);
    //console.log(purchaseData);

    const targetKg = Number(purchaseData?.kg ?? 0);
    const totalTargetAmt = showTargetOption ? toNumber(targetKg) * toNumber(targetRate) : 0;
    //console.log(targetKg);

    if ((gaslistData != null) && (gaslistData.length === 0) || (plants === undefined || plants === null || plants.length === 0)) {
        return <></>
    }

    const gasListMap = new Map();


    const kgSet = new Set();

    //console.log({gaslistData})

    //console.log({gaslistData})
    gaslistData.forEach(gas => {
        //console.log(gas.is_active, gas.company_name, gas.kg, (gas.company_name === "GO GAS") && (gas.is_active))
        if (gas.company_name === "GO GAS") {
            kgSet.add(gas.kg)
            gasListMap.set(gas.id, gas)
        }
    })

    const noOutlineHead = {borderWidth: 0, width: 1,};
    const noOutline = {borderWidth: 0,};

    let totalAmt = 0
    let totalQty = 0
    let total5KgQty = 0
    let total12KgQty = 0
    let total15KgQty = 0
    let total21KgQty = 0
    let totalKg = 0
    let total5Kg = 0
    let total12Kg = 0
    let total15Kg = 0
    let total21Kg = 0
    let ballance = 0
    let totalReturnQty = 0
    let totalReturn5KgQty = 0
    let totalReturn12KgQty = 0
    let totalReturn15KgQty = 0
    let totalReturn21KgQty = 0
    let totalReturnKg = 0
    let totalReturn5Kg = 0
    let totalReturn12Kg = 0
    let totalReturn15Kg = 0
    let totalReturn21Kg = 0
    let defective_amount = 0

    const gasCalculationMap = new Map();

    orderItems.forEach(item => {
        const gas = gasListMap.get(item.gas_id)
        const kgKey = `kg_${gas.kg}`;
        let gasCalc = gasCalculationMap.get(kgKey);
        if (gasCalc == null) {
            gasCalc = {
                kg: gas.kg,
                totalQty: 0,
                totalKg: 0,
                returnQty: 0,
                returnKg: 0,
                mt: 0,
            }
        }
        gasCalc.totalQty += Number(item.qty);
        gasCalc.totalKg += Number(item.qty) * Number(gas.kg);
        gasCalc.returnQty = Number(item.return_cyl_qty)
        gasCalc.returnKg = Number(item.return_cyl_qty) * Number(gas.kg)
        gasCalc.mt = Number(item.mt_cyl_qty)
        gasCalculationMap.set(kgKey, gasCalc);

        if (gas.kg == 5) {
            total5KgQty += Number(item.qty)
            total5Kg += (Number(item.qty) * Number(gas.kg))
            totalReturn5KgQty += Number(item.return_cyl_qty)
            totalReturn5Kg += (Number(item.return_cyl_qty) * Number(gas.kg))
        }
        if (gas.kg == 12) {
            total12KgQty += Number(item.qty)
            total12Kg += (Number(item.qty) * Number(gas.kg))
            totalReturn12KgQty += Number(item.return_cyl_qty)
            totalReturn12Kg += (Number(item.return_cyl_qty) * Number(gas.kg))
        }
        if (gas.kg == 15) {
            total15KgQty += Number(item.qty)
            total15Kg += (Number(item.qty) * Number(gas.kg))
            totalReturn15KgQty += Number(item.return_cyl_qty)
            totalReturn15Kg += (Number(item.return_cyl_qty) * Number(gas.kg))
        }
        if (gas.kg == 21) {
            total21KgQty += Number(item.qty)
            total21Kg += (Number(item.qty) * Number(gas.kg))
            totalReturn21KgQty += Number(item.return_cyl_qty)
            totalReturn21Kg += (Number(item.return_cyl_qty) * Number(gas.kg))
        }
        totalQty += Number(item.qty)
        totalKg += Number(item.qty) * Number(gas.kg)
        totalAmt += Number(item.qty) * Number(gas.kg) * Number(item.rate)
        totalReturnQty += Number(item.return_cyl_qty)
        const trkg = Number(item.return_cyl_qty) * Number(gas.kg)
        totalReturnKg += trkg
        defective_amount += (trkg * Number(item.rate))
    })

    ncOrderItems.forEach(item => {
        const gas = gasListMap.get(item.gas_id)
        const kgKey = `kg_${gas.kg}`;
        let gasCalc = gasCalculationMap.get(kgKey);
        if (gasCalc == null) {
            gasCalc = {
                kg: gas.kg,
                totalQty: 0,
                totalKg: 0,
                returnQty: 0,
                returnKg: 0,
                mt: 0,
            }
        }
        gasCalc.totalQty += Number(item.qty);
        gasCalc.totalKg += Number(item.qty) * Number(gas.kg);
        gasCalculationMap.set(kgKey, gasCalc);


        if (gas.kg == 5) {
            total5KgQty += Number(item.qty)
            total5Kg += (Number(item.qty) * Number(gas.kg))
        }
        if (gas.kg == 12) {
            total12KgQty += Number(item.qty)
            total12Kg += (Number(item.qty) * Number(gas.kg))
        }
        if (gas.kg == 15) {
            total15KgQty += Number(item.qty)
            total15Kg += (Number(item.qty) * Number(gas.kg))
        }
        if (gas.kg == 21) {
            total21KgQty += Number(item.qty)
            total21Kg += (Number(item.qty) * Number(gas.kg))
        }
        totalQty += Number(item.qty)
        totalKg += Number(item.qty) * Number(gas.kg)
        totalAmt += Number(item.qty) * Number(item.rate)
    })

    //console.table(gasCalculationMap.values().toArray())

    const totalScheme = (totalKg * scheme_rate)

    console.log({tcs, totalAmt})
    const totalTcs = tcs * totalAmt
    const totalFor = for_charges * totalKg

    const billing = totalAmt + totalTcs + totalFor - totalScheme - defective_amount - totalTargetAmt

    ballance = billing - paid_val

    if (paid_val === undefined) {
        ballance = billing
    }

    //console.log({ totalQty, totalKg, totalReturnQty, totalReturnKg, totalAmt, totalScheme, billing, totalTcs, totalFor })

    const removeItem = (index, nc = false) => {
        let oi = orderItems
        if (nc) {
            oi = ncOrderItems
        }
        const updatedItems = oi.filter((_, i) => i !== index);
        if (nc) {
            setNcOrderItems(updatedItems);
        } else {
            setOrderItems(updatedItems);
        }
    };
    const handleItemChange = (index, field, value, nc = false) => {
        let oi = []
        if (nc) {
            oi = ncOrderItems
        } else {
            oi = orderItems
        }
        if (field === 'id' || field === 'gas_id') {
            const temp = oi.map((item, i) => {
                if (i === index) {
                    return {...item, [field]: value}
                }
                return item
            })
            if (nc) {
                setNcOrderItems(temp)
            } else {
                setOrderItems(temp)
            }
            return
        }
        try {
            const updatedItems = oi.map((item, i) => {
                    const s = value.split('');
                    let n = '';
                    let dotCont = 0;
                    s.forEach(c => {
                        if (
                            c === '.'
                            || c === ','
                            || field === 'qty'
                            || field === 'return_cyl_qty'
                            || field === 'gas_id'
                        ) {
                            dotCont++;
                        }
                        if (c.match(/[0-9]/)) {
                            n += c;
                        }
                        if (c === '.' && dotCont <= 1) {
                            n += c;
                        }
                    });
                    if (n.startsWith('.')) {
                        n = '0' + n;
                    }
                    n = n.replace(/^0+(\d)/, '$1');
                    if (n.length === 0) {
                        n = 0;
                    }
                    return i === index ? {...item, [field]: n} : item
                }
            );
            if (nc) {
                setNcOrderItems(updatedItems);
            } else {
                setOrderItems(updatedItems);
            }
        } catch (e) {
            console.warn(e);
        }
    };
    const addEmptyItem = (nc = false) => {
        try {
            if (nc) {
                const availableGas = gaslistData.find(gas =>
                    (gas.company_name === "GO GAS") &&
                    (ncOrderItems.find(item => item.gas_id === gas.id) == null)
                );
                const updatedItems = [...ncOrderItems, {
                    gas_id: availableGas.id,
                    qty: 0,
                    rate: 0,
                    return_cyl_qty: 0,
                    mt_cyl_qty: 0,
                    nc: nc
                }];
                setNcOrderItems(updatedItems);
            } else {
                const availableGas = gaslistData.find(gas =>
                    (gas.company_name === "GO GAS") &&
                    (orderItems.find(item => item.gas_id === gas.id) == null)
                );
                const updatedItems = [...orderItems, {
                    gas_id: availableGas.id,
                    qty: 0,
                    rate: 0,
                    return_cyl_qty: 0,
                    mt_cyl_qty: 0,
                    nc: nc
                }];
                setOrderItems(updatedItems);
            }
        } catch (e) {
            console.warn(e);
            return;
        }
    };

    const fetchTargetKg = React.useCallback((startDateParam, endDateParam) => {
        const s = startDateParam ?? targetStartDate;
        const e = endDateParam ?? targetEndDate;
        if (s === "" || e === "") return;
        dispatch(getPurchaseKg({startDate: s, endDate: e}));
    }, [targetStartDate, targetEndDate, dispatch]);

    useEffect(() => {
        if (showTargetOption && targetStartDate !== "" && targetEndDate !== "") {
            fetchTargetKg(targetStartDate, targetEndDate);
        }
    }, [showTargetOption, targetStartDate, targetEndDate, fetchTargetKg]);


    return (
        <>
            <Button
                variant="solid"
                size="sm"
                className="bg-[#12467b]"
                startDecorator={<CgAdd/>}
                onClick={() => setAddPurchaseModel(true)}
            >
                Add Purchase
            </Button>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={addPurchaseModel}
                onClose={() => setAddPurchaseModel(false)}
                className="flex justify-center items-center"
            >
                <Container
                    maxWidth="xxl"
                >
                    <Sheet
                        variant="outlined"
                        className="rounded-md p-3 shadow-lg max-h-screen overflow-auto"
                    >
                        <ModalClose variant="plain" className="m-1"/>
                        <Typography
                            component="h2"
                            id="modal-title"
                            level="h4"
                            textColor="inherit"
                            className="font-bold"
                        >
                            Add Purchase
                        </Typography>
                        <LinearProgress className="my-1 w-full" sx={{
                            display: "none",
                        }}/>
                        <Divider className="my-1"/>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries(formData.entries());
                                formJson.scheme = scheme_rate;
                                let allOrderItems = [...orderItems, ...ncOrderItems];
                                formJson.purchase_order_items = allOrderItems;
                                formData.tcs = tcs;
                                formData.for_charges = for_charges;
                                //formData.defective_amount = defective_amount;
                                if (showTargetOption) {
                                    formJson.achieved = targetAchieved;
                                    formJson.hasTarget = true;
                                }
                                //console.log(formJson);
                                if (allOrderItems.length === 0 && !showTargetOption) {
                                    alert("Add Gas Items to Continue");
                                    return;
                                }
                                dispatch(createOrder(formJson));
                                setShowTargetOption(false);
                                setAddPurchaseModel(false);
                            }}
                        >
                            <Stack
                                direction="column"
                                gap={1}
                                className="w-full rounded-md p-1 mt-1 bg-transparent text-black">

                                <Stack
                                    direction="row"
                                    gap={1}
                                >
                                    <Divider orientation="vertical"/>
                                    <FormControl className="w-full flex-grow">
                                        <FormLabel>Date</FormLabel>
                                        <Input
                                            placeholder="Date"
                                            type="date"
                                            name="date"
                                            required={!showTargetOption}
                                            size="sm"
                                            onKeyDown={(e) => {
                                                try {
                                                    e.preventDefault()
                                                } catch (e) {
                                                    console.warn(e)
                                                }
                                            }}
                                            onFocus={(e) => {
                                                try {
                                                    e.target.showPicker()
                                                } catch (e) {
                                                    console.warn(e)
                                                }
                                            }}
                                            onClick={(e) => {
                                                try {
                                                    e.target.showPicker()
                                                } catch (e) {
                                                    console.warn(e)
                                                }
                                            }}
                                            className="w-full flex-grow"
                                        />
                                    </FormControl>
                                    <FormControl className="w-full flex-grow">
                                        <FormLabel>Order No.</FormLabel>
                                        <Input
                                            placeholder="Order No."
                                            type="text"
                                            name="order_no"
                                            size="sm"
                                            required={!showTargetOption}
                                            className="w-full flex-grow"
                                        />
                                    </FormControl>
                                    <FormControl className="w-full flex-grow">
                                        <FormLabel>Plant</FormLabel>
                                        <Select
                                            placeholder="Plant"
                                            required={!showTargetOption}
                                            name="plant_id"
                                            size="sm"
                                            className="w-full flex-grow"
                                        >
                                            {
                                                plants.map(plant => {
                                                    return (
                                                        <Option key={plant.id} value={plant.id}>{plant.name}</Option>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl className="w-full flex-grow">
                                        <FormLabel>Scheme</FormLabel>
                                        <Input className="w-full flex-grow" placeholder="Scheme" size="sm" type="text"
                                               name="scheme_type" required={!showTargetOption}/>
                                    </FormControl>
                                    <FormControl className="w-full flex-grow">
                                        <FormLabel>Scheme Rate</FormLabel>
                                        <Input className="w-full flex-grow"
                                               value={
                                                   scheme_rate
                                               }
                                               onChange={(e) => {
                                                   const value = e.target.value;
                                                   const s = value.split('');
                                                   let n = '';
                                                   let dotCont = 0;
                                                   s.forEach(c => {
                                                       if (c === '.' || c === ',') {
                                                           dotCont++;
                                                       }
                                                       if (c.match(/[0-9]/)) {
                                                           n += c;
                                                       }
                                                       if (c === '.' && dotCont <= 1) {
                                                           n += c;
                                                       }
                                                   });
                                                   if (n.startsWith('.')) {
                                                       n = '0' + n;
                                                   }
                                                   n = n.replace(/^0+(\d)/, '$1');
                                                   if (n.length === 0) {
                                                       n = 0;
                                                   }
                                                   setSchemeRate(n);
                                               }}

                                               placeholder="Scheme Rate" size="sm" type="number" name="scheme_rate"
                                               required={!showTargetOption}
                                               endDecorator={
                                                   <Chip
                                                       variant="outlined"
                                                       className="font-bold bg-gray-100"
                                                   >
                                                       ₹{totalScheme.toFixed(2)}
                                                   </Chip>
                                               }
                                        />
                                    </FormControl>
                                    <Divider orientation="vertical"/>
                                </Stack>
                                <Divider orientation="horizontal"/>
                                <Stack
                                    direction="row"
                                    gap={1}
                                >
                                    <Divider orientation="vertical"/>
                                    <Stack direction="row" alignContent="center" alignItems="center" gap={1}>
                                        <span className="text-black font-bold break-keep whitespace-nowrap">Target Options</span>
                                        <Switch
                                            checked={showTargetOption}
                                            onChange={(e) => {
                                                setShowTargetOption(e.target.checked)
                                            }}
                                        />
                                    </Stack>
                                    <Divider orientation="vertical"/>
                                    {
                                        showTargetOption && <>
                                            <FormControl className="w-full flex-grow max-w-100">
                                                <FormLabel>Remark</FormLabel>
                                                <Input
                                                    placeholder="Target Remark"
                                                    type="text"
                                                    name="remark"
                                                    size="sm"
                                                    required
                                                    className="w-full flex-grow"
                                                />
                                            </FormControl>
                                            <FormControl className="w-full flex-grow max-w-32">
                                                <FormLabel>Target Start</FormLabel>
                                                <Input
                                                    placeholder="Target Start"
                                                    type="date"
                                                    name="start_date"
                                                    value={targetStartDate}
                                                    onChange={(e) => {
                                                        setTargetStartDate(e.target.value)
                                                    }}
                                                    size="sm"
                                                    required
                                                    className="w-full flex-grow"
                                                />
                                            </FormControl>
                                            <FormControl className="w-full flex-grow max-w-32">
                                                <FormLabel>Target End</FormLabel>
                                                <Input
                                                    placeholder="Target End"
                                                    type="date"
                                                    name="end_date"
                                                    value={targetEndDate}
                                                    onChange={(e) => {
                                                        setTargetEndDate(e.target.value)
                                                    }}
                                                    size="sm"
                                                    required
                                                    className="w-full flex-grow"
                                                />
                                            </FormControl>
                                            <FormControl className="w-full flex-grow max-w-32">
                                                <FormLabel>Total KG</FormLabel>
                                                {
                                                    purchaseData.isLoading ? <CircularProgress size="sm"/> : null
                                                }
                                                <span className="text-black font-black whitespace-nowrap">{
                                                    (targetStartDate === "" || targetEndDate === "") ? "(Select Dates)" : decimalFix(toNumber(targetKg), 2)
                                                }
                                                </span>
                                            </FormControl>
                                            <FormControl className="w-full flex-grow max-w-20">
                                                <FormLabel>Rate</FormLabel>
                                                <Input
                                                    placeholder="Total KG"
                                                    type="number"
                                                    name="rate"
                                                    value={
                                                        targetRate
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'e' || e.key === 'E') {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        let value = e.target.value;
                                                        //remove e if exist
                                                        value = value.toString().replace(/[eE]/g, '');
                                                        setTagetRate(value);
                                                    }}
                                                    size="sm"
                                                    required
                                                    className="w-full flex-grow max-w-20"
                                                />
                                            </FormControl>
                                            <Divider orientation="vertical"/>
                                            <Stack
                                                className="items-center justify-center"
                                            >
                                                <FormLabel className="text-black">
                                                    Total
                                                </FormLabel>
                                                <Divider orientation="horizontal"/>
                                                <span className="text-black font-black text-center ">{
                                                    totalTargetAmt
                                                }</span>
                                            </Stack>
                                            <Divider orientation="vertical"/>
                                            <Stack direction="row" alignContent="center" alignItems="center" gap={1}>
                                                <span className="text-black font-bold break-keep whitespace-nowrap">Target Achieved</span>
                                                <Switch
                                                    size="lg"
                                                    color={
                                                        targetAchieved ? "success" : "danger"
                                                    }
                                                    checked={targetAchieved}
                                                    onChange={(e) => {
                                                        setTargetAchieved(e.target.checked)
                                                    }}
                                                />
                                                {
                                                    targetAchieved ? <FcOk/> : <FcCancel/>
                                                }
                                            </Stack>
                                            <Divider orientation="vertical"/>
                                        </>
                                    }
                                </Stack>
                                <Divider orientation="horizontal"/>
                                <Card>
                                    <CardContent
                                        className="flex"
                                    >
                                        <Table
                                            className="w-full flex-grow font-bold text-right"
                                            size="md"
                                            sx={{
                                                tableLayout: 'auto',
                                                "& td, & tr": {
                                                    padding: 0,
                                                    margin: 0,
                                                    borderBottomWidth: 0,
                                                    height: "unset",
                                                    verticalAlign: "middle",
                                                },
                                            }}
                                        >
                                            <thead>
                                            <tr>
                                                <th>
                                                    <span className="font-bold"> Cyl.</span>
                                                </th>
                                                <th>
                                                                      <span
                                                                          className="font-bold"
                                                                      > Qty.</span>
                                                </th>
                                                <th>
                                                                      <span className="font-bold"
                                                                      >Total Kg</span>
                                                </th>
                                                <th>
                                                                      <span
                                                                          className="font-bold"
                                                                      >Rate</span>
                                                </th>
                                                <th>
                                                                      <span
                                                                          className="font-bold"
                                                                      >Total Amt</span>
                                                </th>
                                                <th>
                                                                      <span
                                                                          className="font-bold"
                                                                      >MT Qty.</span>
                                                </th>
                                                <th>
                                                                      <span
                                                                          className="font-bold"
                                                                      >Return Cyl. Qty.</span>
                                                </th>
                                                <th>Return Total</th>
                                                <th>Delete</th>
                                            </tr>

                                            </thead>
                                            <tbody>
                                            {orderItems.map((item, index) => (
                                                <OrderItemRow
                                                    key={`order-item-${item.id}-${index}`}
                                                    item={item}
                                                    index={index}
                                                    gaslistData={gaslistData}
                                                    gasListMap={gasListMap}
                                                    orderItems={orderItems}
                                                    handleItemChange={handleItemChange}
                                                    removeItem={removeItem}
                                                    noOutline={noOutline}
                                                    nc={false}
                                                />
                                            ))}
                                            {
                                                ncOrderItems.length > 0 && <tr>
                                                    <td style={{...noOutline}} colSpan={4}>
                                                        <Divider className="my-1"/>
                                                    </td>
                                                    <td style={{...noOutline, textAlign: "center"}} colSpan={1}>
                                                        New Connection
                                                    </td>
                                                    <td style={{...noOutline}} colSpan={4}>
                                                        <Divider className="my-1"/>
                                                    </td>
                                                </tr>
                                            }
                                            {ncOrderItems.map((item, index) => (
                                                <OrderItemRow
                                                    key={`order-nc-item-${item.id}-${index}`}
                                                    item={item}
                                                    index={index}
                                                    gaslistData={gaslistData}
                                                    gasListMap={gasListMap}
                                                    orderItems={ncOrderItems}
                                                    handleItemChange={handleItemChange}
                                                    removeItem={removeItem}
                                                    noOutline={noOutline}
                                                    nc={true}
                                                />
                                            ))}
                                            <tr className="opacity-0">
                                                <td className="p-1">-</td>
                                            </tr>
                                            <tr>
                                                <td style={noOutline} colSpan={10}>
                                                    <Stack
                                                        direction="row"
                                                        gap={1}
                                                        className="w-full"
                                                        alignContent={"end"}
                                                        justifyContent={"end"}
                                                    >
                                                        <Button
                                                            startDecorator={
                                                                <FaRegPlusSquare/>
                                                            }
                                                            variant="soft"
                                                            color="success"
                                                            className="mt-1 w-40"
                                                            onClick={() => addEmptyItem(true)}
                                                        >
                                                            Add NC
                                                        </Button>
                                                        <Button
                                                            startDecorator={
                                                                <FaRegPlusSquare/>
                                                            }
                                                            variant="soft"
                                                            className="mt-1 w-40"
                                                            onClick={() => addEmptyItem()}
                                                        >
                                                            Add
                                                        </Button>
                                                    </Stack>
                                                </td>
                                            </tr>
                                            <tr>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </CardContent>
                                </Card>
                                <Divider orientation="horizontal"/>
                                <Stack
                                    direction="row"
                                    gap={1}
                                    className="items-center"
                                >
                                    <Box className="flex items-center justify-center">
                                                  <span
                                                      className="font-bold"
                                                  >TCS&nbsp;:</span>
                                    </Box>
                                    <Input
                                        placeholder="TCS"
                                        type="number"
                                        name="tcs"
                                        required
                                        onKeyDown={(e) => {
                                            if (e.key === 'e' || e.key === 'E') {
                                                e.preventDefault();
                                            }
                                        }}
                                        value={tcs}
                                        onChange={(e) => setTcs(e.target.value)}
                                        endDecorator={
                                            <Chip
                                                variant="outlined"
                                                className="font-bold bg-gray-100"
                                            >
                                                <span className="font-bold">₹{totalTcs.toFixed(2)}</span>
                                            </Chip>
                                        }
                                    />
                                    <Divider orientation="vertical"/>
                                    <Box
                                        className="flex items-center justify-center"
                                    >
                                                  <span
                                                      className="font-bold"
                                                  >FOR&nbsp;:</span>
                                    </Box>
                                    <Input
                                        placeholder="FOR"
                                        type="number"
                                        name="for_charges"
                                        required
                                        onKeyDown={(e) => {
                                            if (e.key === 'e' || e.key === 'E') {
                                                e.preventDefault();
                                            }
                                        }}
                                        value={for_charges}
                                        onChange={(e) => setFor_charges(e.target.value)}
                                        endDecorator={
                                            <Chip
                                                variant="outlined"
                                                className="font-bold bg-gray-100"
                                            >
                                                <span className="font-bold">₹{totalFor.toFixed(2)}</span>
                                            </Chip>
                                        }
                                    />
                                    <Divider orientation="vertical"/>
                                    {/* <Box
                                                  className="flex items-center justify-center"
                                             >
                                                  <span
                                                       className="font-bold"
                                                  >Defective Amount&nbsp;:</span>
                                             </Box>
                                             <Input
                                                  placeholder="Defective Pay"
                                                  type="number"
                                                  name="defective_amount"
                                                  required
                                                  value={defective_amount}
                                                  onChange={(e) => {
                                                       setDefectiveAmount(
                                                            e.target.value
                                                       )
                                                  }}
                                             /> */}
                                    <Box
                                        className="flex items-center justify-center"
                                    >
                                                  <span
                                                      className="font-bold"
                                                  >Paid&nbsp;:</span>
                                    </Box>
                                    <Input
                                        placeholder="Amt Pay"
                                        type="number"
                                        name="pay_amt"
                                        onKeyDown={(e) => {
                                            if (e.key === 'e' || e.key === 'E') {
                                                e.preventDefault();
                                            }
                                        }}
                                        required
                                        value={paid_val}
                                        onChange={(e) => {
                                            setPaid_val(e.target.value)
                                        }}
                                    />
                                </Stack>
                                <Divider className="my-1"/>
                                <Stack direction="column" gap={1} alignContent="end" justifyContent="end"
                                       alignItems="end"
                                       className="w-full">
                                    <Table
                                        size="lg"
                                        sx={{
                                            tableLayout: "auto",
                                            textAlign: "end",
                                            backgroundColor: "white",
                                            "& td, & tr, & th": {
                                                padding: 0,
                                                margin: 0,
                                                height: "unset",
                                                verticalAlign: "middle",
                                                borderColor: "white",
                                                borderWidth: 0,
                                            },
                                        }}
                                    >
                                        <tbody
                                            style={{
                                                textAlign: "end",
                                                backgroundColor: "white",
                                            }}
                                        >
                                        <tr>
                                            <th className="!border-0 bg-white  p-0 m-0 w-40"><span
                                                className="font-bold">Total</span></th>
                                            <td className="!border-0 bg-white  p-0 m-0  text-left">
                                                <span
                                                    className="text-bold text-black font-black">+{totalAmt.toFixed(2)}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="!border-0 bg-white  p-0 m-0 w-40"><span
                                                className="font-bold">Total TCS</span></th>
                                            <td className="!border-0 bg-white  p-0 m-0  text-left">
                                                <span
                                                    className="text-bold text-black font-black">+{totalTcs.toFixed(2)}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="!border-0 bg-white  p-0 m-0 w-40"><span
                                                className="font-bold">Total FOR</span></th>
                                            <td className="!border-0 bg-white  p-0 m-0  text-left">
                                                <span
                                                    className="text-bold text-black font-black">+{totalFor.toFixed(2)}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="!border-0 bg-white  p-0 m-0 w-40"><span
                                                className="font-bold">Total Return</span></th>
                                            <td className="!border-0 bg-white  p-0 m-0  text-left">
                                                <span
                                                    className="text-bold text-black font-black">-{defective_amount.toFixed(2)}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="!border-0 bg-white  p-0 m-0 w-40"><span
                                                className="font-bold">Total Scheme</span></th>
                                            <td className="!border-0 bg-white  p-0 m-0  text-left">
                                                <span
                                                    className="text-bold text-black font-black">-{totalScheme.toFixed(2)}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="!border-0 bg-white  p-0 m-0 w-40"><span
                                                className="font-bold">Total Target</span></th>
                                            <td className="!border-0 bg-white  p-0 m-0  text-left">
                                                <span
                                                    className="text-bold text-black font-black">-{totalTargetAmt.toFixed(2)}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="!border-0 bg-white  p-0 m-0 w-40" colSpan={2}>
                                                <Divider orientation="horizontal" className="!bg-gray-300"/>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className="border-0 bg-white p-0 m-0">Billing Amt</th>
                                            <td className="border-0 bg-white  p-0 m-0  text-left">
                                                <Stack
                                                    direction="row"
                                                    gap={1}
                                                    className="items-center"
                                                >
                                                    <Tooltip
                                                        placement="right"
                                                        size="lg"
                                                        color="success"
                                                        arrow
                                                        variant="outlined"
                                                        title={`₹${billing.toFixed(2)}`}
                                                    >
                                                                           <span
                                                                               className="text-blue-700 font-bold"
                                                                           >{`₹${billing.toFixed(2)}`}</span>
                                                    </Tooltip>
                                                    {/* <span className="text-gray-500 text-xs">({totalAmt.toFixed(2)} - {totalScheme.toFixed(2)} of Scheme)</span> */}
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="!border-0 bg-white  p-0 m-0 w-40" colSpan={2}>
                                                <Divider orientation="horizontal" className="!bg-gray-300"/>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className="border-0 bg-white p-0 m-0">Payment Amt</th>
                                            <td className="border-0 bg-white  p-0 m-0  text-left">
                                                <Tooltip
                                                    placement="right"
                                                    size="lg"
                                                    arrow
                                                    variant="solid"
                                                    title={`${paid_val}`}
                                                >
                                                                      <span className="font-bold text-green-700">
                                                                           ₹{paid_val}
                                                                      </span>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="!border-0 bg-white  p-0 m-0 w-40" colSpan={2}>
                                                <Divider orientation="horizontal" className="!bg-gray-300"/>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className="!border-0 bg-white  p-0 m-0 w-40"><span
                                                className="font-bold">Balance</span></th>
                                            <td className="!border-0 bg-white  p-0 m-0  text-left">
                                                <Tooltip
                                                    placement="right"
                                                    size="lg"
                                                    arrow
                                                    variant="solid"
                                                    title={`${billing.toFixed(2)} - ${paid_val}`}
                                                >
                                                                      <span className="font-bold">
                                                                           ₹{ballance.toFixed(2)}
                                                                      </span>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                    <Stack
                                        sx={{
                                            width: "100%"
                                        }}
                                        direction="column"
                                        alignContent="start"
                                        alignItems="start"

                                    >
                                        <Table
                                            className="w-full text-center font-bold bg-white"
                                            sx={{
                                                tableLayout: "auto",
                                                width: "auto",
                                                "& td, & tr, & th": {
                                                    padding: 0,
                                                    margin: 0,
                                                    paddingX: .5,
                                                    height: "unset",
                                                    verticalAlign: "middle",
                                                    textAlign: "center"
                                                }
                                            }}
                                        >
                                            <thead>
                                            <tr>
                                                <th className="text-black">Gas</th>
                                                <th className="text-black">Total Qty</th>
                                                <th className="text-black">Total KG</th>
                                                <th className=" text-black">Total MT Qty</th>
                                                <th className=" text-black">Total MT Kg</th>
                                                <th className=" text-black">Total Return Qty</th>
                                                <th className="text-black">Total Return KG</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                [...gasCalculationMap?.values() || []].map((gas, index) => {
                                                    return (<tr>
                                                        <td className="text-black whitespace-nowrap">Go Gas {gas.kg}KG
                                                        </td>
                                                        <td className="text-black">{gas.totalQty}</td>
                                                        <td className="text-black">{gas.totalKg}</td>
                                                        <td className="text-black">{gas.mt}</td>
                                                        <td className="text-black">{toNumber(gas.mt) * toNumber(gas.kg)}</td>
                                                        <td className="text-black">{gas.returnQty}</td>
                                                        <td className="text-black">{gas.returnKg}</td>
                                                    </tr>)
                                                })
                                            }
                                            </tbody>
                                        </Table>
                                    </Stack>
                                    <span className="flex-grow"></span>
                                    <Box
                                        className="flex place-items-end"
                                    >
                                        <Button
                                            variant="outlined"
                                            onClick={() => setAddPurchaseModel(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <span
                                            className="w-2.5"
                                        />
                                        <Button
                                            startDecorator={
                                                <CgAdd/>
                                            }
                                            type="submit"
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Stack>
                            </Stack>
                        </form>
                    </Sheet>
                </Container>
            </Modal>
        </>
    );
}

function OrderItemRow({
                          item,
                          index,
                          gaslistData,
                          gasListMap,
                          orderItems,
                          handleItemChange,
                          removeItem,
                          noOutline,
                          nc
                      }) {
    let totalAmt = 0
    let totalKg = 0
    let totalReturnKg = 0
    const gas = gasListMap.get(item.gas_id)
    totalKg = (item.qty) * (gas.kg)
    totalReturnKg = (item.return_cyl_qty) * (gas.kg)
    if (nc) {
        totalAmt = item.qty * item.rate
    } else {
        totalAmt = item.qty * gas.kg * item.rate
    }

    const handleGasChange = (newValue) => {
        let ok = true;
        if (orderItems.find(item => item.gas_id === newValue) != null) {
            alert("Gas already added");
            ok = false;
            return;
        }
        if (ok) {
            handleItemChange(index, 'gas_id', newValue, nc);
        }
    }

    const gasList = gaslistData.map(gas => {
        if (gas.company_name === "GO GAS") return (
            <Option
                key={gas.id}
                value={gas.id}
                label={`${gas.company_name} : ${gas.kg} KG`}
                className="bg-transparent text-black"
            >
                {`${gas.company_name} : ${gas.kg} KG`}
            </Option>
        );
    })

    return (
        <tr key={`order-${nc ? 'nc-' : ''}item-${item.id}-${index}`}>
            <td>
                <Select
                    color="neutral"
                    variant="plain"
                    placeholder="select Gas"
                    size="sm"
                    name="gas_id"
                    required
                    className="flex-grow w-full !m-0 !rounded-none"
                    sx={{backgroundColor: "#fff8e0bd"}}
                    //defaultValue={item.gas_id}
                    value={item.gas_id}
                    onChange={(event, newValue) => {
                        handleGasChange(newValue);
                    }}
                >
                    {gasList}
                </Select>
            </td>
            <td className="!max-w-20">
                <Input
                    placeholder="Quantity"
                    color="neutral"
                    variant="plain"
                    type="text"
                    name="qty"
                    size="sm"
                    className="!m-0 !rounded-none"
                    sx={{backgroundColor: "#fff8e0bd"}}
                    required
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, 'qty', e.target.value, nc)}
                />
            </td>
            <td className="text-start">
                <span className="font-bold ps-2">{`Total : ${totalKg} KG`}</span>
            </td>
            <td className="!max-w-20">
                <Input
                    color="neutral"
                    variant="plain"
                    placeholder="Rate"
                    className="!m-0 !rounded-none"
                    type="text"
                    name="rate"
                    size="sm"
                    sx={{backgroundColor: "#fff8e0bd"}}
                    required
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, 'rate', e.target.value, nc)}
                />
            </td>
            <td className="text-start">
                <span className="font-bold ps-2"> {`Total : ₹${totalAmt.toFixed(2)}`}</span>
            </td>
            {
                (!nc ? <>
                    <td className="!max-w-20">
                        <Input
                            color="neutral"
                            variant="plain"
                            placeholder="MT Qty"
                            type="number"
                            name="mt_cyl_qty"
                            defaultValue={0}
                            sx={{backgroundColor: "#fff8e0bd"}}
                            size="sm"
                            className="flex-grow !m-0 !rounded-none"
                            required
                            value={item.mt_cyl_qty}
                            onChange={(e) => {
                                //  console.log(item.qty, e.target.value);
                                // if (item.qty < e.target.value) {
                                //      alert("Return qty should be less than qty");
                                //      return;
                                // }
                                handleItemChange(index, 'mt_cyl_qty', e.target.value, nc);
                            }}
                        />
                    </td>
                </> : <></>)
            }
            {
                (!nc ? <td className="!max-w-20"><Input
                    placeholder="Return Qty"
                    type="text"
                    name="return_cyl_qty"
                    size="sm"
                    className="flex-grow !m-0 !rounded-none"
                    color="neutral"
                    variant="plain"
                    sx={{backgroundColor: "#fff8e0bd"}}
                    required
                    value={item.return_cyl_qty}
                    onChange={(e) => {
                        //console.log(item.qty, e.target.value);
                        // if (item.qty < e.target.value) {
                        //      alert("Return qty should be less than qty");
                        //      return;
                        // }
                        handleItemChange(index, 'return_cyl_qty', e.target.value, nc);
                    }}
                /></td> : <></>)
            }
            <td className="!break-keep text-start" colSpan={nc ? 3 : 0}>
                <span
                    className={`font-bold ${nc ? "hidden" : ""} !break-keep ps-2`}>{`Total : ${totalReturnKg} KG | Amt : ${decimalFix(totalReturnKg * item.rate, true)}`}</span>
            </td>
            <td>
                <Button
                    variant="outlined"
                    className="!m-0 w-full !rounded-none"
                    color="danger"
                    onClick={() => {
                        const confirm = window.confirm("Are you sure you want to delete this item?");
                        if (confirm) {
                            removeItem(index, nc);
                        }
                    }}
                >
                    <CgTrash/>
                </Button>
            </td>
        </tr>
    );
}