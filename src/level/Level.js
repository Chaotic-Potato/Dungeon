var Level = function(n, w) {
	const START_SIZE = 3
	const MOD = 5
	this.roomSize = START_SIZE + Math.floor((n - 1) / MOD)	
	this.roomWidth = w
	this.rooms = []
	for (var i = 0; i < this.roomSize; i++) {
		this.rooms[i] = []
		for (var j = 0; j < this.roomSize; j++) {
			this.rooms[i][j] = new Room()
		}
	}
}

Level.prototype = {
	generateRooms: function(array, x, y) {
		array[x][y].visited = true
		var sides = [
			{name: "north", opp: "south", x: 0, y: -1},
			{name: "south", opp: "north", x: 0, y: 1},
			{name: "east", opp: "west", x: 1, y: 0},
			{name: "west", opp: "east", x: -1, y: 0}
		]
		function getSide(x, y) {
			if (!array[x] || !array[x][y]) {
				return true
			}
			else {
				return array[x][y].visited
			}
		}
		var choices = []
		for (i in sides) {
			if (!getSide(x + sides[i].x, y + sides[i].y)) {
				choices.push(sides[i])
			}
		}
		if (choices.length != 0) {
			var newSide = choices[Math.floor(Math.random() * choices.length)]
			array[x][y].doors[newSide.name] = true
			array[x + newSide.x][y + newSide.y].doors[newSide.opp] = true
			this.generateRooms(array, x + newSide.x, y + newSide.y)
			this.generateRooms(array, x, y)
		}
		else if (!this.end) {
			this.end = [x, y]
		}
		else if (x != this.start[0] || y != this.start[1]) {
			array[x][y].entities = Rooms.getRoom()
		}
	},
	generate: function(x, y) {	
		this.start = [x, y]
		this.generateRooms(this.rooms, x, y)
		for (i in this.rooms) {
			for (j in this.rooms[i]) {
				delete this.rooms[i][j].visited
			}
		}
		this.rooms[this.end[0]][this.end[1]].entities.push(new Entities.type.End(function(){return g.level.roomWidth / 2}, function() {return g.level.roomWidth / 2}))
		delete this.start
		delete this.end
	}
}
