function drawTriangle(firstPointHorz,firstPointVert, secPointHorz,secPointVert, thirdPointHorz,thirdPointVert, fillColor) {
	canvasContext.beginPath();
	canvasContext.fillStyle = fillColor;
    canvasContext.moveTo(firstPointHorz, firstPointVert); 
    canvasContext.lineTo(secPointHorz, secPointVert); 
    canvasContext.lineTo(thirdPointHorz, thirdPointVert); 
    canvasContext.closePath(); 
	canvasContext.fill();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}