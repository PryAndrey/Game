import {Field} from "./Field";
import {Directions} from "./Settings";

export class Ghost {
	memory = 2
	direction: Directions = Directions.Stay	
	position = 0
	
	private getRandomIntInclusive(min:number, max:number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	public setDirection(field:Field){
		if ((field.checkCell(this.position+Directions.Right, 0)) || (field.checkCell(this.position+Directions.Left, 0)) || 
			(field.checkCell(this.position+Directions.Down, 0)) || (field.checkCell(this.position+Directions.Up, 0)) || 
		    (field.checkCell(this.position+Directions.Right, 2)) || (field.checkCell(this.position+Directions.Left, 2)) || 
			(field.checkCell(this.position+Directions.Down, 2)) || (field.checkCell(this.position+Directions.Up, 2))){
		    if (!((field.checkCell(this.position+Directions.Right, 3)) || (field.checkCell(this.position+Directions.Left, 3)) || 
				(field.checkCell(this.position+Directions.Down, 3)) || (field.checkCell(this.position+Directions.Up, 3)))){		
				while (this.direction == Directions.Stay) {
					let R = this.getRandomIntInclusive(1, 4);	
					if (R <= 2){
						if (R == 1){
							if (!(field.checkCell(this.position+Directions.Right, 1)) && 
							!(field.checkCell(this.position+Directions.Right, 4))) 
								this.direction = Directions.Right;
						}else{	
							if (!(field.checkCell(this.position+Directions.Left, 1)) && 
							!(field.checkCell(this.position+Directions.Left, 4))) 
								this.direction = Directions.Left;
						}
					}else{
						if (R == 3){
							if (!(field.checkCell(this.position+Directions.Down, 1)) && 
							!(field.checkCell(this.position+Directions.Down, 4))) 
								this.direction = Directions.Down;
						}else{ 
							if (!(field.checkCell(this.position+Directions.Up, 1)) && 
							!(field.checkCell(this.position+Directions.Up, 4))) 
								this.direction = Directions.Up;
						}				
					}
				}
			}else{	
				if (field.checkCell(this.position+Directions.Right, 3)) this.direction = Directions.Right;	
				if (field.checkCell(this.position+Directions.Left, 3)) this.direction = Directions.Left;	
				if (field.checkCell(this.position+Directions.Down, 3)) this.direction = Directions.Down;	
				if (field.checkCell(this.position+Directions.Up, 3)) this.direction = Directions.Up;			
			}
		}
    }
	
	public updatePosition(field:Field){
		if (!(field.checkCell(this.position+this.direction, 1))){				
			if (this.memory == 0)
				field.replaceCell(this.position, 0);
			if (this.memory == 2)
				field.replaceCell(this.position, 2);
				
			if (field.checkCell(this.position+this.direction, 0))
				this.memory = 0;
			if (field.checkCell(this.position+this.direction, 2))
				this.memory = 2;
			field.replaceCell(this.position+this.direction, 4);	
			this.position = this.position + this.direction;
			}		
    }	
}