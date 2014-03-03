function SpriteSheetArray(){

      //Convert the graphics sprite sheets into individual images and put them in an array
      //The Array consists of StartX,StartY,WidthX,HeightY,ScreenX,ScreenY
      
      var ImageArray = new Array();
	
      ImageArray[0] = new Array(0, 0, 15, 76, 0, 0);
      ImageArray[1] = new Array(0, 0, 15, 76, 0, 0);
      ImageArray[2] = new Array(15, 0, 98, 76, 15, 0);
      ImageArray[3] = new Array(113, 0, 15, 76, 113, 0);

      ImageArray[4] = new Array(128, 0, 15, 76, 0, 0);
      ImageArray[5] = new Array(143, 0, 17, 76, 15, 0);
      ImageArray[6] = new Array(160, 0, 64, 76, 32, 0);
      ImageArray[7] = new Array(224, 0, 17, 76, 96, 0);
      ImageArray[8] = new Array(241, 0, 16, 76, 113, 0);

      ImageArray[9] = new Array(0, 76, 32, 42, 0, 14);
      ImageArray[10] = new Array(32, 76, 8, 42, 32, 14);
      ImageArray[11] = new Array(40, 76, 48, 42, 40, 14);
      ImageArray[12] = new Array(88, 76, 8, 42, 88, 14);
      ImageArray[13] = new Array(96, 76, 32, 42, 96, 14);

      ImageArray[14] = new Array(128, 76, 41, 36, 0, 14);
      ImageArray[15] = new Array(168, 76, 6, 36, 40, 14);
      ImageArray[16] = new Array(174, 76, 36, 36, 46, 14);
      ImageArray[17] = new Array(210, 76, 6, 36, 82, 14);
      ImageArray[18] = new Array(215, 76, 41, 36, 87, 14);

      ImageArray[19] = new Array(0, 118, 12, 28, 0, 18);
      ImageArray[20] = new Array(12, 118, 34, 28, 12, 18);
      ImageArray[21] = new Array(46, 118, 4, 28, 46, 18);
      ImageArray[22] = new Array(50, 118, 4, 28, 78, 18);
      ImageArray[23] = new Array(54, 118, 34, 28, 82, 18);
      ImageArray[24] = new Array(88, 118, 12, 28, 116, 18);

      ImageArray[25] = new Array(100, 118, 13, 28, 0, 18);
      ImageArray[26] = new Array(113, 118, 10, 28, 13, 18);
      ImageArray[27] = new Array(123, 118, 10, 28, 104, 18);
      ImageArray[28] = new Array(133, 118, 14, 28, 114, 18);
      
      //ImageArray[28] = new Array(292, 222, 60, 151, 0, 0);
      //ImageArray[29] = new Array(324, 222, 190, 151, 0, 0);
     // ImageArray[30] = new Array(485, 222, 60, 151, 0, 0);
	  
	  return ImageArray;
	  
    }
    
    function getImage(Hex,d,pos,p){
      
      // Hex = Bloodwych Hex Code
      // d = direction of required wall (North,East,South,West)
      // pos = Position on the screen we are drawing
      // 
      // This function will return the correct graphic to be draw for the Hex Code passed
      // I may need to pass the Graphics Position to be drawn so I can work out which graphic
      // to be return for each wall side.
      
      var CC = parseInt(Hex.substring(3),16);
      var BB = parseInt(Hex.substring(1,2),16);
      
        switch (CC){
            case 0:return null;break;
            case 1:return getStoneWall(Hex,d,pos,p);break;
            case 2:return getWooden(Hex,d,pos,p);break;
            case 3:return gfxMisc[0];break;
            case 4:{if (Hex.substring(1,2) === "1"){return gfxStairs[0];}
                     else {return gfxStairs[1];};break;}
            case 5:{if (BB%4 === 2 || BB%4 === 3) {return gfxDoor[1];}else{return gfxDoor[0];}}break;
            case 6:{if (Hex === "0706"){return gfxFloor[1];} //Roof Pit
                    if (BB % 4 === 0) {return null;} 
                    else if (BB % 4 === 1) {return gfxFloor[0];} //Floor Pit
                    else if (BB % 4 === 2) {return gfxFloor[2];} //Green Pad
                    else if (BB % 4 === 3) {return null;} //Blank space
                    else {return null;}} //Default blank space
            case 7:return gfxUnknown;break;                
        }
        
    };
    
    function getWooden(HexCode,d,pos,P) {
        
        var b = hexToBinary(HexCode.substring(0,2));
        
        var s = [];
        s[0] = b.result.substring(6,8); //North Face
        s[1] = b.result.substring(4,6); //East Face
        s[2] = b.result.substring(2,4); //South Face
        s[3] = b.result.substring(0,2); //West Face
        
        switch (d) {
            
            case 0:{return bin2type(s[0]);};
            case 1:{return bin2type(s[1]);};
            case 2:{return bin2type(s[2]);};
            case 3:{return bin2type(s[3]);};
            
        }
        
        return gfxWooden[0];
        
        function bin2type(b) {
            
            switch (b) {
                
                case 00:{return null;};
                case 01:{return gfxWooden[0];};
                case 10:{return gfxWooden[2];};
                case 11:{return gfxWooden[1];};
                
            }            
        }
    }
    
    function hexToBinary(s) {
        var i, k, part, ret = '';
        // lookup table for easier conversion. '0' characters are padded for '1' to '7'
        var lookupTable = {
            '0': '0000', '1': '0001', '2': '0010', '3': '0011', '4': '0100',
            '5': '0101', '6': '0110', '7': '0111', '8': '1000', '9': '1001',
            'a': '1010', 'b': '1011', 'c': '1100', 'd': '1101',
            'e': '1110', 'f': '1111',
            'A': '1010', 'B': '1011', 'C': '1100', 'D': '1101',
            'E': '1110', 'F': '1111'
        };
        for (i = 0; i < s.length; i += 1) {
            if (lookupTable.hasOwnProperty(s[i])) {
                ret += lookupTable[s[i]];
            } else {
                return { valid: false };
            }
        }
        return { valid: true, result: ret };
}
    
    
    function getStoneWall(HexCode,d,pos,P) {
        
        var AA = parseInt(HexCode.substring(0, 1),16);
        var BB = parseInt(HexCode.substring(1, 2),16);
        var CC = parseInt(HexCode.substring(2, 3),16);

        if (CC === 0) {return gfxStone;};

        ctx.drawImage(gfxStone, gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);

        switch (CC) { 
            
            case 8:{if (d === 0) {return getWallDeco();}else {return gfxStone;};break;} //North Wall has Deco
            case 9:{if (d === 1) {return getWallDeco();}else {return gfxStone;};break;} //East Wall has Deco
            case 10:{if (d === 2) {return getWallDeco();}else {return gfxStone;};break;} //South Wall has Deco
            case 11:{if (d === 3) {return getWallDeco();}else {return gfxStone;};break;} //West Wall has Deco
            default:{console.log ("Unhandled StoneWall CC: " + CC.toString());return gfxStone;};
                    
        }
        
        function getWallDeco(){
        
        try{
            if (CC >= 8) { //Wall has something on it
                if (BB % 4 === 0) { //Shelf
                    return gfxShelf;
                } else if (BB % 4 === 1) { //Sign
                    if (AA === 0 && BB === 1) { //Random Color
                        return gfxScriptBanner;
                    } else if (AA === 0 && BB === 5) { //Serpent Flag
                        ctx.drawImage(gfxScriptBanner, gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
                        return gfxSerpBanner;                       
                    } else if (AA === 0 && BB === 9) { //Dragon Flag
                         ctx.drawImage(gfxScriptBanner, gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
                        return gfxDragonBanner;  
                    } else if (AA === 0 && BB === 13) { //Moon Flag
                         ctx.drawImage(gfxScriptBanner, gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
                        return gfxMoonBanner;                     
                    } else if (AA === 1 && BB === 1) { //Choas Flag
                         ctx.drawImage(gfxScriptBanner, gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
                        return gfxChaosBanner;
                    } else if (BB % 4 === 1) {                        
                        //i = bwMergeImage(GraphicsData[1][0][x],GraphicsData[1][1][x]);                   
                    } else {
                       // i = GraphicsData[1][0][x];
                    }
                } else if (BB % 4 === 2) { //Switch
                        return gfxWallSwitch;
                } else if (BB % 4 === 3) { //Crystal Switch
                       return gfxGemSlot;
                } else {
                 return gfxStone;
                }
            } else {
                return gfxStone;
            }}catch(e){}  
         
        return gfxStone;
    }
    }
    
    function getWallDirection(d,s) {
        
        // d = player direction
        // s = screen gfx position
        
	//I should be able to use the below in an array to work out all directions
        //current plus direction = wall face i.e.
        //If a wall is currently North which is a 0 + player direction. Say Player is facing East = 1
        // 0 + 1 = 1 (North Wall becomes East)
        
       var Wall = [];
            
            Wall[0] = 0;
            Wall[1] = 1;
            Wall[2] = 2;
            Wall[3] = 3;
            Wall[4] = 2;                
            Wall[5] = 1;
            Wall[6] = 2;
            Wall[7] = 3;
            Wall[8] = 2;
            Wall[9] = 2;
            Wall[10] = 1;
            Wall[11] = 2;
            Wall[12] = 3;
            Wall[13] = 2;
            Wall[14] = 2;
            Wall[15] = 1;
            Wall[16] = 2;
            Wall[17] = 3;
            Wall[18] = 2;
            Wall[19] = 1;
            Wall[20] = 2;
            Wall[21] = 1;
            Wall[22] = 3;
            Wall[23] = 2;
            Wall[24] = 3;
            Wall[25] = 2;
            Wall[26] = 1;
            Wall[27] = 3;
            Wall[28] = 2;
		            
            Wall[s] = Wall[s] + d;
            
            if (Wall[s] > 3) {
                Wall[s] = (Wall[s] - 3) -1;
            }
            
            if (debug) {console.log (s + " = " + getDirection(Wall[s]));}
            
       return Wall[s];
        
    };
    
    function getDirection(n) {
     
        switch (n) {
            
            case 0:{return "North";};
            case 1:{return "East";};
            case 2:{return "South";};
            case 3:{return "West";};
        
        }
    };
    
    