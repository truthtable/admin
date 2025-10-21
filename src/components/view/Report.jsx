import React, {useEffect, useRef, useState} from "react";
import {
    Box,
    Button,
    Card,
    Checkbox,
    CircularProgress,
    Divider,
    Input,
    LinearProgress,
    Option,
    Select,
    Sheet,
    Stack,
    Table
} from "@mui/joy";
import {useDispatch, useSelector} from 'react-redux';
import {fetchCustomers} from "../../redux/actions/customerActions";
import {fetchReport} from "../../redux/actions/reportActions";
import {useReactToPrint} from "react-to-print";
import {fetchOrders} from "../../redux/actions/purchaseOrderActions.js";
import {getPlants} from "../../redux/actions/plantsActions.js";
import {fetchGasData} from "../../state/GasList.jsx";
import {FaArrowLeft} from "react-icons/fa";
import {useLocation} from "react-router";
import {decimalFix, formatDateToDDMMYY_HHMM, randomLightColor, titleCase} from "../../Tools.jsx";
import {sendBillToCustomer} from "../../redux/billSlice.js";
import html2pdf from 'html2pdf.js';
import MapObjectManager from "../class/MapArrayManager.jsx";
import {DataCell} from "./DeliveryHistory.jsx";

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

    const downloadPDFContent = async (contentRef) => {
        if (!contentRef?.current) {
            alert('No content to download');
            return;
        }

        try {
            const element = contentRef.current;

            // Ensure the element is visible
            if (!element.offsetParent) {
                throw new Error('Element is not visible or not in DOM');
            }

            const dateString = new Date().toISOString().slice(0, 10).replace(/-/g, '-');
            const fileName = `bill_${dateString}.pdf`;

            const opt = {
                margin: 10, // Add 10mm padding (all sides)
                filename: fileName,
                image: {type: 'jpeg', quality: 0.98},
                html2canvas: {
                    scale: window.devicePixelRatio || 2,
                    useCORS: true,
                    scrollX: 0,
                    scrollY: 0,
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait',
                }
            };

            await html2pdf().set(opt).from(element).save();

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        }
    };

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

    // console.log({
    //      reportLoading,
    //      report,
    //      reportError
    // });

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

        const [showNewConnections, setShowNewConnections] = useState(false);


        //console.log('selectedCustomer', selectedCustomer);

        const handleSubmit = () => {
            console.log(selectedCustomer, startDate, endDate);
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
        let grandTotal = 0;
        let grandTotalPaid = 0;
        let grandGasQuantity = 0;
        let grandPendingQuantity = 0;

        const KGS = new Set();
        const head = []
        const rows = [];

        try {
            const sortedDeliveries = [...report.deliveries].sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);

                a.gas_deliveries.forEach(gas => {
                    KGS.add(gas.kg);
                });

                return dateA - dateB; // For ascending order
            });
            sortedDeliveries.forEach((delivery, i) => {
                const correction = delivery.correction;
                const gasDataMap = new MapObjectManager();
                try {
                    delivery.gas_deliveries.forEach((gas, index) => {
                        const k = `kg${gas.kg}`;
                        const entry = {};
                        if (gas.nc) {
                            entry.nc = gas.quantity;
                            entry.ncRate = gas.gas_price;
                        } else if (gas.is_empty) {
                            entry.mt = gas.quantity;
                        } else {
                            entry.qty = gas.quantity;
                            entry.rate = gas.gas_price;
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
                        const amount = Number(payment.amount);
                        if (payment.method === 0) {
                            cash += amount;
                        } else if (payment.method === 1) {
                            online += amount;
                        }
                        received += amount;
                    });
                    const sortedKGS = [...KGS].sort((a, b) => a - b);
                    sortedKGS.forEach(kg => {
                        const temp = gasObjs[`kg${kg}`];
                        if (temp) {
                            const total = temp.rate ? (Number(temp.qty) * Number(temp.rate)) : "-";
                            normalSubTotal += temp.rate ? total : 0;
                            const ncTotal = temp.ncRate ? (Number(temp.nc) * Number(temp.ncRate)) : "-";
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
                    const balance = subTotal - received;
                    const displaySubTotal = subTotal === 0 ? "-" : subTotal;
                    const displayReceived = received === 0 ? "-" : received;
                    const date = formatDateToDDMMYY_HHMM(delivery.created_at);
                    const customerName = titleCase("NAME");

                    rows.push([
                        <tr key={`dRow${i}`}>
                            <DataCell correction={correction} key={`delivery-${i}-date`}>{date}</DataCell>
                            <DataCell correction={correction} key={`delivery-${i}-name`}>{customerName}</DataCell>
                            {temptKgsList}
                            <DataCell correction={correction} key={`delivery-${i}-sub`}>{displaySubTotal}</DataCell>
                            <DataCell correction={correction} key={`delivery-${i}-online`}>{online}</DataCell>
                            <DataCell correction={correction} key={`delivery-${i}-cash`}>{cash}</DataCell>
                            <DataCell correction={correction}
                                      key={`delivery-${i}-received`}>{displayReceived}</DataCell>
                            <DataCell correction={correction} key={`delivery-${i}-balance`}>{balance}</DataCell>
                        </tr>
                    ]);
                } catch (err) {
                    console.log(err);
                }
            })
        } catch (e) {
            console.log(e);
        }
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
                            <Select
                                placeholder="Select User"
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    minWidth: {xs: '100%', md: '200px'}
                                }}
                                onChange={(event, value) => {
                                    setSelectedCustomer(value);
                                }}
                                defaultValue={selectedCustomer}
                            >
                                {customers.map((customer, index) => (
                                    <Option key={index + "payment_option"} value={customer.id}>
                                        {customer.user.name} : <span> {customer.user.address}</span>
                                    </Option>
                                ))}
                            </Select>
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
                                   }}>
                                        New Connections :
                                   </span>
                            <Checkbox
                                label=""
                                size="lg"
                                checked={showNewConnections}
                                onChange={(e) => {
                                    setShowNewConnections(e.target.checked);
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
                                             <span style={{fontWeight: "bold", color: "black"}}>
                                                  {
                                                      `Customer : ${report.customer.user.name}`
                                                  }
                                             </span>
                                    <span style={{fontWeight: "bold", color: "black"}}>
                                                  {
                                                      `Address : ${report.customer.user.address}`
                                                  }
                                             </span>
                                    <span style={{fontWeight: "bold", color: "black"}}>
                                                  {
                                                      `Phone No. : ${report.customer.user.phone_no}`
                                                  }
                                             </span>
                                    <span style={{fontWeight: "bold", color: "black"}}>
                                                  {
                                                      `Bill Date Range : ${startDate} to ${endDate}`
                                                  }
                                             </span>
                                    <Divider sx={{backgroundColor: "#979797", m: 1}}/>
                                    <span style={{fontWeight: "bold", color: "black"}}>
                                                  {
                                                      "Delivered Gas List"
                                                  }
                                             </span>
                                    <Table
                                        borderAxis="both"
                                        size="sm"
                                        variant="outlined"
                                        sx={{width: "100%", mt: 1, tableLayout: "auto",}}
                                    >
                                        <thead>
                                        <tr>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            rows
                                        }
                                        </tbody>
                                    </Table>
                                    <span style={{fontWeight: "bold", color: "black", marginTop: 8}}>
                                                  {
                                                      `Total Received Gas Quantity : ${grandGasQuantity}`
                                                  }
                                             </span>
                                    <span style={{fontWeight: "bold", color: "black"}}>
                                                  {
                                                      `Total Pending Gas Quantity : ${grandPendingQuantity}`
                                                  }
                                             </span>
                                    <span style={{fontWeight: "bold", color: "black", marginTop: 8}}>
                                                  {
                                                      `Grand Total : ${grandTotal}₹`
                                                  }
                                             </span>
                                    <span style={{fontWeight: "bold", color: "#0A6847"}}>
                                                  {
                                                      `Total Paid : ${grandTotalPaid}₹`
                                                  }
                                             </span>
                                    <Divider sx={{backgroundColor: "#979797", m: 1, opacity: 0.5}}/>
                                    <span style={{fontWeight: "bold", color: "#A0153E"}}>
                                                  {

                                                      `Total Remaining : ${grandTotal - grandTotalPaid}₹`
                                                  }
                                             </span>
                                    <span style={{fontWeight: "bold", color: "black"}}>
                                                  {
                                                  }
                                             </span>
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
                            {"Print Bill"}
                        </Button>
                        <Divider sx={{backgroundColor: "#979797", m: 1, opacity: 0.5}}/>
                        <Button
                            onClick={() => {
                                downloadPDFContent(contentRef)
                            }}
                            sx={{
                                width: {xs: '100%', md: 'auto'}
                            }}
                        >
                            {"Download Bill"}
                        </Button>
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