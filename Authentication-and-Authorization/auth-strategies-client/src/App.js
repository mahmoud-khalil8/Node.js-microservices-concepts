import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from "axios";
function App() {
  const [name, setName] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="http://localhost:5000/auth/google">sign in  with google</a>
        <button onclick={async ()=>{
          const result = await axios.get('http://localhost:5001/greeting',{
            withCredentials:true
          });
          setName(result.data.fullName)
        }}>Great Me Please</button>
        {name && <span>{`hi ${name}`}</span>}
      </header>
    </div>
  );
}

export default App;
