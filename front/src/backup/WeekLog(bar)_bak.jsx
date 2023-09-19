import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import Skeleton from '@mui/material/Skeleton';
import LoginError from '../Alertbar/LoginError';
import './chart.css';

const WeekLog = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [logCounts, setLogCounts] = useState({});
  const [totalLogCount, setTotalLogCount] = useState(0);

  useEffect(() => {
    const fetchLogs = () => {
      axios.get('http://localhost:8000/logs')
        .then(response => {
          processLogs(response.data.logs);
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

  // 로그 처리 후 로그 개수를 계산하여 상태를 업데이트
  const processLogs = (logs) => {
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

    const logCountsByDate = {};

    logs.forEach(log => {
      const logDate = new Date(log.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });

      if (new Date(log.date) >= oneWeekAgo) {
        logCountsByDate[logDate] = (logCountsByDate[logDate] || 0) + 1;
      }
    });

    setLogCounts(logCountsByDate);

    const totalLogCount = Object.values(logCountsByDate).reduce((acc, count) => acc + count, 0);
    setTotalLogCount(totalLogCount);
  };

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
              <Skeleton variant="rectangle" height={280} width={430} style={{marginRight: '40px'}}/>
            </div>
          </div>
        </Suspense>
      ) : (
        error ? (
          <div className='Chart-Error'>
            <LoginError message={errorMessage} />
          </div>
        ) : (
          totalLogCount === 0 ? (
            <>
              <div className='Chart-Info'>
                <div className='Chart-Info-Detail1'>
                  7일간 발생한 로그는
                </div>
                <div className='Chart-Info-Detail2'>
                  총 0 개 입니다.
                </div>
              </div>
              <div className='Chart-Chart'>
              </div>
            </>
          ) : (
            <>
              <div className='Chart-Info'>
                <div className='Chart-Info-Detail1'>
                  7일간 발생한 로그는
                </div>
                <div className='Chart-Info-Detail2'>
                  총 {totalLogCount} 개 입니다.
                </div>
              </div>
              <div className='Chart-Chart'>
                <BarChart
                  xAxis={[
                    {
                      scaleType: 'band',
                      data: Object.keys(logCounts),
                      categoryGapRatio: 0.1,
                      barGapRatio: 0.3,
                    }
                  ]}
                  series={[
                    {
                      data: Object.values(logCounts),
                      color: '#e0aaff',
                    }
                  ]}
                  width={500}
                  height={400}
                />
              </div>
            </>
          )
        )
      )}
    </div>
  );
};

export default WeekLog;
