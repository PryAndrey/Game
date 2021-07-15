# Пакмен
```
Сущности:

Game
---------
GameField: GameField
Draw();
UpdateState();
---------

GameField
---------
Pacman: Pacman
Ghosts: Ghost[]
Field: Cell[][]
---------

Cell
---------
CellState: CellState  "(Empty|Food|Wall)"
---------

Pacman
---------
direction: Direction
x: Number
y: Number
---------

Ghost
---------
direction: Direction
x: Number
y: Number
UpdateDirection()
UpdatePosition()
update()
---------

Direction
---------
Top
Bottom
Left
Right
---------

```
