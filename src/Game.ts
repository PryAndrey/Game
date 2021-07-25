import {Pacman} from "./Pacman";
import {Ghost} from "./Ghost";
import {Field} from "./Field";
import {Render} from "./Render";
import {sleep} from "./Helper";
import {Settings} from "./Settings";

export class Game {
	food = 0
	lose = false;
	
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
		
		for(let i = 0; i < Settings.CELL.COUNT; i++) 
			if(this.field.checkCell(i, Settings.CELL.FOOD_CELL)) 
				this.food++;
			
	}
	
	private updateState() {
		//this.pacman.updatePosition(this.field);	//Pacman
		setTimeout(this.pacman.updatePosition, 200, this.field);
		if (!(this.field.checkCell(this.pacman.position, Settings.CELL.PACMAN))) this.lose = true;
		
		for(let i = 0; i < Settings.GHOSTS_COUNT; i++){  //Ghosts
		
			if (this.field.checkCell(this.ghosts[i].position, Settings.CELL.GHOST)){
				this.ghosts[i].setDirection(this.field);	
				this.ghosts[i].updatePosition(this.field);				  		
			}
		}		
	}
	
	private tick() {
		window.onkeydown = this.processKey.bind(this);
		this.updateState();
		this.render.draw(this.pacman, this.field);
		sleep(500);
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
