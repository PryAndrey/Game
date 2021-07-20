export function sleep(millis:number) {
	let j = (new Date()).getTime();
	while (((new Date()).getTime() - j) < millis) {	}
}