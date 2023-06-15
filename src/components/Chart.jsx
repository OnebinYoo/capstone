import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Client IP</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.Id}>
            <td>{item.Id}</td>
            <td>{item.Date}</td>
            <td>{item.ClientIP}</td>
            <td>{item.Type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const socket = io('http://192.168.3.4'); // 웹 소켓 서버에 연결

    socket.on('json-data', (data) => {
      setJsonData(data); // 받은 데이터 업데이트
    });

    return () => {
      socket.disconnect(); // 컴포넌트가 언마운트될 때 웹 소켓 연결 해제
    };
  }, []);

  return (
    <div>
      <h1>JSON Data Table</h1>
      <Table data={jsonData} />
    </div>
  );
};

export default App;