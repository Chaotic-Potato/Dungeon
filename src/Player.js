var Player = {
	x: 0,
	y: 0,
	room: [0,0],
	speed: 5,
	move: function(right, up) {
		p.x += right
		p.y += up
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
