export function processKey(e: any) { 
			if (e.keyCode == 38) { //Вверх
				Pacman.Direction.Next = -19;
			}
			if (e.keyCode == 40) { //Вниз
				Pacman.Direction.Next = 19;
			}
			if (e.keyCode == 37) { //Влево
				Pacman.Direction.Next = -1;
			}
			if (e.keyCode == 39) { //Вправо
				Pacman.Direction.Next = 1;
			}
		}