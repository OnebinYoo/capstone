import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Sidebar = ({ active }) => {

  const location = useLocation();
  const currentPage = location.pathname;

  return (
    
      <Container>
        <Link to="/home" className="link">
          {currentPage === "/home" ? (
            <MainMenuDiv style={{ backgroundColor: "#f3f3f3" }}>
            {/*<Icon src={clickedHome}></Icon>*/}
            <MenuSpan>홈</MenuSpan>
            </MainMenuDiv>
          ) : (
            <MainMenuDiv>
            {/*<Icon src={home}></Icon>*/}
            <MenuSpan>홈</MenuSpan>
            </MainMenuDiv>
          )}
        </Link>
        <Link to="/log" className="link">
          {currentPage === "/log" ? (
          <MainMenuDiv style={{ backgroundColor: "#f3f3f3" }}>
          {/*<Icon src={clickedExplore}></Icon>*/}
          <MenuSpan>로그</MenuSpan>
          </MainMenuDiv>
          ) : (
          <MainMenuDiv>
          {/*<Icon src={explore}></Icon>*/}
          <MenuSpan>로그</MenuSpan>
          </MainMenuDiv>
          )}
        </Link>
        <Link to="/setting" className="link">
          {currentPage === "/setting" ? (
          <MainMenuDiv style={{ backgroundColor: "#f3f3f3" }}>
          {/*<Icon src={clickedExplore}></Icon>*/}
          <MenuSpan>설정</MenuSpan>
          </MainMenuDiv>
          ) : (
          <MainMenuDiv>
          {/*<Icon src={explore}></Icon>*/}
          <MenuSpan>설정</MenuSpan>
          </MainMenuDiv>
          )}
        </Link>
        <Line />

      </Container>
    
  );
};
  
  export default Sidebar;
  
  /*const SidebarSection = styled.div`
    padding: 5px;

  `;

  const Container_bak = styled.div`
  padding: 10px 0px 10px 10px;
  width: 300px;
  float: left;
  position: fixed;
  left: 0;
  height: 100%;
`*/

  const Container = styled.div`
    
    text-align: left;
    overflow-y: scroll;
  
    @media (max-width: 1300px) {
      width: 90px;
  
      .title {
        display: none;
      }
    }
  
    .link {
      text-decoration: none;
      color: black;
    }
  
    @media (max-width: 800px) {
      display: none;
    }
    ,
  
    /*스크롤바*/
    &::-webkit-scrollbar {
      border: none;
      -webkit-appearance: none;
    }
    &::-webkit-scrollbar-thumb {
      background: darkgrey;
      border-radius: 8px;
    }
  `;
  
  const MainMenuDiv = styled.div`
    padding: 5px 20px 5px 20px;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 15px;
  
    :hover {
      background-color: #f3f3f3;
    }
  
    @media (max-width: 1300px) {
      height: 90px;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
      align-items: center;
    }
  `;
  
  /*const MenuDiv = styled.div`
    padding: 0px 20px 0px 20px;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
  
    :hover {
      background-color: #f3f3f3;
    }
  
    @media (max-width: 1300px) {
      display: none;
    }
  `;
  
  const Icon = styled.img`
    margin-right: 20px;
    height: 25px;
    align-items: center;
    display: flex;
    float: left;
  
    @media (max-width: 1300px) {
      margin: 0;
    }
  `;*/
  
  const MenuSpan = styled.span`
    font-size: 15px;
  `;
  
  const Line = styled.div`
    height: 1px;
    background: #dedede;
    margin-top: 14px;
    margin-bottom: 14px;
  
    @media (max-width: 1300px) {
      display: none;
    }
  `;