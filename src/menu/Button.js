var Button = function(text, onclick = "") {
	this.text = text
	this.onclick = onclick
}

Button.prototype = {
	getHtml: function() {
		var out = ""
		out += "<button onclick='"
		out += this.onclick
		out += "' class='menuButton'>"
		out += this.text
		out += "</button>"
		return out
	}
}
