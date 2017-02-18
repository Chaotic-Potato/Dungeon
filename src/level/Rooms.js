var Rooms = {
	getList: function(l) {
		return [
			{weight: 8, obj: []},
			{weight: 1, obj: []},
			{weight: 4, obj: [new Entities.Chest(function(){return l / 2}, function() {return l / 2})]},
			{weight: 3, obj: []},
			{weight: 4, obj: []}
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
				return list[i].obj
			}
		}
	}
}
