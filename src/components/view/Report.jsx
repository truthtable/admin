import React, {useEffect, useRef, useState} from "react";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CircularProgress,
    Divider,
    Input,
    LinearProgress,
    Sheet,
    Stack,
    Switch,
    Table,
    TextField
} from "@mui/joy";
import {useDispatch, useSelector} from 'react-redux';
import {fetchCustomers} from "../../redux/actions/customerActions";
import {fetchReport} from "../../redux/actions/reportActions";
import {useReactToPrint} from "react-to-print";
import {fetchOrders} from "../../redux/actions/purchaseOrderActions.js";
import {getPlants} from "../../redux/actions/plantsActions.js";
import {fetchGasData} from "../../state/GasList.jsx";
import {FaArrowLeft, FaRegUserCircle} from "react-icons/fa";
import {useLocation} from "react-router";
import {dashIfZero, decimalFix, formatDateToDDMMYY_HHMM, randomLightColor, titleCase, toNumber} from "../../Tools.jsx";
import {sendBillToCustomer} from "../../redux/billSlice.js";
import MapObjectManager from "../class/MapArrayManager.jsx";
import {DataCell} from "./DeliveryHistory.jsx";
import {GrLocation} from "react-icons/gr";

const CUSTOMER = "customer";
const DELIVERY = "delivery";
const PURCHASE = "purchase";

