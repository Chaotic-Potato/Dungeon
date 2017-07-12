var Rooms = {
	getList: function(l) {
		return [
			{weight: 8, obj: function(){return []}},
			{weight: 1, obj: function(){return [new Entities.Level.Shop(function(){return l / 2}, function(){return l / 2})]}},
			{weight: 4, obj: function(){return [new Entities.Level.Chest(function(){return l / 2}, function(){return l / 2})]}},
			{weight: 3, obj: function(){
				var o = []
				for (var i = 1; i <= 2; i++) {
					for (var j = 0; j < 2; j++) {
						o.push(new Entities.Trap.Saw(function(){return l * i / 3}, function(){return Math.floor(Math.random() * l)}, 64, 64, 0, 10 * ((2 * Math.round(Math.random())) - 1), Math.round(3 * Math.pow(10, g.levelNum / 100))))
						o.push(new Entities.Trap.Saw(function(){return Math.floor(Math.random() * l)}, function(){return l * i / 3}, 64, 64, 10 * ((2 * Math.round(Math.random())) - 1), 0, Math.round(3 * Math.pow(10, g.levelNum / 100))))
					}
				}
				return o
			}},
			{weight: 4, obj: function(){
				let o = []
				for (let i = 1; i < 4; i++) {
					for (let j = 1; j < 4; j++) {
						if ((i + j) % 2 == 0) {
							o.push(new Entities.Enemy[(function(){let e = g.getEnemies(); return e[Math.floor(Math.random() * e.length)]})()](function(){return i * l / 4}, function(){return j * l / 4}))
						}
					}
				}
				return o
			}}
		]
	},
	getRoom: function(l) {
		var total = 0
		var list = Rooms.getList(l)
		for (i in list) {
			total += list[i].weight
		}
		var choice = Math.floor(total * Math.random())
		for (i in list) {
			choice -= list[i].weight
			if (choice < 0) {
				return list[i].obj()
			}
		}
	}
}
