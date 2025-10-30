import React, {useEffect, useState} from "react";

import "./App.css";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Header, Home, Sidebar} from "./components";

import Warehouse from "./components/view/Warehouse.jsx";

import {ViewCustomer,} from "./crud";
import {
    Box,
    Button,
    Card,
    Chip,
    CircularProgress,
    CssVarsProvider,
    Divider,
    Input,
    LinearProgress,
    Sheet,
    Stack,
    Typography,
} from "@mui/joy";
import {useDispatch, useSelector} from "react-redux";
// import { fetchCheckLogin } from "./state/CheckLogin";
// import { getUserDataFromCookie } from "./services/Api";
import DeliveryBoyDetails from "./components/view/DeliveryBoyDetails.jsx";
import Expences from "./components/view/Expences.jsx";
import Purchase from "./components/view/Purchase.jsx";
import {Report} from "./components/view/Report.jsx";
// import DeliveryHistory from "./components/view/DeliveryHistory.jsx";
import deliveryHistory from "./components/view/DeliveryHistory.jsx";
import {FcHighPriority} from "react-icons/fc";
import {clearError, login, validateOtp} from "./redux/authSlice.js";
import {getU, removeU} from "./db/users.js";
import {FaArrowRightToBracket} from "react-icons/fa6";
import {FaUserCircle} from "react-icons/fa";
import {IoCloseSharp} from "react-icons/io5";
import GasUi from "./components/view/GasUi.jsx";
import ExpensesPage from "./components/expense/ExpensesPage.jsx";

