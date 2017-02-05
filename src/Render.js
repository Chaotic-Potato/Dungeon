var Render = {
	canvas: get("canvas"),
	ctxt: get("canvas").getContext("2d"),
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
		r.drawImage("room", r.getCenterX() - p.x, r.getCenterY() - p.y, g.level.roomWidth, g.level.roomWidth)	
		var a = g.level.rooms[p.room[0]][p.room[1]].doors
		for (i in a) {
			if (a[i]) {
				r.drawImage(i + "_door", r.getCenterX() - p.x, r.getCenterY() - p.y, g.level.roomWidth, g.level.roomWidth)
			}
		}
	},
	entities: function() {
		var a = g.level.rooms[p.room[0]][p.room[1]].entities
		for (i in a) {
			r.drawImage(a[i].texture, r.getCenterX() + a[i].x - p.x - (a[i].w / 2), r.getCenterY() + a[i].y - p.y - (a[i].h / 2), a[i].w, a[i].h)
		}
	},	
	player: function() {
		r.drawImage("player", r.getCenterX() - (r.playerSize / 2), r.getCenterY() - (r.playerSize / 2), r.playerSize, r.playerSize)
	},
	lvlNum: function() {
		r.drawText("bold small-caps 48px Arial", "#222", "left", "Floor " + g.levelNum, 8, 56)
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
	},
	hotbar: function() {
		const l = p.inventory.items.length
		r.drawImage("hotbar", r.getCenterX() - (32 * l) - 8, r.getHeight() - 80, 16 + l * 64, 80)	
		for (var i = 0; i < l; i++) {
			r.drawImage((p.hotSelect == i ? "selected" : "invSlot"), r.getCenterX() - (64 * (l / 2 - i)), r.getHeight() - 72, 64, 64)
			if (p.inventory.items[i][0] != null) {
				r.invSlot(p.inventory, i, 0, r.getCenterX() - (64 * (l / 2 - i)), r.getHeight() - 72, 64)
			}
		}
	},
	invSlot: function(inv, i, j, x, y, w) {
		r.drawImage(inv.items[i][j].texture, x, y, w, w)
		if (inv.items[i][j].amount > 1) {
			r.drawText("bold " + Math.round(0.25 * w) + "px Arial", "#FFF", "right", inv.items[i][j].amount, x + Math.round(w * 0.9), y + Math.round(w * 0.9))
		}
	},
	inventory: function() {
		const l = p.inventory.items.length
		const h = p.inventory.items[0].length
		var slots = [
			{x: 0, y: 1},
			{x: 0, y: 0},
			{x: 0, y: -1},
			{x: -1, y: 0},
			{x: 1, y: 0}
		]
		for (i in slots) {
			if (p.equipment.items[i][0] != null) {
				r.invSlot(p.equipment, i, 0, 208 + slots[i].x * 144, r.getCenterY() - 64 + slots[i].y * 144, 128)
			}
		}
		for (i in p.inventory.items) {
			for (j in p.inventory.items[i]) {
				if (p.inventory.items[i][j] != null) {
					r.invSlot(p.inventory, i, j, r.getCenterX() + (i - l / 2 + 2) * 136, r.getCenterY() - (j - h / 2 + 1) * 136, 128)
				}
			}
		}
	}
}

var r = Render
