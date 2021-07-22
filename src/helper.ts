export function sleep(millis:number) {
	let j = (new Date()).getTime();
	while (((new Date()).getTime() - j) < millis) {	}
}

export enum Directions { //Directions.Up; - (-19)
	Up = -19,
	Left = -1,
	Stay = 0,
	Right = 1,
	Down = 19,
}