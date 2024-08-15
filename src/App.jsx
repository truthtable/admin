import { useEffect, useState } from "react";

import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Header, Home, Sidebar } from "./components";

import DeliveryEditForm from "./components/edit/DeliveryEditForm";

import GasDataView from "./components/view/GasDataView.jsx";

import Warehouse from "./components/view/Warehouse.jsx";

import ReportSection from "./components/report/ReportSection";

import {
     add_delivery_history,
     addDeliveryBoy,
     addWherehouse,
     insert,
     InsertAdmin,
     InsertCustomer,
     InsertReport,
     PrintReport,
     update,
     UpdateAdmin,
     UpdateCustomer,
     updateDeliveryBoy,
     UpdateReport,
     updateWherehouse,
     ViewAdmin,
     ViewCustomer,
} from "./crud";
import { Box, Button, Card, Chip, CssVarsProvider, Input, LinearProgress, Stack, Typography, } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "./state/LoginAPI";
import { fetchCheckLogin } from "./state/CheckLogin";
import { getUserDataFromCookie } from "./services/Api";
import DeliveryBoyDetails from "./components/view/DeliveryBoyDetails.jsx";
import Expences from "./components/view/Expences.jsx";
import Purchase from "./components/view/Purchase.jsx";
import DeliveryHistory from "./components/view/DeliveryHistory.jsx";
import deliveryHistory from "./components/view/DeliveryHistory.jsx";

function App() {
     const dispatch = useDispatch();
     const loginData = useSelector((state) => state.login);
     const checkLoginData = useSelector((state) => state.checkLogin);

     let isLogoded = false;

     //console.log(checkLoginData);

     useEffect(() => {
          if (getUserDataFromCookie() != null) {
               dispatch(fetchCheckLogin(getUserDataFromCookie().token));
               dispatch(fetchLogin({ isLoadFromCookie: true }));
          }
     }, []);

     try {
          if (loginData.token != null) {
               isLogoded = true;
          }
          if (checkLoginData.status) {
               isLogoded = true;
          }
     } catch (e) {
          //console.warn(e);
     }

     const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

     const OpenSidebar = () => {
          setOpenSidebarToggle(!openSidebarToggle);
     };

     let username = "srd_admin";
     let password = "admin@srd";

     if (loginData.isError && !checkLoginData.isLoading) {
          alert(loginData.errorMessage);
     }

     return (
          <CssVarsProvider>
               <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                    sx={{ padding: "10px", backgroundColor: "#263043" }}
               >
                    <img src="vite.svg" style={{ height: "48px" }} alt="logo" />
                    <Typography
                         level="title-lg"
                         sx={{ fontWeight: "bold", color: "#9e9ea4" }}
                    >
                         Shree Ram Distributer
                    </Typography>
               </Stack>
               <div>
                    {isLogoded ? (
                         <HashRouter>
                              <Box
                                   sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                        justifyContent: "flex-start",
                                        height: "100vh",
                                   }}
                              >
                                   <Box
                                        sx={{
                                             height: "100vh",
                                        }}
                                   >
                                        <Sidebar
                                             openSidebarToggle={openSidebarToggle}
                                             OpenSidebar={OpenSidebar}
                                        />
                                   </Box>
                                   <Box
                                        sx={{
                                             flexGrow: 1,
                                             height: "100vh",
                                             display: "flex",
                                        }}
                                        className="mainBorder"

                                   >
                                        <Header OpenSidebar={OpenSidebar} />
                                        <Routes>
                                             <Route path="/admin/" Component={Home} />
                                             {/* gas service */}
                                             <Route
                                                  path="/admin/insert"
                                                  Component={insert}
                                             />
                                             <Route path="/admin/read" Component={GasDataView} />
                                             <Route
                                                  path="/admin/update"
                                                  Component={update}
                                             />

                                             {/* delivery boy */}
                                             <Route
                                                  path="/admin/addDeliveryBoy"
                                                  Component={addDeliveryBoy}
                                             />
                                             <Route
                                                  path="/admin/readDeliveryBoy"
                                                  Component={DeliveryBoyDetails}
                                             />
                                             <Route
                                                  path="/admin/updateDeliveryBoy"
                                                  Component={updateDeliveryBoy}
                                             />

                                             {/* wherehouse */}
                                             <Route
                                                  path="/admin/addWherehouse"
                                                  Component={addWherehouse}
                                             />
                                             <Route
                                                  path="/admin/readWherehouse"
                                                  Component={Warehouse}
                                             />
                                             <Route
                                                  path="/admin/updateWherehouse"
                                                  Component={updateWherehouse}
                                             />

                                             {/* //report */}
                                             <Route
                                                  path="/admin/InsertReport"
                                                  Component={InsertReport}
                                             />
                                             <Route
                                                  path="/admin/readReport"
                                                  Component={ReportSection}
                                             />
                                             <Route
                                                  path="/admin/readReport"
                                                  Component={UpdateReport}
                                             />
                                             <Route
                                                  path="/admin/PrintReport"
                                                  Component={PrintReport}
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
                                        </Routes>
                                   </Box>
                              </Box>
                         </HashRouter>
                    ) : (
                         <div
                              style={{
                                   justifyContent: "center",
                                   display: "flex",
                              }}
                         >
                              <Card
                                   orientation="vertical"
                                   size="lg"
                                   variant="outlined"
                                   sx={{ mt: 10 }}
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
                                                       loginData.isLoading ||
                                                            checkLoginData.isLoading
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
                                                       loginData.isLoading ||
                                                            checkLoginData.isLoading
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
                                                            fetchLogin({
                                                                 username,
                                                                 password,
                                                                 isLoadFromCookie: false,
                                                            }),
                                                       );
                                                  }
                                             }}
                                             size="lg"
                                             variant="soft"
                                        >
                                             LOGIN
                                        </Button>
                                   </Stack>
                              </Card>
                         </div>
                    )}
               </div>
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
