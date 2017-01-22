var Render = {
	canvas: get("canvas"),
	ctxt: get("canvas").getContext("2d"),
	roomSize: 512,
	playerSize: 64,
	scale: 1,
	render: true,
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
	drawImage: function(src, x, y, w, h) {
		var img = new Image()
		img.src = "imgs/" + src + ".png"
		r.ctxt.drawImage(img, x, y, w, h)
	},
	drawFrame: function() {
		r.clear()
		for (i in g.screen.render) {
			g.screen.render[i]()
		}		
		if (r.render) {
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
	}
}

var r = Render
window.onresize = r.resize
