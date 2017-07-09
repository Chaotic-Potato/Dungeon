var Entity = function(x, y, texture, w, h, interact = function() {}, tick= function() {}) {
	this.x = x()
	this.y = y()
	this.texture = "entity/" + texture
	this.w = w
	this.h = h
	this.interact = interact
	this.tick = tick
}
