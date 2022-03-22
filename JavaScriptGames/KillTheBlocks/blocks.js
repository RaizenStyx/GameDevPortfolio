var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;
var brickGain = 0;

const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;

var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var bricksLeft = 0;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;


var canvas, canvasContext;

var mouseX;
var mouseY;

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
	
	paddleX = mouseX - PADDLE_WIDTH/2;
	
	// cheat to test ball in any position
	/*ballX = mouseX;
	ballY = mouseY;
	ballSpeedX = 3;
	ballSpeedY = -4; */
}

function brickReset() {
	bricksLeft = 0;
	var i = 0;
	for(; i < 3*BRICK_COLS; i++){
		brickGrid[i] = false;
	}
	for(; i < BRICK_COLS * BRICK_ROWS; i++){
		brickGrid[i] = true;
		bricksLeft++;
		brickGain = 0;
	} // end of for each brick
} // end of brickReset function

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
	
	canvas.addEventListener('mousemove', updateMousePos);
	
	brickReset();
	ballReset();
}

function updateAll(){

	moveAll();
	drawAll();
}

function ballReset() {
	ballX = canvas.width/2;
	ballY = canvas.height/2;
	ballSpeedX = 5;
	ballSpeedY = 7;
}

function ballMove(){
	ballX += ballSpeedX;
	ballY += ballSpeedY;
	
	if (ballX < 0 && ballSpeedX < 0.0) { //left
		ballSpeedX *= -1;
	}
	if (ballX > canvas.width && ballSpeedX > 0.0) { // right
		ballSpeedX *= -1;
	} 
	
	if (ballY < 0 && ballSpeedY < 0.0) {
		ballSpeedY *= -1; // top
	}
	if (ballY > canvas.height) { // bottom
		ballReset();
		brickReset();
		document.getElementById("display").innerHTML = "You got some of them. Try again?";
	}
}

function isBrickAtColRow(col, row) {
	if( col >= 0 && col < BRICK_COLS && 
		row >= 0 && row < BRICK_ROWS){
			var brickIndexUnderCoord = rowColToArrayIndex(col, row);
			return brickGrid[brickIndexUnderCoord];
	} else {
		return false;
	}
}

function ballBrickHandling() {
	var ballBrickCol = Math.floor(ballX/BRICK_W);
	var ballBrickRow = Math.floor(ballY/BRICK_H);
	var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
				
	if( ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && 
		ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS){
		
		if (isBrickAtColRow(ballBrickCol, ballBrickRow)) {
			brickGrid[brickIndexUnderBall] = false;
			bricksLeft--;
			
			var prevBallX = ballX - ballSpeedX;
			var prevBallY = ballY - ballSpeedY;
			var prevBrickCol = Math.floor(prevBallX/BRICK_W);
			var prevBrickRow = Math.floor(prevBallY/BRICK_H);
			
			var bothTestFailed = true;
			
			if (prevBrickCol != ballBrickCol) {
				
				if (isBrickAtColRow(prevBrickCol, prevBrickRow) == false){
					brickGain++;
					ballSpeedX *= -1;
					bothTestFailed = false;
					document.getElementById("display").innerHTML ="You got "+ brickGain+" bricks"
				}
			}
			if (prevBrickRow != ballBrickRow){

				if (isBrickAtColRow(ballBrickCol,prevBrickRow) == false) {
					brickGain++;
					ballSpeedY *= -1;
					bothTestFailed = false;
					document.getElementById("display").innerHTML ="You got "+ brickGain+" bricks"
				}
			}
			
			if (bothTestFailed) {  // armpit case prevents ball from going through
				ballSpeedX *= -1;
				ballSpeedY *= -1;
			}
		} // end of brick found
	} // end of vaild col and row
} // end of ballBrickHandling function

function ballPaddleHandling() {
	var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
	var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
	var paddleLeftEdgeX = paddleX;
	var paddleRightEdgeX = paddleX + PADDLE_WIDTH;
	if( ballY > paddleTopEdgeY && // below top of paddle
		ballY < paddleBottomEdgeY && // above bottom of paddle
		ballX > paddleLeftEdgeX &&  // right of the left side of paddle
		ballX < paddleRightEdgeX) { // left of right side of paddle
		
		ballSpeedY *= -1;
			
		var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
		var ballDistFromPaddleCenter = ballX - centerOfPaddleX;
		ballSpeedX = ballDistFromPaddleCenter * 0.35; //speed of defliction
			
		if (bricksLeft == 0) {
			brickReset();
		} // out of bricks
	} // ball center inside of paddle
} // end of ballPaddleHandling function

function moveAll() {
	ballMove();
	
	ballBrickHandling();
	
	ballPaddleHandling();
}

function rowColToArrayIndex(col, row){
	return col + BRICK_COLS * row;
}

function drawBricks() {
	for (var eachRow = 0; eachRow<BRICK_ROWS; eachRow++){
		for(let eachCol = 0; eachCol<BRICK_COLS; eachCol++){
		
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			
			if(brickGrid[arrayIndex]){
				colorRect(BRICK_W*eachCol,BRICK_H*eachRow, 
				BRICK_W-BRICK_GAP,BRICK_H-BRICK_GAP, 'blue');
			} // end of is this brick here
		} // end of for each brick
	}
} // end of draw bricks

function drawAll(){
	
	colorRect(0,0, canvas.width,canvas.height, "black");
	
	
	colorCircle(ballX,ballY, 10, 'white');
	
	colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, 
				PADDLE_WIDTH, PADDLE_THICKNESS, "white");
				
	drawBricks();
}
	
function colorRect (topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
	canvasContext.fillStyle= fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight,);
}
	
function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX,textY);
}


