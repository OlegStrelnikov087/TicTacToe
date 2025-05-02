/**
 * Тип, представляющий игрока в игре (X, O или пусто).
 * 
 * @typedef {('X' | 'O' | null)} Player
 */
export type Player = 'X' | 'O' | null;

/**
 * Тип, представляющий результат игры.
 * Может быть игроком (X или O) или значением "draw" для ничьей.
 * 
 * @typedef {Player | 'draw'} GameResult
 */
export type GameResult = Player | 'draw';

/**
 * Интерфейс для пропсов компонента клетки на игровом поле.
 * 
 * @interface CellProps
 * @property {Player} value Текущее значение клетки (X, O или null).
 * @property {() => void} onClick Функция для обработки клика на клетке.
 */
export interface CellProps {
  value: Player;
  onClick: () => void;
  onAnimationComplete: ()=> void
}

/**
 * Интерфейс для пропсов компонента модального окна.
 * 
 * @interface ModalProps
 * @property {GameResult} winner Результат игры (победитель или ничья).
 * @property {() => void} onRestart Функция для перезапуска игры.
 * @property {Player} playerFigure Фигура игрока (X или O).
 * @property {Player} botFigure Фигура бота (X или O).
 * @property {GameResult} drawStatus Статус ничьей (если таковая имеется).
 */
export interface ModalProps {
  winner: GameResult;
  onRestart: () => void;
  playerFigure: Player;
  botFigure: Player;
  drawStatus: GameResult;
}
