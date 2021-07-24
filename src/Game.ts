import {Pacman} from "./Pacman";
import {Ghost} from "./Ghost";
import {Field} from "./Field";
import {Render} from "./Render";
import {sleep} from "./Helper";
import {Settings, Directions} from "./Settings";

export class Game {
	food = 0
	lose = false;
	
	ghosts = new Array();
	pacman = new Pacman();
	field = new Field();
	render = new Render();
	
	public start() {
		this.render.initCanvas(Settings.WIDTH, Settings.HEIGHT);
		this.initEntitys();
		this.initGameLoop();
	}
	
	private initEntitys(){
		for(let i = 0; i < Settings.GHOSTS_COUNT; i++){
			this.ghosts[i] = new Ghost();		
		}
		let Count = 0;
		for(let i = 0; i < Settings.CELL.COUNT; i++){ //Ghost
			if (this.field.checkCell(i, 4)){ 
				if (Count < Settings.GHOSTS_COUNT){
					this.ghosts[Count].position = i;
				} else {
					this.field.replaceCell(i, 0);
				}
				Count++;			
			}
			if (this.field.checkCell(i, 3)) //pacman 3
				this.pacman.position = i;		
		}
		for(let i = 0; i < Settings.CELL.COUNT; i++) if(this.field.checkCell(i, 0)) this.food++;
	}	
	
	private updateState() {	
		this.pacman.updatePosition(this.field);	//Pacman
		if (!(this.field.checkCell(this.pacman.position, Settings.CELL.PACMAN))) this.lose = true;
		for(let i = 0; i < Settings.GHOSTS_COUNT; i++){  //Ghost
			if (this.field.checkCell(this.ghosts[i].position, Settings.CELL.GHOST)){
				this.ghosts[i].setDirection(this.field);	
				this.ghosts[i].updatePosition(this.field);
				this.ghosts[i].direction = Directions.Stay;				  		
			}
		}
	}
	
	private tick() {
		window.onkeydown = this.processKey.bind(this);
		this.updateState();
		this.render.draw(this.pacman, this.field);
		sleep(Settings.PAUSE);
	}
	
	public processKey(event:any) {
		if (event.keyCode == Settings.KEY.UP) { //Вверх
			this.pacman.nextDirection = Directions.Up;
		}
		if (event.keyCode == Settings.KEY.DOWN) { //Вниз
			this.pacman.nextDirection = Directions.Down;
		}
		if (event.keyCode == Settings.KEY.LEFT) { //Влево
			this.pacman.nextDirection = Directions.Left;
		}
		if (event.keyCode == Settings.KEY.RIGHT) { //Вправо
			this.pacman.nextDirection = Directions.Right;
		}
	}
	
	private gameIsOver(){		
		if ((this.lose) || (this.pacman.score == this.food)) {
			if (this.lose) {
				alert("Ты проиграл!"); 
			}
			if (this.pacman.score == this.food) {
				alert("Ты победил!"); 
			}
			return true;
		} else {return false;}
	}
	
	private initGameLoop() {
        requestAnimationFrame(() => {
            if (!this.gameIsOver()) {
                this.tick();
                this.initGameLoop();
            }
        }
		)
    }
	
	public stop() {
		window.location.reload(); 
	}
}
