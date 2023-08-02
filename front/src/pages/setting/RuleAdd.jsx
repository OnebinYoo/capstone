import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addItemToFirebase } from '../../firebase';

import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import LoginError from '../../components/Alertbar/LoginError';
import TextArea from '../../components/setting/TextArea';
import './setting.css';

import add from '../../assets/icon/add.png';
import close from '../../assets/icon/close.png';
import chevronLeft from '../../assets/icon/chevronLeft.png';

const RuleAdd = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pattern, setPattern] = useState('');
  const [type, setType] = useState(0);
  const [blockedItems, setBlockedItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const MAX_CHAR_LIMIT = 200;

  // type 변경
  const handleTypeChange = (event) => {
    setType(parseInt(event.target.value));
    setBlockedItems([]);
  };

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
      setErrorMessage('숫자 .  /  만 입력할 수 있습니다');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } else {
      setPattern(value);
    }
  };

  // 규칙 추가
  const handleAddButtonClick = () => {
    if (!name || !description || blockedItems.length === 0) {
      setErrorMessage('규칙을 입력해 주세요');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    const newItem = {
      description,
      enabled: true,
      name,
      pattern: blockedItems.join('|'),
      type,
    };
    
    addItemToFirebase(newItem)
      .then(() => {
        setName('');
        setDescription('');
        setBlockedItems([]);
        navigate('/setting?success=1');
      })
      .catch(() => {
        setErrorMessage('규칙 추가 중 오류가 발생했습니다');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  };

  return (
    <div className='Wrap'>
      <div className='Container'>
        <div className='Root'>
          <div className='Header'>
            <Topbar />
          </div>
          <div className='ColumnLeft'>
            <Sidebar />
          </div>
          <div className='ColumnRight'>
            <div>
              <div className='RuleAddWrap'>
                <button className='PreviousPage' onClick={PreviousPage}>
                  <img className='PreviousPageImg' src={chevronLeft} alt='이전화살표' />
                  <div className='PreviousPageText'>
                    목록
                  </div>
                </button>
                <div className='RuleAddTitle'>
                  규칙 추가
                </div>
                <div className='inputTitle' style={{ padding: '0' }}>
                  <label htmlFor="type">규칙 유형</label>
                </div>
                <div style={{ padding: '10px 0 15px 0' }}>
                  <input type="radio" name="option" value={0} onChange={handleTypeChange} checked={type === 0} /> 문자열 차단
                  <input type="radio" name="option" value={1} onChange={handleTypeChange} checked={type === 1} /> IP 차단
                </div>
                <div className='inputTitle'>
                  <label htmlFor="name">규칙 이름</label>
                  <div className='inputWrap'>
                    <input
                      className='input'
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
                <div className='inputTitle'>
                  <label htmlFor="description">{type === 0 ? "차단할 문자열 (최대 5개)" : "차단할 IP (최대 5개)"}</label>
                  <div className='inputWrap' style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      className='input'
                      type="text"
                      placeholder={type === 0 ? "차단할 문자열을 입력해 주세요" : "차단할 IP를 입력해 주세요"}
                      value={pattern}
                      onChange={handlePatternChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddItem();
                        }
                      }}
                    />
                    <button className='ItemAddButton' onClick={handleAddItem}>
                      <img className='ImgAdd' src={add} alt='추가' />
                    </button>
                  </div>
                  <div className='blockedItems'>
                    {blockedItems.map((item, index) => (
                      <div className='blockedItem' key={index}>
                        <span className="blockedItemContent">
                          {item}
                          <button className='RemoveButton' onClick={() => handleRemoveItem(index)}>
                            <img className='ImgRemove' src={close} alt='삭제' />
                          </button>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {errorMessage && <LoginError message={errorMessage} />}

                <div className='AddButton'>
                  <button
                    className='bottomButton'
                    onClick={handleAddButtonClick}
                    style={{ width: '100%', height: '50px' }}
                  >
                    추가
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

export default RuleAdd;