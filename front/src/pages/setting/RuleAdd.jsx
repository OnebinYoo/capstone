import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addItemToFirebase } from '../../firebase';

import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import LoginError from '../../components/Alertbar/LoginError'
import './setting.css';

import add from '../../assets/icon/add.png';
import close from '../../assets/icon/close.png';

function RuleAdd() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pattern, setPattern] = useState('');
  const [type, setType] = useState(0);
  const [blockedItems, setBlockedItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddButtonClick = () => {
    if (!name || !description || blockedItems.length === 0) {
      setErrorMessage('입력된 값이 없습니다.');
      return;
    }
  
    let transformedItems = blockedItems.map((item) => item);
    
    if (type === 0) {
      transformedItems = blockedItems.map((item) => `(?im)^(?=.*\\b${item}\\b).*`);
    }
    
    const concatenatedItems = transformedItems.join('|');
  
    const newItem = {
      description,
      enabled: true,
      name,
      pattern: concatenatedItems,
      type,
    };
  
    addItemToFirebase(newItem)
      .then(() => {
        console.log('데이터를 Firebase Realtime Database에 추가했습니다.');
        setName('');
        setDescription('');
        setBlockedItems([]);
        window.location.href = '/setting';
      })
      .catch((error) => {
        console.error('데이터 추가 중 오류가 발생했습니다.', error);
      });
  };

  const handleTypeChange = (event) => {
    setType(parseInt(event.target.value));
    setBlockedItems([]);
  };

  const handleAddItem = () => {
    if (pattern.trim() !== '') {
      if (!blockedItems.includes(pattern)) {
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
              <Link to="/setting">&lt; 목록</Link>
              <h1>규칙 추가</h1>
              <div className='RuleAddWrap'>
                <div className='inputTitle' style={{padding:'0'}}>
                  <label htmlFor="type">규칙 유형</label>
                </div>
                <div style={{padding:'10px 0 15px 0'}}>
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
                <div className='inputTitle'>
                  <label htmlFor="description">규칙 설명</label>
                  <div className='inputWrap'>
                  <textarea
                    className="description-textarea"
                    type="text"
                    placeholder="규칙 설명을 입력해 주세요"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ minHeight: '42px', maxHeight: '12em', height: 'auto' }}
                    rows={Math.min(10, description.split('\n').length)}
                  />
                  </div>
                </div>
                <div className='inputTitle'>
                  <label htmlFor="description">{type === 0 ? "차단할 문자열" : "차단할 IP"}</label>
                  <div className='inputWrap' style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      className='input'
                      type="text"
                      placeholder={type === 0 ? "차단할 문자열을 입력해 주세요" : "차단할 IP를 입력해 주세요"}
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddItem();
                        }
                      }}
                    />
                    <button className='ItemAddButton' onClick={handleAddItem}>
                      <img className='ImgAdd' src={add} alt='추가'/>
                    </button>
                  </div>
                  <div className='blockedItems'>
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
                    className='bottomButton'
                    onClick={handleAddButtonClick}
                    style={{width:'100%', height:'50px'}}
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