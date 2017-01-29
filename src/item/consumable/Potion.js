var Potion = function(name, texture, amount, maxAmount, statChange, duration, coolDown) {
	var item = new Consumable(name, texture, amount, maxAmount, function() {})
	item.statChange = statChange
	item.duration = duration
	item.coolDown = coolDown
	return item
}
