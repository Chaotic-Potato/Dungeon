var Enemy = function(x, y, texture, w, h, ai, hp, speed, hitboxes) {
	var entity = new Entity(x, y, texture, w, h, undefined, function(){ai(entity)})
	entity.hp = hp
	entity.speed = speed
	entity.hitboxes = hitboxes
	entity.damaged = function(n, a) {
		entity.hp = Math.max(0, entity.hp - n)
		if (a != undefined) {
			entity.x += Math.cos(a) * 10
			entity.y += Math.sin(a) * 10
		}
	}
	return entity
} 
