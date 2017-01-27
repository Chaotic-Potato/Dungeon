var Render = {
	canvas: get("canvas"),
	ctxt: get("canvas").getContext("2d"),
	roomSize: 512,
	playerSize: 64,
	scale: 1,
	render: false,
	getWidth: function() {
		return window.innerWidth
	},
	getHeight: function() {
		return window.innerHeight
	},
	getCenterX: function() {
		return window.innerWidth / 2
	},
	getCenterY: function() {
		return window.innerHeight / 2
	},
	resize: function() {
		get("canvas").width = r.getWidth()
		get("canvas").height = r.getHeight()
	},
	clear: function() {
		r.ctxt.clearRect(0, 0, r.getWidth(), r.getHeight())
	},
	drawImage: function(src, x, y, w, h, sx, sy, sw, sh) {
		var img = new Image()
		img.src = "imgs/" + src + ".png"
		if (sx) {
			r.ctxt.drawImage(img, sx, sy, sw, sh, x, y, w, h)
		}
		else {
			r.ctxt.drawImage(img, x, y, w, h)
		}
	},
	drawText: function(font, color, textAlign, text, x, y) {
		r.ctxt.font = font
		r.ctxt.fillStyle = color
		r.ctxt.textAlign = textAlign
		r.ctxt.fillText(text, x, y)
	},
	drawFrame: function() {
		if (r.render) {
			r.clear()
			for (i in g.screen.render) {
				g.screen.render[i]()
			}		
			window.requestAnimationFrame(r.drawFrame)
		}
	},
	room: function() {
		r.drawImage("room", r.getCenterX() - p.x, r.getCenterY() - p.y, r.roomSize, r.roomSize)	
		var a = g.level.rooms[p.room[0]][p.room[1]].doors
		for (i in a) {
			if (a[i]) {
				r.drawImage(i + "_door", r.getCenterX() - p.x, r.getCenterY() - p.y, r.roomSize, r.roomSize)
			}
		}
	},
	entities: function() {
		var a = g.level.rooms[p.room[0]][p.room[1]].entities
		for (i in a) {
			r.drawImage("end", r.getCenterX() + a[i].x - p.x - (a[i].w / 2), r.getCenterY() + a[i].y - p.y - (a[i].h / 2), a[i].w, a[i].h)
		}
	},	
	player: function() {
		r.drawImage("player", r.getCenterX() - (r.playerSize / 2), r.getCenterY() - (r.playerSize / 2), r.playerSize, r.playerSize)
	},
	clickboxes: function() {
		for (i in g.screen.clickboxes) {
			var a = g.screen.clickboxes[i]
			r.drawImage(a.texture, a.x(), a.y(), a.w, a.h)
		}
	},
	stats: function() {
		r.drawText("bold small-caps 96px Arial", "#000", "left", "Player Stats:", 64, 160)
		var i = 0;
		for (x in Stats.list) {
			var a = Stats.list[x]
			r.drawText("bold small-caps 48px Arial", "#000", "left", a.name + ": " + a.lvl + (a.lvl == a.baseLvl ? "" : " [" + a.baseLvl + (a.lvl > a.baseLvl ? "+" : "-") + Math.abs(a.lvl - a.baseLvl)  + "]") + " / " + a.max, 136, 232 + (i * 72))
			i++
		}
		r.drawText("bold small-caps 48px Arial", "#000", "left", "Stat Points: " + p.statPoints, 136, 232 + (i * 72))

	},
	hudStats: function() {
		var stat = {
			hp: {get: function(){return p.hp / p.getMaxHP()}, disp: function(){return p.hp + " / " + p.getMaxHP()}},
			mana: {get: function(){return p.mana / p.getMaxMana()}, disp: function(){return p.mana + " / " + p.getMaxMana()}},
			xp: {get: function(){return p.xpProg()}, disp: function(){return p.getLevel(p.xp) + " [" + Math.floor(p.xpProg() * 100) + "%]"}}
		}
		var i = 3
		for (x in stat) {
			r.drawImage(x + "Bar", 8, r.getHeight() - (56 * i), 272, 48)
			r.drawImage(x + "BarFull", 16, r.getHeight() - (56 * i), 256 * stat[x].get(), 48, 8, 0, 256 * stat[x].get(), 48)
			r.drawText("24px Arial", "#000", "center", stat[x].disp(), 144, r.getHeight() - 56 * i + 32)
			i--
		}
	}
	
}

var r = Render
