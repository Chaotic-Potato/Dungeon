var Entity = function(x, y, img, w, h, interact = function() {}, tick= function() {}) {
	this.x = x
	this.y = y
	this.img = img
	this.w = w
	this.h = h
	this.interact = interact
	this.tick = tick
}
