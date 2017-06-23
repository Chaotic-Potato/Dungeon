var Enemy = function(x, y, texture, w, h, ai, hp, speed) {
	var entity = new Entity(x, y, texture, w, h, undefined, function(){ai(entity)})
	entity.hp = hp
	entity.speed = speed
	return entity
} 
