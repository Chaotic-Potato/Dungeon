var Stack = function(frames, frame, tick) {
	this.frames = frames
	this.frame = frame
	this.tick = tick	
}

Stack.prototype = {
	get: function() {
		return this.frames[this.frame]
	},
	next: function() {
		this.frame = (this.frame + 1) % this.frames.length
	}
}
