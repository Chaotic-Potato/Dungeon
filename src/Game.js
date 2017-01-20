var Game = {
	levelNum: 0,
	levels: [],
	init: function() {
		const TICK_RATE = 60
		g.newLevel()
		g.loop = setInterval(1000 / TICK_RATE, g.tick)
		r.draw()
	},
	newLevel: function() {
		g.levelNum++
		g.level = new Level(g.levelNum)
		g.levels[g.levelNum] = g.level
	},
	tick: function() {
		console.log()
	}
}

var g = Game
g.init()
