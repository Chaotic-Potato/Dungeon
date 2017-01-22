var Game = {
	loop: null,
	init: function() {
		p.init()
		g.levelNum = 0
		g.levels = []
		g.screen = Screens.game
		g.newLevel()
		g.pause()
		g.resume()
		r.resize()
		r.drawFrame()
	},
	pause: function() {
		clearInterval(g.loop)	
		r.render = false
		window.requestAnimationFrame(r.clear)
	},
	resume: function() {
		const TICK_RATE = 60
		g.pause()
		r.render = true
		r.drawFrame()
		g.loop = setInterval(g.tick, 1000 / TICK_RATE)
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
	loadMenu: function(menu = Menus.pause) {
		g.pause()
		get("menu").innerHTML = menu.getHtml()
	},
	exitMenu: function(menu) {
		get("menu").innerHTML = ""
		g.resume()
	},
}

var g = Game
document.onkeydown = k.keyDown
document.onkeyup = k.keyUp
window.requestAnimationFrame(r.drawFrame)
g.loadMenu(Menus.main)
