var Stat = function(name, start, max, onLvl) {
	this.name = name
	this.baseLvl = start 
	this.max = max
	this.lvl = start
	this.onLvl = onLvl
}

Stat.prototype = {
	update: function() {
		var o = this.lvl
		this.lvl = this.baseLvl
		for (i in p.equipment.items) {
			this.lvl += (p.equipment.items[i][0] == null ? 0 : p.equipment.items[i][0].statChange[this.name] || 0)
			
		}
		this.onLvl(o)
	},
	lvlUp: function() {
		if (this.baseLvl < this.max) { 
			this.baseLvl = Math.min(this.baseLvl + 1, this. max)
			this.update()
			return true
		}
		return false
	}
}
