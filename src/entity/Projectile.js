var Projectile = function(x, y, texture, w, h, velX, velY) {
	return new Entity(x, y, texture, w, h, function() {}, function(){this.x += velX; this.y += velY})
}