function App() {

    //sessionStorage.setItem("authToken", "hello world");
    //sessionStorage.removeItem('authToken');
    //const token = sessionStorage.getItem("authToken");
    //console.log(token);


    const dispatch = useDispatch();

    const loginData = useSelector((state) => state.loginV2);

    const [otp, setOtp] = useState("");
    let isLogoded = sessionStorage?.getItem("authToken") !== null;
    let otpVerification = sessionStorage?.getItem("otpToken") !== null;
    //console.log(otpVerification, isLogoded)
    // ...existing code...
    //let isLogoded = loginData?.data?.loginStatus || false;

    //console.log(isLogoded);

    //get url from window.location
    const url = new URL(window.location.href);
    const urlString = url.toString();
    const isReportPath = (path) => {
        return path.toLowerCase().includes('/report');
    };
    const isReportPathValid = isReportPath(urlString);
    //console.log(isReportPathValid);

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const [us, setUs] = useState([]);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    if (loginData.isError) {
        //console.log(loginData.errorMessage);
        alert(loginData.errorMessage);
        dispatch(clearError());
        //2 sec delay
        //dispatch(validateLogin());
    }

    let username = "";
    let password = "";

    useEffect(() => {
        let mounted = true;

        const initializeData = async () => {
            try {
                if (mounted) {
                    const userData = await getU();
                    setUs(userData || []);
                }
            } catch (error) {
                console.error("Database error:", error.message);
                // Set empty array on error to maintain consistent state
                if (mounted) {
                    setUs([]);
                }
            }
        };

        initializeData();

        // Cleanup function to prevent memory leaks
        return () => {
            mounted = false;
        };
    }, []);

    const LoginUI = () => {
        return <div
            style={{
                justifyContent: "center",
                display: "flex",
            }}
        >
            <Card
                orientation="vertical"
                size="lg"
                variant="outlined"
                sx={{mt: 10}}
            >
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={2}
                >
                    <Typography level="title-lg">
                        Admin Login
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Chip
                            disabled={false}
                            size="lg"
                            variant="soft"
                        >
                            USER NAME :
                        </Chip>
                        <Input
                            placeholder="User Name"
                            size="lg"
                            variant="soft"
                            onChange={(event) => {
                                username = event.target.value;
                            }}
                        />
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Chip
                            disabled={false}
                            size="lg"
                            variant="soft"
                        >
                            PASSWORD :
                        </Chip>
                        <Input
                            placeholder="Password"
                            size="lg"
                            variant="soft"
                            onChange={(event) => {
                                password = event.target.value;
                            }}
                        />
                    </Stack>
                    <LinearProgress
                        sx={{
                            display:
                                loginData.isLoading
                                    ? "block"
                                    : "none",
                        }}
                        color="primary"
                        variant="soft"
                    />
                    <Button
                        color="primary"
                        sx={{
                            display:
                                loginData.isLoading
                                    ? "none"
                                    : "block",
                        }}
                        onClick={function () {
                            if (
                                username.trim() === "" ||
                                password.trim() === ""
                            ) {
                                alert(
                                    "Please input username and password",
                                );
                            } else {
                                dispatch(
                                    login(username, password)
                                );
                            }
                        }}
                        size="lg"
                        variant="soft"
                    >
                        LOGIN
                    </Button>
                    {
                        (us.length > 0) ? (<>
                                <Divider/>
                                <span>
                                    Saved Login
                                </span>
                                <Stack
                                    direction={"column"}
                                    spacing={.5}
                                    sx={{
                                        display:
                                            loginData.isLoading
                                                ? "none"
                                                : "block",
                                    }}
                                >
                                    {us.map((item, index) => (
                                        <Box
                                            key={`user-card-${index}${item.i}`}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: .5,
                                            }}
                                        >
                                            <Button
                                                variant={"soft"}
                                                color={"danger"}
                                                onClick={() => {
                                                    try {
                                                        removeU(item.i).then(() => {
                                                            const updatedUs = us.filter(u => u.i !== item.i);
                                                            setUs(updatedUs);
                                                        });
                                                    } catch (e) {
                                                        console.error(e);
                                                    }
                                                }}
                                                sx={{
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <IoCloseSharp/>
                                            </Button>
                                            <Card
                                                variant={"soft"}
                                                color={"success"}
                                                onClick={() => {
                                                    dispatch(
                                                        login(item.i, item.c)
                                                    );
                                                }}
                                                sx={{
                                                    cursor: "pointer",
                                                    flexGrow: 1,
                                                    transition: "all 0.3s ease-in-out",
                                                    //hover effect
                                                    "&:hover": {
                                                        backgroundColor: "#59AC77",
                                                        color: "white",
                                                    }
                                                }}
                                            >
                                                <Stack
                                                    direction={"row"}
                                                    spacing={2}
                                                    alignItems={"center"}
                                                >
                                                    <FaUserCircle/>
                                                    <span>
                                                    <strong>{item.i}</strong>
                                                </span>
                                                    <Box sx={{flexGrow: 1}}/>
                                                    <span>
                                                    Login
                                                </span>
                                                    <FaArrowRightToBracket/>
                                                </Stack>
                                            </Card>
                                        </Box>
                                    ))}
                                </Stack>
                            </>
                        ) : (
                            <>
                            </>
                        )
                    }
                </Stack>
            </Card>
        </div>
    }

    if (navigator.onLine == false) {
        return <Box sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Sheet
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#FEF9F2",
                    padding: 10,
                    borderRadius: "16px",
                }}
            >
                <Typography level="title-lg"
                            sx={{
                                fontWeight: "bold",
                                fontSize: "16px",
                            }}
                >
                    Shree Ram Distributer
                </Typography>
                <FcHighPriority style={{fontSize: "128px",}}/>
                <Typography level="title-lg" sx={{
                    fontWeight: "bold",
                    fontSize: "32px",
                }}>
                    Offline
                </Typography>
                <Typography level="title-lg" sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                }}>
                    No Internet Connection...
                </Typography>
            </Sheet>
        </Box>
    }

    // if (isLogoded) {
    //      dispatch(validateLogin());
    // }

    return (
        <CssVarsProvider>
            <Stack
                direction="column"
                sx={{
                    width: "100vw",
                    height: "100vh",
                }}
            >
                <Stack
                    sx={{width: "100vw", p: 1,}}
                    direction="row"
                    alignContent={"center"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                >
                    <Header OpenSidebar={OpenSidebar}/>
                    <img src="vite.svg" style={{height: "48px"}} alt="logo"/>
                    <Typography
                        level="title-lg"
                        sx={{fontWeight: "bold", color: "#9e9ea4"}}
                    >
                        Shree Ram Distributer
                    </Typography>
                </Stack>
                {
                    (isLogoded) ? <HashRouter>
                        <Stack
                            sx={{flexGrow: 1, overflow: "hidden"}}
                            direction="row"
                        >
                            <Box
                                sx={{height: "100%",}}
                            >
                                <Sidebar
                                    openSidebarToggle={openSidebarToggle}
                                    OpenSidebar={OpenSidebar}
                                />
                            </Box>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    // width: "100%",
                                    // height: "100%",
                                    overflow: "auto",
                                }}
                            >
                                <Routes>
                                    <Route path="/" Component={Home}/>{/*✅*/}
                                    <Route path="/admin/" Component={Home}/>{/*✅*/}
                                    {/* delivery boy */}
                                    <Route
                                        path="/admin/readDeliveryBoy"
                                        Component={DeliveryBoyDetails}
                                    />{/*✅*/}
                                    <Route
                                        path="/admin/expense"
                                        element={<ExpensesPage/>}
                                    />
                                    {/* wherehouse */}
                                    <Route
                                        path="/admin/readWherehouse"
                                        Component={Warehouse}
                                    />
                                    <Route
                                        path="/admin/gasUi"
                                        Component={GasUi}
                                    />
                                    <Route
                                        path="/admin/deliveryHistory"
                                        Component={deliveryHistory}
                                    />
                                    <Route
                                        path="/admin/ViewCustomer"
                                        Component={ViewCustomer}
                                    />
                                    <Route
                                        path="/admin/expence"
                                        Component={Expences}
                                    />
                                    <Route
                                        path="/admin/purchase"
                                        Component={Purchase}
                                    />
                                    <Route
                                        path="/admin/report"
                                        element={<Report isLogged={true}/>}
                                    />
                                </Routes>
                            </Box>
                        </Stack>
                    </HashRouter> : (
                        (isReportPathValid) ? <HashRouter>
                            <Stack
                                sx={{flexGrow: 1, overflow: "hidden"}}
                                direction="row"
                            >
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <Routes>
                                        <Route
                                            path="/admin/report"
                                            element={<Report isLogged={false}/>}
                                        />
                                    </Routes>
                                </Box>
                            </Stack>
                        </HashRouter> : (
                            (!otpVerification) ? <LoginUI/> : <>
                                <Stack
                                    sx={{flexGrow: 1, overflow: "hidden"}}
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={1}
                                    mt={15}
                                >
                                    <Input
                                        sx={{
                                            width: "420px",
                                        }}
                                        placeholder="OTP"
                                        size="lg"
                                        variant="soft"
                                        type="number"
                                        onChange={(event) => {
                                            setOtp(event.target.value);
                                        }}
                                    />
                                    <CircularProgress
                                        sx={{
                                            display: loginData.isLoading ? "block" : "none",
                                        }}
                                    />
                                    <Stack
                                        sx={{
                                            flexGrow: 1, overflow: "hidden",
                                            display: loginData.isLoading ? "none" : "flex",
                                        }}
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start"
                                        gap={1}
                                    >
                                        <Button
                                            sx={{
                                                width: "120px",
                                            }}
                                            color="warning"
                                            variant="soft"
                                            onClick={function () {
                                                sessionStorage.removeItem("authToken");
                                                sessionStorage.removeItem("otpToken");
                                                //reaload the page
                                                window.location.reload();
                                            }}
                                        >Cancel</Button>
                                        <Button
                                            sx={{
                                                width: "120px",
                                            }}
                                            color="primary"
                                            variant="soft"
                                            onClick={function () {
                                                dispatch(validateOtp(otp));
                                            }}
                                        >
                                            Verify OTP
                                        </Button>
                                    </Stack>
                                </Stack>
                            </>
                        )
                    )
                }
            </Stack>
        </CssVarsProvider>

    );
}

export default App;

function removeUserDataFromCookie() {
    document.cookie = `token=;`;
    document.cookie = `user_id=;`;
    document.cookie = `role=;`;
    document.cookie = `username=;`;
    document.cookie = `name=;`;
}