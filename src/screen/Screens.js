var Screens = {
	game: new Screen([
			k.tick,
		],
		[
			r.room,
			r.entities,
			r.player,
			r.clickboxes
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
		[
			new Clickbox(function(){g.screen = Screens.game}, "exit", function(){return r.getWidth() - 64}, function(){return 0}, 64, 64)
		]
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
