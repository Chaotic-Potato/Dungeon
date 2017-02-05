var Rooms = {
	list: [
		{weight: 1, obj: []}	
	],
	getRoom: function() {
		var total = 0
		for (i in Rooms.list) {
			total += Rooms.list[i].weight
		}
		var choice = Math.floor(total * Math.random())
		for (i in Rooms.list) {
			choice -= Rooms.list[i].weight
			if (choice < 0) {
				return Rooms.list[i].obj
			}
		}
	}
}
