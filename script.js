document.addEventListener('DOMContentLoaded', function(){
    const gameArena = document.getElementById('game-arena');
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0; // score of the ga,e
    let gameStarted = false; // game started or not
    let food = {x: 300, y: 200}; // food position{x:15*20, y:10*20}->cell coordinates ->pixels
    let snake  = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}]; // snake position  

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

    function runGame(){
        if(!gameStarted){
            gameStarted = true;
            drawFoodAndSnake();
            //gameLoop();
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
