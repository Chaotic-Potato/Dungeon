var Meele = function(name, texture, damage, cooldown, length, angleWidth) {
	var item = new Weapon(name, texture, function(x, y) {
		let a = ang(x - (get("canvas").width / 2), y - (get("canvas").height / 2))
		p.itemCool = item.cooldown
		g.level.rooms[p.room.x][p.room.y].entities.forEach(function(e){
			if (e.hp != undefined && e.hitboxes.filter(function(h){
				return h.sectorInt(p.x + (r.playerSize / 2) - e.x, p.y + (r.playerSize / 2) - e.y, item.length, a, item.angleWidth)
			}).length > 0){
				e.damaged(item.damage, a)
			}
		})
	}, damage)
	item.cooldown = cooldown
	item.length = length
	item.angleWidth = angleWidth
	return item
}
