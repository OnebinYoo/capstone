import React from "react";
import './sidebar.css'
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">관리자페이지</h3>
                    <ul className="sidebarList">
                        <Link to='/'>
                            <li className="sidebarListItem">Home</li>
                        </Link>
                        <Link  to='setting'>
                            <li className="sidebarListItem">setting</li>
                        </Link>
                        <li className="sidebarListItem">log</li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">Menu1</li>
                        <li className="sidebarListItem">Menu2</li>
                        <li className="sidebarListItem">Menu3</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}