import React, { useEffect, useRef } from 'react';

const MAX_CHAR_LIMIT = 200;

const TextArea = ({ value, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleTextareaChange = (e) => {
    const inputValue = e.target.value;
    // 최대 글자 수를 초과 시 입력을 막음
    if (inputValue.length > MAX_CHAR_LIMIT) {
      e.target.value = inputValue.substring(0, MAX_CHAR_LIMIT);
    }
    onChange(e.target.value);
    // textarea의 높이를 자동 조절
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  return (
    <textarea
      className="description-textarea"
      type="text"
      placeholder="규칙 설명을 입력해 주세요"
      value={value}
      onInput={handleTextareaChange}
      ref={textareaRef}
      rows={1}
    />
  );
};

export default TextArea;