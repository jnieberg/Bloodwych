function doKeyDown(e) {
	if (gameStarted) {
		if (player.length > 1) {
			switch (e.keyCode) {

				case KEYPAD_8:
					player[1].move(DIRECTION_NORTH);
					break; //8
				case KEYPAD_5:
					player[1].move(DIRECTION_SOUTH);
					break; //5
				case KEYPAD_4:
					player[1].move(DIRECTION_WEST);
					break; //4
				case KEYPAD_6:
					player[1].move(DIRECTION_EAST);
					break; //6
				case KEYPAD_7:
					player[1].rotate(-1);
					break; //7
				case KEYPAD_9:
					player[1].rotate(1);
					break; //9
				case KEY_END:
					player[1].action();
					break; //End Key
				case KEYPAD_PLUS:
					player[1].toggleFrontObject();
					break; //+ Key
				default:
					break;
			}
		}
		switch (e.keyCode) {
			case KEY_L: // THE L KEY
				switchTower((towerThis + 1) % TOWER_NAME.length);
				break;
			case KEY_T:
				//player[0].changeUpFloor();
				var ch = player[0].getActivePocketChampion();
				ch.pocket[POCKET_SLOT_0].setPocketItem((ch.pocket[POCKET_SLOT_0].id + 1) % 110, 1);
				redrawUI(0);
				PrintLog(itemRef[champion[player[0].championLeader].pocket[POCKET_SLOT_0].id].name + " ID: " + champion[player[0].championLeader].pocket[POCKET_SLOT_0].id.toString())
				break; // T KEY     
			case KEY_SPACEBAR:
				player[0].action();
				break; // SpaceBar        
			case KEY_G:
				//player[0].changeDownFloor();
				var ch = player[0].getActivePocketChampion();
				ch.pocket[POCKET_SLOT_0].setPocketItem((ch.pocket[POCKET_SLOT_0].id + 109) % 110, 1);
				redrawUI(0);
				PrintLog(itemRef[champion[player[0].championLeader].pocket[POCKET_SLOT_0].id].name + " ID: " + champion[player[0].championLeader].pocket[POCKET_SLOT_0].id.toString())
				break; // G KEY  
			case KEY_W:
				player[0].move(DIRECTION_NORTH);
				break; // W KEY
			case KEY_S:
				player[0].move(DIRECTION_SOUTH);
				break; // S KEY
			case KEY_A:
				player[0].move(DIRECTION_WEST);
				break; // A KEY
			case KEY_D:
				player[0].move(DIRECTION_EAST);
				break; // D KEY
			case KEY_Q:
				player[0].rotate(-1);
				break; // Q KEY
			case KEY_E:
				player[0].rotate(1);
				break; // E KEY
			case KEY_R:
				player[0].toggleFrontObject();
				//player[0].castSpell(SPELL_FORMWALL, player[0].getChampion(player[0].championLeader));
				break; //R Key
			case KEY_F:
				player[0].testMode();
				//player[0].castSpell(SPELL_DISPELL, player[0].getChampion(player[0].championLeader));
				break; // F cheat
			case KEY_PLUS:
				testPalette = testPalette + 1;
				break;
			case KEY_MINUS:
				testPalette = testPalette - 1;
				break;
			case KEY_6:
				testDirection = (testDirection + 3) % 4;
				break;
			case KEY_5:
				testDirection = (testDirection + 1) % 4;
				break;
			case KEY_7:
				testDistance = (testDistance + 1) % 3;
				PrintLog("Distance: " + testDistance);
				break;
			case KEY_8:
				testDistance = (testDistance + 3) % 3;
				PrintLog("Distance: " + testDistance);
				break;
			case KEY_0:
				testMon1 = (testMon1 + 1);
				break;
			case KEY_9:
				testMon1 = (testMon1 - 1);
				break;
			default:
				break;
		}
	} else { //Start menu screen
		switch (e.keyCode) {
			case KEY_1:
				{
					startGame(true, false);
				};
				break
			case KEY_2:
				{
					startGame(false, false);
				};
				break
			case KEY_3:
				{
					startGame(true, true);
				};
				break
			case KEY_4:
				{
					startGame(false, true);
				}
				break;
		}
	}

}

