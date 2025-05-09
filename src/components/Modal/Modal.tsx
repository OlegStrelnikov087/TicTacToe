import React, { ReactNode } from 'react';
import './modal.css';

type ModalProps = {
  content: ReactNode;
  playAgainButtonText: string;
  onClose: VoidFunction;
}

export const Modal: React.FC<ModalProps> = ({
  content,
  playAgainButtonText: playAgainButtonText,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        {content}
        <button onClick={onClose}>{playAgainButtonText}</button>
      </div>
    </div>
  );
};
