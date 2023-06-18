import React, { useState, useEffect } from 'react';
import './chart.css';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function Chart({ title, dataKey, grid }) {
  const [chartData, setChartData] = useState([]);
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

    const interval = setInterval(() => {
      fetchLogs();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const generateData = (prevData) => {
      const newData = [...prevData];
      const logValue = logs.logs ? logs.logs.length : logs;
      const currentTime = new Date().toLocaleTimeString();

      if (newData.length >= 10) {
        newData.shift();
      }

      newData.push({ name: currentTime, [dataKey]: logValue });
      return newData;
    };

    const interval = setInterval(() => {
      setChartData(prevData => generateData(prevData));
    }, 5000);

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