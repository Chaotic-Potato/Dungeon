var Animation = function(stacks, stack, tick) {
	this.stacks = stacks
	this.stack = stack
	this.tick = function() {
		tick()
		this.stacks[this.stack].tick()
	}
}
 
Animation.prototype = {
	get: function() {
		return this.stacks[this.stack].get()
	}
}
