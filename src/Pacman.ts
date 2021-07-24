import {Field} from "./Field";
import {Directions} from "./Settings";

export class Pacman {       
	score: any = 0
	position: number = 0
	nowDirection: Directions = Directions.Stay
	nextDirection: Directions = Directions.Stay
	
	public updatePosition(field:Field){ 
		if (field.checkCell(this.position, 3)){ //pacman
			if (!(field.checkCell(this.position+this.nextDirection, 1))){
				this.nowDirection = this.nextDirection;
			}
			if (field.checkCell(this.position+this.nowDirection, 4)){
				field.replaceCell(this.position, 2);
			}
			if (field.checkCell(this.position+this.nowDirection, 0))
				this.score++;		  
			if (!(field.checkCell(this.position+this.nowDirection, 1)) && !(field.checkCell(this.position, 2))) {
				field.replaceCell(this.position, 2);
				field.replaceCell(this.position+this.nowDirection, 3);
				this.position = this.position + this.nowDirection;		
			}
		}
	}
}



