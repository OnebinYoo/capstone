import React, { useState, useEffect } from 'react';
import { Link, json } from 'react-router-dom';
import axios from 'axios';

import './log.css'

const GetLog = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/log-data');
          const logData = response.data.log_data;
            setData(logData)
         afterRequest.forEach((response) => {
            console.log('status_code:', response.status_code);
            console.log('headers:', response.headers);
            console.log('data:', response.data);
            console.log('------------------------');
          });
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  
    return  (
    <div className='log'>
        {console.log(data)}
        {data.map(d => (
                <div key={d.id} to={`${d.id}`}>
                    <p>{d.status_code}</p>
                    <p>{d.headers}</p>
                    <p>{d.data}</p>
                </div>
            ))}   
         </div>
         );
  };
  
  export default GetLog;