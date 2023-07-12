import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, update, remove } from 'firebase/database';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import RuleList from '../../components/rulelist/RuleList';
import Alert from '../../components/alert/Alert';

// import './setting.css';

const Setting = () => {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [showAlert, setShowAlert] = useState(false); 

  useEffect(() => {
    fetch('https://capstone-dab03-default-rtdb.asia-southeast1.firebasedatabase.app/rule.json')
      .then((response) => response.json())
      .then((data) => {
        const ruleArray = Object.values(data);
        setRules(ruleArray);
      })
      .catch((error) => {
        console.error('Error fetching rules:', error);
      });
  }, []);

  const toggleSwitch = async (ruleId) => {
    try {
      const database = getDatabase();
      const ruleRef = ref(database, `rule/${ruleId}`);
      const updatedData = {
        enabled: !rules.find((rule) => rule.id === ruleId).enabled,
      };
      await update(ruleRef, updatedData);
      console.log('스위치를 Firebase에 업데이트했습니다.');
  
      const updatedRules = rules.map((rule) => {
        if (rule.id === ruleId) {
          return {
            ...rule,
            enabled: updatedData.enabled,
          };
        }
        return rule;
      });
      setRules(updatedRules);
    } catch (error) {
      console.error('Error updating switch:', error);
    }
  };
  

  const showActions = (ruleId) => {
    setRules((prevRules) => {
      return prevRules.map((rule) => {
        if (rule.id === ruleId) {
          return {
            ...rule,
            showActions: !rule.showActions,
          };
        }
        return rule;
      });
    });
  };

  const deleteRule = async (ruleId) => {
    setSelectedRule(rules.find((rule) => rule.id === ruleId));
    setShowAlert(true);
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  // 알림 창에서 삭제 버튼 클릭 시 규칙 삭제
  const handleDelete = async () => {
    try {
      const database = getDatabase();
      const ruleRef = ref(database, `rule/${selectedRule.id}`);
      await remove(ruleRef);
  
      const updatedRules = rules.filter((rule) => rule.id !== selectedRule.id);
      setRules(updatedRules);
      setShowAlert(false);
    } catch (error) {
      console.error('Error deleting rule:', error);
    }
  };

  const editRule = (ruleId) => {
    console.log('Edit rule:', ruleId);
  };

  const viewDetails = (ruleId) => {
    console.log('View details for rule:', ruleId);
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
            <RuleList
              rules={rules}
              toggleSwitch={toggleSwitch}
              showActions={showActions}
              deleteRule={deleteRule}
              editRule={editRule}
              viewDetails={viewDetails}
            />
            {showAlert && (
              <Alert
                ruleName={selectedRule ? selectedRule.name : ''}
                onCancel={handleCancel}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;