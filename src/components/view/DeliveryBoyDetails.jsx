import {
    Button,
    Container,
    Divider,
    IconButton,
    Input,
    LinearProgress,
    Modal,
    ModalClose,
    Sheet,
    Stack,
    Table,
    Typography
} from "@mui/joy";

import axios from "axios";

import {useDispatch, useSelector} from "react-redux";
import {fetchGetData} from "../../state/GetData.jsx";
import React, {useEffect, useState} from "react";
import {GET_COURIER_BOY_DATA, URL as API} from "../../services/Api.jsx";
import {Link} from "react-router-dom";
import {setSessionVal, updateUrlParams} from "../../Tools.jsx";
import {loginUpdatedReset, updateLoginData} from "../../redux/authSlice.js";
import {FaCheck} from "react-icons/fa";

export default function DeliveryBoyDetails() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.getData);

    const update = useSelector((state) => state.updateCustomer);

    const loading = useSelector((state) => state.loginV2.isLoading);
    const updated = useSelector((state) => state.loginV2.updated);

    const [show, setShow] = useState(false);

    const rows = [];
    const deliveryBoyData = []

    const [startDate, setStartDate] = React.useState(() => {
        const firstDateOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

        const year = firstDateOfCurrentMonth.getFullYear();
        const month = String(firstDateOfCurrentMonth.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(firstDateOfCurrentMonth.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    });
    //update url params
    // updateUrlParams({
    //      "startDate": startDate
    // });
    // updateUrlParams({
    //      startDate
    // });

    const [endDate, setEndDate] = React.useState(() => {
        const lastDateOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        const year = lastDateOfCurrentMonth.getFullYear();
        const month = String(lastDateOfCurrentMonth.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(lastDateOfCurrentMonth.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    });
    // updateUrlParams({
    //      endDate
    // });
    //console.log(startDate, endDate)

    //UPDATE URL
    let url = window.location.href;
    url = url.split("?")[0];
    url = url + `?&start_date=${startDate}&end_date=${endDate}`;
    window.location.href = url;

    let GET_COURIER_BOY_DATA_URL = "";
    GET_COURIER_BOY_DATA_URL = GET_COURIER_BOY_DATA + "?" + new URLSearchParams({
        startDate: startDate,
        endDate: endDate,
    }).toString();
    if (data.data !== null) {
        if (data.data.length > 0 && stripUrlParams(data.url) == stripUrlParams(GET_COURIER_BOY_DATA)) {
            data.data.forEach((item) => {
                if (item.login == null) {
                    return;
                }
                //console.log(item);
                rows.push(makeRow(item, item.expenses_sum_amount, show));
                deliveryBoyData.push(item);
            });
        }
    }
    const get = () => {
        //console.log(GET_COURIER_BOY_DATA_URL);
        dispatch(fetchGetData(GET_COURIER_BOY_DATA_URL))
    }
    if (updated) {
        get();
        dispatch(loginUpdatedReset());
    }
    useEffect(() => {

        if (data.data == null || new URL(data.url).pathname != new URL(GET_COURIER_BOY_DATA_URL).pathname) {
            //console.log("fetch");
            dispatch(fetchGetData(GET_COURIER_BOY_DATA_URL))
        }

        //console.log("useEffect");
        if (update.isSuccessful) {
            //console.log("update");
            dispatch(fetchGetData(GET_COURIER_BOY_DATA_URL));
        }
        //dispatch(fetchGetData(GET_COURIER_BOY_DATA));

        // console.log(update);
    },); // Add an empty dependency array here

    //console.log(show);

    const NewBoy = () => {
        const [open, setOpen] = useState(false);
        if (!open) {
            return (
                <Button sx={
                    {
                        mb: 1
                    }
                }
                        onClick={() => setOpen(true)}
                >New Delivery Boy</Button>
            )
        }
        return (
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="New Connection"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                }
                }
            >
                <Container maxWidth={"xs"}>
                    <Sheet
                        sx={{
                            padding: "20px",
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                            boxShadow: "0px 0px 10px 0px #0000001a",
                        }}
                    >
                        <ModalClose variant="outlined"/>
                        <Typography>New Delivery Boy</Typography>
                        <Divider sx={{
                            p: 1,
                            opacity: 0,
                        }}/>
                        <form
                            //hande submit
                            onSubmit={
                                (e) => {
                                    e.preventDefault();
                                    //get the form data in json format
                                    const formData = new FormData(e.target);
                                    const t = {};
                                    formData.forEach((value, key) => {
                                        t[key] = value;
                                    })
                                    console.log(t)

                                    let data = JSON.stringify({
                                        "name": t.name,
                                        "username": t.username,
                                        "password": t.password,
                                        "phone": t.phone,
                                    });

                                    //console.log(data);

                                    // return;

                                    const token = sessionStorage.getItem("authToken");

                                    let config = {
                                        method: 'post',
                                        maxBodyLength: Infinity,
                                        url: API + 'api/createDeliveryBoy',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`,
                                        },
                                        data: data
                                    };
                                    setOpen(false);
                                    axios.request(config)
                                        .then((response) => {
                                            console.log(response.data);
                                            dispatch(fetchGetData(GET_COURIER_BOY_DATA_URL))
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });

                                }
                            }
                        >
                            <Stack spacing={2}
                                   direction={"column"}
                            >
                                <Input placeholder="Full Name" name="name" required/>
                                <Input placeholder="Phone Number" name="phone" required/>
                                <Input placeholder="User Name" name="username" required/>
                                <Input placeholder="Password" name="password" required/>
                                <Button type="submit"
                                >Add</Button>
                            </Stack>
                        </form>
                    </Sheet>
                </Container>
            </Modal>
        )
    }

    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                overflow: "auto",
                padding: "10px",
                backgroundColor: 'white',
                borderRadius: '10px',
            }}
        >
            <Stack direction="row" mb={1} spacing={1} justifyContent="flex-end">
                <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <span style={{fontWeight: "bold", color: "black"}}>Date&nbsp;Start&nbsp;:&nbsp;</span>
                    <Input type="date" sx={{width: "100%"}}
                           onChange={(event) => {
                               //update url params
                               updateUrlParams({
                                   "startDate": event.target.value
                               });
                               setStartDate(event.target.value);
                           }}
                           defaultValue={startDate}
                    />
                </Stack>
                <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"} mr={2}>
                    <span style={{fontWeight: "bold", color: "black"}}>Date&nbsp;End&nbsp;:&nbsp;</span>
                    <Input type="date" sx={{width: "100%"}}
                           onChange={(event) => {
                               //update url params
                               updateUrlParams({
                                   "endDate": event.target.value
                               });
                               setEndDate(event.target.value)
                           }}
                           defaultValue={endDate}
                    />
                </Stack>
                <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"} mr={2}>
                    <Button
                        onClick={
                            () => {
                                get()
                            }
                        }
                    >OK</Button>
                </Stack>
                <Divider sx={{flexGrow: 1, opacity: 0}}/>
                <NewBoy/>
            </Stack>
            <div style={{display: (data.isLoading || loading) ? "block" : "none"}}>
                <LinearProgress color="primary" variant="soft"/>
            </div>
            <Table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th
                        onMouseDown={() => {
                            setShow(true);
                        }}
                        onMouseUp={() => {
                            setShow(false);
                        }}
                        onMouseLeave={() => {
                            setShow(false);
                        }}
                    >
                        Number
                    </th>
                    <th colSpan={3}>Expense : <i>{getCurrentMonthString()}</i></th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, index) => (
                            <td key={index}>{cell}</td>
                        ))}
                        {

                            <td>
                                <Link
                                    to={"/admin/expence?user_id=" + deliveryBoyData[index].id + "&user_name=" + deliveryBoyData[index].username + "&start_date=" + startDate + "&end_date=" + endDate}
                                >
                                    <Button
                                        variant="soft"
                                        color="success"
                                        sx={{
                                            width: '100%',
                                        }}
                                    >
                                        View Expenses
                                    </Button>
                                </Link>
                            </td>
                        }
                        {
                            <td>
                                {/*<Link*/}
                                {/*    to={`/admin/deliveryHistory?deliverBoyId=${deliveryBoyData[index].id}`}*/}
                                {/*>*/}
                                <Button
                                    variant="soft"
                                    color="warning"
                                    sx={{
                                        width: '100%',
                                    }}
                                    onClick={() => {
                                        setSessionVal("customerId", null);
                                        setSessionVal("deliveryBoyId", deliveryBoyData[index].id);
                                        window.location.href = `/admin/#/admin/deliveryHistory/?deliverBoyId=0`;
                                    }}
                                >
                                    View Deliveries
                                </Button>
                                {/*</Link>*/}
                            </td>
                        }
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

function makeRow(item, expense, show) {
    let number = item.login.phone;
    if (show) {
        number = item.login.phone + `[${item.otp?.otp}]`
    }
    //console.log(number);
    const dispatch = useDispatch();
    return [
        <UpdateLoginInfo
            value={item.login.username}
            onUpdate={(val) => {
                dispatch(
                    updateLoginData({
                        username: val,
                        id: item.login.id,
                    })
                )
            }}
        />,
        <UpdateLoginInfo
            value={item.login.password}
            onUpdate={(val) => {
                dispatch(
                    updateLoginData({
                        password: val,
                        id: item.login.id,
                    })
                )
            }}
        />,
        <UpdateLoginInfo
            value={number}
            onUpdate={(val) => {
                dispatch(
                    updateLoginData({
                        phone: val,
                        id: item.login.id,
                    })
                )
            }}
        />,
        //item.username,
        // <UpdateCustomerCell
        //      updateUser={false}
        //      key={item.id}
        //      userId={item.userId}
        //      custId={item.id}
        //      text={item.password}
        //      value={item.password}
        //      table={UPDATE_COURIER_BOY}
        //      type={TEXT}
        //      name='password'
        // />,
        // item.login.username,
        <span
            style={{
                fontSize: '1.2em',
                fontWeight: 'bold',
            }}
        >₹{expense}</span>,
        //item.password,
        // item.expense,
        // item.truck,
    ];
}

function combineData(data, user_data) {
    let result = [];
    data.forEach((item) => {
        let user = user_data.find((element) => element.id === item.user_id);
        result.push({...item, ...user});
    });
    return result;
}

function getCurrentMonthString() {
    //return current month string like january, february etc
    let month = new Date().getMonth();
    let monthString = "";
    switch (month) {
        case 0:
            monthString = "January";
            break;
        case 1:
            monthString = "February";
            break;
        case 2:
            monthString = "March";
            break;
        case 3:
            monthString = "April";
            break;
        case 4:
            monthString = "May";
            break;
        case 5:
            monthString = "June";
            break;
        case 6:
            monthString = "July";
            break;
        case 7:
            monthString = "August";
            break;
        case 8:
            monthString = "September";
            break;
        case 9:
            monthString = "October";
            break;
        case 10:
            monthString = "November";
            break;
        case 11:
            monthString = "December";
            break;
    }
    return monthString;
}

function stripUrlParams(url) {
    let urlObj = new URL(url);
    //remove all params
    urlObj.search = "";
    return urlObj.toString();
}

const UpdateLoginInfo = ({
                             value,
                             onUpdate,
                         }) => {
    const [val, setVal] = useState(value);
    const [sent, setSent] = useState(false);
    return <>
        <Input
            type="text"
            value={val}
            onChange={(e) => {
                setVal(e.target.value);
            }}
            onBlur={(e) => {
                if (val != value) {
                    let ok = confirm(`Update ${value} to ${val} ?`);
                    if (ok && !sent) {
                        onUpdate(val);
                    } else {
                        setVal(value);
                    }
                }
            }}
            sx={{
                //remove the border
                border: "none",

            }}
            endDecorator={
                (val != value) && (<IconButton
                    onClick={() => {
                        setSent(true);
                    }}
                    sx={{
                        ml: 1,
                        "&:hover": {
                            backgroundColor: "rgb(75 112 245 / 25%)",
                        },
                    }}
                >
                    <FaCheck/>
                </IconButton>)
            }
        />
    </>
};