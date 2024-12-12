document.addEventListener('DOMContentLoaded', function(){
    const gameArena = document.getElementById('game-arena');
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0; // score of the ga,e
    let gameStarted = false; // game started or not
    let food = {x: 300, y: 200}; // food position{x:15*20, y:10*20}->cell coordinates ->pixels
    let snake  = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}]; // snake position 

    let dx = cellSize; // snake movement in x direction
    let dy = 0; // snake movement in y direction

    function updateSnake(){
        const newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(newHead); // add new head to the snake array
        if (newHead.x === food.x && newHead.y === food.y){
            score += 10;
            
        }else{
            snake.pop(); // remove the tail of the snake
        }
    }

    function changeDirection(e){
        console.log("Key pressed", e);
        const isGoingDown = dy === cellSize;
        const isGoingUp = dy === -cellSize;
        const isGoingRight = dx === cellSize;
        const isGoingLeft = dx === -cellSize;
        if (e.key === 'ArrowUp'&& !isGoingDown){
            dx = 0;
            dy = -cellSize;
        }else if (e.key === 'ArrowDown' && !isGoingUp){
            dx = 0;
            dy = cellSize;
        }else if (e.key === 'ArrowLeft' && !isGoingRight){
            dx = -cellSize;
            dy = 0;
        }else if (e.key === 'ArrowRight' && !isGoingLeft){
            dx = cellSize;
            dy = 0;
        }

    }


    function drawDiv(x, y, className){
        const divElement = document.createElement('div');
        divElement.classList.add(className);
        divElement.style.top = `${y}px`;
        divElement.style.left = `${x}px`;
        return divElement;
    }
    function drawFoodAndSnake(){
        gameArena.innerHTML = ''; // clear the game arena
        //wipe out the everything and redraw with new positions

        snake.forEach((snakeCell) => {
            const snakeElement = drawDiv(snakeCell.x, snakeCell.y, 'snake');
            gameArena.appendChild(snakeElement);
        });
        const foodItem = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodItem);

    }

    function gameLoop(){
        setInterval(() => {
            updateSnake();
            drawFoodAndSnake();
        },200)
    }

    function runGame(){
        if(!gameStarted){
            gameStarted = true;
            document.addEventListener('keydown', changeDirection);
            gameLoop();
        }
    }


    function initiateGame(){
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';

        document.body.insertBefore(scoreBoard, gameArena);//insert score board before game arena

        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game';
        startButton.classList.add('start-button');

        startButton.addEventListener('click', function startGame(){
            startButton.style.display = 'none'; // hide start button

            runGame();
        });

        document.body.appendChild(startButton);//append start button to body
    }

    initiateGame();

});
