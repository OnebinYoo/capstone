import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ active }) => {

  const location = useLocation();
  const currentPage = location.pathname;

  return (
    
    <div className="SidebarContainer">
        <Link to="/home" className="link">
          {currentPage === "/home" ? (
            <div className="MainMenuDiv" style={{ backgroundColor: "#f3f3f3" }}>
            {/*<Icon src={clickedHome}></Icon>*/}
            <div className="MenuSapn">홈</div>
            </div>
          ) : (
            <div className="MainMenuDiv">
            {/*<Icon src={home}></Icon>*/}
            <div  className="MenuSapn">홈</div>
            </div>
          )}
        </Link>
        <Link to="/log" className="link">
          {currentPage === "/log" ? (
          <div className="MainMenuDiv" style={{ backgroundColor: "#f3f3f3" }}>
          {/*<Icon src={clickedExplore}></Icon>*/}
          <div  className="MenuSapn">로그</div>
          </div>
          ) : (
          <div className="MainMenuDiv">
          {/*<Icon src={explore}></Icon>*/}
          <div  className="MenuSapn">로그</div>
          </div>
          )}
        </Link>
        <Link to="/setting" className="link">
          {currentPage === "/setting" ? (
          <div className="MainMenuDiv" style={{ backgroundColor: "#f3f3f3" }}>
          {/*<Icon src={clickedExplore}></Icon>*/}
          <div  className="MenuSapn">설정</div>
          </div>
          ) : (
          <div className="MainMenuDiv">
          {/*<Icon src={explore}></Icon>*/}
          <div  className="MenuSapn">설정</div>
          </div>
          )}
        </Link>
        <div className="Line" />

    </div>
    
  );
};
  
export default Sidebar;