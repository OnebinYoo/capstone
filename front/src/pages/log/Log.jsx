import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './log.css'
import LoginError from '../../components/Alertbar/LoginError';

const LogTable = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/logs');
        setLogs(response.data);
        setError(false);
      } catch (error) {
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();

    const interval = setInterval(() => {
      fetchLogs();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  

  const columns = [
    {
      accessorKey: 'status_code',
      header: '에러 코드',
    },
    {
      accessorKey: 'ip',
      header: 'IP',
    },
    {
      accessorKey: 'date',
      header: '날짜',
    },
    {
      accessorKey: 'content_length',
      header: '컨텐츠 길이',
    },
  ];

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
            {loading ? (
              <div className='ProgressWrap'>
                <div className='Progress'>
                  <CircularProgress style={{ color: '#9e30f4' }} />
                </div>
              </div>
            ) : error ? (
              <div className='NoLog'>
                <div className='NoLog-AlertBar'>
                  <LoginError message={'로그를 불러올 수 없습니다'} />
                </div>
              </div>
            ) : (
              logs && logs.logs && logs.logs.length >= 0 ? (
                <MaterialReactTable columns={columns} data={logs.logs} />
              ) : (
                <div className='NoLog'>
                  <div className='NoLog-AlertBar'>
                    <LoginError message={'로그를 불러올 수 없습니다'} />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default LogTable;