/* eslint-disable react/prop-types */
import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    Input,
    LinearProgress,
    Option,
    Select,
    Sheet,
    Stack,
    Switch,
    Table,
    Typography
} from "@mui/joy";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteDeliveryById,
    fetchDeliveries,
    UPDATE_DELIVERY_SUCCESS_RESET,
    updateDelivery
} from "../../redux/actions/deliveryActions.js";
import {fetchGasData} from "../../state/GasList.jsx";
import {fetchUser} from "../../redux/actions/userActions.js";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {UPDATE_GAS_DELIVERY_SUCCESS_RESET, updateCreateDelete} from "../../redux/actions/gasDeliveryActions.js";
import gasServices from "../../services/gas-services.jsx";
import {
    decimalFix,
    getFromLocalStorage,
    getSessionVal,
    randomLightColor,
    setSessionVal,
    storeInLocalStorage,
    titleCase
} from "../../Tools.jsx";
import ExportCSV from "../ExportCSV.jsx";
import {FaArrowDown, FaCalendarAlt} from "react-icons/fa";
import {GasEditUi} from "./GasEditUi.jsx";
import MapArrayManager from "../class/MapArrayManager.jsx";

const COLORS = {
    WHITE: "#ffffff",
    KG_5: randomLightColor(5),
    KG_12: randomLightColor(12),
    KG_15: randomLightColor(15),
    KG_17: randomLightColor(17),
    KG_21: randomLightColor(21)
};

let columns = [
    //Info
    {column: "date", color: COLORS.WHITE},
    {column: "customer", color: COLORS.WHITE},

    //5KG Group
    {column: "5kg cyl", color: COLORS.KG_5},
    {column: "mt", color: COLORS.KG_5},
    {column: "rate", color: COLORS.KG_5},
    {column: "total", color: COLORS.KG_5},

    // 12KG Group
    {column: "12kg cyl", color: COLORS.KG_12},
    {column: "mt", color: COLORS.KG_12},
    {column: "rate", color: COLORS.KG_12},
    {column: "total", color: COLORS.KG_12},

    // 15KG Group
    {column: "15kg cyl", color: COLORS.KG_15},
    {column: "mt", color: COLORS.KG_15},
    {column: "rate", color: COLORS.KG_15},
    {column: "total", color: COLORS.KG_15},

    // 21KG Group
    {column: "21kg cyl", color: COLORS.KG_21},
    {column: "mt", color: COLORS.KG_21},
    {column: "rate", color: COLORS.KG_21},
    {column: "total", color: COLORS.KG_21},

    // Summary rows
    {column: "sub total", color: COLORS.WHITE},
    {column: "received", color: COLORS.WHITE},
    {column: "balance", color: COLORS.WHITE}
];
let KGS = new Set();
const CUSTOMER_LIST = [];
const ADMIN_LIST = new Map();
const DELIVERY_BOY_LIST = new Map();
let gasList = new Map();
let deleveryGasEditUiGasList = [];
let ncGasDeliveryList = {};

function setGasDeliveryList(parentKey, childKey, value) {
    if (!ncGasDeliveryList[parentKey]) {
        ncGasDeliveryList[parentKey] = {};
    }
    ncGasDeliveryList[parentKey][childKey] = value;
}

