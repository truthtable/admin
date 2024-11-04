import React, { useEffect } from "react";
import {
     BsBook,
     BsFillArchiveFill,
     BsFillGrid3X3GapFill,
     BsHouseCheck,
     BsMenuButtonWideFill,
     BsPeopleFill,
} from "react-icons/bs";

import "../css/home.css";
import { Link } from "react-router-dom";
import { Box, CircularProgress } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { fetchCount } from "../state/Count";

function Home() {
     let counts = {};
     let loading = false;

     const dispatch = useDispatch();

     const countsData = useSelector((state) => state.count);
     const loginData = useSelector((state) => state.login);

     counts = countsData.data;
     loading = countsData.isLoading;

     //console.log(loginData.token);

     useEffect(() => {
          //fetchCountData()

          if (loginData.token !== null) {
               dispatch(fetchCount());
          }
     }, []);

     const loadingView = loading ? "block" : "none";

     return (
          <Box
               sx={{
                    color: "white",
                    overflow: "auto",
                    height: "100%",
                    pr: 2,
               }}
          >
               <div className="main-title">
                    <h3
                         style={{
                              color: "white",
                         }}
                    >Admin Dashboard</h3>
               </div>
               <div className="main-cards">

                    <Link to="/admin/purchase" className="link shadow-lg">
                         <div className="card-inner">
                              <h3>Purchase</h3>
                              <BsHouseCheck className="card_icon" />
                         </div>
                         <div>
                              <CircularProgress
                                   sx={{ display: loadingView }}
                                   color="primary"
                                   variant="soft"
                              />
                              <span
                                   style={{
                                        display: loading ? "none" : "block",
                                   }}
                              >
                                   {10}
                              </span>
                         </div>
                    </Link>

                    <Link to="/admin/readWherehouse" className="link shadow-lg">
                         <div className="card-inner">
                              <h3>Wherehouse</h3>
                              <BsHouseCheck className="card_icon" />
                         </div>
                         <div>
                              <CircularProgress
                                   sx={{ display: loadingView }}
                                   color="primary"
                                   variant="soft"
                              />
                              <span
                                   style={{
                                        display: loading ? "none" : "block",
                                   }}
                              >
                                   {10}
                              </span>
                         </div>
                    </Link>


                    <Link to="/admin/deliveryHistory" className="link shadow-lg">
                         <div className="card-inner">
                              <h3>Delivery History</h3>
                              <BsBook className="card_icon" />
                         </div>
                         <div>
                              <CircularProgress
                                   sx={{ display: loadingView }}
                                   color="primary"
                                   variant="soft"
                              />
                              <span
                                   style={{
                                        display: loading ? "none" : "block",
                                   }}
                              >
                                   {counts.today_delivery}
                              </span>
                         </div>
                    </Link>

                    <Link to="/admin/ViewCustomer" className="link shadow-lg">
                         <div className="card-inner">
                              <h3>Customers</h3>
                              <BsFillGrid3X3GapFill className="card_icon" />
                         </div>
                         <div>
                              <CircularProgress
                                   sx={{ display: loadingView }}
                                   color="primary"
                                   variant="soft"
                              />
                              <span
                                   style={{
                                        display: loading ? "none" : "block",
                                   }}
                              >
                                   {counts.customer_count}
                              </span>
                         </div>
                    </Link>

                    <Link to="/admin/readDeliveryBoy" className="link shadow-lg">
                         <div className="card-inner">
                              <h3>Delivery Boy</h3>
                              <BsPeopleFill className="card_icon" />
                         </div>
                         <div>
                              <CircularProgress
                                   sx={{ display: loadingView }}
                                   color="primary"
                                   variant="soft"
                              />
                              <span
                                   style={{
                                        display: loading ? "none" : "block",
                                   }}
                              >
                                   {counts.courier_boy_count}
                              </span>
                         </div>
                    </Link>

                    <Link to="/admin/report" className="link shadow-lg">
                         <div className="card-inner">
                              <h3>Bills & Report</h3>
                              <BsMenuButtonWideFill className="card_icon" />
                         </div>
                         <div>
                              <CircularProgress
                                   sx={{ display: loadingView }}
                                   color="primary"
                                   variant="soft"
                              />
                              <span
                                   style={{
                                        display: loading ? "none" : "block",
                                   }}
                              >
                                   {0}
                              </span>
                         </div>
                    </Link>

                    {/* <Link to="/admin/read" className="link shadow-lg">
                         <div className="card-inner">
                              <h3>Gas Cylinders </h3>
                              <BsFillArchiveFill className="card_icon" />
                         </div>
                         <div>
                              <CircularProgress
                                   sx={{ display: loadingView }}
                                   color="primary"
                                   variant="soft"
                              />
                              <span
                                   style={{
                                        display: loading ? "none" : "block",
                                   }}
                              >
                                   {counts.gas_count}
                              </span>
                         </div>
                    </Link> */}
               </div>
          </Box>
     );
}

export default Home;

// cont data sample {
//        "today_delivery": 3,
//        "courier_boy_count": 2,
//        "customer_count": 15
//    }
