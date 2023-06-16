import React from 'react';
import './topbar.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from "react-router-dom";


export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <Link to='/'>
                        <span className="logo">
                            <ManageAccountsIcon />
                        </span>
                    </Link>
                </div>
                <div className="topRight">
                    <div className='topbarIconContainer'>
                        <NotificationsNoneIcon />
                        <span className='topIconBadge'>!</span>{/*알림개수지정*/}
                    </div>
                    <div className='topbarIconContainer'>
                        login
                    </div>
                </div>
            </div>
        </div>
    );
}