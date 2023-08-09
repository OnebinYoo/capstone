import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDatabase, onValue, ref } from 'firebase/database';
import { updateItemInFirebase } from '../../firebase';

import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import LoginError from '../../components/Alertbar/LoginError';
import TextArea from '../../components/setting/TextArea';
import './setting.css';

import add from '../../assets/icon/add.png';
import close from '../../assets/icon/close.png';
import error from '../../assets/icon/error.png';
import chevronLeft from '../../assets/icon/chevronLeft.png';

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
  
  const MAX_CHAR_LIMIT = 200;

  // id기반 규칙 데이터 가져오기
  useEffect(() => {
    if (ruleId) {
      const ruleRef = ref(database, `/rule/${ruleId}`);
      onValue(ruleRef, (snapshot) => {
        const fetchedRule = snapshot.val();
        if (fetchedRule) {
          setName(fetchedRule.name);
          setDescription(fetchedRule.description);
          setType(fetchedRule.type);
          const patternValues = fetchedRule.pattern.split('|');
          setBlockedItems(patternValues);
        }
      });
    }
  }, [ruleId, database]);

  // blockedItems 배열 값 등록/삭제
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
  };

  // 입력값 검증
  const handlePatternChange = (event) => {
    const value = event.target.value;
    const patternRegex1 = /^[0-9./]*$/;
    const patternRegex2 = /\s/g;
  
    if (type === 0 && patternRegex2.test(value)) {
      setErrorMessage('띄어쓰기는 허용되지 않습니다');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } else if (type === 1 && (!patternRegex1.test(value) || patternRegex2.test(value))) {
      setErrorMessage('숫자, ".", "/"만 입력할 수 있습니다');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } else {
      setPattern(value);
    }
  };

  // 수정
  const handleUpdateButtonClick = () => {
    if (!name || !description || blockedItems.length === 0) {
      setErrorMessage('입력된 값이 없습니다.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }
  
    const updatedItem = {
      description,
      enabled: true,
      name,
      pattern: blockedItems.join('|'),
      type,
    };
  
    if (ruleId) {
      const updatedItemWithId = {
        ...updatedItem,
        id: ruleId,
      };
      updateItemInFirebase(ruleId, updatedItemWithId)
        .then(() => {
          navigate('/setting?success=2');
        })
        .catch(() => {
          setErrorMessage('규칙 수정 중 오류가 발생했습니다.');
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        });
    }
  };

  // 사이드바 토글
  const [showColumnLeft, setShowColumnLeft] = useState(true);
  const toggleColumnLeft = () => {
    setShowColumnLeft((prev) => !prev);
  };

  // 이미지 프리로딩
  const ImgPreloader = ({ src, alt }) => (
    <img src={src} alt={alt} style={{ display: 'none' }} />
  )

  return (
    <div className="Wrap">
      <div className="Container">
        <div className="Root">
          <div className="Header">
            <Topbar toggleColumnLeft={toggleColumnLeft} />
          </div>
          <div className={`ColumnLeft${showColumnLeft ? '' : '-hide'}`}>
            <Sidebar />
          </div>
          <div className={`ColumnRight${showColumnLeft ? '' : '-hide'}`}>
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
                  <span id="charCount" className="charCount">
                    ({description.length}/{MAX_CHAR_LIMIT}자 (공백 포함))
                  </span>
                  <div className='textareaWrap'>
                    <TextArea value={description} onChange={setDescription} />
                  </div>
                </div>
                <div className="inputTitle">
                  <label htmlFor="description">
                    {type === 0 ? '차단할 문자열 (최대 5개)' : '차단할 IP (최대 5개)'}
                  </label>
                  <div className="inputWrap">
                    <input
                      className="input"
                      type="text"
                      placeholder={
                        type === 0 ? '차단할 문자열을 입력해 주세요' : '차단할 IP를 입력해 주세요'
                      }
                      value={pattern}
                      onChange={handlePatternChange}
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
                          <button className="RemoveButton" onClick={() => handleRemoveItem(index)}>
                            <img className="ImgRemove" src={close} alt="삭제" />
                          </button>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {errorMessage && <LoginError message={errorMessage} />}
                <div className='AddButton'>
                  <button
                    className="bottomButton"
                    onClick={handleUpdateButtonClick}
                    style={{ width: '100%', height: '50px' }}
                  >
                  수정
                  </button>
                </div>
              </div>
            </div>
            <ImgPreloader src={error} alt='에러아이콘'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RuleAdj;