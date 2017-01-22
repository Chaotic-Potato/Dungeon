var Game = {
	keys: {},
	init: function() {
		g.levelNum = 0
		g.levels = []
		g.screen = Screens.game
		g.newLevel()
		g.resume()
		r.drawFrame()
	},
	pause: function() {
		clearInterval(g.loop)	
	},
	resume: function() {
		const TICK_RATE = 60
		g.loop = setInterval(g.tick, 1000 / TICK_RATE)
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
		for (i in g.screen.tick) {
			g.screen.tick[i]()
		}
	},
	loadMenu: function(menu) {
		g.pause()
		r.clear()
		get("menu").innerHTML = menu.getHtml()
	},
	exitMenu: function(menu) {
		get("menu").innerHTML = ""
		g.resume()
	}
}

var g = Game
document.onkeydown = g.keyDown
document.onkeyup = g.keyUp
g.init()
r.resize()
