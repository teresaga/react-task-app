import React from 'react';
import './App.css';
import { Navbar } from './layouts/Navbar/Navbar';
import { StartNow } from './layouts/HomePage/StartNow';

function App() {
  return (
    <div>
      <Navbar/>
      <StartNow/>
    </div>
  );
}

export default App;
