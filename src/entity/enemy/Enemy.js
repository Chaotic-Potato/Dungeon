var Enemy = function(x, y, texture, w, h, ai, hp, speed, hitboxes) {
	var entity = new Entity(x, y, texture, w, h, undefined, function(){ai(entity)})
	entity.hp = hp
	entity.speed = speed
	entity.hitboxes = hitboxes
	entity.damaged = function(n) {
		entity.hp = Math.max(0, entity.hp - n)
	}
	return entity
} 
