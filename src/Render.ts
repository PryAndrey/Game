import {Pacman} from "./Pacman";
import {Ghost} from "./Ghost";
import {Field} from "./Field";
import {Settings, Directions} from "./Settings";

export class Render {

	private connectSprites(){
		Settings.SPRITES.Top.src = "img/PacmanT.png"
		Settings.SPRITES.Bottom.src = "img/PacmanB.png"
		Settings.SPRITES.Right.src = "img/PacmanR.png"
		Settings.SPRITES.Left.src = "img/PacmanL.png"	
		Settings.SPRITES.Ghost.src = "img/Ghost.png"
		Settings.SPRITES.Wall.src = "img/Wall.png" 
		Settings.SPRITES.EmptyCell.src = "img/EmptyCell.png"
		Settings.SPRITES.FoodCell.src = "img/FoodCell.png"
	}
	private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;
    constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.canvasContext = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }
	
	public initCanvas(){
		this.canvas.width = Settings.WIDTH;
		this.canvas.height = Settings.HEIGHT;
		this.connectSprites();
	}
	
    public draw(pacman:Pacman, ghosts:any, field:Field) {	
		this.canvasContext.clearRect(0, 0, Settings.WIDTH, Settings.HEIGHT);
		
		for(let i = 0; i <= Settings.CELL.COUNT; i++){
			if (field.checkCell(i, Settings.CELL.FOOD_CELL))  //FoodCell
				this.canvasContext.drawImage(Settings.SPRITES.FoodCell, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
			if (field.checkCell(i, Settings.CELL.WALL))  //Wall
				this.canvasContext.drawImage(Settings.SPRITES.Wall, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
			if (field.checkCell(i, Settings.CELL.EMPTY_CELL))  //EmptyCell
				this.canvasContext.drawImage(Settings.SPRITES.EmptyCell, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
			if (field.checkCell(i, Settings.CELL.PACMAN)) //pacman
				this.canvasContext.drawImage(Settings.SPRITES.EmptyCell, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
			if (field.checkCell(i, Settings.CELL.GHOST)){ //Ghost
				let memory = Ghost.getGhostMemory(ghosts, i);
				if (memory == Settings.CELL.FOOD_CELL)
					this.canvasContext.drawImage(Settings.SPRITES.FoodCell, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);  
				if (memory == Settings.CELL.EMPTY_CELL)
					this.canvasContext.drawImage(Settings.SPRITES.EmptyCell, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);  
			}
		}
		
		if (field.checkCell(pacman.position, Settings.CELL.PACMAN)){ //pacman
			if((pacman.nowDirection == Directions.Right) || (pacman.nowDirection == Directions.Stay))
				this.canvasContext.drawImage(Settings.SPRITES.Right,  Settings.CELL.WIDTH*(pacman.position%Settings.COLUMNS) + pacman.coordinateX, Settings.CELL.HEIGHT*Math.floor(pacman.position/Settings.COLUMNS) + pacman.coordinateY, Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
			if (pacman.nowDirection == Directions.Left) 
				this.canvasContext.drawImage(Settings.SPRITES.Left,   Settings.CELL.WIDTH*(pacman.position%Settings.COLUMNS) + pacman.coordinateX, Settings.CELL.HEIGHT*Math.floor(pacman.position/Settings.COLUMNS) + pacman.coordinateY, Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
			if (pacman.nowDirection == Directions.Up)   
				this.canvasContext.drawImage(Settings.SPRITES.Top,    Settings.CELL.WIDTH*(pacman.position%Settings.COLUMNS) + pacman.coordinateX, Settings.CELL.HEIGHT*Math.floor(pacman.position/Settings.COLUMNS) + pacman.coordinateY, Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
			if (pacman.nowDirection == Directions.Down) 
				this.canvasContext.drawImage(Settings.SPRITES.Bottom, Settings.CELL.WIDTH*(pacman.position%Settings.COLUMNS) + pacman.coordinateX, Settings.CELL.HEIGHT*Math.floor(pacman.position/Settings.COLUMNS) + pacman.coordinateY, Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
			
			pacman.updateCoordinates();
		}
			
		for(let i = 0; i <= Settings.CELL.COUNT; i++){	
			if (field.checkCell(i, Settings.CELL.GHOST)){ //Ghost
			
				let Count = 0;
				while(ghosts[Count].position != i){
					Count++;
				}
				this.canvasContext.drawImage(Settings.SPRITES.Ghost, Settings.CELL.WIDTH*(i%Settings.COLUMNS) + ghosts[Count].coordinateX, Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)) + ghosts[Count].coordinateY, Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
				Ghost.updateCoordinates(ghosts, Count);
			}
		}
		
		this.canvasContext.font = Settings.SCORE.FONT;
		this.canvasContext.fillStyle = Settings.SCORE.COLOR;
		this.canvasContext.fillText(pacman.score, Settings.SCORE.X, Settings.SCORE.Y);
	}
	
}