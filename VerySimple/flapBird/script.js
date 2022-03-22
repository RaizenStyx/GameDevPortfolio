var block = document.getElementById("block");
var hole = document.getElementById("hole");
var jumping = 0;
var counter = 0;

hole.addEventListener("animationiteration", () => {
	var random = -((Math.random()*300)+150);
	hole.style.top = random + 'px';
	counter++;
});

setInterval(function(){
	var charTop = parseInt(window.getComputedStyle(chart).getPropertyValue("top"));
	if(jumping==0){
		chart.style.top = (charTop+3)+"px";
	}
	var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
	var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
	var cTop= -(500-charTop);
	if((charTop > 480) || ((blockLeft<20)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+130)))){
		alert("Game Over. Play again?");
		document.getElementById("intro").innerHTML = "Last score was: " + counter;
		chart.style.top=100 + "px";
		counter = 0;
	}
}, 10);

function jump(){
	jumping = 1;
	let jumpCount = 0;
	var jumpIntv = setInterval(function(){
		var charTop = parseInt(window.getComputedStyle(chart).getPropertyValue("top"));
		if((charTop>6)&&(jumpCount<15)){
			chart.style.top = (charTop-5)+"px";
		}
		if(jumpCount>20){
			clearInterval(jumpIntv);
			jumping=0;
			jumpCount=0;
		}
		jumpCount++;
	},10);
}