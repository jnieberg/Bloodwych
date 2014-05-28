function Item(id, quantity, location) {
    this.id = id;
    this.quantity = quantity;
    this.location = location;
    this.type = this.getType();
    this.itemRef = itemRef[id];
}

Item.prototype.getType = function() {
    var id = this.id;
    if (id === ITEM_EMPTY) {
        return ITEM_TYPE_EMPTY;
    } else if (id <= ITEM_ELF_ARROWS) {
        return ITEM_TYPE_STACKABLE;
    } else if (id <= ITEM_NEGG_RED) {
        return ITEM_TYPE_FOOD;
    } else if (id <= ITEM_MOON_ELIXIR) {
        return ITEM_TYPE_POTION;
    } else if (id <= ITEM_CRYSTAL_PLATE) {
        return ITEM_TYPE_ARMOUR;
    } else if (id <= ITEM_WAR_SHIELD) {
        return ITEM_TYPE_SHIELD;
    } else if (id <= ITEM_CRYSTAL_GLOVES) {
        return ITEM_TYPE_GLOVES;
    } else if (id <= ITEM_POWER_STAFF) {
        return ITEM_TYPE_WEAPON;
    } else if (id <= ITEM_THAI_CHANG_RIP) {
        return ITEM_TYPE_RIP;
    } else if (id <= ITEM_CHROMATIC_KEY) {
        return ITEM_TYPE_KEY;
    } else if (id <= ITEM_HEAL_WAND) {
        return ITEM_TYPE_WAND;
    } else if (id <= ITEM_CROSS_BOW) {
        return ITEM_TYPE_BOW;
    } else if (id <= ITEM_PERMIT) {
        return ITEM_TYPE_SCROLL;
    } else if (id <= ITEM_MOON_CRYSTAL) {
        return ITEM_TYPE_CRYSTAL;
    } else if (id <= ITEM_TAN_GEM) {
        return ITEM_TYPE_GEM;
    } else if (id <= ITEM_MOON_RING) {
        return ITEM_TYPE_RING;
    } else if (id <= ITEM_BOOK_OF_SKULLS) {
        return ITEM_TYPE_BOOK;
    }
    return -1;
}

Item.prototype.getWeaponPower = function() {
    if (this.type === ITEM_TYPE_WEAPON) {
        switch (this.id) {
            case ITEM_DAGGER:
                return 2;
            case ITEM_STEALTH_BLADE:
                return 3;
            case ITEM_SHORT_SWORD:
                return 4;
            case ITEM_LONG_SWORD:
                return 5;
            case ITEM_MITHRIL_SWORD:
                return 7;
            case ITEM_FLESHBANE:
                return 9;
            case ITEM_DEMON_BLADE:
                return 13;
            case ITEM_ACE_OF_SWORDS:
                return 17;

            case ITEM_BATTLE_AXE:
                return 6;
            case ITEM_MITHRIL_AXE:
                return 8;
            case ITEM_TROLLS_AXE:
                return 11;
            case ITEM_BRAINBITER:
                return 14;
            case ITEM_DEATHBRINGER:
                return 19;

            case ITEM_STAFF:
                return 4;
            case ITEM_BATTLE_STAFF:
                return 7;
            case ITEM_POWER_STAFF:
                return 10;
        }
    }
    return 0;
}

Item.prototype.getFoodValue = function() {
    if (this.type === ITEM_TYPE_FOOD) {
        if(this.id <= ITEM_CHICKEN) {
            return 16;
        } else if(this.id <= ITEM_WATER) {
            return 10;
        } else if(this.id <= ITEM_NEGG_GREEN) {
            return 33;
        } else if(this.id <= ITEM_NEGG_BLUE) {
            return 66;
        } else if(this.id <= ITEM_NEGG_RED) {
            return 66;
        }
    }
    return 0;
}

