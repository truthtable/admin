import React, {useEffect, useMemo, useState} from "react";
import "../../crud/crud-css/read.css";
import {BsSearch} from "react-icons/bs";
import DataTable from "../table/DataTable.jsx";
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Input,
    LinearProgress,
    List,
    ListItem,
    ListItemContent,
    Modal,
    ModalClose,
    Option,
    Select,
    Sheet,
    Stack,
    Typography
} from "@mui/joy";
import TableHead from "../table/TableHead.jsx";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchCustomerData} from "../../state/Customers.jsx";
import UpdateCustomerCell, {NUMBER, TEXT} from "../edit/UpdateCustomerCell.jsx";
import {UPDATE_CUSTOMER, UPDATE_USER, URL} from "../../services/Api.jsx";
import {TbHomePlus} from "react-icons/tb";
import {fetchGas} from "../../redux/actions/gasAction.js";
import {CgClose} from "react-icons/cg";
import {decimalFix, getFromLocalStorage, setSessionVal, storeInLocalStorage} from "../../Tools.jsx";
import {FaInfoCircle} from "react-icons/fa";
import {adjustBalance, customerPaymentsUpdateOrCreateReset} from "../../redux/customerPaymentsUpdateOrCreate.js";
import gasServices from "../../services/gas-services.jsx";
import {RiDeleteBin2Fill} from "react-icons/ri";
import {deleteCustomer} from "../../state/CustomerUpdate.jsx";

