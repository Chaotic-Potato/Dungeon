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
		if (this.items[x1][y1] != null && this.items[x2][y2] != null && this.items[x1][y1].equals(this.items[x2][y2]) && (x1 != x2 || y1 != y2)) {
			this.combine(x1,  y1, x2, y2)
		}
		else {
			var temp = this.items[x1][y1]
			this.items[x1][y1] =  this.items[x2][y2]
			this.items[x2][y2] = temp
		}
	},
	half: function(x1, y1, x2, y2) {
		if (this.items[x2][y2] == null && this.items[x1][y1] != null && this.items[x1][y1].amount > 1) {
			this.items[x2][y2] = clone(this.items[x1][y1])
			this.items[x2][y2].amount = Math.ceil(this.items[x2][y2].amount / 2)
			this.items[x1][y1].amount = Math.floor(this.items[x1][y1].amount / 2)
		}
		else {
			this.swap(x1, y1, x2, y2)
		}
	},
	combine: function(x1, y1, x2, y2) {
		if (this.items[x1][y1].amount + this.items[x2][y2].amount > this.items[x1][y1].maxAmount) {
			this.items[x1][y1].amount += this.items[x2][y2].amount - this.items[x1][y1].maxAmount
			this.items[x2][y2].amount = this.items[x2][y2].maxAmount
		}
		else {
			this.items[x2][y2].amount += this.items[x1][y1].amount
			this.items[x1][y1] = null
		}
	}
}
