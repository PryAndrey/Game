import {Field} from "./Field";
import {Directions, Settings} from "./Settings";

export class Pacman {       
	score: any = 0
	position: number = 0
	
	nowDirection: Directions = Directions.Stay
	nextDirection: Directions = Directions.Stay
	
	coordinateX: number = 0
	coordinateY: number = 0
	
	nextStepX: number = 0
	nextStepY: number = 0
	
	nowStepX: number = 0
	nowStepY: number = 0
	
	public updatePosition(field:Field){ 
		if (field.checkCell(this.position, Settings.CELL.PACMAN)){ //pacman
						
			if (field.checkCell(this.position+this.nowDirection, Settings.CELL.GHOST)){ 	//if GHOST on now direction
				field.replaceCell(this.position, Settings.CELL.EMPTY_CELL);
			}
			
			if (field.checkCell(this.position+this.nowDirection, Settings.CELL.FOOD_CELL))  //if FOOD_CELL on now direction
				this.score++;
			
			if (!(field.checkCell(this.position+this.nowDirection, Settings.CELL.WALL)) &&  //if not wall on now direction
				!(field.checkCell(this.position, Settings.CELL.EMPTY_CELL))) {				//if pacman is died
				
				field.replaceCell(this.position, Settings.CELL.EMPTY_CELL);
				field.replaceCell(this.position+this.nowDirection, Settings.CELL.PACMAN);
				this.position = this.position + this.nowDirection;
				this.coordinateX = 0;
				this.coordinateY = 0;
				
			} 
			if (field.checkCell(this.position+this.nowDirection, Settings.CELL.WALL)) {  	//if wall on now direction
				this.coordinateX = 0;
				this.coordinateY = 0;
				this.nowStepX = 0;
				this.nowStepY = 0;	
			}
			if (!(field.checkCell(this.position+this.nextDirection, Settings.CELL.WALL))){  //if not wall on new direction
				this.nowDirection = this.nextDirection;
				this.nowStepX = this.nextStepX;
				this.nowStepY = this.nextStepY;
				this.coordinateX = 0;
				this.coordinateY = 0;
			}
			
		}
	}
	
				
	public setDirection(key:number){
		if (key == Settings.KEY.UP) { //Вверх
			this.nextDirection = Directions.Up;
			this.nextStepX = 0;
			this.nextStepY = -Settings.STEP;
		}
		if (key == Settings.KEY.DOWN) { //Вниз
			this.nextDirection = Directions.Down;
			this.nextStepX = 0;
			this.nextStepY = Settings.STEP;
		}
		if (key == Settings.KEY.LEFT) { //Влево
			this.nextDirection = Directions.Left;
			this.nextStepX = -Settings.STEP;
			this.nextStepY = 0;
		}
		if (key == Settings.KEY.RIGHT) { //Вправо
			this.nextDirection = Directions.Right;
			this.nextStepX = Settings.STEP;
			this.nextStepY = 0;
		}	
	}
	
	public initPacman(field:Field){			
		for(let i = 0; i < Settings.CELL.COUNT; i++)	
			if (field.checkCell(i, Settings.CELL.PACMAN)) {
				this.position = i;	
		}			
	}
}