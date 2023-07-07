import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './setting.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Switch from '../../components/switch/Switch';

const GetSecurity = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://capstone-dab03-default-rtdb.asia-southeast1.firebasedatabase.app/rule.json');
        const securityRules = response.data;
        const rulesArray = Object.values(securityRules); // 객체를 배열로 변환
        setData(rulesArray || []);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };
  
    fetchData();
  }, []);
  
  
  

  const toggleSecurityRule = (ruleId) => {
    const updatedData = data.map(rule => {
      if (rule.id === ruleId) {
        const newEnabled = !rule.enabled;
        return { ...rule, enabled: newEnabled };
      }
      return rule;
    });

    axios.put(`https://capstone-dab03-default-rtdb.asia-southeast1.firebasedatabase.app/rule/${ruleId}.json`, {
      enabled: updatedData.find(rule => rule.id === ruleId).enabled
    })
      .then(response => {
        console.log(response.data);
        setData(updatedData);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
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
              <Link to='/ruleadd'>추가</Link>
            </div>
            <div>
              {data.map(d => ( //데이터 null 일때(rule이 하나도 없을때)에 대한 예외 처리가 필요함 ==> 아직 작업 안함
                <div className='RuleSetting' key={d.id}>
                  <div className='RuleId'>
                    <p className='Name'>{d.name}</p>
                  </div>
                  <div className='RuleDescription'>
                    <p>{d.description}</p>
                  </div>
                  <div className='RuleSwitch'>
                    <Switch
                      isOn={d.enabled}
                      onColor='#9e30f4'
                      handleToggle={() => toggleSecurityRule(d.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetSecurity;
