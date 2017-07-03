var AIs = {
	Meele: function(e) {
		var dx = e.x - p.x
		var dy = e.y - p.y
		var dir = Math.asin(dy / Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))) * (dx > 0 ? 1 : -1 ) + (dx > 0 ? Math.PI : 0)
		if (!e.dir) {
			e.dir = 0
		}
		e.dir = ((Math.abs(e.dir - dir) + (Math.PI * 2)) % (Math.PI * 2) >= (Math.PI / 2) ? Math.round(dir / Math.PI * 2) * Math.PI / 2 : e.dir)
		e.x += Math.min(Math.abs(dx), Math.max(-1 * Math.abs(dx), e.speed * Math.round(Math.cos(e.dir))))
		e.y += Math.min(Math.abs(dy), Math.max(-1 * Math.abs(dy), e.speed * Math.round(Math.sin(e.dir))))
		e.attack(e.dir)
	}
}
