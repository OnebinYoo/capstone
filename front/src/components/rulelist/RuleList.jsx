import React from 'react';
import Switch from '@mui/material/Switch';
import moreVert from '../../assets/icon/moreVert.png';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './rulelist.css'

const RuleSwitch = styled(Switch)(({ theme }) => ({
  width: '56px',
  height: '34px',
  padding: 0,
  margin: 0,
  overflow: 'hidden',
  '& .MuiSwitch-switchBase': {
    padding: '6px',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(calc(56px - 22px - 6px * 2))',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 'none',
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: '#fff',
      },
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: '40px',
    border: `solid ${theme.palette.grey[400]}`,
    borderWidth: '2px',
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
    boxSizing: 'border-box',
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    backgroundColor: theme.palette.grey[400],
    width: '22px',
    height: '22px',
  },
  '& .MuiSwitch-checked': {},
}));

const RuleList = ({ rules, toggleSwitch, showActions, deleteRule, editRule, toggleDetails }) => {

  const getFormattedPattern = (pattern, type) => {
    if (type === 0) {
      const extractedItems = pattern.match(/(?<=\b)(\w+)(?=\b)/g);
      if (extractedItems) {
        const formattedItems = [];
        for (let i = 0; i < extractedItems.length - 1; i++) {
          if (extractedItems[i] === 'im') {
            formattedItems.push(extractedItems[i + 1]);
          }
        }
        return formattedItems.join(', ');
      }
    } else if (type === 1) {
      return pattern.replace(/\|/g, ', ');
    }
    return pattern;
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#9e30f4',
      },
    },
  });
  
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
          <ThemeProvider theme={theme}>
            <label className='RuleSwitch'>
              <RuleSwitch
                checked={rule.enabled}
                onChange={() => toggleSwitch(rule.id)}
              />
            </label>
          </ThemeProvider>
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
                <p>{rule.type===0?'문자열':rule.type===1?'IP':'없음'}: {getFormattedPattern(rule.pattern, rule.type)}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RuleList;