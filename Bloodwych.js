
//Setup some global Varibles for needed
//var canvas = document.getElementById("gamePort");
//
//var ctx = canvas.getContext("2d");
//ctx.imageSmoothingEnabled = false;
//ctx.webkitImageSmoothingEnabled = false;
//ctx.mozImageSmoothingEnabled = false;
GetDataView("maps/MOD0.MAP",mapdate);

var scale = 3;
var debug = true;
var debugHigh = false;

var Maps = ["MOD0","MOON","CHAOS","DRAGON","ZENDIK","SERP","BWEXTTW1","BWEXTTW2","BWEXTTW3","BWEXTTW4"];
var CurrentMap = 0;
var img = document.getElementById("bg");
var background = new Array();
background[0] = new Array(0, 0, 128, 76, 0, 0);
background[1] = new Array(128, 0, 128, 76, 0, 0);

//Declare Arrays for the Graphics
var gfxStone;
var gfxWooden = [];
var gfxStairs = [];
var gfxMisc = [];
var gfxDoor = [];
var gfxUnknown = [];
var gfxFloor = [];

//Load images into the Arrays
gfxStone = document.getElementById("stoneWalls");
gfxShelf = document.getElementById("Shelf");
gfxSerpBanner = document.getElementById("SerpBanner");
gfxDragonBanner = document.getElementById("DragonBanner");
gfxMoonBanner = document.getElementById("MoonBanner");
gfxChaosBanner = document.getElementById("ChaosBanner");
gfxScriptBanner = document.getElementById("ScriptBanner");
gfxWallSwitch = document.getElementById("WallSwitch");
gfxGemSlot = document.getElementById("GemSlot");
var gfxDragon;
var gfxChaos;
var gfxSerp;
var gfxBrown;

gfxScriptBanner.onload = function () {    
    gfxDragon = recolorImage(gfxScriptBanner,"Dragon","Banner");
    gfxChaos = recolorImage(gfxScriptBanner,"Chaos","Banner");
    gfxSerp = recolorImage(gfxScriptBanner,"Serp","Banner");
    gfxBrown = recolorImage(gfxScriptBanner,"Brown","Banner");
};

gfxWooden[0] = document.getElementById("WoodenWalls1");
gfxWooden[1] = document.getElementById("WoodenWalls2");
gfxWooden[2] = document.getElementById("WoodenWalls3");

gfxMisc[0] = document.getElementById("Pillar");
gfxMisc[1] = document.getElementById("Bed");

gfxDoor[0] = document.getElementById("ChromaticDoor");
gfxDoor[1] = document.getElementById("GateDoor");
gfxDoor[2] = document.getElementById("OpenDoor");

gfxStairs[0] = document.getElementById("StairsDown");
gfxStairs[1] = document.getElementById("StairsUp");

gfxFloor[0] = document.getElementById("PitDown");
gfxFloor[1] = document.getElementById("PitUp");
gfxFloor[2] = document.getElementById("FloorPad");

var gfxPos = SpriteSheetArray();
var b = 0;
var p1 = new player(12, 22, 3,0,0,0);
var p2 = new player(14,22,3,0,0,350);
var tw = new Tower();
     
document.addEventListener('touchstart', doTouchStart, false);

//Touch Screen Stuff
var canvas_x;
var canvas_y;



function updatePlayerViewScreen(){  
    
    if (typeof tw !== "undefined") {
            clearCanvas();
            configCanvas();
            myDIx(ctx, img, background[b], p1, scale);
            p1.pView(tw.Levels[p1.level].Map);
            drawPlayersView(p1);
            ctx.fillText("X:" + p1.X.toString() + "\n Y:"  + p1.Y.toString(),10,250);
            ctx.fillText("Current Map: " +Maps[CurrentMap],10,270);
            ctx.fillText("Level: " + p1.level.toString(),10,290);
            ctx.fillText(canvas_x + " - " + canvas_y,10,310);
            if (debug){PrintLog("Screen Updated");}
    }
}

function myDIx(canvas, img, PosAry, P, scale) {
    
    if (img === null) {}
    else {
        canvas.drawImage(img, PosAry[0], PosAry[1], PosAry[2], PosAry[3], (PosAry[4] *scale)+ P.PortalX, (PosAry[5] * scale) + P.PortalY, PosAry[2] * scale, PosAry[3] * scale);
    }    
}

function configCanvas() {
	ctx.imageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
        ctx.font = "bold 20px Calibri";
}

function doTouchStart(e) {
    
            canvas_x = event.targetTouches[0].pageX;
            canvas_y = event.targetTouches[0].pageY;
    
            if (canvas_y < 300 & (canvas_x > 120 & canvas_x < 270)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], p1, scale);
                p1.moveForward();
                p1.pView(tw.Levels[p1.level].Map);
                drawPlayersView(p1);
                event.preventDefault();
            }
            else if (canvas_y > 300 & (canvas_x > 120 & canvas_x < 270)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], p1, scale);
                p1.moveBackwards();
                p1.pView(tw.Levels[p1.level].Map);
                drawPlayersView(p1);
            }
            else if (canvas_y < 300 & (canvas_x > 270)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], p1, scale);
                p1.RotatePlayer(0);
                p1.pView(tw.Levels[p1.level].Map);
                drawPlayersView(p1);                
            }
            else if (canvas_y < 300 & (canvas_x < 120)){
                clearCanvas();
                configCanvas();
                myDIx(ctx, img, background[b], p1, scale);
                p1.RotatePlayer(1);
                p1.pView(tw.Levels[p1.level].Map);
                drawPlayersView(p1);                
            }
            
    

                       
        
}

function doKeyDown(e) {

    switch (e.keyCode)
    {
        //===============
        // THE L KEY
        //===============
        
        case 76: {
            tw = new Tower();
            CurrentMap = CurrentMap + 1;
            if (CurrentMap > Maps.length -1){
                CurrentMap = 0;
            }
            p1.X = 0;
            p1.Y = 0;
            GetDataView("maps/"+Maps[CurrentMap]+".MAP",mapdate);                        
            break; 
        }
        
        
        //===============
        // THE T KEY
        //===============
        
        case 84: {           
            p1.ChangeUpLevel();                      
            break; 
        }
        
        //===============
        // THE G KEY
        //===============
        
        case 71: {            
            p1.ChangeDownLevel();            
            break;   
        }
        
        
            //====================
            //	THE W KEY
            //====================

        case 87:
            p1.moveForward();            
            break;

            //====================
            //	THE S KEY
            //====================
            
        case 83:
            p1.moveBackwards();
            break;

            //====================
            //	THE A KEY
            //====================
        case 65:
            p1.moveLeft();
            break;

            //====================
            //	THE D KEY
            //====================
        case 68:
            p1.moveRight();
            break;
        
            //====================
            //	THE Q KEY
            //====================
        case 69:
            p1.RotatePlayer(0);
            break;
            
            //====================
            //	THE E KEY
            //====================
        case 81:
            p1.RotatePlayer(1);
            break;
        default:{};break;
    }


    if (b === 0) {
        b = 1;
    }
    else {
        b = 0;
    }
}

function clearCanvas() {
    canvas.width = canvas.width;
}

