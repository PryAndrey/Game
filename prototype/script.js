var GAME = {
    width: 760,
    height: 840,
    fps: 1000 / 60,
    canvasContext: null,
}

var Pacman = {       
	score: 0, 
    background: new Image(),	
}


class Ghost {
	constructor(name){
	    this.name = name
	}
	fly() {
		console.log('fly')
	}
}

class Direction {
	constructor(name){
	    this.name = name
	}
	fly() {
		console.log('fly')
	}
}

var Ghost = {  
    background: new Image(),	
}

var Cell = {
    width: GAME.width / 19,
    height: GAME.height / 21,
}

var field=[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
 	 	   [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
 		   [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
   		   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		   [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
		   [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
		   [1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1],
		   [0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0],
		   [1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,1],
		   [0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
		   [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
		   [0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0],
		   [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
		   [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
		   [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
		   [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
		   [1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1],
		   [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
		   [1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1],
		   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

var progress = 1;
var checkwin = false;

function init() {
    Pacman.background.src = "img/Pacman.png"
	Ghost.background.src = "img/Ghost.png"

    var canvas = document.getElementById("canvas");
    _initCanvas(canvas);

    firstPLAYER.background.onload = function() {
        setInterval(_tick, GAME.fps);
    }
}

function _initCanvas(canvas) {
    canvas.width = GAME.width;
    canvas.height = GAME.height;
    GAME.canvasContext = canvas.getContext("2d");
    canvas.addEventListener("mouseup", _onCanvasMouseUp);
}

function _tick() {
	draw();
    if (checkwin){
		sleep(1000);
		replay();
	}
    win();
}

function replay()
{
  for(let i = 0; i < 3; i++)
    for(let j = 0; j < 3; j++)   
      map[j][i] = 0;
  checkwin = false;  
}

function win() {
  if(check(1)) {
      alert("Победил 1 игрок!");
	  firstPLAYER.score = firstPLAYER.score+1;
	  checkwin = true;
  } else if(check(2)) {
      alert("Победил 2 игрок!");
  	  secondPLAYER.score = secondPLAYER.score+1;
	  checkwin = true;
  } else if((map[0][0] != 0) && (map[0][1] != 0) && (map[0][2] != 0) && (map[1][0] != 0) && (map[1][1] != 0) && (map[1][2] != 0) && (map[2][0] != 0) && (map[2][1] != 0) && (map[2][2] != 0)) {
      alert("Ничья!");
	  checkwin = true;
  }
}

function draw() {
    GAME.canvasContext.clearRect(0, 0, GAME.width, GAME.height);
	if (progress == 1)
        GAME.canvasContext.drawImage(firstPLAYER.background, 0, 0, GAME.width, GAME.height-30);
    else
	    GAME.canvasContext.drawImage(secondPLAYER.background, 0, 0, GAME.width, GAME.height-30);
	for(let i = 0; i < 3; i++)
      for(let j = 0; j < 3; j++){
        if(map[j][i] > 0) 
			GAME.canvasContext.drawImage(map[j][i] == 2 ? GAME.O : GAME.X, i * Cell.width, j * Cell.height, Cell.width+3, Cell.height);		
	  }	  
    GAME.canvasContext.font = "30px Arial";  
    GAME.canvasContext.fillStyle = firstPLAYER.color;                         
    GAME.canvasContext.fillText("X:", 10, GAME.height-5); 
    GAME.canvasContext.fillText(firstPLAYER.score, 40, GAME.height-5); 	
    GAME.canvasContext.fillStyle = secondPLAYER.color;                        
    GAME.canvasContext.fillText("O:", GAME.width - 80, GAME.height-5); 
    GAME.canvasContext.fillText(secondPLAYER.score, GAME.width - 47, GAME.height-5); 
	
	if (progress == 1){
	  GAME.canvasContext.fillStyle = firstPLAYER.color;                         
      GAME.canvasContext.fillText("Ход 1 игрока - X", GAME.width/3-13, GAME.height-5);                   
    } 
	if (progress == 2){
	  GAME.canvasContext.fillStyle = secondPLAYER.color;                         
      GAME.canvasContext.fillText("Ход 2 игрока - O", GAME.width/3-13, GAME.height-5);                   
    }
}

function check(player)
{
  for(let i = 0; i < 3; i ++)
      if((map[i][0] == player && map[i][1] == player && map[i][2] == player) ||
         (map[0][i] == player && map[1][i] == player && map[2][i] == player)) return true;
		
      if((map[0][0] == player && map[1][1] == player && map[2][2] == player) || 
         (map[2][0] == player && map[1][1] == player && map[0][2] == player)) return true;
}

function boundary(event, x, y, w, h)
{
  return event.offsetX > x && event.offsetX < x + w && event.offsetY > y && event.offsetY < y + h;
}

function _onCanvasMouseUp(event) {
  for(let i = 0; i < 3; i++)
    for(let j = 0; j < 3; j++)
    {
      if((map[j][i] == 0) && (boundary(event, i * Cell.width, j * Cell.height, Cell.width, Cell.height)) && (progress == 1))
      {
        map[j][i] = 1;
		progress = 2;
        break;
      }
	  if((map[j][i] == 0) && (boundary(event, i * Cell.width, j * Cell.height, Cell.width, Cell.height)) && (progress == 2))
      {
        map[j][i] = 2;
		progress = 1;
        break;
      }
    }
}

function sleep(millis) {
    let j = (new Date()).getTime();
    let i = 0;
    while (((new Date()).getTime() - j) < millis) {
        i++;
    }
}




