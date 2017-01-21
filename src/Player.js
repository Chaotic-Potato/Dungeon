var Player = {
	x: 0,
	y: 0,
	room: [0, 0],
	speed: 5,
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
	move: function(right, up) {
		p.x += right
		p.y += up

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
	moveUpdate: function() {
		var keys = {
			w: {vert: true, a: -1},
			s: {vert: true, a: 1},
			d: {vert: false, a: 1},
			a: {vert: false, a: -1}
		}
		for (i in keys) {
			if (g.keys[i]) {
				if (keys[i].vert){
					p.move(0, keys[i].a * p.speed)
				}
				else {
					p.move(keys[i].a * p.speed, 0)
				}
			}
		}
	},
	keyUpdate: function() {
		var keys = {
			e: p.interact
		}
		for (i in keys) {
			if (g.keys[i]) {
				keys[i]()
			}
		}
	},
	tick: function() {
		p.moveUpdate()
		p.keyUpdate()
	}
}

var p = Player
