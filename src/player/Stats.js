var Stats = {
	list: {
		DEF: new Stat("DEF", 0, 100, function() {}),
		AGL: new Stat("AGL", 0, 100, function() {}),
		STR: new Stat("STR", 0, 100, function() {}),
		INT: new Stat("INT", 0, 100, function() {}),
		DEX: new Stat("DEX", 0, 100, function() {}),
		VIT: new Stat("VIT", 0, 100, function() {p.hp += p.getMaxHP() - p.getMaxHP(this.lvl - 1)}),
		WIS: new Stat("WIS", 0, 100, function() {p.mana += p.getMaxMana() - p.getMaxMana(this.lvl - 1)})
	}
}
