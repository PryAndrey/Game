import {Pacman} from "./Pacman";
import {Ghost} from "./Ghost";
import {Field} from "./Field";
import {Render} from "./Render";
import {Settings} from "./Settings";

export class Game {
	food = 0
	lose = false;
	delay = 0;
	
	ghosts = new Array();
	pacman = new Pacman();
	field = new Field();
	render = new Render();
	
	public start() {
		this.render.initCanvas();
		this.initEntitys();
		this.initGameLoop();
	}
	
	private initEntitys(){
		Ghost.initGhosts(this.ghosts, this.field);
		this.pacman.initPacman(this.field);
		this.food = this.field.foodCount();
	}
	
	private updateState() {
		for(let i = 0; i < Settings.GHOSTS_COUNT; i++){  //Ghosts
			this.ghosts[i].setDirection(this.field);	
			this.ghosts[i].updatePosition(this.field);
		}
		this.pacman.updatePosition(this.field);	//Pacman
		
		if (!(this.field.checkCell(this.pacman.position, Settings.CELL.PACMAN))) this.lose = true;
		
	}
	
	private tick() {
		window.onkeydown = this.processKey.bind(this);
		if (this.delay > Settings.PAUSE) {
			this.delay = 0;
			this.updateState();
		}
		this.delay++;
		
		this.render.draw(this.pacman, this.ghosts, this.field);
		
		let j = (new Date()).getTime();
		while (((new Date()).getTime() - j) < Settings.FPS) {}
	}
	
	public processKey(event:any) {
		this.pacman.setDirection(event.keyCode)
	}
	
	private gameIsOver(){		
		if ((this.lose) || (this.pacman.score == this.food)) {
			if (this.lose) alert("Ты проиграл!");
			if (this.pacman.score == this.food) alert("Ты победил!");
			return true;
		} else {return false;}
	}
	
	private initGameLoop() {
        requestAnimationFrame(() => {
            if (!this.gameIsOver()) {
                this.tick();
                this.initGameLoop();
            }
        })
    }
	
	public stop() {
		window.location.reload(); 
	}
}
