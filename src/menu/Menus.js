var Menus = {
	main: new Menu([
		new Header("DUNGEON"),
		new Button("START", "g.init(); g.exitMenu()"),
		new Button("CONTINUE", "if (g.started){g.exitMenu()}")
	]),
	pause: new Menu([
		new Header("PAUSED"),
		new Button("RESUME", "g.exitMenu()"),
		new Button("EXIT", "g.loadMenu(\"main\")") 
	]),
	dead: new Menu([
		new Header("YOU DIED"),
		new Button("RESTART", "g.init(); g.exitMenu()"),
		new Button("EXIT", "g.loadMenu(\"main\")")
	]) 
}
