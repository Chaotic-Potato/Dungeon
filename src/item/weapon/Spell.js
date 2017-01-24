var Spell = function(name, texture, damage, manaCost, projectile) {
	var item = new Weapon(name, texture, function() {}, damage)
	item.manaCost = manaCost
	item.projectile = projectile
	return item
}
