// Global Variables
// Grid
let grid = document.querySelector('.grid');
let gridWidth = 560;
let gridHeight = 300;

// Create Brick Dimensions
let brickWidth = 100;
let brickHeight = 20;

// Slider Starting point, (x,y) coordinates for the slider starting point
let sliderStart = [230, 10];
let sliderPosition = sliderStart;

// Ball Diameter 
let ballWidth = 15;

// Ball starting point
let ballStart = [270, 30];
let ballPosition = ballStart;

// Movement
let xMove = 2;
let yMove = 2;

//Timer
let ballSpeed;

// Score Board get the score value
let scoreBoard = document.querySelector('#score');
let score = 0;


// Draw brick corners by x/y co-ordinants
class brick {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + brickWidth, yAxis];
        this.topLeft = [xAxis, yAxis + brickHeight];
        this.topRight = [xAxis + brickHeight, yAxis + brickHeight];
    }
}


// Make multiple bricks 
let bricks = [
    new brick(10, 280),
    new brick(120, 280),
    new brick(230, 280),
    new brick(340, 280),
    new brick(450, 280),
    new brick(10, 250),
    new brick(120, 250),
    new brick(230, 250),
    new brick(340, 250),
    new brick(450, 250),
    new brick(10, 220),
    new brick(120, 220),
    new brick(230, 220),
    new brick(340, 220),
    new brick(450, 220),
];


// Draw bricks, iterates through the bricks and creates a new div for each coordinate
function makeBrick() {
    for (let i = 0; i < bricks.length; i++) {
        // Creates new div
        let brick = document.createElement('div');
        // Gives the brick the class of 'bricks'
        brick.classList.add('brick');
        // Provides each new brick with X,Y coordinate
        brick.style.left = bricks[i].bottomLeft[0] + 'px';
        brick.style.bottom = bricks[i].bottomLeft[1] + 'px';
        // Adds brick the the grid in location provided
        grid.appendChild(brick);
    }
}


// Calls MakeBrick() when screen size is above 650px 
function callMakeBrick(large) {
    if (large.matches) {
        makeBrick();
    }
}

let large = window.matchMedia("(min-width: 650px)");
callMakeBrick(large);
large.addListener(callMakeBrick);


// Create slider as a div
let slider = document.createElement('div');
slider.classList.add('slider');
makeSlider();
grid.appendChild(slider);


// Places slider on the grid with (x,y) style coordinates
function makeSlider() {
    slider.style.left = sliderStart[0] + 'px';
    slider.style.bottom = sliderStart[1] + 'px';
}


// Slider movement, keyboard input event calls the makeSlider function
function moveSlider(event) {
    switch (event.key) {
        case 'ArrowLeft':
            if (sliderStart[0] > 0) {
                sliderStart[0] -= 10;
                makeSlider();
            }
            break;

        case 'ArrowRight':
            if (sliderStart[0] < gridWidth - brickWidth) {
                sliderStart[0] += 10;
                makeSlider();
            }
            break;
    }
}

document.addEventListener('keydown', moveSlider);


// Make Ball creates the ball in position
function makeBall() {
    ball.style.left = ballPosition[0] + 'px';
    ball.style.bottom = ballPosition[1] + 'px';
}


// Create ball as a div on the grid
let ball = document.createElement('div');
ball.classList.add('ball');
makeBall();
grid.appendChild(ball);


//Ball movement, gives ball direction by adding to the (x, y) coordinates
function moveBall() {
    ballPosition[0] += xMove;
    ballPosition[1] += yMove;
    makeBall();
    changeDirection();
}


// Ball Bounce gives teh ball the ability to bouce off objects
function changeDirection() {
    // Wall Bounce creates the height and width limits for the ball to bounce off
    if (ballPosition[1] >= (gridHeight - ballWidth) || ballPosition[0] >= (gridWidth - ballWidth) || (ballPosition[0] <= 0)) {
        bounceBall();
    }

    // Brick Bounce iterates through the bricks and if the ball collides the ball bounces
    for (let i = 0; i < bricks.length; i++) {
        if ((ballPosition[0] > bricks[i].bottomLeft[0] && ballPosition[0] < bricks[i].bottomRight[0]) &&
            (ballPosition[1] > bricks[i].bottomLeft[1] && ballPosition[1] < bricks[i].topLeft[1])) {
            // Removes the brick from the screen if the ball has collided with the brick   
            let groupBricks = document.querySelectorAll('.brick');
            groupBricks[i].classList.remove('brick');
            bricks.splice(i, 1);
            bounceBall();
            score++;
            scoreBoard.innerHTML = score;

            // Winner, when all the bricks have been hit "WINNER" is displayed and the ball stops and the slider cannot be moved
            if (bricks.length === 0) {
                scoreBoard.innerHTML = "WINNER!";
                clearInterval(ballSpeed);
                document.removeEventListener('keydown', moveSlider);

            }

        }
    }

    // Slider Bounce makes teh ball bounce back off the slider/player back up to the bricks
    if ((ballPosition[0] > sliderPosition[0] && ballPosition[0] < sliderPosition[0] + brickWidth) &&
        (ballPosition[1] > sliderPosition[1] && ballPosition[1] < sliderPosition[1] + brickHeight)) {
        bounceBall();
    }

    // Game Over, if the ball goes below the slider "GAME OVER" is displayed and the ball stops and the slider cannot be moved
    if (ballPosition[1] <= 0) {
        clearInterval(ballSpeed);
        document.removeEventListener('keydown', moveSlider);
        scoreBoard.innerHTML = "GAME OVER";

    }
}

