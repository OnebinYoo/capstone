import React, { useState, useEffect } from 'react';
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
        const response = await axios.get('http://localhost:8000/security-rules');
        const securityRules = response.data.security_rules;
        setData(securityRules);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const toggleSecurityRule = (ruleId) => {
    const updatedData = data.map(rule => {
      if (rule.id === ruleId) {
        const enabled = !rule.enabled;
        return { ...rule, enabled: enabled };
      }
      return rule;
    });
  
    axios.put(`http://localhost:8000/security-rules/`, {
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
              {data.map(d => (
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
                      handleToggle={() => toggleSecurityRule(d.id, d.enabled)}
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
