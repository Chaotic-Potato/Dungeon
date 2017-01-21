var Player = {
	x: 0,
	y: 0,
	room: [0, 0],
	speed: 5,
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
			if (!!g.keys[i]) {
				if (keys[i].vert){
					p.move(0, keys[i].a * p.speed)
				}
				else {
					p.move(keys[i].a * p.speed, 0)
				}
			}
		}
	},
	tick: function() {
		p.moveUpdate()
	}
}

var p = Player
