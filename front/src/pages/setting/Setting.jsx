import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDatabase, ref, update, remove, onValue } from 'firebase/database';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import RuleList from '../../components/rulelist/RuleList';
import Alert from '../../components/alert/Alert';
import SettingSuccess from '../../components/Alertbar/SettingSuccess';
import SettingError from '../../components/Alertbar/SettingError';
import expandmore from '../../assets/icon/expandMore.png';
import expandless from '../../assets/icon/expandLess.png';
import Skeleton from '@mui/material/Skeleton';
import './setting.css';

const Setting = () => {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [filterType, setFilterType] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterText, setFilterText] = useState('모든 규칙');
  const [loading, setLoading] = useState(true);
  const [SuccessMessage, setSuccessMessage] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const location = useLocation();

  // URL 파라미터 처리
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('success') === '1') {
      setSuccessMessage('규칙 추가가 완료되었습니다');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      navigate('/setting');
    } else if (queryParams.get('success') === '2') {
      setSuccessMessage('규칙 수정이 완료되었습니다');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      navigate('/setting');
    }
  }, [location.search, navigate]);

  // 데이터(규칙) 불러오기
  const fetchData = () => {
    const database = getDatabase();
    const ruleRef = ref(database, '/rule');

    const handleDataChange = (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const ruleArray = Object.values(data);
          setRules(ruleArray);
          localStorage.setItem('rules', JSON.stringify(ruleArray));
        }
      } catch (error) {
        setErrorMessage('규칙을 불러오는 중 에러가 발생했습니다');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
      setLoading(false);
    };
    onValue(ruleRef, handleDataChange); // firebase에 관찰자 등록
  };
  useEffect(() => {
    const cachedRules = localStorage.getItem('rules');
    if (cachedRules) {
      setRules(JSON.parse(cachedRules));
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);

  // 캐시 유효성 검사
  useEffect(() => {
    const cachedRules = localStorage.getItem('rules');
    const cachedTimestamp = localStorage.getItem('timestamp');
    const cacheValidityPeriod = 1 * 60 * 1000;
  
    if (cachedRules && cachedTimestamp) {
      const currentTime = new Date().getTime();
      if (currentTime - parseInt(cachedTimestamp) < cacheValidityPeriod) {
        setRules(JSON.parse(cachedRules));
        setLoading(false);
        return;
      }
    }
  
    fetchData();
  }, []);

  // 드롭다운(필터)
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
  const getFilteredRules = () => {
    if (filterType === 0) {
      return rules.filter((rule) => rule.type === 0);
    } else if (filterType === 1) {
      return rules.filter((rule) => rule.type === 1);
    }
    return rules;
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

  // 스위치
  const toggleSwitch = async (ruleId) => {
    try {
      const database = getDatabase();
      const ruleRef = ref(database, `/rule/${ruleId}`);
      const updatedData = {
        enabled: !rules.find((rule) => rule.id === ruleId).enabled,
      };
      await update(ruleRef, updatedData);
  
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
      setErrorMessage('규칙 ON/OFF 중 에러가 발생했습니다');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  // 상세보기
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

  // 규칙 추가
  const ClickedRuleAdd = () => {
    navigate('/setting/ruleadd');
  };

  // 규칙 수정
  const editRule = (ruleId) => {
    navigate(`/setting/ruleadj?id=${ruleId}`);
  };

  // 규칙 삭제
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
      const ruleRef = ref(database, `/rule/${selectedRule.id}`);
      await remove(ruleRef);
  
      const updatedRules = rules.filter((rule) => rule.id !== selectedRule.id);
      setRules(updatedRules);
      setShowAlert(false);
  
      setSuccessMessage('규칙 삭제가 완료되었습니다');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrorMessage('규칙 삭제 중 에러가 발생했습니다');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  // 사이드바 토글
  const [showColumnLeft, setShowColumnLeft] = useState(true);
  const toggleColumnLeft = () => {
    setShowColumnLeft((prev) => !prev);
  };

  return (
    <div className='Wrap'>
      <div className='Container'>
        <div className='Root'>
          <div className='Header'>
            <Topbar toggleColumnLeft={toggleColumnLeft} />
          </div>
          <div className='ColumnWrap'>
            <div className={`ColumnLeft${showColumnLeft ? '' : '-hide'}`}>
              <Sidebar />
            </div>
            <div className={`ColumnRight${showColumnLeft ? '' : '-hide'}`}>
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
              {loading ? (
                <div className='RuleSetting'>
                  <div className='RuleListSkeleton' style={{display: 'flex', alignItems: 'center', height: '112px'}}>
                    <div className='RuleName' style={{ display: 'inline-block', marginRight: '8px' }}>
                      <Skeleton variant="text" height={30} width={150} />
                    </div>
                    <div className='RuleDescription' style={{ display: 'inline-block' }}>
                      <Skeleton variant="text" height={20} width={250} />
                    </div>
                  </div>
                </div>
              ) : (
                <RuleList
                  rules={getFilteredRules()}
                  toggleSwitch={toggleSwitch}
                  showActions={showActions}
                  deleteRule={deleteRule}
                  editRule={editRule}
                  toggleDetails={toggleDetails}
                />
              )}
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
      {SuccessMessage && <SettingSuccess message={SuccessMessage}/>}
      {ErrorMessage && <SettingError message={ErrorMessage}/>}
    </div>
  );
};

export default Setting;