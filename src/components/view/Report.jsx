import React, { useEffect, useRef, useState } from "react";
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
    Table
} from "@mui/joy";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from "../../redux/actions/customerActions";
import { fetchReport } from "../../redux/actions/reportActions";
import { useReactToPrint } from "react-to-print";
import { fetchOrders } from "../../redux/actions/purchaseOrderActions.js";
import { getPlants } from "../../redux/actions/plantsActions.js";
import { fetchGasData } from "../../state/GasList.jsx";
import { FaArrowLeft, FaRegUserCircle } from "react-icons/fa";
import { useLocation } from "react-router";
import { dashIfZero, decimalFix, formatDateToDDMMYY_HHMM, randomLightColor, titleCase, toNumber } from "../../Tools.jsx";
import { sendBillToCustomer } from "../../redux/billSlice.js";
import MapObjectManager from "../class/MapArrayManager.jsx";
import { DataCell } from "./DeliveryHistory.jsx";
import { GrLocation } from "react-icons/gr";

const CUSTOMER = "customer";
const DELIVERY = "delivery";
const PURCHASE = "purchase";

export const Report = ({ isLogged }) => {

    const currentUrl = window.location.href;
    const hashIndex = currentUrl.indexOf('#');
    const hashPart = currentUrl.substring(hashIndex + 1);
    const url = new URL(hashPart, window.location.origin);
    const searchParams = new URLSearchParams(url.search);

    let isLogoded = sessionStorage?.getItem("authToken") !== null;

    const location = useLocation();
    const orderData = location.state;

    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ contentRef })
    const [isDownloading, setIsDownloading] = React.useState(false);
    const downloadBillAsPdf = () => {
        const element = contentRef.current;
        if (!element) {
            alert('No report content to download.');
            return;
        }
        setIsDownloading(true);
        // Double rAF: first frame schedules React paint, second ensures browser actually painted
        requestAnimationFrame(() => {
            requestAnimationFrame(async () => {
                try {
                    const html2pdf = (await import('html2pdf.js')).default;
                    await html2pdf()
                        .set({
                            margin: [4, 4, 4, 4],
                            filename: 'report.pdf',
                            image: { type: 'jpeg', quality: 0.95 },
                            html2canvas: {
                                scale: 1.0,
                                useCORS: true,
                                logging: false,
                                scrollY: 0,
                                windowWidth: element.scrollWidth,
                                windowHeight: element.scrollHeight,
                                onclone: (clonedDoc) => {
                                    // 1. Fix oklch — html2canvas 1.4.x can't parse it (Tailwind v4 uses it)
                                    clonedDoc.querySelectorAll('style').forEach(s => {
                                        s.textContent = s.textContent.replace(/oklch\([^)]*\)/g, 'transparent');
                                    });
                                    // 2. Remove overflow/height constraints so full content is captured
                                    clonedDoc.querySelectorAll('*').forEach(el => {
                                        const s = el.style;
                                        if (s.overflow === 'auto' || s.overflow === 'hidden' || s.overflow === 'scroll') {
                                            s.overflow = 'visible';
                                        }
                                        if (s.overflowX || s.overflowY) {
                                            s.overflowX = 'visible';
                                            s.overflowY = 'visible';
                                        }
                                        if (s.height && s.height !== 'auto') s.height = 'auto';
                                        if (s.maxHeight) s.maxHeight = 'none';
                                    });
                                    // 3. Prevent crops at page breaks — applies to table rows AND div-based summary sections
                                    clonedDoc.querySelectorAll('tr, td, th, div, p, section, aside, figure').forEach(el => {
                                        el.style.pageBreakInside = 'avoid';
                                        el.style.breakInside = 'avoid';
                                    });
                                    // 4. Reduce font size for compact PDF output
                                    clonedDoc.querySelectorAll('*').forEach(el => {
                                        const cs = window.getComputedStyle(
                                            element.querySelectorAll('*')[
                                            [...clonedDoc.querySelectorAll('*')].indexOf(el)
                                            ] || document.body
                                        );
                                        const fs = parseFloat(cs.fontSize);
                                        if (fs > 0) el.style.fontSize = `${fs * 0.75}px`;
                                    });
                                    // 5. Bake computed colors as inline styles so elements keep their look
                                    const origEls = element.querySelectorAll('*');
                                    const clonedEls = clonedDoc.querySelectorAll('*');
                                    origEls.forEach((origEl, i) => {
                                        const clonedEl = clonedEls[i];
                                        if (!clonedEl) return;
                                        const cs = window.getComputedStyle(origEl);
                                        ['color', 'background-color', 'border-color', 'border-top-color', 'border-bottom-color'].forEach(prop => {
                                            const val = cs.getPropertyValue(prop);
                                            if (val && val !== 'rgba(0, 0, 0, 0)') {
                                                clonedEl.style.setProperty(prop, val);
                                            }
                                        });
                                    });
                                },
                            },
                            pagebreak: { mode: ['css', 'legacy'], before: ['#pdf-summary'] },
                            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                        })
                        .from(element)
                        .save();
                } finally {
                    setIsDownloading(false);
                }
            });
        });
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

        console.log({ addOutstanding });

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
            dispatch(fetchReport({ customer: selectedCustomer, startDate: startDate, endDate: endDate }));
        };

        useEffect(() => {
            if (customers.length === 0 && !customersLoading && isLogoded) {
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
        let grandTotalBalance = 0;
        let grandTotalOnline = 0;
        let grandTotalCash = 0;

        const KGS = new Set();
        const KGS_COUNT = []
        const rows = [];
        const pdfRows = [];  // plain data for jsPDF download
        const heads = [];

        const apiTotalPaid = report?.totalPaid || 0;
        const apiTotalBill = report?.totalPrice || 0;

        let apiOutstanding = apiTotalBill - apiTotalPaid + (report?.deliveryBalance || 0)

        //console.log(report?.deliveries)
        document.title = `${titleCase(report?.customer?.user?.name)} - ${startDate} to ${endDate}`

        try {
            if (report && report.deliveries) {
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
                if (sortedDeliveries.length === 1) {
                    sortedDeliveries[0].gas_deliveries.forEach(gas => {
                        KGS.add(gas.gas_cylinder.kg);
                    });
                }

                sortedDeliveries.forEach((delivery, i) => {

                    //console.log(delivery.balance);
                    grandTotalBalance += toNumber(delivery.balance);

                    const correction = delivery.correction;
                    const gasDataMap = new MapObjectManager();
                    try {
                        delivery.gas_deliveries.forEach((gas, index) => {



                            //console.log(gas);
                            const k = `kg${gas.gas_cylinder.kg}`;
                            const entry = {};
                            if (gas.nc && !gas.is_empty) {
                                entry.nc = toNumber(gas.quantity);
                                entry.ncRate = toNumber(gas.price);
                                KGS_COUNT[`nc${gas.gas_cylinder.kg}`] = toNumber(gas.quantity) + (KGS_COUNT[`nc${gas.gas_cylinder.kg}`] || 0);
                                grandQtyTotal += toNumber(gas.quantity);
                                grandQtyKgTotal += toNumber(gas.quantity) * toNumber(gas.gas_cylinder.kg);
                            } else if (gas.is_empty && !gas.nc) {
                                entry.mt = toNumber(gas.quantity);
                                KGS_COUNT[`mt${gas.gas_cylinder.kg}`] = (KGS_COUNT[`mt${gas.gas_cylinder.kg}`] || 0) + toNumber(gas.quantity);
                                grandMtTotal += toNumber(gas.quantity);
                                grandMtKgTotal += toNumber(gas.quantity) * toNumber(gas.gas_cylinder.kg);
                            } else if (gas.is_empty && gas.nc) {
                                entry.mt_nc = toNumber(gas.quantity);
                                entry.mt_ncRate = toNumber(gas.price);
                                KGS_COUNT[`mt_nc${gas.gas_cylinder.kg}`] = (KGS_COUNT[`mt_nc${gas.gas_cylinder.kg}`] || 0) + toNumber(gas.quantity);
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
                        let mtNcSubTotal = 0;
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
                                const mtNcTotal = temp.mt_ncRate ? (toNumber(temp.mt_nc) * toNumber(temp.mt_ncRate)) : "-";
                                mtNcSubTotal += temp.mt_ncRate ? mtNcTotal : 0;
                                subTotal += (temp.rate ? total : 0) + (temp.ncRate ? ncTotal : 0) - (temp.mt_ncRate ? mtNcTotal : 0);

                                temptKgsList.push(
                                    <DataCell correction={correction} fontWeight={"normal"} key={`1delivery-${delivery.id}-kg${kg}`}
                                        bgColor={randomLightColor(kg)}>
                                        <span>{temp.qty || "-"}</span>
                                        {temp.nc && (<>
                                            <hr className="border-black opacity-30 h-0.5 w-full" />
                                            <span className="text-blue-700">{temp.nc}</span>
                                        </>)}
                                        {temp.mt_nc && (<>
                                            <hr className="border-black opacity-30 h-0.5 w-full" />
                                            <span className="text-red-700">-</span>
                                        </>)}
                                    </DataCell>,
                                    <DataCell correction={correction} fontWeight={"normal"} key={`2delivery-${delivery.id}-kg${kg}`}
                                        bgColor={randomLightColor(kg)}>
                                        {temp.mt || "-"}
                                        {temp.nc && (<>
                                            <hr className="border-black opacity-30 h-0.5 w-full" />
                                            <span className="text-blue-700">-</span>
                                        </>)}
                                        {temp.mt_nc && (<>
                                            <hr className="border-black opacity-30 h-0.5 w-full" />
                                            <span className="text-red-700">{temp.mt_nc}</span>
                                        </>)}
                                    </DataCell>,
                                    <DataCell correction={correction} fontWeight={"normal"} key={`3delivery-${delivery.id}-kg${kg}`}
                                        bgColor={randomLightColor(kg)}>
                                        <span>{temp.rate || "-"}</span>
                                        {temp.nc && (<>
                                            <hr className="border-black opacity-30 h-0.5 w-full" />
                                            <span className="text-blue-700">{temp.ncRate}</span>
                                        </>)}
                                        {temp.mt_nc && (<>
                                            <hr className="border-black opacity-30 h-0.5 w-full" />
                                            <span className="text-red-700">{temp.mt_ncRate}</span>
                                        </>)}
                                    </DataCell>,
                                    <DataCell correction={correction} fontWeight={"normal"} key={`4delivery-${delivery.id}-kg${kg}`}
                                        bgColor={randomLightColor(kg)}>
                                        <span>{total}</span>
                                        {temp.nc && (<>
                                            <hr className="border-black opacity-30 h-0.5 w-full" />
                                            <span className="text-blue-700">{ncTotal}</span>
                                        </>)}
                                        {temp.mt_nc && (<>
                                            <hr className="border-black opacity-30 h-0.5 w-full" />
                                            <span className="text-red-700">-{mtNcTotal}</span>
                                        </>)}
                                    </DataCell>
                                );
                            } else {
                                temptKgsList.push(
                                    <DataCell correction={correction} fontWeight={"normal"} key={`1delivery-${delivery.id}-kg${kg}`}
                                        bgColor={randomLightColor(kg)}>{"-"}</DataCell>,
                                    <DataCell correction={correction} fontWeight={"normal"} key={`2delivery-${delivery.id}-kg${kg}`}
                                        bgColor={randomLightColor(kg)}>{"-"}</DataCell>,
                                    <DataCell correction={correction} fontWeight={"normal"} key={`3delivery-${delivery.id}-kg${kg}`}
                                        bgColor={randomLightColor(kg)}>{"-"}</DataCell>,
                                    <DataCell correction={correction} fontWeight={"normal"} key={`4delivery-${delivery.id}-kg${kg}`}
                                        bgColor={randomLightColor(kg)}>{"-"}</DataCell>
                                );
                            }
                        })
                        grandOrderTotal += subTotal;
                        let balance = subTotal - received + delivery.balance;
                        //}

                        const displaySubTotal = subTotal === 0 ? "-" : subTotal;
                        const displayReceived = received === 0 ? "-" : received;
                        const date = formatDateToDDMMYY_HHMM(delivery.created_at);
                        const note = "note"
                        rows.push([
                            <tr key={`dRow${i}`}>
                                <DataCell textNoWrap={""} fontWeight={"normal"} correction={correction}
                                    key={`delivery-${i}-date`}>{date}</DataCell>
                                {/*<DataCell correction={correction} key={`delivery-${i}-note`}>{note}</DataCell>*/}
                                {temptKgsList}
                                <DataCell correction={correction} fontWeight={"normal"} key={`delivery-${i}-sub`}>{displaySubTotal}</DataCell>
                                <DataCell correction={correction} fontWeight={"normal"} key={`delivery-${i}-cash`}>{dashIfZero(cash)}</DataCell>
                                <DataCell correction={correction} fontWeight={"normal"}
                                    key={`delivery-${i}-online`}>{dashIfZero(online)}</DataCell>
                                <DataCell correction={correction} fontWeight={"normal"}
                                    key={`delivery-${i}-received`}>{displayReceived}</DataCell>
                                <DataCell correction={correction} fontWeight={"normal"}
                                    key={`delivery-${i}-balance`}>{balance === 0 ? "-" : balance}</DataCell>
                            </tr>
                        ]);
                        // plain data row for PDF
                        const sortedKGSForPdf = [...KGS].sort((a, b) => a - b);
                        const pdfKgCells = sortedKGSForPdf.flatMap(kg => {
                            const t = gasDataMap.toObject()[`kg${kg}`];
                            if (!t) return ['-', '-', '-', '-'];
                            const tot = t.rate ? toNumber(t.qty) * toNumber(t.rate) : '-';
                            const ncTot = t.ncRate ? toNumber(t.nc) * toNumber(t.ncRate) : '-';
                            const mtNcTot = t.mt_ncRate ? toNumber(t.mt_nc) * toNumber(t.mt_ncRate) : '-';
                            const qtyCell = [t.qty || '-', t.nc ? `NC:${t.nc}` : '', t.mt_nc ? `NC-MT:-` : ''].filter(Boolean).join('\n');
                            const mtCell = [t.mt || '-', t.nc ? '-' : '', t.mt_nc ? String(t.mt_nc) : ''].filter(Boolean).join('\n');
                            const rateCell = [t.rate || '-', t.ncRate ? `NC:${t.ncRate}` : '', t.mt_ncRate ? `NC-MT:${t.mt_ncRate}` : ''].filter(Boolean).join('\n');
                            const totalCell = [tot, ncTot !== '-' ? `NC:${ncTot}` : '', mtNcTot !== '-' ? `NC-MT:-${mtNcTot}` : ''].filter(x => x !== '' && x !== '-').join('\n') || '-';
                            return [qtyCell, mtCell, rateCell, totalCell];
                        });
                        pdfRows.push([
                            date,
                            ...pdfKgCells,
                            displaySubTotal,
                            dashIfZero(online),
                            dashIfZero(cash),
                            displayReceived,
                            balance === 0 ? '-' : balance,
                        ]);
                    } catch (err) {
                        console.warn(err);
                    }
                })
            }
        } catch (e) {
            console.log(e);
        }
        //console.log(KGS_COUNT)
        heads.push([
            <th key="h1date" className="!text-center !border-b-0 bcrbi">date</th>,
            ...[...KGS].sort((a, b) => a - b).map(kg => {
                const color = randomLightColor(kg);
                return (<>
                    <th key={`h2kg${kg}1`} className="!text-center !border-b-0 bcrbi" style={{ backgroundColor: color }}>
                        {kg}kg
                    </th>
                    <th key={`h3mt${kg}2`} className="!text-center !border-b-0 bcrbi" style={{ backgroundColor: color }}>
                        mt
                    </th>
                    <th key={`h4krate${kg}3`} className="!text-center !border-b-0 bcrbi" style={{ backgroundColor: color }}>
                        rate
                    </th>
                    <th key={`h2total${kg}4`} className="!text-center !border-b-0 bcrbi" style={{ backgroundColor: color }}>
                        total
                    </th>
                </>)
            }),
            <th key={`subt234`} className="!text-center !border-b-0 bcrbi">sub total</th>,
            <th key={`cash345`} className="!text-center !border-b-0 bcrbi">cash</th>,
            <th key={`upi34`} className="!text-center !border-b-0 bcrbi">online</th>,
            <th key={`ttl354`} className="!text-center !border-b-0 bcrbi">total</th>,
            <th key={`bal345`} className="!text-center !border-b-0 bcrbi">balance</th>,
        ])

        // jsPDF autoTable header (plain strings)
        const pdfHead = [
            'Date',
            ...[...KGS].sort((a, b) => a - b).flatMap(kg => [`${kg}kg`, 'MT', 'Rate', 'Total']),
            'Sub Total', 'Online', 'Cash', 'Received', 'Balance',
        ];

        const handleDownloadPdf = async () => {
            const jsPDF = (await import('jspdf')).default;
            const autoTable = (await import('jspdf-autotable')).default;
            const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
            const customerName = report?.customer?.user?.name ? titleCase(report.customer.user.name) : '';
            const address = report?.customer?.user?.address ? titleCase(report.customer.user.address) : '';
            const phone = report?.customer?.user?.phone_no || '';
            doc.setFontSize(9);
            doc.text(`Customer: ${customerName}`, 10, 8);
            doc.text(`Address: ${address}`, 100, 8);
            doc.text(`Phone: ${phone}`, 190, 8);
            doc.text(`Period: ${startDate} to ${endDate}`, 240, 8);
            autoTable(doc, {
                head: [pdfHead],
                body: pdfRows,
                startY: 12,
                styles: { fontSize: 7, cellPadding: 1 },
                headStyles: { fillColor: [38, 48, 67], textColor: 255, fontStyle: 'bold' },
                alternateRowStyles: { fillColor: [245, 245, 245] },
                margin: { left: 5, right: 5 },
            });
            // Summary footer
            const finalY = (doc.lastAutoTable?.finalY ?? 20) + 6;
            doc.setFontSize(8);
            doc.text(`Grand Total: ₹${decimalFix(grandOrderTotal)}   Cash: ₹${decimalFix(grandTotalCash)}   Online: ₹${decimalFix(grandTotalOnline)}   Received: ₹${decimalFix(grandTotalCash + grandTotalOnline)}   Remaining: ₹${decimalFix(grandOrderTotal - (grandTotalCash + grandTotalOnline) + grandTotalBalance)}`, 10, finalY);
            doc.save(`${customerName.replace(/ /g, '_')}_Report_${startDate}_to_${endDate}.pdf`);
        };


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
                            <Autocomplete
                                options={customers}
                                //getOptionLabel={(c) => c ? titleCase(`${c.user.name} : ${c.user.address}`) : 'Select User'}
                                getOptionLabel={(c) => c?.user?.name ? titleCase(`${c.user.name} : ${c.user.address}`) : 'Select User'}

                                value={selectedCustomerObj}
                                onChange={(event, value) => setSelectedCustomer(value ? value.id : null)}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                slotProps={{
                                    listbox: {
                                        sx: {
                                            padding: 0,
                                        }
                                    }
                                }}
                                renderOption={(props, option) => {
                                    const { key, ownerState, ...otherProps } = props;
                                    if (!option?.user) return null;
                                    return (
                                        <li {...otherProps} key={option.id}>
                                            <Stack className="group bg-white p-2 ps-2 shadow-md hover:!bg-blue-100"
                                                direction="column">
                                                <Stack direction="row" gap={1} alignItems="center">
                                                    <FaRegUserCircle />
                                                    <span
                                                        className="!text-black !font-bold">{titleCase(option.user.name)}</span>
                                                </Stack>
                                                <Stack direction="row" gap={1} alignItems="center">
                                                    <GrLocation />
                                                    <span
                                                        className="!text-black">{titleCase(option.user.address)}</span>
                                                </Stack></Stack>
                                            <Divider orientation="horizontal" />
                                        </li>
                                    );
                                }}
                                placeholder="Select User"
                                sx={{ width: '100%', minWidth: { xs: '100%', md: '200px' } }}
                                className="!text-black !font-bold"
                            />
                        </Stack>
                    </Stack>

                    <Divider sx={{ backgroundColor: "#979797", m: 1 }} />

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
                            }}>Outstanding :</span>
                            <Switch
                                size="lg"
                                checked={addOutstanding}
                                onChange={(e) => {
                                    setAddOutstanding(e.target.checked);
                                }}
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
                        flexGrow: 1,

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
                                    <Table
                                        variant="outlined"
                                        color="neutral"
                                        size="md"
                                        className="bcri"
                                        sx={{
                                            width: "100%",
                                            tableLayout: "auto",
                                            borderCollapse: "collapse",
                                            borderSpacing: 0,
                                            mt: 1,
                                            "& th, & td": {
                                                border: "1px solid #5f5f5f",
                                                margin: "0px",
                                                height: "unset",
                                                whiteSpace: "break-spaces",
                                            },
                                        }}
                                    >
                                        <thead>
                                            <tr className="!border-b-0">
                                                <th className="!border-b-0">
                                                    <span style={{ color: "black" }}>
                                                        {
                                                            `Customer : ${titleCase(report.customer.user.name)}`
                                                        }
                                                    </span>
                                                </th>
                                                <th className="!border-b-0">
                                                    <span style={{ color: "black" }}>
                                                        {
                                                            `Address : ${titleCase(report.customer.user.address)}`
                                                        }
                                                    </span>
                                                </th>
                                                <th className="!border-b-0">
                                                    <span style={{ color: "black" }}>
                                                        {
                                                            `Phone No. : ${report.customer.user.phone_no}`
                                                        }
                                                    </span>
                                                </th>
                                                <th className="!border-b-0">
                                                    <span style={{ color: "black" }}>
                                                        {
                                                            `Bill Date Range : ${startDate} to ${endDate}`
                                                        }
                                                    </span>
                                                </th>

                                                {addOutstanding ? <>
                                                    <th className="!border-b-0">
                                                        <span style={{ color: "black" }}>
                                                            {
                                                                `Outstanding : ₹${decimalFix(apiOutstanding - (grandOrderTotal - (grandTotalOnline + grandTotalCash)))}`
                                                            }
                                                        </span>
                                                        <Divider className="w-full" orientation={"vertical"}
                                                            sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                                    </th>
                                                </> : <></>
                                                }
                                            </tr>
                                        </thead>
                                    </Table>
                                    <Table
                                        borderAxis="both"
                                        // size="sm"
                                        variant="outlined"
                                        color="neutral"
                                        className="bcri"
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
                                            <tr key={"headerRow"}>
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
                                    <Table
                                        variant="outlined"
                                        color="neutral"
                                        size="sm"
                                        sx={{
                                            width: "100%",
                                            tableLayout: "auto",
                                            borderCollapse: "collapse",
                                            borderSpacing: 0,
                                            "& th, & td": {
                                                border: "1px solid #5f5f5f",
                                                margin: "0px",
                                                height: "unset",
                                                whiteSpace: "break-spaces",
                                            },
                                        }}
                                    >
                                        <thead>
                                            <tr className="!border-t-0">
                                                <th className="!border-t-0 !border-b-1">
                                                    <span style={{ fontWeight: "bold", color: "black" }}>

                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                    </Table>
                                    <Divider sx={{ backgroundColor: "#979797", opacity: 0.5, m: 1 }} />
                                    <Stack direction="row" gap={2} id="pdf-summary">
                                        <Divider className="w-full" orientation={"vertical"}
                                            sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                        {
                                            [...KGS].sort((a, b) => a - b).map((kg, index) => {
                                                return (<><Stack direction="column">
                                                    <span
                                                        className="bcrbi text-black">{`${kg} KG`} : {toNumber(KGS_COUNT[`sent${kg}`])}</span>
                                                    <Divider className="w-full" orientation={"horizontal"}
                                                        sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                                    <span
                                                        className="bcrbi text-black">{`NC`} : {toNumber(KGS_COUNT[`nc${kg}`])}</span>
                                                    <Divider className="w-full" orientation={"horizontal"}
                                                        sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                                    <span
                                                        className="bcrbi text-black">{`Total`} : {toNumber(KGS_COUNT[`sent${kg}`]) + toNumber(KGS_COUNT[`nc${kg}`])}</span>
                                                    <Divider className="w-full" orientation={"horizontal"}
                                                        sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                                    <span
                                                        className="bcrbi text-black">{`MT`} : {toNumber(KGS_COUNT[`mt${kg}`])}</span>
                                                    <Divider className="w-full" orientation={"horizontal"}
                                                        sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                                    {toNumber(KGS_COUNT[`mt_nc${kg}`]) > 0 && (<>
                                                        <span className="bcrbi text-red-700">{`NC Return`} : {toNumber(KGS_COUNT[`mt_nc${kg}`])}</span>
                                                        <Divider className="w-full" orientation={"horizontal"}
                                                            sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                                    </>)}
                                                    <span
                                                        className="bcrbi text-black">{`Pending`} : {toNumber(KGS_COUNT[`sent${kg}`]) - toNumber(KGS_COUNT[`mt${kg}`])}</span>
                                                </Stack>
                                                    <Divider className="w-full" orientation={"vertical"}
                                                        sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                                </>
                                                )
                                            })
                                        }
                                    </Stack>
                                    <Divider sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                    <Stack direction="row" gap={2}>
                                        <Divider className="w-full" orientation={"vertical"}
                                            sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                        <span
                                            className="bcrbi text-black">{`Total KG : ${grandQtyKgTotal}`} kg</span>
                                        <Divider className="w-full" orientation={"vertical"}
                                            sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                        <span className="bcrbi text-black">{`Total MT: ${grandMtKgTotal}`} kg</span>
                                        <Divider className="w-full" orientation={"vertical"}
                                            sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                        <span
                                            className="bcrbi text-black">{`Total Pending: ${(grandQtyKgTotal - grandMtKgTotal)}`} kg</span>
                                    </Stack>
                                    <Divider sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                    <Stack direction="row" gap={2}>
                                        <Divider className="w-full" orientation={"vertical"}
                                            sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                        <span className="bcrbi text-black">
                                            {
                                                `Grand Total : ₹${decimalFix(grandOrderTotal)}`
                                            }
                                        </span>
                                        <Divider className="w-full" orientation={"vertical"}
                                            sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                        <span style={{ color: "#001BB7" }} className="bcrbi text-black" >
                                            {
                                                `Total Cash : ₹${decimalFix(grandTotalCash)}`
                                            }
                                        </span>
                                        <Divider className="w-full" orientation={"vertical"}
                                            sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                        <span style={{ color: "#001BB7" }} className="bcrbi text-black">
                                            {
                                                `Total Online : ₹${decimalFix(grandTotalOnline)}`
                                            }
                                        </span>
                                        <Divider className="w-full" orientation={"vertical"}
                                            sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                        <span style={{ color: "#0A6847" }} className="bcrbi text-black">
                                            {
                                                `Total Received : ₹${decimalFix(grandTotalOnline + grandTotalCash)}`
                                            }
                                        </span>
                                        <Divider className="w-full" orientation={"vertical"}
                                            sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
                                        <span style={{ color: "#af4831" }} className="bcrbi text-black">
                                            {

                                                `Total Remaining : ₹${decimalFix(grandOrderTotal - (grandTotalOnline + grandTotalCash) + grandTotalBalance)}`
                                            }
                                        </span>
                                    </Stack>
                                    <Divider sx={{ backgroundColor: "#979797", opacity: 0.5 }} />
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
                                        //const customerNumber = report.customer.user.phone_no;
                                        const customerNumber = "917984847918";

                                        dispatch(sendBillToCustomer(
                                            currentUrl,
                                            customerNumber,
                                            decimalFix(grandOrderTotal - (grandTotalOnline + grandTotalCash) + grandTotalBalance).toString()
                                        ));
                                    }}
                                    sx={{
                                        width: { xs: '100%', md: 'auto' }
                                    }}
                                >
                                    {
                                        isBillLoading ? <CircularProgress /> : "Send Bill To Customer"
                                    }
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
                            {"Print"}
                        </Button>
                        <Divider sx={{ backgroundColor: "#979797", m: 1, opacity: 0.5 }} />
                        <Button
                            onClick={() => {
                                downloadBillAsPdf()
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
        const [showBreakdown, setShowBreakdown] = useState(false);
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
                                    <OrderRow orders={orders} allGas={allGases.data} plants={plants}
                                        showBreakdown={showBreakdown} setShowBreakdown={setShowBreakdown} />
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
            {isDownloading && (
                <Box sx={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 2,
                }}>
                    <CircularProgress size="lg" />
                    <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        Generating PDF… please wait
                    </span>
                </Box>
            )}
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

function OrderRow({ orders, allGas, plants, showBreakdown, setShowBreakdown }) {
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ contentRef })
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
            const mt = item.mt

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
                        <td className="b">{mt}</td>
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
                        <td className="b" colSpan={2}>Total Return Qty : {orderTotalReturnQty}</td>
                        <td className="b" colSpan={2}>Total Return Kg : {orderTotalReturnKg}</td>
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
            <td className="b" colSpan={13}></td>
        </tr>)
    })

    rows.push(
        <>
            <tr>
                <td className="b" colSpan={13}>Grand Total Amount : {decimalFix(grandTotalAmt)}</td>
            </tr>
            <tr>
                <td className="b" colSpan={13}>Grand Total Paid : {decimalFix(grandTotalPaid)}</td>
            </tr>
            <tr>
                <td className="b" colSpan={13}>Grand Total Balance : {decimalFix(grandTotalAmt - grandTotalPaid)}</td>
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
                        height: "42px",
                    }}
                    onClick={() => {
                        reactToPrintFn()
                    }}
                >
                    <span style={{ fontWeight: "bold" }}>Print</span>
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
                    <span style={{ fontWeight: "bold" }}>Breakdown</span>
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
                            <th>Return Qty</th>
                            <th>Total Return Kg</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows
                        }
                    </tbody>
                </Table>
                <Ending />
            </Stack>
        </Stack>
    </Stack>
}

function Heading() {
    return (
        <>
            <span className="barlow-condensed-bold" style={{
                fontWeight: "bold",
                color: "black",
                fontSize: "xx-large",
                textAlign: "center"
            }}>SHREE RAM DISTRIBUTORS
            </span>
            <span className="barlow-condensed-medium-italic" style={{ color: "black", textAlign: "center" }}><i>Address:SHREE RAM DISTRIBUTOR SHOP NO. 3 OPP ESSAR PUMP , NEAR DADRA GARDEN VAPI SILVASSA ROAD DADRA , DADRA NAGAR HAVELI (U.T.), <br />GST: 26APTPP2340E1ZT, Phone: +917984240723, Email : jitenrpande@gmail.com
            </i></span>
            {/*<Divider sx={{backgroundColor: "#979797", m: 1}}/>*/}
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
