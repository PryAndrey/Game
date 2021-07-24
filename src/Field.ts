export class Field{
	map=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
		 1,4,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,4,1,
		 1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1,
		 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		 1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1,
		 1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,
		 1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,
		 2,2,2,1,0,1,0,0,0,0,0,0,0,1,0,1,2,2,2,
		 1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,1,
		 0,0,0,0,0,0,0,1,4,4,4,1,0,0,0,0,0,0,0,
		 1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,
		 2,2,2,1,0,1,0,0,0,4,0,0,0,1,0,1,2,2,2,
		 1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,
		 1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
		 1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1,
		 1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,
		 1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,
		 1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,
		 1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,
		 1,4,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,4,1,
		 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
		 
	public checkCell(i: number, Cell: number){
		if (this.map[i] == Cell){ 
			return true;
		} else {
			return false;
		}
	}
	
	public replaceCell(i: number, Cell: number){
		this.map[i] = Cell
	}
	
}