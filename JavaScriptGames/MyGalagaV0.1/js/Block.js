const BRICK_W = 100;
const BRICK_H = 40;
const BRICK_GAP = 20;
const BRICK_COLS = window.innerWidth;
const BRICK_ROWS = 15;

var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var bricksLeft = 0;


function brickReset() {
	bricksLeft = 0;
	var i = 0;
	for(; i < 8*BRICK_COLS; i++){
		brickGrid[i] = false;
	}
	for(; i < BRICK_COLS * BRICK_ROWS; i++){
		brickGrid[i] = true;
		bricksLeft++;
	} // end of for each brick
} // end of brickReset function

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

function isBrickAtColRow(col, row) {
	if( col >= 0 && col < BRICK_COLS && 
		row >= 0 && row < BRICK_ROWS){
			var brickIndexUnderCoord = rowColToArrayIndex(col, row);
			return brickGrid[brickIndexUnderCoord];
	} else {
		return false;
	}
}


function rowColToArrayIndex(col, row){
	return col + BRICK_COLS * row;
}