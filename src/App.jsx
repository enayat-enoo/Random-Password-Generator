import React, { useCallback, useEffect, useState, useRef } from 'react';

const PasswordGenerator = () => {

  const [length, setLength]=useState(8);
  const [charAllowed, setCharAllowed]=useState(false);
  const [numbersAllowed, setNumbersAllowed]=useState(false);
  const [password, setPassword]=useState('');

  const lengthRef=useRef(null);
  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(charAllowed) str+="!@~$%^&*()";
    if(numbersAllowed) str+="123456789";
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char);
    }
    setPassword(pass);
  },[length,charAllowed,numbersAllowed,setPassword])
  const copyPassword=()=>{
    navigator.clipboard.writeText(password);
    lengthRef.current?.select();
  }
  useEffect(()=>{
    passwordGenerator();
  },[length,charAllowed,numbersAllowed])
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Password Generator</h2>

      <div className="mb-6">
        <input 
          type="text" 
          id="generated-password" 
          readOnly 
          placeholder="Generated Password" 
          className="w-full p-4 text-center text-lg border-2 border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none cursor-not-allowed"
          value={password}
          ref={lengthRef}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-2">
          Password Length: {length}
        </label>
        <input 
          type="range" 
          id="length" 
          min="8" 
          max="20" 
          className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none"
          onChange={(e)=>setLength(e.target.value)}
        />
      </div>

      <div className="mb-6 space-y-3">
        <label className="flex items-center space-x-2 text-sm text-gray-700">
          <input type="checkbox" id="include-numbers" className="text-blue-500" 
          onChange={()=>{
            setNumbersAllowed((prev)=>!prev)
          }}/>
          <span>Include Numbers</span>
        </label>
        
        <label className="flex items-center space-x-2 text-sm text-gray-700">
          <input type="checkbox" id="include-special" className="text-blue-500"
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }} />
          <span>Include Special Characters</span>
        </label>
      </div>

      <div className="flex space-x-4">
        <button 
          id="generate-btn" 
          className="w-full py-3 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
        <button 
          id="copy-btn" 
          className="w-full py-3 px-4 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={copyPassword}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
