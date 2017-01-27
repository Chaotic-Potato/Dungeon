var Screens = {
	game: new Screen([
			k.tick
		],
		[
			r.room,
			r.entities,
			r.player,
			r.clickboxes,
			r.hudStats
		],
		[
			new Clickbox(function(){g.screen = Screens.stats}, "charScreen", function(){return r.getWidth() - 192}, function(){return r.getHeight() - 64}, 64, 64),
			new Clickbox(function(){g.screen = Screens.inv}, "invScreen", function(){return r.getWidth() - 128}, function(){return r.getHeight() - 64}, 64, 64),
			new Clickbox(function(){g.loadMenu("pause")}, "menu", function(){return r.getWidth() - 64}, function(){return r.getHeight() - 64}, 64, 64),
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
			var a = [new Clickbox(function(){g.screen = Screens.game}, "exit", function(){return r.getWidth() - 64}, function(){return 0}, 64, 64)]
			var i = 0
			for (x in Stats.list) {
				const n = i
				const z = x
				a.push(new Clickbox(function(){if (p.statPoints > 0 && Stats.list[z].lvlUp()) {Stats.list[z].update(); p.statPoints--}}, "statAdd", function(){return 64}, function() {return 184 + 72 * n}, 64, 64))
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
			r.clickboxes	
		],
		[
			new Clickbox(function(){g.screen = Screens.game}, "exit", function(){return r.getWidth() - 64}, function(){return 0}, 64, 64)
		]
	)
}
