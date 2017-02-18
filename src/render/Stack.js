var Stack = function(frames, frame, tick) {
	this.frames = frames
	this.frame = frame
	this.tick = tick	
}

Stack.prototype = function() {
	get: function() {
		return this.frames[this.frame]
	}
}
