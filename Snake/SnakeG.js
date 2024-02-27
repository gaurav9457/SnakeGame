let inputDir = { x: 0, y: 0 };
// let speed = 5;
// let lastPaintTime = 0;
let snakeArr = [
    { x: 1, y: 1 }
]

let food = { x: 6, y: 7 }
let score = 0

//Functions 
function main(ctime) {
    // window.(main);
    // if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    //     return;

    // }
    // lastPaintTime = ctime;
    // console.log(ctime);
    startGame();

}
function startGame() {
    //part 1 update the snake 

    if (isCollide(snakeArr)) {
       // alert('Game over')
       displayModal();
        inputDir = { x: 0, y: 0 }
        snakeArr = [{ x: 1, y: 1 }]
        score = 0;
    }

    // if eat the food generate new food
    let scoreBoard = document.getElementById('score')
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        score++

    }
    scoreBoard.innerHTML = `Score: ` + score;

   
    
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


   
   // let board = document.getElementById('board');
   board.innerHTML = ''
    
    snakeArr.forEach((e, index) => {

        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index == 0) {
            //snakeElement.classList.add('head');
            snakeElement.id='headElement';
            snakeElement.style.borderRadius = getHeadDirection(inputDir);
			// snakeElement.class='head';
        }
        else {
            //snakeElement.classList.add('snake');
            snakeElement.id='snake'
        }


        board.appendChild(snakeElement);

    })

    //Display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
	

}

function getHeadDirection(inputDir) {
    if (inputDir.x === 0 && inputDir.y === -1) {
        return '50px 50px 0px 0px';
    } else if (inputDir.x === 0 && inputDir.y === 1) {
        return '0px 0px 50px 50px';
    } else if (inputDir.x === -1 && inputDir.y === 0) {
        return '50px 0px 0px 50px';
    } else if (inputDir.x === 1 && inputDir.y === 0) {
        return '0px 50px 50px 0px';
    }
}

function displayModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }


function isCollide(snake) {
    // crash with snake body
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }

    //  crash with wall parent div
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true
    }
}


///Main logic

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }  //start game

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;

            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

    }

})

const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

upBtn.addEventListener('click',()=>{inputDir.x=0,inputDir.y=-1});
downBtn.addEventListener('click',()=>{inputDir.x=0,inputDir.y=1});
leftBtn.addEventListener('click',()=>{inputDir.x=-1,inputDir.y=0});
rightBtn.addEventListener('click',()=>{inputDir.x=1,inputDir.y=0});

setInterval(main, 200);
