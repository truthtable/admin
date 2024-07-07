import React from "react";
import {
     BsGrid1X2Fill,
     BsFillArchiveFill,
     BsHouseCheck,
     BsListCheck,
     BsMenuButtonWideFill,
     BsFillGearFill,
     BsPeopleFill,
     BsFillGrid3X3GapFill,
     BsFillPersonCheckFill,
     BsFillCartFill,
     BsFillMenuButtonWideFill,
} from "react-icons/bs";

import {
     FcContacts,
     FcDocument,
     FcFullBattery,
     FcHome,
     FcManager,
     FcPieChart,
     FcRating,
     FcViewDetails,
} from "react-icons/fc";

import { GiGasStove } from "react-icons/gi";

import { Link } from "react-router-dom";
import "../css/siderbar.css";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
     return (
          <aside
               id="sidebar"
               className={openSidebarToggle ? "sidebar-responsive" : ""}
          >
               {/* <div className="sidebar-title">
                    <div className="sidebar-brand">
                         <GiGasStove className="icon_header" /> Shree Ram
                         Distributer
                    </div>
                    <span className="icon close_icon" onClick={OpenSidebar}>
                         X
                    </span>
               </div> */}

               <ul className="sidebar-list">
                    <Link to="/admin/">
                         <li className="sidebar-list-item">
                              <FcPieChart className="icon" /> Dashboard
                         </li>
                    </Link>
                    <Link to="/admin/readWherehouse">
                         <li className="sidebar-list-item">
                              <FcHome className="icon" /> Warehouse
                         </li>
                    </Link>
                    <Link to="/admin/delivery_history">
                         <li className="sidebar-list-item">
                              <FcViewDetails className="icon" /> Deliveries
                         </li>
                    </Link>
                    {/* NEW MENU */}

                    <Link to="/admin/ViewCustomer">
                         <li className="sidebar-list-item">
                              <FcContacts className="icon" /> Customers
                         </li>
                    </Link>
                    <Link to="/admin/readDeliveryBoy">
                         <li className="sidebar-list-item">
                              <FcManager className="icon" /> Delivery Boys
                         </li>
                    </Link>

                    <Link to="/admin/read">
                         <li className="sidebar-list-item">
                              <FcFullBattery className="icon" /> Gas Cylinders
                         </li>
                    </Link>
                    <Link>
                         <li className="sidebar-list-item">
                              <FcRating className="icon" /> Offers
                         </li>
                    </Link>
                    <Link>
                         <li className="sidebar-list-item">
                              <FcDocument className="icon" /> Reports
                         </li>
                    </Link>
                    {/* NEW MENU */}
                    {/* 
                    <Link to="addWherehouse">
                         <li className="sidebar-list-item">
                              <BsHouseCheck className="icon" /> Add Wherehouses
                         </li>
                    </Link>

                    <Link to="/admin/insert">
                         <li className="sidebar-list-item">
                              <BsFillArchiveFill className="icon" /> Add Gas
                              Cylinders
                         </li>
                    </Link>

                    <Link to="/admin/InsertCustomer">
                         <li className="sidebar-list-item">
                              <BsFillGrid3X3GapFill className="icon" /> Add
                              Customers
                         </li>
                    </Link>

                    <Link to="/admin/addDeliveryBoy">
                         <li className="sidebar-list-item">
                              <BsPeopleFill className="icon" /> Add Delivery
                              Boys
                         </li>
                    </Link>

                    <Link to="/admin/InsertAdmin">
                         <li className="sidebar-list-item">
                              <BsFillPersonCheckFill className="icon" /> Add
                              Admins
                         </li>
                    </Link>

                    <Link to="/admin/add_delivery_history">
                         <li className="sidebar-list-item">
                              <BsListCheck className="icon" /> Add Delivery
                              History
                         </li>
                    </Link>

                    <Link to="/admin/InsertReport">
                         <li className="sidebar-list-item">
                              <BsMenuButtonWideFill className="icon" /> Add
                              Reports
                         </li>
                    </Link> */}

                    <Link to="">
                         <li className="sidebar-list-item">
                              <BsFillGearFill className="icon" /> Setting
                         </li>
                    </Link>
               </ul>
          </aside>
     );
}

export default Sidebar;
