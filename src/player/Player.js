var Player = {
	init: function() {
		p.x = 0
		p.y = 0
		p.hp = 50
		p.mana = 25
		p.xp = 0
		p.statPoints = 0
		p.room = [0, 0]
		p.speed = 5
		p.abilites = []
		p.inventory = new Inventory(10, 5)
		p.equipment = new Inventory(5, 3)
	},
	interact: function() {
		const MAX_RADIUS = 64
		var near = []
		var a = g.level.rooms[p.room[0]][p.room[1]].entities
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
	move: function(array) {
		p.x += array[0] * p.speed
		p.y += array[1] * p.speed

		/*
		 *FIX!!!
		 */

		var a = g.level.rooms[p.room[0]][p.room[1]].doors 
		if (p.x < 0) {
			if (a.west && p.room[0] > 0) {
				p.room[0]--
				p.x = r.roomSize - 1
			}
			else {
				p.x = 0
			}
		}
		if (p.x >= r.roomSize) {
			if (a.east && p.room[0] < g.level.roomSize - 1) {
				p.room[0]++
				p.x = 0
			}
			else {
				p.x = r.roomSize - 1
			}
		}
		if (p.y < 0) {
			if (a.north && p.room[1] > 0) {
				p.room[1]--
				p.y = r.roomSize - 1
			}
			else {
				p.y = 0
			}
		}
		if (p.y >= r.roomSize) {
			if (a.south && p.room[1] < g.level.roomSize - 1) {
				p.room[1]++
				p.y = 0
			}
			else {
				p.y = r.roomSize - 1
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
	getMaxHP: function() {
		return Math.round(50 * Math.pow(10, Stats.list.VIT.lvl / 100))
	},
	getMaxMana: function() {
		return Math.round(25 * Math.pow(20, Stats.list.WIS.lvl / 100))
	}

}

var p = Player
