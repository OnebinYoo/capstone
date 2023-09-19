import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Skeleton from '@mui/material/Skeleton';
import LoginError from '../Alertbar/LoginError';
import './chart.css';

const TodayLog = () => {
  const [logs, setLogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/logs');
        setLogs(response.data.logs);
        setError(false);
        setLoading(false);
      } catch (error) {
        setErrorMessage('로그를 불러올 수 없습니다');
        setError(true);
        setLoading(false);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);

    return () => clearInterval(interval);
  }, []);

  // 당일(시스템시간 기준) 발생한 로그로 필터링
  const filterLogs = (logs) => {
    const today = new Date();
    return logs.filter(log => {
      const logDate = new Date(log.date);
      return (
        logDate.getFullYear() === today.getFullYear() &&
        logDate.getMonth() === today.getMonth() &&
        logDate.getDate() === today.getDate()
      );
    });
  };

  // status_code 별로 로그들을 분류하고 개수를 파악
  const countLogsByStatusCode = (filteredLogs) => {
    return filteredLogs.reduce((counts, log) => {
      const { status_code } = log;
      counts[status_code] = (counts[status_code] || 0) + 1;
      return counts;
    }, {});
  };

  // Chart 데이터 생성
  const chartData = () => {
    const filteredLogs = filterLogs(logs);
    const statusCodeCounts = countLogsByStatusCode(filteredLogs);
    const data = Object.entries(statusCodeCounts).map(([status_code, count]) => ({
      id: `${status_code}`,
      value: count,
      label: `${status_code}`,
    }));

    return [
      {
        data,
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
      },
    ];
  };

  return (
    <div className='Chart-Wrap'>
      {loading ? (
        <>
          <div className='Chart-Info'>
            <div className='Chart-Info-Detail1'>
              <Skeleton variant="text" height={40} width={250} />
            </div>
            <div className='Chart-Info-Detail2'>
              <Skeleton variant="text" height={40} width={250} />
            </div>
          </div>
          <div className="Chart-Chart">
            <Skeleton variant="circular" height={300} width={300} style={{ margin: '50px 140px 50px 65px' }} />
          </div>
        </>
      ) : (
        error ? (
          <div className='Chart-Error'>
            <LoginError message={errorMessage} />
          </div>
        ) : (
          chartData().length === 0 ? (
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
                  총 {filterLogs(logs).length} 개입니다.
                </div>
              </div>
              <div className='Chart-Chart'>
                <PieChart
                  series={chartData()}
                  colors={['#e0aaff', '#c77dff', '#9d4edd', '#7b2cbf', '#5a189a', '#3c096c', '#240096', '#10002b']}
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