function checkClickEvents() {
	$(document).on('tap', 'html', function(e) {
		var t = $(this).find('canvas');
		var x = (e.pageX - (canvas.offsetLeft * scaleReal)) / (scale * scaleReal);
		var y = (e.pageY - (canvas.offsetTop * scaleReal)) / (scale * scaleReal);
		if (t.attr('data-game-status') === 'started') {
			var p = 0;
			for (pid = 0; pid < player.length; pid++) {
				p += processCanvasInput(pid, x, y) + 1;
			}
			if (p > 0) {
				redrawUI(p - 1);
			}
		} else if (t.attr('data-game-status') === 'menu') {
			processCanvasInputMenu(x, y);
		} else if (t.attr('data-game-status') === 'menu-champions') {

		}
	});
}

function processCanvasInput(pid, x, y) {

	var p = player[pid];

	if (!p.sleeping) {
		if (!p.dead && uiClickInArea(x, y, UI_CLICK_VIEWPORT, p)) {
			return checkClickInViewPortal(p, x, y);
		}
	} else {
		if (uiClickInArea(x, y, UI_CLICK_PLAYERS_AREA, p) && (p.fairyDetails.champ === null || !uiClickInArea(x, y, UI_CLICK_VIEWPORT, p))) {
			p.wakeUp();
			return pid;
		} else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY) {
			if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_SERPENT_SPELL, p)) {
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SERPENT);
				return 0;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_CHAOS_SPELL, p)) {
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_CHAOS);
				return 0;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_DRAGON_SPELL, p)) {
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_DRAGON);
				return 0;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_MOON_SPELL, p)) {
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_MOON);
				return 0;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
				p.nextChampionUp++;
				p.sleep();
				return 0;
			}
		} else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_SERPENT) {
			if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_0, p)) {
				//show buy spell screen    
				p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(0)[0];
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
				return 0;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_1, p)) {
				//show buy spell screen  
				p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(0)[1];
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
				return 0;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
				return 0;
			}
		} else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_CHAOS) {
			if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_0, p)) {
				//show buy spell screen    
				p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(1)[0];
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
				return 0;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_1, p)) {
				//show buy spell screen  
				p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(1)[1];
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
				return 0;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
				return 0;
			}
		} else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_DRAGON) {
			if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_0, p)) {
				//show buy spell screen    
				p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(2)[0];
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
				return 0;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_1, p)) {
				//show buy spell screen  
				p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(2)[1];
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
				return 0;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
				return 0;
			}
		} else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_MOON) {
			if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_0, p)) {
				//show buy spell screen    
				p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(3)[0];
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
				return 0;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_1, p)) {
				//show buy spell screen  
				p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(3)[1];
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
				return 0;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
				return 0;
			}
		} else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_SPELLDETAILS) {

			if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_SERPENT_SPELL, p)) {
				p.fairyDetails.champ.buySpell(p.fairyDetails.spell);
				return 0;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
				gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
				return 0;
			}
		}
	}

	if (p.uiRightPanel.mode === UI_RIGHT_PANEL_MAIN) {

		if (uiClickInArea(x, y, UI_CLICK_OPEN_POCKETS, p)) {
			p.uiRightPanel.mode = UI_RIGHT_PANEL_POCKETS;
			p.uiRightPanel.activePocket = 0;
			p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_INTERACT, p)) {
			var ch = champion[p.champion[p.championLeader]];
			if(ch.activeSpell.id > -1) {
				ch.expireSpell();
			} else if (ch.selectedSpell === null) {
				p.action();
			} else {
				p.castSpell(ch.selectedSpell, ch);
			}
			p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_ICON, p)) {
			p.uiRightPanel.mode = UI_RIGHT_PANEL_SPELLBOOK;
			p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_CHARACTER_STATS, p)) {
			p.uiRightPanel.mode = UI_RIGHT_PANEL_STATS;
			p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_ROTATE_LEFT, p)) {
			p.rotate(-1);
		} else if (uiClickInArea(x, y, UI_CLICK_ROTATE_RIGHT, p)) {
			p.rotate(1);
		} else if (uiClickInArea(x, y, UI_CLICK_MOVE_FORWARD, p)) {
			p.move(DIRECTION_NORTH);
		} else if (uiClickInArea(x, y, UI_CLICK_MOVE_BACKWARDS, p)) {
			p.move(DIRECTION_SOUTH);
		} else if (uiClickInArea(x, y, UI_CLICK_MOVE_LEFT, p)) {
			p.move(DIRECTION_WEST);
		} else if (uiClickInArea(x, y, UI_CLICK_MOVE_RIGHT, p)) {
			p.move(DIRECTION_EAST);
		} else if (uiClickInArea(x, y, UI_CLICK_ATTACK, p)) {
			p.attacking = true;
		} else if (uiClickInArea(x, y, UI_CLICK_DEFEND, p)) {
			p.attack(false);
		} else if (uiClickInArea(x, y, UI_CLICK_CHAMP_FRONT_LEFT, p)) {
			p.exchangeChampionPosition(p.championHighlite, 0);
			p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_CHAMP_FRONT_RIGHT, p)) {
			p.exchangeChampionPosition(p.championHighlite, 1);
			p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_CHAMP_BACK_LEFT, p)) {
			p.exchangeChampionPosition(p.championHighlite, 3);
			p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_CHAMP_BACK_RIGHT, p)) {
			p.exchangeChampionPosition(p.championHighlite, 2);
			p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
			return pid;
		}

	} else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_POCKETS) {
		for (s = UI_CLICK_POCKET_SLOT_1; s <= UI_CLICK_POCKET_SLOT_12; s++) {
			if (uiClickInArea(x, y, s, p)) {
				p.exchangeItemWithHand(s - UI_CLICK_POCKET_SLOT_1);
				p.redrawLeftRightUiFlag = UI_REDRAW_POCKETS;
				return pid;
			}
		}
		for (cid = UI_CLICK_POCKET_CHARACTER_0; cid <= UI_CLICK_POCKET_CHARACTER_3; cid++) {
			if (uiClickInArea(x, y, cid, p)) {
				var ap = cid - UI_CLICK_POCKET_CHARACTER_0;
				var c = p.getOrderedChampionIds();
				var ch = p.getChampion(c[ap]);
				if (ch !== null && ch.recruitment.attached) {
					p.uiRightPanel.activePocket = ap;
					p.redrawLeftRightUiFlag = UI_REDRAW_POCKETS;
					return pid;
				}
				break;
			}
		}
		if (uiClickInArea(x, y, UI_CLICK_POCKET_HAND, p)) {
			p.useItemInHand();
			p.redrawLeftRightUiFlag = UI_REDRAW_POCKETS;
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_POCKET_BACK, p)) {
			p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
			p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
			return pid;
		}

	} else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_STATS) {
		if (uiClickInArea(x, y, UI_CLICK_CLOSE_SCRIPT, p)) {
			p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
			p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
			return pid;
		}
	} else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_SCROLL) {
		if (uiClickInArea(x, y, UI_CLICK_CLOSE_SCRIPT, p)) {
			p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
			p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
			return pid;
		}
	} else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_SPELLBOOK) {

		var ch = champion[p.champion[p.championLeader]];

		if (uiClickInArea(x, y, UI_CLICK_CLOSE_SPELLBOOK, p)) {
			p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
			p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
			return pid;
		}
		if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_TURNPAGE_BACK, p)) {
			changeSpellBookPage(p, false);
			//return pid;
		}
		if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_TURNPAGE_FORWARD, p)) {
			changeSpellBookPage(p, true);
			//return pid;
		}
		if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_0, p)) {
			ch.selectSpell(0);
			p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
			return pid;
		}
		if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_1, p)) {
			ch.selectSpell(1);
			p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
			return pid;
		}
		if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_2, p)) {
			ch.selectSpell(2);
			p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
			return pid;
		}
		if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_3, p)) {
			ch.selectSpell(3);
			p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
			return pid;
		}
		if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_4, p)) {
			ch.selectSpell(4);
			p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
			return pid;
		}
		if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_5, p)) {
			ch.selectSpell(5);
			p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
			return pid;
		}
		if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_6, p)) {
			ch.selectSpell(6);
			p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
			return pid;
		}
		if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_7, p)) {
			ch.selectSpell(7);
			p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
			return pid;
		}
		if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_FIRE_1, p) || uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_FIRE_2, p)) {
			if (ch.selectedSpell !== null) {
				p.castSpell(ch.selectedSpell, ch);
				p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
				return pid;
			}
		}
		if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_COST_UP, p)) {
			ch.setSpellCost(true);
			p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
			return pid;
		}
		if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_COST_DOWN, p)) {
			ch.setSpellCost(false);
			p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
			return pid;
		}
	}
	if (p.uiLeftPanel.mode === UI_LEFT_PANEL_MODE_STATS) {
            
                if (uiClickInArea(x, y, UI_CLICK_CHAMP1, p)) {
			toggleChampUI(0, p);
			redrawUI(p.id, UI_REDRAW_LEFT);
			//return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_CHAMP2, p)) {
			toggleChampUI(1, p);
			p.redrawLeftRightUiFlag = UI_REDRAW_LEFT;
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_CHAMP3, p)) {
			toggleChampUI(2, p);
			p.redrawLeftRightUiFlag = UI_REDRAW_LEFT;
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_CHAMP4, p)) {
			toggleChampUI(3, p);
			p.redrawLeftRightUiFlag = UI_REDRAW_LEFT;
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_STATS_BOX, p)) {
			p.uiLeftPanel.mode = UI_LEFT_PANEL_MODE_COMMAND;
			p.redrawLeftRightUiFlag = UI_REDRAW_LEFT;
			return pid;
		}

	} else if (p.uiLeftPanel.mode === UI_LEFT_PANEL_MODE_COMMAND) {
                
		if (uiClickInArea(x, y, UI_CLICK_BACK, p)) {
                        checkBackButton(p);
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_PAUSE, p)) {
			alert('PAUSED');
			p.redrawLeftRightUiFlag = UI_REDRAW_COMMAND;
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_SAVE, p)) {
			alert('SAVE GAME');
			p.redrawLeftRightUiFlag = UI_REDRAW_COMMAND;
			return pid;
		} else if (uiClickInArea(x, y, UI_CLICK_SLEEP, p)) {
			p.nextChampionUp = 0;
			p.sleep();
			p.redrawLeftRightUiFlag = UI_REDRAW_COMMAND;
			return pid;
		}
                if (p.communication.mode === COMMUNICATION_PAGE_COMMUNICATE_0 || p.communication.mode === COMMUNICATION_PAGE_COMMUNICATE_1){
                    	if (uiClickInArea(x, y, UI_CLICK_TOGGLEUP, p)) {
                            var t = p.communication.mode + 1;
                            if (t > 2){
                                t = 1;
                            }                            
		            p.communication.mode = t;
                            return pid;
                        }
                        if (uiClickInArea(x, y, UI_CLICK_TOGGLEDOWN, p)) {
                            var t = p.communication.mode - 1;
                            if (t < 1){
                                t = 2;
                            }                            
		            p.communication.mode = t;
                            return pid;
                        }
                }
                
                checkCommunicationArea(p,x,y,false);
	}
	if (p.sleeping) {
		p.wakeUp();
		return pid;
	}
	return -1;
}

