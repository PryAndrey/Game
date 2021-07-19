let GAME = {
    width: 760,
    height: 840,
    fps: 400,
    canvasContext: null,	
	sprites: {
        Ghost: new Image(),		
		Wall: new Image(),
		EmptyCell: new Image(),
		FoodCell: new Image(),
		
		Top: new Image(),
		Bottom: new Image(),
		Right: new Image(),
		Left: new Image(),
    }
}

let Pacman = {       
	score: 0,    
	Direction: {
		Now: 0,
		Next: 0,
	},
	pos: 0,
}

class ghost {
	mem = 2
	Direction = 0	
	pos
	
	ChooseWays(){
		if ((field[this.pos+1] == 0) || (field[this.pos-1] == 0) || (field[this.pos+19] == 0) || (field[this.pos-19] == 0) || 
		    (field[this.pos+1] == 2) || (field[this.pos-1] == 2) || (field[this.pos+19] == 2) || (field[this.pos-19] == 2)){
			while (this.Direction == 0) {
				let R = getRandomIntInclusive(1, 4);	
				if (R <= 2){
					if (R == 1){
						if ((field[this.pos+1] != 1) && (field[this.pos+1] != 4)) this.Direction = 1;
					}else{	
						if ((field[this.pos-1] != 1) && (field[this.pos-1] != 4)) this.Direction = -1;
					}
				}else{
					if (R == 3){
						if ((field[this.pos+19] != 1) && (field[this.pos+19] != 4)) this.Direction = 19;
					}else{ 
						if ((field[this.pos-19] != 1) && (field[this.pos-19] != 4)) this.Direction = -19;
					}				
				}
			}
		}
    }
	
	UpdatePosition(){
		if (field[this.pos+this.Direction] != 1){				
			if (this.mem == 0)
				field[this.pos] = 0;
			if (this.mem == 2)
				field[this.pos] = 2;
				
			if (field[this.pos+this.Direction] == 0)
				this.mem = 0;
			if (field[this.pos+this.Direction] == 2)
				this.mem = 2;
			field[this.pos+this.Direction] = 4;	
			this.pos = this.pos + this.Direction;
			}		
    }	
}
 
let Cell = {
    width: GAME.width / 19,
    height: GAME.height / 21,
}

