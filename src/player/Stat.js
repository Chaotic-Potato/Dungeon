var Stat = function(name, start, max) {
	this.name = name
	this.baseLvl = start 
	this.max = max
	this.lvl = start
}

Stat.prototype = {
	update: function() {
		this.lvl = this.baseLvl
		for (i in p.equipment.items) {
			this.lvl += (p.equipment.items[i][0] == null ? 0 : p.equipment[i][0].items.statChange[this.name])
		}	
	},
	lvlUp: function() {
		if (baseLvl = max) { 
			this.baseLvl = Math.min(this.baseLvl + 1, this. max)
			return true
		}
		return false
	}
}
