var Menu = function(elements = []) {
	this.elements = elements	
}

Menu.prototype = {
	getHtml: function() {
		var out = ""
		out += "<div class='center'>"
		for (i in this.elements) {
			out += this.elements[i].getHtml() + "<br>"
		}
		out += "</div>"
		return out
	}
}
