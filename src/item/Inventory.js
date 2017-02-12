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
	swap: function (x1, y1, x2, y2, o = this) {
		if (this.items[x1][y1] != null && o.items[x2][y2] != null && this.items[x1][y1].equals(o.items[x2][y2]) && (o != this || (o == this && (x1 != x2 || y1 != y2)))) {
			this.combine(x1, y1, x2, y2, o)
		}
		else {
			var temp = this.items[x1][y1]
			this.items[x1][y1] =  o.items[x2][y2]
			o.items[x2][y2] = temp
		}
	},
	half: function(x1, y1, x2, y2, o = this) {
		if (o.items[x2][y2] == null && this.items[x1][y1] != null && this.items[x1][y1].amount > 1) {
			o.items[x2][y2] = clone(this.items[x1][y1])
			o.items[x2][y2].amount = Math.ceil(o.items[x2][y2].amount / 2)
			this.items[x1][y1].amount = Math.floor(this.items[x1][y1].amount / 2)
		}
		else {
			this.swap(x1, y1, x2, y2, o)
		}
	},
	combine: function(x1, y1, x2, y2, o = this) {
		if (this.items[x1][y1].amount + o.items[x2][y2].amount > this.items[x1][y1].maxAmount) {
			this.items[x1][y1].amount += o.items[x2][y2].amount - this.items[x1][y1].maxAmount
			o.items[x2][y2].amount = o.items[x2][y2].maxAmount
		}
		else {
			o.items[x2][y2].amount += this.items[x1][y1].amount
			this.items[x1][y1] = null
		}
	}
}
