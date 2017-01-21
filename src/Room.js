var Room = function() {
	this.doors= {
		north: false,
		east: false,
		south: false,
		west: false
	}
	this.visited = false
}

Room.prototype = {
	done: function() {
		delete this.visited
	}
}
