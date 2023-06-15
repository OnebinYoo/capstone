import React from 'react';
//import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';
import Chart from './Chart';
import styled from 'styled-components';

const Setting = ( ) => {
    return (
        <div id="wrap">
            <Container>
                <div id="root">
                <Column_left>
                    <Sidebar />
                </Column_left>
                <Column_right>
                    <Chart />
                </Column_right>
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

const Column_left = styled.div`
  float: left;
  width: 380px;
`;

const Column_right = styled.div`
  float: left;
  width: 800px;
  margin-left: 30px;
`;
