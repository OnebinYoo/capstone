import React, { useState, useEffect } from 'react';
import './chart.css';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function Chart({ title, dataKey, grid }) {
  const [chartData, setChartData] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/logs');
        setLogs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } 
    };

    fetchLogs();

    const interval = setInterval(() => {
      fetchLogs();
    }, 3000); // 로그 업데이트 주기 설정

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const generateRandomData = (prevData) => {
      const newData = [...prevData];
      const newLogs = logs.logs || []; // 새로운 로그 배열

      const newLogsCount = newLogs.length; // 새로운 로그 개수
      const prevLogsCount = prevData.reduce((count, entry) => count + entry[dataKey], 0); // 이전 로그 개수

      const logValue = newLogsCount - prevLogsCount; // 새로운 로그 개수 - 이전 로그 개수
      const currentTime = new Date().toLocaleTimeString();

      if (newData.length >= 10) {
        newData.shift();
      }

      newData.push({ name: currentTime, [dataKey]: logValue });
      return newData;
    };

    const interval = setInterval(() => {
      setChartData((prevData) => generateRandomData(prevData));
    }, 3000); // 차트 업데이트 주기 설정

    return () => clearInterval(interval);
  }, [logs, dataKey]);

  return (
    <div className='chart'>
      <h3 className='chartTitle'>{title}</h3>
      <ResponsiveContainer width='100%' aspect={4 / 1}>
        <LineChart data={chartData}>
          <XAxis dataKey='name' stroke='#5550bd' />
          <Line type='monotone' dataKey={dataKey} stroke='#5550bd' />
          <Tooltip />
          {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray='5 5' />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}