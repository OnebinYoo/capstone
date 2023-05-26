import React from 'react';
import './topbar.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <Link to='/'>
                        <span className="logo">회사아이콘</span>
                    </Link>
                </div>
                <div className="topRight">
                    <div className='topbarIconContainer'>
                        <NotificationsNoneIcon />
                        <span className='topIconBadge'>2</span>{/*알림개수지정*/}
                    </div>
                    <div className='topbarIconContainer'>
                        <SettingsIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}