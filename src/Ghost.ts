import {Field} from "./Field";
import {Directions, Settings} from "./Settings";

export class Ghost { 
	memory = Settings.CELL.EMPTY_CELL
	direction: Directions = Directions.Stay	
	position = 0
	
	coordinateX: number = 0
	coordinateY: number = 0
	
	stepX: number = 0
	stepY: number = 0
	
	private getRandomIntInclusive(min:number, max:number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	public setDirection(field:Field){	
		this.direction = Directions.Stay;
		this.stepX = 0;
		this.stepY = 0;
		this.coordinateX = 0;
		this.coordinateY = 0;
		if (!((field.checkCell(this.position+Directions.Right, Settings.CELL.PACMAN)) || (field.checkCell(this.position+Directions.Left, Settings.CELL.PACMAN)) || 
			  (field.checkCell(this.position+Directions.Down,  Settings.CELL.PACMAN)) || (field.checkCell(this.position+Directions.Up,   Settings.CELL.PACMAN)))){
			
			this.coordinateX = 0;
			this.coordinateY = 0;
			let right = true;
			let left = true;
			let up = true;
			let down = true;
			while ((this.direction == Directions.Stay) && ((right) || (left) || (up) || (down))) {
				let R = this.getRandomIntInclusive(1, 4);
				if (R == 1){
					if (!(field.checkCell(this.position+Directions.Right, Settings.CELL.WALL)) && 
						!(field.checkCell(this.position+Directions.Right, Settings.CELL.GHOST))) {
						this.direction = Directions.Right;
						this.stepX = Settings.STEP;
						this.stepY = 0;
					} else right = false;
				}
				if (R == 2){
					if (!(field.checkCell(this.position+Directions.Left, Settings.CELL.WALL)) && 
						!(field.checkCell(this.position+Directions.Left, Settings.CELL.GHOST))) {
						this.direction = Directions.Left;
						this.stepX = -Settings.STEP;
						this.stepY = 0;
					} else left = false;
				}
				if (R == 3){
					if (!(field.checkCell(this.position+Directions.Down, Settings.CELL.WALL)) && 
						!(field.checkCell(this.position+Directions.Down, Settings.CELL.GHOST))) {
						this.direction = Directions.Down;
						this.stepX = 0;
						this.stepY = Settings.STEP;
					} else down = false;
				}
				if (R == 4){
					if (!(field.checkCell(this.position+Directions.Up, Settings.CELL.WALL)) && 
						!(field.checkCell(this.position+Directions.Up, Settings.CELL.GHOST))) {
						this.direction = Directions.Up;
						this.stepX = 0;
						this.stepY = -Settings.STEP;
					} else up = false;	
				}
			}	
		}else{	
			if (field.checkCell(this.position+Directions.Right,Settings.CELL.PACMAN)) {
				this.direction = Directions.Right;	
				this.stepX = Settings.STEP;
				this.stepY = 0;
			}
			if (field.checkCell(this.position+Directions.Left, Settings.CELL.PACMAN)) {
				this.direction = Directions.Left;	
				this.stepX = -Settings.STEP;
				this.stepY = 0;
			}
			if (field.checkCell(this.position+Directions.Down, Settings.CELL.PACMAN)) {
				this.direction = Directions.Down;	
				this.stepX = 0;
				this.stepY = Settings.STEP;
			}
			if (field.checkCell(this.position+Directions.Up,   Settings.CELL.PACMAN)) {
				this.direction = Directions.Up;		
				this.stepX = 0;
				this.stepY = -Settings.STEP;	
			}
		}
	}

	public updatePosition(field:Field){
		if (this.position+this.direction != Settings.CELL.GHOST) {
			if (this.memory == Settings.CELL.FOOD_CELL)
				field.replaceCell(this.position, Settings.CELL.FOOD_CELL);
			if (this.memory == Settings.CELL.EMPTY_CELL)
				field.replaceCell(this.position, Settings.CELL.EMPTY_CELL);
			if (field.checkCell(this.position+this.direction, Settings.CELL.FOOD_CELL))
				this.memory = Settings.CELL.FOOD_CELL;
			if (field.checkCell(this.position+this.direction, Settings.CELL.EMPTY_CELL))
				this.memory = Settings.CELL.EMPTY_CELL;
			
			field.replaceCell(this.position+this.direction, Settings.CELL.GHOST);
	
			this.position = this.position + this.direction;
		}
	}
	
	public static initGhosts(ghosts:any, field:Field){	
		for(let i = 0; i < Settings.GHOSTS_COUNT; i++){  //Create ghosts
			ghosts[i] = new Ghost();		
		}
		
		let Count = 0;
		for(let i = 0; i < Settings.CELL.COUNT; i++){ //Ghost
			
			if (field.checkCell(i, Settings.CELL.GHOST)){ 
				if (Count < Settings.GHOSTS_COUNT){
					ghosts[Count].position = i;
				} else {
					field.replaceCell(i, Settings.CELL.FOOD_CELL);
				}
								
				Count++;			
			}
		}
	}
}