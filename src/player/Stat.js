var Stat = function(name, start, lvlBoost, max) {
	this.name = name
	this.baseLvl = start 
	this.lvlBoost
	this.max = max
	this.lvl = start
}

Stat.prototype = {
	update: function() {
		this.lvl = this.baseLvl
		for (i in p.equipment) {
			this.lvl += p.equipment[i][0].statChange[this.name] || 0
		}	
	},
	lvlUp: function() {
		this.baseLvl = (max == -1 ? this.baseLvl + this.lvlBoost : Math.min(this.baseLvl + this.lvlBoost, this. max))
	}
}
