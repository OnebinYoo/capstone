import React from "react";
import './sidebar.css'
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">관리페이지</h3>
                    <ul className="sidebarList">
                        <Link to='/home'>
                            <li className="sidebarListItem">
                                <HomeIcon /> home
                            </li>
                        </Link>
                        <Link to='/log'>
                            <li className="sidebarListItem">
                                <ChecklistIcon />log
                            </li>
                        </Link>
                        <Link  to='/setting'>
                            <li className="sidebarListItem">
                                <SettingsIcon />setting
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}