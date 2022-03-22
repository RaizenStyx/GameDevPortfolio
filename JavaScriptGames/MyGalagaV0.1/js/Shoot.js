var ballX = 75;
var ballY = 75;
var ballSpeedX = 0.1;
var ballSpeedY = -7;

function ballReset() {
	ballSpeedX = 0.1;
	ballSpeedY = -7;
	
	ballX = shipPost;
	ballY = shipPostY-80;
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
		
		if (ballY < 0 && ballSpeedY < 0.0) { //top
			ballReset();
		}
		if (ballY > canvas.height) { // bottom
			ballSpeedY *=-1;
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
			
			ballReset();
		} // end of brick found
	} // end of vaild col and row
} // end of ballBrickHandling function