var Accessory = function(name, texture, statChange) {
	var item = new Equipment(name, "accessory/" + texture, statChange, 3)
	return item
}
