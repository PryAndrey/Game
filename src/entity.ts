import {field} from "./map";

export class Pacman {       
	score: number = 0    
	Direction = {
		Now: 0,
		Next: 0,
	}
	pos: number = 0
}

export class Ghost {
	mem = 2
	Direction = 0	
	pos = 0
	
	getRandomIntInclusive(min:number, max:number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	ChooseWays(){
		if ((field[this.pos+1] == 0) || (field[this.pos-1] == 0) || (field[this.pos+19] == 0) || (field[this.pos-19] == 0) || 
		    (field[this.pos+1] == 2) || (field[this.pos-1] == 2) || (field[this.pos+19] == 2) || (field[this.pos-19] == 2)){
			while (this.Direction == 0) {
				let R = this.getRandomIntInclusive(1, 4);	
				if (R <= 2){
					if (R == 1){
						if ((field[this.pos+1] != 1) && (field[this.pos+1] != 4)) this.Direction = 1;
					}else{	
						if ((field[this.pos-1] != 1) && (field[this.pos-1] != 4)) this.Direction = -1;
					}
				}else{
					if (R == 3){
						if ((field[this.pos+19] != 1) && (field[this.pos+19] != 4)) this.Direction = 19;
					}else{ 
						if ((field[this.pos-19] != 1) && (field[this.pos-19] != 4)) this.Direction = -19;
					}				
				}
			}
		}
    }
	
	UpdatePosition(){
		if (field[this.pos+this.Direction] != 1){				
			if (this.mem == 0)
				field[this.pos] = 0;
			if (this.mem == 2)
				field[this.pos] = 2;
				
			if (field[this.pos+this.Direction] == 0)
				this.mem = 0;
			if (field[this.pos+this.Direction] == 2)
				this.mem = 2;
			field[this.pos+this.Direction] = 4;	
			this.pos = this.pos + this.Direction;
			}		
    }	
}