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