function processCanvasInputMenu(x, y) {
	if (uiClickInArea(x, y, UI_CLICK_START_ONE_PLAYER)) {
		startGame(true, false);
	} else if (uiClickInArea(x, y, UI_CLICK_START_TWO_PLAYER)) {
		startGame(false, false);
	} else if (uiClickInArea(x, y, UI_CLICK_START_QUICK_ONE_PLAYER)) {
		startGame(true, true);
	} else if (uiClickInArea(x, y, UI_CLICK_START_QUICK_TWO_PLAYER)) {
		startGame(false, true);
	}
}

function viewportTouch(x, y, xy) {

	for (p = 0; p < player.length; p++) {

		xy = {
			x: Math.floor((x - player[p].PortalX) / scale / 42.67),
			y: Math.floor((y - player[p].PortalY) / scale / 38)
		};


		//        if (xy.x >= 0 && xy.x <= 2 && xy.y >= 0 && xy.y <= 2) {
		//            if (xy.x === 0 && xy.y === 0) { //rotate left
		//                player[p].rotate(-1);
		//            } else if (xy.x === 2 && xy.y === 0) { //rotate right
		//                player[p].rotate(1);
		//            } else if (xy.x === 1 && xy.y === 0) { //move forward
		//                player[p].move(DIRECTION_NORTH);
		//            } else if (xy.x === 0 && xy.y === 1) { //move left
		//                player[p].move(DIRECTION_WEST);
		//            } else if (xy.x === 2 && xy.y === 1) { //move right
		//                player[p].move(DIRECTION_EAST);
		//            } else if (xy.x === 1 && xy.y === 1) { //move backward
		//                player[p].move(DIRECTION_SOUTH);
		//            } else if (xy.y === 2) { //action
		//                //player[p].action();
		//            }
		//        }
	}
}

