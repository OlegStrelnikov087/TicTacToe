/**
 * Возможные фигуры игроков на поле
 */
export enum GameFigure {
  X = 'X',
  O = '0',
}

export enum GameRole {
  PLAYER = 'PLAYER',
  BOT = 'BOT',
}

export interface InitialGameConfig {
  starter: GameRole;
  playerFigure: GameFigure;
  botFigure: GameFigure;
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

export enum GameNotFinished {
  GAME_NOT_FINISHED = 'game is not finished'
}
/**
 * Тип игрового поля
 */
export type Board = Array<BoardValue>;

export type GameResult = GameFigure | DrawResult | GameNotFinished


