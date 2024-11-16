import React, { useState } from "react";
import { BsFillGearFill, } from "react-icons/bs";

import {
     FcContacts,
     FcDocument,
     FcFactory,
     FcFullBattery,
     FcHome,
     FcManager,
     FcPieChart,
     FcRating,
     FcViewDetails,
} from "react-icons/fc";

import { Link } from "react-router-dom";
import "../css/siderbar.css";
import { Box } from "@mui/joy";

function Sidebar({ openSidebarToggle, OpenSidebar }) {

     const [hideLabels, setHideLabels] = useState(true);

     return (
          <aside
               id="sidebar"
               className={openSidebarToggle ? "sidebar-responsive" : ""}
               onMouseEnter={
                    () => {
                         setHideLabels(false)
                    }
               }
               onMouseLeave={
                    () => {
                         setHideLabels(true)
                    }
               }
               style={{
                    //width: (hideLabels) ? "76px" : "251px",
               }}
          >

               <ul className="sidebar-list">
                    {
                         [
                              { label: "Dashboard", path: "/admin/", icon: <FcPieChart className="icon" /> },
                              { label: "Purchase", path: "/admin/purchase", icon: <FcFactory className="icon" /> },
                              { label: "Warehouse", path: "/admin/readWherehouse", icon: <FcHome className="icon" /> },
                              { label: "Deliveries", path: "/admin/deliveryHistory", icon: <FcViewDetails className="icon" /> },
                              { label: "Customers", path: "/admin/ViewCustomer", icon: <FcContacts className="icon" /> },
                              { label: "Delivery Boys", path: "/admin/readDeliveryBoy", icon: <FcManager className="icon" /> },
                              // { label: "Gas Cylinders", path: "/admin/read", icon: <FcFullBattery className="icon" /> },
                              { label: "Bills & Reports", path: "/admin/report", icon: <FcDocument className="icon" /> },
                              // { label: "Setting", path: "/admin/", icon: <FcRating className="icon" /> },
                         ].map((data, index) => (
                              <Link to={data.path} key={index}>
                                   <li className="sidebar-list-item">
                                        {data.icon}
                                        <Box
                                             sx={{
                                                  //display: hideLabels ? "none" : "inline",
                                                  marginLeft: "10px",
                                                  wordBreak: "keep-all",
                                                  transition: "all 0.3s ease-in-out",
                                                  width: hideLabels ? "0px" : "100px",
                                                  opacity: hideLabels ? "0" : "1",
                                                  // "&:hover": {
                                                  //      width: "100px",
                                                  //      opacity: "1",
                                                  // }
                                             }}
                                        >{data.label}</Box>
                                   </li>
                              </Link>
                         ))
                    }
               </ul>
          </aside >
     );
}

export default Sidebar;
