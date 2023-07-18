import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, update, remove } from 'firebase/database';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import RuleList from '../../components/rulelist/RuleList';
import Alert from '../../components/alert/Alert';
import expandmore from '../../assets/icon/expandMore.png';
import expandless from '../../assets/icon/expandLess.png';
import './setting.css';

const Setting = () => {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [filterType, setFilterType] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterText, setFilterText] = useState('모든 규칙');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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

  const getFilteredRules = () => {
    if (filterType === 0) {
      return rules.filter((rule) => rule.type === 0);
    } else if (filterType === 1) {
      return rules.filter((rule) => rule.type === 1);
    }
    return rules;
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleFilterClick = (filterType) => {
    setSelectedFilter(filterType);
    setFilterType(filterType);
    setShowFilterDropdown(false);
  
    if (filterType === 0) {
      setFilterText('문자열 차단');
    } else if (filterType === 1) {
      setFilterText('IP 차단');
    } else {
      setFilterText('모든 규칙');
    }
  };

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
            showDetails: false,
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
    navigate(`/setting/ruleadj?id=${ruleId}`);
  };

  const toggleDetails = (ruleId) => {
    const updatedRules = rules.map((rule) => {
      if (rule.id === ruleId) {
        return {
          ...rule,
          showDetails: !rule.showDetails,
        };
      }
      return rule;
    });
    setRules(updatedRules);
  };

  const ClickedRuleAdd = () => {
    navigate('/setting/ruleadd');
  }

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
            <div className='Info'>
              <div className='Info-Name'>
                설정
              </div>
              <div className='Info-Setbar'>
                <button className='Info-Setbar-AddButton' onClick={ClickedRuleAdd}>규칙 추가</button>
                <div className={`Info-Setbar-FilterDropdown ${showFilterDropdown ? 'show' : ''}`} ref={dropdownRef}>
                  <button className='Info-Setbar-FilterDropdownButton' onClick={toggleFilterDropdown}>
                    <div className='FilterDropdownButton-inner'>
                      <div className='FilterDropdownButton-innertext'>{filterText}</div>
                      <img className='FilterDropdownButton-innerimg' src={showFilterDropdown ? expandless : expandmore} alt='필터더보기'/>
                    </div>
                  </button>
                  {showFilterDropdown && (
                    <ul className='FilterOptions'>
                      <li
                        className={selectedFilter === 0 ? 'active' : ''}
                        onClick={() => handleFilterClick(0)}
                      >
                        문자열 차단
                      </li>
                      <li
                        className={selectedFilter === 1 ? 'active' : ''}
                        onClick={() => handleFilterClick(1)}
                      >
                        IP 차단
                      </li>
                      <li
                        className={selectedFilter === null ? 'active' : ''}
                        onClick={() => handleFilterClick(null)}
                      >
                        모든 규칙
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <RuleList
              rules={getFilteredRules()}
              toggleSwitch={toggleSwitch}
              showActions={showActions}
              deleteRule={deleteRule}
              editRule={editRule}
              toggleDetails={toggleDetails}
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