window.addEventListener('load', function() {
    const firstPhase = 'player' // это тот кто будет первый ходить (соответсвенно играть за крестики)
    const game = new Game();
    const board = new Board();
    const status = new Status(firstPhase);

    board.init(game, status);
    game.init(status, board);

    board.renderMap();
    board.initEventHandlers();
});