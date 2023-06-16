import React, { useState, useEffect } from 'react';
import './chart.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart({ title, data, dataKey, grid }) {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prevData => generateRandomData(prevData));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateRandomData = (prevData) => {
    const newData = [...prevData];
    const randomValue = Math.floor(Math.random() * 100);
    const currentTime = new Date().toLocaleTimeString();

    if (newData.length >= 10) {
      newData.shift();
    }

    newData.push({ name: currentTime, [dataKey]: randomValue });
    return newData;
  };

  return (
    <div className='chart'>
      <h3 className='chartTitle'>{title}</h3>
      <ResponsiveContainer width='100%' aspect={4 / 1}>
        <LineChart data={chartData}>
          <XAxis dataKey='name' stroke='#5550bd' />
          <Line type='monotone' dataKey={dataKey} />
          <Tooltip />
          {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray='5 5' />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