let CUSTOMERS = [];
const CUSTOMER_SEARCH_TEXT = "customerSearchText";
const BALANCE_SORT = "balance";
const CUSTOMER_NAME_SORT = "customer_name";
const ADDRESS_SORT = "address";
const DIARY_SORT = "diary_no";
const ViewCustomer = () => {
    const dispatch = useDispatch();
    const customerData = useSelector((state) => state.customers);
    const updateCustomer = useSelector((state) => state.updateCustomer);
    const {gasLoading, gasList, gasError} = useSelector((state) => state.gasList);
    const {
        isCustomerPaymentsUpdateOrCreateLoading,
        isCustomerPaymentsUpdateOrCreateError,
        customerPaymentsUpdateOrCreateErrorMessage,
        isCustomerPaymentsUpdateOrCreateSuccess
    } = useSelector((state) => state.customerPaymentsUpdateOrCreate);
    const c = useSelector((state) => state.localCustomers);
    const localCustomers = c.customers || [];
    //console.log({c, localCustomers})
    const [searchText, setSearchCustomerText] = useState(getFromLocalStorage(CUSTOMER_SEARCH_TEXT) || "");
    const setSearchText = (text) => {
        storeInLocalStorage(CUSTOMER_SEARCH_TEXT, text);
        setSearchCustomerText(text);
    }
    const [customerDetailsModel, setCustomerDetailsModel] = useState(false);
    const [sortBy, setSortBy] = useState(BALANCE_SORT);
    let [selectedCustomer, setSelectedCustomer] = useState(null);
    const connection = useSelector((state) => state.connections);
    const [shouldReload, setShouldReload] = useState(false);
    let xcombineData = null
    const loadConnection = (id) => {
        const customer = xcombineData.find((user) => user.id == id)
        setSelectedCustomer(customer)
        setCustomerDetailsModel(true);
    };
    const data = useMemo(() => {
        let filtered = [...localCustomers];
        if (sortBy == CUSTOMER_NAME_SORT) {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy == BALANCE_SORT) {
            filtered.sort((a, b) => b.totalBalance - a.totalBalance);
        } else if (sortBy == ADDRESS_SORT) {
            filtered.sort((a, b) => a.address.localeCompare(b.address));
        } else if (sortBy == DIARY_SORT) {
            filtered.sort((a, b) => {
                const isSpecial = v => v === 0 || v === null || v === "";
                if (isSpecial(a.diaryNumber) && !isSpecial(b.diaryNumber)) return 1;
                if (!isSpecial(a.diaryNumber) && isSpecial(b.diaryNumber)) return -1;
                if (isSpecial(a.diaryNumber) && isSpecial(b.diaryNumber)) return 0;
                return a.diaryNumber - b.diaryNumber;
            });
        }
        if (searchText.length > 0) {
            filtered = filtered.filter((item) => {
                return item.name.toLowerCase().includes(searchText.toLowerCase());
            });
        }
        xcombineData = filtered;
        return filtered.map((item) => makeRow(
            item,
            loadConnection,
            (userId) => {
                dispatch(deleteCustomer(userId))
            }
        ));
    }, [localCustomers, sortBy, searchText]);
    useEffect(() => {
        if (c.customers === null && !customerData.isLoading) {
            dispatch(fetchCustomerData());
        }
        if (gasList.length == 0 && !gasLoading) {
            dispatch(fetchGas())
        }
        if (isCustomerPaymentsUpdateOrCreateSuccess) {
            dispatch(customerPaymentsUpdateOrCreateReset())
        }
        if (updateCustomer.isSuccessful) {
            dispatch(fetchCustomerData());
        }
    }, [customerData, gasList, gasLoading, dispatch, updateCustomer]);
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
            //console.log("reload");
            dispatch(fetchCustomerData());
            setShouldReload(false);
        }
    }, [shouldReload]);
    const [openNewConnection, setOpenNewConnection] = useState(false);
    const NewConnectionForm = () => {
        const [gasIdList, setGasIdList] = useState(new Array());
        const [noGas, setNoGas] = useState(true);
        const [noAccessory, setNoAccessory] = useState(true);
        const addGasIdList = (id, qty, price) => {
            if (qty < 1) {
                alert("Quantity should be greater than 0");
                return;
            }
            if (gasIdList.find((item) => item.id === id)) {
                alert("Gas already selected");
                return;
            }
            if (gasList.find((item) => item.id === id) == null) {
                alert("Select A Gas");
                return;
            }
            setGasIdList((prevList) => [...prevList, {id: id, qty: qty, price: price}]);
        };
        const removeGasItem = (index) => {
            setGasIdList((prevList) => {
                let temp = [...prevList];
                temp.splice(index, 1);
                return temp;
            })
        };
        const [accessory, setAccessory] = useState("");
        const [price, setPrice] = useState("");
        const [accessoryList, setAccessoryList] = useState(new Array());
        const [loadingSubmit, setLoadingSubmit] = useState(false);
        const addAccessory = (accessory, price) => {
            if (price < 1) {
                alert("Price should be greater than 0");
                return;
            }
            if (accessory.length === 0) {
                alert("Accessory should not be empty");
                return;
            }
            setAccessoryList((prevList) => [...prevList, {accessory: accessory, price: price}]);
            setAccessory("");
            setPrice("");
        };
        const removeAccessory = (index) => {
            setAccessoryList((prevList) => {
                let temp = [...prevList];
                temp.splice(index, 1);
                return temp;
            })
        };
        return <Modal
            open={openNewConnection}
            onClose={() => setOpenNewConnection(false)}
            title="New Connection"
            className="flex flex-col justify-center items-center gap-2.5"
        >
            <Container sx={{
                overflow: 'auto',
            }}>
                <Sheet className="p-5 rounded-xl bg-white shadow-lg">
                    <ModalClose variant="outlined"/>
                    <Typography>New Customer</Typography>
                    <Divider className="opacity-0 p-2"/>
                    <form
                        onSubmit={
                            (e) => {
                                e.preventDefault();
                                setLoadingSubmit(true);
                                const formData = new FormData(e.target);
                                const t = {};
                                formData.forEach((value, key) => {
                                    t[key] = value;
                                })
                                let diaryNo = t.diary_no;
                                if (diaryNo.length > 0) {
                                    let isTaken = false;
                                    CUSTOMERS.forEach((customer) => {
                                        if (customer.diaryNumber == diaryNo) {
                                            isTaken = true;
                                        }
                                    });
                                    if (isTaken) {
                                        alert("Diary Number already taken");
                                        setLoadingSubmit(false);
                                        return;
                                    }
                                }
                                let data = JSON.stringify({
                                    "name": t.name,
                                    "phone_no": t.phone,
                                    "address": t.address,
                                    "gas": noGas ? [] : gasIdList,
                                    "diaryNumber": t.diary_no,
                                    "aadhar_card_no": t.aadhar_card_no,
                                    "accessories": noAccessory ? [] : accessoryList
                                });
                                const token = sessionStorage.getItem("authToken");
                                let config = {
                                    method: 'post',
                                    maxBodyLength: Infinity,
                                    url: URL + 'api/createCustomer',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`,
                                    },
                                    data: data
                                };

                                axios.request(config)
                                    .then((response) => {
                                        if (response.data.success == true) {
                                            dispatch(fetchCustomerData());
                                            setOpenNewConnection(false);
                                            setLoadingSubmit(false);
                                        } else {
                                            alert("Error Adding Customer");
                                            setLoadingSubmit(false);
                                        }
                                    })
                                    .catch((error) => {
                                        alert("Error Adding Customer");
                                        console.log(error);
                                        setLoadingSubmit(false);
                                    });

                            }
                        }
                    >
                        <Stack spacing={2} direction={"column"}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input placeholder="Name" name="name" required/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Phone Number</FormLabel>
                                <Input
                                    placeholder="Phone"
                                    name="phone"
                                    required
                                    type="tel"
                                    onChange={(e) => {
                                        if (e.target.value.startsWith('+')) {
                                            e.target.value = e.target.value.substring(1);
                                        }
                                        const value = e.target.value;
                                        const sanitized = value.replace(/[^\d+]/g, '');
                                        e.target.value = sanitized;
                                    }}
                                    onBlur={(e) => {
                                        const value = e.target.value.trim();
                                        const patterns = [
                                            /^\+91\d{10}$/,
                                            /^91\d{10}$/,
                                            /^\d{10}$/
                                        ];
                                        const isValid = patterns.some(pattern => pattern.test(value));
                                        if (!isValid && value.length > 0) {
                                            alert('Phone number must be in one of these formats:\n+919876543210 (13 digits)\n919876543210 (12 digits)\n9876543210 (10 digits)');
                                        }
                                    }}
                                    pattern="^(\+91\d{10}|91\d{10}|\d{10})$"
                                    title="Phone number must be: +919876543210 or 919876543210 or 9876543210"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input placeholder="Address" name="address" required/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Aadhar Card No.</FormLabel>
                                <Input placeholder="Aadhar Card No." type="number" name="aadhar_card_no"/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Diary No.</FormLabel>
                                <Input placeholder="Diary No." type="number" name="diary_no"/>
                            </FormControl>
                            {
                                !noGas ? (<>
                                    <FormLabel className={noGas ? "opacity-50" : ""}>Gas List</FormLabel>
                                    <List className={noGas ? "hidden" : "block"}>
                                        {gasIdList.map((item, index) => {
                                            const gas = gasList.find((gas) => gas.id === item.id);
                                            return <ListItem
                                                key={"gas_sel_" + index}
                                                className="border-2 rounded-lg flex mt-1"
                                            >
                                                <ListItemContent className="font-bold flex-grow">
                                                    {gas.company_name} : {gas.kg}KG : {item.qty} QTY : Price
                                                    ₹{item.price} :
                                                    TOTAL ₹{item.qty * item.price}
                                                </ListItemContent>
                                                <Box
                                                    className="flex justify-end p-1 rounded-lg hover:bg-[#CC2B52] hover:text-white"
                                                    onClick={() => {
                                                        removeGasItem(index)
                                                    }}
                                                ><CgClose/></Box>
                                            </ListItem>
                                        })
                                        }
                                    </List>
                                    <Stack direction={"row"} gap={1} className={noGas ? "hidden" : "flex"}>
                                        <Select className="flex-grow"
                                                placeholder="Select Gas"
                                                onChange={(event, value) => {
                                                    tempSelectedId = value
                                                }}
                                        >
                                            {
                                                gasList.map((item) => {
                                                    if (gasIdList.find((gas) => gas.id === item.id)) {
                                                        return null;
                                                    }
                                                    return <Option key={item.id}
                                                                   value={item.id}>{item.company_name} : {item.kg}KG</Option>
                                                })
                                            }
                                        </Select>
                                        <Input type="number" placeholder="Quantity" name="qty" defaultValue={tempQty}
                                               onChange={(e) => {
                                                   tempQty = Number(e.target.value)
                                               }}
                                               startDecorator={<Typography>Quantity : </Typography>}
                                        />
                                        <Input type="number" placeholder="Price" name="price" defaultValue={tempPrice}
                                               onChange={(e) => {
                                                   tempPrice = Number(e.target.value)
                                               }}
                                               startDecorator={<Typography>Price : </Typography>}
                                        />
                                        <Button
                                            onClick={() => {
                                                addGasIdList(tempSelectedId, tempQty, tempPrice)
                                            }}
                                        >Add Gas</Button>
                                    </Stack>
                                </>) : null
                            }
                            {
                                !noAccessory ? (<>
                                    <FormLabel className={noAccessory ? "opacity-50" : ""}>Accessory List</FormLabel>
                                    <List className={noAccessory ? "hidden" : "block"}>
                                        {accessoryList.map((item, index) => {
                                            return <ListItem
                                                key={"accessory_" + index}
                                                className="border-2 rounded-lg flex mt-1"
                                            >
                                                <ListItemContent className="font-bold flex-grow">
                                                    {item.accessory} : ₹{item.price}
                                                </ListItemContent>
                                                <Box
                                                    className="flex justify-end p-1 rounded-lg hover:bg-[#CC2B52] hover:text-white"
                                                    onClick={() => {
                                                        removeAccessory(index)
                                                    }}
                                                ><CgClose/></Box>
                                            </ListItem>
                                        })
                                        }
                                    </List>
                                    <Stack direction={"row"} gap={1} className={noAccessory ? "hidden" : "flex"}>
                                        <Input className="flex-grow" placeholder="Accessory" value={accessory}
                                               onChange={(e) => {
                                                   setAccessory(e.target.value)
                                               }}
                                        />
                                        <Input className="flex-[0.1]" placeholder="Price" type="number" value={price}
                                               onChange={(e) => {
                                                   setPrice(e.target.value)
                                               }}
                                        />
                                        <Button
                                            onClick={() => {
                                                addAccessory(accessory, price)
                                            }}
                                        >Add Accessory</Button>
                                    </Stack>
                                </>) : null
                            }
                            <Divider className="opacity-0 m-2"/>
                            <Stack direction={"row"} gap={1}>
                                <Stack
                                    gap={1}
                                    direction={"row"}
                                >
                                    <Checkbox
                                        label=""
                                        size="lg"
                                        checked={noGas}
                                        onChange={(e) => {
                                            setNoGas(e.target.checked);
                                        }}
                                    />
                                    <span className="font-bold text-black min-w-full md:min-w-auto whitespace-nowrap">
                                                  No Gas :
                                             </span>

                                </Stack>
                                <Stack
                                    gap={1}
                                    direction={"row"}
                                >
                                    <Checkbox
                                        label=""
                                        size="lg"
                                        checked={noAccessory}
                                        onChange={(e) => {
                                            setNoAccessory(e.target.checked);
                                        }}
                                    />
                                    <span
                                        className="font-bold text-black min-w-full md:min-w-auto whitespace-nowrap">
                                                       No Accessory :
                                                  </span>
                                </Stack>
                            </Stack>
                            <Divider className="opacity-0 m-2"/>
                            {
                                loadingSubmit ? <LinearProgress/> : <>
                                    <Button type="submit"
                                    >Add Customer</Button>
                                </>
                            }
                        </Stack>
                    </form>
                </Sheet>
            </Container>
        </Modal>
    }
    let tempQty = 1
    let tempPrice = 0
    let tempSelectedId = 0
    let new_connection = null
    try {
        tempSelectedId = gasList[0].id
        if (connection.data.new_connection) {
            new_connection = connection.data.new_connection
        }
    } catch (e) {
    }
    return (
        <div className="w-full h-full overflow-auto p-2.5 bg-[#f5f5f5] rounded-2xl">
            <NewConnectionForm/>
            <Stack direction="row" mb={1} spacing={1} justifyContent="flex-end"
                   className="flex flex-row mb-1 space-x-2 justify-end">
                <Button
                    onClick={() => setOpenNewConnection(true)}
                    startDecorator={<TbHomePlus/>}
                    className="flex items-center"
                >
                    New Customer
                </Button>
                <div className="flex-grow"/>
                <Typography
                    variant="h4"
                    className="flex items-center"
                >
                    Sort By
                </Typography>
                <Select defaultValue={BALANCE_SORT} className="min-w-[120px]">
                    <Option value={BALANCE_SORT} onClick={() => setSortBy(BALANCE_SORT)}>Balance</Option>
                    <Option value={CUSTOMER_NAME_SORT} onClick={() => setSortBy(CUSTOMER_NAME_SORT)}>Customer
                        Name</Option>
                    <Option value={ADDRESS_SORT} onClick={() => setSortBy(ADDRESS_SORT)}>Address</Option>
                    <Option value={DIARY_SORT} onClick={() => setSortBy(DIARY_SORT)}>Diary No.</Option>
                </Select>
                <Typography
                    variant="h4"
                    className="flex items-center"
                >
                    Search Customer
                </Typography>
                <Input
                    placeholder="Name"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="min-w-[180px]"
                />
                <Button startDecorator={<BsSearch/>} className="flex items-center">Search</Button>
            </Stack>
            <>
                <Modal
                    open={customerDetailsModel}
                    onClose={() => setCustomerDetailsModel(false)}
                    title="All Data"
                    className="flex flex-col justify-center items-center gap-2.5"
                >
                    <Container>
                        <Sheet className="p-5 rounded-xl bg-white shadow-lg overflow-auto h-[80vh]">
                            <ModalClose variant="outlined"/>
                            <Typography>All Data</Typography>
                            <Divider className="opacity-0 p-2"/>
                            <List>
                                {
                                    connection.isLoading ? <LinearProgress/> : <>
                                        <ListItem>
                                            <ListItemContent>
                                                <Stack direction={"row"} spacing={1} alignItems="center"
                                                       justifyContent="flex-start">
                                                    <pre>Name</pre>
                                                    :
                                                    <pre>{selectedCustomer ? selectedCustomer.name : ''}</pre>
                                                </Stack>
                                            </ListItemContent>
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemContent>
                                                <Stack direction={"row"} spacing={1} alignItems="center"
                                                       justifyContent="flex-start">
                                                    <pre>Address</pre>
                                                    :
                                                    <pre>{selectedCustomer ? selectedCustomer.address : ""}</pre>
                                                </Stack>
                                            </ListItemContent>
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemContent>
                                                <Stack direction={"row"} spacing={1} alignItems="center"
                                                       justifyContent="flex-start">
                                                    <pre>Phone Number</pre>
                                                    :
                                                    <pre>{selectedCustomer ? selectedCustomer.phone_no : ""}</pre>
                                                </Stack>
                                            </ListItemContent>
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemContent>
                                                <Stack direction={"row"} spacing={1} alignItems="center"
                                                       justifyContent="flex-start">
                                                    <pre>Aadhar Card Number</pre>
                                                    <UpdateCustomerCell
                                                        userId={(selectedCustomer != null) ? selectedCustomer.user_id : null}
                                                        custId={(selectedCustomer != null) ? selectedCustomer.user_id : null}
                                                        updateUser={false}
                                                        key="aadhar_card_no"
                                                        name="aadhar_card_no"
                                                        type={NUMBER}
                                                        text={(selectedCustomer != null) ? (selectedCustomer.aadhar_card_no ? selectedCustomer.aadhar_card_no : 0) : 0}
                                                        value={(selectedCustomer != null) ? (selectedCustomer.aadhar_card_no ? selectedCustomer.aadhar_card_no : 0) : 0}
                                                        table={UPDATE_CUSTOMER}
                                                    />
                                                </Stack>
                                            </ListItemContent>
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemContent>
                                                <Stack direction={"row"} spacing={1} alignItems="center"
                                                       justifyContent="flex-start">
                                                    <pre>Diary Number</pre>
                                                    :
                                                    <pre>{selectedCustomer ? selectedCustomer.diaryNumber : ""}</pre>
                                                </Stack>
                                            </ListItemContent>
                                        </ListItem>
                                        <Divider/>
                                    </>
                                }
                            </List>
                        </Sheet>
                    </Container>
                </Modal>
            </>
            {
                isCustomerPaymentsUpdateOrCreateLoading ? <LinearProgress/> : <></>
            }
            <DataTable
                thead={[
                    <TableHead key={"all_data"}><FaInfoCircle/></TableHead>,
                    <TableHead key={"diary_no"}>Diary No.</TableHead>,
                    <TableHead key={"name"}>Name</TableHead>,
                    <TableHead key={"address"}>Address</TableHead>,
                    <TableHead key={"phone_no"}>Phone No.</TableHead>,
                    <TableHead key={"balance"}>Balance</TableHead>,
                    <TableHead key={"history"}>History</TableHead>,
                    <TableHead key={"delete"}>Delete</TableHead>
                ]}
                tbody={data}
                loading={customerData.isLoading || updateCustomer.isSuccessful}
            />
        </div>
    );
};

export default ViewCustomer;

function makeRow(data, onAllDataClick, onDelete) {
    //console.log("Making Row");
    return [
        <AllData
            key="all_data"
            data={data}
            onClick={onAllDataClick}
        />,
        <UpdateCustomerCell
            userId={data.user_id}
            custId={data.id}
            updateUser={false}
            key="diaryNumber"
            name="diaryNumber"
            type={NUMBER}
            text={data.diaryNumber ? data.diaryNumber : 0}
            value={data.diaryNumber ? data.diaryNumber : 0}
            table={UPDATE_CUSTOMER}
        />,
        <UpdateCustomerCell
            userId={data.user_id}
            custId={data.id}
            updateUser={true}
            key="name"
            name="name"
            type={TEXT}
            text={data.name}
            value={data.name}
            table={UPDATE_USER}
        />,
        <UpdateCustomerCell
            userId={data.user_id}
            custId={data.id}
            updateUser={true}
            key="address"
            name="address"
            type={TEXT}
            text={data.address}
            value={data.address}
            table={UPDATE_USER}
        />,
        <UpdateCustomerCell
            userId={data.user_id}
            custId={data.id}
            updateUser={true}
            key="phone_no"
            name="phone_no"
            type={NUMBER}
            text={data.phone_no}
            value={data.phone_no}
            table={UPDATE_USER}
        />,
        <Balance data={data}/>,
        <Box
            key="chb"
            className="p-0 m-0 bg-transparent mx-0.5 transition-colors hover:bg-[rgba(75,112,245,0.25)] pl-1"
        >
            <Button
                className="flex-grow w-full h-full m-0 p-0 rounded-none bg-transparent whitespace-nowrap text-center text-[#185ea5] justify-start"
                onClick={() => {
                    setSessionVal("customerId", data.id);
                    setSessionVal("deliveryBoyId", null);
                    window.location.href = `/admin/#/admin/deliveryHistory/?customerId=0`;
                }}
            >History</Button>
        </Box>,
        <Box
            key="deleb"
            className="p-0 m-0 bg-transparent mx-0.5 transition-colors hover:bg-[rgba(75,112,245,0.25)] pl-1"
        >
            <Button
                variant={"outlined"}
                color="danger"
                className="flex-grow w-full h-full m-0 p-0 rounded-none bg-transparent whitespace-nowrap text-center justify-start"
                onClick={() => {
                    const remove = prompt("Delete Customer?, Type 'yes' to delete")
                    const yes = remove === "yes"
                    if (yes) {
                        onDelete(data.user_id)
                    }
                }}
            >
                <RiDeleteBin2Fill/>
            </Button>
        </Box>
    ];
}

