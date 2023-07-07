import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addItemToFirebase } from '../../firebase';

import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';

function RuleAdd() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pattern, setPattern] = useState('');
  const [type, setType] = useState(0); // Added state for type selection

  const handleAddButtonClick = () => {
    const newItem = {
      description,
      enabled: true,
      name,
      pattern,
      type,
    };

    addItemToFirebase(newItem)
      .then(() => {
        console.log('데이터를 Firebase Realtime Database에 추가했습니다.');
        setName('');
        setDescription('');
        setPattern('');
        window.location.href = '/setting';
      })
      .catch((error) => {
        console.error('데이터 추가 중 오류가 발생했습니다.', error);
      });
  };

  const handleTypeChange = (event) => {
    setType(parseInt(event.target.value));
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
              <select value={type} onChange={handleTypeChange}>
                <option value={0}>문자열 차단</option>
                <option value={1}>IP 차단</option>
              </select>
              <input
                type="text"
                placeholder="규칙 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="규칙 설명"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder={type === 0 ? "차단할 문자열을 입력해 주세요" : "차단할 IP를 입력해 주세요"}
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              />
              <button onClick={handleAddButtonClick}>추가</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RuleAdd;
