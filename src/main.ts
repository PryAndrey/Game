import {GAME} from './game'; 
window.addEventListener('load', () => {
    const game = new GAME();
    game.start();
    window.addEventListener('unload', () => game.stop());
})