var Keyboard = {
	keys: [],
	keyDown: function(e) {
		k.keys[e.key] = true
	},
	keyUp: function(e) {
		k.keys[e.key] = false
	},
	keyPress: function(e) {
		var keys = {
			e: function() {p.interact()},
			r: function() {if (g.screen == Screens.stats) {g.screen = Screens.game} else {g.screen = Screens.stats}},
			q: function() {if (g.screen == Screens.inv) {g.screen = Screens.game} else {g.screen = Screens.inv}}
		}
		for (var i = 0; i < 10; i++) {
			const n = i
			const f = function(){p.hotSelect = (n + 9) % 10}
			keys[i] = f
		}
		if (keys[e.key]) {
			keys[e.key]()
		}
	},
	tick: function() {
		var keys = {
			Escape: function() {g.loadMenu("pause")}
		}
		for (i in keys) {
			if (k.keys[i]) {
				keys[i]()
			}
		}
	}
}

var k = Keyboard
