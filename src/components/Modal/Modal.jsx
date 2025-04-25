import React from "react";
import "./Modal.css";

const Modal = ({ winner, onRestart }) => {
  const getTitle = () => {
    if (winner === "draw") return "Ничья!";
    if (winner === "X") return "Ты победил! 🎉";
    if (winner === "O") return "Бот победил 🤖";
    return "";
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
