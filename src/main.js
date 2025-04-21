import { board } from "./Board";
import { game } from "./Game";
import { Status } from "./Status";
import './style.css'
import lottie from "lottie-web";
import gtidAnimation from "./animations/grid.json"
window.addEventListener('load', function() {
    const firstPhase = 'player' // это тот кто будет первый ходить (соответсвенно играть за крестики)
    const status = new Status(firstPhase);
    board.init(game, status);
    game.init(status, board);

    board.renderMap();
    board.initEventHandlers();
});

lottie.loadAnimation({
    container: document.getElementById('animation-container'), 
    renderer: 'svg', 
    loop: false, 
    autoplay: true,
    animationData: gtidAnimation


});