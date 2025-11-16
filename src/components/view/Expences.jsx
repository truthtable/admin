import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {fetchExpences, updateExpence} from '../../redux/actions/expencesActions';
import {
    Box,
    Button,
    DialogContent,
    DialogTitle,
    Divider,
    Input,
    LinearProgress,
    List,
    ListItem,
    Modal,
    ModalDialog,
    Radio,
    RadioGroup,
    Stack,
    Switch,
    Table
} from '@mui/joy';
import {FcDown} from 'react-icons/fc';
import gasServices from '../../services/gas-services';
import {titleCase, toNumber} from "../../Tools.jsx";
import ModalClose from "@mui/joy/ModalClose";

export default function Expences() {
    //get user_id from url
    //
    const currentUrl = window.location.href;
    const hashIndex = currentUrl.indexOf('#');
    const hashPart = currentUrl.substring(hashIndex + 1);
    const url = new URL(hashPart, window.location.origin);
    const searchParams = new URLSearchParams(url.search);
    const USER_ID = searchParams.get('user_id');
    const USER_NAME = searchParams.get('user_name');
    const START_DATE = searchParams.get('start_date');
    const END_DATE = searchParams.get('end_date');
    //console.log(USER_ID);
    //

    //
    const storedReversed = JSON.parse(localStorage?.storedReversed || 'false');
    const [reversed, setReversed] = React.useState(storedReversed);
    const storeReversed = (value) => {
        localStorage.storedReversed = value
        setReversed(value)
    }

    const [startDate, setStartDate] = React.useState(() => {
        if (START_DATE) {
            return START_DATE;
        } else {
            const firstDateOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

            const year = firstDateOfCurrentMonth.getFullYear();
            const month = String(firstDateOfCurrentMonth.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const day = String(firstDateOfCurrentMonth.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
        }
    });
    //console.log(startDate)
    const [endDate, setEndDate] = React.useState(() => {
        if (END_DATE) {
            return END_DATE;
        } else {
            const lastDateOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

            const year = lastDateOfCurrentMonth.getFullYear();
            const month = String(lastDateOfCurrentMonth.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const day = String(lastDateOfCurrentMonth.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
        }
    });
    //

    const dispatch = useDispatch();
    const {
        expenses,
        expenceLoading,
        expenceError,
    } = useSelector((state) => state.expence);

    //console.log({expenses, expenceLoading, expenceError});

    const totalExpences = (expenses) ? expenses
        .filter((expence) => toNumber(expence.user_id) == toNumber(USER_ID))
        .filter((expence) => {
            // Filter by date range
            const expenceDate = new Date(expence.created_at);
            const start = new Date(startDate);
            const end = new Date(endDate);
            // Set time to the end of the day for end date
            end.setHours(23, 59, 59, 999);
            return expenceDate >= start && expenceDate <= end;
        })
        .reduce((acc, expence) => acc + expence.amount, 0) : 0;
    //console.log(totalExpences);
    //console.log(expenses);
    let onlySelectedDeliveryBoy = (expenses) ? expenses
            .filter((expence) => toNumber(expence.user_id) == toNumber(USER_ID))
            .filter((expence) => {
                // Filter by date range
                const expenceDate = new Date(expence.created_at);
                const start = new Date(startDate);
                const end = new Date(endDate);
                // Set time to the end of the day for end date
                end.setHours(23, 59, 59, 999);
                return expenceDate >= start && expenceDate <= end;
            })
            .sort((expenceA, expenceB) => {
                const dateA = new Date(expenceA.created_at);
                const dateB = new Date(expenceB.created_at);
                if (reversed) {
                    return dateB - dateA; // For descending order
                } else {
                    return dateA - dateB; // For ascending order
                }
            })
        : null;

    const get = () => {
        dispatch(fetchExpences({
            user_id: USER_ID,
            startDate,
            endDate
        }));
    }

    useEffect(() => {
        get()
    }, [startDate,
        endDate]);


    useEffect(() => {
        gasServices.listenDataChange(() => {
            if (
                !expenceLoading
            ) {
                //console.log("fetching...");
                get();
            }
        });
    }, []);

    document.title = titleCase(`Expences | ${USER_NAME}`)

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                height: '100%',
            }}
        >
            <Stack
                direction={"row"}
                gap={1}
                alignItems="center"
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 28,
                        ml: 1,
                        transform: 'rotate(90deg)',
                        padding: 1,
                        borderWidth: 2,
                        borderRadius: "md",
                        '&:hover': {
                            backgroundColor: '#FFF4B7',
                        }
                    }}
                    onClick={() => {
                        window.history.back();
                    }}
                >
                    <FcDown/>
                </Box>
                <span style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "black",
                    padding: "16px",
                }}>
                         Expences | {titleCase(USER_NAME)} : <i>₹{totalExpences}</i>
                    </span>
                <Divider sx={{flexGrow: 1}}/>
                <Divider className="!bg-black opacity-35" sx={{width: "1px"}} orientation="vertical"/>
                <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <span style={{fontWeight: "bold", color: "black"}}>Reverse&nbsp;Order&nbsp;:&nbsp;</span>
                    <Switch
                        checked={reversed}
                        onChange={(event) => {
                            storeReversed(event.target.checked);
                        }}
                    />
                </Stack>
                <Divider className="!bg-black opacity-35" sx={{width: "1px"}} orientation="vertical"/>
                <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <span style={{fontWeight: "bold", color: "black"}}>Date&nbsp;Start&nbsp;:&nbsp;</span>
                    <Input type="date" sx={{width: "100%"}}
                           onChange={(event) => {
                               setStartDate(event.target.value)
                           }}
                           defaultValue={startDate}
                    />
                </Stack>
                <Divider className="!bg-black opacity-35" sx={{width: "1px"}} orientation="vertical"/>
                <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"} mr={2}>
                    <span style={{fontWeight: "bold", color: "black"}}>Date&nbsp;End&nbsp;:&nbsp;</span>
                    <Input type="date" sx={{width: "100%"}}
                           onChange={(event) => {
                               setEndDate(event.target.value)
                           }}
                           defaultValue={endDate}
                    />
                </Stack>
                <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"} mr={2}>
                    <Button
                        onClick={get}
                    >OK</Button>
                </Stack>
            </Stack>
            <LinearProgress
                sx={{
                    display: expenceLoading ? 'block' : 'none'
                }}
            />
            <Table
                sx={{
                    tableLayout: 'auto',
                }}
            >
                <thead>
                <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Reason</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {onlySelectedDeliveryBoy?.map((expence) => (
                    <tr key={expence.id}
                        style={{
                            backgroundColor: expence.error ? "#ffe8e8" : "white",
                        }}
                    >
                        <td
                            onClick={() => {
                                const value = confirm(`Mark ${
                                    expence.error ? "Correct ✔" : "Wrong ❌"
                                }`);
                                if (value) {
                                    dispatch(
                                        updateExpence({
                                            id: expence.id,
                                            error: !expence.error,
                                            phone: false
                                        })
                                    );
                                }
                            }}
                            className=" hover:!bg-blue-500 hover:!text-white"
                            style={{
                                fontWeight: "bold",
                                color: expence.error ? "red" : "white",
                                maxWidth: "30px",
                                cursor: "pointer"
                            }}>
                            {
                                expence.error ? "⚠ Correction" : "Mark Wrong"
                            }
                        </td>
                        <td style={{
                            fontWeight: "bold",
                            color: expence.error ? "red" : "black"
                        }}>{formatDate(expence.created_at)}</td>
                        <td style={{fontWeight: "bold"}}>
                            <ChangeExpenceType expence={expence}/>
                        </td>
                        <td style={{fontWeight: "bold"}}>
                            <Box
                                sx={{
                                    transition: 'all 0.3s',
                                    borderRadius: 'md',
                                    '&:hover': {
                                        backgroundColor: 'lightblue',
                                        p: 1
                                    }
                                }}
                                onClick={() => {
                                    const value = prompt("Enter reason", expence.reason);
                                    if (value) {
                                        dispatch(
                                            updateExpence({
                                                id: expence.id,
                                                reason: value,
                                                error: false,
                                                phone: false
                                            })
                                        );
                                    }
                                }}
                            ><span className='b'
                                   style={{
                                       color: expence.error ? "red" : "black"
                                   }}
                            >{titleCase(expence.reason)}</span></Box>
                        </td>
                        <td style={{fontWeight: "bold"}}>
                            <Box
                                sx={{
                                    transition: 'all 0.3s',
                                    borderRadius: 'md',
                                    '&:hover': {
                                        backgroundColor: 'lightblue',
                                        p: 1
                                    }
                                }}
                                onClick={() => {
                                    const value = prompt("Enter new amount", expence.amount);
                                    if (value) {
                                        dispatch(
                                            updateExpence({
                                                id: expence.id,
                                                amount: value,
                                                error: false,
                                                phone: false
                                            })
                                        );
                                    }
                                }}
                            ><span className='b'
                                   style={{
                                       color: expence.error ? "red" : "black"
                                   }}
                            >₹{expence.amount}</span></Box>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Box>
    )
}

const ChangeExpenceType = ({expence}) => {
    const dispatch = useDispatch();
    const [showOptions, setShowOptions] = React.useState(false);
    const [value, setValue] = React.useState(expence.expense_type);
    if (showOptions) {
        return (<>
            <Modal open={showOptions} onClose={() => setShowOptions(false)}>
                <ModalDialog>
                    <ModalClose/>
                    <DialogTitle>Modal Dialog</DialogTitle>
                    <DialogContent>
                        <Stack gap={1} direction={"column"} alignContent={"center"}>
                            <RadioGroup aria-label="Your plan" name="people" defaultValue={
                                (value === 1) ? "Office" : (value === 0) ? "Expense" : null
                            }
                                        onChange={(event) => {
                                            setValue((event.target.value === "Office") ? 1 : 0);
                                        }}
                            >
                                <List
                                    sx={{
                                        minWidth: 240,
                                        '--List-gap': '0.5rem',
                                        '--ListItem-paddingY': '1rem',
                                        '--ListItem-radius': '8px',
                                        '--ListItemDecorator-size': '32px',
                                        fontWeight: 'bold',
                                    }}
                                    className="text-bold"
                                >
                                    {['Office', 'Expense'].map((item) => (
                                        <ListItem variant="outlined" key={item} className="text-bold"
                                                  sx={{boxShadow: 'sm'}}>
                                            <Radio
                                                overlay
                                                value={item}
                                                label={item}
                                                sx={{flexGrow: 1, flexDirection: 'row-reverse'}}
                                                slotProps={{
                                                    action: ({checked}) => ({
                                                        sx: (theme) => ({
                                                            ...(checked && {
                                                                inset: -1,
                                                                border: '2px solid',
                                                                borderColor: theme.vars.palette.primary[500],
                                                            }),
                                                        }),
                                                    }),
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </RadioGroup>
                            <Stack direction={"row"} alignContent={"center"} gap={1}>
                                <Button variant="outlined" color="neutral" onClick={() => {
                                    setShowOptions(false);
                                }}>Cancel</Button>
                                <Button variant="solid" color="primary" onClick={() => {
                                    dispatch(
                                        updateExpence({
                                            id: expence.id,
                                            expense_type: value,
                                            error: false,
                                            phone: false
                                        })
                                    );
                                    setShowOptions(false);
                                }}>Save</Button>
                            </Stack>
                        </Stack>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </>)
    } else {
        return (
            <>
                <Box
                    sx={{
                        transition: 'all 0.3s',
                        borderRadius: 'md',
                        '&:hover': {
                            backgroundColor: 'lightblue',
                            p: 1
                        }
                    }}
                    onClick={() => {
                        setShowOptions(true);
                    }}
                ><span className='b'
                       style={{
                           color: expence.error ? "red" : "black"
                       }}
                >{(() => {
                    if (expence.expense_type === 1) {
                        return "Office Expense";
                    } else if (expence.expense_type === 0) {
                        return "Expense";
                    }
                })()}</span></Box>
            </>
        )
    }
}

function formatDate(date) {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const newDate = `${month}/${day}/${year}`;
    //console.log(newDate);
    return newDate;
}