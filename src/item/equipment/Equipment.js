var Equipment = function(name, texture, statChange, slot) {
	var item = new Item(name, texture, 1, 1, "equipment", function() {})
	item.statChange = statChange
	item.slot = slot
	return item
}
