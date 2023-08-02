import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts';
import './chart.css';

const GetLog = () => {
  const [logs, setLogs] = useState([]);
  const [systemTime, setSystemTime] = useState(new Date());
  const [logCount, setLogCount] = useState(0);

  useEffect(() => {
    const fetchLogs = () => {
      axios.get('http://localhost:8000/logs')
        .then(response => {
          setLogs(response.data.logs);
        })
        .catch(error => {
          console.error('Error fetching logs:', error);
        });
    };

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

  // 시스템 시간과 로그의 날짜를 비교하여 일치하는 값만 가져옴
  const filteredLogs = logs.filter(log => {
    const logDate = new Date(log.date);
    const systemDate = new Date(systemTime);
    return (
      logDate.getFullYear() === systemDate.getFullYear() &&
      logDate.getMonth() === systemDate.getMonth() &&
      logDate.getDate() === systemDate.getDate()
    );
  });

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

  // 총 로그 개수를 계산하여 상태에 업데이트
  useEffect(() => {
    setLogCount(filteredLogs.length);
  }, [filteredLogs]);

  // 데이터가 로드되지 않았을 때 또는 데이터가 없을 때 차트를 렌더링하지 않음
  if (logs.length === 0) {
    return null;
  }

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
    <div className='Chart-Today-Wrap'>
      <div className='Chart-Today-Chart'>
        <PieChart
          series={chartData}
          width={500}
          height={400}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontWeight: 'bold',
              fontSize: '20px'
            },
          }}
        />
      </div>
      <div className='Chart-Today-Info'>
        <div className='Chart-Today-Info-Detail1'>
          오늘 발생한 로그는
        </div>
        <div className='Chart-Today-Info-Detail2'>
          총 {logCount} 개입니다.
        </div>
      </div>
    </div>
  );
};

export default GetLog;
