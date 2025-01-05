import React, {useEffect, useRef} from "react";
import {Box, Button, Divider, Input, LinearProgress, Option, Select, Stack, Table} from "@mui/joy";
import {useDispatch, useSelector} from 'react-redux';
import {fetchCustomers} from "../../redux/actions/customerActions";
import {fetchReport} from "../../redux/actions/reportActions";
import {useReactToPrint} from "react-to-print";

const CUSTOMER = "customer";
const DELIVERY = "delivery";

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
            </Stack>
            <Divider sx={{m: 1, backgroundColor: "#979797"}}/>
            {selected === CUSTOMER && <Customer/>}
            {selected === DELIVERY && <DeliveryBoy/>}
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