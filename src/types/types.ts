/**
 * Возможные фигуры игроков на поле
 */
export enum GameFigure {
  X = 'X',
  O = '0',
}

/**
 * Пустое значение поля
 */
export type GameEmpty = null;

/**
 * Значение ячейки на полк (X, O или пусто).
 * @typedef {('X' | 'O' | null)}
 */
export type BoardValue = GameFigure | GameEmpty;

/**
 * Значение, представляющее ничью в игре
 */
export enum DrawResult {
  DRAW_RESULT = 'draw'
}
/**
 * Тип игрового поля
 */
export type Board = Array<BoardValue>;

/**
 * Тип, представляющий результат игры.
 * Может быть игроком (X или O) или значением "draw" для ничьей.
 * @typedef {BoardValue | 'draw'} GameResult
 */
export type GameResult = GameFigure | DrawResult;

/**
 * Интерфейс для пропсов компонента клетки на игровом поле.
 * @interface CellProps
 * @property {BoardValue} value Текущее значение клетки (X, O или null).
 * @property {() => void} onClick Функция для обработки клика на клетке.
 */
// export interface CellProps {
//   value: BoardValue;
//   onClick: VoidFunction;
//   onAnimationComplete: VoidFunction;
// }
export interface CellProps {
  value: BoardValue;
  handleEvent: VoidFunction
}

/**
 * Интерфейс для пропсов компонента модального окна.
 * @type ModalProps
 * @property {GameResult} winner Результат игры (победитель или ничья).
 * @property {() => void} onRestart Функция для перезапуска игры.
 * @property {GameFigure} playerFigure Фигура игрока (X или O).
 */
export type ModalProps = {
  winner: GameResult;
  onRestart: VoidFunction;
  playerFigure: GameFigure;
}
