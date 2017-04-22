var Entities = {
	type: {
		End: function(x, y) {
			return new Entity(x, y, "end", 64, 64, function() {
				g.newLevel()
			}, function() {})
		} 
	}
}
