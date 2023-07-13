import React from 'react';
import moreVert from '../../assets/icon/moreVert.png';
// import Switch from '../switch/Switch';

import './rulelist.css'

const RuleList = ({ rules, toggleSwitch, showActions, deleteRule, editRule, toggleDetails }) => {
  return (
    <div>
      {rules.map((rule) => (
        <div className='RuleSetting' key={rule.id}>
          <div className='RuleName'>
            <p className='Name'>{rule.name}</p>
          </div>
          <div className='RuleDescription'>
            <p>{rule.description}</p>
          </div>
          <label className='RuleSwitch'>
            <input
              type="checkbox"
              checked={rule.enabled}
              onChange={() => toggleSwitch(rule.id)}
            />
            {rule.enabled ? 'Enabled' : 'Disabled'}
            {/* <Switch
                isOn={rule.enabled}
                onColor='#9e30f4'
                handleToggle={() => toggleSwitch(rule.id)}
            /> */}
          </label>
          <div className='RuleToggleActions'>
            <button className='ButtonMoreVert' onClick={() => showActions(rule.id)}>
              <img className='ImgMoreVert' src={moreVert} alt='더보기'></img>
            </button>
          </div>
          {rule.showActions && (
            <div className='RuleActions'>
              <button className='bottomButton' style={{ width: '80px', height: '50px' }} onClick={() => deleteRule(rule.id)}>삭제</button>
              <button className='bottomButton' style={{ width: '80px', height: '50px' }} onClick={() => editRule(rule.id)}>수정</button>
              <button className='bottomButton' style={{ width: '100px', height: '50px' }} onClick={() => toggleDetails(rule.id)}>상세보기</button>
            </div>
          )}
          <div className={`RuleDetails ${rule.showDetails ? '' : 'hidden'}`}> 
            {rule.showDetails && (
              <div className='RuleDetailsContent'>
                <p style={{fontWeight:'bold'}}>규칙 상세 정보</p>
                <p>이름: {rule.name}</p>
                <p>유형: {rule.type === 0 ? '문자열 차단' : rule.type === 1 ? 'IP 차단' : '알 수 없음'}</p>
                <p>{rule.type===0?'문자열':rule.type===1?'IP':'없음'}: {rule.pattern.replace(/\|/g, ', ')}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RuleList;