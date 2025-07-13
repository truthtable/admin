import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Card, Divider, Input, LinearProgress, Option, Select, Sheet, Stack, Table } from "@mui/joy";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from "../../redux/actions/customerActions";
import { fetchReport } from "../../redux/actions/reportActions";
import { useReactToPrint } from "react-to-print";
import { fetchOrders } from "../../redux/actions/purchaseOrderActions.js";
import { getPlants } from "../../redux/actions/plantsActions.js";
import { fetchGasData } from "../../state/GasList.jsx";
import { FaArrowTurnDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { BsBack } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router";
import { formatDateYYMMDD } from "../../Tools.jsx";
import { sendBillToCustomer } from "../../redux/billSlice.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import html2pdf from 'html2pdf.js';

const CUSTOMER = "customer";
const DELIVERY = "delivery";
const PURCHASE = "purchase";

export const Report = ({ isLogged }) => {


     const currentUrl = window.location.href;
     const hashIndex = currentUrl.indexOf('#');
     const hashPart = currentUrl.substring(hashIndex + 1);
     const url = new URL(hashPart, window.location.origin);
     const searchParams = new URLSearchParams(url.search);

     const location = useLocation();
     const orderData = location.state;

     const contentRef = useRef();
     const reactToPrintFn = useReactToPrint({ contentRef })

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
                    image: { type: 'jpeg', quality: 0.98 },
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


     console.log(orderData);

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

     console.log("BILL", isBillLoading, isBillError, isBillSuccess, billErrorMessage);


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
               dispatch(fetchReport({ customer: selectedCustomer, startDate: startDate, endDate: endDate }));
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
          return (
               <Stack
                    sx={{
                         padding: 1,
                         flexGrow: 1,
                         flexDirection: { xs: 'column', md: 'row' } // Stack direction changes on mobile
                    }}
                    gap={1}
               >
                    {/* Left Panel */}
                    <Stack
                         gap={1}
                         sx={{
                              display: isLogged ? "block" : "none",
                              width: { xs: '100%', md: 'auto' }, // Full width on mobile
                              minWidth: { xs: '100%', md: '350px' }, // Control minimum width
                         }}
                    >
                         <Stack>
                              <Stack
                                   gap={1}
                                   direction={"row"}
                                   alignContent={"center"}
                                   alignItems={"center"}
                                   sx={{
                                        flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on mobile
                                        width: '100%'
                                   }}
                              >
                                   <span style={{
                                        fontWeight: "bold",
                                        color: "black",
                                        width: { xs: '100%', md: 'auto' }
                                   }}>
                                        Customer&nbsp;:&nbsp;
                                   </span>
                                   <Select
                                        placeholder="Select User"
                                        variant="outlined"
                                        sx={{
                                             width: "100%",
                                             minWidth: { xs: '100%', md: '200px' }
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

                         <Divider sx={{ backgroundColor: "#979797", m: 1 }} />

                         {/* Date inputs with responsive layout */}
                         <Stack gap={2}>
                              <Stack
                                   gap={1}
                                   sx={{
                                        flexDirection: { xs: 'column', md: 'row' },
                                        alignItems: { xs: 'flex-start', md: 'center' }
                                   }}
                              >
                                   <span style={{
                                        fontWeight: "bold",
                                        color: "black",
                                        minWidth: { xs: '100%', md: 'auto' },
                                        wordBreak: 'keep-all',
                                        whiteSpace: 'nowrap'
                                   }}>
                                        <span>Date</span><span> </span><span>Start</span><span>:</span>
                                   </span>
                                   <Input
                                        type="date"
                                        sx={{ width: "100%" }}
                                        onChange={(event) => {
                                             setStartDate(event.target.value);
                                        }}
                                        defaultValue={startDate}
                                   />
                              </Stack>

                              <Stack
                                   gap={1}
                                   sx={{
                                        flexDirection: { xs: 'column', md: 'row' },
                                        alignItems: { xs: 'flex-start', md: 'center' }
                                   }}
                              >
                                   <span style={{
                                        fontWeight: "bold",
                                        color: "black",
                                        minWidth: { xs: '100%', md: 'auto' },
                                        whiteSpace: 'nowrap'
                                   }}>
                                        End Date :
                                   </span>
                                   <Input
                                        type="date"
                                        sx={{ width: "100%" }}
                                        onChange={(event) => {
                                             setEndDate(event.target.value);
                                        }}
                                        defaultValue={endDate}
                                   />
                              </Stack>
                         </Stack>

                         <Divider sx={{ backgroundColor: "#979797", m: 1 }} />

                         <Button
                              variant="contained"
                              sx={{ backgroundColor: "#263043", color: "white", width: "100%" }}
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
                              width: { xs: '100%', md: 'auto' },
                              flexGrow: 1
                         }}
                    >
                         <Stack
                              sx={{
                                   padding: { xs: 1, md: 4 },
                                   m: { xs: 0, md: 2 },
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
                              <Heading />
                              {
                                   (report) ? (
                                        <>
                                             <span style={{ fontWeight: "bold", color: "black" }}>
                                                  {
                                                       `Customer : ${report.customer.user.name}`
                                                  }
                                             </span>
                                             <span style={{ fontWeight: "bold", color: "black" }}>
                                                  {
                                                       `Address : ${report.customer.user.address}`
                                                  }
                                             </span>
                                             <span style={{ fontWeight: "bold", color: "black" }}>
                                                  {
                                                       `Phone No. : ${report.customer.user.phone_no}`
                                                  }
                                             </span>
                                             <span style={{ fontWeight: "bold", color: "black" }}>
                                                  {
                                                       `Bill Date Range : ${startDate} to ${endDate}`
                                                  }
                                             </span>
                                             <Divider sx={{ backgroundColor: "#979797", m: 1 }} />
                                             <span style={{ fontWeight: "bold", color: "black" }}>
                                                  {
                                                       "Delivered Gas List"
                                                  }
                                             </span>
                                             <Table
                                                  borderAxis="both"
                                                  size="sm"
                                                  variant="outlined"
                                                  sx={{ width: "100%", mt: 1, tableLayout: "auto", }}
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
                                                            report.customer.new_connection.map((connection, index) => {
                                                                 return <tr key={index + "new_connection"}>
                                                                      <td className="b">{formatDate(connection.created_at)}</td>
                                                                      <td className="b">Office</td>
                                                                      <td className="b">{
                                                                           connection.gas_id ? (`${connection.gas.company_name} : ${connection.gas.kg}KG`) : connection.accessorie
                                                                      } <span style={{ color: "blue" }}>New</span></td>
                                                                      <td className="b">{
                                                                           connection.gas_id ? connection.gas_qty : 1
                                                                      }</td>
                                                                      <td className="b">{
                                                                           connection.gas_id ? connection.gas_price : connection.accessorie_price
                                                                      }</td>
                                                                      <td className="b">{
                                                                           connection.gas_id ? connection.gas_price * connection.gas_qty : connection.accessorie_price
                                                                      }</td>
                                                                 </tr>
                                                            })
                                                       }
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
                                                                      if (!gasDelivery.is_empty)
                                                                           grandGasQuantity += gasDelivery.quantity;
                                                                      else
                                                                           grandPendingQuantity += gasDelivery.quantity;
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
                                             <span style={{ fontWeight: "bold", color: "black", marginTop: 8 }}>
                                                  {
                                                       `Total Received Gas Quantity : ${grandGasQuantity}`
                                                  }
                                             </span>
                                             <span style={{ fontWeight: "bold", color: "black" }}>
                                                  {
                                                       `Total Pending Gas Quantity : ${grandPendingQuantity}`
                                                  }
                                             </span>
                                             <span style={{ fontWeight: "bold", color: "black", marginTop: 8 }}>
                                                  {
                                                       `Grand Total : ${grandTotal}₹`
                                                  }
                                             </span>
                                             <span style={{ fontWeight: "bold", color: "#0A6847" }}>
                                                  {
                                                       `Total Paid : ${grandTotalPaid}₹`
                                                  }
                                             </span>
                                             <Divider sx={{ backgroundColor: "#979797", m: 1, opacity: 0.5 }} />
                                             <span style={{ fontWeight: "bold", color: "#A0153E" }}>
                                                  {

                                                       `Total Remaining : ${grandTotal - grandTotalPaid}₹`
                                                  }
                                             </span>
                                             <span style={{ fontWeight: "bold", color: "black" }}>
                                                  {
                                                  }
                                             </span>
                                             <Ending />
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
                                                  width: { xs: '100%', md: 'auto' }
                                             }}
                                        >
                                             Send Bill To Customer
                                        </Button>
                                   </> : <></>
                              }
                              <Divider sx={{ backgroundColor: "#979797", m: 1, opacity: 0.5 }} />
                              <Button
                                   onClick={() => {
                                        reactToPrintFn()
                                   }}
                                   sx={{
                                        width: { xs: '100%', md: 'auto' }
                                   }}
                              >
                                   {"Print Bill"}
                              </Button>
                              <Divider sx={{ backgroundColor: "#979797", m: 1, opacity: 0.5 }} />
                              <Button
                                   onClick={() => {
                                        downloadPDFContent(contentRef)
                                   }}
                                   sx={{
                                        width: { xs: '100%', md: 'auto' }
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
               <Stack sx={{ width: "100%", height: "100%" }}>
                    Delivery reports
               </Stack>
          );
     };

     const Purchase = () => {

          const allGases = useSelector(state => state.gas);
          const { plants, plantsLoading, plantsError, plantsUpdateSuccess } = useSelector(state => state.plants);
          const { orders, loading, error } = useSelector(state => state.purchaseOrders);
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
                    dispatch(fetchOrders({ startDate, endDate }));
               }
               if (plants.length === 0) {
                    dispatch(getPlants());
               }
               if (allGases.data === null) {
                    dispatch(fetchGasData());
               }
          }, [dispatch, startDate, endDate]);
          const handleSubmit = () => {
               dispatch(fetchOrders({ startDate, endDate }));
          }
          //console.log(orders,);
          return (
               <Stack sx={{ width: "100%", height: "100%" }} direction={"row"} gap={1}>
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
                                   sx={{ backgroundColor: "#263043", color: "white", width: "100%" }}
                                   onClick={() => handleSubmit()}
                              >
                                   OK
                              </Button>
                         </Stack>
                    </Sheet>
                    <Divider orientation={"vertical"} sx={{ m: 1, backgroundColor: "#979797" }} />
                    <Sheet sx={{ flexGrow: 1 }}>
                         <Stack>
                              <LinearProgress sx={{ display: (loading || plantsLoading) ? "block" : "none" }} />
                              {
                                   (!loading && !plantsLoading && allGases.data != null && plants.length > 0) ? (
                                        <>
                                             <OrderRow orders={orders} allGas={allGases.data} plants={plants} />
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
                    <LinearProgress sx={{ display: (reportLoading || customersLoading) ? "block" : "none" }} />
               </Box>
               <Stack sx={{ display: isLogged ? "flex" : "none", flexDirection: "row", gap: 1, }}>
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
               <Divider sx={{ m: 1, backgroundColor: "#979797", display: isLogged ? "block" : "none", }} />
               {selected === CUSTOMER && <Customer />}
               {selected === DELIVERY && <DeliveryBoy />}
               {selected === PURCHASE && <Purchase />}
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

function OrderRow({ orders, allGas, plants }) {
     const contentRef = useRef();
     const reactToPrintFn = useReactToPrint({ contentRef })
     const [selected, setSelected] = React.useState(null);
     //console.log(plants)
     if (selected != null) {
          //console.log(selected)
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
                         <FaArrowLeft />
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
                         <span style={{ fontWeight: "bold" }}>Print</span>
                    </Card>
               </Stack>

               <Stack direction={"column"} gap={1} ref={contentRef} sx={{
                    p: 1,
                    m: 1,
                    borderRadius: "sm",
                    border: "1px solid #979797",
               }}>
                    <Heading />
                    <Table
                         borderAxis="both"
                         size="sm"
                         variant="outlined"
                         sx={{ width: "100%", mt: 1, tableLayout: "auto", }}
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

                                        //console.log(order)

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

                                                       return <tr
                                                            key={index + "order_item"}
                                                       >
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
                                                  <td className="b" colSpan={2}>Total TCS ( <i>{"₹" + orderTCS}</i> ):</td>
                                                  <td className="b" colSpan={10}>{"₹" + orderTotalTCS.toFixed(2)}</td>
                                             </tr>
                                             <tr>
                                                  <td className="b" colSpan={2}>Total FOR ( <i>{"₹" + orderFOR}</i> ):</td>
                                                  <td className="b" colSpan={10}>{"₹" + orderTotalFOR.toFixed(2)}</td>
                                             </tr>
                                             <tr>
                                                  <td className="b" colSpan={12}></td>
                                             </tr>
                                             <tr>
                                                  <td className="b" style={{ color: "#305499", fontSize: "1rem" }} colSpan={2}>Total:
                                                  </td>
                                                  <td className="b" style={{ color: "#305499", fontSize: "1rem" }}
                                                       colSpan={10}>{"₹" + grandTotal.toFixed(2)}</td>
                                             </tr>
                                             <tr>
                                                  <td className="b" style={{ color: "#1d5d2e", fontSize: "1rem" }} colSpan={2}>Payed
                                                       Amount :
                                                  </td>
                                                  <td className="b" style={{ color: "#1d5d2e", fontSize: "1rem" }}
                                                       colSpan={10}>{"₹" + orderTtotalPayAmt.toFixed(2)}</td>
                                             </tr>
                                             <tr>
                                                  <td className="b" style={{ color: "#A0153E", fontSize: "1rem" }}
                                                       colSpan={2}>Remaining Amt :
                                                  </td>
                                                  <td className="b" style={{ color: "#A0153E", fontSize: "1rem" }}
                                                       colSpan={10}>{"₹" + orderTotalRemainingAmt.toFixed(2)}</td>
                                             </tr>
                                        </>
                                   })
                              }
                         </tbody>
                    </Table>
                    <Ending />
               </Stack>
          </Stack>
     }
     return <Stack direction={"column"} gap={1}>
          {
               orders.map((order, index) => {
                    const orderNumber = order.order_no;
                    const orderDate = order.date;
                    const orderSchemeType = order.scheme_type;
                    const orderSchemeRate = Number(order.scheme);

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
                              <Box style={{ margin: 0 }}>
                                   <Stack
                                        direction="row"
                                   >
                                        <span style={{ fontWeight: "bold" }}>{`Order No. ${orderNumber}`}</span>
                                        <span style={{ fontWeight: "bold" }}>|{` Date ${orderDate}`}</span>
                                        <span style={{ fontWeight: "bold" }}>|{` Scheme ${orderSchemeType}`}</span>
                                        <span style={{ fontWeight: "bold" }}>|{` Scheme Rate ${orderSchemeRate}`}</span>
                                   </Stack>
                                   <Card
                                        variant="soft"
                                        color="danger"
                                        sx={{ margin: 0, py: 0 }}
                                   >
                                        <span
                                             style={{ fontWeight: "bold" }}>No Gas Added Please Add Gas from the edit option</span>
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
                                             <span style={{ fontWeight: "bold" }}>{`Order No. ${orderNumber}`}</span>
                                             <span style={{ fontWeight: "bold" }}>|{` Date ${orderDate}`}</span>
                                             <span style={{ fontWeight: "bold" }}>|{` Scheme ${orderSchemeType}`}</span>
                                             <span style={{ fontWeight: "bold" }}>|{` Scheme Rate ${orderSchemeRate}`}</span>
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
               }}>SHREE RAM DISTRIBUTORS
               </span>
               <span style={{ color: "black", textAlign: "center" }}><i>Address:SHREE RAM DISTRIBUTOR SHOP NO. 3 OPP ESSAR PUMP , NEAR DADRA GARDEN VAPI SILVASSA ROAD DADRA , DADRA NAGAR HAVELI (U.T.), <br /> Phone: +917984240723, Email : jitenrpande@gmail.com
               </i></span>
               <Divider sx={{ backgroundColor: "#979797", m: 1 }} />
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