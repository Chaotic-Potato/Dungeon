var Keyboard = {
	keys: [],
	keyDown: function(e) {
		k.keys[e.key] = true
	},
	keyUp: function(e) {
		k.keys[e.key] = false
	},
	tick: function() {
		var keys = {
			w: {func: p.move, param:[0, -1]},
			s: {func: p.move, param:[0, 1]},
			a: {func: p.move, param:[-1, 0]},
			d: {func: p.move, param:[1, 0]},
			e: {func: p.interact},
			Escape: {func: g.loadMenu, param: Menus.pause}
		}
		for (i in keys) {
			if (k.keys[i]) {
				keys[i].func(keys[i].param)
			}
		}
	}
}

var k = Keyboard
