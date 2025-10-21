/* eslint-disable react/prop-types */
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    Autocomplete,
    Box,
    Chip,
    Divider,
    Input,
    LinearProgress,
    Option,
    Select,
    Sheet,
    Stack,
    Switch,
    Table
} from "@mui/joy";
import {useDispatch, useSelector} from "react-redux";
import {fetchDeliveries, UPDATE_DELIVERY_SUCCESS_RESET} from "../../redux/actions/deliveryActions.js";
import {fetchGasData} from "../../state/GasList.jsx";
import {fetchUser} from "../../redux/actions/userActions.js";
import {UPDATE_GAS_DELIVERY_SUCCESS_RESET} from "../../redux/actions/gasDeliveryActions.js";
import gasServices from "../../services/gas-services.jsx";
import {
    formatDateToDDMMYY_HHMM,
    getFromLocalStorage,
    getSessionVal,
    randomLightColor,
    setSessionVal,
    storeInLocalStorage,
    titleCase,
    toNumber
} from "../../Tools.jsx";
import {GasEditUi} from "./GasEditUi.jsx";
import MapObjectManager from "../class/MapArrayManager.jsx";
import {MdCallMade, MdCallReceived, MdEdit} from "react-icons/md";
import ExportODS from "../ExportODS.jsx";

