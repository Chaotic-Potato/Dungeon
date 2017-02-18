var Entities = {
	End: function(x, y) {
		return new Entity(x, y, "end", 64, 64, function() {
			g.newLevel()
		}, function() {})
	},
	Chest: function(x, y) {
		var e = new Entity(x, y, "chest", 64, 64, function() {
			g.loadInv(e.inventory)
		}, function() {})
		e.inventory = new Inventory(1, 5)
		return e
	},
	Saw: function(x, y, w, h, velX, velY, damage) {
		var e = new Entity(x, y, "saw", w, h, function(){}, function(){})
		e.velX = velX
		e.velY = velY
		e.damage = damage
		e.tick = function() {
			this.x = Math.max(0, Math.min(g.level.roomWidth - 1, this.x + this.velX))
			this.y = Math.max(0, Math.min(g.level.roomWidth - 1, this.y + this.velY))
			if (Math.abs(this.x - (g.level.roomWidth - 1) / 2) >= (g.level.roomWidth - 1) / 2) {
				this.velX *= -1
			}
			if (Math.abs(this.y - (g.level.roomWidth - 1) / 2) >= (g.level.roomWidth - 1) / 2) {
				this.velY *= -1
			}
			if (range(this.x, this.y, p.x - this.w, p.y - this.h, p.x + this.w, p.y + this.h)) {
				p.damage(this.damage)
			}
		}
		return e
	} 
}
