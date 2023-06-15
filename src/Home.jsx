//import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//import { auth } from '../firebase';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import styled from 'styled-components';
//import Setting from './Setting';

const Home = () => {
  //const navigate = useNavigate();

  return (
    <Wrap>
      <Header>
        <Topbar />
      </Header>
      <Container>
        <div id="root">
          <ColumnLeft>
            <Sidebar />
          </ColumnLeft>
          <ColumnRight>
            
          </ColumnRight>
        </div>
      </Container>
    </Wrap>
    
  );
};

const Wrap = styled.div`
  min-width: 1340px;
`

const Header = styled.div`
  width: 1280px;
  margin: 0 auto;
  padding: 0px 0px 50px 0px;
`

const Container = styled.div`
  position: relative;
  width: 1280px;
  margin: 0 auto;
  padding-bottom: 60px;
`;

const ColumnLeft = styled.div`
  float: left;
  width: 320px;
`;

const ColumnRight = styled.div`
  float: left;
  width: 860px;
  margin-left: 30px;
`;

export default Home;