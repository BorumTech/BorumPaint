/*** Features ***\
 * Click your desired color (its outline changes color when you hover your mouse over it) that you want to be the background, then  * Click background - Choose your background first, when you choose, it goes over everything you have already drew
 * Click on a color to use to paint
 * Many unique colors beyond the basics (All colors are standard HTML rgb Codes)
 * Use the extreme left arrows to adjust the thickness
 * Use the middle arrows to adjust the transperency
 * Erase with the Eraser (this really justs paints the background)
 * Shape functionality! You can now draw in ellipse, rectangle, and line
 * Press 1 to set the beginning of the line. Press 3 to set the end of the line
 Paint a Picture!
      
      /*** Credits ***\
 * Larry Serflaten(*4) @LarrySeflaten
 * David Cossuu(*1) @C1d2
 * Blue Leaf(*2) @BlueLeafStudio
 * Crystal Str #PrayForZoes @CrystalStr
 * Zachary(*1) @ZHilgeman
 * Ashwin (*2)@shwin320 for the shape functionality and for helping me with the eraser functionality
 * Varun (me) @LanguageNovice
 * Look at all my projects and subscribe!
https://www.khanacademy.org/profile/MarvelousMoose/projects
https://www.khanacademy.org/computer-programming/logo-and-subsription/4516929514897408
        /*** Goals ***\
Get 10 votes - Complete!
Get 15 votes - Complete!
Get 20 votes - Complete!
Get 25 votes - Complete!
Get 45 votes - Complete!
Be number 1-10 on the Hot List - 

Here is where I host it on github: https://github.com/KnowledgeableKangaroo/paint-a-picture-backup
*/
// User Interaction: Making buttons light up by changing color
var un; // thickness-down
var un2; // thickness-up
var topBox = color(51, 51, 48); // Background box
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
var spaceBetween = 32; // amount of pixels between each color box
var boxWidths = 25; // width of each color box
var currentColor;
var bgOpacity;
var C;
var backgroundColor = color(0, 0, 0);
var paintBrush = {
	x: 450,
	y: 450
};
var pastPaintBrush = {
	x: 200,
	y: 200
};
var pshape = 0; // Which shape is picked(0=ellipse,1=rect,2=line)
var shapes = [{
		name: "Ellipse",
		brush: function() {
			ellipse(paintBrush.x, paintBrush.y, Esize, Esize);
		}
	},
	{
        name: "Quadrangle",
        brush: function() {
            rectMode(CENTER);
		    rect(paintBrush.x, paintBrush.y, Esize, Esize);
        }
	},
	{
	    name: "Line",
	    brush: function() {
	        stroke(currentColor);
	        strokeWeight(Esize);
	        line(pastPaintBrush.x, pastPaintBrush.y, paintBrush.x, paintBrush.y);
	    }
	}
];

var drawBrush = function() {
	fill(currentColor);
	noStroke();
	shapes.forEach(function (element, index) {
	    if (pshape === index) {
	        element.brush();
	    }
	});
};
var colors = [
	color(255, 0, 0), // Red
	color(255, 165, 0), // Orange
	color(255, 255, 0), // Yellow
	color(0, 255, 0), // Lime
	color(0, 128, 0), // Green
	color(0, 0, 255), // Blue
	color(128, 0, 128), // Purple
	color(255, 0, 255), // Magenta
	color(238, 130, 238), // Violet
	color(255, 192, 203), // Pink
	color(0, 0, 0), // Black
	color(255, 255, 255), // White
	color(128, 128, 128), // Grey/Gray
	color(192, 192, 192), // Silver
	color(178, 34, 34),
	color(64, 224, 208), // Turquoise
	color(240, 230, 140), // Khaki 
	color(158, 91, 64),
	color(355, 77, 52) // Old Brick Red
]; // all colors you see at the top
var drawEraser = function() {
	if (!drawEraser.init) {
		drawEraser.eraser = {
			x: 5,
			y: 60,
			w: boxWidths + 25,
			h: 40
		};
		drawEraser.init = true;
	}
	var eraser = drawEraser.eraser;
	fill(255, 200, 255);
	rect(eraser.x, eraser.y, eraser.w, eraser.h);
};

var Button = function(config) {
	this.x = config.x || 0;
	this.y = config.y || 0;
	this.width = config.width || 150;
	this.height = config.height || 50;
	this.label = config.label || "Click";
	this.onClick = config.onClick || function() {};
	this.defaultColor = color(242, 228, 228);
	this.newColor = color(227, 118, 227);
	this.Color = this.defaultColor;
};

Button.prototype.draw = function() {
	fill(this.Color);
	rect(this.x, this.y, this.width, this.height, 5);
	fill(0, 0, 0);
	textSize(16);
	textAlign(CENTER, CENTER);
	text(this.label, this.x, this.y, this.width, this.height);
};
Button.prototype.isMouseInside = function() {
	return mouseX > this.x &&
		mouseX < (this.x + this.width) &&
		mouseY > this.y &&
		mouseY < (this.y + this.height);
};
Button.prototype.handleMouseClick = function() {
	if (this.isMouseInside()) {
		this.onClick();
	}
};
Button.prototype.handleMouseHover = function() {
	if (this.isMouseInside()) {
		this.Color = this.newColor;
	} else {
		this.Color = this.defaultColor;
	}
};

