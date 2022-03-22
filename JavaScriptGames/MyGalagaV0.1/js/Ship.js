const PLAYER_MOVE_SPEED = 10;
var shipPost = 500;
var shipPostY = 875;

var shipKeyHeld_North = false;
var shipKeyHeld_South = false;
var shipKeyHeld_West = false;
var shipKeyHeld_East = false;
var shipKeyHeld_Space = false

var shipControlKeyUp;
var shipControlKeyRight;
var shipControlKeyDown;
var shipControlKeyLeft;
var shipControlKeySpace;

const SPACEBAR = 32;
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;


var mouseX;
var mouseY;


function drawShip() {
	
	drawTriangle(shipPost,shipPostY-85, shipPost-25,shipPostY-35, shipPost+25,shipPostY-35, "limegreen");//done
	
	drawTriangle(shipPost-25,shipPostY-50, shipPost-50,shipPostY, shipPost,shipPostY, "purple"); // done
	drawTriangle(shipPost+25,shipPostY-50, shipPost,shipPostY, shipPost+50,shipPostY, "purple"); //done 
	
	drawTriangle(shipPost,shipPostY-50, shipPost-25,shipPostY, shipPost+25,shipPostY, "crimson");//done
	
	if (shipPost < 50) { //left stop
		shipPost = 50;
	}
	if (shipPost > canvas.width-50) { // right stop
		shipPost = canvas.width-50;
	} 
	if (shipPostY < (canvas.height/1.25)) { //top stop
		shipPostY = (canvas.height/1.25)
	}
	if (shipPostY > canvas.height-5) { // bottom stop
		shipPostY = canvas.height-5;
	}
}



function shipSetupInput(upKey, rightKey, downKey, leftKey, spaceKey) {
		shipControlKeyUp = upKey;
		shipControlKeyRight = rightKey;
		shipControlKeyDown = downKey;
		shipControlKeyLeft = leftKey;
		shipControlKeySpace = spaceKey;
}


//reset function

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
	
	//shipPost = mouseX;
	
	// cheat to test ball in any position
	/*ballX = mouseX;
	ballY = mouseY;
	ballSpeedX = 3;
	ballSpeedY = -4; */
}

function keySet(keyEvent, setTo) {
	if(keyEvent.keyCode == shipControlKeyLeft) {
		shipKeyHeld_West = setTo;
	}
	if(keyEvent.keyCode == shipControlKeyRight) {
		shipKeyHeld_East = setTo;
	}
	if(keyEvent.keyCode == shipControlKeyUp) {
		shipKeyHeld_North = setTo;
	}
	if(keyEvent.keyCode == shipControlKeyDown) {
		shipKeyHeld_South = setTo;
	}
	if(keyEvent.keyCode == shipControlKeySpace) {
		ballMove();
		shipKeyHeld_Space == setT0;
	}
}

function keyPressed(evt) {
	console.log("Key pressed: "+evt.keyCode);
	keySet(evt, true);
	
	evt.preventDefault();
}

function keyReleased(evt) {
	console.log("Key pressed: "+evt.keyCode);
	keySet(evt, false);
}

function moveShip() {

	if(shipKeyHeld_North) {
		shipPostY -= PLAYER_MOVE_SPEED;
	}
	if(shipKeyHeld_East) {
		shipPost += PLAYER_MOVE_SPEED;
	}
	if(shipKeyHeld_South) {
		shipPostY += PLAYER_MOVE_SPEED;
	}
	if(shipKeyHeld_West) {
		shipPost -= PLAYER_MOVE_SPEED;
	}
}