let field =[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
			1,4,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,4,1,
			1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1,
			1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
			1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1,
			1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,
			1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,
			2,2,2,1,0,1,0,0,0,0,0,0,0,1,0,1,2,2,2,
			1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,1,
			0,0,0,0,0,0,0,1,4,4,4,1,0,0,0,0,0,0,0,
			1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,
			2,2,2,1,0,1,0,0,0,4,0,0,0,1,0,1,2,2,2,
			1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,
			1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
			1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1,
			1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,
			1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,
			1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,
			1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,
			1,4,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,4,1,
			1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

let Ghosts = new Array();
const GhostCount = 4;
let lose = false;
let	Food = 0;

function init() {
		
    GAME.sprites.Top.src = "img/PacmanT.png"
	GAME.sprites.Bottom.src = "img/PacmanB.png"
	GAME.sprites.Right.src = "img/PacmanR.png"
	GAME.sprites.Left.src = "img/PacmanL.png"	
	GAME.sprites.Ghost.src = "img/Ghost.png"
    GAME.sprites.Wall.src = "img/Wall.png" 
	GAME.sprites.EmptyCell.src = "img/EmptyCell.png"
	GAME.sprites.FoodCell.src = "img/FoodCell.png"
	
	let canvas = document.getElementById("canvas");
    _initCanvas(canvas);
	
	for(let i = 0; i < GhostCount; i++){
		Ghosts[i] = new ghost();		
	}
	
	let Count = 0;
	for(let i = 0; i < 399; i++){
		if (field[i] == 4){ 
			if (Count < GhostCount){Ghosts[Count].pos = i;} else {field[i] = 0}
			Count++;			
		}
		if (field[i] == 3){ //Pacman 3
			Pacman.pos = i;
		}
	}
	for(let i = 0; i < 399; i++) if(field[i] == 0) Food++;
	
    setInterval(_tick, GAME.fps);
}

function _initCanvas(canvas) {
    canvas.width = GAME.width;
    canvas.height = GAME.height;
    GAME.canvasContext = canvas.getContext("2d");
}

function _tick() {
	window.onkeydown = processKey;
	UpdateState();
	draw();
	if (lose) {alert("Ты проиграл!"); window.location.reload(); sleep(200);}
    if (Pacman.score == Food) {alert("Ты победил!"); window.location.reload(); sleep(200);}	  
}

function draw() {	
	let Count = 0;
	GAME.canvasContext.clearRect(0, 0, GAME.width, GAME.height);
	
	for(let i = 0; i <= 399; i ++){
		if (field[i] == 0)  //FoodCell 0
			GAME.canvasContext.drawImage(GAME.sprites.FoodCell, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
		if (field[i] == 1)  //Wall 1
			GAME.canvasContext.drawImage(GAME.sprites.Wall, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
		if (field[i] == 2)  //EmptyCell 2
			GAME.canvasContext.drawImage(GAME.sprites.EmptyCell, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
	 
		if (field[i] == 3){ //Pacman 3
			GAME.canvasContext.drawImage(GAME.sprites.EmptyCell, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
			if ((Pacman.Direction.Now == 1) || (Pacman.Direction.Now == 0))GAME.canvasContext.drawImage(GAME.sprites.Right, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
			if (Pacman.Direction.Now == -1) GAME.canvasContext.drawImage(GAME.sprites.Left, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
			if (Pacman.Direction.Now == -19) GAME.canvasContext.drawImage(GAME.sprites.Top, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
			if (Pacman.Direction.Now == 19) GAME.canvasContext.drawImage(GAME.sprites.Bottom, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
		}
		if (field[i] == 4){ //Ghost 4
			if (Count < GhostCount){
				GAME.canvasContext.drawImage(GAME.sprites.FoodCell, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);  
				GAME.canvasContext.drawImage(GAME.sprites.Ghost, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
			}
		    Count++;			
		}
	}
	GAME.canvasContext.font = "30px Arial";   	
	GAME.canvasContext.fillStyle = "red";  
	GAME.canvasContext.fillText(Pacman.score, 12, 27); 
}

function UpdateState(){
	if (field[Pacman.pos] == 3){ //Pacman
		if (field[Pacman.pos+Pacman.Direction.Next] != 1){
			Pacman.Direction.Now = Pacman.Direction.Next;		  				  
		}
		if (field[Pacman.pos+Pacman.Direction.Now] == 0)
			Pacman.score++;
		if (field[Pacman.pos+Pacman.Direction.Now] == 4){
			field[Pacman.pos] = 2;
			lose = true;		  				  
		}
		if ((field[Pacman.pos+Pacman.Direction.Now] != 1) && (!lose)){
			field[Pacman.pos] = 2;
			field[Pacman.pos+Pacman.Direction.Now] = 3;	
            Pacman.pos = Pacman.pos + Pacman.Direction.Now;		
		}
	} else {lose = true;}				  
		
	for(let i = 0; i < GhostCount; i++){
		if (field[Ghosts[i].pos] == 4){  //Ghost							
			Ghosts[i].ChooseWays();	
			Ghosts[i].UpdatePosition();
			Ghosts[i].Direction = 0;				  		
		}
	}
}

function processKey(e) { 
  if (e.keyCode == 38) { //Вверх
	Pacman.Direction.Next = -19;
  }
  if (e.keyCode == 40) { //Вниз
	Pacman.Direction.Next = 19;
  }
  if (e.keyCode == 37) { //Влево
	Pacman.Direction.Next = -1;
  }
  if (e.keyCode == 39) { //Вправо
	Pacman.Direction.Next = 1;
  }
}

function sleep(millis) {
	let j = (new Date()).getTime();
	let i = 0;
	while (((new Date()).getTime() - j) < millis) {
		i++;
	}
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}