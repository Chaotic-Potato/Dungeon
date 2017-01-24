var Consumable = function(name, texture, amount, maxAmount, type, use) {
	var item = new Item(name, texture, amount, maxAmount, "consumable", use)
	return item
}
