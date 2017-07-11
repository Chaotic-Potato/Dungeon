var Item = function(name, texture, amount, maxAmount, type, use) {
	this.name = name
	this.texture = "item/" + texture
	this.amount = amount
	this.maxAmount = maxAmount
	this.type = type
	this.use = use
}

Item.prototype = {
	equals: function(o) {
		for (i in o) {
			if (o[i] != this[i] && i != "amount" && (typeof(o[i]) != typeof(this[i]) || typeof(o[i]) != "object" || !equals(o[i], this[i]))) {
				return false
			}
		}
		for (i in this) {
			if (o[i] != this[i] && i != "amount" && (typeof(o[i]) != typeof(this[i]) || typeof(o[i]) != "object" || !equals(o[i], this[i]))) {
				return false
			}
		}
		return true
	} 
}
