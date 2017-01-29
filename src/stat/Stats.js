var Stats = {
	list: {
		DEF: new Stat("DEF", 0, 100, function() {}),
		AGL: new Stat("AGL", 0, 100, function() {}),
		STR: new Stat("STR", 0, 100, function() {}),
		INT: new Stat("INT", 0, 100, function() {}),
		DEX: new Stat("DEX", 0, 100, function() {}),
		VIT: new Stat("VIT", 0, 100, function(o) {p.hp = p.hp + p.getMaxHP() - p.getMaxHP(o)}),
		WIS: new Stat("WIS", 0, 100, function(o) {p.mana = p.mana + p.getMaxMana() - p.getMaxMana(o)})
	},
	update: function() {
		for (i in Stats.list) {
			Stats.list[i].update()
		}
	}
}
