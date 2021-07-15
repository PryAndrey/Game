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


