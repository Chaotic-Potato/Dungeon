var Scroll = function(name, texture, amount, maxAmount, manaCost, projectile) {
	var item = new Consumable(name, texture, amount, maxAmount, function() {})
	item.manaCost = manaCost
	item.projectile = projectile
	return item
}
