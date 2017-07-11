var Entities = {
	Enemy: {
		Ghost: function(x, y) {
			return new MeeleEnemy(x, y, "ghost", 64, 64, AIs.Meele, 1, 5, 10, 5, 3, 48, 64, Math.PI * 2 / 3, [new Hitbox(0, 0, 64, 64)])
		}
	},
	Level: {
		End: function(x, y) {
			return new Entity(x, y, "level/end", 64, 64, function() {
				g.newLevel()
			}, function() {})
		},
		Chest: function(x, y) {
			var e = new Entity(x, y, "level/chest", 64, 64, function() {
				g.loadInv(e.inventory)
			}, function() {})
			e.inventory = new Inventory(1, 5)
			return e
		},
		Shop: function(x, y) {
			return new Entity(x, y, "level/shop", 64, 64, function(){
				g.screen = Screens.shop
			}, function(){})
		}
	},
	Trap: {
		Saw: function(x, y, w, h, velX, velY, damage) {
			var e = new Entity(x, y, "trap/saw", w, h, function(){}, function(){})
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
				if (p.hitboxes.filter(function(h){return h.sectorInt(e.x + (e.w / 2) - p.x, e.y + (e.h / 2) - p.y, e.w / 2, 0, 0)}).length > 0) {
					p.damage(this.damage)
				}
			}
			return e
		}
	}
}
