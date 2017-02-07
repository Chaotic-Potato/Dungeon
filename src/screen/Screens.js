var Screens = {
	game: new Screen([
			k.tick
		],
		[
			r.room,
			r.entities,
			r.player,
			r.lvlNum,
			r.clickboxes,
			r.hudStats,
			r.hotbar
		],
		[
			new Clickbox(function(){g.screen = Screens.stats}, function(){}, function(){}, "charScreen", function(){return r.getWidth() - 192}, function(){return r.getHeight() - 64}, 64, 64),
			new Clickbox(function(){g.screen = Screens.inv}, function(){}, function(){}, "invScreen", function(){return r.getWidth() - 128}, function(){return r.getHeight() - 64}, 64, 64),
			new Clickbox(function(){g.loadMenu("pause")}, function(){}, function(){}, "menu", function(){return r.getWidth() - 64}, function(){return r.getHeight() - 64}, 64, 64),
		]
	),
	stats: new Screen(
		[
			k.tick
		], 
		[
			r.stats,
			r.clickboxes
		], 
		(function(){
			var a = [new Clickbox(function(){g.screen = Screens.game}, function(){}, function(){}, "exit", function(){return r.getWidth() - 64}, function(){return 0}, 64, 64)]
			var i = 0
			for (x in Stats.list) {
				const n = i
				const z = x
				a.push(new Clickbox(function(){if (p.statPoints > 0 && Stats.list[z].lvlUp()) {Stats.list[z].update(); p.statPoints--}}, function(){}, function(){}, "statAdd", function(){return 64}, function() {return 184 + 72 * n}, 64, 64))
				i++
			}
			return a 
		})()
	),
	inv: new Screen(
		[
			k.tick
		], 
		[
			r.clickboxes,
			r.inventory
		],		
		(function(){
			var a = [
				new Clickbox(function(){g.screen = Screens.game}, function(){}, function(){}, "exit", function(){return r.getWidth() - 64}, function(){return 0}, 64, 64),
				new Clickbox(function(){}, function(){p.del()}, function(){}, "deleteSlot", function(){return 16}, function(){return r.getHeight() - 144}, 128, 128)
			]
			const l = p.inventory.items.length
			const h = p.inventory.items[0].length
			var slots = [
				{x: 0, y: 1},
				{x: 0, y: 0},
				{x: 0, y: -1},
				{x: -1, y: 0},
				{x: 1, y: 0}
			]
			for (i in slots) {
				const n = i
				a.push(new Clickbox(function(){p.equipSelect(n)}, function(){p.equip(n)}, function(){}, "invSlot", function(){return 208 + slots[n].x * 144}, function(){return r.getCenterY() - 64 + slots[n].y * 144}, 128, 128))
			}
			for (i in p.inventory.items) {
				for (j in p.inventory.items[i]) {
					const m = i
					const n = j
					a.push(new Clickbox(function(){p.onSelect(m, n)}, function(){p.unSelect(m, n)}, function(){p.rSelect(m, n)}, "invSlot", function(){return r.getCenterX() + (m - l / 2 + 2) * 136}, function(){return r.getCenterY() - (n - h / 2 + 1) * 136}, 128, 128))
				}
			}
			return a
		})()
	),
	openInv: new Screen(
		[
			k.tick
		],
		[
			r.clickboxes,
			r.openInv
		],
		(function(){
			var a = [
				new Clickbox(function(){g.screen = Screens.game}, function(){}, function(){}, "exit", function(){return r.getWidth() - 64}, function(){return 0}, 64, 64)
			]
			const l = p.inventory.items.length
			const h = p.inventory.items[0].length
			for (var i = 0; i < 5; i++) {
				const n = i
				a.push(new Clickbox(function(){p.invSelect(n)}, function(){p.deposit(n)}, function(){}, "invSlot", function(){return 136}, function(){return r.getCenterY() + ((n - g.openInv.items[0].length / 2) * 136)}, 128, 128))
			}
			for (i in p.inventory.items) {
				for (j in p.inventory.items[i]) {
					const m = i
					const n = j
					a.push(new Clickbox(function(){p.onSelect(m, n)}, function(){p.unSelect(m, n)}, function(){p.rSelect(m, n)}, "invSlot", function(){return r.getCenterX() + (m - l / 2 + 1) * 136}, function(){return r.getCenterY() - (n - h / 2 + 1) * 136}, 128, 128))
				}
			}
			return a
		})()
	)
}
