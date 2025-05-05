import { ModalProps } from '@types/types';
import React from 'react';
import './modal.css';
import { getResultGameMessage } from '../../utils/game-logic'

export const Modal: React.FC<ModalProps> = ({
  winner,
  onRestart,
  playerFigure
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{getResultGameMessage(winner, playerFigure)}</h2>
        <button onClick={onRestart}>Играть снова</button>
      </div>
    </div>
  );
};
