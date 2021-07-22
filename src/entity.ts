import {field} from "./map";
import {Directions} from "./helper";

export class Pacman {       
	score: number = 0    
	pos: number = 0	
	lose = false
	nowDirection: Directions = Directions.Stay
	nextDirection: Directions = Directions.Stay
	public UpdatePosition(){
		if (field[this.pos] == 3){ //pacman
			if (field[this.pos+this.nextDirection] != 1){
				this.nowDirection = this.nextDirection;		  				  
			}
			if (field[this.pos+this.nowDirection] == 0)
				this.score++;
			if (field[this.pos+this.nowDirection] == 4){
				field[this.pos] = 2;
				this.lose = true;		  				  
			}
			if ((field[this.pos+this.nowDirection] != 1) && (!this.lose)){
				field[this.pos] = 2;
				field[this.pos+this.nowDirection] = 3;	
				this.pos = this.pos + this.nowDirection;		
			}
		} else {this.lose = true;}
	}
	
	public ChooseWays(way: number){
		this.nextDirection = way;
	}	
}


export class Ghost {
	mem = 2
	direction: Directions = Directions.Stay	
	pos = 0
	
	private getRandomIntInclusive(min:number, max:number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	public ChooseWays(){
		if ((field[this.pos+1] == 0) || (field[this.pos-1] == 0) || (field[this.pos+19] == 0) || (field[this.pos-19] == 0) || 
		    (field[this.pos+1] == 2) || (field[this.pos-1] == 2) || (field[this.pos+19] == 2) || (field[this.pos-19] == 2)){
			while (this.direction == Directions.Stay) {
				let R = this.getRandomIntInclusive(1, 4);	
				if (R <= 2){
					if (R == 1){
						if ((field[this.pos+1] != 1) && (field[this.pos+1] != 4)) this.direction = Directions.Right;
					}else{	
						if ((field[this.pos-1] != 1) && (field[this.pos-1] != 4)) this.direction = Directions.Left;
					}
				}else{
					if (R == 3){
						if ((field[this.pos+19] != 1) && (field[this.pos+19] != 4)) this.direction = Directions.Down;
					}else{ 
						if ((field[this.pos-19] != 1) && (field[this.pos-19] != 4)) this.direction = Directions.Up;
					}				
				}
			}
		}
    }
	
	public UpdatePosition(){
		if (field[this.pos+this.direction] != 1){				
			if (this.mem == 0)
				field[this.pos] = 0;
			if (this.mem == 2)
				field[this.pos] = 2;
				
			if (field[this.pos+this.direction] == 0)
				this.mem = 0;
			if (field[this.pos+this.direction] == 2)
				this.mem = 2;
			field[this.pos+this.direction] = 4;	
			this.pos = this.pos + this.direction;
			}		
    }	
}