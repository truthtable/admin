/* eslint-disable react/prop-types */
import React, {useCallback, useEffect, useState} from "react";
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
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
import ExportCSV from "../ExportCSV.jsx";
import {FaArrowDown} from "react-icons/fa";
import {GasEditUi} from "./GasEditUi.jsx";
import MapObjectManager from "../class/MapArrayManager.jsx";

let columns = [];
const CUSTOMER_LIST = [];
const ADMIN_LIST = new Map();
const DELIVERY_BOY_LIST = new Map();
let gasList = new Map();
let deleveryGasEditUiGasList = [];

export default function deliveryHistory() {

    columns = []

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
        if (userDataLoading === false && (users == null || users == undefined) && loading == false) {
            dispatch(fetchUser());
        }
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
    }, []);
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
    const handleSuccess = useCallback(() => {
        loadData(true);
    }, []);

    let rows = []
    let csvData = []
    let KGS = new Set()
    const deliveriesMapList = []
    if (deliveries != null || deliveries != undefined) {
        let sortedDeliveries = [...deliveries].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            if (descending) {
                return dateB - dateA; // For descending order
            } else {
                return dateA - dateB; // For ascending order
            }
        });
        sortedDeliveries.forEach(delivery => {
            delivery.gas_deliveries.forEach(gas => {
                KGS.add(gas.kg);
            })
        })
        sortedDeliveries.forEach((delivery, i) => {
            const correction = delivery.correction
            const gasDataMap = new MapObjectManager();

            //console.log(delivery.customer.id)
            if (deliverBoyId !== null) {
                if (!(delivery.courier_boy.id == deliverBoyId)) {
                    return
                }
            }
            if (customerId !== null) {
                if (!(delivery.customer.id == customerId)) {
                    return
                }
            }
            //date range
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

            delivery.gas_deliveries.forEach((gas, index) => {
                const kg = gas.kg;
                const k = `kg${kg}`;
                const entry = {};
                if (gas.nc) {
                    entry.nc = gas.quantity;
                    entry.ncRate = gas.gas_price;
                } else if (gas.is_empty) {
                    entry.mt = gas.quantity;
                } else if (!gas.nc && !gas.is_empty) {
                    entry.qty = gas.quantity;
                    entry.rate = gas.gas_price;
                }
                gasDataMap.merge(k, entry);
            });

            rows.push([
                "",
                formatDateToDDMMYY_HHMM(delivery.created_at),
                titleCase(delivery.customer.name),
            ]);

            const temptKgsList = []
            const tempCsvList = []
            const tempNcCsvList = []
            const gasObjs = gasDataMap.toObject()
            let normalSubTotal = 0
            let nCSubTotal = 0
            let subTotal = 0
            let received = 0
            let cash = 0
            let online = 0
            //console.log(delivery.payments)
            delivery?.payments?.forEach(payment => {
                if (payment.method == 0) {
                    cash += Number(payment.amount)
                } else if (payment.method == 1) {
                    online += Number(payment.amount)
                }
                received += Number(payment.amount);
            })
            KGS = [...KGS].sort((a, b) => a - b)
            KGS.forEach(kg => {
                const temp = gasObjs[`kg${kg}`]
                if (temp) {
                    const total = temp.rate ? (Number(temp.qty) * Number(temp.rate)) : "-";
                    normalSubTotal += temp.rate ? total : 0
                    const ncTotal = temp.ncRate ? (Number(temp.nc) * Number(temp.ncRate)) : "-";
                    nCSubTotal += temp.ncRate ? ncTotal : 0
                    subTotal += (temp.rate ? total : 0) + (temp.ncRate ? ncTotal : 0)
                    temptKgsList.push(
                        <DataCell correction={correction} key={`1delivery-${i}-kg${kg}`} bgColor={randomLightColor(kg)}>
                            <span>{temp.qty || "-"}</span>
                            {temp.nc && (<>
                                <Divider orientation={"horizontal"} sx={{height: "2px"}}/>
                                <span className="text-blue-700">{temp.nc}</span>
                            </>)}
                        </DataCell>,
                        <DataCell correction={correction} key={`2delivery-${i}-kg${kg}`}
                                  bgColor={randomLightColor(kg)}>{temp.mt || "-"}</DataCell>,
                        <DataCell correction={correction} key={`3delivery-${i}-kg${kg}`} bgColor={randomLightColor(kg)}>
                            <span>{temp.rate || "-"}</span>
                            {temp.nc && (<>
                                <Divider orientation={"horizontal"} sx={{height: "2px"}}/>
                                <span className="text-blue-700">{temp.ncRate}</span>
                            </>)}
                        </DataCell>,
                        <DataCell correction={correction} key={`4delivery-${i}-kg${kg}`} bgColor={randomLightColor(kg)}>
                            <span>{total}</span>
                            {temp.nc && (<>
                                <Divider orientation={"horizontal"} sx={{height: "2px"}}/>
                                <span className="text-blue-700">{ncTotal}</span>
                            </>)}
                        </DataCell>
                    )
                    tempCsvList.push(
                        temp.qty || "",
                        temp.mt || "",
                        temp.rate || "",
                        (total === "-") ? "" : total
                    )
                    tempNcCsvList.push(
                        temp.nc || "",
                        "",
                        temp.ncRate || "",
                        (ncTotal === "-") ? "" : ncTotal
                    )

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
                    )
                    tempCsvList.push(
                        "",
                        "",
                        "",
                        ""
                    )
                    tempNcCsvList.push(
                        "",
                        "",
                        "",
                        ""
                    )
                }
            })
            let balance = subTotal - received
            //if (balance <= 0) balance = "-"
            subTotal = (subTotal === 0) ? "-" : subTotal
            received = (received === 0) ? "-" : received
            const date = formatDateToDDMMYY_HHMM(delivery.created_at)
            const customerName = titleCase(delivery.customer.name)
            //console.log(delivery)
            deliveriesMapList.push([
                <DataCell key={`delivery-${i}-remark`} correction={correction}>
                    <GasEditUi
                        selectedGasList={delivery.gas_deliveries}
                        customer={
                            delivery.customer.name
                        }
                        custId={
                            delivery.customer.id
                        }
                        deliveryBoy={
                            delivery.courier_boy.name
                        }
                        deleveryId={delivery.id}
                        payments={
                            delivery.payments
                        }
                        correction={correction}
                        openEdit={false}
                        isOutstanding={false}
                        gasList={gasList}
                        CUSTOMER_LIST={CUSTOMER_LIST}
                        DELIVERY_BOY_LIST={DELIVERY_BOY_LIST}
                        deleveryGasEditUiGasList={deleveryGasEditUiGasList}
                        onSuccess={() => {
                        }}
                        createdAt={date}
                    />
                </DataCell>,
                <DataCell correction={correction} key={`delivery-${i}-date`}>{date}</DataCell>,
                <DataCell correction={correction} key={`delivery-${i}-name`}>{customerName}</DataCell>,
                ...temptKgsList,
                <DataCell correction={correction} key={`delivery-${i}-sub`}>{subTotal}</DataCell>,
                <DataCell correction={correction} key={`delivery-${i}-online`}>{online}</DataCell>,
                <DataCell correction={correction} key={`delivery-${i}-cash`}>{cash}</DataCell>,
                <DataCell correction={correction} key={`delivery-${i}-received`}>{received}</DataCell>,
                <DataCell correction={correction} key={`delivery-${i}-balance`}>{balance}</DataCell>
            ]);
            const isAllGasEmpty = (tempCsvList.every(item => item === ""))
            const isAllNcGasEmpty = (tempNcCsvList.every(item => item === ""))
            if (!isAllNcGasEmpty) {
                csvData.push(
                    [
                        date,
                        customerName,
                        "NC",
                        ...tempNcCsvList,
                        nCSubTotal,
                        isAllGasEmpty ? online : "",
                        isAllGasEmpty ? cash : "",
                        isAllGasEmpty ? received : "",
                        isAllGasEmpty ? balance : nCSubTotal
                    ]
                )
            }
            if (!isAllGasEmpty || (isAllNcGasEmpty && (received !== "" || received !== "-" || received !== 0 || received !== "0"))) {
                csvData.push(
                    [
                        date,
                        customerName,
                        isAllGasEmpty ? "Payment" : "",
                        ...tempCsvList,
                        normalSubTotal,
                        online,
                        cash,
                        received,
                        isAllNcGasEmpty ? balance : (toNumber(normalSubTotal) - toNumber(received))
                    ]
                )
            }
        });
    }
    columns.push(
        {
            column: "date",
            color: "white"
        },
        {
            column: "customer",
            color: "white"
        }
    )
    KGS.forEach((kg, index) => {
        columns.push(
            {column: `${kg}kg`, color: randomLightColor(kg)},
            {column: "mt", color: randomLightColor(kg)},
            {column: "rate", color: randomLightColor(kg)},
            {column: "total", color: randomLightColor(kg)}
        );
    })
    columns.push(
        {
            column: "sub total",
            color: "white"
        },
        {
            column: "online",
            color: "white"
        },
        {
            column: "cash",
            color: "white"
        },
        {
            column: "total payment",
            color: "white"
        },
        {
            column: "balance",
            color: "white"
        }
    )
    const headers = columns.map((col) => col.column);
    // csvData.push(
    //     headers
    // )
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
            justifyContent={"flex-start"}
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
                    whiteSpace: "nowrap"
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
                    whiteSpace: "nowrap"
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
                    minWidth: 150
                }}
            />
            <Divider sx={{backgroundColor: "grey"}} orientation="vertical"/>
            <span
                style={{
                    fontWeight: "bold",
                    color: "black",
                    whiteSpace: "nowrap"
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
                sx={{
                    minWidth: 150
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
                    whiteSpace: "nowrap"
                }}
            >Date :</span>
            <Input
                type="date"
                defaultValue={dateStart}
                onChange={(event) => {
                    setDateStart(event.target.value);
                }}
                sx={{
                    minWidth: 150
                }}
            />
            <Input
                type="date"
                defaultValue={dateEnd}
                onChange={(event) => {
                    setDateEnd(event.target.value);
                }}
                className={"whitespace-nowrap"}
                sx={{
                    minWidth: 150
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
                    <tr>
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
                    {
                        ((deliveriesMapList.length === 0) ? <tr>
                                <td colSpan={columns.length + 1}
                                    style={{textAlign: "center", fontWeight: "bold", fontSize: "1.8em"}}>No Data
                                </td>
                            </tr> : null
                        )
                    }
                    {
                        deliveriesMapList.map((row, index) => (
                            <tr key={`dRow${index}`}>
                                {
                                    row.map((value, i) => (
                                        value
                                    ))
                                }
                            </tr>
                        ))
                    }
                    {
                        (!(deliveriesMapList.length === 0) ? <tr>
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
const DataCell = ({bgColor = "white", correction = false, children}) => {
    return <td style={{backgroundColor: bgColor}}>
        <Stack
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            direction="column"
            sx={{
                whiteSpace: "nowrap",
                color: correction ? "red" : "black",
                fontWeight: correction ? "bold" : "bold",
            }}
        >
            {children}
        </Stack>
    </td>
}

function formatDateToDDMMYY(dateString) {
    //convert to epoch
    var date = new Date(dateString);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yy = date.getFullYear();
    var yyyy = yy.toString().slice(2, 4);
    return dd + "/" + mm + "/" + yyyy;
}

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};