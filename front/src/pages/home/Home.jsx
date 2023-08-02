import React, { } from 'react';
import TodayLog from '../../components/chart/TodayLog';
import './home.css';

import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';

export default function Home() {
  return (
    <div className='Wrap'>
      <div className='Container'>
        <div className='Header'>
          <Topbar />
        </div>
        <div className='Root'>
          <div className='ColumnLeft'>
            <Sidebar />
          </div>
          <div className='ColumnRight'>
            <div className='Chart-Today'>
              <TodayLog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
