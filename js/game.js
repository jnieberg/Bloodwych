function Game() { };
Game.prototype = {

	init: function () {
		this.fps = 10;
		this.step = 1 / this.fps;
		this.reset();
		this.eventQueue = [];
	},

	// Reset the game
	reset: function () {
		this.example = 0;
	},

	// Update the game model
	update: function () {
		if (checkStarted) {
			checkStarted = false;
		}
		if (!paused) {
			timerAction();
			timerMaster++;
		}
	},

	subscribe: function (e, callback, target) {
		this.subs = this.subs || {};
		this.subs[e] = this.subs[e] || [];
		this.subs[e].push({
			callback: callback,
			target: target
		});
	},

	publish: function (e) {
		this.subs && this.subs[e].forEach(function (sub) {
			var args = [].slice.call(arguments, 1);
			sub.callback.apply(sub.target, args);
		});
	}
}

function timerAction() {

	//try {

	cutpurseTrueview = (Math.floor(Math.random() * 10) === 0);
	var tmf = 1.0;
	if (player.length === 1 && player[0].sleeping) {
		tmf = 0.5;
	}

	//monster timer actions
	mon = getMonstersInTower(towerThis, true);
	for (var m in mon) {
		var tm = mon[m].getCurseTimers();

		var br = Math.floor(Math.random() * 20);
		mon[m].blur = 0;
		if (br === 0) {
			mon[m].blur = -1;
		} else if (br === 1) {
			mon[m].blur = 1;
		}
		mon[m].glow = Math.floor(Math.random() * 2);
		if (tm > 0 && timerMaster - mon[m].timerMove >= tm * tmf) {
			mon[m].timerMove = timerMaster;
			mon[m].doGesture(CHA_GESTURE_NONE);
			mon[m].move();
		}
	}

	//player timer actions
	for (var p in player) {
		p = parseInt(p);
		var pl = player[p];
		var tm = 100;
		var chs = pl.getOrderedChampions();
		if (pl.sleeping) {
			tm = 50;
		}

		if (timerMaster - pl.timerChampionStats >= tm * tmf) {
			pl.timerChampionStats = timerMaster;
			if (pl.sleeping) {
				pl.checkChampionUp();
			}
			for (var c in chs) {
				if (chs[c] !== null) {
					chs[c].restoreStats();
				}
			}
		}
		if (timerMaster - pl.timerActiveSpell >= 10 * tmf) {
			pl.timerActiveSpell = timerMaster;
			for (var c in chs) {
				if (chs[c] !== null) {
					chs[c].checkSpell();
				}
			}
		}
		if (pl.communication.answer !== null && timerMaster - pl.communication.answerTimer >= 40 * tmf) {
			pl.doCommunicationAnswer();
		}

		var att = 0;
		for (var c in chs) {
			var tm = chs[c].getMonster().getCurseTimers();
			if (chs[c] !== null) {
				chs[c].recruitment.attackTimer++;
				if (tm > 0 && chs[c].recruitment.attackTimer % (chs[c].getAttackSpeed(20) * tmf) === 0) {
					if (pl.attacking) {
						pl.tryAttack(chs[c]);
					}
				}
				if (chs[c].getMonster().attacking) {
					att++;
				}
			}
			if (pl.uiLeftPanel.champs[c].damage > 0) {
				if (timerMaster - pl.uiLeftPanel.champs[c].damageTimer >= 20 * tmf) {
					pl.uiLeftPanel.champs[c].damageTimer = 0;
					pl.uiLeftPanel.champs[c].damage = 0;
					redrawUI(p, UI_REDRAW_LEFT);
				}
			}
		}
	}

	//projectile timer actions
	for (var p = 0; p < projectile[towerThis].length; p++) {
		if (timerMaster - projectile[towerThis][p].timer >= 2 * tmf) {
			projectile[towerThis][p].timer = timerMaster;
			projectile[towerThis][p].move();
		}
	}

	//5 second timer actions
	if (timerMaster - dungeonSpellTimer >= 50 * tmf) {
		dungeonSpellTimer = timerMaster;
		updateDungeonSpells();
	}

	//10 second timer actions
	if (timerMaster - timerChampionStats >= 100 * tmf) {
		timerChampionStats = timerMaster;
		for (var ch in champion) {
			if (champion[ch].recruitment.playerId === -1) {
				champion[ch].restoreStats();
			} else {
				champion[ch].addHunger();
			}
		}
		for (var m = 0; m < monster[towerThis].length; m++) {
			if (monster[towerThis][m].dead) {
				monster[towerThis].splice(m, 1);
				m--;
			}
		}
		for (var p = 0; p < projectile[towerThis].length; p++) {
			if (projectile[towerThis][p].dead >= 2) {
				projectile[towerThis].splice(p, 1);
				p--;
			}
		}
	}
	//} catch(err){
	//	PrintLog("Game Error: " + err.toString());
	//}
}