export const Report = ({isLogged}) => {


    const currentUrl = window.location.href;
    const hashIndex = currentUrl.indexOf('#');
    const hashPart = currentUrl.substring(hashIndex + 1);
    const url = new URL(hashPart, window.location.origin);
    const searchParams = new URLSearchParams(url.search);

    const location = useLocation();
    const orderData = location.state;

    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({contentRef})

    const [selected, setSelected] = React.useState(() => (
        orderData?.orderId ? PURCHASE : CUSTOMER
    ));

    const dispatch = useDispatch();

    const {
        customersLoading,
        customers,
        customersError
    } = useSelector((state) => state.customer);

    const {
        reportLoading,
        report,
        reportError
    } = useSelector((state) => state.reports);

    //bill
    const {
        isBillLoading,
        isBillError,
        isBillSuccess,
        billErrorMessage
    } = useSelector((state) => state.bill);

    if (isBillSuccess) {
        alert("Bill sent successfully");
    }

    const Customer = () => {
        const [selectedCustomer, setSelectedCustomer] = React.useState(Number(searchParams.get('customer')) || null);

        const [startDate, setStartDate] = React.useState(() => {
            if (searchParams.get('start_date')) {
                return searchParams.get('start_date');
            } else {
                const now = new Date();
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const formattedDate = startOfMonth.toLocaleDateString('en-GB').split('/').reverse().join('-');
                return formattedDate;
            }
        });

        const [endDate, setEndDate] = React.useState(() => {
            if (searchParams.get('end_date')) {
                return searchParams.get('end_date');
            } else {
                const now = new Date();
                const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                const formattedDate = endOfMonth.toLocaleDateString('en-GB').split('/').reverse().join('-');
                return formattedDate;
            }
        });

        const selectedCustomerObj = customers.find(c => c.id === selectedCustomer) || null;

        const [addOutstanding, setAddOutstanding] = useState(false);


        //console.log('selectedCustomer', selectedCustomer);

        const handleSubmit = () => {
            //console.log(selectedCustomer, startDate, endDate);
            if (
                selectedCustomer === undefined ||
                selectedCustomer === null ||
                startDate === undefined ||
                startDate === null ||
                !checkValidDate(startDate) ||
                endDate === undefined ||
                endDate === null ||
                !checkValidDate(endDate)
            ) {
                alert("Please select valid customer and date range");
                return;
            }
            let url = window.location.href;
            url = url.split("?")[0];
            url = url + `?customer=${selectedCustomer}&start_date=${startDate}&end_date=${endDate}&p=2`;
            window.location.href = url;

            // Fetch report data
            dispatch(fetchReport({customer: selectedCustomer, startDate: startDate, endDate: endDate}));
        };

        useEffect(() => {
            if (customers.length === 0 && !customersLoading) {
                dispatch(fetchCustomers());
            }
            try {
                const p = Number(searchParams.get('p'));
                console.log(report === null);
                if (p === 1) {
                    handleSubmit();
                }
            } catch (e) {
                console.log(e);
            }
        }, []);

        //     console.log(report)
        let grandQtyTotal = 0;
        let grandQtyKgTotal = 0;
        let grandMtTotal = 0;
        let grandMtKgTotal = 0;
        let grandOrderTotal = 0;
        let grandTotalOnline = 0;
        let grandTotalCash = 0;

        const KGS = new Set();
        const KGS_COUNT = []
        const rows = [];
        const heads = [];

        try {
            const sortedDeliveries = [...report.deliveries].sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);

                a.gas_deliveries.forEach(gas => {
                    KGS.add(gas.gas_cylinder.kg);
                });
                b.gas_deliveries.forEach(gas => {
                    KGS.add(gas.gas_cylinder.kg);
                });

                return dateA - dateB;
            });
            // const sortedDeliveries = [...report.deliveries].map((d) = {
            //     return
            // })
            sortedDeliveries.forEach((delivery, i) => {
                const correction = delivery.correction;
                const gasDataMap = new MapObjectManager();
                try {
                    delivery.gas_deliveries.forEach((gas, index) => {
                        //console.log(gas);
                        const k = `kg${gas.gas_cylinder.kg}`;
                        const entry = {};
                        if (gas.nc) {
                            entry.nc = toNumber(gas.quantity);
                            entry.ncRate = toNumber(gas.price);
                            KGS_COUNT[`sent${gas.gas_cylinder.kg}`] = (KGS_COUNT[`sent${gas.gas_cylinder.kg}`] || 0) + toNumber(gas.quantity);
                            grandQtyTotal += toNumber(gas.quantity);
                            grandQtyKgTotal += toNumber(gas.quantity) * toNumber(gas.gas_cylinder.kg);
                        } else if (gas.is_empty) {
                            entry.mt = toNumber(gas.quantity);
                            KGS_COUNT[`mt${gas.gas_cylinder.kg}`] = (KGS_COUNT[`mt${gas.gas_cylinder.kg}`] || 0) + toNumber(gas.quantity);
                            grandMtTotal += toNumber(gas.quantity);
                            grandMtKgTotal += toNumber(gas.quantity) * toNumber(gas.gas_cylinder.kg);
                        } else {
                            entry.qty = toNumber(gas.quantity);
                            entry.rate = toNumber(gas.price);
                            KGS_COUNT[`sent${gas.gas_cylinder.kg}`] = (KGS_COUNT[`sent${gas.gas_cylinder.kg}`] || 0) + toNumber(gas.quantity);
                            grandQtyTotal += toNumber(gas.quantity);
                            grandQtyKgTotal += toNumber(gas.quantity) * toNumber(gas.gas_cylinder.kg);
                        }
                        gasDataMap.merge(k, entry);
                    })
                    const temptKgsList = [];
                    const gasObjs = gasDataMap.toObject();
                    let normalSubTotal = 0;
                    let nCSubTotal = 0;
                    let subTotal = 0;
                    let received = 0;
                    let cash = 0;
                    let online = 0;
                    delivery?.payments?.forEach(payment => {
                        const amount = toNumber(payment.amount);
                        if (payment.method === 0) {
                            cash += amount;
                        } else if (payment.method === 1) {
                            online += amount;
                        }
                        received += amount;
                    });
                    grandTotalCash += cash;
                    grandTotalOnline += online;
                    const sortedKGS = [...KGS].sort((a, b) => a - b);
                    sortedKGS.forEach(kg => {
                        const temp = gasObjs[`kg${kg}`];
                        if (temp) {
                            const total = temp.rate ? (toNumber(temp.qty) * toNumber(temp.rate)) : "-";
                            normalSubTotal += temp.rate ? total : 0;
                            const ncTotal = temp.ncRate ? (toNumber(temp.nc) * toNumber(temp.ncRate)) : "-";
                            nCSubTotal += temp.ncRate ? ncTotal : 0;
                            subTotal += (temp.rate ? total : 0) + (temp.ncRate ? ncTotal : 0);

                            temptKgsList.push(
                                <DataCell correction={correction} key={`1delivery-${i}-kg${kg}`}
                                          bgColor={randomLightColor(kg)}>
                                    <span>{temp.qty || "-"}</span>
                                    {temp.nc && (<>
                                        <hr className="border-black opacity-30 h-0.5 w-full"/>
                                        <span className="text-blue-700">{temp.nc}</span>
                                    </>)}
                                </DataCell>,
                                <DataCell correction={correction} key={`2delivery-${i}-kg${kg}`}
                                          bgColor={randomLightColor(kg)}>{temp.mt || "-"}</DataCell>,
                                <DataCell correction={correction} key={`3delivery-${i}-kg${kg}`}
                                          bgColor={randomLightColor(kg)}>
                                    <span>{temp.rate || "-"}</span>
                                    {temp.nc && (<>
                                        <hr className="border-black opacity-30 h-0.5 w-full"/>
                                        <span className="text-blue-700">{temp.ncRate}</span>
                                    </>)}
                                </DataCell>,
                                <DataCell correction={correction} key={`4delivery-${i}-kg${kg}`}
                                          bgColor={randomLightColor(kg)}>
                                    <span>{total}</span>
                                    {temp.nc && (<>
                                        <hr className="border-black opacity-30 h-0.5 w-full"/>
                                        <span className="text-blue-700">{ncTotal}</span>
                                    </>)}
                                </DataCell>
                            );
                        } else {
                            temptKgsList.push(
                                <DataCell correction={correction} key={`1delivery-${i}-kg${kg}`}
                                          bgColor={randomLightColor(kg)}>{"-"}</DataCell>,
                                <DataCell correction={correction} key={`2delivery-${i}-kg${kg}`}
                                          bgColor={randomLightColor(kg)}>{"-"}</DataCell>,
                                <DataCell correction={correction} key={`3delivery-${i}-kg${kg}`}
                                          bgColor={randomLightColor(kg)}>{"-"}</DataCell>,
                                <DataCell correction={correction} key={`4delivery-${i}-kg${kg}`}
                                          bgColor={randomLightColor(kg)}>{"-"}</DataCell>
                            );
                        }
                    })
                    grandOrderTotal += subTotal;
                    let balance = subTotal - received;
                    //}

                    const displaySubTotal = subTotal === 0 ? "-" : subTotal;
                    const displayReceived = received === 0 ? "-" : received;
                    const date = formatDateToDDMMYY_HHMM(delivery.created_at);
                    const note = "note"
                    rows.push([
                        <tr key={`dRow${i}`}>
                            <DataCell correction={correction} key={`delivery-${i}-date`}>{date}</DataCell>
                            {/*<DataCell correction={correction} key={`delivery-${i}-note`}>{note}</DataCell>*/}
                            {temptKgsList}
                            <DataCell correction={correction} key={`delivery-${i}-sub`}>{displaySubTotal}</DataCell>
                            <DataCell correction={correction}
                                      key={`delivery-${i}-online`}>{dashIfZero(online)}</DataCell>
                            <DataCell correction={correction} key={`delivery-${i}-cash`}>{dashIfZero(cash)}</DataCell>
                            <DataCell correction={correction}
                                      key={`delivery-${i}-received`}>{displayReceived}</DataCell>
                            <DataCell correction={correction}
                                      key={`delivery-${i}-balance`}>{(balance < 1) ? "-" : balance}</DataCell>
                        </tr>
                    ]);
                } catch (err) {
                    console.warn(err);
                }
            })
        } catch (e) {
            console.log(e);
        }
        console.log(KGS_COUNT)
        heads.push([
            <th key="h1date" className="!text-center">date</th>,
            ...[...KGS].sort((a, b) => a - b).map(kg => {
                const color = randomLightColor(kg);
                return (<>
                    <th key={`h2kg${kg}`} className="!text-center" style={{backgroundColor: color}}>
                        {kg}kg
                    </th>
                    <th key={`h3mt${kg}`} className="!text-center" style={{backgroundColor: color}}>
                        mt
                    </th>
                    <th key={`h4krate${kg}`} className="!text-center" style={{backgroundColor: color}}>
                        rate
                    </th>
                    <th key={`h2total${kg}`} className="!text-center" style={{backgroundColor: color}}>
                        total
                    </th>
                </>)
            }),
            <th key={`subt`} className="!text-center">sub total</th>,
            <th key={`cash`} className="!text-center">cash</th>,
            <th key={`upi`} className="!text-center">online</th>,
            <th key={`ttl`} className="!text-center">total</th>,
            <th key={`bal`} className="!text-center">balance</th>,
        ])
        return (
            <Stack
                sx={{
                    padding: 1,
                    flexGrow: 1,
                    flexDirection: {xs: 'column', md: 'row'} // Stack direction changes on mobile
                }}
                gap={1}
            >
                {/* Left Panel */}
                <Stack
                    gap={1}
                    sx={{
                        display: isLogged ? "block" : "none",
                        width: {xs: '100%', md: 'auto'}, // Full width on mobile
                        minWidth: {xs: '100%', md: '350px'}, // Control minimum width
                    }}
                >
                    <Stack>
                        <Stack
                            gap={1}
                            direction={"row"}
                            alignContent={"center"}
                            alignItems={"center"}
                            sx={{
                                flexDirection: {xs: 'column', md: 'row'}, // Stack vertically on mobile
                                width: '100%'
                            }}
                        >
                                   <span style={{
                                       fontWeight: "bold",
                                       color: "black",
                                       width: {xs: '100%', md: 'auto'}
                                   }}>
                                        Customer&nbsp;:&nbsp;
                                   </span>
                            <Autocomplete
                                options={customers}
                                getOptionLabel={(c) => c ? titleCase(`${c.user.name} : ${c.user.address}`) : 'Select User'}
                                value={selectedCustomerObj}
                                onChange={(event, value) => setSelectedCustomer(value ? value.id : null)}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.id}>
                                        <Stack className="group bg-white p-2 ps-2 shadow-md hover:!bg-blue-100"
                                               direction="column">
                                            <Stack direction="row" gap={1} alignItems="center">
                                                <FaRegUserCircle/>
                                                <span
                                                    className="!text-black !font-bold">{titleCase(option.user.name)}</span>
                                            </Stack>
                                            <Stack direction="row" gap={1} alignItems="center">
                                                <GrLocation/>
                                                <span className="!text-black">{titleCase(option.user.address)}</span>
                                            </Stack>
                                        </Stack>
                                        <Divider orientation="horizontal"/>
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Select User"
                                        variant="outlined"
                                        inputProps={{
                                            ...params.inputProps,
                                            // keep placeholder visible when value is null
                                            'aria-label': 'select-user'
                                        }}
                                    />
                                )}
                                sx={{width: '100%', minWidth: {xs: '100%', md: '200px'}}}
                                className="!text-black !font-bold"
                            />
                        </Stack>
                    </Stack>

                    <Divider sx={{backgroundColor: "#979797", m: 1}}/>

                    <Stack gap={2}>
                        <Stack
                            gap={1}
                            sx={{
                                flexDirection: {xs: 'column', md: 'row'},
                                alignItems: {xs: 'flex-start', md: 'center'}
                            }}
                        >
                                   <span style={{
                                       fontWeight: "bold",
                                       color: "black",
                                       minWidth: {xs: '100%', md: 'auto'},
                                       wordBreak: 'keep-all',
                                       whiteSpace: 'nowrap'
                                   }}>
                                        <span>Date</span><span> </span><span>Start</span><span>:</span>
                                   </span>
                            <Input
                                type="date"
                                sx={{width: "100%"}}
                                onChange={(event) => {
                                    setStartDate(event.target.value);
                                }}
                                defaultValue={startDate}
                            />
                        </Stack>

                        <Stack
                            gap={1}
                            sx={{
                                flexDirection: {xs: 'column', md: 'row'},
                                alignItems: {xs: 'flex-start', md: 'center'}
                            }}
                        >
                                   <span style={{
                                       fontWeight: "bold",
                                       color: "black",
                                       minWidth: {xs: '100%', md: 'auto'},
                                       whiteSpace: 'nowrap'
                                   }}>
                                        End Date :
                                   </span>
                            <Input
                                type="date"
                                sx={{width: "100%"}}
                                onChange={(event) => {
                                    setEndDate(event.target.value);
                                }}
                                defaultValue={endDate}
                            />
                        </Stack>

                        <Stack
                            gap={1}
                            sx={{
                                flexDirection: {xs: 'column', md: 'row'},
                                alignItems: {xs: 'flex-start', md: 'center'}
                            }}
                        >
                            <span style={{
                                fontWeight: "bold",
                                color: "black",
                                minWidth: {xs: '100%', md: 'auto'},
                                whiteSpace: 'nowrap'
                            }}>Add Outstanding :</span>
                            <Switch
                                size="lg"
                                checked={addOutstanding}
                                onChange={(e) => {
                                    setAddOutstanding(e.target.checked);
                                }}
                            />
                        </Stack>

                    </Stack>

                    <Divider sx={{backgroundColor: "#979797", m: 1}}/>

                    <Button
                        variant="contained"
                        sx={{backgroundColor: "#263043", color: "white", width: "100%"}}
                        onClick={() => handleSubmit()}
                    >
                        OK
                    </Button>
                </Stack>

                {/* Vertical Divider - Hide on mobile */}
                <Divider
                    orientation={"vertical"}
                    sx={{
                        m: 1,
                        backgroundColor: "#979797",
                        display: {
                            xs: 'none',
                            md: isLogged ? "block" : "none"
                        }
                    }}
                />

                {/* Right Panel - Report Content */}
                <Stack
                    sx={{
                        overflow: "auto",
                        width: {xs: '100%', md: 'auto'},
                        flexGrow: 1
                    }}
                >
                    <Stack
                        gap={0.5}
                        sx={{
                            padding: {xs: 1, md: 4},
                            m: {xs: 0, md: 2},
                            overflow: "auto",
                            flexGrow: 1,
                            height: "100%",
                            alignItems: "stretch",
                            border: "1px solid #979797",
                            '@media print': {
                                overflow: "visible", // Hide scrollbars when printing
                                height: "auto",     // Allow content to expand fully
                                border: "none"      // Optionally remove border when printing
                            }
                        }}
                        direction={"column"}
                        ref={contentRef}
                    >
                        <Heading/>
                        {
                            (report) ? (
                                <>
                                    <Stack direction="row" gap={2}>
                                        <Divider className="w-full" orientation={"vertical"}
                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                        <span style={{fontWeight: "bold", color: "black"}}>
                                                  {
                                                      `Customer : ${titleCase(report.customer.user.name)}`
                                                  }
                                             </span>
                                        <Divider className="w-full" orientation={"vertical"}
                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                        <span style={{fontWeight: "bold", color: "black"}}>
                                                  {
                                                      `Address : ${titleCase(report.customer.user.address)}`
                                                  }
                                             </span>
                                        <Divider className="w-full" orientation={"vertical"}
                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                        <span style={{fontWeight: "bold", color: "black"}}>
                                                  {
                                                      `Phone No. : ${report.customer.user.phone_no}`
                                                  }
                                             </span>
                                        <Divider className="w-full" orientation={"vertical"}
                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                        <span style={{fontWeight: "bold", color: "black"}}>
                                                  {
                                                      `Bill Date Range : ${startDate} to ${endDate}`
                                                  }
                                             </span>
                                        <Divider className="w-full" orientation={"vertical"}
                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                    </Stack>
                                    <Table
                                        borderAxis="both"
                                        size="md"
                                        variant="outlined"
                                        color="neutral"
                                        sx={{
                                            width: "100%",
                                            tableLayout: "auto",
                                            border: "1px solid #5f5f5f",
                                            borderCollapse: "collapse",
                                            borderSpacing: 0,
                                            "& th, & td": {
                                                border: "1px solid #5f5f5f",
                                                boxSizing: "border-box",
                                                padding: "0px",
                                                margin: "0px",
                                                height: "unset",
                                            },
                                        }}
                                    >
                                        <thead>
                                        <tr>
                                            {
                                                heads
                                            }
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            rows
                                        }
                                        </tbody>
                                    </Table>
                                    <Divider sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                    <Stack direction="row" gap={2}>
                                        <Divider className="w-full" orientation={"vertical"}
                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                        {
                                            [...KGS].sort((a, b) => a - b).map((kg, index) => {
                                                return (<><Stack direction="column">
                                                <span
                                                    className="font-bold text-black">{`${kg}KG`} : {toNumber(KGS_COUNT[`sent${kg}`])}</span>
                                                        <Divider className="w-full" orientation={"horizontal"}
                                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                                        <span
                                                            className="font-bold text-black">{`MT`} : {toNumber(KGS_COUNT[`mt${kg}`])}</span>
                                                        <Divider className="w-full" orientation={"horizontal"}
                                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                                        <span
                                                            className="font-bold text-black">{`Pending`} : {toNumber(KGS_COUNT[`sent${kg}`]) - toNumber(KGS_COUNT[`mt${kg}`])}</span>
                                                    </Stack>
                                                        <Divider className="w-full" orientation={"vertical"}
                                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                                    </>
                                                )
                                            })
                                        }
                                    </Stack>
                                    <Divider sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                    <Stack direction="row" gap={2}>
                                        <Divider className="w-full" orientation={"vertical"}
                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                        <span
                                            className="font-bold text-black">{`Total KG : ${grandQtyKgTotal}`}kg</span>
                                        <Divider className="w-full" orientation={"vertical"}
                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                        <span className="font-bold text-black">{`Total MT: ${grandMtKgTotal}`}kg</span>
                                        <Divider className="w-full" orientation={"vertical"}
                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                        <span
                                            className="font-bold text-black">{`Total Pending: ${(grandQtyKgTotal - grandMtKgTotal)}`}kg</span>
                                    </Stack>
                                    <Divider sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                    <Stack direction="row" gap={2}>
                                        <Divider className="w-full" orientation={"vertical"}
                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                        <span className="font-bold text-black">
                                                  {
                                                      `Grand Total : ₹${decimalFix(grandOrderTotal)}`
                                                  }
                                             </span>
                                        <Divider className="w-full" orientation={"vertical"}
                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                        <span style={{fontWeight: "bold", color: "#0A6847"}}>
                                                  {
                                                      `Total Paid : ₹${decimalFix(grandTotalOnline + grandTotalCash)}`
                                                  }
                                             </span>
                                        <Divider className="w-full" orientation={"vertical"}
                                                 sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                        <span style={{fontWeight: "bold", color: "#af4831"}}>
                                                  {

                                                      `Total Remaining : ₹${decimalFix(grandOrderTotal - (grandTotalOnline + grandTotalCash))}`
                                                  }
                                             </span>
                                    </Stack>
                                    <Divider sx={{backgroundColor: "#979797", opacity: 0.5}}/>
                                    <Ending/>
                                </>
                            ) : (<>
                                {
                                    isLogged ? ("Select customer and date range to view report") : (<Button

                                        onClick={() => {
                                            let url = window.location.href;
                                            // Change last character to 1
                                            url = url.slice(0, -1) + '1';
                                            window.location.href = url;
                                        }}

                                    >Refresh</Button>)
                                }
                            </>)
                        }
                        <Box
                            sx={
                                {
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "end"
                                }
                            }
                        >
                        </Box>
                    </Stack>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: isLogged ? "end" : "center",
                            padding: '8px'
                        }}
                    >
                        {
                            isLogged ? <>
                                <Button
                                    onClick={() => {
                                        if (!report || !report.customer) {
                                            alert('Please select a customer and generate report first');
                                            return;
                                        }

                                        const currentUrl = window.location.href;
                                        const amount = grandTotal - grandTotalPaid;
                                        //const customerNumber = report.customer.user.phone_no;
                                        const customerNumber = "917984847918";

                                        dispatch(sendBillToCustomer(
                                            currentUrl,
                                            customerNumber,
                                            amount.toString()
                                        ));
                                    }}
                                    sx={{
                                        width: {xs: '100%', md: 'auto'}
                                    }}
                                >
                                    {
                                        isBillLoading ? <CircularProgress/> : "Send Bill To Customer"
                                    }
                                </Button>
                            </> : <></>
                        }
                        <Divider sx={{backgroundColor: "#979797", m: 1, opacity: 0.5}}/>
                        <Button
                            onClick={() => {
                                reactToPrintFn()
                            }}
                            sx={{
                                width: {xs: '100%', md: 'auto'}
                            }}
                        >
                            {"Download"}
                        </Button>
                        <Divider sx={{backgroundColor: "#979797", m: 1, opacity: 0.5}}/>
                        {/*<Button*/}
                        {/*    onClick={() => {*/}
                        {/*        downloadPDFContent(contentRef)*/}
                        {/*    }}*/}
                        {/*    sx={{*/}
                        {/*        width: {xs: '100%', md: 'auto'}*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    {"Download Bill"}*/}
                        {/*</Button>*/}
                    </div>
                </Stack>
            </Stack>
        );
    };

    const DeliveryBoy = () => {
        return (
            <Stack sx={{width: "100%", height: "100%"}}>
                Delivery reports
            </Stack>
        );
    };

    const Purchase = () => {
        const [showBreakdown, setShowBreakdown] = useState(false);
        const allGases = useSelector(state => state.gas);
        const {plants, plantsLoading, plantsError, plantsUpdateSuccess} = useSelector(state => state.plants);
        const {orders, loading, error} = useSelector(state => state.purchaseOrders);
        const [startDate, setStartDate] = useState(() => {

                try {
                    if (orderData.orderDate) {
                        const [day, month, year] = orderData.orderDate.split('-');
                        const formattedDate = new Date(Date.UTC(year, month - 1, day));
                        const dateString = formattedDate.toISOString().slice(0, 10); // Gets YYYY-MM-DD
                        console.log(dateString)
                        return dateString;
                    }
                } catch (e) {
                    console.warn(e)
                }

                const now = new Date();
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const formattedDate = startOfMonth.toLocaleDateString('en-GB').split('/').reverse().join('-');
                console.log(formattedDate)
                return formattedDate;
            }
        );
        const [endDate, setEndDate] = useState(() => {
            try {
                if (orderData.orderDate) {
                    //end date of orderDate month
                    const [day, month, year] = orderData.orderDate.split('-');
                    // Create date for the last day of the given month
                    const endOfMonth = new Date(Date.UTC(year, month, 0)); // month is not decremented here
                    const formattedDate = endOfMonth.toISOString().slice(0, 10);
                    console.log(formattedDate);
                    return formattedDate;
                }
            } catch (e) {
                console.warn(e)
            }
            const now = new Date();
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const formattedDate = endOfMonth.toLocaleDateString('en-GB').split('/').reverse().join('-');
            return formattedDate;
        });
        useEffect(() => {
            if (orders.length === 0) {
                dispatch(fetchOrders({startDate, endDate}));
            }
            if (plants.length === 0) {
                dispatch(getPlants());
            }
            if (allGases.data === null) {
                dispatch(fetchGasData());
            }
        }, [dispatch, startDate, endDate]);
        const handleSubmit = () => {
            dispatch(fetchOrders({startDate, endDate}));
        }
        //console.log(orders,);
        return (
            <Stack sx={{width: "100%", height: "100%"}} direction={"row"} gap={1}>
                <Sheet>
                    <Stack gap={1}>
                        <Input
                            startDecorator={
                                <pre>From:</pre>
                            }
                            placeholder="Start Date"
                            type="date"
                            name="date"
                            value={startDate}
                            onKeyDown={(e) => {
                                try {
                                    e.preventDefault()
                                } catch (e) {
                                    console.warn(e)
                                }
                            }
                            }
                            onFocus={(e) => {
                                try {
                                    e.target.showPicker()
                                } catch (e) {
                                    console.warn(e)
                                }
                            }
                            }
                            onClick={(e) => {
                                try {
                                    e.target.showPicker()
                                } catch (e) {
                                    console.warn(e)
                                }
                            }
                            }
                            onChange={(e) => {
                                try {
                                    setStartDate(e.target.value)
                                } catch (e) {
                                    console.warn(e)
                                }
                            }
                            }
                        />
                        <Input
                            startDecorator={
                                <pre>To:</pre>
                            }
                            placeholder="End Date"
                            type="date"
                            name="date"
                            value={endDate}
                            onKeyDown={(e) => {
                                try {
                                    e.preventDefault()
                                } catch (e) {
                                    console.warn(e)
                                }
                            }
                            }
                            onFocus={(e) => {
                                try {
                                    e.target.showPicker()
                                } catch (e) {
                                    console.warn(e)
                                }
                            }
                            }
                            onClick={(e) => {
                                try {
                                    e.target.showPicker()
                                } catch (e) {
                                    console.warn(e)
                                }
                            }
                            }
                            onChange={(e) => {
                                try {
                                    setEndDate(e.target.value)
                                } catch (e) {
                                    console.warn(e)
                                }
                            }
                            }
                        />
                        <Button
                            variant="contained"
                            sx={{backgroundColor: "#263043", color: "white", width: "100%"}}
                            onClick={() => handleSubmit()}
                        >
                            OK
                        </Button>
                    </Stack>
                </Sheet>
                <Divider orientation={"vertical"} sx={{m: 1, backgroundColor: "#979797"}}/>
                <Sheet sx={{flexGrow: 1}}>
                    <Stack>
                        <LinearProgress sx={{display: (loading || plantsLoading) ? "block" : "none"}}/>
                        {
                            (!loading && !plantsLoading && allGases.data != null && plants.length > 0) ? (
                                <>
                                    <OrderRow orders={orders} allGas={allGases.data} plants={plants}
                                              showBreakdown={showBreakdown} setShowBreakdown={setShowBreakdown}/>
                                </>
                            ) : (<pre>Loading</pre>)
                        }
                    </Stack>
                </Sheet>
            </Stack>
        );
    };

    return (
        <Stack sx={{
            height: "100%", width: "100%", borderRadius: "16px", backgroundColor: "white", padding: 1,
            flexGrow: 1,
            overflow: "auto",
        }}>
            <Box>
                <LinearProgress sx={{display: (reportLoading || customersLoading) ? "block" : "none"}}/>
            </Box>
            <Stack sx={{display: isLogged ? "flex" : "none", flexDirection: "row", gap: 1,}}>
                <Button variant="soft" onClick={() => setSelected(CUSTOMER)}>
                    Customer
                </Button>
                {/* <Button variant="soft" onClick={() => setSelected(DELIVERY)}>
                         Delivery Boy
                    </Button> */}
                <Button variant="soft" onClick={() => setSelected(PURCHASE)}>
                    Purchase
                </Button>
            </Stack>
            <Divider sx={{m: 1, backgroundColor: "#979797", display: isLogged ? "block" : "none",}}/>
            {selected === CUSTOMER && <Customer/>}
            {selected === DELIVERY && <DeliveryBoy/>}
            {selected === PURCHASE && <Purchase/>}
        </Stack>
    );
};

