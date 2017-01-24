var Range = function(name, texture, damage, projectile) {
	var item = new Weapon(name, texture, function() {}, damage)
	item.projectile = projectile
	return item
}
