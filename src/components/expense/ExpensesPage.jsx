import React, {useEffect} from "react";
import {Box, LinearProgress, Option, Select, Stack, Table} from "@mui/joy";
import {useDispatch, useSelector} from "react-redux";
import {fetchExpences} from "../../redux/actions/expencesActions.js";
import {fetchUser} from "../../redux/actions/userActions.js";
import {formatDateToDDMMYY_HHMM, titleCase} from "../../Tools.jsx";

export default function ExpensesPage() {
    const dispatch = useDispatch();

    const {userDataLoading, users} = useSelector((state) => state.user);
    const expence = useSelector((state) => state.expence);
    const [expenseType, setExpenseType] = React.useState('all');
    //console.log(users)
    useEffect(() => {
        if ((expence.expenses === null) && !expence.expenceLoading) {
            dispatch(fetchExpences());
        }
        if (!userDataLoading && !users) {
            dispatch(fetchUser());
        }
    },);
    let rows = [];
    //let courierNames = {};
    rows = expence?.expenses?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((expense) => {
        const courierId = expense.user_id;
        const courierName = users.find((user) => user.courier_boys[0]?.id === courierId)?.name
        return (
            <tr key={`${expense.id}-expns`} className="bg-white">
                <td className="bg-white w-46">{formatDateToDDMMYY_HHMM(expense.created_at)}</td>
                <td className="w-64">{titleCase(courierName)}</td>
                <td>{titleCase(expense.reason)}</td>
                <td className="w-46">₹{expense.amount}</td>
            </tr>
        );
    });
    return (<Stack
        direction="column"
        className="grow h-full w-full p-2 rounded-t-lg"
    >
        <Stack direction="row" gap={1} p={1} className="w-full bg-white" alignItems="center">
            <span className="font-bold text-black">Expenses Type :</span>
            <Select
                placeholder="Select Expense Type"
                className="!text-black"
                defaultValue={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
            >
                <Option value="all">All Expenses</Option>
                <Option value="office">Office Expenses</Option>
                <Option value="expense">Expenses</Option>
            </Select>
        </Stack>
        {
            (expence.expenceLoading || userDataLoading) ?
                <Box sx={{width: "100%", height: "6px"}}><LinearProgress
                    sx={{width: "100%", height: "6px"}}/></Box> : <></>
        }
        <Table
            borderAxis="both"
            size="md"
            variant="outlined"
            color="neutral"
            stripe="odd"
            stickyFooter
            stickyHeader
            sx={{
                width: "100%",
                tableLayout: "auto",
                '& th, & td': {color: 'black !important', fontWeight: 'bold !important'},
            }}
            className="!text-black"
        >
            <thead>
            <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Description</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
            <tfoot>
            <tr>
                <th colSpan={3}></th>
                <th>
                    Total : ₹{expence.expenses?.reduce((total, exp) => total + parseFloat(exp.amount), 0)}
                </th>
            </tr>
            </tfoot>
        </Table>
    </Stack>)
}