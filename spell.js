function Spell(colour, id, name, description, level) {
	this.colour = colour;
	this.id = id;
	this.name = name;
	this.description = description;
	this.level = level;
	this.cost = this.level * 5;
	var pr = getSpellPageAndRow(colour, id);
	this.page = pr.page;
	this.row = pr.row;
}

Spell.prototype.toString = function() {
	return '[colour:' + this.colour + ', id:' + this.id + ', name:' + this.name + ', description:' + this.description + ', level:' + this.level + ', cost:' + this.cost + ']';
}

function initSpells() {
	for (cl = 0; cl < COLOUR_MAX; cl++) {
		spell[cl] = new Array();
		for (id = 0; id < SPELL_MAX; id++) {
			var l = [0, 1, 1, 2, 2, 3]
			var name = TEXT_SPELL_NAME[id + cl * SPELL_MAX];
			var description = TEXT_SPELL_DESCRIPTION[id + cl * SPELL_MAX];
			var level = getSpellLevel(cl, id);
			spell[cl][id] = new Spell(cl, id, name, description, level);
			PrintLog('Loaded spell: ' + spell[cl][id]);
		}
	}
}

function getSpellLevel(c, i) {
	var sl = [
		[1, 2, 2, 2, 3, 3, 4, 5],
		[1, 2, 4, 5, 5, 6, 7, 8],
		[1, 2, 2, 3, 3, 4, 5, 6],
		[1, 2, 2, 3, 3, 4, 4, 7]
	];
	return sl[c][i];
}

/*
"ARMOUR",		"ARMOUR",	
"TERROR",		"PARALYZE",
"VITALISE",		"COMPASS",
"BEGUILE",		"LEVITATE",
"DEFLECT",		"WARPOWER",
"MAGELOCK",		"RENEW",
"CONCEAL",		"ARC BOLT",
"WARPOWER",		"FORMWALL",

"MISSILE",		"BEGUILE",
"VANISH",		"CONFUSE",
"PARALYZE",		"CONCEAL",
"ALCHEMY",		"TRUEVIEW",
"CONFUSE",		"VANISH",
"LEVITATE",		"ILLUSION",
"ANTIMAGE",		"MINDROCK",
"RECHARGE",		"WYCHWIND",

"TRUEVIEW",		"MISSILE",
"RENEW",		"MAGELOCK",
"VIVIFY",		"VITALISE",
"DISPELL",		"DISPELL",
"FIREPATH",		"FIREBALL",
"ILLUSION",		"FIREPATH",
"COMPASS",		"RECHARGE",
"SPELLTAP",		"BLAZE",

"DISRUPT",		"DEFLECT",
"FIREBALL",		"TERROR",
"WYCHWIND",		"ANTIMAGE",
"ARC BOLT",		"SPELLTAP",
"FORMWALL",		"ALCHEMY",
"SUMMON",		"SUMMON",
"BLAZE",		"VIVIFY",
"MINDROCK"		"DISRUPT"
*/

function getSpellPageAndRow(c, i) {
	var sp = [
		[0, 1, 2, 1, 0, 2, 3, 3],
		[0, 0, 1, 2, 1, 3, 2, 3],
		[1, 0, 0, 2, 3, 2, 1, 3],
		[0, 1, 0, 2, 1, 2, 3, 3]
	];
	var sr = [
		[0, 2, 6, 5, 7, 1, 3, 4],
		[4, 1, 6, 7, 3, 5, 2, 0],
		[0, 5, 2, 3, 1, 4, 7, 6],
		[3, 4, 6, 0, 1, 5, 7, 2]
	];
	return {
		page: sp[c][i],
		row: sr[c][i]
	};
}

function getSpellBookPage(p) {
	var sb = new Array();
	for (cl = 0; cl < COLOUR_MAX; cl++) {
		for (id = 0; id < SPELL_MAX; id++) {
			var sp = spell[cl][id];
			if (sp.page === p) {
				sb.push(sp);
			}
		}
	}
	return sb.sort(function(a, b) {
		return (a.row - b.row);
	});
}

