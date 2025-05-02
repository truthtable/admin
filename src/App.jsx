
import React, { useEffect, useState } from "react";

import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Header, Home, Sidebar } from "./components";

import DeliveryEditForm from "./components/edit/DeliveryEditForm";

import GasDataView from "./components/view/GasDataView.jsx";

import Warehouse from "./components/view/Warehouse.jsx";

import ReportSection from "./components/report/ReportSection";

import {
     // add_delivery_history,
     addDeliveryBoy,
     addWherehouse,
     insert,
     // InsertAdmin,
     //     InsertCustomer,
     InsertReport,
     PrintReport,
     update,
     // UpdateAdmin,
     // UpdateCustomer,
     updateDeliveryBoy,
     UpdateReport,
     updateWherehouse,
     // ViewAdmin,
     ViewCustomer,
} from "./crud";
import { Box, Button, Card, Chip, CssVarsProvider, Input, LinearProgress, Sheet, Stack, Typography, } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "./state/LoginAPI";
// import { fetchCheckLogin } from "./state/CheckLogin";
// import { getUserDataFromCookie } from "./services/Api";
import DeliveryBoyDetails from "./components/view/DeliveryBoyDetails.jsx";
import Expences from "./components/view/Expences.jsx";
import Purchase from "./components/view/Purchase.jsx";
import { Report } from "./components/view/Report.jsx";
// import DeliveryHistory from "./components/view/DeliveryHistory.jsx";
import deliveryHistory from "./components/view/DeliveryHistory.jsx";
import { FcHighPriority } from "react-icons/fc";
import { login, validateLogin } from "./redux/authSlice.js";

function App() {

     const dispatch = useDispatch();

     const loginData = useSelector((state) => state.loginV2);

     //let isLogoded = false;
     let isLogoded = loginData?.data?.loginStatus || false;

     //console.log(loginData);

     //get url from window.location
     const url = new URL(window.location.href);
     const urlString = url.toString();
     const isReportPath = (path) => {
          return path.toLowerCase().includes('/report');
     };
     const isReportPathValid = isReportPath(urlString);
     console.log(isReportPathValid);

     const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

     const OpenSidebar = () => {
          setOpenSidebarToggle(!openSidebarToggle);
     };

     if (loginData.isError) {
          alert(loginData.errorMessage);
     }

     let username = "";
     let password = "";

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
                                             // fetchLogin({
                                             //      username,
                                             //      password,
                                             //      isLoadFromCookie: false,
                                             // }),
                                             login(username, password)
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
                    <FcHighPriority style={{ fontSize: "128px", }} />
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

     if (isLogoded) {
          dispatch(validateLogin());
     }

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
                         sx={{ width: "100vw", p: 1, }}
                         direction="row"
                         alignContent={"center"}
                         justifyContent={"flex-start"}
                         alignItems={"center"}
                    >
                         <Header OpenSidebar={OpenSidebar} />
                         <img src="vite.svg" style={{ height: "48px" }} alt="logo" />
                         <Typography
                              level="title-lg"
                              sx={{ fontWeight: "bold", color: "#9e9ea4" }}
                         >
                              Shree Ram Distributer
                         </Typography>
                    </Stack>
                    {
                         (isLogoded) ? <HashRouter>
                              <Stack
                                   sx={{ flexGrow: 1, overflow: "hidden" }}
                                   direction="row"
                              >
                                   <Box
                                        sx={{ height: "100%", }}
                                   >
                                        <Sidebar
                                             openSidebarToggle={openSidebarToggle}
                                             OpenSidebar={OpenSidebar}
                                        />
                                   </Box>
                                   <Box
                                        sx={{
                                             flexGrow: 1,
                                             width: "100%",
                                             height: "100%",
                                        }}
                                   >
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
                                             <Route
                                                  path="/admin/report"
                                                  element={<Report isLogged={true} />}
                                             />
                                        </Routes>
                                   </Box>
                              </Stack>
                         </HashRouter> : (
                              (isReportPathValid) ? <HashRouter>
                                   <Stack
                                        sx={{ flexGrow: 1, overflow: "hidden" }}
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
                                                       element={<Report isLogged={false} />}
                                                  />
                                             </Routes>
                                        </Box>
                                   </Stack>
                              </HashRouter> : <LoginUI />
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