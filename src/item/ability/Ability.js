var Ability = function(name, texture, statChange, duration) {
	var item = new Item(name, texture, 1, 1, "ability", function() {})
	item.statChange = statChange
	item.duration = duration
	return item
}