export default function deliveryHistoryBack() {

    const dispatch = useDispatch();
    const deliveriesData = useSelector((state) => state.deliverys);
    let deliveries = deliveriesData.deliveries;
    const loading = deliveriesData.loading;
    const updateSuccess = deliveriesData.updateSuccess;
    const error = deliveriesData.error;
    const {userDataLoading, users, userDataError} = useSelector((state) => state.user);
    const allGasData = useSelector((state) => state.gas);
    const {gasDeliverysSucsess} = useSelector((state) => state.gasDelivery);
    const [page, setPage] = useState(1);
    const [isAddNewDeliveryModal, setIsAddNewDeliveryModal] = useState(false);
    const [shouldReload, setShouldReload] = useState(false);
    //console.log(isAddNewDeliveryModal);

    const currentUrl = window.location.href;
    const hashIndex = currentUrl.indexOf('#');
    const hashPart = currentUrl.substring(hashIndex + 1);
    const url = new URL(hashPart, window.location.origin);
    const searchParams = new URLSearchParams(url.search);
    const date_start = searchParams.get('dateStart');
    const date_end = searchParams.get('dateEnd');

    let deliveryHistoryOrder = getFromLocalStorage("deliveryHistoryOrder");
    if (deliveryHistoryOrder === null || deliveryHistoryOrder === undefined) {
        deliveryHistoryOrder = true;
    }
    //console.log({deliveryHistoryOrder})
    const [descending, setTheDescending] = useState(
        deliveryHistoryOrder
    );
    const [customerId, setTheCustomerId] = useState(getSessionVal("customerId"));
    const [deliverBoyId, setDeliverTheBoyId] = useState(getSessionVal("deliveryBoyId"));
    const [dateStart, setDateStartState] = useState(
        () => {
            if (date_start) {
                return formatDate(new Date(date_start));
            }
            let date = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            //start time at 00:00:00
            date.setHours(0, 0, 0, 0);
            return formatDate(date)
        }
    );
    const [dateEnd, setDateEndState] = useState(
        () => {
            if (date_end) {
                return formatDate(new Date(date_end));
            }
            //date of current month end date
            let date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
            //end time at 23:59:59
            date.setHours(23, 59, 59, 999);
            return formatDate(date)
        }
    );

    deleveryGasEditUiGasList.length = 0;
    gasList.clear();
    if (allGasData.data != null) {
        allGasData.data.data.forEach((value) => {
            gasList.set(value.id, value)
            deleveryGasEditUiGasList.push(<Option key={value.id}
                                                  value={value.id}>{value.company_name} - {value.kg}KG</Option>)
        })
    }
    CUSTOMER_LIST.length = 0
    if (users != null && users != undefined) {
        const customerOptions = users.map((user) => {
            if (user.courier_boys.length != 0) {
                if (user.courier_boys[0]?.login?.role == 2) {
                    DELIVERY_BOY_LIST.set(user.courier_boys[0].id, user)
                } else {
                    ADMIN_LIST.set(user.courier_boys[0].id, user)
                }
            }
            if (user.customers.length == 0) {
                return null;
            }
            const cId = user.customers[0]?.id;
            const customerName = titleCase(user.name);
            const address = titleCase(user.address);
            return {
                id: cId,
                label: `${customerName} (${address})`,
            }
        }).filter(Boolean);
        CUSTOMER_LIST.push(...customerOptions);
    }

    const loadData = useCallback((force = false, resetPage = false) => {
        //console.log("loadData", force, resetPage);
        let tempPage = page;
        if (resetPage) {
            setPage(1);
            tempPage = 1;
        }
        const fetchDeliveriesParams = {
            dateStart: dateStart,
            dateEnd: dateEnd,
            customer_id: customerId,
            courier_boy_id: deliverBoyId,
            page: tempPage,
            order: descending ? 'desc' : 'asc',
        };
        if (force) {
            console.log("force");
            dispatch(fetchDeliveries(fetchDeliveriesParams));
        }
        //fetch user
        if (userDataLoading === false && (users == null || users == undefined) && loading == false) {
            dispatch(fetchUser());
        }
        //fetch gas data
        if (!(allGasData.isError) && !allGasData.isLoading && !loading && !userDataLoading && (allGasData.data == null || allGasData.data.data.length === 0)) {
            dispatch(fetchGasData());
        }
    }, [dateStart, dateEnd, customerId, deliverBoyId, page, loading, deliveries, dispatch]);

    const setDescending = useCallback((val) => {
        storeInLocalStorage("deliveryHistoryOrder", val);
        setTheDescending(val);
        loadData(true, true);
    }, [loadData]);

    const setCustomerId = useCallback((id) => {
        setSessionVal("customerId", id);
        setTheCustomerId(id);
        loadData(true);
    }, [loadData]);

    const setDeliverBoyId = useCallback((id) => {
        setDeliverTheBoyId(id);
        setSessionVal("deliveryBoyId", id);
        loadData(true);
    }, [loadData]);

    const setDateStart = useCallback((date) => {
        setDateStartState(date);
        loadData(true);
    }, [loadData]);

    const setDateEnd = useCallback((date) => {
        setDateEndState(date);
        loadData(true);
    }, [loadData]);
    const loadMore = () => {
        setPage(page + 1);
        loadData(true);
    }
    const updateUrlParams = (dateStart, dateEnd) => {
        // Grab everything after the #
        const fullHash = window.location.hash.substring(1);            // e.g. "/admin/deliveryHistory?foo=bar"
        const [path, rawQuery = ''] = fullHash.split('?');             // separate path and query

        const params = new URLSearchParams(rawQuery);

        // Set or delete each filter
        const updates = {dateStart, dateEnd, customerId, deliverBoyId};
        Object.entries(updates).forEach(([key, val]) => {
            if (val == null || val === '') {
                params.delete(key);
            } else {
                params.set(key, val);
            }
        });

        // Rebuild and replace the hash (no history entry)
        const newHash = path + (params.toString() ? `?${params}` : '');
        if (`#${newHash}` !== window.location.hash) {
            window.location.replace(window.location.pathname + window.location.search + `#${newHash}`);
        }
    }

    useEffect(() => {
        // firebase update
        const unsubscribe = gasServices.listenDataChange(() => {
            setShouldReload(true);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    useEffect(() => {
        if (shouldReload) {
            console.log("reload");
            loadData(true);
            setShouldReload(false);
        }
    }, [shouldReload, loadData]);

    useEffect(() => {
        updateUrlParams(
            dateStart,
            dateEnd
        );
    }, [dateStart, dateEnd, customerId, deliverBoyId]);

    useEffect(() => {
        // Initial load
        loadData(false);
    }, []); // Empty dependency array for initial load only


    //console.log(gasDeliverysSucsess, updateSuccess)
    useEffect(() => {
        // console.log("gasDeliverysSucsess", gasDeliverysSucsess);
        if (gasDeliverysSucsess) {
            dispatch({
                type: UPDATE_GAS_DELIVERY_SUCCESS_RESET,
            });
            loadData(true);
        }
    }, [gasDeliverysSucsess, dispatch, loadData]);
    if (updateSuccess) {
        dispatch({
            type: UPDATE_DELIVERY_SUCCESS_RESET
        })
        loadData(true);
    }

    //loadData(true);

    const handleSuccess = useCallback(() => {
        loadData(true);
    }, []);

    // First, let's add a helper function to calculate gas group totals

    // Update the createData function to be more organized
    function createData(date, info, gasInfo, kg5Data, kg12Data, kg15Data, kg21Data, received, ncToatl, isOutstanding) {

        const kg5 = calculateGasGroup(kg5Data.cylinders, kg5Data.mt, kg5Data.rate);
        const kg12 = calculateGasGroup(kg12Data.cylinders, kg12Data.mt, kg12Data.rate);
        const kg15 = calculateGasGroup(kg15Data.cylinders, kg15Data.mt, kg15Data.rate);
        const kg21 = calculateGasGroup(kg21Data.cylinders, kg21Data.mt, kg21Data.rate);

        const subTotal = kg5.total + kg12.total + kg15.total + kg21.total + ncToatl;

        return {
            date,
            customer: info.customer,
            info: info,
            gasInfo: gasInfo,
            kg5,
            kg12,
            kg15,
            kg21,
            subTotal,
            received,
            isOutstanding
        };
    }

    // Update the rows data with the new structure
    let rows = []
    let csvData = []
    //console.log(ADMIN_LIST)
    if (deliveries != null || deliveries != undefined) {
        if (!deliveries.noData) {

            let sortedDeliveries = [...deliveries].sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                if (descending) {
                    return dateB - dateA; // For descending order
                } else {
                    return dateA - dateB; // For ascending order
                }
            });

            ncGasDeliveryList = {}
            rows = sortedDeliveries.map((delivery) => {

                if (deliverBoyId != null || deliverBoyId != undefined) {
                    if (delivery.courier_boy.id != deliverBoyId) {
                        return;
                    }
                }
                if (customerId != null || customerId != undefined) {
                    if (delivery.customer.id != customerId) {
                        return;
                    }
                }

                if (date_start && date_end) {
                    const mDateStart = new Date(date_start);
                    mDateStart.setHours(0, 0, 0, 0);

                    const mDateEnd = new Date(date_end);
                    mDateEnd.setHours(23, 59, 59, 999);

                    const deliveryDate = new Date(delivery.created_at);

                    if (deliveryDate < mDateStart || deliveryDate > mDateEnd) {
                        return;
                    }
                }

                let isAdmin = false
                //console.log(delivery.created_at);
                const date = formatDateToDDMMYY_HHMM(delivery.created_at)
                if (ADMIN_LIST.get(delivery.courier_boy.id)) {
                    isAdmin = true
                    delivery.payments.forEach((payment) => {
                        csvData.push([
                            //"Date",
                            date + "",
                            //"Customer",
                            titleCase(delivery.customer.name) + "",
                            "Outstanding",
                            //"4KG CYL",
                            "",
                            //"MT",
                            "",
                            //"Rate",
                            "",
                            //"Total",
                            "",
                            //"12KG CYL",
                            "",
                            //"MT",
                            "",
                            //"Rate",
                            "",
                            //"Total",
                            "",
                            //"15KG CYL",
                            "",
                            //"MT",
                            "",
                            //"Rate",
                            "",
                            //"Total",
                            "",
                            //"21KG CYL",
                            "",
                            //"MT",
                            "",
                            //"Rate",
                            "",
                            //"Total",
                            "",
                            //"Sub Total",
                            "",
                            //"Received",
                            payment.amount + "",
                            //"Balance"
                            ""
                        ])
                    })
                }

                let gasData = new MapArrayManager()

                let totalCash = 0
                let totalOnline = 0

                let cyl5KgQty = 0
                let cyl5KgNcQty = 0
                let cyl5KgMt = 0
                let cyl5KgRate = 0
                let cyl5KgNcRate = 0

                let cyl12KgQty = 0
                let cyl12KgNcQty = 0
                let cyl12KgMt = 0
                let cyl12KgRate = 0
                let cyl12KgNcRate = 0

                let cyl15KgQty = 0
                let cyl15KgNcQty = 0
                let cyl15KgMt = 0
                let cyl15KgRate = 0
                let cyl15KgNcRate = 0

                let cyl21KgQty = 0
                let cyl21KgNcQty = 0
                let cyl21KgMt = 0
                let cyl21KgRate = 0
                let cyl21KgNcRate = 0


                delivery.payments.forEach((payment) => {
                    if (payment.method == 0) {
                        totalCash += Number(payment.amount)
                    } else {
                        totalOnline += Number(payment.amount)
                    }
                })

                const cylinder_list = delivery.gas_deliveries.map((gas) => {

                    KGS.add(gas.kg)
                    gasData.add(gas.kg, {
                        qty: Number(gas.quantity),
                        rate: Number(gas.gas_price),
                        total: Number(gas.quantity) * Number(gas.gas_price)
                    })
                    if (gas.nc) {
                        //console.log(gas);
                        setGasDeliveryList("d_" + delivery.id, "kg_" + gas.kg, gas)
                        if (gas.kg == 5) {
                            cyl5KgNcQty = Number(gas.quantity)
                            cyl5KgNcRate = Number(gas.gas_price)
                        } else if (gas.kg == 12) {
                            cyl12KgNcQty = Number(gas.quantity)
                            cyl12KgNcRate = Number(gas.gas_price)
                        } else if (gas.kg == 15) {
                            cyl15KgNcQty = Number(gas.quantity)
                            cyl15KgNcRate = Number(gas.gas_price)
                        } else if (gas.kg == 21) {
                            cyl21KgNcQty = Number(gas.quantity)
                            cyl21KgNcRate = Number(gas.gas_price)
                        }
                        //dont add in nc gas return
                        return
                    }
                    if (gas.kg == 5) {
                        if (!gas.is_empty) {
                            cyl5KgQty = Number(gas.quantity)
                            cyl5KgRate = Number(gas.gas_price)
                        } else {
                            cyl5KgMt += Number(gas.quantity)
                        }
                    }
                    if (gas.kg == 12) {
                        if (!gas.is_empty) {
                            cyl12KgQty = Number(gas.quantity)
                            cyl12KgRate = Number(gas.gas_price)
                        } else {
                            cyl12KgMt += Number(gas.quantity)
                        }
                    }
                    if (gas.kg == 15) {
                        if (!gas.is_empty) {
                            cyl15KgQty = Number(gas.quantity)
                            cyl15KgRate = Number(gas.gas_price)
                        } else {
                            cyl15KgMt += Number(gas.quantity)
                        }
                    }
                    if (gas.kg == 21) {
                        if (!gas.is_empty) {
                            cyl21KgQty = Number(gas.quantity)
                            cyl21KgRate = Number(gas.gas_price)
                        } else {
                            cyl21KgMt += Number(gas.quantity)
                        }
                    }
                    return {
                        cylinder: gas.brand,
                        qty: Number(gas.quantity),
                        kg: 15
                    }
                })

                let total5Kg = Number(cyl5KgQty) * Number(cyl5KgRate)
                let total5KgNc = Number(cyl5KgNcQty) * Number(cyl5KgNcRate)

                let total12Kg = Number(cyl12KgQty) * Number(cyl12KgRate)
                let total12KgNc = Number(cyl12KgNcQty) * Number(cyl12KgNcRate)

                let total15Kg = Number(cyl15KgQty) * Number(cyl15KgRate)
                let total15KgNc = Number(cyl15KgNcQty) * Number(cyl15KgNcRate)

                let total21Kg = Number(cyl21KgQty) * Number(cyl21KgRate)
                let total21KgNc = Number(cyl21KgNcQty) * Number(cyl21KgNcRate)

                let ncTotal = Number(total5KgNc) + Number(total12KgNc) + Number(total15KgNc) + Number(total21KgNc)

                let totalTotal = Number(total12Kg) + Number(total15Kg) + Number(total21Kg) + Number(total5Kg)

                let received = Number(totalCash) + Number(totalOnline)

                let balance = 0

                if ((ncTotal + totalTotal > 0)) {
                    balance = totalTotal - received + ncTotal
                }

                // if (isAdmin) {
                //      console.log(ncTotal + totalTotal, balance, isAdmin)
                // }

                if (
                    total5KgNc + total12KgNc + total15KgNc + total21KgNc > 0
                ) {
                    csvData.push([

                        //"Date",
                        date + "",
                        //"Customer",
                        titleCase(delivery.customer.name) + "",

                        "NC",
                        //"4KG CYL",
                        cyl5KgNcQty + "",
                        //"MT",
                        "",
                        //"Rate",
                        cyl5KgNcRate + "",
                        //"Total",
                        total5KgNc + "",

                        //"12KG CYL",
                        cyl12KgNcQty + "",
                        //"MT",
                        "",
                        //"Rate",
                        cyl12KgNcRate + "",
                        //"Total",
                        total12KgNc + "",

                        //"15KG CYL",
                        cyl15KgNcQty + "",
                        //"MT",
                        "",
                        //"Rate",
                        cyl15KgNcRate + "",
                        //"Total",
                        total15KgNc + "",

                        //"21KG CYL",
                        cyl21KgNcQty + "",
                        //"MT",
                        "",
                        //"Rate",
                        cyl21KgNcRate + "",
                        //"Total",
                        total21KgNc + "",
                        //"Sub Total",

                        ncTotal + "",
                        //"Received",
                        "",
                        //"Balance"
                        ncTotal + ""
                    ])
                }
                if (total5Kg + total12Kg + total15Kg + total21Kg > 0) {
                    csvData.push([
                        //"Date",
                        date + "",
                        //"Customer",
                        titleCase(delivery.customer.name) + "",
                        "",
                        //"4KG CYL",
                        cyl5KgQty + "",
                        //"MT",
                        cyl5KgMt + "",
                        //"Rate",
                        cyl5KgRate + "",
                        //"Total",
                        total5Kg + "",
                        //"12KG CYL",
                        cyl12KgQty + "",
                        //"MT",
                        cyl12KgMt + "",
                        //"Rate",
                        cyl12KgRate + "",
                        //"Total",
                        total12Kg + "",
                        //"15KG CYL",
                        cyl15KgQty + "",
                        //"MT",
                        cyl15KgMt + "",
                        //"Rate",
                        cyl15KgRate + "",
                        //"Total",
                        total15Kg + "",
                        //"21KG CYL",
                        cyl21KgQty + "",
                        //"MT",
                        cyl21KgMt + "",
                        //"Rate",
                        cyl21KgRate + "",
                        //"Total",
                        total21Kg + "",
                        //"Sub Total",
                        totalTotal + "",
                        //"Received",
                        received + "",
                        //"Balance"
                        balance + ""
                    ])
                }
                return createData(
                    // date
                    date,
                    // info
                    {
                        dileveryId: delivery.id,
                        custId: delivery.customer.id,
                        customer: titleCase(delivery.customer.name),
                        //diaryNumber: delivery.customer.diaryNumber,
                        adress: delivery.customer.address,
                        deliveredBy: delivery.courier_boy.name,
                        deliverBoyId: delivery.courier_boy.id,
                        cash: totalCash,
                        online: totalOnline,
                        correction: delivery.correction,
                        paid: delivery.payments.length > 0,
                        gasList: delivery.gas_deliveries,
                        payments: delivery.payments,
                    },
                    //gasInfo
                    cylinder_list,
                    // 4KG Group
                    {cylinders: cyl5KgQty, mt: cyl5KgMt, rate: cyl5KgRate},
                    // 12KG Group
                    {cylinders: cyl12KgQty, mt: cyl12KgMt, rate: cyl12KgRate},
                    // 15KG Group
                    {cylinders: cyl15KgQty, mt: cyl15KgMt, rate: cyl15KgRate},
                    // 21KG Group
                    {cylinders: cyl21KgQty, mt: cyl21KgMt, rate: cyl21KgRate},
                    // received amount
                    (totalCash + totalOnline),
                    // nc total
                    ncTotal,
                    // is outstanding
                    isAdmin
                )
            });
        }
    }

    const headers = columns.map((col) => col.column);

    //add NC column at 3rd position
    headers.splice(2, 0, "remark");

    return <Stack
        sx={{
            //height: "100%",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "lg",
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            flexGrow: 1
        }}
    >
        <Box
            sx={{
                width: "100%",
                display: loading ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <LinearProgress/>
        </Box>
        <Stack
            sx={{
                width: "100%",
                overflow: "auto",
                flexGrow: 1,
                alignItems: "center",
            }}
            direction="row"
            gap={1}
            mt={.5}
            mb={.5}
            pr={.5}
            alignContent={"end"}
            justifyContent={"flex-end"}
        >
            <ExportCSV
                headers={headers}
                data={csvData}
                filename={
                    "deliveries_" + formatDateToDDMMYY(dateStart) + "_TO_" + formatDateToDDMMYY(dateEnd) + ".csv"
                }
            >Download File</ExportCSV>
            <Divider sx={{backgroundColor: "grey"}} orientation="vertical"/>
            <GasEditUi
                selectedGasList={[]}
                customer={0}
                deliveryBoy={0}
                deleveryId={0}
                payments={[]}
                correction={false}
                openEdit={isAddNewDeliveryModal}
                isOutstanding={false}
                isAddNewDeliveryModal={true}
                gasList={gasList}
                CUSTOMER_LIST={CUSTOMER_LIST}
                DELIVERY_BOY_LIST={DELIVERY_BOY_LIST}
                deleveryGasEditUiGasList={deleveryGasEditUiGasList}
                onSuccess={handleSuccess}
                createdAt={null}
            />
            <Divider
                sx={{
                    flexGrow: 1,
                    opacity: 0,
                }}
            />
            <span
                style={{
                    fontWeight: "bold",
                    color: "black",
                }}
            >Reverse Order</span>
            <Switch
                checked={descending}
                onChange={(event) => {
                    setDescending(event.target.checked);
                }}
            />
            <Divider sx={{backgroundColor: "grey"}} orientation="vertical"/>
            <span
                style={{
                    fontWeight: "bold",
                    color: "black",
                }}
            >Customer :</span>
            <Autocomplete
                placeholder="Select Customer"
                options={[{id: null, label: "Show All"}, ...CUSTOMER_LIST]}
                value={[{
                    id: null,
                    label: "Show All"
                }, ...CUSTOMER_LIST].find(option => option.id === customerId) || null}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                onChange={(_, value) => {
                    setCustomerId(value?.id ?? null);
                }}
                sx={{
                    fontWeight: 'bold',
                }}
            />
            <Divider sx={{backgroundColor: "grey"}} orientation="vertical"/>
            <span
                style={{
                    fontWeight: "bold",
                    color: "black",
                }}
            >Delivery Boy :</span>
            <Select
                defaultValue={deliverBoyId ? deliverBoyId : null}
                placeholder="Select Delivery Boy"
                onChange={(event, value) => {
                    if (value === "") {
                        setDeliverBoyId(null);
                        return;
                    }
                    setDeliverBoyId(value);
                }}
            >
                <Option value="">Show All</Option>
                {[...DELIVERY_BOY_LIST.entries()].map(([courierId, user]) => (
                    <Option key={courierId} value={courierId}>
                        {titleCase(user.name)}
                    </Option>
                ))}
            </Select>
            <Divider sx={{backgroundColor: "grey"}} orientation="vertical"/>
            <span
                style={{
                    fontWeight: "bold",
                    color: "black",
                }}
            >Date :</span>
            <Input
                type="date"
                defaultValue={dateStart}
                onChange={(event) => {
                    // Handle date start change
                    // setParamsUpdate(true);
                    setDateStart(event.target.value);
                }}
            />
            <Input
                type="date"
                defaultValue={dateEnd}
                onChange={(event) => {
                    // Handle date start change
                    // setParamsUpdate(true);
                    setDateEnd(event.target.value);
                }}
            />
        </Stack>
        <Stack sx={{backgroundColor: "lightblue", width: "100%", flexGrow: 1,}}>
            <Sheet
                sx={{
                    flexGrow: 1
                }}
            >
                <Table
                    aria-label="collapsible table"
                    size="md"
                    stickyHeader={true}
                    sx={{
                        wordBreak: "keep-all",
                        tableLayout: "auto",
                        fontWeight: "bold",
                        //0px padding and margin in td and th and tr
                        "& td, & tr": {
                            padding: 0,
                            margin: 0,
                            //important to override mui default border
                            borderBottomWidth: 0,
                            height: "unset",
                            verticalAlign: "middle",
                        }
                    }}
                >
                    <thead>
                    <tr>
                        {/* <th style={{ width: 40 }} aria-label="empty" />
                                   <th style={{ width: '40%' }}>Dessert (100g serving)</th> */}
                        <th style={{width: 40}} aria-label="empty"/>
                        {
                            columns.map((col, index) => (
                                <th
                                    key={index + "_" + col.column}
                                    style={{
                                        textAlign: "center",
                                        backgroundColor: col.color,
                                        //break word
                                        wordBreak: "break-space",
                                    }}
                                >
                                    {col.column}
                                </th>
                            ))
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, index) => {
                        if (row == null || row == undefined) {
                            return null;
                        }
                        return (
                            <Row
                                key={row.date + "_" + index}
                                row={row}
                                initialOpen={false}
                                updateCustomer={(customer) => {
                                    console.log(customer);
                                    const ok = window.confirm("Please Confirm Change");
                                    if (ok) {
                                        dispatch(updateDelivery({id: row.info.dileveryId, customer_id: customer.id}))
                                    }
                                    return ok;
                                }}
                                deleteDelivery={() => {
                                    const id = window.prompt(`Please Input ${row.info.dileveryId} to Delete`);
                                    const ok = id == row.info.dileveryId
                                    if (ok) {
                                        //console.log("id", id);
                                        dispatch(deleteDeliveryById(row.info.dileveryId))
                                    }
                                    return ok;
                                }}
                                updateGas={(payload) => {
                                    console.log("updateGas : ", payload);
                                    dispatch(
                                        updateCreateDelete(
                                            payload
                                        )
                                    )
                                }}
                                onSuccess={
                                    () => {
                                        loadData(true);
                                    }
                                }
                            />
                        )
                    })}
                    {
                        ((rows.length == 0) ? <tr>
                                <td colSpan={columns.length + 1}
                                    style={{textAlign: "center", fontWeight: "bold", fontSize: "1.8em"}}>No Data
                                </td>
                            </tr> : null
                        )
                    }
                    {
                        (!(rows.length == 0) ? <tr>
                                <td colSpan={columns.length + 1}
                                    style={{textAlign: "center", fontWeight: "bold", fontSize: "1.8em"}}>
                                    <Button
                                        sx={{
                                            borderRadius: "md",
                                            mb: 1,
                                            mt: 1,
                                        }}
                                        onClick={() => {
                                            loadMore()
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            gap={1}
                                            alignItems="center"
                                            justifyContent="center"

                                        >
                                            {
                                                loading ? <CircularProgress
                                                    sx={{
                                                        width: "1.5em",
                                                        height: "1.5em",
                                                        borderRadius: "50%",
                                                        color: "white",
                                                    }}
                                                /> : <FaArrowDown/>
                                            }
                                            <span className="b">Load Mores</span>
                                        </Stack>

                                    </Button>
                                </td>
                            </tr> : null
                        )
                    }
                    </tbody>
                </Table>
            </Sheet>
        </Stack>
    </Stack>
}
const Row = React.memo(function Row({
                                        row,
                                        initialOpen = false,
                                        updateCustomer,
                                        onSuccess
                                    }) {

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(initialOpen);
    const [openEdit, setOpenEdit] = React.useState(false);

    let balance = row.subTotal - row.received
    //o if nagative
    if (row.subTotal == 0) {
        balance = 0
    }

    //console.log("rendering");
    // Define the cell groups for easier mapping

    const Cell = (cell, id, kg, type) => {
        let nc = false;
        let data = null;
        try {
            nc = true
            data = ncGasDeliveryList["d_" + id]["kg_" + kg]
            //console.log("ncGasDeliveryList", data);
            if (type == "total") {
                data = data.gas_price * data.quantity
            } else {
                data = data[type]
            }
            if (type == "total" || type == "gas_price") {
                data = decimalFix(data, true)
            }
            //console.log("ncGasDeliveryList", data);
        } catch (e) {
            nc = false
        }
        return <Stack
            direction="column"
        >
            <span>{cell}</span>
            {
                nc ? <>
                    <Divider orientation="horizontal" sx={{flexGrow: 1}}/>
                    <span className="b" style={{color: "#093FB4"}}>{data}</span>
                </> : null
            }
        </Stack>
    }
    //console.log(row.info.dileveryId);
    const did = row.info.dileveryId;
    const cellGroups = [
        {
            key: 'info', cells: [
                {value: row.date},
                {value: row.info.customer}
            ], color: COLORS.WHITE
        },
        {
            key: 'kg5', cells: [
                {value: Cell(decimalFix(row.kg5.cylinders), did, 5, "quantity")},
                {value: decimalFix(row.kg5.mt)},
                {value: Cell(decimalFix(row.kg5.rate, true), did, 5, "gas_price")},
                {value: Cell(decimalFix(row.kg5.total, true), did, 5, "total")}
            ],
            color: COLORS.KG_5
        },
        {
            key: 'kg12', cells: [
                {value: Cell(decimalFix(row.kg12.cylinders), did, 12, "quantity")},
                {value: decimalFix(row.kg12.mt)},
                {value: Cell(decimalFix(row.kg12.rate, true), did, 12, "gas_price")},
                {value: Cell(decimalFix(row.kg12.total, true), did, 12, "total")}
            ], color: COLORS.KG_12
        },
        {
            key: 'kg15', cells: [
                {value: Cell(decimalFix(row.kg15.cylinders), did, 15, "quantity")},
                {value: decimalFix(row.kg15.mt)},
                {value: Cell(decimalFix(row.kg15.rate, true), did, 15, "gas_price")},
                {value: Cell(decimalFix(row.kg15.total, true), did, 15, "total")}
            ], color: COLORS.KG_15
        },
        {
            key: 'kg21', cells: [
                {value: Cell(decimalFix(row.kg21.cylinders), did, 21, "quantity")},
                {value: decimalFix(row.kg21.mt)},
                {value: Cell(decimalFix(row.kg21.rate, true), did, 21, "gas_price")},
                {value: Cell(decimalFix(row.kg21.total, true), did, 21, "total")}
            ], color: COLORS.KG_21
        },
        {
            key: 'summary', cells: [
                {value: decimalFix(row.subTotal, true)},
                {value: decimalFix(row.received, true)},
                //balance
                {
                    value: decimalFix(balance, true)
                }
            ], color: COLORS.WHITE
        }
    ];
    const DropEditor = () => {
        return (<Box>
            <IconButton
                aria-label="expand row"
                variant="plain"
                color="neutral"
                size="sm"
                onClick={() => setOpen(!open)}
            >
                {open ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}
            </IconButton>
        </Box>)
    }
    const DropSheet = () => {
        function toDateTimeLocal(str) {
            // str = "04/09/25 - 05:44 PM"
            const [datePart, timePart] = str.split(" - ");
            const [day, month, year2] = datePart.split("/");
            let [time, ampm] = timePart.split(" ");
            let [hours, minutes] = time.split(":").map(Number);

            if (ampm.toUpperCase() === "PM" && hours < 12) hours += 12;
            if (ampm.toUpperCase() === "AM" && hours === 12) hours = 0;

            const date = new Date(
                2000 + Number(year2),   // 25 → 2025
                Number(month) - 1,      // JS months 0-indexed
                Number(day),
                hours,
                minutes
            );

            const pad = (n) => String(n).padStart(2, "0");
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
        }

        const DateTimeInputToggle = React.memo(({initialDate}) => {
            const [value, setValue] = useState(toDateTimeLocal(initialDate));
            const inputRef = useRef(null);
            const [dateUpdated, setDateUpdated] = useState(false);

            const handleClick = () => {
                if (inputRef.current) {
                    if (inputRef.current.showPicker) {
                        inputRef.current.showPicker();
                    } else {
                        inputRef.current.click();
                    }
                }
            };

            return (
                <Box sx={{position: "relative"}}>
                    <Button
                        startDecorator={<FaCalendarAlt/>}
                        variant="soft"
                        color="success"
                        onClick={handleClick}>
                        {value
                            ? new Date(value).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                            : "Select Date & Time"}
                    </Button>
                    <input
                        ref={inputRef}
                        type="datetime-local"
                        value={value}
                        onChange={(e) => {
                            setDateUpdated(true);
                            setValue(e.target.value)
                        }}
                        style={{
                            position: "absolute",
                            opacity: 0,
                            pointerEvents: "none",
                        }}
                    />
                    {dateUpdated && (
                        <Button
                            onClick={() => {
                                setDateUpdated(false);
                                //console.log(value)
                                dispatch(updateDelivery({id: row.info.dileveryId, created_at: value}))
                            }}
                        >Save</Button>
                    )}
                </Box>
            );
        });
        return (<Sheet
                variant="soft"
                sx={{p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)', m: 0}}
            >
                <Typography level="body-lg" component="div">
                    Details
                </Typography>
                <Table
                    borderAxis="bothBetween"
                    size="md"
                    stickyFooter={false}
                    stickyHeader={false}
                    stripe="even"
                    sx={{
                        fontWeight: "bold",
                        tableLayout: "auto",
                        '& thead td:nth-of-type(1)': {width: '256px'},
                        // '& thead td:nth-child(2)': { width: '80%' }
                    }}
                >
                    <thead>
                    {/* <tr>
                                   <td>Diary Number</td>
                                   <td>
                                        {row.info.diaryNumber}
                                   </td>
                              </tr> */}
                    <tr>
                        <td>Date & Time</td>
                        <td>
                            <DateTimeInputToggle initialDate={row.date}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Customer</td>
                        <td>
                            {/* {titleCase(row.info.customer)} */}
                            <UpdateCell
                                value={{
                                    cust_id: row.info.custId,
                                    name: row.info.customer
                                }}
                                onChange={(customer) => {
                                    return updateCustomer(customer)
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>
                            {titleCase(row.info.adress)}
                        </td>
                    </tr>
                    <tr>
                        <td>Delivered By</td>
                        <td>
                            {titleCase(row.info.deliveredBy)}
                        </td>
                    </tr>
                    <tr>
                        <td>Cash</td>
                        <td>
                            {decimalFix(row.info.cash)}
                        </td>
                    </tr>
                    <tr>
                        <td>Online</td>
                        <td>
                            {
                                decimalFix(row.info.online)
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Correction</td>
                        <td>
                            {row.info.correction ? "Yes" : "No"}
                        </td>
                    </tr>
                    <tr>
                        <td
                            colSpan={2}
                        >
                            <GasEditUi
                                selectedGasList={row.info.gasList}
                                customer={
                                    row.info.custId
                                }
                                deliveryBoy={
                                    row.info.deliverBoyId
                                }
                                deleveryId={row.info.dileveryId}
                                payments={
                                    row.info.payments
                                }
                                correction={row.info.correction}
                                openEdit={openEdit}
                                isOutstanding={row.isOutstanding}
                                gasList={gasList}
                                CUSTOMER_LIST={CUSTOMER_LIST}
                                DELIVERY_BOY_LIST={DELIVERY_BOY_LIST}
                                deleveryGasEditUiGasList={deleveryGasEditUiGasList}
                                onSuccess={onSuccess}
                                createdAt={row.date}
                            />
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
            </Sheet>
        )
    }
    if (row.isOutstanding) {
        //console.log(row);
        return (<>
                <tr>
                    <td
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <DropEditor/>
                    </td>
                    <td
                        style={{
                            textAlign: "center",
                        }}
                    >
                        {row.date}
                    </td>
                    <td
                        style={{
                            textAlign: "center",
                        }}
                    >
                        {row.info.customer}
                    </td>
                    <td
                        colSpan={columns.length + 1 - 5}
                        style={{
                            textAlign: "center",
                        }}
                    >
                        Outstanding
                    </td>
                    <td
                        style={{
                            textAlign: "center",
                        }}
                    >
                        {decimalFix(row.received, true)}
                    </td>
                    <td
                        style={{
                            textAlign: "center",
                        }}
                    >
                        -
                    </td>
                </tr>
                {open && (
                    <tr>
                        <td style={{height: 0, padding: 0}} colSpan={columns.length + 1}>

                            <DropSheet
                            />

                        </td>
                    </tr>
                )}
            </>
        )
    }
    return (
        <React.Fragment>
            <tr style={{
                textAlign: "center",
                borderTopColor: (row.info.correction == true) ? "red" : "",
                borderBottomColor: (row.info.correction == true) ? "red" : ""
            }}>
                <td style={{
                    textAlign: "center", backgroundColor: COLORS.WHITE,
                    borderTopColor: (row.info.correction == true) ? "red" : "",
                    borderBottomColor: (row.info.correction == true) ? "red" : ""
                }}>
                    <DropEditor/>
                </td>

                {cellGroups.map(group => (
                    group.cells.map((cell, cellIndex) => (
                        <td
                            key={`${group.key}-${cellIndex}`}
                            style={{
                                backgroundColor: group.color,
                                textAlign: "center",
                                borderTopColor: (row.info.correction == true) ? "red" : "",
                                borderBottomColor: (row.info.correction == true) ? "red" : ""
                            }}
                        >
                            {cell.value}
                        </td>
                    ))
                ))}
            </tr>
            {open && (
                <tr>
                    <td style={{height: 0, padding: 0}} colSpan={columns.length + 1}>
                        <DropSheet/>
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
})
const UpdateCell = ({value, onChange}) => {
    const [valueState, setValueState] = React.useState(value);

    // Use CUSTOMER_LIST directly as it's now properly structured
    const options = CUSTOMER_LIST;

    // Find the current value in options
    const currentValue = options.find((opt) => opt.id === valueState.cust_id) || null;

    return (
        <Autocomplete
            key={`autocomplete-${valueState.cust_id}`} // Add unique key
            variant="outlined"
            placeholder={titleCase(valueState.name)}
            options={options}
            value={currentValue}
            onChange={(_, newOption) => {
                if (newOption) {
                    const confirm = onChange(newOption);
                    if (confirm) {
                        setValueState({cust_id: newOption.id, name: newOption.label});
                    }
                }
            }}
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, val) => option && val && option.id === val.id}
            clearOnBlur={false}
            disableClearable
            freeSolo={false}
            openOnFocus={true}
            sx={{
                fontWeight: 900,
                color: 'black',
                backgroundColor: 'white',
                '& .MuiInput-root': {
                    fontWeight: "bold",
                }
            }}
            slotProps={{
                input: {
                    sx: {
                        fontWeight: 900,
                        color: 'black',
                    }
                }
            }}
        />
    );
};

function formatDateToDDMMYY(dateString) {
    //convert to epoch
    var date = new Date(dateString);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yy = date.getFullYear();
    var yyyy = yy.toString().slice(2, 4);
    return dd + "/" + mm + "/" + yyyy;
}

function formatDateToDDMMYY_HHMM(dateString) {
    //convert to epoch
    var date = new Date(dateString);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yy = date.getFullYear();
    var yyyy = yy.toString().slice(2, 4);
    let str = dd + "/" + mm + "/" + yyyy;
    let time = date.toLocaleTimeString("en-IN", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    });
    time = time.toUpperCase();
    return str + " - " + time;
}

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

function calculateGasGroup(cylinders, mt, rate) {
    rate = Number(rate)
    cylinders = Number(cylinders)
    mt = Number(mt)
    return {
        cylinders,
        mt,
        rate,
        total: Number(cylinders) * Number(rate)
    };
}