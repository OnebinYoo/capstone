import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';
import CircularProgress from '@material-ui/core/CircularProgress';

import './log.css'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';

  const LogTable = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchLogs = async () => {
        try {
          const response = await axios.get('http://localhost:8000/logs');
          setLogs(response.data);
        } catch (error) {
          console.error(error);
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
  
    return (
      <div className='Wrap'>
        <div className='Container'>
          <div className='Root'>
          <div className='Header'>
          <Topbar />
        </div>
            <div className='ColumnLeft'>
              <Sidebar />
            </div>
            <div className='ColumnRight'>
              {loading ? (
                <div className='ProgressWrap'>
                  <div className='Progress'>
                    <CircularProgress style={{ color: '#9e30f4' }} />
                  </div>
                </div>
              ) : (
                logs && logs.logs.length > 0 ? (
                  <MaterialReactTable columns={columns} data={logs.logs} />
                ) : (
                  <MaterialReactTable columns={columns} data={logs.logs} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default LogTable;