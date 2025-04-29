import React from "react";
import Board from "./components/GameBoard/Board";
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <header>Tic Tac Toe</header>
      <main>
        <Board />
      </main>
    </>
  );
};

export default App;