function mouseXY(e) {
	if (e.offsetX) {
		mouseX = e.offsetX;
		mouseY = e.offsetY;
                var currentColour = cursorType;    
		if (player.length > 1) {                    
                    if (mouseY > canvas.height / 2) {
                        cursorType = cursorRed;
                    }else{
                        cursorType = cursorBlue;
                    }
                    if (currentColour !== cursorType){
                        if (cursorType === cursorRed){
                            canvas.style.cursor = "url('./images/misc/cursor1.png'),auto";
                        }else{
                            canvas.style.cursor = "url('./images/misc/cursor0.png'),auto";
                        }                        
                    }			
		}
                if (typeof player !== 'undefined'){
                    for (p in player){
                        checkCommunicationArea(player[p],mouseX / (scale * scaleReal),mouseY / (scale * scaleReal),true);
                    }
                }
            }

}

function leftOrRight(p,x,row){
    
    if (TEXT_COMMUNICATION[p.communication.mode][row].width <= x) {
        return false;
    }
    
    return true;   
    
}

function checkBackButton(p){
    
    switch (p.communication.mode){
        
        case COMMUNICATION_PAGE_MAIN: {
                p.uiLeftPanel.mode = UI_LEFT_PANEL_MODE_STATS;
		p.redrawLeftRightUiFlag = UI_REDRAW_LEFT;
        }break;
        case COMMUNICATION_PAGE_COMMUNICATE_0: {
                p.communication.mode = COMMUNICATION_PAGE_MAIN;
        }break;
        case COMMUNICATION_PAGE_COMMUNICATE_1: {
                p.communication.mode = COMMUNICATION_PAGE_MAIN;
        }break;
        case COMMUNICATION_PAGE_IDENTIFY: {
               p.communication.mode = COMMUNICATION_PAGE_COMMUNICATE_0; 
        }break;
        case COMMUNICATION_PAGE_INQUIRY: {
                p.communication.mode = COMMUNICATION_PAGE_COMMUNICATE_0; 
        }break;
        case COMMUNICATION_PAGE_TRADING: {
                p.communication.mode = COMMUNICATION_PAGE_COMMUNICATE_1; 
        }break;
        case COMMUNICATION_PAGE_SMALLTALK: {
                p.communication.mode = COMMUNICATION_PAGE_COMMUNICATE_1; 
        }break;
        case COMMUNICATION_PAGE_NAMES: {
                p.communication.mode = COMMUNICATION_PAGE_MAIN;
        }break;
    }
    
    			
    
    
}

