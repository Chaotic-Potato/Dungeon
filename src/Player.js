var Player = {
	init: function() {
		p.x = 0
		p.y = 0
		p.hp = 50
		p.mana = 25
		p.xp = 0
		p.statPoints = 0
		p.room = [0, 0]
		p.abilites = []
		p.hotSelect = 0
		p.selected = null
		p.inventory = new Inventory(10, 5)
		p.equipment = new Inventory(5, 1)
	},
	interact: function() {
		const MAX_RADIUS = 64
		var near = []
		var a = g.level.rooms[p.room[0]][p.room[1]].entities
		for (i in a) {
			var r = rad(a[i].x(), a[i].y(), p.x, p.y)
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
	move: function(array) {
		p.x += array[0] * p.getSpeed()
		p.y += array[1] * p.getSpeed()

		/*
		 *FIX!!!
		 */

		var a = g.level.rooms[p.room[0]][p.room[1]].doors 
		if (p.x < 0) {
			if (a.west && p.room[0] > 0) {
				p.room[0]--
				p.x = g.level.roomWidth - 1
			}
			else {
				p.x = 0
			}
		}
		if (p.x >= g.level.roomWidth) {
			if (a.east && p.room[0] < g.level.roomWidth - 1) {
				p.room[0]++
				p.x = 0
			}
			else {
				p.x = g.level.roomWidth - 1
			}
		}
		if (p.y < 0) {
			if (a.north && p.room[1] > 0) {
				p.room[1]--
				p.y = g.level.roomWidth - 1
			}
			else {
				p.y = 0
			}
		}
		if (p.y >= g.level.roomWidth) {
			if (a.south && p.room[1] < g.level.roomWidth - 1) {
				p.room[1]++
				p.y = 0
			}
			else {
				p.y = g.level.roomWidth - 1
			}
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
		return Math.round(6 * Math.pow(2, lvl / 100))
	},
	onSelect: function(x, y) {
		p.selected = {
			x: x, 
			y: y, 
			type: "move"
		}
	},
	rSelect: function(x, y) {
		p.selected = {
			x: x,
			y: y,
			type: "half"
		}
	},
	unSelect: function(x, y) {
		if (p.selected != null) {
			switch (p.selected.type) {
				case "move":
					p.inventory.swap(p.selected.x, p.selected.y, x, y)	
					break;
				case "half":
					p.inventory.half(p.selected.x, p.selected.y, x, y)
					break;
				case "equip":
					p.unequip(x, y)
					break;
				case "inv":
					p.withdraw(x, y)
			}
			p.selected = null
		}
	},
	equipSelect: function(n) {
		p.selected = {
			x: n,
			y: 0,
			type: "equip"
		}
	},
	equip: function(n) {
		console.log(p.selected)
		if (p.selected != null && p.inventory.items[p.selected.x][p.selected.y] != null && p.equipment.items[n][0] == null && p.inventory.items[p.selected.x][p.selected.y].slot == n) {
			p.equipment.items[n][0] = p.inventory.items[p.selected.x][p.selected.y]
			p.inventory.items[p.selected.x][p.selected.y] = null
			Stats.update()
		}
	},
	unequip: function(x, y) {
		if (p.selected != null && p.inventory.items[x][y] == null) {
			p.inventory.items[x][y] = p.equipment.items[p.selected.x][p.selected.y]
			p.equipment.items[p.selected.x][p.selected.y] = null
			Stats.update()
		}
	},
	invSelect: function(n) {
		p.selected = {
			x: 0,
			y: n,
			type: "inv"
		}
	},
	deposit: function(n) {
		if (p.selected != null) { 
			switch (p.selected.type) {
				case "move":
					if (p.inventory.items[p.selected.x][p.selected.y] != null && g.openInv.items[0][n] == null) {
						g.openInv.items[0][n] = p.inventory.items[p.selected.x][p.selected.y]
						p.inventory.items[p.selected.x][p.selected.y] = null
					}
					break;
				case "inv":
					if (g.openInv.items[p.selected.x][p.selected.y] != null) {
						if (g.openInv.items[0][n] == null) {
							g.openInv.items[0][n] = g.openInv.items[p.selected.x][p.selected.y]
							g.openInv.items[p.selected.x][p.selected.y] = null
						}
						else {
							g.openInv.swap(0, n, p.selected.x, p.selected.y)
						}						
					}
			}
		}
	},
	withdraw: function(x, y) {
		if (p.selected != null && p.inventory.items[x][y] == null) {
			p.inventory.items[x][y] = g.openInv.items[p.selected.x][p.selected.y]
			g.openInv.items[p.selected.x][p.selected.y] = null
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
	}
}

var p = Player
p.init()
