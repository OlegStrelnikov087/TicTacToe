class Game {

    init(status, board) {
        this.status = status;
        this.board = board;
    }

    cellClickHandler(event) {
        // Если клик не нужно обрабатывать, уходим из функции.
        if (!this.isCorrectClick(event)) {
            return;
        }
        // this.board.fillCell(event);
        this.playerMove(event)
        if (this.hasWon()) {
            // Ставим статус в "остановлено".
            this.status.setStatusStopped();
            // Сообщаем о победе пользователя.
            this.sayWonPhrase();
        }

        // Меняем фигуру (крестик или нолик).
        this.status.togglePhase();
        this.status.botOrPlayerPhase = 'bot'
        this.botMove()
    }

    playerMove(event) {
        event.target.className = 'cell'+ this.status.phase
        lottie.loadAnimation({
            container: event.target,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: 'animations/cross.json'
        })
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;
        this.status.mapValues[row][col] = this.status.phase;

    }

    botMove() {
        if (!this.status.isStatusPlaying()) {
            return
        }
        setTimeout(() => {

            let rowId = Math.round(Math.random() * 2)
            let colId = Math.round(Math.random() * 2)
            while (this.status.mapValues[rowId][colId] !== '') {
                rowId = Math.round(Math.random() * 2)
                colId = Math.round(Math.random() * 2)
            }
            // document.querySelector(`[data-row="${rowId}"][data-col="${colId}"]`).textContent = this.status.phase
            // document.querySelector(`[data-row="${rowId}"][data-col="${colId}"]`).id = 'active'
            document.querySelector(`[data-row="${rowId}"][data-col="${colId}"]`).className = 'cell'+this.status.phase
            lottie.loadAnimation({
                container: document.querySelector('.cell0'),
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: 'animations/oval.json'
            })
            this.status.mapValues[rowId][colId] = this.status.phase
            if (this.hasWon()) {
                // Ставим статус в "остановлено".
                this.status.setStatusStopped();
                // Сообщаем о победе пользователя.
                this.sayWonPhrase();
            }
            this.status.togglePhase()
            this.status.botOrPlayerPhase = 'player'
        }, 1500)
    }

    isCorrectClick(event) {
        return this.status.isStatusPlaying() && this.board.isClickByCell(event) && this.board.isCellEmpty(event) && this.status.botOrPlayerPhase === 'player';
    }

    hasWon() {
        return this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
            this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
            this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

            this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
            this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
            this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

            this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
            this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 });
    }

    isLineWon(a, b, c) {
        let value = this.status.mapValues[a.y][a.x] + this.status.mapValues[b.y][b.x] + this.status.mapValues[c.y][c.x];
        return value === 'XXX' || value === '000';
    }

    sayWonPhrase() {
        let figure = this.status.phase === 'X' ? 'Крестики' : 'Нолики';
        alert(`${figure} выиграли!`);
    }
}