import React from "react";
import "./Modal.css";

const Modal = ({ winner, onRestart, playerFigure, botFigure, drawStatus }) => {
  const getTitle = () => {
    if (winner === playerFigure) return "Ты победил! 🎉";
    if (winner === botFigure) return "Бот победил 🤖";
    if (winner === drawStatus) return "Ничья!";
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{getTitle()}</h2>
        <button onClick={onRestart}>Играть снова</button>
      </div>
    </div>
  );
};

export default Modal;
