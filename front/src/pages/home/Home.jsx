import React, { useState } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TodayLog from '../../components/chart/TodayLog';
import WeekLog from '../../components/chart/WeekLog';
import './home.css';

export default function Home() {

  // 사이드바 토글
  const [showColumnLeft, setShowColumnLeft] = useState(true);
  const toggleColumnLeft = () => {
    setShowColumnLeft((prev) => !prev);
  };

  return (
    <div className='Wrap'>
      <div className='Container'>
        <div className='Header'>
          <Topbar toggleColumnLeft={toggleColumnLeft} />
        </div>
        <div className='Root'>
          <div className={`ColumnLeft${showColumnLeft ? '' : '-hide'}`}>
            <Sidebar />
          </div>
          <div className={`ColumnRight${showColumnLeft ? '' : '-hide'}`}>
            <div className='Chart'>
              <TodayLog />
              <WeekLog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
