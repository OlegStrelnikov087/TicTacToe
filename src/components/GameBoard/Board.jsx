import React, { useEffect, useState } from "react"
import './Board.css'
import Lottie from "lottie-react"
import gridAnimation from '../../assets/grid.json'
import Modal from "../Modal/Modal";
import Cell from "../Cell/Cell";


function Board() {
  const PLAYER_FIGURE = 'X'
  const BOT_FIGURE = 'O'
  const [board, setBoard] = useState(Array(9).fill(null))
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const getEmptyCells = (b) => {
    return b.map((v, i) => (v === null ? i : null)).filter((i) => i !== null);
  };

  const handleClick = (index) => {
    if (!isPlayerTurn || board[index] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = PLAYER_FIGURE;
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };


  const botMove = (b) => {
    const empty = getEmptyCells(b);
    if (empty.length === 0) return b;
    const randomIndex = empty[Math.floor(Math.random() * empty.length)];
    const newBoard = [...b];
    newBoard[randomIndex] = BOT_FIGURE;
    return newBoard;
  }

  useEffect(() => {
    const w = checkWinner(board);
    if (w || getEmptyCells(board).length === 0) {
      setWinner(w || "draw");
      setShowModal(true);
    }
  }, [board])

  useEffect(() => {
    if (!isPlayerTurn) {
      const winner = checkWinner(board);
      if (winner || getEmptyCells(board).length === 0) return;

      const timeout = setTimeout(() => {
        const newBoard = botMove(board);
        setBoard(newBoard);
        setIsPlayerTurn(true);
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [board, isPlayerTurn]);

  const checkWinner = (b) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, bIdx, c] of lines) {
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setShowModal(false);
  };


  return (
    <div className="boardContainer">
      <Lottie animationData={gridAnimation} autoPlay loop={false} />
      <div className="gameBoard">
        {board.map((cell, i) => (
          <Cell key={i} value={cell} onClick={() => handleClick(i)} />
        ))}

      </div>
      {showModal && <Modal winner={winner} onRestart={restartGame} />}
    </div>
  )

}

export default Board