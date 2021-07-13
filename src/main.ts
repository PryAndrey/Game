window.addEventListener('load', () => {
    const game = new Game();
    game.start();
    window.addEventListener('unload', () => game.stop());
})