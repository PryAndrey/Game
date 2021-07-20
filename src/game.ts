import {Pacman, Ghost} from "./entity";
import {field} from "./map";
import {sleep} from "./helper";
			


export class GAME {
    WIDTH = 760
    HEIGHT = 840
    PAUSE = 400
	GHOSTCOUNT = 5
    canvasContext: any = null
	Food = 0
	lose = false
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
	
	Ghosts = new Array();
	pacman = new Pacman();
	
	initCanvas(canvas: any) {
		canvas.width = this.WIDTH;
		canvas.height = this.HEIGHT;
		this.canvasContext = canvas.getContext("2d");
	}
	
	start() {		
		this.SPRITES.Top.src = "img/PacmanT.png"
		this.SPRITES.Bottom.src = "img/PacmanB.png"
		this.SPRITES.Right.src = "img/PacmanR.png"
		this.SPRITES.Left.src = "img/PacmanL.png"	
		this.SPRITES.Ghost.src = "img/Ghost.png"
		this.SPRITES.Wall.src = "img/Wall.png" 
		this.SPRITES.EmptyCell.src = "img/EmptyCell.png"
		this.SPRITES.FoodCell.src = "img/FoodCell.png"
		
		let canvas = document.getElementById("canvas");
		this.initCanvas(canvas);
		
		for(let i = 0; i < this.GHOSTCOUNT; i++){
			this.Ghosts[i] = new Ghost();		
		}
		
		let Count = 0;
		for(let i = 0; i < 399; i++){
			if (field[i] == 4){ 
				if (Count < this.GHOSTCOUNT){this.Ghosts[Count].pos = i;} else {field[i] = 0}
				Count++;			
			}
			if (field[i] == 3){ //pacman 3
				this.pacman.pos = i;
			}
		}
		for(let i = 0; i < 399; i++) if(field[i] == 0) this.Food++;
		
		setInterval(this.tick, this.PAUSE);
	}
	
	stop() {
		alert("Stop!");	  
	}
	
	draw() {	
		let Count = 0;
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
				if ((this.pacman.Direction.Now == 1) || (this.pacman.Direction.Now == 0))this.canvasContext.drawImage(this.SPRITES.Right, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
				if (this.pacman.Direction.Now == -1) this.canvasContext.drawImage(this.SPRITES.Left, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
				if (this.pacman.Direction.Now == -19) this.canvasContext.drawImage(this.SPRITES.Top, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
				if (this.pacman.Direction.Now == 19) this.canvasContext.drawImage(this.SPRITES.Bottom, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
			}
			if (field[i] == 4){ //Ghost 4
				if (Count < this.GHOSTCOUNT){
					this.canvasContext.drawImage(this.SPRITES.FoodCell, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);  
					this.canvasContext.drawImage(this.SPRITES.Ghost, (this.CELL.WIDTH*(i%19)), (this.CELL.HEIGHT*(Math.floor(i/19))), this.CELL.WIDTH, this.CELL.HEIGHT);
				}
				Count++;			
			}
		}
		this.canvasContext.font = "30px Arial";   	
		this.canvasContext.fillStyle = "red";  
		this.canvasContext.fillText(this.pacman.score, 12, 27); 
	}
	
	updateState() {
		if (field[this.pacman.pos] == 3){ //pacman
			if (field[this.pacman.pos+this.pacman.Direction.Next] != 1){
				this.pacman.Direction.Now = this.pacman.Direction.Next;		  				  
			}
			if (field[this.pacman.pos+this.pacman.Direction.Now] == 0)
				this.pacman.score++;
			if (field[this.pacman.pos+this.pacman.Direction.Now] == 4){
				field[this.pacman.pos] = 2;
				this.lose = true;		  				  
			}
			if ((field[this.pacman.pos+this.pacman.Direction.Now] != 1) && (!this.lose)){
				field[this.pacman.pos] = 2;
				field[this.pacman.pos+this.pacman.Direction.Now] = 3;	
				this.pacman.pos = this.pacman.pos + this.pacman.Direction.Now;		
			}
		} else {this.lose = true;}				  
			
		for(let i = 0; i < this.GHOSTCOUNT; i++){
			if (field[this.Ghosts[i].pos] == 4){  //Ghost							
				this.Ghosts[i].ChooseWays();	
				this.Ghosts[i].UpdatePosition();
				this.Ghosts[i].Direction = 0;				  		
			}
		}
	}
	
	tick() {
		window.onkeydown = this.processKey;
		this.updateState();
		this.draw();
		if (this.lose) {alert("Ты проиграл!"); window.location.reload(); sleep(200);}
		if (this.pacman.score == this.Food) {alert("Ты победил!"); window.location.reload(); sleep(200);}	  
	}
	
		
	processKey(e:any) { 
		if (e.keyCode == 38) { //Вверх
			this.pacman.Direction.Next = -19;
		}
		if (e.keyCode == 40) { //Вниз
			this.pacman.Direction.Next = 19;
		}
		if (e.keyCode == 37) { //Влево
			this.pacman.Direction.Next = -1;
		}
		if (e.keyCode == 39) { //Вправо
			this.pacman.Direction.Next = 1;
		}
}
}
