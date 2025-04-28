import React, { useEffect, useState } from "react"
import './Board.css'
import Lottie from "lottie-react"
import gridAnimation from '../../assets/grid.json'
import Modal from "../Modal/Modal";
import Cell from "../Cell/Cell";
import { PLAYER_FIGURE, BOT_FIGURE, BOARD_ARRAY, DRAW_STATUS } from '../../utils/gameConst'
import { checkWinner, isGameOver, restartGame, makeBotMove } from "../../utils/gameController";
function Board() {
  const [board, setBoard] = useState(BOARD_ARRAY)
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const handleClick = (index) => {
    if (!isPlayerTurn || board[index] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = PLAYER_FIGURE;
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const handleRestart = () => {
    restartGame(setBoard, setIsPlayerTurn, setWinner, setShowModal);
  };


  useEffect(() => {
    if (isGameOver(board)) {
      setWinner(checkWinner(board) || DRAW_STATUS);
      setShowModal(true);
      return;
    }

    if (!isPlayerTurn) {
      const timeout = setTimeout(() => makeBotMove(setBoard, setIsPlayerTurn, board), 600);
      return () => clearTimeout(timeout);
    }
  }, [board, isPlayerTurn]);

  return (
    <div className="boardContainer">
      <Lottie animationData={gridAnimation} autoPlay loop={false} />
      <div className="gameBoard">
        {board.map((cell, i) => (
          <Cell key={i} value={cell} onClick={() => handleClick(i)} />
        ))}

      </div>
      {showModal && <Modal
        winner={winner}
        onRestart={handleRestart}
        playerFigure={PLAYER_FIGURE}
        botFigure={BOT_FIGURE}
        drawStatus={DRAW_STATUS}
      />}
    </div>
  )

}

export default Board