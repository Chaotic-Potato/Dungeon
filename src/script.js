function get(i) {return document.getElementById(i)}
function rad(x1, y1, x2, y2) {return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1- y2,2))}
function range(xa, ya, xb1, yb1, xb2, yb2) {return xa>=xb1&&xa<xb2&&ya>=yb1&&ya<yb2}
function clone(o) {var a={};for(i in o){a[i]=o[i]}return a} 
function equals(a, b) {for(i in a){if(a[i]!=b[i]){return false}}for(i in b){if(a[i]!=b[i]){return false}}return true}
function angDist(a, b) {a=(a+(2*Math.PI))%(2*Math.PI);b=(b+(2*Math.PI))%(2*Math.PI);return Math.min(Math.abs(a-b),(2*Math.PI)-Math.abs(a-b))}
function ang(x, y) {let r=rad(x,y,0,0);return ((y/r<0?2*Math.PI:0)-Math.acos(x/r))*(y<0?1:-1)}
function conv(s, g, r) {return s+(r*(g-s))}
function round(n, r) {let e=Math.pow(10,-r);return Math.round(n/e)*e}
function hitBoxReg(h, p, a) {let r=[h.x0,h.y0];let c=[h.x1,h.y1];if(r[0]<=p[0]&&p[0]<=c[0]&&r[1]<=p[1]&&p[1]<=c[1]){return 0}if((((p[0]-r[0])*Math.cos(a))>=0||((p[0]-c[0])*Math.cos(a))>=0)&&(((p[1]-r[1])*Math.sin(a))>=0||((p[1]-c[1])*Math.sin(a))>=0)){return null}let o=null;for(let i=0;i<4;i++){let h=Math.floor(i/2);let e=i%2==0;let t=(i<2?function(n){return 1/Math.tan(n)}:Math.tan);let s=(i<2?Math.sin:Math.cos);let d=((e?r:c)[1-h]-p[1-h]);if(p[h]+d*t(a)>=r[h]&&p[h]+d*t(a)<=c[h]){let z=d/s(a);o=(o==null?z:Math.min(o,z))}}return o}

var scripts = [
	"item/Item.js",
	"item/ability/Ability.js",
	"item/weapon/Weapon.js",
	"item/weapon/Melee.js",
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
	"Hitbox.js",
	"entity/Entity.js",
	"entity/Projectile.js",
	"entity/enemy/AIs.js",
	"entity/enemy/Enemy.js",
	"entity/enemy/MeleeEnemy.js",
	"entity/Entities.js",
	"Game.js",
	"level/Room.js",
	"level/Rooms.js",
	"level/Level.js",
	"Player.js",
	"stat/Stat.js",
	"stat/Stats.js",
	"Clickbox.js",
	"menu/Button.js",
	"menu/Header.js",
	"menu/Menu.js",
	"menu/Menus.js",
	"Keyboard.js",
	"render/Stack.js",
	"render/Animation.js",
	"render/Animations.js",
	"render/Render.js",
	"screen/Screen.js",
	"screen/Screens.js"
]

for (i in scripts) {
	document.write("<script src='src/" + scripts[i] + "'></script>")
}
window.onload = function() {
	g.screen = Screens.game
	document.onkeydown = k.keyDown
	document.onkeyup = k.keyUp
	document.onkeypress = k.keyPress
	window.onresize = r.resize
	document.onmousedown = g.click
	document.onmouseup = g.unclick
	document.oncontextmenu = g.rclick
	g.loadMenu("main")
}
