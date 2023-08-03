import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts';
import Skeleton from '@mui/material/Skeleton';
import LoginError from '../Alertbar/LoginError';
import './chart.css';

const WeekLog = () => {
  const [logs, setLogs] = useState([]);
  const [systemTime, setSystemTime] = useState(new Date());
  const [logCounts, setLogCounts] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

    // 3초마다 데이터를 가져옴
    const interval = setInterval(fetchLogs, 3000);

    // 컴포넌트가 언마운트되면 인터벌을 정리
    return () => clearInterval(interval);
  }, []);

  // 시스템 시간을 10초마다 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemTime(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getStartDate = () => {
        const currentDate = new Date();
        const startDate = new Date(currentDate.getTime());
        startDate.setDate(startDate.getDate() - 7); // 현재 시스템 시간으로부터 7일 전
        return startDate;
      };

    const startDate = getStartDate();
    const endDate = new Date(systemTime);
  
    const updatedLogCounts = {};
  
    logs.forEach(log => {
      const logDateTime = new Date(log.date); // 로그의 날짜와 시간을 파싱
  
      // 로그 날짜가 지난 7일 안에 있는지 확인
      if (logDateTime >= startDate && logDateTime <= endDate) {
        // 날짜와 시간 정보를 가지고 오는 대신에 로그 날짜를 그대로 사용
        const formattedDate = logDateTime.toISOString().slice(0, 10);
  
        // 해당 날짜에 대한 카운트를 업데이트
        updatedLogCounts[formattedDate] = (updatedLogCounts[formattedDate] || 0) + 1;
      }
    });
  
    setLogCounts(updatedLogCounts);
  }, [logs, systemTime]);

  // Chart 데이터 생성
  const pieChartData = () => {
    const data = Object.entries(logCounts).map(([date, count]) => {
      // Date 문자열을 Date 객체로 변환하여 포맷팅
      const dateObj = new Date(date);
      // 원하는 형식으로 날짜를 포맷 (예: 7.30, 7.31, 8.1)
      const formattedDate = `${dateObj.getMonth() + 1}.${dateObj.getDate()}`;
      return {
        id: date,
        value: count,
        label: formattedDate,
      };
    });
    return [{ data }];
  };

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

  const totalLogCount = Object.values(logCounts).reduce((acc, count) => acc + count, 0);

  return (
    <div className='Chart-Wrap'>
      {loading ? (
        <Suspense fallback>
          {/* <div className='Chart-Wrap'> */}
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
          {/* </div> */}
        </Suspense>
      ) : (
        error ? (
          <div className='Chart-Error'>
            <LoginError message={errorMessage} />
          </div>
        ) : (
          <>
            <div className='Chart-Info'>
              <div className='Chart-Info-Detail1'>
                7일간 발생한 로그는
              </div>
              <div className='Chart-Info-Detail2'>
                총 {totalLogCount} 개 입니다
              </div>
            </div>
            <div className='Chart-Chart'>
              <PieChart
                series={chartData}
                colors={['#DC97FF','#D283FF','#BD68EE','#AB51E3','#8B2FC9','#6818A5','#5A108F','#4A0A77','#3C0663','#310055']}
                width={500}
                height={400}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textShadow: `
                        -1px -1px 0 black,
                        1px -1px 0 black,
                        -1px  1px 0 black,
                        1px  1px 0 black
                    `,
                  },
                }}
              />
            </div>
          </>
        )
      )}
    </div>
  );  
};

export default WeekLog;