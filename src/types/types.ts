/** Фигуры на поле */
export type Figure = 'X' | 'O';

/** Значение ячейки — X, O или пустая */
export type CellValue = Figure | null;

/** Роли игроков */
export type PlayerRole = 'human' | 'bot';

/** Результат игры */
export type GameResult = Figure | 'draw';

/** Пропсы для клетки */
export interface CellProps {
  value: CellValue;
  onClick: () => void;
  onAnimationComplete: () => void;
}

/** Пропсы для модального окна */
export interface ModalProps {
  winner: GameResult;
  onRestart: () => void;
  playerFigure: Figure;
  botFigure: Figure;
  drawStatus: GameResult;
}

/** Сопоставление ролей и фигур */
export type RoleToFigureMap = Record<PlayerRole, Figure>;

export interface BoardProps {
  figureMap: RoleToFigureMap;
}

export interface FigureSelectorProps {
  onSelect: (figure: 'X' | 'O') => void;
}
