import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Skeleton from '@mui/material/Skeleton';
import LoginError from '../Alertbar/LoginError';
import './chart.css';

const TodayLog = () => {
  const [logs, setLogs] = useState([]);
  const [logCount, setLogCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = () => {
      axios.get('http://localhost:8000/logs')
        .then(response => {
          setLogs(response.data.logs);
          setLoading(false);
        })
        .catch(error => {
          setErrorMessage('로그를 불러올 수 없습니다');
          setError(true);
          setLoading(false);
        });
    };

    fetchLogs();

    const interval = setInterval(fetchLogs, 3000);

    // 컴포넌트가 언마운트되면 인터벌을 정리
    return () => clearInterval(interval);
  }, []);

  // 시스템 시간과 로그의 날짜를 비교하여 일치하는 값만 가져옴
  useEffect(() => {
    const updatedFilteredLogs = logs.filter(log => {
      const logDate = new Date(log.date);
      const today = new Date();
      return (
        logDate.getFullYear() === today.getFullYear() &&
        logDate.getMonth() === today.getMonth() &&
        logDate.getDate() === today.getDate()
      );
    });
    setFilteredLogs(updatedFilteredLogs);
  }, [logs]);

  // status_code 별로 로그들을 분류하고 개수를 파악
  const countLogsByStatusCode = () => {
    const statusCodeCounts = {};
    filteredLogs.forEach(log => {
      if (statusCodeCounts[log.status_code]) {
        statusCodeCounts[log.status_code]++;
      } else {
        statusCodeCounts[log.status_code] = 1;
      }
    });
    return statusCodeCounts;
  };

  // Chart 데이터 생성
  const pieChartData = () => {
    const statusCodeCounts = countLogsByStatusCode();
    const data = Object.entries(statusCodeCounts).map(([status_code, count]) => ({
      id: `${status_code}`,
      value: count,
      label: `${status_code}`,
    }));
    return [{ data }];
  };

  // 총 로그 개수 계산
  useEffect(() => {
    setLogCount(filteredLogs.length);
  }, [filteredLogs]);

  const chartData = pieChartData().map(item => ({
    ...item,
    innerRadius: 80,
    outerRadius: 150,
    paddingAngle: 5,
    cornerRadius: 10,
    startAngle: -180,
    endAngle: 180,
    cx: 200,
    cy: 200,
    arcLabel: (item) => `${item.label} (${item.value})`,
    arcLabelMinAngle: 45,
  }));

  return (
    <div className='Chart-Wrap'>
      {loading ? (
        <Suspense fallback>
          <div className='Chart-Wrap'>
            <div className='Chart-Info'>
              <div className='Chart-Info-Detail1'>
                <Skeleton variant="text" height={40} width={250}/>
              </div>
              <div className='Chart-Info-Detail2'>
                <Skeleton variant="text" height={40} width={250}/>
              </div>
            </div>
            <div className="Chart-Chart">
              <Skeleton variant="circular" height={300} width={300} style={{margin: '50px 140px 50px 65px'}}/>
            </div>
          </div>
        </Suspense>
      ) : (
        error ? (
          <div className='Chart-Error'>
            <LoginError message={errorMessage} />
          </div>
        ) : (
          chartData === 0 ? (
            <>
              <div className='Chart-Info'>
                <div className='Chart-Info-Detail1'>
                  오늘 발생한 로그는
                </div>
                <div className='Chart-Info-Detail2'>
                  총 0 개입니다.
                </div>
              </div>
              <div className='Chart-Chart'>
              </div>
            </>
          ) : (
            <>
              <div className='Chart-Info'>
                <div className='Chart-Info-Detail1'>
                  오늘 발생한 로그는
                </div>
                <div className='Chart-Info-Detail2'>
                  총 {logCount} 개입니다.
                </div>
              </div>
              <div className='Chart-Chart'>
                <PieChart
                  series={chartData}
                  colors={['#e0aaff','#c77dff','#9d4edd','#7b2cbf','#5a189a','#3c096c','#240096','#10002b']}
                  width={500}
                  height={400}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: 'white',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    },
                  }}
                />
              </div>
            </>
          )
        )
      )}
    </div>
  );  
};

export default TodayLog;