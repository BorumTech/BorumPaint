# paint-a-picture-backup
/*** Features ***\
 * click your color you want to be the background, then click background - Choose your background first, when you choose, it goes over everything you have already drew
 * Click on a color to use to paint
 * Use the extreme left arrows to adjust the thickness
 * Use the middle arrows to adjust the transperency
 * Erase with the Erase function (this really justs paints the background)
 * Paint a Picture!
      /*** Credits ***\
 * Larry Serflaten(*3) @LarrySeflaten
 * David Cossuu(*1) @C1d2
 * Blue Leaf(*2) @BlueLeafStudio
 * Crystal Str #PrayForZoes @CrystalStr
 * Zachary(*1) @ZHilgeman
 * Ashwin @shwin320
 * Varun (me) @LanguageNovice
 * Look at all my projects and subscribe!
https://www.khanacademy.org/profile/MarvelousMoose/projects
https://www.khanacademy.org/computer-programming/logo-and-subsription/4516929514897408
        /*** Goals ***\
Get 10 votes - Complete!
Get 15 votes - Complete!
Get 20 votes - Complete!
Get 25 votes - Complete!
Get 45 votes - 
Be number 1-10 on the Hot List - 
*/
// User Interaction: Making buttons light up by changing color
var un; // thickness-down
var un2; // thickness-up
var topBox; // Background box
var lightUpL; // opacity-down box
var lightUpR; // opacity-up box
// No work needed after you adjust these
var thicknessDown = 5; // left thicknessX
var thicknessUp = thicknessDown + 35;
var opacityDown = 105; // x-position of the opacity-down arrow
var yPos = 372; // y-position of opacityArrows
var opacityUp = opacityDown + 35; // x-position of the opacity-up arrow
var opacityA = 255; // How opaque, or how non-see through it is
var Esize = 20; // Thickness of brush
var spaceBetween = 35; // amount of pixels between each color box
var boxWidths = 30; // width of each color box
var currentColor;
var bgOpacity;
var backgroundColor = color(0, 0, 0);
var colors = [color(255, 0, 0), color(255, 127, 0), color(255, 255, 0), color(0, 255, 0), color(0, 0, 255), color(127, 0, 255), color(255, 0, 255), color(255, 255, 255), color(75, 75, 75), color(0, 0, 0)]; // all colors you see at the top
var textOverPaint = function() {
    textAlign(CENTER, CENTER);
    fill(255, 255, 255);
    textSize(20);
    text("Color:", 50, 330);
    pushStyle();
    textFont(createFont(" Bold"), 16);
    text("WARNING! Do NOT move\n your cursor out of the canvas\nwhen your mouse is pressed!\n If you do, click a few times", 284, 354);
    popStyle();
    textSize(12);
    text("Thickness:", 30, 354);
    text("Background", 120, 350);
};
var paintBrush = {
    x: 450,
    y: 450
};
var C;
var drawBrush = function() {
    fill(currentColor);
    noStroke();
    ellipse(paintBrush.x, paintBrush.y, Esize, Esize);
};
var drawColors = function(x, colour) {
    fill(colour);
    stroke(196, 187, 65);
    rect(x, 5, boxWidths, 40);
};
var isPainting = false; // boolean for when the mouse is in the canvas
background(backgroundColor);
var draw = function() {
    currentColor = color(C, opacityA);
    fill(0, 0, 0);
    rect(0, 0, 400, 55);
    rect(0, 315, 400, 85);
    if (mouseIsPressed && mouseY > 60 && mouseY < 300) {
        isPainting = true;
    }
    else {
        isPainting = false;
    }
    if(isPainting) {
        drawBrush();
        paintBrush.x = mouseX;
        paintBrush.y = mouseY;
    }
    for (var i = 0; i < colors.length; i++) {
        drawColors(i * spaceBetween + 5, colors[i]);
    }
    drawColors(358, color(255, 200, 255));
    fill(currentColor);
    noStroke();
    rect(80, 320, Esize, Esize); // Info Box
    fill(255, 0, 0);
    text(Esize, 70, 355);
    text(opacityA, 140, 365);
    textSize(7);
    fill(0);
    text("ERASER", 371, 25);
    strokeWeight(2);
    stroke(0, 0, 0);
    line(0, 55, 400, 55);
    line(0, 315, 400, 315);
    noStroke();
    fill(topBox);
    rect(85, 340, 70, 20); // Background Box
    Esize = (Esize > 1) ? Esize - 1 : 1; // Logical Operator brush size over 1
    Esize = (Esize < 35) ? Esize + 1 : 35; // Logical Operator brush size under 35
    opacityA = (opacityA > 1) ? opacityA - 1 : 1; // Logical Operator opacity over 1
    opacityA = (opacityA < 255) ? opacityA + 1 : 255; // Logic: keeps opacity under 255
    textOverPaint();
    fill(un);
    stroke(255, 0, 255);
    rect(thicknessUp - 5, 365, 25, 35);
    triangle(thicknessUp, 395, thicknessUp, 370, thicknessUp + 15, 380);
    fill(un2);
    rect(thicknessDown - 5, 365, 25, 35);
    triangle(thicknessDown, 380, thicknessDown + 15, 370, thicknessDown + 15, 395);
    fill(lightUpL);
    stroke(84, 73, 84);
    rect(opacityUp - 5, yPos, 25, 35);
    triangle(opacityUp, yPos + 30, opacityUp, yPos + 5, opacityUp + 15, yPos + 15);
    fill(lightUpR);
    rect(opacityDown - 5, yPos, 25, 35);
    triangle(opacityDown, yPos + 15, opacityDown + 15, yPos + 5, opacityDown + 15, yPos + 30);
    fill(0, 217, 255);
    text("Opacity:", 105, 365);
    if (mouseIsPressed && mouseY > yPos && mouseY < yPos + 35) {
        if (mouseX > opacityDown - 5 && mouseX < opacityDown + 25) {
            opacityA--;
        } else if (mouseX > 135 && mouseX < 155) {
            opacityA++;
        }
    }
};
var mouseClicked = function() {
    for (var i = 0; i < colors.length; i++) {
        if (mouseY > 5 && mouseY < 45 && mouseX > i * spaceBetween + 5 && mouseX < i * spaceBetween + boxWidths) {
            C = colors[i];
            paintBrush.x = mouseX;
            paintBrush.y = mouseY;
        } // if any of the colors are pressed
        if (mouseX > 85 && mouseX < 155 && mouseY > 340 && mouseY < 360) {
            backgroundColor = color(C, opacityA);
            background(backgroundColor);
        } // Background is clicked
    }
    if (mouseY > 365 && mouseY < 400) { // Change thickness
        if (mouseX < 25) {
            Esize -= 1; // makes thickness go down
            paintBrush.x = 500;
        }
        if (mouseX > 35 && mouseX < 60) {
            Esize += 1; // makes thickness go up
            paintBrush.x = 500;
        }
    }
    if (mouseX > 358 && mouseX < 358 + boxWidths && mouseY > 5 && mouseY < 40) { // Eraser selected
        C = backgroundColor;
    }
};
var mouseMoved = function() {
    if (mouseY > 365 && mouseY < 400) {
        if (mouseX < 25) {
            un2 = color(130, 116, 116);
        } else {
            un2 = color(255, 255, 255);
        }
        if (mouseX > 35 && mouseX < 60) {
            un = color(130, 116, 116);
        } else {
            un = color(255, 255, 255);
        }
    } else {
        un = color(255, 255, 255);
        un2 = color(255, 255, 255);
    }
    if (mouseX > 85 && mouseX < 155 && mouseY > 340 && mouseY < 360) {
        topBox = color(205, 195, 205, 150);
    } else {
        topBox = color(75, 75, 75);
    } // Background is clicked
    if (mouseY > yPos && mouseY < yPos + 35) {
        if (mouseX > opacityDown - 5 && mouseX < opacityDown + 25) {
            lightUpR = color(155, 145, 155);
        } else if (mouseX > 135 && mouseX < 155) {
            lightUpL = color(155, 145, 155);
        } else {
            lightUpL = lightUpR = color(255, 255, 255);
        }
    } else {
        lightUpL = lightUpR = color(255, 255, 255);
    }
};
var mouseOut = function() {
    isPainting = false;
};
