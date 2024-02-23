document.addEventListener('DOMContentLoaded', () => {
    const snakeBody = [{ x: 0, y: 0 }];
    const snake = document.getElementById('snake');
    const food = document.getElementById('food');
    const upBtn = document.getElementById('up');
    const downBtn = document.getElementById('down');
    const leftBtn = document.getElementById('left');
    const rightBtn = document.getElementById('right');
  
    let dx = 0;
    let dy = 0;
    let foodX;
    let foodY;
  
    function moveSnake() {
      const head = { x: snakeBody[0].x + dx, y: snakeBody[0].y + dy };
      snakeBody.unshift(head);
      // snake.style.visibility = "hidden";
      if (head.x === foodX && head.y === foodY) {
        // snake.style.visibility="hidden"
        generateFood();
      } else {
        // snake.style.visibility="hidden"
        // document.removeChild(snake)
        snakeBody.pop();
      }
     
      updateSnake();
      checkCollision();
    }
  
    function updateSnake() {
      snake.innerHTML = '';
      snakeBody.forEach(segment => {
        const snakeSegment = document.createElement('div');
        snakeSegment.style.width = '20px';
        snakeSegment.style.height = '20px';
        snakeSegment.style.backgroundColor = 'green';
        snakeSegment.style.position = 'absolute';
        snakeSegment.style.left = segment.x + 'px';
        snakeSegment.style.top = segment.y + 'px';
        snake.appendChild(snakeSegment);
      });
    }
  
    function generateFood() {
      foodX = Math.floor(Math.random() * 20) * 20;
      foodY = Math.floor(Math.random() * 20) * 20;
      food.style.left = foodX + 'px';
      food.style.top = foodY + 'px';
    }
  
    function checkCollision() {
      const headX = snakeBody[0].x;
      const headY = snakeBody[0].y;
      if (headX < 0 || headY < 0 || headX >= 400 || headY >= 400) {
        gameOver();
        return
      }
      snakeBody.slice(1).forEach(segment => {
        if (headX === segment.x && headY === segment.y) {
          gameOver();
          return
        }
      });
    }
  
    function gameOver() {
      alert('Game Over!');
      // console.log("Game over");
      window.location.reload();
    }
  
    upBtn.addEventListener('click', () => { dx = 0; dy = -20; });
    downBtn.addEventListener('click', () => { dx = 0; dy = 20; });
    leftBtn.addEventListener('click', () => { dx = -20; dy = 0; });
    rightBtn.addEventListener('click', () => { dx = 20; dy = 0; });
  
    generateFood();
    setInterval(moveSnake, 1000);
  });
  