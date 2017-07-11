var Player = {
	init: function() {
		p.x = 0
		p.y = 0
		p.velX = 0
		p.velY = 0
		p.hp = 50
		p.mana = 25
		p.xp = 0
		p.statPoints = 0
		p.coins = 0
		p.room = {
			x: 0,
			y: 0
		}
		p.immuneTime = 0
		p.abilites = []
		p.hotSelect = 0
		p.selected = null
		p.inventory = new Inventory(10, 5)
		p.equipment = new Inventory(5, 1)
		p.itemCool = 0
		p.hitboxes = [
			new Hitbox(0, 0, 64, 64)
		]
		p.blocking = false
	},
	tick: function() {
		p.immuneTime = Math.max(0, p.immuneTime - 1)
		p.itemCool = Math.max(0, p.itemCool - 1)
		if (p.hp <= 0) {
			g.die()
		}
		p.move()
	},
	interact: function() {
		const MAX_RADIUS = 64
		var near = []
		var a = g.level.rooms[p.room.x][p.room.y].entities
		for (i in a) {
			var r = rad(a[i].x, a[i].y, p.x, p.y)
			if (r <= MAX_RADIUS) {
				near.push({ent: a[i], rad: r})
			}
		}	
		if (near.length == 0) {return}
		else {
			var min_rad = near[0].rad
			var min_obj = near[0]
			for (var i = 0; i < near.length; i++) {
				if (near[i].rad < min_rad) {
					min_rad = near[i].rad
					min_obj = near[i]
				}
			}
			min_obj.ent.interact()
		}
	},	
	move: function() {
		let dx = ((k.keys.d || 0) - (k.keys.a || 0)) * p.getSpeed()
		let dy = ((k.keys.s || 0) - (k.keys.w || 0)) * p.getSpeed()
		let dir = ang(dx, dy) || 0
		dx *= Math.abs(Math.cos(dir))
		dy *= Math.abs(Math.sin(dir))
		p.velX = conv(p.velX, dx, 0.2)
		p.velY = conv(p.velY, dy, 0.2)
		p.x += round(p.velX, 3)
		p.y += round(p.velY, 3)

		/*
		 *FIX!!!
		 */

		var a = g.level.rooms[p.room.x][p.room.y].doors 
		if (p.x < 0) {
			if (a.west && p.room.x > 0) {
				p.room.x--
				p.x = g.level.roomWidth - 1
			}
			else {
				p.x = 0
			}
		}
		if (p.x >= g.level.roomWidth) {
			if (a.east && p.room.x < g.level.roomWidth - 1) {
				p.room.x++
				p.x = 0
			}
			else {
				p.x = g.level.roomWidth - 1
			}
		}
		if (p.y < 0) {
			if (a.north && p.room.y > 0) {
				p.room.y--
				p.y = g.level.roomWidth - 1
			}
			else {
				p.y = 0
			}
		}
		if (p.y >= g.level.roomWidth) {
			if (a.south && p.room.y < g.level.roomWidth - 1) {
				p.room.y++
				p.y = 0
			}
			else {
				p.y = g.level.roomWidth - 1
			}
		}
	},
	use: function(x, y) {
		if (p.inventory.items[p.hotSelect][0] != null && !p.itemCool) {
			p.inventory.items[p.hotSelect][0].use(x, y)
		}
	},
	gainXp: function(n) {
		var old = p.xp
		p.xp += n
		if (p.getLevel(p.xp) > p.getLevel(old)) {
			p.statPoints += (p.getLevel(p.xp) - p.getLevel(old)) * 3
		} 
	},
	getLevel: function(xp) {
		return Math.round(Math.sqrt((8 * xp + 100) / 400))
	},
	xpProg: function() {
		return ((p.xp - 50 * (p.getLevel(p.xp) * (p.getLevel(p.xp) - 1))) / (p.getLevel(p.xp) * 100))
	},
	getMaxHP: function(lvl=Stats.list.VIT.lvl) {
		return Math.round(50 * Math.pow(10, lvl / 100))
	},
	getMaxMana: function(lvl=Stats.list.WIS.lvl) {
		return Math.round(25 * Math.pow(20, lvl / 100))
	},
	getSpeed: function(lvl=Stats.list.AGL.lvl) {
		return Math.round(6 * Math.pow(2, lvl / 100)) * (p.blocking == false ? 1 : 0.3)
	},
	select: function(x, y, click) {
		p.selected = {
			x: x, 
			y: y, 
			type: "main",
			click: click
		}
	},
	unSelect: function(x, y) {
		if (p.selected != null) {
			switch (p.selected.type) {
				case "main":
					p.inventory[p.selected.click ? "swap" : "half"](p.selected.x, p.selected.y, x, y)	
					break;
				case "equip":
					p.equipment.swap(p.selected.x, p.selected.y, x, y, p.inventory)
					Stats.update()
					break;
				case "inv":
					g.openInv[p.selected.click ? "swap" : "half"](p.selected.x, p.selected.y, x, y, p.inventory)
			}
			p.selected = null
		}
	},
	equipSelect: function(n) {
		p.selected = {
			x: n,
			y: 0,
			type: "equip",
			click: true
		}
	},
	equip: function(n) {
		if (p.selected != null && p.inventory.items[p.selected.x][p.selected.y].slot == n) {
			p.inventory.swap(p.selected.x, p.selected.y, n, 0, p.equipment)
			Stats.update()
		}
	},
	invSelect: function(n, click) {
		p.selected = {
			x: 0,
			y: n,
			type: "inv",
			click: click
		}
	},
	deposit: function(n) {
		if (p.selected != null) { 
			switch (p.selected.type) {
				case "main":
					p.inventory[p.selected.click ? "swap" : "half"](p.selected.x, p.selected.y, 0, n, g.openInv)
					break;
				case "inv":
					g.openInv[p.selected.click ? "swap" : "half"](p.selected.x, p.selected.y, 0, n)
			}
			p.selected = null
		}
	},
	del: function() {
		if (p.selected != null) {
			if (p.selected.type == "equip") {
				p.equipment.items[p.selected.x][p.selected.y] = null
				Stats.update()
			}
			else {
				p.inventory.items[p.selected.x][p.selected.y] = null
			}
		}
	},
	damage: function(n, dir) {
		if (p.immuneTime == 0) {
			p.hp -= n
			p.immuneTime = 30
			if (dir != undefined) {
				p.velX += Math.cos(dir) * 10
				p.velY += Math.sin(dir) * 10
			}
		}
	}
}

var p = Player
p.init()
