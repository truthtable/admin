import React, {useEffect, useRef, useState} from "react";
import {Box, Button, Card, Divider, Input, LinearProgress, Option, Select, Sheet, Stack, Table} from "@mui/joy";
import {useDispatch, useSelector} from 'react-redux';
import {fetchCustomers} from "../../redux/actions/customerActions";
import {fetchReport} from "../../redux/actions/reportActions";
import {useReactToPrint} from "react-to-print";
import {fetchOrders} from "../../redux/actions/purchaseOrderActions.js";
import {getPlants} from "../../redux/actions/plantsActions.js";
import {fetchGasData} from "../../state/GasList.jsx";
import {FaArrowTurnDown} from "react-icons/fa6";
import {IoClose} from "react-icons/io5";
import {BsBack} from "react-icons/bs";
import {FaArrowLeft} from "react-icons/fa";

const CUSTOMER = "customer";
const DELIVERY = "delivery";
const PURCHASE = "purchase";

export const Report = () => {
    const currentUrl = window.location.href;
    const hashIndex = currentUrl.indexOf('#');
    const hashPart = currentUrl.substring(hashIndex + 1);
    const url = new URL(hashPart, window.location.origin);
    const searchParams = new URLSearchParams(url.search);

    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({contentRef})

    const [selected, setSelected] = React.useState(CUSTOMER);

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

    console.log({
        reportLoading,
        report,
        reportError
    });

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
            url = url + `?customer=${selectedCustomer}&start_date=${startDate}&end_date=${endDate}`;
            window.location.href = url;

            // Fetch report data
            dispatch(fetchReport({customer: selectedCustomer, startDate: startDate, endDate: endDate}));
        };

        useEffect(() => {
            if (customers.length === 0 && !customersLoading) {
                dispatch(fetchCustomers());
            }
        }, []);

        console.log(report)
        let grandTotal = 0;
        let grandTotalPaid = 0;
        let grandGasQuantity = 0;
        return (
            <Stack sx={{padding: 1, flexGrow: 1}} direction={"row"} gap={1}>
                <Stack gap={1}>
                    <Stack>
                        <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"}>
                            <span style={{fontWeight: "bold", color: "black"}}>Customer&nbsp;:&nbsp;</span>
                            <Select
                                placeholder="Select User"
                                variant="outlined"
                                sx={{width: "100%"}}
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
                    <Divider sx={{backgroundColor: "#979797"}}/>
                    <Stack>
                        <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"}>
                            <span style={{fontWeight: "bold", color: "black"}}>Date&nbsp;Start&nbsp;:&nbsp;</span>
                            <Input
                                type="date"
                                sx={{width: "100%"}}
                                onChange={(event) => {
                                    setStartDate(event.target.value);
                                }}
                                defaultValue={startDate}
                            />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"}>
                            <span style={{fontWeight: "bold", color: "black"}}>End&nbsp;Start&nbsp;:&nbsp;</span>
                            <Input
                                type="date"
                                sx={{width: "100%"}}
                                onChange={(event) => {
                                    setEndDate(event.target.value);
                                }}
                                defaultValue={endDate}
                            />
                        </Stack>
                    </Stack>
                    <Divider sx={{backgroundColor: "#979797"}}/>
                    <Button
                        variant="contained"
                        sx={{backgroundColor: "#263043", color: "white", width: "100%"}}
                        onClick={() => handleSubmit()}
                    >
                        OK
                    </Button>
                </Stack>
                <Divider orientation={"vertical"} sx={{m: 1, backgroundColor: "#979797"}}/>
                <Stack
                    sx={{
                        overflow: "auto",
                    }}
                >
                    <Stack
                        sx={{
                            padding: 4, m: 2, overflow: "auto", flexGrow: 1, height: "100%", alignItems: "stretch",
                            border: "1px solid #979797",
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
                                            <th>Delivery Date</th>
                                            <th>Delivery By</th>
                                            <th>Gas</th>
                                            <th>Quantity</th>
                                            <th>Rate</th>
                                            <th>Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            report.deliveries.map((delivery, index1) => {
                                                if (delivery.cleared) {
                                                    return
                                                }
                                                let subTotal = 0;
                                                grandTotalPaid += delivery.received_amount;
                                                return delivery.gas_deliveries.map((gasDelivery, index) => {
                                                    let tempTotal = gasDelivery.price * gasDelivery.quantity;
                                                    subTotal += tempTotal;
                                                    grandTotal += tempTotal;
                                                    grandGasQuantity += gasDelivery.quantity;
                                                    return <tr key={index + "report_td" + gasDelivery.id}>
                                                        <td className="b">{formatDate(delivery.created_at)}</td>
                                                        <td className="b">{report.courierBoy.find((boy) => boy.id === delivery.courier_boy_id).username
                                                        }</td>
                                                        <td className="b">{gasDelivery.gas_cylinder.company_name} : {gasDelivery.gas_cylinder.kg}KG <span
                                                            style={{
                                                                color: gasDelivery.is_empty ? "#AF1740" : "green"
                                                            }}>{gasDelivery.is_empty ? "Recived" : `Delivered`}</span>
                                                        </td>
                                                        <td className="b">{gasDelivery.quantity}</td>
                                                        <td className="b">{gasDelivery.is_empty ? "-" : `₹${gasDelivery.price}`}</td>
                                                        <td className="b">{gasDelivery.is_empty ? "-" : `₹${tempTotal}`}</td>
                                                    </tr>
                                                })

                                            })
                                        }
                                        </tbody>
                                    </Table>
                                    {/* <Stack sx={{ color: "black", backgroundColor: "#e3e3e3", p: 1, borderRadius: "sm" }}>
                                                  {
                                                       report.deliveries.map((delivery, index1) => {
                                                            let subTotal = 0;
                                                            grandTotalPaid += delivery.received_amount;
                                                            return <Stack key={index1}>
                                                                 <span
                                                                      style={{
                                                                           textDecoration: "underline",
                                                                           fontWeight: "bold",
                                                                      }}
                                                                 >{`${formatDateTime(delivery.created_at)} : ${report.courierBoy.find((boy) => boy.id === delivery.courier_boy_id).user.name
                                                                      }`}</span>{delivery.id}
                                                                 {
                                                                      delivery.gas_deliveries.map((gasDelivery, index) => {
                                                                           if (gasDelivery.is_empty == 1) {
                                                                                return
                                                                           }
                                                                           let tempTotal = gasDelivery.price * gasDelivery.quantity;
                                                                           subTotal += tempTotal;
                                                                           grandTotal += tempTotal;
                                                                           return (<span key={index} > {
                                                                                `
                                                                      ${gasDelivery.gas_cylinder.company_name} :  ${gasDelivery.gas_cylinder.kg}KG
                                                                      : ${gasDelivery.quantity} QTY
                                                                      : Rate ${gasDelivery.price}₹
                                                                      : Total ${tempTotal}₹
                                                                      `
                                                                           }</span>)
                                                                      })}
                                                                 {
                                                                      delivery.gas_deliveries.map((gasDelivery, index) => {
                                                                           if (gasDelivery.is_empty == 0) {
                                                                                return
                                                                           }
                                                                           return (<span key={index} > {
                                                                                `
                                                                      ${gasDelivery.gas_cylinder.company_name} :  ${gasDelivery.gas_cylinder.kg}KG
                                                                      : ${gasDelivery.quantity} QTY
                                                                      `
                                                                           }</span>)
                                                                      })}
                                                                 <span style={{ fontWeight: "bold", color: "black" }}>
                                                                      {
                                                                           `Sub Total : ${subTotal}₹`
                                                                      }
                                                                 </span>
                                                                 <span style={{ fontWeight: "bold", color: "black" }}>
                                                                      {
                                                                           `Paid Amount : ${delivery.received_amount}₹`
                                                                      }
                                                                 </span>
                                                                 <span style={{ fontWeight: "bold", color: "black" }}>
                                                                      {
                                                                           `Remaining Amount : ${subTotal - delivery.received_amount}₹`
                                                                      }
                                                                 </span>
                                                                 <Divider sx={{ backgroundColor: "#979797", m: 1, opacity: 0.5 }} />
                                                            </Stack>
                                                       })
                                                  }
                                             </Stack> */}
                                    <span style={{fontWeight: "bold", color: "black", marginTop: 8}}>
                                                  {
                                                      `Total Gas Quantity : ${grandGasQuantity}`
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
                            ) : ("Select customer and date range to view report")
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
                        style={{display: "flex", justifyContent: "end"}}
                    >
                        <Button onClick={reactToPrintFn}>Print Bill</Button>
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

        const allGases = useSelector(state => state.gas);
        const {plants, plantsLoading, plantsError, plantsUpdateSuccess} = useSelector(state => state.plants);
        const {orders, loading, error} = useSelector(state => state.purchaseOrders);
        const [startDate, setStartDate] = useState(() => {
                const now = new Date();
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const formattedDate = startOfMonth.toLocaleDateString('en-GB').split('/').reverse().join('-');
                return formattedDate;
            }
        );
        const [endDate, setEndDate] = useState(() => {
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
        console.log(orders,);
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
                                    <OrderRow orders={orders} allGas={allGases.data} plants={plants}/>
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
            <Stack sx={{display: "flex", flexDirection: "row", gap: 1}}>
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
            <Divider sx={{m: 1, backgroundColor: "#979797"}}/>
            {selected === CUSTOMER && <Customer/>}
            {selected === DELIVERY && <DeliveryBoy/>}
            {selected === PURCHASE && <Purchase/>}
        </Stack>
    );
};

function checkValidDate(date) {
    return date.match(/^\d{4}-\d{2}-\d{2}$/);
}

//2024-11-11T11:31:05.000000Z format to 2024-11-11 : 11:31:PM
function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString('en-GB').split('/').reverse().join('-');
    const formattedTime = date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    return `${formattedDate} : ${formattedTime}`;
}

function formatDate(d) {
    const date = new Date(d);
    const formattedDate = date.toLocaleDateString('en-GB').split('/').reverse().join('-');
    return formattedDate;
}

function OrderRow({orders, allGas, plants}) {
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({contentRef})
    const [selected, setSelected] = React.useState(null);
    console.log(plants)
    if (selected != null) {
        console.log(selected)
        return <Stack direction={"column"} gap={1}>
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
                    }}
                    onClick={() => {
                        reactToPrintFn()
                    }}
                >
                    <span style={{fontWeight: "bold"}}>Print</span>
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
                    sx={{width: "100%", mt: 1, tableLayout: "auto",}}
                >
                    <thead>
                    <tr>
                        <th>Order No.</th>
                        <th>Order Date</th>
                        <th>Plant</th>
                        <th>Scheme</th>
                        <th>Rate</th>
                        <th>Gas</th>
                        <th>Qty</th>
                        <th>Total Kg</th>
                        <th>Rate</th>
                        <th>Total</th>
                        <th>Return Qty</th>
                        <th>Total Return Kg</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map((order, index) => {

                            if (order.id != selected.id) {
                                return
                            }

                            console.log(order)

                            const orderNumber = order.order_no;
                            const orderDate = order.date;
                            const orderSchemeType = order.scheme_type;
                            const orderTtotalPayAmt = Number(order.pay_amt);
                            const orderTCS = Number(order.tcs);
                            const orderFOR = Number(order.for_charges);
                            const orderSchemeRate = Number(order.scheme);
                            const orderPlant = plants.filter(plant => plant.id === order.plant_id)[0].name
                            const orderTotalDefectiveAmount = Number(order.defective_amount);

                            let totalCylinder = 0;
                            let orderTotalQty = 0;
                            let orderTotalKg = 0;
                            let orderTotalAmt = 0;
                            let orderTotalTCS = 0;
                            let orderTotalFOR = 0;
                            let orderTotalScheme = 0;
                            let orderTotalRemainingAmt = 0;
                            let orderTotalReturnQty = 0;
                            let orderTotalReturnKg = 0;

                            let orderCleared = order.cleared;

                            let grandTotal = 0;

                            return <>
                                {
                                    order.items.map((item, index) => {
                                        const gas = allGas.data.filter(gas => gas.id === item.gas_id)[0]
                                        const kg = gas.kg
                                        const qty = item.qty
                                        const returnQty = item.return_cyl_qty
                                        const rate = item.rate
                                        const totalKg = kg * qty
                                        const totalReturnKg = kg * returnQty
                                        const totalAmt = totalKg * rate

                                        orderTotalQty += qty
                                        orderTotalKg += totalKg
                                        orderTotalReturnKg += totalReturnKg
                                        orderTotalReturnQty += returnQty
                                        orderTotalAmt += totalAmt

                                        orderTotalScheme = (orderSchemeRate * orderTotalKg);
                                        orderTotalTCS = (orderTCS * orderTotalAmt);
                                        orderTotalFOR = (orderFOR * orderTotalKg);

                                        grandTotal = orderTotalAmt + orderTotalTCS + orderTotalFOR - orderTotalScheme - orderTotalDefectiveAmount

                                        orderTotalRemainingAmt = grandTotal - orderTtotalPayAmt;

                                        return <tr>
                                            <td className="b">{orderNumber}</td>
                                            <td className="b">{orderDate}</td>
                                            <td className="b">{orderPlant}</td>
                                            <td className="b">{orderSchemeType}</td>
                                            <td className="b">{"₹" + orderSchemeRate}</td>
                                            <td className="b">{gas.kg + " KG"}</td>
                                            <td className="b">{qty}</td>
                                            <td className="b">{totalKg}</td>
                                            <td className="b">{"₹" + rate}</td>
                                            <td className="b">{"₹" + totalAmt}</td>
                                            <td className="b">{returnQty}</td>
                                            <td className="b">{totalReturnKg}</td>
                                        </tr>
                                    })
                                }


                                <tr>
                                    <td className="b" colSpan={12}></td>
                                </tr>
                                <tr>
                                    <td className="b" colSpan={2}>Total Kg :</td>
                                    <td className="b" colSpan={10}>{orderTotalKg} KG</td>
                                </tr>
                                <tr>
                                    <td className="b" colSpan={2}>Total Qty :</td>
                                    <td className="b" colSpan={10}>{orderTotalQty}</td>
                                </tr>
                                <tr>
                                    <td className="b" colSpan={2}>Total Return Kg :</td>
                                    <td className="b" colSpan={10}>{orderTotalReturnKg} KG</td>
                                </tr>
                                <tr>
                                    <td className="b" colSpan={2}>Total Return Qty :</td>
                                    <td className="b" colSpan={10}>{orderTotalReturnQty}</td>
                                </tr>
                                <tr>
                                    <td className="b" colSpan={12}></td>
                                </tr>
                                <tr>
                                    <td className="b" colSpan={2}>Defective Amount :</td>
                                    <td className="b" colSpan={10}>{"₹" + orderTotalDefectiveAmount}</td>
                                </tr>
                                <tr>
                                    <td className="b" colSpan={2}>Total Scheme :</td>
                                    <td className="b" colSpan={10}>{"₹" + orderTotalScheme}</td>
                                </tr>
                                <tr>
                                    <td className="b" colSpan={2}>Total TCS (<i>{"₹" + orderTCS}</i>):</td>
                                    <td className="b" colSpan={10}>{"₹" + orderTotalTCS}</td>
                                </tr>
                                <tr>
                                    <td className="b" colSpan={2}>Total FOR (<i>{"₹" + orderFOR}</i>):</td>
                                    <td className="b" colSpan={10}>{"₹" + orderTotalFOR}</td>
                                </tr>
                                <tr>
                                    <td className="b" colSpan={12}></td>
                                </tr>
                                <tr>
                                    <td className="b" style={{color: "#305499", fontSize: "1rem"}} colSpan={2}>Total:
                                    </td>
                                    <td className="b" style={{color: "#305499", fontSize: "1rem"}}
                                        colSpan={10}>{"₹" + grandTotal}</td>
                                </tr>
                                <tr>
                                    <td className="b" style={{color: "#1d5d2e", fontSize: "1rem"}} colSpan={2}>Payed
                                        Amount :
                                    </td>
                                    <td className="b" style={{color: "#1d5d2e", fontSize: "1rem"}}
                                        colSpan={10}>{"₹" + orderTtotalPayAmt}</td>
                                </tr>
                                <tr>
                                    <td className="b" style={{color: "#A0153E", fontSize: "1rem"}}
                                        colSpan={2}>Remaining Amt :
                                    </td>
                                    <td className="b" style={{color: "#A0153E", fontSize: "1rem"}}
                                        colSpan={10}>{"₹" + orderTotalRemainingAmt}</td>
                                </tr>
                            </>
                        })
                    }
                    </tbody>
                </Table>
                <Ending/>
            </Stack>
        </Stack>
    }
    return <Stack direction={"column"} gap={1}>
        {
            orders.map((order, index) => {
                const orderNumber = order.order_no;
                const orderDate = order.date;
                const orderSchemeType = order.scheme_type;
                const orderTtotalPayAmt = Number(order.pay_amt);
                const orderTCS = Number(order.tcs);
                const orderFOR = Number(order.for_charges);
                const orderSchemeRate = Number(order.scheme);
                const orderPlant = plants.filter(plant => plant.id === order.plant_id)[0]
                const orderTotalDefectiveAmount = Number(order.defective_amount);

                let orderTotalQty = 0;
                let orderTotalKg = 0;
                let orderTotalAmt = 0;
                let orderTotalTCS = 0;
                let orderTotalFOR = 0;
                let orderTotalScheme = 0;
                let orderTotalRemainingAmt = 0;
                let orderTotalReturnQty = 0;
                let orderTotalReturnKg = 0;

                let orderCleared = order.cleared;

                if (order.items.length === 0) {
                    return <Card key={`order-row-empty-${order.id}`}
                                 sx={{
                                     width: "100%",
                                     cursor: "pointer",
                                     "transition": "all 0.3s",
                                     "&:hover": {
                                         backgroundColor: "#c7dff7",
                                     },
                                 }}
                    >
                        <Box style={{margin: 0}}>
                            <Stack
                                direction="row"
                            >
                                <span style={{fontWeight: "bold"}}>{`Order No. ${orderNumber}`}</span>
                                <span style={{fontWeight: "bold"}}>|{` Date ${orderDate}`}</span>
                                <span style={{fontWeight: "bold"}}>|{` Scheme ${orderSchemeType}`}</span>
                                <span style={{fontWeight: "bold"}}>|{` Scheme Rate ${orderSchemeRate}`}</span>
                            </Stack>
                            <Card
                                variant="soft"
                                color="danger"
                                sx={{margin: 0, py: 0}}
                            >
                                <span
                                    style={{fontWeight: "bold"}}>No Gas Added Please Add Gas from the edit option</span>
                            </Card>

                        </Box>
                    </Card>
                } else {
                    return (
                        <Card key={`order-row-${order.id}`}
                              sx={{
                                  width: "100%",
                                  cursor: "pointer",
                                  "transition": "all 0.3s",
                                  "&:hover": {
                                      backgroundColor: "#c7dff7",
                                  },
                              }}
                              onClick={() => {
                                  setSelected(order)
                              }}
                        >
                            <Box>
                                <Stack
                                    direction="row"
                                >
                                    <span style={{fontWeight: "bold"}}>{`Order No. ${orderNumber}`}</span>
                                    <span style={{fontWeight: "bold"}}>|{` Date ${orderDate}`}</span>
                                    <span style={{fontWeight: "bold"}}>|{` Scheme ${orderSchemeType}`}</span>
                                    <span style={{fontWeight: "bold"}}>|{` Scheme Rate ${orderSchemeRate}`}</span>
                                </Stack>
                            </Box>
                        </Card>
                    )
                }
            })
        }
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
                              }}>
                                   SHREE RAM DISTRIBUTORS
                              </span>
            <span style={{color: "black", textAlign: "center"}}><i>
                                   Address:SHREE RAM DISTRIBUTOR SHOP NO. 3 OPP ESSAR PUMP , NEAR DADRA GARDEN VAPI SILVASSA ROAD DADRA , DADRA NAGAR HAVELI (U.T.), <br/> Phone: +917984240723, Email : jitenrpande@gmail.com
                              </i> </span>
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
                    height: "100px",
                    width: "100px",
                    rotate: "-45deg",
                }} src="stamp.svg"></img>
            </div>
        </>
    )
}