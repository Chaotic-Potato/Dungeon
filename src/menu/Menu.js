var Menu = function(buttons = []) {
	this.buttons = buttons	
}

Menu.prototype = {
	getHtml: function() {
		var out = ""
		out += "<div class='center'>"
		for (i in this.buttons) {
			out += this.buttons[i].getHtml()
		}
		out += "</div>"
		return out
	}
}
