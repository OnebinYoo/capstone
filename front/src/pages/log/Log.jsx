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
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const columns = [
    {
      accessorKey: 'status_code',
      header: 'Status Code',
    },
    {
      accessorKey: 'ip',
      header: 'IP',
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'content_length',
      header: 'Content Length',
    }
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
              <MaterialReactTable columns={columns} data={logs}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogTable;