function doCommuncation(p,item){
    
    switch (p.communication.mode){
        
        case COMMUNICATION_PAGE_MAIN:{
                switch (item){                    
                    case 0:{p.communication.mode = COMMUNICATION_PAGE_COMMUNICATE_0;}break
                    case 1:{p.communication.mode = COMMUNICATION_PAGE_NAMES;p.communication.action = "COMMEND";}break
                    case 2:{p.communication.mode = COMMUNICATION_PAGE_NAMES;p.communication.action = "VIEW";}break
                    case 3:{p.communication.mode = COMMUNICATION_PAGE_NAMES;p.communication.action = "WAIT";}break
                    case 4:{p.communication.mode = COMMUNICATION_PAGE_NAMES;p.communication.action = "CORRECT";}break
                    case 5:{p.communication.mode = COMMUNICATION_PAGE_NAMES;p.communication.action = "DISMISS";}break
                    case 6:{p.communication.mode = COMMUNICATION_PAGE_NAMES;p.communication.action = "CALL";}break                    
                }
        };break
        case COMMUNICATION_PAGE_COMMUNICATE_0:{
             switch (item){                    
                    case 0:{p.communication.action = "RECRUIT";}break
                    case 1:{p.communication.mode = COMMUNICATION_PAGE_IDENTIFY;}break
                    case 2:{p.communication.mode = COMMUNICATION_PAGE_INQUIRY;}break
                    case 3:{p.communication.action = "WHEREABOUTS";}break   
                }   
        };break
        case COMMUNICATION_PAGE_COMMUNICATE_1:{
                switch (item){                    
                    case 0:{p.communication.mode = COMMUNICATION_PAGE_TRADING;}break
                    case 1:{p.communication.mode = COMMUNICATION_PAGE_SMALLTALK;}break
                    case 2:{p.communication.action = "YES";}break
                    case 3:{p.communication.action = "NO";}break
                    case 4:{p.communication.action = "BRIBE";}break   
                    case 5:{p.communication.action = "THREAT";}break      
                }   
        };break
        case COMMUNICATION_PAGE_IDENTIFY:{
               switch (item){                    
                    case 0:{p.communication.action = "WHO GOES?";}break
                    case 1:{p.communication.action = "THY TRADE?";}break
                    case 2:{p.communication.action = "NAME SELF";}break
                    case 3:{p.communication.action = "REVEAL SELF";}break    
                }    
        };break
        case COMMUNICATION_PAGE_INQUIRY:{
                switch (item){                    
                    case 0:{p.communication.action = "FOLK LORE";}break
                    case 1:{p.communication.action = "MAGIC ITEMS";}break
                    case 2:{p.communication.action = "OBJECTS";}break
                    case 3:{p.communication.action = "PERSONS";}break       
                }   
        };break
        case COMMUNICATION_PAGE_TRADING:{
                switch (item){                    
                    case 0:{p.communication.action = "OFFER";}break
                    case 1:{p.communication.action = "PURCHASE";}break
                    case 2:{p.communication.action = "EXCHANGE";}break
                    case 3:{p.communication.action = "SELL";}break    
                }   
        };break
        case COMMUNICATION_PAGE_SMALLTALK:{
                switch (item){                    
                    case 0:{p.communication.action = "PRAISE";}break
                    case 1:{p.communication.action = "CURSE";}break
                    case 2:{p.communication.action = "BOAST";}break
                    case 3:{p.communication.action = "RETORT";}break    
                }   
        };break
        case COMMUNICATION_PAGE_NAMES:{
                switch (item){                    
                    case 0:{p.communication.action = "";}break
                    case 1:{p.communication.action = "";}break
                    case 2:{p.communication.action = "";}break
                    case 3:{p.communication.action = "";}break    
                }    
        };break
        
    }
    
    drawCommunicationBox(p,item,true);
    
}

