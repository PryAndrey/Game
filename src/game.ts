import {Pacman, Ghost} from "./entity";
import {field} from "./map";
import {sleep} from "./helper";

export class GAME {
    WIDTH = 760
    HEIGHT = 840
    PAUSE = 400
	GHOSTCOUNT = 7
    canvasContext: any
	Food = 0	
	Ghosts = new Array();
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
		WIDTH: this.WIDTH / 19,
		HEIGHT: this.HEIGHT / 21,
	}
	
	public start() {		
		this.connectSprites();
		let canvas = document.getElementById("canvas");
		this.initCanvas(canvas);
		this.initEntitys();		
		this._initGameLoop();
	}

	public stop() {
		window.location.reload(); 
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
	
	private initEntitys(){
		for(let i = 0; i < this.GHOSTCOUNT; i++){
			this.Ghosts[i] = new Ghost();		
		}
		let Count = 0;
		for(let i = 0; i < 399; i++){ //Ghost
			if (field[i] == 4){ 
				if (Count < this.GHOSTCOUNT){this.Ghosts[Count].pos = i;} else {field[i] = 0}
				Count++;			
			}
			if (field[i] == 3){ //pacman 3
				this.pacman.pos = i;
			}
		}
		
		for(let i = 0; i < 399; i++) if(field[i] == 0) this.Food++;
	}
	
	private draw() {	
		this.canvasContext.clearRect(0, 0, this.WIDTH, this.HEIGHT);
		
		for(let i = 0; i <= 399; i ++){
			if (field[i] == 0)  //FoodCell 0
				this.canvasContext.drawImage(this.SPRITES.FoodCell, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
			if (field[i] == 1)  //Wall 1
				this.canvasContext.drawImage(this.SPRITES.Wall, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
			if (field[i] == 2)  //EmptyCell 2
				this.canvasContext.drawImage(this.SPRITES.EmptyCell, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
		
			if (field[i] == 3){ //pacman 3
				this.canvasContext.drawImage(this.SPRITES.EmptyCell, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
				if ((this.pacman.NowDirection == 1) || (this.pacman.NowDirection == 0))this.canvasContext.drawImage(this.SPRITES.Right, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
				if (this.pacman.NowDirection == -1) this.canvasContext.drawImage(this.SPRITES.Left, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
				if (this.pacman.NowDirection == -19) this.canvasContext.drawImage(this.SPRITES.Top, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
				if (this.pacman.NowDirection == 19) this.canvasContext.drawImage(this.SPRITES.Bottom, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
			}
			if (field[i] == 4){ //Ghost 4
				this.canvasContext.drawImage(this.SPRITES.EmptyCell, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);  
				this.canvasContext.drawImage(this.SPRITES.Ghost, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
			}
		}
		this.canvasContext.font = "30px Arial";
		this.canvasContext.fillStyle = "red";
		this.canvasContext.fillText(this.pacman.score, 12, 27);
	}
	
	private updateState() {	
		this.pacman.UpdatePosition();	//Pacman	
		for(let i = 0; i < this.GHOSTCOUNT; i++){  //Ghost
			if (field[this.Ghosts[i].pos] == 4){  							
				this.Ghosts[i].ChooseWays();	
				this.Ghosts[i].UpdatePosition();
				this.Ghosts[i].Direction = 0;				  		
			}
		}
	}
	
	private processKey(e:any) {
		if (e.keyCode == 38) { //Вверх
			this.pacman.NextDirection = -19;
		}
		if (e.keyCode == 40) { //Вниз
			this.pacman.NextDirection = 19;
		}
		if (e.keyCode == 37) { //Влево
			this.pacman.NextDirection = -1;
		}
		if (e.keyCode == 39) { //Вправо
			this.pacman.NextDirection = 1;
		}
	}
	
	private tick() {
		window.onkeydown = this.processKey;
		this.updateState();
		this.draw();
		sleep(this.PAUSE);
	}
	
	private _gameIsOver(){		
		if ((this.pacman.lose) || (this.pacman.score == this.Food)) {
			if (this.pacman.lose) {
				alert("Ты проиграл!"); 
			}
			if (this.pacman.score == this.Food) {
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
}
