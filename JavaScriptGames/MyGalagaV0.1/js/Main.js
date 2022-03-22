var canvas, canvasContext;


window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
	
	canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	shipSetupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, SPACEBAR);
	
	brickReset();
	ballReset();
}

function updateAll(){
	moveAll();
	drawAll();
}


function moveAll() {
	moveShip();
	
	ballBrickHandling();
}

function drawAll(){	
	colorRect(0,0, canvas.width,canvas.height, "black");
	
	colorCircle(ballX,ballY, 7.5, 'white');
				
	drawBricks();
	
	drawShip();
}
	