const DeliveryRow = React.memo(function DeliveryRow({row}) {
    return row;
});
export default function DeliveryHistory() {
    const dispatch = useDispatch();
    const deliveriesData = useSelector((state) => state.deliverys);
    const deliveries = deliveriesData.deliveries;
    const loading = deliveriesData.loading;
    const updateSuccess = deliveriesData.updateSuccess;
    const {userDataLoading, users} = useSelector((state) => state.user);
    const allGasData = useSelector((state) => state.gas);
    const {gasDeliverysSucsess} = useSelector((state) => state.gasDelivery);

    const [page, setPage] = useState(1);
    const [isAddNewDeliveryModal, setIsAddNewDeliveryModal] = useState(false);
    const [shouldReload, setShouldReload] = useState(false);

    // Parse URL parameters once
    const urlParams = useMemo(() => {
        const currentUrl = window.location.href;
        const hashIndex = currentUrl.indexOf('#');
        const hashPart = currentUrl.substring(hashIndex + 1);
        const url = new URL(hashPart, window.location.origin);
        const searchParams = new URLSearchParams(url.search);
        return {
            date_start: searchParams.get('dateStart'),
            date_end: searchParams.get('dateEnd')
        };
    }, []);

    const deliveryHistoryOrder = useMemo(() => {
        const order = getFromLocalStorage("deliveryHistoryOrder");
        return order === null || order === undefined ? true : order;
    }, []);

    const [descending, setTheDescending] = useState(deliveryHistoryOrder);
    const [customerId, setTheCustomerId] = useState(getSessionVal("customerId"));
    const [deliverBoyId, setDeliverTheBoyId] = useState(getSessionVal("deliveryBoyId"));

    const [editRow, setEditRow] = useState(null);
    const [editDelivery, setEditDelivery] = useState(null);

    const [dateStart, setDateStartState] = useState(() => {
        if (urlParams.date_start) {
            return formatDate(new Date(urlParams.date_start));
        }
        const date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        date.setHours(0, 0, 0, 0);
        return formatDate(date);
    });

    const [dateEnd, setDateEndState] = useState(() => {
        if (urlParams.date_end) {
            return formatDate(new Date(urlParams.date_end));
        }
        const date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        date.setHours(23, 59, 59, 999);
        return formatDate(date);
    });

    // Memoize gas list
    const gasList = useMemo(() => {
        const map = new Map();
        if (allGasData.data?.data) {
            allGasData.data.data.forEach((value) => {
                map.set(value.id, value);
            });
        }
        return map;
    }, [allGasData.data]);

    // Memoize gas options for UI
    const deleveryGasEditUiGasList = useMemo(() => {
        if (!allGasData.data?.data) return [];
        return allGasData.data.data.map((value) => (
            <Option key={value.id} value={value.id}>
                {value.company_name} - {value.kg}KG
            </Option>
        ));
    }, [allGasData.data]);

    // Memoize customer and delivery boy lists
    const {CUSTOMER_LIST, ADMIN_LIST, DELIVERY_BOY_LIST} = useMemo(() => {
        const customerList = [];
        const adminList = new Map();
        const deliveryBoyList = new Map();

        if (users) {
            users.forEach((user) => {
                if (user.courier_boys.length !== 0) {
                    if (user.courier_boys[0]?.login?.role === 2) {
                        deliveryBoyList.set(user.courier_boys[0].id, user);
                    } else {
                        adminList.set(user.courier_boys[0].id, user);
                    }
                }

                if (user.customers.length !== 0) {
                    const cId = user.customers[0]?.id;
                    const customerName = titleCase(user.name);
                    const address = titleCase(user.address);
                    customerList.push({
                        id: cId,
                        label: `${customerName} (${address})`,
                    });
                }
            });
        }

        return {CUSTOMER_LIST: customerList, ADMIN_LIST: adminList, DELIVERY_BOY_LIST: deliveryBoyList};
    }, [users]);

    const loadData = useCallback(({
                                      force = false,
                                      resetPage = false,
                                      dateS = dateStart,
                                      dateE = dateEnd,
                                      customerId: customerIdParam = undefined,
                                      deliverBoyId: deliverBoyIdParam = undefined
                                  }) => {
        let tempPage = page;
        if (resetPage) {
            setPage(1);
            tempPage = 1;
        }

        // Use provided params if passed, otherwise fall back to outer state
        const effectiveCustomerId = customerIdParam !== undefined ? customerIdParam : customerId;
        const effectiveDeliverBoyId = deliverBoyIdParam !== undefined ? deliverBoyIdParam : deliverBoyId;

        const fetchDeliveriesParams = {
            dateStart: dateS,
            dateEnd: dateE,
            customer_id: effectiveCustomerId,
            courier_boy_id: effectiveDeliverBoyId,
            page: tempPage,
            order: descending ? 'desc' : 'asc',
        };
        if (force) {
            dispatch(fetchDeliveries(fetchDeliveriesParams));
        }
        if (!userDataLoading && !users && !loading) {
            dispatch(fetchUser());
        }
        if (!allGasData.isError && !allGasData.isLoading && !loading && !userDataLoading &&
            (!allGasData.data || allGasData.data.data.length === 0)) {
            dispatch(fetchGasData());
        }
    }, [dateStart, dateEnd, customerId, deliverBoyId, page, loading, dispatch, userDataLoading, users, allGasData, descending]);


    const handleEditClick = useCallback((delivery, date) => {
        setEditRow(delivery.id);
        setEditDelivery({...delivery, formattedDate: date});
    }, []);

    const handleEditClose = useCallback(() => {
        setEditRow(null);
        setEditDelivery(null);
    }, []);

    const setDescending = useCallback((val) => {
        storeInLocalStorage("deliveryHistoryOrder", val);
        setTheDescending(val);
        loadData({force: true, resetPage: true});
    }, [loadData]);

    const setCustomerId = useCallback((id) => {
        setSessionVal("customerId", id);
        setTheCustomerId(id);
        loadData({force: true, customerId: id});
    }, [loadData]);

    const useDebouncedCallback = (fn, delay = 300) => {
        const timer = React.useRef();
        React.useEffect(() => () => clearTimeout(timer.current), []);
        return React.useCallback((...args) => {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => fn(...args), delay);
        }, [fn, delay]);
    };

    const debouncedLoadForCustomer = useDebouncedCallback((id) => {
        loadData({force: true, customerId: id});
    }, 400);

    const setDeliverBoyId = useCallback((id) => {
        setDeliverTheBoyId(id);
        setSessionVal("deliveryBoyId", id);
        loadData({force: true, deliverBoyId: id});
    }, [loadData]);

    const setDateStart = useCallback((date) => {
        setDateStartState(date);
        loadData({force: true, resetPage: true, dateS: date, dateE: dateEnd}); // Pass resetPage=true and the new date
    }, [loadData, dateEnd]);

    const setDateEnd = useCallback((date) => {
        setDateEndState(date);
        loadData({force: true, resetPage: true, dateS: dateStart, dateE: date}); // Pass resetPage=true and the new date
    }, [loadData, dateStart]);

    const loadMore = useCallback(() => {
        setPage(prev => prev + 1);
        loadData({force: true});
    }, [loadData]);

    const updateUrlParams = useCallback((dateStart, dateEnd) => {
        const fullHash = window.location.hash.substring(1);
        const [path, rawQuery = ''] = fullHash.split('?');
        const params = new URLSearchParams(rawQuery);
        const updates = {dateStart, dateEnd, customerId, deliverBoyId};

        Object.entries(updates).forEach(([key, val]) => {
            if (val == null || val === '') {
                params.delete(key);
            } else {
                params.set(key, val);
            }
        });

        const newHash = path + (params.toString() ? `?${params}` : '');
        if (`#${newHash}` !== window.location.hash) {
            window.location.replace(window.location.pathname + window.location.search + `#${newHash}`);
        }
    }, [customerId, deliverBoyId]);

    useEffect(() => {
        const unsubscribe = gasServices.listenDataChange(() => {
            setShouldReload(true);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (shouldReload) {
            loadData({force: true});
            setShouldReload(false);
        }
    }, [shouldReload, loadData]);

    useEffect(() => {
        updateUrlParams(dateStart, dateEnd);
    }, [dateStart, dateEnd, customerId, deliverBoyId, updateUrlParams]);

    useEffect(() => {
        loadData({force: true});
    }, []);

    useEffect(() => {
        if (gasDeliverysSucsess) {
            dispatch({type: UPDATE_GAS_DELIVERY_SUCCESS_RESET});
            loadData({force: true});
        }
    }, [gasDeliverysSucsess, dispatch, loadData]);

    useEffect(() => {
        if (updateSuccess) {
            dispatch({type: UPDATE_DELIVERY_SUCCESS_RESET});
            loadData({force: true});
        }
    }, [updateSuccess, dispatch, loadData]);

    const handleSuccess = useCallback(() => {
        loadData({force: true});
    }, [loadData]);

    let grandTotalAmount = 0;
    let grandTotalPaid = 0;

    const KGS = new Set();
    let KGS_COUNT = {}

    // Memoize table data processing
    const {columns, csvData, deliveriesMapList} = useMemo(() => {
        const cols = [];
        const deliveriesMapList = [];
        const csvData = [];

        if (!deliveries || !allGasData.data || allGasData.data.data.length === 0 || !users || allGasData.isLoading || loading || userDataLoading) {
            return {columns: cols, csvData: [], deliveriesMapList: []};
        }

        //console.log("Sorting deliveries");
        const sortedDeliveries = [...deliveries]
            .filter(delivery => {
                    if (deliverBoyId !== null && delivery.courier_boy.id !== deliverBoyId) return false;
                    if (customerId !== null && delivery.customer.id !== customerId) return false;
                    if (dateStart && dateEnd) {
                        const mDateStart = new Date(dateStart);
                        mDateStart.setHours(0, 0, 0, 0);

                        const mDateEnd = new Date(dateEnd);
                        mDateEnd.setHours(23, 59, 59, 999);

                        const deliveryDate = new Date(delivery.created_at);

                        if (deliveryDate < mDateStart || deliveryDate > mDateEnd) {
                            return;
                        }
                    }
                    return true;
                }
            )
            .sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);

                a.gas_deliveries.forEach(gas => {
                    KGS.add(gas.kg);
                });
                b.gas_deliveries.forEach(gas => {
                    KGS.add(gas.kg);
                });

                if (descending) {
                    return dateB - dateA; // For descending order
                } else {
                    return dateA - dateB; // For ascending order
                }
            });

        grandTotalAmount = 0;
        grandTotalPaid = 0;
        KGS_COUNT = {}

        sortedDeliveries.forEach((delivery, i) => {
            const correction = delivery.correction;
            const gasDataMap = new MapObjectManager();

            delivery.gas_deliveries.forEach((gas) => {
                const k = `kg${gas.kg}`;
                const entry = {};

                if (gas.nc) {
                    entry.nc = Number(gas.quantity);
                    entry.ncRate = Number(gas.gas_price);
                    KGS_COUNT[`qty_${gas.kg}`] = (KGS_COUNT[`qty_${gas.kg}`] || 0) + Number(gas.quantity);
                } else if (gas.is_empty) {
                    entry.mt = Number(gas.quantity);
                    KGS_COUNT[`mt_${gas.kg}`] = (KGS_COUNT[`mt_${gas.kg}`] || 0) + Number(gas.quantity);
                } else {
                    entry.qty = Number(gas.quantity);
                    entry.rate = Number(gas.gas_price);
                    KGS_COUNT[`qty_${gas.kg}`] = (KGS_COUNT[`qty_${gas.kg}`] || 0) + Number(gas.quantity);
                }
                gasDataMap.merge(k, entry);
            });

            const temptKgsList = [];
            const tempCsvList = [];
            const tempNcCsvList = [];
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

                    console.log("Rendering...")

                    temptKgsList.push(
                        <DataCell correction={correction} key={`1delivery-${i}-kg${kg}`} bgColor={randomLightColor(kg)}>
                            <span>{temp.qty || "-"}</span>
                            {temp.nc && (<>
                                <hr className="border-black opacity-30 h-0.5 w-full"/>
                                <span className="text-blue-700">{temp.nc}</span>
                            </>)}
                        </DataCell>,
                        <DataCell correction={correction} key={`2delivery-${i}-kg${kg}`}
                                  bgColor={randomLightColor(kg)}>{temp.mt || "-"}</DataCell>,
                        <DataCell correction={correction} key={`3delivery-${i}-kg${kg}`} bgColor={randomLightColor(kg)}>
                            <span>{temp.rate || "-"}</span>
                            {temp.nc && (<>
                                <hr className="border-black opacity-30 h-0.5 w-full"/>
                                <span className="text-blue-700">{temp.ncRate}</span>
                            </>)}
                        </DataCell>,
                        <DataCell correction={correction} key={`4delivery-${i}-kg${kg}`} bgColor={randomLightColor(kg)}>
                            <span>{total}</span>
                            {temp.nc && (<>
                                <hr className="border-black opacity-30 h-0.5 w-full"/>
                                <span className="text-blue-700">{ncTotal}</span>
                            </>)}
                        </DataCell>
                    );

                    tempCsvList.push(
                        temp.qty || "",
                        temp.mt || "",
                        temp.rate || "",
                        (total === "-") ? "" : total
                    );

                    tempNcCsvList.push(
                        temp.nc || "",
                        "",
                        temp.ncRate || "",
                        (ncTotal === "-") ? "" : ncTotal
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
                    tempCsvList.push("", "", "", "");
                    tempNcCsvList.push("", "", "", "");
                }
            });

            grandTotalPaid += received;
            grandTotalAmount += subTotal;

            const balance = subTotal - received;
            const displaySubTotal = subTotal === 0 ? "-" : subTotal;
            const displayReceived = received === 0 ? "-" : received;
            const date = formatDateToDDMMYY_HHMM(delivery.created_at);
            const customerName = titleCase(delivery.customer.name);

            deliveriesMapList.push(
                <DeliveryRow
                    key={`dRow${i}-${delivery.id}`}
                    row={
                        <tr key={`dRow${i}-${delivery.id}`}>
                            <DataCell key={`delivery-${i}-remark`} correction={correction}>
                                <Chip
                                    color="primary"
                                    onClick={() => handleEditClick(delivery, date)}
                                    size="sm"
                                >
                                    <MdEdit/>
                                </Chip>
                                {
                                    (editRow === delivery.id) && <GasEditUi
                                        key={`delivery-${i}-edit`}
                                        selectedGasList={delivery.gas_deliveries}
                                        customer={delivery.customer.name}
                                        custId={delivery.customer.id}
                                        deliveryBoy={delivery.courier_boy.name}
                                        deleveryId={delivery.id}
                                        payments={delivery.payments}
                                        correction={correction}
                                        openEdit={editRow === delivery.id}
                                        isOutstanding={false}
                                        gasList={gasList}
                                        CUSTOMER_LIST={CUSTOMER_LIST}
                                        DELIVERY_BOY_LIST={DELIVERY_BOY_LIST}
                                        deleveryGasEditUiGasList={deleveryGasEditUiGasList}
                                        onSuccess={handleSuccess}
                                        createdAt={date}
                                        onClose={() => setEditRow(null)}
                                    />
                                }
                            </DataCell>
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
                    }
                />
            );

            const isAllGasEmpty = tempCsvList.every(item => item === "");
            const isAllNcGasEmpty = tempNcCsvList.every(item => item === "");

            if (!isAllNcGasEmpty) {
                csvData.push([
                    date,
                    customerName,
                    "NC",
                    ...tempNcCsvList,
                    nCSubTotal,
                    isAllGasEmpty ? online : "",
                    isAllGasEmpty ? cash : "",
                    isAllGasEmpty ? received : "",
                    isAllGasEmpty ? balance : nCSubTotal
                ]);
            }

            if (!isAllGasEmpty || (isAllNcGasEmpty && received !== "" && received !== "-" && received !== 0)) {
                csvData.push([
                    date,
                    customerName,
                    isAllGasEmpty ? "Payment" : "",
                    ...tempCsvList,
                    normalSubTotal,
                    online,
                    cash,
                    received,
                    isAllNcGasEmpty ? balance : (toNumber(normalSubTotal) - toNumber(received))
                ]);
            }
        });

        // Build columns
        cols.push(
            {column: "date", color: "white"},
            {column: "customer", color: "white"}
        );

        [...KGS].sort((a, b) => a - b).forEach((kg) => {
            cols.push(
                {column: `${kg}kg`, color: randomLightColor(kg)},
                {column: "mt", color: randomLightColor(kg)},
                {column: "rate", color: randomLightColor(kg)},
                {column: "total", color: randomLightColor(kg)}
            );
        });

        cols.push(
            {column: "sub total", color: "white"},
            {column: "online", color: "white"},
            {column: "cash", color: "white"},
            {column: "total payment", color: "white"},
            {column: "balance", color: "white"}
        );

        return {columns: cols, csvData, deliveriesMapList};
    }, [deliveries, descending, deliverBoyId, customerId, urlParams, gasList, CUSTOMER_LIST, DELIVERY_BOY_LIST, deleveryGasEditUiGasList, handleSuccess]);

    const headers = useMemo(() => {
        const h = columns.map((col) => col.column);
        h.splice(2, 0, "remark");
        return h;
    }, [columns]);

    return (
        <Stack
            sx={{
                width: "100%",
                height: "100%",
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
            {editRow && editDelivery && (
                <GasEditUi
                    selectedGasList={editDelivery.gas_deliveries}
                    customer={editDelivery.customer.name}
                    custId={editDelivery.customer.id}
                    deliveryBoy={editDelivery.courier_boy.name}
                    deliveryBoyId={editDelivery.courier_boy.id}
                    deleveryId={editDelivery.id}
                    payments={editDelivery.payments}
                    correction={editDelivery.correction}
                    openEdit={true}
                    isOutstanding={false}
                    gasList={gasList}
                    CUSTOMER_LIST={CUSTOMER_LIST}
                    DELIVERY_BOY_LIST={DELIVERY_BOY_LIST}
                    deleveryGasEditUiGasList={deleveryGasEditUiGasList}
                    onSuccess={handleSuccess}
                    createdAt={editDelivery.formattedDate}
                    onClose={handleEditClose}
                />
            )}
            <Box
                sx={{
                    width: "100%",
                    display: (allGasData.isLoading || loading || userDataLoading) ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <LinearProgress/>
            </Box>
            <Sheet sx={{flexGrow: 1, width: "100%", height: "100%"}}>
                <Table
                    aria-label="collapsible table"
                    size="md"
                    stickyHeader={true}
                    stickyFooter={true}
                    sx={{
                        width: "100%",
                        flexGrow: 1,
                        wordBreak: "keep-all",
                        tableLayout: "auto",
                        fontWeight: "bold",
                        "& td, & tr": {
                            paddingTop: 0.5,
                            paddingBottom: 0.5,
                            margin: 0,
                            borderBottomWidth: 0,
                            height: "unset",
                            verticalAlign: "middle",
                        },
                        "& tbody tr td": {
                            transition: "all 0.1s ease",
                        },
                        "& tbody tr:hover td": {
                            borderTop: "1px solid #262d43",
                            borderBottom: "1px solid #262d43",
                        },
                    }}
                >
                    <thead>
                    <tr className="!p-0 !m-0">
                        <th colSpan={columns.length + 1} className="!p-0 !m-0">
                            <Stack
                                direction="column"
                                className="!p-0 !m-0 w-full"
                            >
                                <Divider className="bg-white h-1"/>
                                <Stack
                                    sx={{
                                        width: "100%",
                                        // flexGrow: 1,
                                        alignItems: "center",
                                    }}
                                    className="!p-0 !m-0"
                                    direction="row"
                                    gap={1}
                                    alignContent={"end"}
                                    justifyContent={"flex-start"}
                                >
                                    {/*<ExportCSV*/}
                                    {/*    headers={headers}*/}
                                    {/*    data={csvData}*/}
                                    {/*    filename={`deliveries_${formatDateToDDMMYY(dateStart)}_TO_${formatDateToDDMMYY(dateEnd)}.csv`}*/}
                                    {/*>*/}
                                    {/*    Download File*/}
                                    {/*</ExportCSV>*/}
                                    <ExportODS
                                        headers={headers}
                                        data={csvData}
                                        filename={`deliveries_${formatDateToDDMMYY(dateStart)}_TO_${formatDateToDDMMYY(dateEnd)}`}
                                        sumColumns={['sub total', 'total payment', 'balance']}
                                    >
                                        Download
                                    </ExportODS>
                                    <Divider sx={{backgroundColor: "grey"}} orientation="vertical"/>
                                    <GasEditUi
                                        selectedGasList={[]}
                                        customer={0}
                                        deliveryBoy={null}
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
                                    <Divider sx={{flexGrow: 1, opacity: 0}}/>
                                    <span style={{fontWeight: "bold", color: "black", whiteSpace: "nowrap"}}>
                         Reverse Order
                    </span>
                                    <Switch
                                        checked={descending}
                                        onChange={(event) => {
                                            setDescending(event.target.checked);
                                        }}
                                    />
                                    <Divider sx={{backgroundColor: "grey"}} orientation="vertical"/>
                                    <span style={{fontWeight: "bold", color: "black", whiteSpace: "nowrap"}}>
                         Customer :
                    </span>
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
                                            //setCustomerId(value?.id ?? null);
                                            const id = value?.id ?? null;
                                            setSessionVal("customerId", id); // immediate session update if desired
                                            setTheCustomerId(id);             // immediate UI update
                                            debouncedLoadForCustomer(id);     // debounced network/load
                                        }}
                                        sx={{fontWeight: 'bold', minWidth: 150}}
                                    />
                                    <Divider sx={{backgroundColor: "grey"}} orientation="vertical"/>
                                    <span style={{fontWeight: "bold", color: "black", whiteSpace: "nowrap"}}>
                         Delivery Boy :
                    </span>
                                    <Select
                                        defaultValue={deliverBoyId || null}
                                        placeholder="Select Delivery Boy"
                                        onChange={(event, value) => {
                                            setDeliverBoyId(value === "" ? null : value);
                                        }}
                                        sx={{minWidth: 150}}
                                    >
                                        <Option value="">Show All</Option>
                                        {[...DELIVERY_BOY_LIST.entries()].map(([courierId, user]) => (
                                            <Option key={courierId} value={courierId}>
                                                {titleCase(user.name)}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Divider sx={{backgroundColor: "grey"}} orientation="vertical"/>
                                    <span style={{fontWeight: "bold", color: "black", whiteSpace: "nowrap"}}>
                         Date :
                    </span>
                                    <Input
                                        type="date"
                                        defaultValue={dateStart}
                                        onChange={(event) => {
                                            setDateStart(event.target.value);
                                        }}
                                        sx={{minWidth: 150}}
                                    />
                                    <Input
                                        type="date"
                                        defaultValue={dateEnd}
                                        onChange={(event) => {
                                            setDateEnd(event.target.value);
                                        }}
                                        sx={{minWidth: 150}}
                                    />
                                </Stack>
                                <Divider className="bg-white h-1"/>
                            </Stack>
                        </th>
                    </tr>
                    <tr>
                        <th style={{width: 40}} aria-label="empty"/>
                        {columns.map((col, index) => (
                            <th
                                key={`${index}_${col.column}`}
                                style={{
                                    textAlign: "center",
                                    backgroundColor: col.color,
                                    wordBreak: "break-space",
                                }}
                            >
                                {col.column}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {deliveriesMapList.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + 1}
                                style={{textAlign: "center", fontWeight: "bold", fontSize: "1.8em"}}>
                                {
                                    !loading ? "No Deliveries Found" : "Please Wait..."
                                }
                            </td>
                        </tr>
                    )}
                    {
                        deliveriesMapList
                    }
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan={columns.length + 1}>
                            <Stack
                                direction="row"
                                gap={1}
                                alignItems="center"
                            >
                                {
                                    [...KGS].sort((a, b) => a - b).map((kg, index) => (
                                        <Stack
                                            key={`kgCountList${index}`}
                                            className="rounded-md  py-0.5 px-2.5 border border-transparent text-sm text-black transition-all shadow-sm"
                                            direction="row"
                                            gap={.5}
                                            alignItems="center"
                                            sx={{
                                                backgroundColor: randomLightColor(kg),
                                            }}
                                        >
                                            <span>{kg}kg</span>
                                            <Divider className="!bg-black" orientation="vertical"/>
                                            <MdCallMade/>
                                            <span>{
                                                KGS_COUNT[`qty_${kg}`] || 0
                                            }</span>
                                            <span>-</span>
                                            <MdCallReceived/>
                                            <span>{
                                                KGS_COUNT[`mt_${kg}`] || 0
                                            }</span>
                                            <span>=</span>
                                            <span>{
                                                (KGS_COUNT[`qty_${kg}`] || 0) - (KGS_COUNT[`mt_${kg}`] || 0)
                                            }</span>
                                        </Stack>
                                    ))
                                }
                                <Divider className="!bg-transparent flex-grow" orientation="vertical"/>
                                <Stack
                                    className="rounded-md  py-0.5 px-2.5 border border-transparent text-sm text-black transition-all shadow-sm"
                                    direction="row"
                                    gap={1}
                                    alignItems="center"
                                    sx={{
                                        backgroundColor: "#BBDCE5",
                                    }}
                                >
                                    <span className="text-black">Total Amount : ₹{grandTotalAmount}</span>
                                </Stack>
                                <Stack
                                    className="rounded-md  py-0.5 px-2.5 border border-transparent text-sm text-black transition-all shadow-sm"
                                    direction="row"
                                    gap={1}
                                    alignItems="center"
                                    sx={{
                                        backgroundColor: "#D3ECCD",
                                    }}
                                >
                                    <span className="text-black">Total Paid : ₹{grandTotalPaid}</span>
                                </Stack>
                                <Stack
                                    className="rounded-md  py-0.5 px-2.5 border border-transparent text-sm text-black transition-all shadow-sm"
                                    direction="row"
                                    gap={1}
                                    alignItems="center"
                                    sx={{
                                        backgroundColor: "#FFF1CA",
                                    }}
                                >
                                    <span
                                        className="text-black">Total Balance : ₹{grandTotalAmount - grandTotalPaid}</span>
                                </Stack>
                            </Stack>
                        </td>
                    </tr>
                    </tfoot>
                </Table>
            </Sheet>
        </Stack>
    );
}

export const DataCell = React.memo(({bgColor = "white", correction = false, children}) => {
    return (
        <td style={{backgroundColor: bgColor}}>
            <div
                style={{
                    whiteSpace: "nowrap",
                    color: correction ? "red" : "black",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                {children}
            </div>
        </td>
    );
});

DataCell.displayName = 'DataCell';

function formatDateToDDMMYY(dateString) {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear().toString().slice(2, 4);
    return `${dd}/${mm}/${yyyy}`;
}

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};