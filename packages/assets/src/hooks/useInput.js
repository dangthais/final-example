import React, {useState} from 'react';
const useInput = (initialValue = {}) => {
  const [input, setInput] = useState(initialValue);
  const handleChangeInput = (key, value) => {
    return setInput(prev => ({...prev, [key]: value}));
  };
  return {input, handleChangeInput};
};
export default useInput;
