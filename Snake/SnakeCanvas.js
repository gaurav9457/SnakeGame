let width = 25;
let board;
let context;
let sX = 0;
let sY = 0;
let speedX = 0; 
let speedY = 0; 
let snakeBody = [];
let foodX;
let foodY;
let score=0;

let gameOver = false;

window.onload = function () {
	
	board = document.getElementById("myCanvas");
	board.height = 500;
	board.width = 500;
	context = board.getContext("2d");
	createFood();
	document.addEventListener("keyup", changeDir); 
	
	setInterval(start, 200);
}

function start() {
	if (!gameOver) { 
        
		isCollide()
    }
		
	
	context.fillStyle = "white";
	context.fillRect(0, 0, board.width, board.height);

	
	context.fillStyle = "green";
	context.fillRect(foodX, foodY, width, width);
    let scoreBoard = document.getElementById('scoreBoard');
     
    if (sX == foodX && sY == foodY) {
		snakeBody.push([foodX, foodY]);
		createFood();
		score++;
	}
	scoreBoard.innerHTML=`Score : `+score;
	
	for (let i = snakeBody.length - 1; i > 0; i--) {

		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) {
		snakeBody[0] = [sX, sY];
	}


	
	context.fillStyle = "#c33764";
	sX += speedX * 25; 
	sY += speedY * 25; 
	context.fillRect(sX, sY, width, width);
	for (let i = 0; i < snakeBody.length; i++) {
		if(i==0){
			context.fillStyle = "black";

		}

		context.fillRect(snakeBody[i][0], snakeBody[i][1], width, width);
	}



}


// --------------------------- change direction---------------------------
function changeDir(e) {
	if (e.code == "ArrowUp" && speedY != 1) { 
		
		speedX = 0;
		speedY = -1;
	}
	else if (e.code == "ArrowDown" && speedY != -1) {
		
		speedX = 0;
		speedY = 1;
	}
	else if (e.code == "ArrowLeft" && speedX != 1) {
		
		speedX = -1;
		speedY = 0;
	}
	else if (e.code == "ArrowRight" && speedX != -1) { 
		
		speedX = 1;
		speedY = 0;
	}
}

// ---------------------------Create food------------------------------
function createFood() {

	foodX = Math.floor(Math.random() * 19+1) * width; 
	
	foodY = Math.floor(Math.random() * 19+1) * width; 
}


//--------------------------------Game over modal--------------------------------

function showPopup(){
	let parent=document.getElementById("popupParent");
	parent.style.background='linear-gradient(transparent)'
	parent.style.backdropFilter='blur(3px)';
	
	let popup = document.getElementById("popup");
	popup.style.display="block";
	popup.style.backdropFilter='blur(5px)';
	
	let scoreBoard=document.getElementById("score");
	scoreBoard.innerHTML=`Your Score : `+score;

	let close=document.getElementById('close');

	close.onclick=function () {
		popup.style.display="none";
		window.location.reload();
	}


}

//-------------------------------Check collision-----------------------------
function isCollide(){
	if (sX < 0 || sX >= 500 || sY < 0 || sY >= 500) {
        gameOver = true;
       // alert ("game Over")
	   showPopup();
	//	window.location.reload();
		// return false;
    }
	for (let i = 1; i < snakeBody.length; i++) {
		    if (sX === snakeBody[i][0] && sY === snakeBody[i][1]) {
		        gameOver = true;
		        //alert("Game Over");
				showPopup();
				//window.location.reload();
		    }
		}
}

