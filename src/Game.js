var Game = {
	loop: null,
	screen: Screens.game,
	init: function() {
		p.init()
		g.levelNum = 0
		g.levels = []
		g.screen = Screens.game
		g.newLevel()
		g.pause()
		g.resume()
		r.resize()
	},
	pause: function() {
		clearInterval(g.loop)	
		r.render = false
		r.clear()
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
	loadMenu: function(menu) {
		g.pause()
		get("menu").innerHTML = Menus[menu].getHtml()
	},
	exitMenu: function(menu) {
		get("menu").innerHTML = ""
		g.resume()
	},
	click: function(e) {
		for (i in g.screen.clickboxes) {
			var a = g.screen.clickboxes[i]
			if (range(e.offsetX, e.offsetY, a.x(), a.y(), a.x() + a.w, a.y() + a.h)) {
				a.click()
				return
			}
		}
	}
}

var g = Game
document.onkeydown = k.keyDown
document.onkeyup = k.keyUp
document.onkeypress = k.keyPress
window.onresize = r.resize
document.onclick = g.click
g.loadMenu("main")
