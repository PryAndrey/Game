import {Pacman, initEntitys} from "./entity";
import {field} from "./map";
import {sleep, Directions} from "./helper";

export class GAME {
	SIZE = 1
    WIDTH = 760 * this.SIZE
    HEIGHT = 840 * this.SIZE
    PAUSE = 400
	COLUMNS = 19
	ROWS = 21
	GHOSTCOUNT = 1
    canvasContext: any
	food = 0	
	ghosts = new Array();
	pacman = new Pacman();
	
	SPRITES = {
        Ghost: new Image(),		
		Wall: new Image(),
		EmptyCell: new Image(),
		FoodCell: new Image(),		
		Top: new Image(),
		Bottom: new Image(),
		Right: new Image(),
		Left: new Image(),
    }
	
	CELL = {
		WIDTH: this.WIDTH / this.COLUMNS,
		HEIGHT: this.HEIGHT / this.ROWS,
	}
	
	public start() {		
		this.connectSprites();
		let canvas = document.getElementById("canvas");
		this.initCanvas(canvas);	
		this.food = initEntitys(this.GHOSTCOUNT, this.pacman, this.ghosts);
		this._initGameLoop();
	}

	private connectSprites(){
		this.SPRITES.Top.src = "img/PacmanT.png"
		this.SPRITES.Bottom.src = "img/PacmanB.png"
		this.SPRITES.Right.src = "img/PacmanR.png"
		this.SPRITES.Left.src = "img/PacmanL.png"	
		this.SPRITES.Ghost.src = "img/Ghost.png"
		this.SPRITES.Wall.src = "img/Wall.png" 
		this.SPRITES.EmptyCell.src = "img/EmptyCell.png"
		this.SPRITES.FoodCell.src = "img/FoodCell.png"
	}

	private initCanvas(canvas: any){
		canvas.width = this.WIDTH;
		canvas.height = this.HEIGHT;
		this.canvasContext = canvas.getContext("2d");
	}
	
	private draw() {	
		this.canvasContext.clearRect(0, 0, this.WIDTH, this.HEIGHT);
		
		for(let i = 0; i <= 399; i ++){
			if (field[i] == 0)  //FoodCell 0
				this.canvasContext.drawImage(this.SPRITES.FoodCell, (this.CELL.WIDTH*(i%this.COLUMNS)), (this.CELL.HEIGHT*(Math.floor(i/this.COLUMNS))), this.CELL.WIDTH, this.CELL.HEIGHT);
			if (field[i] == 1)  //Wall 1
				this.canvasContext.drawImage(this.SPRITES.Wall, (this.CELL.WIDTH*(i%this.COLUMNS)), (this.CELL.HEIGHT*(Math.floor(i/this.COLUMNS))), this.CELL.WIDTH, this.CELL.HEIGHT);
			if (field[i] == 2)  //EmptyCell 2
				this.canvasContext.drawImage(this.SPRITES.EmptyCell, (this.CELL.WIDTH*(i%this.COLUMNS)), (this.CELL.HEIGHT*(Math.floor(i/this.COLUMNS))), this.CELL.WIDTH, this.CELL.HEIGHT);
		
			if (field[i] == 3){ //pacman 3
				this.canvasContext.drawImage(this.SPRITES.EmptyCell, (this.CELL.WIDTH*(i%this.COLUMNS)), (this.CELL.HEIGHT*(Math.floor(i/this.COLUMNS))), this.CELL.WIDTH, this.CELL.HEIGHT);
				if((this.pacman.nowDirection == Directions.Right) 
				|| (this.pacman.nowDirection == Directions.Stay))this.canvasContext.drawImage(this.SPRITES.Right, (this.CELL.WIDTH*(i%this.COLUMNS)), (this.CELL.HEIGHT*(Math.floor(i/this.COLUMNS))), this.CELL.WIDTH, this.CELL.HEIGHT);
				if (this.pacman.nowDirection == Directions.Left) this.canvasContext.drawImage(this.SPRITES.Left, (this.CELL.WIDTH*(i%this.COLUMNS)), (this.CELL.HEIGHT*(Math.floor(i/this.COLUMNS))), this.CELL.WIDTH, this.CELL.HEIGHT);
				if (this.pacman.nowDirection == Directions.Up)   this.canvasContext.drawImage(this.SPRITES.Top, (this.CELL.WIDTH*(i%this.COLUMNS)), (this.CELL.HEIGHT*(Math.floor(i/this.COLUMNS))), this.CELL.WIDTH, this.CELL.HEIGHT);
				if (this.pacman.nowDirection == Directions.Down) this.canvasContext.drawImage(this.SPRITES.Bottom, (this.CELL.WIDTH*(i%this.COLUMNS)), (this.CELL.HEIGHT*(Math.floor(i/this.COLUMNS))), this.CELL.WIDTH, this.CELL.HEIGHT);
			}
			if (field[i] == 4){ //Ghost 4
				this.canvasContext.drawImage(this.SPRITES.EmptyCell, (this.CELL.WIDTH*(i%this.COLUMNS)), (this.CELL.HEIGHT*(Math.floor(i/this.COLUMNS))), this.CELL.WIDTH, this.CELL.HEIGHT);  
				this.canvasContext.drawImage(this.SPRITES.Ghost, (this.CELL.WIDTH*(i%this.COLUMNS)), (this.CELL.HEIGHT*(Math.floor(i/this.COLUMNS))), this.CELL.WIDTH, this.CELL.HEIGHT);
			}
		}
		this.canvasContext.font = "30px Arial";
		this.canvasContext.fillStyle = "red";
		this.canvasContext.fillText(this.pacman.score, 12 * this.SIZE, 27 * this.SIZE);
	}
	
	private updateState() {	
		this.pacman.UpdatePosition();	//Pacman	
		for(let i = 0; i < this.GHOSTCOUNT; i++){  //Ghost
			if (field[this.ghosts[i].pos] == 4){  							
				this.ghosts[i].ChooseWays();	
				this.ghosts[i].UpdatePosition();
				this.ghosts[i].direction = Directions.Stay;				  		
			}
		}
	}
	
	private tick() {
		window.onkeydown = this.processKey.bind(this);
		this.updateState();
		this.draw();
		sleep(this.PAUSE);
	}
	
	public processKey(event:any) {
		if (event.keyCode == 38) { //Вверх
			this.pacman.nextDirection = Directions.Up;
		}
		if (event.keyCode == 40) { //Вниз
			this.pacman.nextDirection = Directions.Down;
		}
		if (event.keyCode == 37) { //Влево
			this.pacman.nextDirection = Directions.Left;
		}
		if (event.keyCode == 39) { //Вправо
			this.pacman.nextDirection = Directions.Right;
		}
	}
	
	private _gameIsOver(){		
		if ((this.pacman.lose) || (this.pacman.score == this.food)) {
			if (this.pacman.lose) {
				alert("Ты проиграл!"); 
			}
			if (this.pacman.score == this.food) {
				alert("Ты победил!"); 
			}
			sleep(200);
			return true;
		} else {return false;}
	}
	
	private _initGameLoop() {
        requestAnimationFrame(() => {
            if (!this._gameIsOver()) {
                this.tick();
                this._initGameLoop();
            }
        }
		)
    }
	
	public stop() {
		window.location.reload(); 
	}
}
