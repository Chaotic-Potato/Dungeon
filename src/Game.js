var Game = {
	levelNum: 0,
	levels: [],
	keys: {},
	init: function() {
		const TICK_RATE = 60
		g.newLevel()
		g.loop = setInterval(g.tick, 1000 / TICK_RATE)
		r.draw()
	},
	keyDown: function(e) {
		g.keys[e.key] = true
	},
	keyUp: function(e) {
		g.keys[e.key] = false
	},
	newLevel: function() {
		g.levelNum++
		g.level = new Level(g.levelNum)
		g.level.generate(p.room[0], p.room[1])
		g.levels[g.levelNum] = g.level
	},
	tick: function() {
		p.tick()
		r.draw()
	}
}

var g = Game
document.onkeydown = g.keyDown
document.onkeyup = g.keyUp
g.init()
r.resize()