function checkValidDate(date) {
    return date.match(/^\d{4}-\d{2}-\d{2}$/);
}

function formatDate(d) {
    const date = new Date(d);
    const formattedDate = date.toLocaleDateString('en-GB').split('/').reverse().join('-');
    return formattedDate;
}

function OrderRow({orders, allGas, plants, showBreakdown, setShowBreakdown}) {
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({contentRef})
    const [selected, setSelected] = React.useState(null);
    //console.log(plants)

    let grandTotalAmt = 0;
    let grandTotalPaid = 0;

    let rows = []
    orders.forEach((order, index) => {

        console.log(order);

        const orderNumber = order.order_no;
        const orderDate = order.date;
        const orderPlant = plants.filter(plant => plant.id === order.plant_id)[0].name
        const orderSchemeType = order.scheme_type;
        const orderSchemeRate = order.scheme;
        const defectiveAmt = order.defective_amount;
        const tcs = order.tcs;
        const for_ = order.for_charges;
        const paid = order.pay_amt;

        let orderTotalKg = 0
        let orderTotalQty = 0
        let orderTotalReturnKg = 0
        let orderTotalReturnQty = 0
        let orderTotalAmt = 0;

        order.items.forEach((item, i) => {
            const gas = allGas.data.filter(gas => gas.id === item.gas_id)[0]
            const qty = item.qty
            const rate = item.rate
            const totalKg = gas.kg * qty
            const totalAmt = totalKg * rate
            const returnQty = item.return_cyl_qty
            const totalReturnKg = gas.kg * returnQty

            orderTotalKg += totalKg
            orderTotalQty += qty
            orderTotalReturnQty += returnQty
            orderTotalReturnKg += totalReturnKg
            orderTotalAmt += totalAmt;

            rows.push(
                <>
                    <tr
                        key={index + "_" + i + "order_item"}
                    >
                        <td className="b">{orderNumber}</td>
                        <td className="b">{orderDate}</td>
                        <td className="b" colSpan={2}>{orderPlant}</td>
                        <td className="b">{orderSchemeType}</td>
                        {/* <td className="b">{"₹" + decimalFix(orderSchemeRate)}</td> */}
                        <td className="b">{gas.kg + " KG"}</td>
                        <td className="b">{qty}</td>
                        <td className="b">{totalKg}</td>
                        <td className="b">{"₹" + decimalFix(rate)}</td>
                        <td className="b">{"₹" + decimalFix(totalAmt)}</td>
                        <td className="b">{returnQty}</td>
                        <td className="b">{totalReturnKg}</td>
                    </tr>
                </>
            )
        })
        const orderTotalScheme = (orderSchemeRate * orderTotalKg);
        const orderTotalTCS = (tcs * orderTotalAmt);
        const orderTotalFOR = (for_ * orderTotalKg);
        const grandTotal = (orderTotalAmt + orderTotalTCS + orderTotalFOR - orderTotalScheme - defectiveAmt);
        const balance = (grandTotal - paid);

        grandTotalAmt += orderTotalAmt;
        grandTotalPaid += paid;

        if (showBreakdown) {
            rows.push(
                <>
                    <tr>
                        <td className="b" colSpan={2}>Total Qty : {orderTotalQty}</td>
                        <td className="b" colSpan={2}>Total Kg : {orderTotalKg}</td>
                        <td className="b" colSpan={2}>Total MT Qty : {orderTotalReturnQty}</td>
                        <td className="b" colSpan={2}>Total MT Kg : {orderTotalReturnKg}</td>
                    </tr>
                    <tr>
                        <td className="b" colSpan={2}>Scheme Rate : ₹{decimalFix(tcs)}</td>
                        <td className="b" colSpan={2}>Scheme Total: ₹{decimalFix(orderTotalScheme)}</td>
                        <td className="b" colSpan={2}>TCS : ₹{decimalFix(tcs)}</td>
                        <td className="b" colSpan={2}>TCS Total ₹{decimalFix(orderTotalTCS)}</td>
                        <td className="b" colSpan={2}>FOR : ₹{decimalFix(for_)}</td>
                        <td className="b" colSpan={2}>FOR TOTAL ₹{decimalFix(orderTotalFOR)}</td>
                    </tr>
                    <tr>
                        <td className="b" colSpan={2}>Defective : ₹{decimalFix(defectiveAmt)}</td>
                        <td className="b" colSpan={2}>TOTAL ₹{decimalFix(grandTotal)}</td>
                        <td className="b" colSpan={2}>PAID ₹{decimalFix(paid)}</td>
                        <td className="b" colSpan={2}>BAL ₹{decimalFix(balance)}</td>
                    </tr>
                </>
            )
        }
        rows.push(<tr>
            <td className="b" colSpan={12}></td>
        </tr>)
    })

    rows.push(
        <>
            <tr>
                <td className="b" colSpan={12}>Grand Total Amount : {decimalFix(grandTotalAmt)}</td>
            </tr>
            <tr>
                <td className="b" colSpan={12}>Grand Total Paid : {decimalFix(grandTotalPaid)}</td>
            </tr>
            <tr>
                <td className="b" colSpan={12}>Grand Total Balance : {decimalFix(grandTotalAmt - grandTotalPaid)}</td>
            </tr>
        </>
    )

    return <Stack direction={"column"} gap={1}>
        <Stack direction={"column"} gap={1}>
            <Stack direction={"row"} gap={1}>
                <Card
                    variant="soft"
                    color="primary"
                    sx={{
                        cursor: "pointer",
                        "transition": "all 0.3s",
                        "&:hover": {
                            backgroundColor: "#c7dff7",
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "42px",
                    }}
                    onClick={() => {
                        setSelected(null)
                    }}
                >
                    <FaArrowLeft/>
                </Card>
                <Card
                    variant="solid"
                    color="primary"
                    sx={{
                        cursor: "pointer",
                        "transition": "all 0.3s",
                        "&:hover": {
                            backgroundColor: "#c7dff7",
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "42px",
                    }}
                    onClick={() => {
                        reactToPrintFn()
                    }}
                >
                    <span style={{fontWeight: "bold"}}>Print</span>
                </Card>
                <Divider
                    sx={{
                        flexGrow: 1,
                        opacity: 0,
                    }}
                />
                <Card
                    variant="solid"
                    color="primary"
                    sx={{
                        cursor: "pointer",
                        "transition": "all 0.3s",
                        "&:hover": {
                            backgroundColor: "#c7dff7",
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "42px",
                    }}
                    onClick={() => {
                        setShowBreakdown(!showBreakdown)
                    }}
                >
                    <span style={{fontWeight: "bold"}}>Breakdown</span>
                </Card>
            </Stack>

            <Stack direction={"column"} gap={1} ref={contentRef} sx={{
                p: 1,
                m: 1,
                borderRadius: "sm",
                border: "1px solid #979797",
            }}>
                <Heading/>
                <Table
                    borderAxis="both"
                    size="sm"
                    variant="outlined"
                    sx={{
                        width: "100%", mt: 1, tableLayout: "auto",
                        "& th": {
                            fontWeight: "bold",
                            color: "black",
                        },
                        "& td": {
                            fontWeight: "bold",
                            color: "black",
                            wordBreak: "keep-all",
                        }
                    }}
                >
                    <thead>
                    <tr>
                        <th>Order No.</th>
                        <th>Order Date</th>
                        <th colSpan={2}>Plant</th>
                        {/* <th>Scheme</th> */}
                        <th>Rate</th>
                        <th>Gas</th>
                        <th>Qty</th>
                        <th>Total Kg</th>
                        <th>Rate</th>
                        <th>Total</th>
                        <th>MT Qty</th>
                        <th>Total MT Kg</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        rows
                    }
                    </tbody>
                </Table>
                <Ending/>
            </Stack>
        </Stack>
    </Stack>
}

function Heading() {
    return (
        <>
               <span style={{
                   fontWeight: "bold",
                   color: "black",
                   fontSize: "xx-large",
                   textAlign: "center"
               }}>SHREE RAM DISTRIBUTORS
               </span>
            <span style={{color: "black", textAlign: "center"}}><i>Address:SHREE RAM DISTRIBUTOR SHOP NO. 3 OPP ESSAR PUMP , NEAR DADRA GARDEN VAPI SILVASSA ROAD DADRA , DADRA NAGAR HAVELI (U.T.), <br/> Phone: +917984240723, Email : jitenrpande@gmail.com
               </i></span>
            <Divider sx={{backgroundColor: "#979797", m: 1}}/>
        </>
    )
}

function Ending() {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    marginTop: "20px",
                }}
            >
                <img style={{
                    margin: "10px",
                    zIndex: 99,
                    height: "100px",
                    width: "100px",
                    rotate: "-45deg",
                }} src="stamp.png"></img>
            </div>
        </>
    )
}

const Data = ({children}) => {
    return <td>
        {children}
    </td>
}