var MeleeEnemy = function(x, y, texture, w, h, ai, lvlLo, lvlHi, hp, speed, damage, cooldown, reach, angleWidth, hitboxes) {
	var entity = new Enemy(x, y, texture, w, h, function(e){entity.coolTimer = Math.max(0, entity.coolTimer - 1); ai(e)}, lvlLo, lvlHi, hp, speed)
	entity.damage = damage
	entity.cooldown = cooldown
	entity.coolTimer = 0
	entity.angleWidth = angleWidth
	entity.reach = reach
	entity.hitboxes = hitboxes
	entity.attack = function(dir) {
		if (!entity.coolTimer) {
			entity.coolTimer = entity.cooldown
			if ((p.blocking == false || angDist(p.blocking, dir) <= Math.PI * 2 / 3) && p.hitboxes.filter(function(e){return e.sectorInt(entity.x + (entity.w / 2) - p.x, entity.y + (entity.h / 2) - p.y, entity.reach, dir, entity.angleWidth)}).length > 0) {
				p.damage(entity.damage, ang(p.x - entity.x, p.y - entity.y))
			}
		}	
	}
	entity.getDps = function() {
		return g.tickRate * entity.damage / entity.cooldown
	}
	return entity
} 
