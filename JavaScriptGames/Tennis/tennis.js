// canvas vars
var canvas;
var canvasContext;
// ball X and Y pos and speed
var ballX = 50;
var ballSpeedX = 10;
var ballY = 10;
var ballSpeedY = 4;
//player scores and game end
var player1Score = 0;
var player2Score= 0;
const WINNER_SCORE = 3;
var showingWinScreen = false;
// player paddle
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function handleMouseClick(evt){
	if(showingWinScreen) {
		player1Score = 0;
		player2Score = 0;
		document.getElementById("playDiv").innerHTML = "Beat the Computer!"
		showingWinScreen = false;
	}
}

window.onload = window.onresize = function() {
	canvas = document.getElementById('gameCanvas');
	canvas.width = window.innerWidth * 0.8;
	canvas.height = window.innerHeight * 0.8;
	canvasContext = canvas.getContext('2d');
	document.getElementById("playDiv").innerHTML = "Beat the Computer!"
	
	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);	
	
	canvas.addEventListener('mousedown', handleMouseClick);
	
	canvas.addEventListener('mousemove', function(evt){
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
		});
}


function ballReset() {
	if(player1Score>= WINNER_SCORE || player2Score>=WINNER_SCORE){
		showingWinScreen = true;
	}

	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
	
}

function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2)
	if(paddle2YCenter < ballY - 35) {
		paddle2Y += 6;
	} else if (paddle2YCenter > ballY+35){
		paddle2Y -= 6;
	}

}


// function that moves the ball
function moveEverything() {
		if(showingWinScreen){
			return;
		}

		computerMovement();
		
		ballX += ballSpeedX;
		ballY += ballSpeedY;
		
		if (ballX < 0){
			if( ballY > paddle1Y && 
				ballY < paddle1Y+PADDLE_HEIGHT){
					ballSpeedX = -ballSpeedX;
					var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
					ballSpeedY = deltaY*0.35;
				} else {
					player2Score++;  // must be before ballreset
					ballReset();
				}
		}
		if (ballX > canvas.width){
			if( ballY > paddle2Y && 
				ballY < paddle2Y+PADDLE_HEIGHT){
					ballSpeedX = -ballSpeedX;
					var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
					ballSpeedY = deltaY*0.35;
				} else {
					player1Score++;  // must be before ballreset
					ballReset();
					
				}
		}
		if(ballY < 0){
			ballSpeedY = -ballSpeedY;
		}
		if (ballY > canvas.height) {
			ballSpeedY = -ballSpeedY;
		}
}
// draws net
function drawNet() {
	for(let i = 0; i<canvas.height; i+= 40){
		colorRect(canvas.width/2-1,i,2,20, 'white');
	}
}

// function that draws canvas, both paddles, and ball
function drawEverything() {
	// For blank canvas for game
	colorRect(0,0,canvas.width,canvas.height, 'black');
	// show win screen
	if(showingWinScreen){
		canvasContext.fillStyle = 'white';
			if (player1Score>= WINNER_SCORE) {
				canvasContext.fillText('Player Won!', canvas.width/2, 200);
				document.getElementById("welcomeDiv").innerHTML = "Player won that Round!"
			}
			else if (player2Score>=WINNER_SCORE) {
				canvasContext.fillText('Computer Won!', canvas.width/2, 200);
				document.getElementById("welcomeDiv").innerHTML = "Computer won that Round!"
			}
			canvasContext.fillText('Click to play again', canvas.width/2, 500);
			document.getElementById("playDiv").innerHTML = "Click game to play again"
			return;
		}
	drawNet();
	// This is left player paddle
	colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'white');
	//this is the right computer paddle
	colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white' )
	// this is the ball
	colorCircle(ballX, ballY, 10, 'white')
	
	canvasContext.fillText(player1Score, 100, 100);
	canvasContext.fillText(player2Score, canvas.width-100, 100);

}

// Function to make a circle
function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}
// function to make a rectangle
function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);

}

