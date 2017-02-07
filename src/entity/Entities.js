var Entities = {
	type: {
		End: function(x, y) {
			return new Entity(x, y, "end", 64, 64, function() {
				g.newLevel()
			}, function() {})
		},
		Chest: function(x, y) {
			var e = new Entity(x, y, "chest", 64, 64, function() {
				g.loadInv(e.inventory)
			}, function() {})
			e.inventory = new Inventory(1, 5)
			return e
		} 
	}
}
