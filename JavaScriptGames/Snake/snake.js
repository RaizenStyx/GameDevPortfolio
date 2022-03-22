window.onload = function(){
	canv = document.getElementById('snakeGame');
	ctx=canv.getContext('2d');
	document.addEventListener('keydown', keyPush);
	setInterval(game, 1000/15) // calls game function 15 times every 1 sec or 1000millsecs
}
px=py=10;  // player position start in middle. px is player at the x position
gs=tc=20; // grid size and tile count will by 20x20=400
ax=ay=15;  // apple x and apple y position. Thing snake eats
xv=yv=0; // x velocity and y velocity set to 0
trail = [];
tail = 5;
function game(){
	px+=xv;
	py+=yv;
	if (px<0){  // gonna try 2 else if's
		px+= tc-1;
	} else if (px>tc-1){
		px=0;
	} 
	if (py<0){  // second else if
		py+= tc-1;
	} else if (py>tc-1){
		py=0;
	}
	ctx.fillStyle='black';
	ctx.fillRect(0,0,canv.width,canv.height)
	
	ctx.fillStyle='lime';
	for(let i = 0; i < trail.length;i++){
		ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
		if (trail[i].x==px && trail[i].y==py){
			tail = 5
			document.getElementById("losingTail").innerHTML = "Lets get some Apples!";
			document.getElementById("tailLength").innerHTML = "Tail length at " + tail;
		}
	}
	trail.push({x:px,y:py});
	while(trail.length>tail){
		trail.shift(); 
	}
	
	if (ax==px && ay==py){
			tail++;
			ax=Math.floor(Math.random()*tc);
			ay=Math.floor(Math.random()*tc);
			document.getElementById("losingTail").innerHTML = "Got One!"
			document.getElementById("tailLength").innerHTML = "Tail length at " + tail
		}
	ctx.fillStyle = "red";
	ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2)
	
}
function keyPush(evt){
// switch on a keypush
	switch(evt.keyCode){
		case 37:
		xv=-1;yv=0;
		break;
		case 38:
		xv=0;yv=-1;
		break;
		case 39:
		xv=1;yv=0;
		break;
		case 40:
		xv=0;yv=1;
		break;
	}
}
