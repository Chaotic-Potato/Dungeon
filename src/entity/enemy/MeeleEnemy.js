var MeeleEnemy = function(x, y, texture, w, h, ai, hp, speed, damage, cooldown, reach, angleWidth) {
	var entity = new Enemy(x, y, texture, w, h, function(e){entity.coolTimer = Math.max(0, entity.coolTimer - 1); ai(e)}, hp, speed)
	entity.damage = damage
	entity.cooldown = cooldown
	entity.coolTimer = 0
	entity.angleWidth = angleWidth
	entity.reach = reach
	entity.attack = function(dir) {
		if (!entity.coolTimer) {
			entity.coolTimer = entity.cooldown
			if (p.hitboxs.filter(function(e){return e.sectorInt(entity.x - p.x, entity.y - p.y, entity.reach, dir, entity.angleWidth)}).length > 0) {
				p.damage(entity.damage)
			}
		}	
	}
	return entity
} 
