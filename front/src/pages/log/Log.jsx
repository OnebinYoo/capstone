import React, { useState, useEffect } from 'react';
// import { Link, json } from 'react-router-dom';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';

import './log.css'

// export default function Log() {
//     return <div className='setting'>
//         설정
//     </div>
// }
// const GetLog = () => {
//     const [data, setData] = useState([]);
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get('http://localhost:8000/logs');
//           const logData = response.data.logs;
//             setData(logData)
//          logData.forEach((response) => {
//             console.log('id:', response.status_code);
//             console.log('status_code:', response.status_code);
//             console.log('headers:', response.headers);
//             console.log('data:', response.data);
//             console.log('------------------------');
//           });
//         } catch (error) {
//           console.error(error);
//         }
//       };
  
//       fetchData();
//     }, []);
  
//     return  (
//     <div className='log'>
//         {data.map((d) => (
//                 <div key={d.id} to={`${d.id}`}>
//                     <p>코드: {d.status_code}</p>
//                     --------------------------------------
//                     <p>헤더: {JSON.stringify(d.headers)}</p>
//                     --------------------------------------
//                     <p>데이터: {JSON.stringify(d.data)}</p>
//                 </div>
//             ))}
//          </div>
//          );
//   };
  
  // export default GetLog;
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