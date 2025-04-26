import React from "react";
import Board from "./components/GameBoard/Board";
import './App.css'

const App = () => {
  return (
    <>
      <h1 className="headed">Tic Tac Toe</h1>
      <div className="main">
      <Board />
      </div>
    </>

  )
};

export default App;
