var Meele = function(name, texture, damage, swingTime, length) {
	var item = new Weapon(name, texture, function() {}, damage)
	item.swingTime = swingTime
	item.length = length
	return item
}
