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
			1: function() {p.hotSelect = 0},
			2: function() {p.hotSelect = 1},
			3: function() {p.hotSelect = 2},
			4: function() {p.hotSelect = 3},
			5: function() {p.hotSelect = 4},
			6: function() {p.hotSelect = 5},
			7: function() {p.hotSelect = 6},
			8: function() {p.hotSelect = 7},
			9: function() {p.hotSelect = 8},
			0: function() {p.hotSelect = 9},
			e: function() {p.interact()},
			r: function() {if (g.screen == Screens.stats) {g.screen = Screens.game} else {g.screen = Screens.stats}},
			q: function() {if (g.screen == Screens.inv) {g.screen = Screens.game} else {g.screen = Screens.inv}}
		}
		if (keys[e.key]) {
			keys[e.key]()
		}
	},
	tick: function() {
		var keys = {
			w: function() {p.move([0, -1])},
			s: function() {p.move([0, 1])},
			a: function() {p.move([-1, 0])},
			d: function() {p.move([1, 0])},
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
