// Variables
// Grid
let grid = document.querySelector('.grid')
let gridWidth = 560;
let gridHeight = 300;
// Create Brick
const brickWidth = 100;
const brickHeight = 20;
// Slider Starting point
let sliderStart = [230, 10];
let sliderPosition = sliderStart;
// Ball
let ballWidth = 15;
// Ball starting point
const ballStart = [270, 30];
let ballPosition = ballStart;
// Movement
let xMove = 2;
let yMove = 2;
//Timer
let ballSpeed;
// Score Board
let scoreBoard = document.querySelector('#score');
let score = 0;


class brick {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + brickWidth, yAxis]
        this.topLeft = [xAxis, yAxis + brickHeight]
        this.topRight = [xAxis + brickHeight, yAxis + brickHeight]
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
]


//Draw brick
function makeBrick() {
    for (let i = 0; i < bricks.length; i++) {
        let brick = document.createElement('div');
        brick.classList.add('brick')
        brick.style.left = bricks[i].bottomLeft[0] + 'px'
        brick.style.bottom = bricks[i].bottomLeft[1] + 'px'
        grid.appendChild(brick)
    }
}

makeBrick()


// Create slider
let slider = document.createElement('div');
slider.classList.add('slider');
makeSlider()
grid.appendChild(slider)

// Make Slider
function makeSlider() {
    slider.style.left = sliderStart[0] + 'px'
    slider.style.bottom = sliderStart[1] + 'px'
}

//Slider movement 
function moveSlider(event) {
    switch (event.key) {
        case 'ArrowLeft':
            if (sliderStart[0] > 0) {
                sliderStart[0] -= 10
                makeSlider()
            }
            break;

        case 'ArrowRight':
            if (sliderStart[0] < gridWidth - brickWidth) {
                sliderStart[0] += 10
                makeSlider()
            }
            break;
    }
}

document.addEventListener('keydown', moveSlider);

// Make Ball
function makeBall() {
    ball.style.left = ballPosition[0] + 'px';
    ball.style.bottom = ballPosition[1] + 'px';
}

// Create ball
let ball = document.createElement('div');
ball.classList.add('ball');
makeBall();
grid.appendChild(ball);

//Ball movement
function moveBall() {
    ballPosition[0] += xMove;
    ballPosition[1] += yMove;
    makeBall()
    changeDirection()
}



// Ball Bounce
function changeDirection() {
    // Wall Bounce
    if (ballPosition[1] >= (gridHeight - ballWidth) || ballPosition[0] >= (gridWidth - ballWidth) || (ballPosition[0] <= 0)) {
        bounceBall()
    }

    // Brick Bounce
    for (let i = 0; i < bricks.length; i++) {
        if ((ballPosition[0] > bricks[i].bottomLeft[0] && ballPosition[0] < bricks[i].bottomRight[0]) &&
            (ballPosition[1] > bricks[i].bottomLeft[1] && ballPosition[1] < bricks[i].topLeft[1])) {

            let groupBricks = document.querySelectorAll('.brick')
            groupBricks[i].classList.remove('brick')
            bricks.splice(i, 1)
            bounceBall()
            score++
            scoreBoard.innerHTML = score

            // Winner
            if (bricks.length === 0) {
                scoreBoard.innerHTML = "WINNER!"
                clearInterval(ballSpeed)
                document.removeEventListener('keydown', moveSlider)

            }

        }
    }

    // Slider Bounce
    if ((ballPosition[0] > sliderPosition[0] && ballPosition[0] < sliderPosition[0] + brickWidth) &&
        (ballPosition[1] > sliderPosition[1] && ballPosition[1] < sliderPosition[1] + brickHeight)) {
        bounceBall()
    }

    // Game Over
    if (ballPosition[1] <= 0) {
        clearInterval(ballSpeed)
        document.removeEventListener('keydown', moveSlider)
        scoreBoard.innerHTML = "GAME OVER"

    }
}

function bounceBall() {
    if (xMove === 2 && yMove === 2) {
        yMove = -2
        return
    }
    if (xMove === 2 && yMove === -2) {
        xMove = -2
        return
    }
    if (xMove === -2 && yMove === -2) {
        yMove = 2
        return
    }
    if (xMove === -2 && yMove === 2) {
        xMove = 2
        return
    }
}
// Start
function startGame() {
    ballSpeed = setInterval(moveBall, 30);
    document.addEventListener('keydown', moveSlider)
    startButtonDisappear()
    resetButtonAppear()
    changeDirection()
}

function startButtonDisappear() {
    let startDiv = document.getElementById('start')
    startDiv.style.display = 'none'
}

// Reset
function resetGame() {
    window.location.reload();
}

function resetButtonAppear() {
    let resetDiv = document.getElementById('reset')
    resetDiv.style.display = 'flex'
}


