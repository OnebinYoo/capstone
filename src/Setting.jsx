import React from 'react';
//import Topbar from './topbar/Topbar';
import styled from 'styled-components';
import Sidebar from './components/sidebar/Sidebar';
import Chart from './components/Chart';

const Setting = ( ) => {
    return (
        <div id="wrap">
            <Container>
                <div id="root">
                <ColumnLeft>
                    <Sidebar />
                </ColumnLeft>
                <ColumnRight>
                    <Chart />
                </ColumnRight>
                </div>
            </Container>
        </div>
    )
};

export default Setting;

const Container = styled.div`
  position: relative;
  width: 1280px;
  margin: 0 auto;
  padding-bottom: 60px;
  text-align: left;
`;

const ColumnLeft = styled.div`
  float: left;
  width: 380px;
`;

const ColumnRight = styled.div`
  float: left;
  width: 800px;
  margin-left: 30px;
`;
