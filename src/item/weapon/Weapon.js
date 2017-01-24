var Weapon = function(name, texture, use, damage) {
	var item = new Item(name, texture, 1, 1, "weapon", use)
	item.damage = damage
	return item
}
