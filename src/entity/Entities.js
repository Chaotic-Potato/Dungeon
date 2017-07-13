var Entities = {
	Enemy: {
		Ghost: function(x, y) {
			return new MeleeEnemy(x, y, "ghost", 64, 64, AIs.Melee, 1, 5, 10, 5, 3, 48, 64, Math.PI / 3, [new Hitbox(0, 0, 64, 64)])
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
			let getItem = function(a) {
				let choices = []
				for (i in a) {
					let t = new a[i]()
					if (t.lvlLo <= g.levelNum && g.levelNum <= t.lvlHi) {
						choices.push(i)
					}
				}
				if (choices.length) {
					return a[choices[Math.floor(Math.random() * choices.length)]]
				}
				else {
					return null
				}
			}
			let items = [
				{p: 0.2, i: function(){return null}},
				{p: 0.9, s: [
					{w: 3, i: function(){return new getItem(Items.Consumable.Potion)}},
					{w: 2, i: function(){return new getItem(Items.Consumable.Scroll)}}
				]},
				{p: 0.4, s: [
					{w: 1, i: function(){return new getItem(Items.Weapon.Melee)}},
					{w: 1, i: function(){return new getItem(Items.Weapon.Range)}},
					{w: 1, i: function(){return new getItem(Items.Weapon.Spell)}}
				]},
				{p: 0.35, s: [
					{w: 1, i: function(){return new getItem(Items.Equipment.Accessory)}},
					{w: 1, i: function(){return new getItem(Items.Equipment.Ring)}},
					{w: 2, s: [
						{w: 1, i: function(){return new getItem(Items.Equipment.Armor.Head)}},
						{w: 1, i: function(){return new getItem(Items.Equipment.Armor.Chest)}},
						{w: 1, i: function(){return new getItem(Items.Equipment.Armor.Legs)}}
					]}
				]},
				{p: 0.15, i: function(){return new getItem(Items.Ability)}
			]
			let o = []
			for (let i in items) {
				if (items[i].p > Math.random()) {
					if (items[i].s) {
						let total = 0
						for (let j in items[i].s) {
							total += items[i].s[j].w
						}
						total = Math.floor(total * Math.random())
						let j = -1
						while (total >= 0) {
							total -= items[i].s[1 + j++].w
						}
						if (items[i].s[j].s) {
							let total = 0
							for (let k in items[i].s[j].s) {
								total += items[i].s[j].s[k].w
							}
							total = Math.floor(total * Math.random())
							let k = -1
							while (total >= 0) {
								total -= items[i].s[j].s[1 + k++].w
							}
							o.push(items[i].s[j].s[k].i())
						}
						else {
							o.push(items[i].s[j].i())
						}
					}
					else {
						o.push(items[i].i())
					}
				}
			}
			for (i in o) {
				e.inventory.items[0][i] = o[i]
			}
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
				if (p.hitboxes.filter(function(h){return h.sectorInt(e.x + (e.w / 2) - p.x, e.y + (e.h / 2) - p.y, e.w / 2, 0, Math.PI)}).length > 0) {
					p.damage(this.damage)
				}
			}
			return e
		}
	}
}
