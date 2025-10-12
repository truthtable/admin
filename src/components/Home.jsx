import React, {useEffect} from "react";
import {BsBook, BsFillGrid3X3GapFill, BsHouseCheck, BsMenuButtonWideFill, BsPeopleFill,} from "react-icons/bs";

import "../css/home.css";
import {Link} from "react-router-dom";
import {Box, CircularProgress} from "@mui/joy";
import {useDispatch, useSelector} from "react-redux";
import {fetchCount} from "../state/Count";
import {MdOutlineGasMeter} from "react-icons/md";

const DashboardCard = ({
                           title,
                           icon: Icon,
                           link,
                           count,
                           loading
                       }) => (
    <Link to={link} className="link shadow-lg">
        <div className="card-inner">
            <h3>{title}</h3>
            <Icon className="card_icon"/>
        </div>
        <div>
            <CircularProgress
                sx={{display: loading ? 'block' : 'none'}}
                color="primary"
                variant="soft"
            />
            <span style={{display: loading ? 'none' : 'block'}}>
        {count}
      </span>
        </div>
    </Link>
);

const dashboardCards = [
    {
        title: 'Purchase',
        icon: BsHouseCheck,
        link: '/admin/purchase',
        getCount: () => 10
    },
    {
        title: 'Warehouse',
        icon: BsHouseCheck,
        link: '/admin/readWherehouse',
        getCount: () => 10
    },
    {
        title: 'Delivery History',
        icon: BsBook,
        link: '/admin/deliveryHistory',
        getCount: (counts) => counts?.today_delivery || 0
    },
    {
        title: 'Customers',
        icon: BsFillGrid3X3GapFill,
        link: '/admin/ViewCustomer',
        getCount: (counts) => counts?.customer_count || 0
    },
    {
        title: 'Delivery Boy',
        icon: BsPeopleFill,
        link: '/admin/readDeliveryBoy',
        getCount: (counts) => counts?.courier_boy_count || 0
    },
    {
        title: 'Bills & Report',
        icon: BsMenuButtonWideFill,
        link: '/admin/report',
        getCount: () => 0
    },
    {
        title: 'Gas Cylinder',
        icon: MdOutlineGasMeter,
        link: '/admin/gasUi',
        getCount: (counts) => counts?.gas_cylinder || 0
    },
];

export const Home = () => {
    const dispatch = useDispatch();
    const {data: counts, isLoading} = useSelector((state) => state.count);
    const {token} = useSelector((state) => state.login);

    useEffect(() => {
        if (token) {
            dispatch(fetchCount());
        }
    }, [dispatch, token]);

    return (
        <Box sx={{
            color: 'white',
            overflow: 'auto',
            height: '100%',
            pr: 2,
        }}>
            <div className="main-title">
                <h3 style={{color: 'white'}}>Admin Dashboard</h3>
            </div>
            <div className="main-cards">
                {dashboardCards.map(({title, icon, link, getCount}) => (
                    <DashboardCard
                        key={link}
                        title={title}
                        icon={icon}
                        link={link}
                        count={getCount(counts)}
                        loading={isLoading}
                    />
                ))}
            </div>
        </Box>
    );
};

export default Home;