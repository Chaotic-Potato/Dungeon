function get(i) {return document.getElementById(i)}
function rad(x1, y1, x2, y2) {return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))}
function range(xa, ya, xb1, yb1, xb2, yb2) {return xa >= xb1 && xa < xb2 && ya >= yb1 && ya < yb2}
function clone(o) {var a={};for(i in o){a[i]=o[i]}return a} 
function equals(a, b) {for(i in a){if(a[i]!=b[i]){return false}}for(i in b){if(a[i]!=b[i]){return false}}return true}

var scripts = [
	"entity/Entity.js",
	"entity/Entities.js",
	"level/Room.js",
	"level/Rooms.js",
	"level/Level.js",
	"Render.js",
	"item/Item.js",
	"item/ability/Ability.js",
	"item/weapon/Weapon.js",
	"item/weapon/Meele.js",
	"item/weapon/Range.js",
	"item/weapon/Spell.js",
	"item/equipment/Equipment.js",
	"item/equipment/Armor.js",
	"item/equipment/Accessory.js",
	"item/equipment/Ring.js",
	"item/consumable/Consumable.js",
	"item/consumable/Potion.js",
	"item/consumable/Scroll.js",
	"item/Items.js",
	"item/Inventory.js",
	"Player.js",
	"stat/Stat.js",
	"stat/Stats.js",
	"Clickbox.js",
	"menu/Button.js",
	"menu/Header.js",
	"menu/Menu.js",
	"menu/Menus.js",
	"Keyboard.js",
	"screen/Screen.js",
	"screen/Screens.js",
	"Game.js"
]

for (i in scripts) {
	document.write("<script src='src/" + scripts[i] + "'></script>")
}
