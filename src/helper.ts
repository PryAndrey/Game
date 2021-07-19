export function sleep(millis: number) {
			let j = (new Date()).getTime();
			let i = 0;
			while (((new Date()).getTime() - j) < millis) {
				i++;
			}
	   }

export function getRandomIntInclusive(min: number, max: number) {
		   min = Math.ceil(min);
		   max = Math.floor(max);
		   return Math.floor(Math.random() * (max - min + 1)) + min;
	   }