// Bounce direction sets the rules for the direction ball will bounce after collision
function bounceBall() {
    if (xMove === 2 && yMove === 2) {
        yMove = -2;
        return;
    }
    if (xMove === 2 && yMove === -2) {
        xMove = -2;
        return;
    }
    if (xMove === -2 && yMove === -2) {
        yMove = 2;
        return;
    }
    if (xMove === -2 && yMove === 2) {
        xMove = 2;
        return;
    }
}


// Start Game 
function startGame() {
    // Starts the ball moving and sets teh speed
    ballSpeed = setInterval(moveBall, 30);
    // Listens fo the key press
    document.addEventListener('keydown', moveSlider);
    // Makes the start button disappear
    startButtonDisappear();
    // Makes the Reset button appear
    resetButtonAppear();
    // Calls the function to start the ball 
    changeDirection();
}

// Start button dissappear, called by start game
function startButtonDisappear() {
    let startDiv = document.getElementById('start');
    startDiv.style.display = 'none';
}

// Reset button appear, called by start game
function resetButtonAppear() {
    let resetDiv = document.getElementById('reset');
    resetDiv.style.display = 'flex';
}

// Reset button function 
function resetGame() {
    window.location.reload();
}


//Touch screen button control 
// Left arrow called by the left arrow button in the HTML
function moveLeft() {
    let moveL = document.getElementById('slider');
    if (sliderStart[0] > 0) {
        sliderStart[0] -= 10;
        makeSlider();
    }
}
// Right arrow alled by the right arrow button in the HTML
function moveRight() {
    const moveR = document.getElementById('slider');
    if (sliderStart[0] < gridWidth - brickWidth) {
        sliderStart[0] += 10;
        makeSlider();
    }
}



// For small screens below 650px

// Small screen function to resize
function smallScreen(x) {

    if (x.matches) {
        // Downsize game area to fit smaller screen width
        document.getElementById('game-area').style.width = '310px';
        document.getElementById('game-area').style.height = '350px';

        // Re-declaire variable values 
        // Downsize the grid to fit smaller screens
        grid = document.querySelector('.grid');
        gridWidth = 280;
        gridHeight = 200;

        // Create Brick to smaller size to fit reduced grid dimensions
        brickWidth = 50;
        brickHeight = 15;

        // Slider Starting point to center in smaller grid
        sliderStart = [125, 10];
        sliderPosition = sliderStart;

        // Ball diameter remains same for visibility
        ballWidth = 15;

        // Ball starting point to center in smaller grid
        ballStart = [140, 30];
        ballPosition = ballStart;

        // X/Y co-ordinates for brick positioning in smaller grid 
        // Allows the smaller bricks to be dispersed equally within reduced grid size 
        bricks = [
            new brick(5, 180),
            new brick(60, 180),
            new brick(115, 180),
            new brick(170, 180),
            new brick(225, 180),
            new brick(5, 150),
            new brick(60, 150),
            new brick(115, 150),
            new brick(170, 150),
            new brick(225, 150),
            new brick(5, 120),
            new brick(60, 120),
            new brick(115, 120),
            new brick(170, 120),
            new brick(225, 120),
        ];


        // Create smaller bicks in new location iterates through the bricks and creates a new div for each coordinate
        let smallBrick = function () {
            for (let i = 0; i < bricks.length; i++) {
                // Creates new div
                let brick = document.createElement('div');
                // Gives the brick the class of 'bricks'
                brick.classList.add('brick');
                // Provides each new brick with X,Y coordinate
                brick.style.left = bricks[i].bottomLeft[0] + 'px';
                brick.style.bottom = bricks[i].bottomLeft[1] + 'px';
                // Adds brick to the grid in location provided
                grid.appendChild(brick);
            }
        };

        // Create slider in new position by +/- starting point for the slider
        let makeSmallSlider = function () {
            slider.style.left = sliderStart[0] + 'px';
            slider.style.bottom = sliderStart[1] + 'px';
        };


        // Keyboard controls for slider in smaller grid 
        let smallSlider = function (event) {
            if (this.item === undefined) {
                return;
            }
            // When arrow left key input detected moves the slider 
            switch (event.key) {
                case 'ArrowLeft':
                    // prevents slider from leaving the grid
                    if (sliderStart[0] > 0) {
                        // moves slider 10px to the left from current position
                        sliderStart[0] -= 10;
                        // calls Make sider with new x axis starting point
                        makeSmallSlider();
                    }
                    break;
                // When arrow right key input detected moves the slider         
                case 'ArrowRight':
                    // prevents slider from leaving the grid
                    if (sliderStart[0] < gridWidth - brickWidth) {
                        // moves slider 10px to the right from current position
                        sliderStart[0] += 10;
                        // calls Make sider with new x axis starting point
                        makeSmallSlider();
                    }
                    break;
            }
        };
        // Calling functions for the small screen size
        smallBrick();
        makeSmallSlider();
        makeBall();
        smallSlider();
    }


}


// Screen max-width setting and listener
let x = window.matchMedia("(max-width: 650px)");
smallScreen(x);
x.addListener(smallScreen);