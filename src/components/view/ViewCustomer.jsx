//DeliveryHistory.jsx
import React, {useEffect, useState} from "react";
import "../../crud/crud-css/read.css";
import {BsSearch,} from "react-icons/bs";
import gasDataService from "../../services/gas-services.jsx";
import DataTable from "../table/DataTable.jsx";
import {Box, Button, Input, Stack, Typography} from "@mui/joy";
import TableHead from "../table/TableHead.jsx";

import {useDispatch, useSelector} from "react-redux";
import {fetchCustomerData} from "../../state/Customers.jsx";
import UpdateCustomerCell, {NUMBER, TEXT} from "../edit/UpdateCustomerCell.jsx";
import {notNull} from "../../helpers.jsx/Validation.jsx";
import {UPDATE_CUSTOMER, UPDATE_USER} from "../../services/Api.jsx";

import {TbHomePlus} from "react-icons/tb";

const ViewCustomer = () => {

    const dispatch = useDispatch();
    const customerData = useSelector((state) => state.customers);
    const updateCustomer = useSelector((state) => state.updateCustomer);

    const [searchText, setSearchText] = useState("");

    const data = [];
    if (notNull(customerData.data)) {
        if (customerData.data.data.length > 0) {
            let temp = combineData(customerData.data.data, customerData.data.userdata);

            if (searchText.length > 0) {
                temp = temp.filter((item) => {
                    return item.user.name.toLowerCase().includes(searchText.toLowerCase());
                });
            }

            temp.forEach((item) => {
                data.push(makeRow(item));
            });

        }
    }
    useEffect(() => {
        gasDataService.listenDataChange(() => {
            console.log("Data Changed");
            dispatch(fetchCustomerData());
        });
    }, []);

    useEffect(() => {
        console.log("Update Customer", updateCustomer);
        if (updateCustomer.isSuccessful) {
            dispatch(fetchCustomerData());
        }
    });

    // if (updateCustomer.isSuccessful) {
    //      dispatch(fetchCustomerData());
    // }
    return (
        <div style={{
            width: "100%",
            overflow: "auto",
            padding: "10px",
        }}>
            <Stack direction="row" mb={1} spacing={1} justifyContent="flex-end">
                <Button startDecorator={<TbHomePlus/>}>New Connection</Button>
                <div style={{flexGrow: 1}}/>
                <Typography
                    variant="h4"
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >Search Customer</Typography>
                <Input
                    placeholder="Name"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button startDecorator={<BsSearch/>}>Search</Button>

            </Stack>
            <DataTable
                thead={[
                    <TableHead>Name</TableHead>,
                    <TableHead>Address</TableHead>,
                    <TableHead>Phone No.</TableHead>,
                    <TableHead>Balance</TableHead>,
                    <TableHead>History</TableHead>,
                ]}
                tbody={data}
                loading={customerData.isLoading}
            />
        </div>
    );
};

export default ViewCustomer;

function combineData(data, userdata) {
    return data.map((item) => {
        const user = userdata.find((user) => user.id === item.user_id);
        return {
            ...item,
            user,
        };
    });
}

function makeRow(data) {
    //console.log(data);
    return [
        <UpdateCustomerCell
            userId={data.user_id}
            custId={data.id}
            updateUser={true}
            key="name"
            name="name"
            type={TEXT}
            text={data.user.name}
            value={data.user.name}
            table={UPDATE_USER}
        />,
        <UpdateCustomerCell
            userId={data.user_id}
            custId={data.id}
            updateUser={true}
            key="address"
            name="address"
            type={TEXT}
            text={data.user.address}
            value={data.user.address}
            table={UPDATE_USER}
        />,
        <UpdateCustomerCell
            userId={data.user_id}
            custId={data.id}
            updateUser={true}
            key="phone_no"
            name="phone_no"
            type={NUMBER}
            text={data.user.phone_no}
            value={data.user.phone_no}
            table={UPDATE_USER}
        />,
        <UpdateCustomerCell
            userId={data.user_id}
            custId={data.id}
            updateUser={false}
            key="Balance"
            name="Balance"
            type={NUMBER}
            text={`${data.Balance}₹`}
            value={data.Balance}
            table={UPDATE_CUSTOMER}
        />,
        <Box
            key="chb"
            sx={{
                padding: "0px",
                margin: "0px",
                backgroundColor: "transparent",
                mx: "2px",
                transition: "background-color 0.3s",
                "&:hover": {
                    backgroundColor: "rgb(75 112 245 / 25%)",
                },
                pl: 1

            }}>
            <Button style={{
                flexGrow: 1,
                width: "100%",
                height: "100%",
                margin: "0px",
                padding: "0px",
                borderRadius: "0px",
                backgroundColor: "transparent",
                whiteSpace: "nowrap",
                textAlign: "center",
                disabled: true,
                justifyContent: "flex-start",
                color: "#185ea5",


            }}

                    onClick={() => {
                        window.location.href = `/admin/#/admin/deliveryHistory/?customerId=${data.id}`;
                    }}

            >History</Button>
        </Box>
    ];
}
