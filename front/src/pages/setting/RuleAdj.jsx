import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateItemInFirebase } from '../../firebase';

import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import LoginError from '../../components/Alertbar/LoginError';
import './setting.css';

import add from '../../assets/icon/add.png';
import close from '../../assets/icon/close.png';
import chevronLeft from '../../assets/icon/chevronLeft.png';
import { getDatabase, onValue, ref } from 'firebase/database';

function RuleAdj() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const ruleId = searchParams.get('id');
  const database = getDatabase();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pattern, setPattern] = useState('');
  const [type, setType] = useState(0);
  const [blockedItems, setBlockedItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (ruleId) {
      const ruleRef = ref(database, `rule/${ruleId}`);
      onValue(ruleRef, (snapshot) => {
        const fetchedRule = snapshot.val();
        if (fetchedRule) {
          setName(fetchedRule.name);
          setDescription(fetchedRule.description);
          setType(fetchedRule.type);
          setBlockedItems(fetchedRule.pattern.split('|'));
        }
      });
    }
  }, [ruleId, database]);

  const handleUpdateButtonClick = () => {
    if (!name || !description || blockedItems.length === 0) {
      setErrorMessage('입력된 값이 없습니다.');
      return;
    }
    
    let transformedItems = blockedItems.map((item) => item);
    
    if (type === 0) {
      transformedItems = blockedItems.map((item) => `(?im)^(?=.*\\b${item}\\b).*`);
    }
    
    const concatenatedItems = transformedItems.join('|');
  
    const updatedItem = {
      description,
      enabled: true,
      name,
      pattern: concatenatedItems,
      type,
    };
  
    if (ruleId) {
      
      const updatedItemWithId = {
        ...updatedItem,
        id: ruleId,
      };

      updateItemInFirebase(ruleId, updatedItemWithId)
        .then(() => {
          console.log('데이터를 Firebase Realtime Database에서 수정했습니다.');
          window.location.href = '/setting';
        })
        .catch(() => {
          setErrorMessage('데이터 수정 중 오류가 발생했습니다.');
        });
    }
  };
  
  const handleAddItem = () => {
    if (pattern.trim() !== '') {
      if (!blockedItems.includes(pattern) && blockedItems.length < 5) {
        setBlockedItems([...blockedItems, pattern]);
      }
      setPattern('');
    }
  };  
  
  const handleRemoveItem = (index) => {
    const updatedItems = [...blockedItems];
    updatedItems.splice(index, 1);
    setBlockedItems(updatedItems);
  };

  const getTypeLabel = (type) => {
    if (type === 0) {
      return '문자열 차단';
    } else if (type === 1) {
      return 'IP 차단';
    }
    return '';
  };

  const PreviousPage = () => {
    navigate('/setting');
  }

  return (
    <div className="Wrap">
      <div className="Header">
        <Topbar />
      </div>
      <div className="Container">
        <div className="Root">
          <div className="ColumnLeft">
            <Sidebar />
          </div>
          <div className="ColumnRight">
            <div>
              <div className="RuleAddWrap">
                <button className='PreviousPage' onClick={PreviousPage}>
                  <img className='PreviousPageImg' src={chevronLeft} alt='이전화살표'/>
                  <div className='PreviousPageText'>
                    목록
                  </div>
                </button>
                <div className='RuleAddTitle'>
                  규칙 수정
                </div>
                <div className="inputTitle" style={{ padding: '0' }}>
                  <label htmlFor="type">규칙 유형</label>
                </div>
                <div style={{ padding: '10px 0 15px 0' }}>
                  {getTypeLabel(type)}
                </div>
                <div className="inputTitle">
                  <label htmlFor="name">규칙 이름</label>
                  <div className="inputWrap">
                    <input
                      className="input"
                      type="text"
                      placeholder="규칙 이름을 입력해 주세요"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="inputTitle">
                  <label htmlFor="description">규칙 설명</label>
                  <div
                    className="inputWrap"
                    style={{ minHeight: '42px', maxHeight: '12em', overflow: 'auto' }}
                  >
                    <textarea
                      className="description-textarea"
                      type="text"
                      rows={1}
                      placeholder="규칙 설명을 입력해 주세요"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="inputTitle">
                  <label htmlFor="description">{type === 0 ? '차단할 문자열 (최대 5개)' : '차단할 IP (최대 5개)'}</label>
                  <div className="inputWrap">
                    <input
                      className="input"
                      type="text"
                      placeholder={
                        type === 0 ? '차단할 문자열을 입력해 주세요' : '차단할 IP를 입력해 주세요'
                      }
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddItem();
                        }
                      }}
                    />
                    <button className="ItemAddButton" onClick={handleAddItem}>
                      <img className="ImgAdd" src={add} alt="추가" />
                    </button>
                  </div>
                  <div className="blockedItems">
                  {blockedItems.map((item, index) => (
                    <div className='blockedItem' key={index}>
                      <span className="blockedItemContent">
                        {item}
                        <button className='RemoveButton' onClick={() => handleRemoveItem(index)}>
                            <img className='ImgRemove' src={close} alt='삭제'/>
                          </button>
                      </span>
                    </div>
                  ))}
                  </div>
                </div>

                {errorMessage && <LoginError message={errorMessage}/>}

                <div className='AddButton'>
                  <button
                    className="bottomButton"
                    onClick={handleUpdateButtonClick}
                    style={{ width: '200px', height: '50px' }}
                  >
                  수정
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RuleAdj;