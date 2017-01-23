var Inventory = function(w, h) {
	this.items = []
	for (var i = 0; i < w; i++) {
		this.items[i] = []
		for (var j = 0; j < h; j++) {
			this.items[i][j] = null
		}
	}
}

Inventory.prototype = {
	swap: function (x1, y1, x2, y2) {
		var temp = this.items[x1][y1]
		this.items[x1][y1] =  this.items[x2][y2]
		this.items[x2][y2] = temp
	}
}
