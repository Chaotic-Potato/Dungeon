var Armor = function(name, texture, armor, slot) {
	item = new Equipment(name, texture, {DEF: armor}, slot)
	return item
}
