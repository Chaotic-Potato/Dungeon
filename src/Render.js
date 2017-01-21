var Render = {
	canvas: get("canvas"),
	ctxt: get("canvas").getContext("2d"),
	roomSize: 512,
	playerSize: 64,
	scale: 1,
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
		r.draw()
	},
	clear: function() {
		r.ctxt.clearRect(0, 0, r.getWidth(), r.getHeight())
	},
	drawImage: function(src, x, y, w, h) {
		var img = new Image()
		img.src = "imgs/" + src + ".png"
		r.ctxt.drawImage(img, x, y, w, h)
	},
	draw: function() {
		var funcs = [
			r.clear,
			r.room,
			r.player
		]
		for (i in funcs) {
			funcs[i]()
		}		
	},
	room: function() {
		r.drawImage("room", r.getCenterX() - p.x, r.getCenterY() - p.y, r.roomSize, r.roomSize)	
	},
	player: function() {
		r.drawImage("player", r.getCenterX() - (r.playerSize / 2), r.getCenterY() - (r.playerSize / 2), r.playerSize, r.playerSize)
	}
}

var r = Render
window.onresize = r.resize
r.resize()
