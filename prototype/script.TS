let GAME = {
    width: 760,
    height: 840,
    fps: 1000 / 60,
    canvasContext: null,
	Wall: new Image(),
	EmptyCell: new Image(),
	FoodCell: new Image(),
}

let Pacman = {       
	score: 0, 
    Top: new Image(),
    Bottom: new Image(),
    Right: new Image(),
    Left: new Image(),
    Direction: 0//Direction,	
}


//class Ghost {
//	constructor(name: string){
//	    this._name = name;
//	}
	
//	name() {
//		return this._name
//	}
	
//	private _name: String = Duck.DUCK_DEFAULT_NAME;
	
//	static readonly DUCK_DEFAULT_NAME: string = 'D Duck';
//}

//class Direction {
//	constructor(name){
//	    this.name = name
//	}
//}

let Ghost = {  
    background: new Image(),
    mem: 2,	
}
 
let Cell = {
    width: GAME.width / 19,
    height: GAME.height / 21,
}

let field=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
 	 	   1,4,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,4,1,
 		   1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1,
   		   1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		   1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1,
		   1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,
		   1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,
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
		   1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,
		   1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

function init() {
    Pacman.Top.src = "img/PacmanT.png"
	Pacman.Bottom.src = "img/PacmanB.png"
	Pacman.Right.src = "img/PacmanR.png"
	Pacman.Left.src = "img/PacmanL.png"
	
	Ghost.background.src = "img/Ghost.png"
    GAME.Wall.src = "img/Wall.png" 
	GAME.EmptyCell.src = "img/EmptyCell.png"
	GAME.FoodCell.src = "img/FoodCell.png"
	
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
	sleep(500);
	window.onkeydown = processKey;
	UpdateState();
	
    if (checkwin()){
		alert("Ты победил!");
	}  
}

function draw() {	
    GAME.canvasContext.clearRect(0, 0, GAME.width, GAME.height);
	for(let i = 0; i <= 399; i ++){
	  if (field[i] == 0)  //FoodCell 0
        GAME.canvasContext.drawImage(GAME.FoodCell, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
	  if (field[i] == 1)  //Wall 1
        GAME.canvasContext.drawImage(GAME.Wall, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
      if (field[i] == 2)  //EmptyCell 2
        GAME.canvasContext.drawImage(GAME.EmptyCell, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
      if (field[i] == 3){ //Pacman 3
		  GAME.canvasContext.drawImage(GAME.EmptyCell, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
		
          if ((Pacman.Direction == 1) || (Pacman.Direction == 0))GAME.canvasContext.drawImage(Pacman.Right, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
		  if (Pacman.Direction == -1) GAME.canvasContext.drawImage(Pacman.Left, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
	      if (Pacman.Direction == -19) GAME.canvasContext.drawImage(Pacman.Top, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
	      if (Pacman.Direction == 19) GAME.canvasContext.drawImage(Pacman.Bottom, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
	  }
	  if (field[i] == 4){ //Ghost 4
		GAME.canvasContext.drawImage(GAME.FoodCell, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);  
        GAME.canvasContext.drawImage(Ghost.background, (Cell.width*(i%19)), (Cell.height*(Math.floor(i/19))), Cell.width, Cell.height);
	  }	
	}	 	  
    GAME.canvasContext.font = "30px Arial";   	
    GAME.canvasContext.fillStyle = "red";  
    GAME.canvasContext.fillText(Pacman.score, 0, 0); 
}

function UpdateState()
{
  for(let i = 0; i < 399; i ++){
	  if (field[i] == 3){
		  if (field[i+Pacman.Direction] == 0)
			  Pacman.score = Pacman.score + 1; 
		  if (field[i+Pacman.Direction] != 1){
			  field[i] = 2;
		      field[i+Pacman.Direction] = 3;			  				  
	      }
	  }
    
	  if (field[i] == 4){
		  if (field[i+Ghost.Direction] != 1){
			  if (field[i+Ghost.Direction] == 0)
				  Ghost.mem = 0;
              if (field[i+Ghost.Direction] == 2)
				  Ghost.mem = 2;
			  if (field[i+Ghost.Direction] == 4)
				  Ghost.Direction = 0;
			  if (Ghost.mem == 0)
			      field[i] = 0;
			  if (Ghost.mem == 2)
			      field[i] = 2;
		      field[i+Ghost.Direction] = 3;				  
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

function sleep(millis) {
    let j = (new Date()).getTime();
    let i = 0;
    while (((new Date()).getTime() - j) < millis) {
        i++;
    }
}




