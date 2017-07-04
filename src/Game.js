var Game = {
	loop: null,
	started: false,
	init: function() {
		p.init()
		g.levelNum = 0
		g.openInv = null
		g.started = true
		g.levels = []
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
	die: function() {
		g.started = false
		g.loadMenu("dead")
	},
	newLevel: function() {
		g.levelNum++
		g.level = new Level(g.levelNum, 1024)
		g.level.generate(p.room.x, p.room.y)
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
		switch (e.which) {
			case 1:
				g.lclick(e)
				break;
			case 3:
				g.rclick(e)

		}
	},
	lclick: function(e) {
		for (i in g.screen.clickboxes) {
			var a = g.screen.clickboxes[i]
			if (range(e.offsetX, e.offsetY, a.x(), a.y(), a.x() + a.w, a.y() + a.h)) {
				a.click()
				return
			}
		}
		p.use(e.offsetX, e.offsetY)
	},
	unclick: function(e) {
		if (e.which == 3) {
			p.blocking = false
			p.itemCool = 30
		}
		for (i in g.screen.clickboxes) {
			var a = g.screen.clickboxes[i]
			if (range(e.offsetX, e.offsetY, a.x(), a.y(), a.x() + a.w, a.y() + a.h)) {
				a.unclick()
				return
			}
		}
	},
	rclick: function(e) {
		for (i in g.screen.clickboxes) {
			var a = g.screen.clickboxes[i]
			if (range(e.offsetX, e.offsetY, a.x(), a.y(), a.x() + a.w, a.y() + a.h)) {
				a.rclick()
				return
			}
		}
		if (p.inventory.items[p.hotSelect][0] != null && p.inventory.items[p.hotSelect][0].blockable) {
			p.blocking = ang(e.offsetX - (get("canvas").width / 2), e.offsetY - (get("canvas").height / 2))
		}
	},
	loadInv: function(i) {
		g.openInv = i
		g.screen = Screens.openInv
	},
	entityTick: function() {
		for (i in g.level.rooms[p.room.x][p.room.y].entities) {
			g.level.rooms[p.room.x][p.room.y].entities[i].tick()
		}
		g.level.rooms[p.room.x][p.room.y].entities = g.level.rooms[p.room.x][p.room.y].entities.filter(function(e){return e.hp != 0})
	}
}

var g = Game
