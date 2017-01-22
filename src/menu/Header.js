var Header = function(text) {
	this.text = text
}

Header.prototype = {
	getHtml: function() {
		var out = ""
		out += "<h1>"
		out += this.text
		out += "</h1>"
		return out
	}
}
