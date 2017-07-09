var Enemy = function(x, y, texture, w, h, ai, hp, speed, hitboxes) {
	var entity = new Entity(x, y, texture, w, h, undefined, function(){
		ai(entity)
		entity.velX = conv(entity.velX, entity.lVelX, 0.2)
		entity.velY = conv(entity.velY, entity.lVelY, 0.2)
		entity.x += round(entity.velX, 3)
		entity.y += round(entity.velY, 3)
	})
	entity.hp = hp
	entity.speed = speed
	entity.hitboxes = hitboxes
	entity.velX = 0
	entity.velY = 0
	entity.lVelX = 0
	entity.lVelY = 0
	entity.damaged = function(n, a) {
		entity.hp = Math.max(0, entity.hp - n)
		if (a != undefined) {
			entity.velX += Math.cos(a) * 10
			entity.velY += Math.sin(a) * 10
		}
	}
	entity.move = function(x, y) {
		entity.lVelX = x
		entity.lVelY = y
	}
	return entity
} 
