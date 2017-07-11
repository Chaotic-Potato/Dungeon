var Hitbox = function(x0, y0, x1, y1) {
	this.x0 = x0
	this.y0 = y0
	this.x1 = x1
	this.y1 = y1
}

Hitbox.prototype = {
	sectorInt(cx, cy, r, a, aw) {
		if (range(cx, cy, this.x0, this.y0, this.x1, this.y1)) {
			return true
		}
		let ax = (this.x0 + this.x1) / 2
		let ay = (this.y0 + this.y1) / 2
		let as = []
		if (rad(ax, ay, cx, cy) < r) {
			as.push((((ay - cy) / r < 0 ? 2 * Math.PI : 0) - Math.acos((ax - cx) / r)) * (ay - cy < 0 ? 1 : -1))
		}
		for (let i = 0; i < 8; i++) {
			let c = [this.x0, this.x1, this.y0, this.y1][Math.floor(i / 2)]
			let x = (i < 4 ? c : cx + (Math.sqrt(Math.pow(r, 2) - Math.pow(c - cy, 2)) * (i % 2 ? -1 : 1)))
			let y = (i < 4 ? cy + (Math.sqrt(Math.pow(r, 2) - Math.pow(c - cx, 2)) * (i % 2 ? -1 : 1)) : c)
			if (x == NaN || y == NaN) {
				continue
			}
			if (range(x, y, this.x0, this.y0, this.x1, this.y1)) {
				as.push(ang(x - cx, y - cy))	
			}
		}
		as = as.filter(function(e){angDist(a, e) >= (aw / 2)})
		return as.length > 0 || [hitBoxReg(this, [cx, cy], a + aw), hitBoxReg(this, [cx, cy], a - aw)].filter(function(e){return e != null && e <= r}).length > 0
	}
}