Item.prototype.getArmourClass = function() {
    if (this.type === ITEM_TYPE_ARMOUR) {
    	switch (this.id) {
    		case ITEM_LEATHER_ARMOUR:
    		return 3;
    		case ITEM_CHAIN_MAIL:
    		return 5;
    		case ITEM_PLATE_MAIL:
    		return 7;
    		case ITEM_MITHRIL_CHAIN:
    		return 8;
    		case ITEM_MITHRIL_PLATE:
    		return 11;
    		case ITEM_ADAMANT_CHAIN:
    		return 13;
    		case ITEM_ADAMANT_PLATE:
    		return 15;
    		case ITEM_CRYSTAL_CHAIN:
    		return 17;
    		case ITEM_CRYSTAL_PLATE:
    		return 19;
    		default:
    		break;
    	}
    } else if (this.type === ITEM_TYPE_SHIELD) {
    	switch (this.id) {
    		case ITEM_LEATHER_SHIELD:
    		return 1;
    		case ITEM_BUCKLER:
    		return 2;
    		case ITEM_RUNE_SHIELD:
    		return 4;
    		case ITEM_LARGE_SHIELD:
    		return 3;
    		case ITEM_MOON_SHIELD:
    		return 4;
    		case ITEM_DRAGON_SCALE:
    		return 5;
    		case ITEM_WAR_SHIELD:
    		return 7;
    		default:
    		break;
    	}
	} else if (this.type === ITEM_TYPE_GLOVES) {
		switch (this.id) {
    		case ITEM_CHAOS_GLOVES:
    		return 1;
    		case ITEM_BATTLE_GLOVES:
    		return 2;
    		case ITEM_MITHRIL_GLOVES:
    		return 3;
    		case ITEM_ADAMANT_GLOVES:
    		return 4;
    		case ITEM_CRYSTAL_GLOVES:
    		return 5;
    		default:
    		break;
    	}
    }
    return 0;
}

Item.prototype.setPocketItem = function(id, q) {
    if (typeof id === "undefined" || id === 0) {
        id = 0;
        q = 0;
    } else if (typeof q === "undefined") {
        q = 1;
    }
    this.id = id;
    this.quantity = q;
    this.location.tower = -1;
    this.location.floor = 0;
    this.location.x = 0;
    this.location.y = 0;
    this.location.square = 0;
    this.type = this.getType();
    this.itemRef = itemRef[id];
}

Item.prototype.toString = function() {
    var loc = "";
    if (typeof this.location.tower !== "undefined" && this.location.tower !== -1) {
        loc = ", location:[";
        loc = loc + "tower:" + this.location.tower;
        loc = loc + ", floor:" + this.location.floor;
        loc = loc + ", x:" + this.location.x;
        loc = loc + ", y:" + this.location.y;
        loc = loc + ", square:" + this.location.square;
        loc = loc + "]";
    }
    return '[id:' + this.id + ', quantity:' + this.quantity + loc + ']';
}

//Dungeon items

function initItems() {
    for (i = 0; i < itemData.length; i++) {
        var id = 0;
        var quantity = 1;
        var location = {
            tower: tower,
            floor: floor,
            x: x,
            y: y,
            square: square
        };
        item[i] = new Item(id, quantity, location);
        PrintLog('Loaded item: ' + item[i]);
    }
}

function newPocketItem(id, q) {
    if (typeof id === "undefined" || id === 0) {
        id = 0;
        q = 0;
    } else if (typeof q === "undefined") {
        q = 1;
    }
    return new Item(id, q, {
        tower: -1,
        floor: 0,
        x: 0,
        y: 0,
        square: 0
    });
}

