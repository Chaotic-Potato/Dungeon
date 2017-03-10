var Animations = {
	list: {
	
	}
	tick: function() {
		for (i in Animations.list) {
			Animations.list[i].tick()
		}	
	}
}
