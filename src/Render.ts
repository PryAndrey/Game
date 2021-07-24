import {Pacman} from "./Pacman";
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
    constructor()
    {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.canvasContext = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }
	
	public initCanvas(WIDTH:number, HEIGHT:number){
		this.canvas.width = WIDTH;
		this.canvas.height = HEIGHT;
		this.connectSprites();
	}
	
    private drawCell(img: HTMLImageElement, x:number, y:number, width:number, height:number) {
		this.canvasContext.drawImage(img, x, y, width, height);
    }

    public draw(pacman:Pacman, field:Field) {	
		this.canvasContext.clearRect(0, 0, Settings.WIDTH, Settings.HEIGHT);
		
		for(let i = 0; i <= Settings.CELL.COUNT; i++){
			if (field.checkCell(i, Settings.CELL.FOOD_CELL))  //FoodCell
				this.drawCell(Settings.SPRITES.FoodCell, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
			if (field.checkCell(i, Settings.CELL.WALL))  //Wall
				this.drawCell(Settings.SPRITES.Wall, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
			if (field.checkCell(i, Settings.CELL.EMPTY_CELL))  //EmptyCell
				this.drawCell(Settings.SPRITES.EmptyCell, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
		
			if (field.checkCell(i, Settings.CELL.PACMAN)){ //pacman
				this.drawCell(Settings.SPRITES.EmptyCell, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
				
				if((pacman.nowDirection == Directions.Right) || (pacman.nowDirection == Directions.Stay))
					this.drawCell(Settings.SPRITES.Right, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
				if (pacman.nowDirection == Directions.Left) 
					this.drawCell(Settings.SPRITES.Left, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
				if (pacman.nowDirection == Directions.Up)   
					this.drawCell(Settings.SPRITES.Top, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
				if (pacman.nowDirection == Directions.Down) 
					this.drawCell(Settings.SPRITES.Bottom, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
			}
			if (field.checkCell(i, Settings.CELL.GHOST)){ //Ghost
				this.drawCell(Settings.SPRITES.EmptyCell, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);  
				this.drawCell(Settings.SPRITES.Ghost, Settings.CELL.WIDTH*(i%Settings.COLUMNS), Settings.CELL.HEIGHT*(Math.floor(i/Settings.COLUMNS)), Settings.CELL.WIDTH, Settings.CELL.HEIGHT);
			}
		}
		this.canvasContext.font = Settings.SCORE.FONT;
		this.canvasContext.fillStyle = Settings.SCORE.COLOR;
		this.canvasContext.fillText(pacman.score, Settings.SCORE.X, Settings.SCORE.Y);
	}
	
}