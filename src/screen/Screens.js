var Screens = {
	game: new Screen([
		p.tick,
		r.drawFrame
	],
	[
		r.room,
		r.entities,
		r.player
	])
}