function checkCommunicationArea(p,x,y,hover){
    if (p.uiLeftPanel.mode === UI_LEFT_PANEL_MODE_COMMAND){
        if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA, p)){
            if (p.communication.mode === COMMUNICATION_PAGE_MAIN){
                if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA_FIRST_ROW, p)){
                    if (hover){
                        drawCommunicationBox(p,0);
                    }else{
                        doCommuncation(p,0);
                    }                    
                }
                if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA_SECOND_ROW, p)){
                   if (leftOrRight(p,x,1)){
                       if (hover){
                         drawCommunicationBox(p,1);    
                        }else{
                         doCommuncation(p,1);  
                        }
                    }else{
                        if (hover){
                         drawCommunicationBox(p,2);    
                        }else{
                         doCommuncation(p,2);  
                        }  
                    }    
                }
                if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA_THIRD_ROW, p)){
                    if (leftOrRight(p,x,3)){
                        if (hover){
                         drawCommunicationBox(p,3);    
                        }else{
                         doCommuncation(p,3);  
                        }    
                    }else{
                        if (hover){
                         drawCommunicationBox(p,4);    
                        }else{
                         doCommuncation(p,4);  
                        }  
                    }   
                }
                if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA_FORTH_ROW, p)){
                    if (leftOrRight(p,x,5)){
                        if (hover){
                         drawCommunicationBox(p,5);    
                        }else{
                         doCommuncation(p,5);  
                        }    
                    }else{
                        if (hover){
                         drawCommunicationBox(p,6);    
                        }else{
                         doCommuncation(p,6);  
                        }  
                    }    
                }
            }
            else if (p.communication.mode === COMMUNICATION_PAGE_COMMUNICATE_1){
                if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA_FIRST_ROW, p)){
                    if (hover){
                         drawCommunicationBox(p,0);    
                        }else{
                         doCommuncation(p,0);  
                        }
                }
                if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA_SECOND_ROW, p)){
                    if (hover){
                         drawCommunicationBox(p,1);    
                        }else{
                         doCommuncation(p,1);  
                        }
                }
                if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA_THIRD_ROW, p)){
                    if (leftOrRight(p,x,2)){
                        if (hover){
                         drawCommunicationBox(p,2);    
                        }else{
                         doCommuncation(p,2);  
                        }    
                    }else{
                        if (hover){
                         drawCommunicationBox(p,3);    
                        }else{
                         doCommuncation(p,3);  
                        } 
                    }   
                }
                if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA_FORTH_ROW, p)){
                    if (leftOrRight(p,x,4)){
                        if (hover){
                         drawCommunicationBox(p,4);    
                        }else{
                         doCommuncation(p,4);  
                        }    
                    }else{
                        if (hover){
                         drawCommunicationBox(p,5);    
                        }else{
                         doCommuncation(p,5);  
                        }  
                    }    
                }
            }
            else if (p.communication.mode === COMMUNICATION_PAGE_NAMES || p.communication.mode === COMMUNICATION_PAGE_SMALLTALK || p.communication.mode === COMMUNICATION_PAGE_COMMUNICATE_0 || p.communication.mode === COMMUNICATION_PAGE_TRADING || p.communication.mode === COMMUNICATION_PAGE_IDENTIFY || p.communication.mode === COMMUNICATION_PAGE_INQUIRY){
                if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA_FIRST_ROW, p)){
                   if (hover){
                         drawCommunicationBox(p,0);    
                        }else{
                         doCommuncation(p,0);  
                        }                    
                }
                if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA_SECOND_ROW, p)){
                   if (hover){
                         drawCommunicationBox(p,1);    
                        }else{
                         doCommuncation(p,1);  
                        }      
                }
                if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA_THIRD_ROW, p)){
                   if (hover){
                         drawCommunicationBox(p,2);    
                        }else{
                         doCommuncation(p,2);  
                        }     
                }
                if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA_FORTH_ROW, p)){
                   if (hover){
                         drawCommunicationBox(p,3);    
                        }else{
                         doCommuncation(p,3);  
                        }      
                }
            }            
            console.log("Hovering Row - " +p.communication.highlighted);
        }
        else{
            drawCommunicationBox(p,null);    
        }
        
    }
    
}

