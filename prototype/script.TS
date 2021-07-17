let GAME = {
    width: 760,
    height: 840,
    fps: 500,
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
	Direction: 0//Direction,	
}

class ghost {
	constructor(Num){
	    this._Num = Num;
	}
	
	mem = 0;
	Direction = 0;
}

let Ghost = new ghost(1);
 
let Cell = {
    width: GAME.width / 19,
    height: GAME.height / 21,
}

let field =[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
			1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
			1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1,
			1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
			1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1,
			1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,
			1,1,1,1,0,1,1,1,0,1,3,1,1,1,0,1,1,1,1,
			2,2,2,1,0,1,0,0,0,0,0,0,0,1,0,1,2,2,2,
			1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,1,
			0,0,0,0,0,0,0,1,0,4,0,1,0,0,0,0,0,0,0,
			1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,
			2,2,2,1,0,1,0,0,0,0,0,0,0,1,0,1,2,2,2,
			1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,
			1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
			1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1,
			1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,
			1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,
			1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,
			1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,
			1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
			1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

let lose = false;
	
function init() {
		
    GAME.sprites.Top.src = "img/PacmanT.png"
	GAME.sprites.Bottom.src = "img/PacmanB.png"
	GAME.sprites.Right.src = "img/PacmanR.png"
	GAME.sprites.Left.src = "img/PacmanL.png"
	
	GAME.sprites.Ghost.src = "img/Ghost.png"
    GAME.sprites.Wall.src = "img/Wall.png" 
	GAME.sprites.EmptyCell.src = "img/EmptyCell.png"
	GAME.sprites.FoodCell.src = "img/FoodCell.png"
	
	Pacman.Direction = 0;
    let canvas = document.getElementById("canvas");
    _initCanvas(canvas);
    setInterval(_tick, GAME.fps);
}

function _initCanvas(canvas) {
    canvas.width = GAME.width;
    canvas.height = GAME.height;
    GAME.canvasContext = canvas.getContext("2d");
}

function checkwin() {
    if (Pacman.score == 185)
		return true;
	else
		return false;	  
}

function _tick() {
	draw();
	window.onkeydown = processKey;
	if (lose) alert("Ты проиграл!");
	UpdateState();
	
    if (checkwin()){
		alert("Ты победил!");
	}  
}

function draw() {	
	let checkPacman = false;
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
			checkPacman = true;
			if ((Pacman.Direction == 1) || (Pacman.Direction == 0))GAME.canvasContext.drawImage(GAME.sprites.Right, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
			if (Pacman.Direction == -1) GAME.canvasContext.drawImage(GAME.sprites.Left, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
			if (Pacman.Direction == -19) GAME.canvasContext.drawImage(GAME.sprites.Top, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
			if (Pacman.Direction == 19) GAME.canvasContext.drawImage(GAME.sprites.Bottom, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
		}
		if (field[i] == 4){ //Ghost 4
			GAME.canvasContext.drawImage(GAME.sprites.FoodCell, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);  
			GAME.canvasContext.drawImage(GAME.sprites.Ghost, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
		}
	}
	if (checkPacman == false) lose = true;
	GAME.canvasContext.font = "30px Arial";   	
	GAME.canvasContext.fillStyle = "red";  
	GAME.canvasContext.fillText(Pacman.score, 12, 27); 
}

function UpdateState()
{
	let CheckPacman = true;
	let CheckGhost = true;
	Ghost.Direction = 0;
	
	for(let i = 0; i < 399; i ++){
		if ((field[i] == 3) && (CheckPacman)){ //Pacman
			CheckPacman = false;
			if (field[i+Pacman.Direction] == 0)
				Pacman.score = Pacman.score + 1;
			if (field[i+Pacman.Direction] == 4){
				field[i] = 2;
			  	lose = true;		  				  
			} 
			if ((field[i+Pacman.Direction] != 1) && (!lose)){
				field[i] = 2;
				field[i+Pacman.Direction] = 3;			  				  
			}
		}				  
		  
		if ((field[i] == 4) && (CheckGhost)){  //Ghost		
			ChooseWays(i);
			CheckGhost = false;			
			if (field[i+Ghost.Direction] != 1){
				  
				  
				if (Ghost.mem == 0)
					field[i] = 0;
				if (Ghost.mem == 2)
					field[i] = 2;
				
				if (field[i+Ghost.Direction] == 0)
					Ghost.mem = 0;
				if (field[i+Ghost.Direction] == 2)
					Ghost.mem = 2;
				field[i+Ghost.Direction] = 4;				  
			}
		}
	}
		
}

function processKey(e) { 
  if (e.keyCode == 38) { //Вверх
	Pacman.Direction = -19;
  }
  if (e.keyCode == 40) { //Вниз
	Pacman.Direction = 19;
  }
  if (e.keyCode == 37) { //Влево
	Pacman.Direction = -1;
  }
  if (e.keyCode == 39) { //Вправо
	Pacman.Direction = 1;
  }
}

//function sleep(millis) {
//	let j = (new Date()).getTime();
//	let i = 0;
//	while (((new Date()).getTime() - j) < millis) {
//		i++;
//	}
//}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ChooseWays(i) {
	while (Ghost.Direction == 0) {
		let R = getRandomIntInclusive(1, 4);	
		if (R <= 2){
			if (R == 1){
				if (field[i+1] != 1) Ghost.Direction = 1;
			}else{	
				if (field[i-1] != 1) Ghost.Direction = -1;
			}
		}else{
			if (R == 3){
				if (field[i+19] != 1) Ghost.Direction = 19;
			}else{
				if (field[i-19] != 1) Ghost.Direction = -19;
			}				
		}
	}
}