function castSpell(s, src, int) {
	if(typeof int === "undefined") {
		int = 0;
	}
	var pow = Math.floor((Math.random() * int / 2) + (int / 2));
	if(pow > 63) {
		pow = 63;
	}
	var f = src.floor;
	var x = src.x;
	var y = src.y;
	var d = src.d;
	switch (s) {
		//serpent
		case SPELL_FORMWALL:
			if(src.getBinaryView(15, 0, 16) === '0000') {
				src.setBinaryView(15, 12, 4, '7');
				src.setBinaryView(15, 6, 2, '3');
				src.setBinaryView(15, 0, 6, dec2hex(pow));
				var xy = posToCoordinates(15, x, y, d);
				setDungeonSpell(towerThis, f, xy.x, xy.y);
			}
			break;
		//moon
		case SPELL_MINDROCK:
			if(src.getBinaryView(15, 0, 16) === '0000') {
				src.setBinaryView(15, 12, 4, '7');
				src.setBinaryView(15, 6, 2, '2');
				src.setBinaryView(15, 0, 6, dec2hex(pow));
			}
			break;
		//dragon
		case SPELL_DISPELL:
			if(src.getBinaryView(15, 12, 4) === '7') {
				src.setBinaryView(15, 0, 16, '0000');
			}
			break;
		//chaos
		case SPELL_VIVIFY:
			if (getMonsterAt(f, x, y) === null) {
				for (i = item[towerThis].length - 1; i >= 0; i--) {
					var it = item[towerThis][i];
					if (it.id >= ITEM_BLODWYN_RIP && it.id <= ITEM_THAI_CHANG_RIP && it.location.tower === towerThis && it.location.floor === f && it.location.x === x && it.location.y === y) {
						var ch = it.id - ITEM_BLODWYN_RIP;
						item[towerThis].splice(i, 1);
						champion[ch].stat.hp = 0;
						champion[ch].monster.floor = f;
						champion[ch].monster.x = x;
						champion[ch].monster.y = y;
						champion[ch].monster.d = (d + 2) % 4;
						champion[ch].monster.hp = 0;
						champion[ch].monster.dead = false;
						if (champion[ch].recruitment.recruited && !champion[ch].recruitment.attached && champion[ch].recruitment.playerId > -1) {
							var p = player[champion[ch].recruitment.playerId];
							if (p.dead) {
								champion[ch].recruitment.attached = true;
								var i = p.getChampionPosition(ch);
								p.exchangeChampionPosition(0, i);
								p.championLeader = 0;
								p.tower = towerThis;
								p.floor = f;
								p.x = x;
								p.y = y
								p.d = (d + 2) % 4;
								p.dead = false;
								p.updateChampions();
								redrawUI(p.id);
							}
						}
						return;
					}
				}
			}
			break;
		default:
			break;
	}
}

function setDungeonSpell(t, f, x, y) {
	var max = dungeonSpellList.length;
	dungeonSpellList[max] = { tower: t, floor: f, x: x, y: y };
}

function updateDungeonSpells() {
	for(s = 0; s < dungeonSpellList.length; s++) {
		var ds = dungeonSpellList[s];
		if(ds.tower === towerThis) {
			var hex = tower[ds.tower].floor[ds.floor].Map[ds.y][ds.x];
			var tm = parseInt(hex2dec(getHexToBinaryPosition(hex, 0, 6)) - 1);
			if(tm > 0) {
				tower[ds.tower].floor[ds.floor].Map[ds.y][ds.x] = setHexToBinaryPosition(hex, 0, 6, dec2hex(tm));
			} else {
				tower[ds.tower].floor[ds.floor].Map[ds.y][ds.x] = setHexToBinaryPosition(hex, 0, 16, '0000');
				dungeonSpellList.splice(s, 1);
				s--;
			}
		}
	}
}