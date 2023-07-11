import React, { useState, useEffect } from 'react';
import './chart.css';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Chart({ title }) {
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
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const generateData = () => {
      if (!logs.logs) return [];

      const statusCodes = logs.logs.reduce((acc, log) => {
        if (acc[log.status_code]) {
          acc[log.status_code] += 1;
        } else {
          acc[log.status_code] = 1;
        }
        return acc;
      }, {});

      const newData = Object.entries(statusCodes).map(([name, value]) => ({
        name,
        value,
      }));

      return newData;
    };

    setChartData(generateData());
  }, [logs]);

  return (
    <div className='chart'>
      <h3 className='chartTitle'>{title}</h3>
      <ResponsiveContainer width='100%' aspect={4 / 1}>
        <PieChart>
          <Pie
            data={chartData}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
            nameKey='name'
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