function AllData({data, onClick}) {
    return <Box
        key="chb"
        className="p-0 m-0 bg-transparent mx-0.5 transition-colors hover:bg-[rgba(75,112,245,0.25)]"
    >
        <Button
            sx={{
                backgroundColor: "transparent",
                border: "none",
                color: "black",
                '&:hover': {
                    color: "white"
                },
            }}
            onClick={() => {
                onClick(data.id);
            }}
        >
            <FaInfoCircle/>
        </Button>
    </Box>
}

function Balance({data}) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [amount, setAmount] = useState(0);
    if (showModal) {
        return (
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                title="Balance"
                className="flex flex-col justify-center items-center gap-2.5"
            >
                <Sheet className="p-5 rounded-xl bg-white shadow-lg overflow-auto">
                    <Stack
                        direction={"column"}
                        spacing={1}
                        alignItems="start"
                        justifyContent="flex-start">
                        <ModalClose variant="outlined"/>
                        <Typography className="text-black font-bold">Adjust Balance</Typography>
                        <Divider className="mb-10"/>
                        <span className="text-black font-bold">Balance</span>
                        <pre className="text-black font-bold">{decimalFix(data.totalBalance, true)}</pre>
                        <span className="text-black font-bold">Outstanding Balance</span>
                        <Input
                            size="sm"
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                            placeholder="Enter Amount"
                            className="text-black font-bold"
                            value={amount}
                            onChange={(e) => {
                                const num = e.target.value.replace(/[^\d\-\.]/g, "");
                                setAmount(num);
                            }}
                        />
                        <Divider className="mb-10"/>
                        <Stack direction={"row"} gap={1} className="flex w-full justify-end">
                            <Button
                                onClick={() => {
                                    setShowModal(false);
                                }}
                                variant="outlined"
                            >
                                Close
                            </Button>
                            <Button
                                onClick={() => {
                                    let amt = Number(amount);
                                    amt = amt * -1;
                                    dispatch(
                                        adjustBalance({
                                            customerId: data.id,
                                            amount: amt * -1,
                                            oldAmount: data.totalBalance,
                                        })
                                    );
                                    setShowModal(false);
                                }}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </Sheet>
            </Modal>
        )
    }
    return <div className="flex justify-center items-center">
        <Button
            variant="plain"
            color="success"
            className="text-black"
            onClick={() => {
                setShowModal(true);
            }}
        >
            {decimalFix(data.totalBalance, true)}
        </Button>
    </div>
}