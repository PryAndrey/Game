class Game {
    constructor() {
        this._initEventListeners();
    }

    public start() {
        this._initGameLoop()
    }

    public stop() {
        this._gameIsOver = true;
        this._clearEventListeners();
    }

    private _tick() {
        if (this._updateState()) {
            this._draw();
        }
    }

    private _updateState(): boolean {
        console.log('calculate game state')
        return true
    }

    private _draw() {
        console.log('draw game')
    }

    private _initGameLoop() {
        requestAnimationFrame(() => {
            if (!this._gameIsOver) {
                this._tick();
                this._initGameLoop();
            }
        })
    }

    private _processEvent() {}

    private _initEventListeners() {
        console.log('init user input');
        //some thing like that
        window.addEventListener('some event', this._processEvent.bind(this));
    }

    private _clearEventListeners() {
        console.log('init user input');
        //some thing like that
        window.removeEventListener('some event', this._processEvent);
    }


    private _gameIsOver: boolean = false;
}