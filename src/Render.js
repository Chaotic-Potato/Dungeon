var Render = {
	resize: function() {
		get("canvas").width = window.innerWidth
		get("canvas").height = window.innerHeight
		r.draw()
	},
	draw: function() {
		
	}
}

var r = Render
window.onresize = r.resize
r.resize()
