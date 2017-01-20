var Level = function(n) {
	const START_SIZE = 3
	const MOD = 5
	this.roomSize = START_SIZE + Math.floor((n - 1) / MOD)	
	this.rooms = []
	for (var i = 0; i < this.roomSize; i++) {
		this.rooms[i] = []
		for (var j = 0; j < this.roomSize; j++) {
			this.rooms[i][j] = new Room()
		}
	}
}

Level.prototpye = {

}
