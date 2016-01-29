//var loadingIntervalTimer = 0;

function initGame() {
    $('canvas').attr('data-game-status', 'loading');
    loadGfxUIData();
    uiClickArea = uiClickAreas();

	preload.on("fileprogress", handleFileProgress);
    preload.on("error", handleError);
    preload.on("complete", handleComplete);
}

function loadManifest() {

    var path;

    switch(gameType){

        case GAME_BLOODWYCH:path = "data/BW/data.json";break;
        case GAME_EXTENDED_LEVELS:path = "data/EXT/data.json";break;
        case GAME_BOOK_OF_SKULLS:path = "data/BOS/data.json";break;
        case GAME_CUSTOM:path = "data/CUSTOM/data.json";break;

    }

    preload.loadManifest({src: path, callback: "loadGfx", type: "manifest"}, true);
}

function stop() {
    if (preload != null) {
        preload.close();
    }
}

function loadGraphicsData2(event){
    preload.loadManifest(event.manifest,true,event.path);
}

function handleFileProgress(event){
	loadingScreen(event);
}

function handleError(event){

     var tmp = "";
}

function handleComplete(event){

    var items = preload.getItems();
    for (i in items){
        var item = items[i].item;
        if (debug){
            console.log("Loaded File: " + item.src);
        }

        switch (item.type){

            case createjs.AbstractLoader.IMAGE: gfxLoadImages(item);break;
            case createjs.AbstractLoader.BINARY: loadBinaryFiles(item);break;

        }
    }

    initMenuData();
}

function loadBinaryData(event){
    preload.loadManifest(event.manifest,true,"data/");
}

function updateLoadingScreen(msg, percent) {
    clearCanvas();
    ctx.font = "normal 14px \"Bookman Old Style\", verdana, sans-serif";
    ctx.fillStyle = "#FFF";
    ctx.fillText(percent + "% - " + msg + "...", 0, 15);
}

function loadGfxUIData() {
    gfxLoadImage("misc", "font", "", null);
}

function loadTowerData(event) {
    tower = event.towers;
	initTowers();    
    preload.loadManifest(event.manifest,true,"data/");
}

function initMenuData(){

    projectile[towerThis] = new Array();
    initData();

    if (typeof game === "undefined") {
        startScreen();
    }

}

function initData() {

    gfx['character']['heads'] = getCharacterSprite(NUMBER_OF_HEADS, 'character', 'heads', 13, 13, 16);
    gfx['character']['legs'] = getCharacterSprite(NUMBER_OF_LEGS, 'character', 'legs', 17, 27, 17);
    gfx['character']['arms'] = getCharacterSprite(NUMBER_OF_ARMS, 'character', 'arms', 13, 19, 13);
    gfx['character']['minis'] = getCharacterSprite(NUMBER_OF_MINIS, 'character', 'minis', 13, 22, 16);
    gfx['character']['torsos'] = getCharacterSprite(NUMBER_OF_TORSOS, 'character', 'torsos', 17, 14, 17);

    gfxUI = grabUISprites(gfx['misc']['uistuff']);
    itemsGfxD = initItemsGfxD();
    audioFiles = loadSounds();
    initMonsterPalettes();
    initArmourGfx();
    initMonsters();

    initSpells();
    initItemRefs();
    for (var i = 0; i < tower.length; i++) {
        initItems(tower[i]);
    }

    initChampions();
}

function startGame(singlePlayer, quickStart, p1_cid, p2_cid) {

	progressScreen("STARTING GAME");

    if (typeof god === "undefined") {
        god = false;
    }
	
	progressScreen("INIT PLAYERS");
    initPlayers(singlePlayer, quickStart, p1_cid, p2_cid);

    if (god) {
            godMode();
    }

    progressScreen("INIT TOWER SWITCHES");
	initTowerSwitches();
    switchTower(0);
//        if (isMobile){
//            var mon = getMonstersInTower(towerThis, true);
//            for (m in mon){
//                initMonsterGfxNew(monster[towerThis][m]);
//            }
//        }
    gameStarted = true;
	
	progressScreen("PROCESSING CHAMPIONS");
    for (pl in championSelect) {
        if (championSelect[pl].champID > -1) {
            champion[championSelect[pl].champID].selectedSpell = null;
            championSelect[pl].champID = -1;
        }
    }
    $('canvas').attr('data-game-status', 'started');
    //for (p in player) {
    //		player[p].message("WELCOME THEE TRAVELLER, TO THE REMAKE OF", COLOUR[COLOUR_YELLOW], true);
    //		player[p].message("   BLOODWYCH - REWRITTEN BY MAD BONE    ", COLOUR[COLOUR_YELLOW], true);
    //		player[p].message("          WWW.BLOODWYCH.CO.UK           ", COLOUR[COLOUR_YELLOW], true);
    //	}
    //saveGame(99, 'autosave');
    
    if(resumeLoadGame) {
            loadGame(99);
    }
	
    progressScreen("RUN GAME");
	Run();
		
	switch(gameType){

		case GAME_BLOODWYCH:;break;
		case GAME_EXTENDED_LEVELS:startExtendedLevel();break;
		case GAME_BOOK_OF_SKULLS:startBOS();break;
		case GAME_CUSTOM:;break;

	}

    if (debug && mapEnabled){
        setTimeout(function() {
            window.setInterval(createDebugWindow(), 1000);
        }, 1500);
    }

    setTimeout(function() {playSoundLoop(SOUND_PCMUSIC);}, 500);

}