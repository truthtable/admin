import { useEffect, useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Sidebar, Home } from "./components";

import DeliveryEditForm from "./components/edit/DeliveryEditForm";

import GasDataView from "./components/edit/GasDataView";

import Warehouse from "./components/edit/Warehouse";

//import DeliveryBoyDetails from "./crud/addDeliveryBoy/DeliveryBoyDetails";

import {
     // product
     insert,
     read,
     update,
     deletegas,

     // delivery boy
     addDeliveryBoy,
     updateDeliveryBoy,
     //DeliveryBoyDetails,

     // wherehouse
     addWherehouse,
     readWherehouse,
     updateWherehouse,

     //report
     InsertReport,
     readReport,
     UpdateReport,
     PrintReport,

     //delivery History
     add_delivery_history,
     delivery_history,
     edit_delivery_history,

     //Customers
     InsertCustomer,
     ViewCustomer,
     UpdateCustomer,

     //admin
     InsertAdmin,
     ViewAdmin,
     UpdateAdmin,
} from "./crud";
import {
     Box,
     Button,
     Card,
     Chip,
     CssVarsProvider,
     Input,
     LinearProgress,
     Modal,
     ModalClose,
     ModalDialog,
     Stack,
     Typography,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "./state/LoginAPI";
import { fetchCheckLogin } from "./state/CheckLogin";
import { getUserDataFromCookie } from "./services/Api";
import DeliveryBoyDetails from "./components/edit/DeliveryBoyDetails";

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
                         <BrowserRouter>
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
                                                  Component={readReport}
                                             />
                                             <Route
                                                  path="/admin/readReport"
                                                  Component={UpdateReport}
                                             />
                                             <Route
                                                  path="/admin/PrintReport"
                                                  Component={PrintReport}
                                             />

                                             {/* //delivery_history */}
                                             <Route
                                                  path="/admin/add_delivery_history"
                                                  Component={add_delivery_history}
                                             />
                                             <Route
                                                  path="/admin/delivery_history"
                                                  Component={delivery_history}
                                             />
                                             <Route
                                                  path="/admin/edit_delivery_history"
                                                  Component={DeliveryEditForm}
                                             />

                                             {/* //Customers */}
                                             <Route
                                                  path="/admin/InsertCustomer"
                                                  Component={InsertCustomer}
                                             />
                                             <Route
                                                  path="/admin/ViewCustomer"
                                                  Component={ViewCustomer}
                                             />
                                             <Route
                                                  path="/admin/UpdateCustomer"
                                                  Component={UpdateCustomer}
                                             />

                                             {/* //admin */}
                                             <Route
                                                  path="/admin/InsertAdmin"
                                                  Component={InsertAdmin}
                                             />
                                             <Route
                                                  path="/admin/ViewAdmin"
                                                  Component={ViewAdmin}
                                             />
                                             <Route
                                                  path="/admin/UpdateAdmin"
                                                  Component={UpdateAdmin}
                                             />
                                        </Routes>
                                   </Box>
                              </Box>
                         </BrowserRouter>
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
