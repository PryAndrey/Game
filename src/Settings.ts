export const Settings = {
    WIDTH: 760,
    HEIGHT: 840,
	COLUMNS: 19,
	ROWS: 21,
	PAUSE: 15,
	FPS: 600/60,
	
	STEP: 2.5,
	GHOSTS_COUNT: 0,
	KEY: {
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		LEFT: 37,
	},
	CELL: {
		WIDTH: 760 / 19,
		HEIGHT: 840 / 21,
		COUNT: 21 * 19,
		
		FOOD_CELL: 0,
		WALL: 1,	
		EMPTY_CELL: 2,
		PACMAN: 3,
		GHOST: 4,	
	},	
	SCORE: {
		X: 12,
		Y: 27,
		COLOR: "red",
		FONT: "30px Arial",
	},
	SPRITES: {
        Ghost: new Image(),
		Wall: new Image(),
		EmptyCell: new Image(),
		FoodCell: new Image(),
		Top: new Image(),
		Bottom: new Image(),
		Right: new Image(),
		Left: new Image(),
    }
}

export enum Directions { 
	Up = -19,
	Left = -1,
	Stay = 0,
	Right = 1,
	Down = 19,
}