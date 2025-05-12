import { GameFigure, Board, GameResult, GameNotFinished} from "@types/types";
import { BOARD_INITIAL_STATE } from "@utils/game-const";
import { EMPTY_CELL_VALUE } from "@utils/game-const";
import { isGameOver } from "@utils/game-logic";
import { Controller } from "./controllers-type";

export class GameController {
  private current = 0;
  private readonly controllers: Controller[];
  private readonly board: Board;
  private readonly onUpdate: (board: Board) => void;
  private readonly onGameEnd: (result: GameResult) => void;

  constructor(
    controllers: Controller[], // любые контроллеры с фигурой внутри
    onUpdate: (board: Board) => void,
    onGameEnd: (result: GameResult) => void
  ) {
    this.controllers = controllers;
    this.board = [...BOARD_INITIAL_STATE];
    this.onUpdate = onUpdate;
    this.onGameEnd = onGameEnd;
  }

  async start() {
    while (true) {
      const controller = this.controllers[this.current];
      const figure = controller.figure;
      const index = await controller.getAction(this.getLastMoveIndex(), [...this.board]);

      const success = this.doAction(index, figure);
      if (!success) continue;

      const result = isGameOver(this.board);
      if (result !== GameNotFinished.GAME_NOT_FINISHED) {
        this.onGameEnd(result);
        break;
      }

      this.current = (this.current + 1) % this.controllers.length;
    }
  }

  private getLastMoveIndex(): number | null {
    const prevIndex = (this.current - 1 + this.controllers.length) % this.controllers.length;
    const prevFigure = this.controllers[prevIndex].figure;
    return this.board.lastIndexOf(prevFigure);
  }

  private doAction(index: number | undefined, figure: GameFigure): boolean {
    if (index === undefined || this.board[index] !== EMPTY_CELL_VALUE) return false;
    this.board[index] = figure;
    this.onUpdate([...this.board]);
    return true;
  }
}
