import { Board } from "@types/types";

export interface Controller {
    getTitle(): string;
    getAction: (lastMoveIndex: number | null, board: Board ) => Promise<number | undefined>
}