function checkClickInViewPortal(p, x, y) {
	switch (p.uiCenterPanel.mode) {
		case UI_CENTER_PANEL_VIEWPORT:
			if (uiClickInArea(x, y, UI_CLICK_PORTAL_ITEM_LEFT_CLOSE, p)) {
				if (p.actionItem(0)) {
					return p.id;
				}
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_ITEM_RIGHT_CLOSE, p)) {
				if (p.actionItem(1)) {
					return p.id;
				}
			}
			var o15 = p.getObjectOnPos(15, 2);
			var o18 = p.getObjectOnPos(18, 0);
			if (o15 === OBJECT_SHELF) {
				if (uiClickInArea(x, y, UI_CLICK_PORTAL_SHELF_TOP, p)) {
					if (p.actionItem(3)) {
						return p.id;
					}
				} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_SHELF_BOTTOM, p)) {
					if (p.actionItem(2)) {
						return p.id;
					}
				}
			} else if (o15 === OBJECT_SWITCH) {
				if (uiClickInArea(x, y, UI_CLICK_PORTAL_SWITCH, p)) {
					p.action();
					return p.id;
				}
			} else if (o15 === OBJECT_WOOD || o18 === OBJECT_WOOD) {
				return p.id;
			} else if (o15 === OBJECT_WOOD_DOOR || o18 === OBJECT_WOOD_DOOR || o15 === OBJECT_WOOD_DOOR_OPEN || o18 === OBJECT_WOOD_DOOR_OPEN) {
				if (uiClickInArea(x, y, UI_CLICK_PORTAL_WOODEN_DOOR, p)) {
					p.action();
					return p.id;
				}
			} else if (o15 === OBJECT_WALL) {
				return p.id;
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_ITEM_LEFT_BACK, p)) {
				if (p.actionItem(3)) {
					return p.id;
				}
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_ITEM_RIGHT_BACK, p)) {
				if (p.actionItem(2)) {
					return p.id;
				}
			}

			if (o15 === OBJECT_DOOR || o15 === OBJECT_DOOR_OPEN) {
				if (uiClickInArea(x, y, UI_CLICK_PORTAL_DOOR, p)) {
					p.action();
					return p.id;
				}
			}
			if (o15 === OBJECT_SCROLL) {
				if (uiClickInArea(x, y, UI_CLICK_PORTAL_SWITCH, p)) {
					if (p.uiRightPanel.mode === UI_RIGHT_PANEL_SCROLL) {
						p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
					} else {
						p.uiRightPanel.mode = UI_RIGHT_PANEL_SCROLL;
					}
					return p.id;
				}
			}
			break;
		case UI_CENTER_PANEL_SLEEPING:
			break;
		case UI_CENTER_PANEL_DEAD:
			break;
		case UI_CENTER_PANEL_FAIRY:
			break;
		case UI_CENTER_PANEL_FAIRY_DRAGON:
			break;
		case UI_CENTER_PANEL_FAIRY_SERPENT:
			break;
		case UI_CENTER_PANEL_FAIRY_MOON:
			break;
		case UI_CENTER_PANEL_FAIRY_CHAOS:
			break;
		default:
			break;
	}
	return -1;
}
