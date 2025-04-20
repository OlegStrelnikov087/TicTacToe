class Board {
    constructor() {
        this.gameTableElement = document.getElementById('game');
    }

    init(game, status) {
        this.game = game;
        this.status = status;
    }

    renderMap() {
        for (let row = 0; row < 3; row++) {
            const tr = document.createElement('tr');
            this.gameTableElement.appendChild(tr);
            for (let col = 0; col < 3; col++) {
                let td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    }

    initEventHandlers() {
        // Ставим обработчик, при клике на таблицу вызовется функция this.cellClickHandler.
        this.gameTableElement.addEventListener('click', event => this.game.cellClickHandler(event));
    }

    isClickByCell(event) {
        return event.target.tagName == 'TD';
    }

    isCellEmpty(event) {
        // Получаем строку и колонку куда кликнули.
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        return this.status.mapValues[row][col] === '';
    }

    fillCell(event) {
        // Получаем строку и колонку куда кликнули.
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;
        document.querySelector(`[data-row="${row}"][data-col="${col}"]`).className = 'cell'+this.status.phase
        // Заполняем ячейку и ставим значение в массиве, в свойстве mapValues.
       
        // event.target.textContent = this.status.phase;
        lottie.loadAnimation({
            container: document.querySelector('.cellX'),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: 'animations/cross.json'
        })
        this.status.mapValues[row][col] = this.status.phase;
    }
}