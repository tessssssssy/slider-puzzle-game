import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board';
import SliderPuzzle from './SliderPuzzle';

function App() {
  return (
    <div className="App">
      {/* <Board cards={16}/> */}
      <SliderPuzzle/>
    </div>
  );
}

export default App;