//This is the big item list
//itemGfx was the former gfxUI, but only for pocket items
function initItemRefs() {
	createItemRef(0, "Empty Item", gfxUI[UI_GFX_POCKET_EMPTY], null);
        createItemRef(1, "Coinage", gfxUI[UI_GFX_POCKET_COIN], dungeonItems[DUNGEON_ITEM_COIN]);
        createItemRef(2, "Common Keys", gfxUI[UI_GFX_POCKET_COMMON_KEY], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_KEY],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_PINK],COLOUR[COLOUR_PINK],COLOUR[COLOUR_PINK],COLOUR[COLOUR_BLACK])));
        createItemRef(3, "Arrows", gfxUI[UI_GFX_POCKET_ARROW], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_ARROW],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_RED],COLOUR[COLOUR_BROWN],COLOUR[COLOUR_BLACK])));
        createItemRef(4, "Elf Arrows", gfxUI[UI_GFX_POCKET_ELF_ARROW], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_ARROW],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(5, "Food", gfxUI[UI_GFX_POCKET_APPLE_1], dungeonItems[DUNGEON_ITEM_APPLE]);
        createItemRef(6, "Food", gfxUI[UI_GFX_POCKET_APPLE_2], dungeonItems[DUNGEON_ITEM_APPLE_HALF]);
        createItemRef(7, "Food", gfxUI[UI_GFX_POCKET_APPLE_3], dungeonItems[DUNGEON_ITEM_APPLE_HALF]);
        createItemRef(8, "Food", gfxUI[UI_GFX_POCKET_BISCUIT_1], dungeonItems[DUNGEON_ITEM_BISCUIT]);
        createItemRef(9, "Food", gfxUI[UI_GFX_POCKET_BISCUIT_2], dungeonItems[DUNGEON_ITEM_BISCUIT]);
        createItemRef(10, "Food", gfxUI[UI_GFX_POCKET_BISCUIT_3], dungeonItems[DUNGEON_ITEM_BISCUIT]);
        createItemRef(11, "Food", gfxUI[UI_GFX_POCKET_CHICKEN_1], dungeonItems[DUNGEON_ITEM_CHICKEN]);
        createItemRef(12, "Food", gfxUI[UI_GFX_POCKET_CHICKEN_2], dungeonItems[DUNGEON_ITEM_CHICKEN]);
        createItemRef(13, "Food", gfxUI[UI_GFX_POCKET_CHICKEN_3], dungeonItems[DUNGEON_ITEM_CHICKEN]);
        createItemRef(14, "Mead", recolourUiGfx(gfxUI[UI_GFX_POCKET_WATER_1],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), dungeonItems[DUNGEON_ITEM_DRINK]);
        createItemRef(15, "Mead", recolourUiGfx(gfxUI[UI_GFX_POCKET_WATER_2],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), dungeonItems[DUNGEON_ITEM_DRINK]);
        createItemRef(16, "Mead", recolourUiGfx(gfxUI[UI_GFX_POCKET_WATER_3],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), dungeonItems[DUNGEON_ITEM_DRINK]);
        createItemRef(17, "Water", recolourUiGfx(gfxUI[UI_GFX_POCKET_WATER_1],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE_DARK]), dungeonItems[DUNGEON_ITEM_DRINK]);
        createItemRef(18, "Water", recolourUiGfx(gfxUI[UI_GFX_POCKET_WATER_2],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE_DARK]), dungeonItems[DUNGEON_ITEM_DRINK]);
        createItemRef(19, "Water", recolourUiGfx(gfxUI[UI_GFX_POCKET_WATER_3],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE_DARK]), dungeonItems[DUNGEON_ITEM_DRINK]);
        createItemRef(20, "N'egg", recolourUiGfx(gfxUI[UI_GFX_POCKET_NEGG],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_NEGG],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(21, "N'egg", recolourUiGfx(gfxUI[UI_GFX_POCKET_NEGG],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE_DARK]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_NEGG],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(22, "N'egg", recolourUiGfx(gfxUI[UI_GFX_POCKET_NEGG],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), dungeonItems[DUNGEON_ITEM_NEGG]);
        createItemRef(23, "Serpent Slime", recolourUiGfx(gfxUI[UI_GFX_POCKET_POTION],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_POTION],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(24, "Brimstone Broth", recolourUiGfx(gfxUI[UI_GFX_POCKET_POTION],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_POTION],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(25, "Dragon Ale", recolourUiGfx(gfxUI[UI_GFX_POCKET_POTION],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), dungeonItems[DUNGEON_ITEM_POTION]);
        createItemRef(26, "Moon Elixir", recolourUiGfx(gfxUI[UI_GFX_POCKET_POTION],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE_DARK]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_POTION],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(27, "Leather Armour", gfxUI[UI_GFX_POCKET_AMOUR_LEATHER], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AMOUR],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_PINK],COLOUR[COLOUR_BROWN],COLOUR[COLOUR_RED_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(28, "Chain Mail", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_CHAIN],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AMOUR],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(29, "Plate Mail", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_PLATE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AMOUR],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_MEDIUM],COLOUR[COLOUR_BLACK])));
        createItemRef(30, "Mithril Chain", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_CHAIN],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AMOUR],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_BLUE],COLOUR[COLOUR_GREY_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(31, "Mithril Plate", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_PLATE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AMOUR],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_BLUE],COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(32, "Adamant Chain", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_CHAIN],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AMOUR],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(33, "Adamant Plate", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_PLATE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AMOUR],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(34, "Crystal Chain", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_CHAIN],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AMOUR],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_PINK],COLOUR[COLOUR_GREY_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(35, "Crystal Plate", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_PLATE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AMOUR],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_PINK],COLOUR[COLOUR_BROWN],COLOUR[COLOUR_BLACK])));
        createItemRef(36, "Leather Shield", gfxUI[UI_GFX_POCKET_SHIELD_2],  recolourSpriteArray(dungeonItems[DUNGEON_ITEM_SMALL_SHIELD],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_PINK],COLOUR[COLOUR_BROWN],COLOUR[COLOUR_RED_DARK],COLOUR[COLOUR_BROWN])));
        createItemRef(37, "Buckler", gfxUI[UI_GFX_POCKET_SHIELD_3],  recolourSpriteArray(dungeonItems[DUNGEON_ITEM_SMALL_SHIELD],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_MEDIUM],COLOUR[COLOUR_GREY_MEDIUM])));
        createItemRef(38, "Rune Shield", gfxUI[UI_GFX_POCKET_SHIELD_1],  recolourSpriteArray(dungeonItems[DUNGEON_ITEM_SMALL_SHIELD],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_MEDIUM],COLOUR[COLOUR_RED])));
        createItemRef(39, "Large Shield", gfxUI[UI_GFX_POCKET_SHIELD_4],  recolourSpriteArray(dungeonItems[DUNGEON_ITEM_LARGE_SHIELD],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_MEDIUM],COLOUR[COLOUR_BLACK])));
        createItemRef(40, "Moon Shield", gfxUI[UI_GFX_POCKET_SHIELD_5],  recolourSpriteArray(dungeonItems[DUNGEON_ITEM_LARGE_SHIELD],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_BLUE],COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(41, "Dragon Scale", gfxUI[UI_GFX_POCKET_SHIELD_6],  recolourSpriteArray(dungeonItems[DUNGEON_ITEM_LARGE_SHIELD],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_PINK],COLOUR[COLOUR_RED_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(42, "War Shield", gfxUI[UI_GFX_POCKET_SHIELD_7],  recolourSpriteArray(dungeonItems[DUNGEON_ITEM_LARGE_SHIELD],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(43, "Chaos Gloves", recolourUiGfx(gfxUI[UI_GFX_POCKET_GLOVE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_GLOVE],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_PINK],COLOUR[COLOUR_BLACK])));
        createItemRef(44, "Battle Gloves", recolourUiGfx(gfxUI[UI_GFX_POCKET_GLOVE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_GLOVE],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(45, "Mithril Gloves", recolourUiGfx(gfxUI[UI_GFX_POCKET_GLOVE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_GLOVE],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_BLUE],COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(46, "Adamant Gloves", recolourUiGfx(gfxUI[UI_GFX_POCKET_GLOVE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_GLOVE],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_BLACK])));
        createItemRef(47, "Crystal Gloves", recolourUiGfx(gfxUI[UI_GFX_POCKET_GLOVE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_GLOVE],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_PINK],COLOUR[COLOUR_BROWN],COLOUR[COLOUR_BLACK])));
        createItemRef(48, "Dagger", gfxUI[UI_GFX_POCKET_DAGGER], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_DAGGER],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_RED_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(49, "Stealth Blade", gfxUI[UI_GFX_POCKET_SHORT_SWORD], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_DAGGER],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(50, "Short Sword", gfxUI[UI_GFX_POCKET_SWORD_1], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_SWORD],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_RED_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(51, "Long Sword", recolourUiGfx(gfxUI[UI_GFX_POCKET_SWORD_2],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_SWORD],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_BROWN],COLOUR[COLOUR_RED_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(52, "Mithril Sword", recolourUiGfx(gfxUI[UI_GFX_POCKET_SWORD_2],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_SWORD],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_BLUE],COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(53, "Fleshbane", gfxUI[UI_GFX_POCKET_SWORD_3], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_SWORD],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(54, "Demon Blade", gfxUI[UI_GFX_POCKET_SWORD_4], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_SWORD],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_PINK],COLOUR[COLOUR_RED],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(55, "Ace of Swords", gfxUI[UI_GFX_POCKET_SWORD_5], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_SWORD],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_PINK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(56, "Battle Axe", recolourUiGfx(gfxUI[UI_GFX_POCKET_AXE_1],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AXE],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED_DARK],COLOUR[COLOUR_PINK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(57, "Mithril Axe", recolourUiGfx(gfxUI[UI_GFX_POCKET_AXE_1],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AXE],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_BLUE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(58, "Troll's Axe", gfxUI[UI_GFX_POCKET_AXE_2], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AXE],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(59, "Brainbiter", gfxUI[UI_GFX_POCKET_AXE_3], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AXE],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_BLUE],COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(60, "Deathbringer", gfxUI[UI_GFX_POCKET_AXE_4], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_AXE],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_MEDIUM],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(61, "Staff", recolourUiGfx(gfxUI[UI_GFX_POCKET_STAFF],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_DARKEST]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_STAFF],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREY_MEDIUM],COLOUR[COLOUR_GREY_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(62, "Battle Staff", recolourUiGfx(gfxUI[UI_GFX_POCKET_STAFF],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_DARK]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_STAFF],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(63, "Power Staff", recolourUiGfx(gfxUI[UI_GFX_POCKET_STAFF],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_STAFF],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_PINK],COLOUR[COLOUR_BROWN],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(64, "Blodwyn (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(65, "Murlock (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_PINK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(66, "Eleanor (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_RED_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(67, "Roseanne (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_BLUE],COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(68, "Astroth (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_PINK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(69, "Zothen (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_RED_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(70, "Baldrick (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_BLUE],COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(71, "Elfric (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(72, "Sir Edward (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_RED_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(73, "Megrim (RIP)",   recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_BLUE],COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(74, "Sethra (RIP)",   recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(75, "Mr. Flay (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_PINK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(76, "Ulrich (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_BLUE],COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(77, "Zastaph (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(78, "Hengist (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_PINK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(79, "Thai-Chang (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RIP],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_RED_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(80, "Bronze Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BROWN]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_KEY],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_BROWN],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(81, "Iron Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_KEY],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(82, "Serpent Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_KEY],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(83, "Chaos Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_KEY],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(84, "Dragon Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_KEY],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_RED],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(85, "Moon Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_KEY],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_BLUE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(86, "Chromatic Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_WHITE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_KEY],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(87, "Serpent Wand", recolourUiGfx(gfxUI[UI_GFX_POCKET_WAND],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_WAND],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(88, "Chaos Wand",   recolourUiGfx(gfxUI[UI_GFX_POCKET_WAND],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_WAND],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(89, "Dragon Wand", recolourUiGfx(gfxUI[UI_GFX_POCKET_WAND],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_WAND],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_RED],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(90, "Moon Wand", recolourUiGfx(gfxUI[UI_GFX_POCKET_WAND],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_WAND],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_BLUE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(91, "Heal Wand", recolourUiGfx(gfxUI[UI_GFX_POCKET_WAND],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_WAND],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(92, "Long Bow", gfxUI[UI_GFX_POCKET_BOW], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_BOW],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(93, "Frost Bow", recolourUiGfx(gfxUI[UI_GFX_POCKET_BOW],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_WHITE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_BOW],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_WHITE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(94, "Cross Bow", gfxUI[UI_GFX_POCKET_CROSS_BOW], dungeonItems[DUNGEON_ITEM_CROSS_BOW]);
        createItemRef(95, "Permit", gfxUI[UI_GFX_POCKET_PERMIT], dungeonItems[DUNGEON_ITEM_PERMIT]);
        createItemRef(96, "Serpent Crystal", gfxUI[UI_GFX_POCKET_GEM_SERPENT], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_GEM],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(97, "Chaos Crystal", gfxUI[UI_GFX_POCKET_GEM_CHAOS], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_GEM],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_PINK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(98, "Dragon Crystal", gfxUI[UI_GFX_POCKET_GEM_DRAGON], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_GEM],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_RED_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(99, "Moon Crystal", gfxUI[UI_GFX_POCKET_GEM_MOON], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_GEM],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_BLUE],COLOUR[COLOUR_BLUE_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(100, "Grey Gem", gfxUI[UI_GFX_POCKET_GEM_GREY], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_GEM],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_MEDIUM],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(101, "Bluish Gem", gfxUI[UI_GFX_POCKET_GEM_GREENISH], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_GEM],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(102, "Brown Gem", gfxUI[UI_GFX_POCKET_GEM_BROWN], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_GEM],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_BROWN],COLOUR[COLOUR_RED_DARK],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(103, "Tan Gem", gfxUI[UI_GFX_POCKET_GEM_TAN], recolourSpriteArray(dungeonItems[DUNGEON_ITEM_GEM],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_PINK],COLOUR[COLOUR_BROWN],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(104, "Grey Ring", recolourUiGfx(gfxUI[UI_GFX_POCKET_RING],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_DARK]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RING],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(105, "Serpent Ring", recolourUiGfx(gfxUI[UI_GFX_POCKET_RING],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RING],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(106, "Chaos Ring", recolourUiGfx(gfxUI[UI_GFX_POCKET_RING],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RING],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_YELLOW],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(107, "Dragon Ring", recolourUiGfx(gfxUI[UI_GFX_POCKET_RING],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RING],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_RED],COLOUR[COLOUR_RED],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(108, "Moon Ring", recolourUiGfx(gfxUI[UI_GFX_POCKET_RING],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), recolourSpriteArray(dungeonItems[DUNGEON_ITEM_RING],DUN_ITEM_PALETTE_DEFAULT,new Array(COLOUR[COLOUR_BLUE],COLOUR[COLOUR_BLUE],COLOUR[COLOUR_GREY_LIGHT],COLOUR[COLOUR_BLACK])));
        createItemRef(109, "Book of Skulls", gfxUI[UI_GFX_ICON_BOOKOFSKULLS], dungeonItems[DUNGEON_ITEM_BOOK_OF_SKULLS]);

dungeonItems = [];

}

//Read out the items here
function createItemRef(id, name, gfx, gfxD) {
    itemRef[id] = {
        name: name,
        gfx: gfx,
        gfxD: gfxD
    };
}

//Read the dungeon item gfx here
//Reads in the image
function initItemGfxD() {
	for(i = 0; i < 0; i++) {
		itemGfxD[i] = new Array();
		for(d = DISTANCE_VERY_CLOSE; d <= DISTANCE_DISTANT; d++) {
			itemGfxD[i][d] = null;
		}
	}
}

function dungeonItems(){
    
    var spriteSheetIMG = gfx['dungeon']['items2'];
    var dItems = [];
    
        for (y = 0; y < 3; y++) {
            for (x = 0; x < 9; x++) {
                var i = [];
                var b = y * 42;
                i.push(grabImageAt(spriteSheetIMG, x * 33, b +(y + 0), 33, 10, false));
                i.push(grabImageAt(spriteSheetIMG, x * 33, b + (y + 10), 33, 12, false));
                i.push(grabImageAt(spriteSheetIMG, x * 33, b + (y + 22), 33, 8, false));
                i.push(grabImageAt(spriteSheetIMG, x * 33, b + (y + 30), 33, 7, false));
                i.push(grabImageAt(spriteSheetIMG, x * 33, b + (y + 37), 33, 6, false));
                dItems.push(i);
            }
        }
        
    return dItems;    
}