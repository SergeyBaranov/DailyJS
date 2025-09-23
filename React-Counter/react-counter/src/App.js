import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  // let count = 0;
  const [count, setCount] = useState(0);

  const onClickPlus = () => {
    setCount(count + 1);
  }

  const onClickMinus = () => {
    setCount(count - 1);
  }

  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <button className="minus" onClick={onClickMinus}>Минус</button>
        <button className="plus" onClick={onClickPlus}>Плюс</button>
      </div>
    </div>
  );
}

export default App;
