let canvas: any = document.getElementById("canvas");

function _initCanvas(canvas: any) {
    canvas.width = GAME.width;
    canvas.height = GAME.height;
}

let GAME = {
    width: 760,
    height: 840,
    fps: 400,
    canvasContext: canvas.getContext("2d"),	
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
 
const Cell = {
    width: GAME.width / 19,
    height: GAME.height / 21,
}

const GhostCount = 6;
let Ghosts = new Array();
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
