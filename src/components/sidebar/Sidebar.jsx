import React from "react";
import { Link, useLocation } from "react-router-dom";

import './Sidebar.css'

import home from "../../assets/icon/home.png";
import clickedHome from "../../assets/icon/clickedHome.png"
import log from "../../assets/icon/log.png";
import clickedLog from "../../assets/icon/clickedLog.png"
import settings from "../../assets/icon/settings.png";
import clickedSettings from "../../assets/icon/clickedSettings.png"

const Sidebar = ({ active }) => {

  const location = useLocation();
  const currentPage = location.pathname;

  return (
    
    <div className="SidebarContainer">
        <Link to="/home" className="link">
          {currentPage === "/home" ? (
            <div className="MainMenuDiv" style={{ backgroundColor: "#f3f3f3" }}>
            <img className="Icon" src={clickedHome} alt="clickedHome"></img>
            <div className="MenuDiv">홈</div>
            </div>
          ) : (
            <div className="MainMenuDiv">
            <img className="Icon" src={home} alt="home"></img>
            <div className="MenuDiv">홈</div>
            </div>
          )}
        </Link>
        <Link to="/log" className="link">
          {currentPage === "/log" ? (
          <div className="MainMenuDiv" style={{ backgroundColor: "#f3f3f3" }}>
          <img className="Icon" src={clickedLog} alt="clickedLog"></img>
          <div className="MenuDiv">로그</div>
          </div>
          ) : (
          <div className="MainMenuDiv">
          <img className="Icon" src={log} alt="log"></img>
          <div  className="MenuDiv">로그</div>
          </div>
          )}
        </Link>
        <Link to="/setting" className="link">
          {currentPage === "/setting" ? (
          <div className="MainMenuDiv" style={{ backgroundColor: "#f3f3f3" }}>
          <img className="Icon" src={clickedSettings} alt="clickedSettings"></img>
          <div className="MenuDiv">설정</div>
          </div>
          ) : (
          <div className="MainMenuDiv">
          <img className="Icon" src={settings} alt="settings"></img>
          <div  className="MenuDiv">설정</div>
          </div>
          )}
        </Link>
        <div className="Line" />

    </div>
    
  );
};
  
export default Sidebar;