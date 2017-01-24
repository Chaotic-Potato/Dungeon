var Armor = function(name, texture, armor, slot) {
	item = new Equipment(name, texture, {armor: armor}, slot)
	return item
}
