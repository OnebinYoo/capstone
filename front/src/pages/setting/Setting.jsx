//Setting.jsx

import React, { useState, useEffect } from 'react';
//import json from 'react-router-dom';
import axios from 'axios';

import './setting.css'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Switch from '../../components/switch/Switch';

const GetSecurity = () => {
    const [data, setData] = useState([]);
    const [value, setValue] =  useState(false);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/security-rules');
          const securityRules = response.data.security_rules;
            setData(securityRules)
          securityRules.forEach((rule) => {
            // console.log('ID:', rule.id);
            // console.log('Name:', rule.name);
            // console.log('Description:', rule.description);
            // console.log('Enabled:', rule.enabled);
            // console.log('------------------------');
          });
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  
    return  (
      <div className='Wrap'>
        <div className='Header'>
          <Topbar />
        </div>
        <div className='Container'>
          <div className='Root'>
            <div className='ColumnLeft'>
              <Sidebar />
            </div>
            <div className='ColumnRight'>
              <div>
                {console.log(data)}
                {data.map(d => (
                  <div key={d.id} to={`${d.id}`}>
                      <p>{d.id}</p>
                      <p>{d.name}</p>
                      <p>{d.description}</p>
                      <button > 
                          {d.enabled ? '활성화' : '비활성화'}
                      </button>
                  </div>
                ))}
              </div>
              <div className='RuleSetting'>
                <div className='RuleSettingLeft'>
                  <p style={{fontSize: '32px', margin: '10px 0px 0px 0px'}}>Rule1</p>
                  <br/>
                  <p style={{margin: '10px 0px 10px 0px'}}>description</p>
                </div>
                <div className='RuleSettingSwitch'>
                  <Switch
                    isOn={value}
                    onColor="#9e30f4"
                    handleToggle={() => setValue(!value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
  
export default GetSecurity;