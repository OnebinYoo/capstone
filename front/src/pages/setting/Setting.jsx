import React, { useState, useEffect } from 'react';
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
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);

    const toggleSecurityRule = (ruleId, enabled) => {
      const updatedData = data.map(rule => {
        if (rule.id === ruleId) {
          return { ...rule, enabled: !enabled };
        }
        return rule;
      });
  
      axios.put('http://localhost:8000/security-rules', {
        rule_id: ruleId,
        enabled: !enabled
      })
        .then(response => {
          console.log(response.data);
          setData(updatedData);
        })
        .catch(error => {
          console.error(error);
        });
    };
  
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
                    <div className='SecurityRuleContent' >
                      <p className='Name'>{d.name}</p>
                      <p>{d.description}</p>
                      <button onClick={() => toggleSecurityRule(d.id, d.enabled)}> 
                          {d.enabled ? '활성화' : '비활성화'}
                      </button>
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