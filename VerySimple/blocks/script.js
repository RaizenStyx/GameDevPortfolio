var character = document.getElementById("character");
var block = document.getElementById("block");

window.addEventListener('keydown', function(e) {
    if (e.keyCode == 32) {
        // add your code here.
        console.log('Space pressed');
    }
});

function jump() {
	if(character.classList!="animate"){
		character.classList.add("animate");
	}
	setTimeout(function(){
		character.classList.remove("animate");
	}, 500);
}


var checkDead = setInterval(function(){
	var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
	var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
	if(blockLeft < 20 && blockLeft > 0 && characterTop >= 130){
		block.classList.remove("animatebox")	
		var input = confirm("You lose. Press OK to play again")
		if (input == true){
			block.classList.add("animatebox")
		} else if (input == false){
			block.style.display="none";
			alert("Goodbye. Thanks for playing!")
		}
	};
}, 10);