var changeShape = new Button({
	x: width * 0.75,
	y: 334,
	width: 70,
	height: 47,
	label: "Change Shape",
	onClick: function() {
		if (pshape === 2) {
			pshape = 0;
		} else {
			pshape++;
		}

	},
});
var checkColorMouseHover = function(i) {
	return mouseX > i * spaceBetween + 5 &&
		mouseX < i * spaceBetween + boxWidths &&
		mouseY > 5 &&
		mouseY < 45;
};
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
	fill(0, 0, 0);
	text("ERASER", 29, 77);
};
var drawColors = function(x, colour, strokeColor) {
	stroke(strokeColor);
	fill(colour);
	rectMode(CORNER);
	strokeWeight(1.5);
	rect(x, 5, boxWidths, 40);
};
var isPainting = false; // true when the mouse is in the canvas
background(backgroundColor);
var draw = function() {
	var topY = 55;
	var bottomY = 310;
	// Sets default styles
	textAlign(CENTER, CENTER);
	strokeWeight(1);
	stroke(0, 0, 0);
	rectMode(CORNER);
	currentColor = color(C, opacityA);


	fill(0, 0, 0); // Black Box in Background for control center to not smear
	rect(0, 315, 600, 85);
	drawEraser();
	noStroke();
	fill(0, 0, 0);
	rect(0, 0, width, 50);
	if (mouseIsPressed && mouseY > topY && mouseY < bottomY) {
		isPainting = true;
	} else {
		isPainting = false;
	}
	if (isPainting) {
		drawBrush();
		paintBrush.x = mouseX;
		paintBrush.y = mouseY;
		pastPaintBrush.x = pmouseX;
		pastPaintBrush.y = pmouseY;
	}
	for (var i = 0; i < colors.length; i++) {
	    var strokeColor;
	    if(checkColorMouseHover(i)) {
		    strokeColor = color(255, 0, 0);
	    }
	    else {
	        strokeColor = color(107, 96, 1);
	    }
	    drawColors(i * spaceBetween + 5, colors[i], strokeColor);
	}
	fill(currentColor);
	noStroke();
	rect(80, 320, Esize, Esize); // Info Square
	textSize(13);
	textFont(createFont("carbon block"));
	fill(212, 176, 212);
	text(Esize, 70, 355); // Thickness
	text(opacityA, 140, 365); // Opacity
	shapes.forEach(function(element, index) {
	    if (pshape === index) {
	       text(element.name, 482, 322); 
	    }
	});
	textSize(7);
	fill(0);
	fill(topBox);
	rect(85, 340, 70, 20); // Background Box
	Esize = (Esize > 1) ? Esize - 1 : 1; // Keeps brush size over 1
	Esize = (Esize < 35) ? Esize + 1 : 35; // Keeps brush size under 35
	opacityA = (opacityA > 1) ? opacityA - 1 : 1; // Keeps opacity over 1
	opacityA = (opacityA < 255) ? opacityA + 1 : 255; // Keeps opacity under 255
	textOverPaint();
	fill(un); // Increase Thickness Button
	stroke(255, 0, 255);
	rect(thicknessUp - 5, 365, 25, 35);
	triangle(thicknessUp, 395, thicknessUp, 370, thicknessUp + 15, 380);
	fill(un2); // Decrease Thickness Button
	rect(thicknessDown - 5, 365, 25, 35);
	triangle(thicknessDown, 380, thicknessDown + 15, 370, thicknessDown + 15, 395);
	fill(lightUpL);
	stroke(84, 73, 84); // Decrease Opacity Button
	rect(opacityUp - 5, yPos, 25, 35);
	triangle(opacityUp, yPos + 30, opacityUp, yPos + 5, opacityUp + 15, yPos + 15);
	fill(lightUpR); // Increase Opacity Button
	rect(opacityDown - 5, yPos, 25, 35);
	triangle(opacityDown, yPos + 15, opacityDown + 15, yPos + 5, opacityDown + 15, yPos + 30);
	fill(0, 217, 255);
	text("Opacity:", 105, 365);
	strokeWeight(2);
	stroke(255, 255, 255);
	line(0, topY, width, topY); // Top Line that seperates picture from colors
	line(0, bottomY, width, bottomY); // Bottom line that seperates picture from control center
	changeShape.draw();
	changeShape.handleMouseHover();
	if (mouseIsPressed && mouseY > yPos && mouseY < yPos + 35) { // Opacity Buttons Light Up
		if (mouseX > opacityDown - 5 && mouseX < opacityDown + 25) {
			opacityA--;
		} else if (mouseX > 135 && mouseX < 155) {
			opacityA++;
		}
	}
	if (C === backgroundColor) {
		noStroke();
		fill(255, 200, 255);
		rect(80, 320, 73, 20);
		fill(0, 0, 0);
		textAlign(LEFT, TOP);
		text("ERASER", 80, 320);
	}
};
var mouseClicked = function() {
	for (var i = 0; i < colors.length; i++) {
		if (checkColorMouseHover(i)) {
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
	if (mouseX > drawEraser.eraser.x && mouseX < drawEraser.eraser.x + drawEraser.eraser.w && mouseY > drawEraser.eraser.y && mouseY < drawEraser.eraser.y + drawEraser.eraser.h) { // If Eraser selected
		C = backgroundColor;
	}
	changeShape.handleMouseClick();
};

var mouseX1 = 0;
var mouseY1 = 0;
var mouseX2 = 0;
var mouseY2 = 0;
var keyPressed = function() {
	switch (key.toString()) {
		case "1":
			mouseX1 = mouseX;
			mouseY1 = mouseY;
			break;
		case "2":
			break;
		case "3":
			mouseX1 = mouseX2;
			mouseY1 = mouseY2;
			stroke(currentColor);
			strokeWeight(Esize);
			if (pshape === 2) {
				line(mouseX1, mouseY1, mouseX, mouseY);
			}
			if (pshape === 1) {
				rectMode(CORNER);
				noStroke();
				fill(currentColor);
				rect(mouseX1, mouseY1, mouseX - mouseX1, mouseY - mouseY1);
			}
	}
	mouseX2 = mouseX;
	mouseY2 = mouseY;
};
