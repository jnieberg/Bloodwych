var MON_SPIDER = 16,
	MON_CRAB = 17;

var monster = new Array();

function Monster(id, level, type, form, colour, teamId, l, x, y, d) {
	this.id = id;
	this.level = level;
	this.type = type;
	this.form = form;
	this.colour = colour;
	this.teamId = teamId;
	this.x = x;
	this.y = y;
	this.d = d;
}

function initMonsters(tower) {
	monster.length = 0;
	for(i = 0; i < tower.MonsterData.length; i++) {
		console.log('Loaded monster: ' + tower.MonsterData[i]);
		//monster[mn] = new Monster(mn);
	}
}