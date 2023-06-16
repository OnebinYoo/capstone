import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';

import './log.css'

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
        accessorKey: 'id',
        header: 'ID',
      },
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
      },
      {
        accessorKey: 'data',
        header: 'Data',
      },
    ];
  
    return (
      <>
        {loading ? (
          <p>Loading...</p>
        ) : (
          logs && logs.logs.length > 0 ? (
            <MaterialReactTable columns={columns} data={logs.logs} />
          ) : (
            <p>No data available</p>
          )
        )}
      </>
      );
  };
  
  export default LogTable;