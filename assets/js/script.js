// Variables
let grid = document.querySelector('.grid')
let gridWidth = '300px'
let gridHeight = '560px'
// Create Brick
const brickWidth = '100px'
const brickHeight = '20px'
// Slider Starting point
let sliderStart = [230, 10];
let sliderPosition = sliderStart;
//Ball
let ballWidth = '15px'
// Ball starting point
let ballStart = [270, 30]
let ballPosition = ballStart
// Movement
let xMove = 2
let yMove = 2



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
slider.style.left = sliderStart[0] + 'px'
slider.style.bottom = sliderStart[1] + 'px'
grid.appendChild(slider)


//Slider movement 
function moveSlider(event) {
    switch (event.key) {
        case 'ArrowLeft':
            sliderStart[0] -= 10
            slider.style.left = sliderPosition[0] + 'px'
            break;
        case 'ArrowRight':
            sliderStart[0] += 10
            slider.style.left = sliderPosition[0] + 'px'
            break;
    }
}

document.addEventListener('keydown', moveSlider);

// Create ball
let ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
ball.style.left = ballStart[0] + 'px';
ball.style.bottom = ballStart[1] + 'px';


//Ball movement
function moveBall() {
    ballPosition[0] += 2;
    ballPosition[1] += 2;
    ball.style.left = ballStart[0] + 'px';
    ball.style.bottom = ballStart[1] + 'px';
    changeDirection()
}

setInterval(moveBall, 30)

// Ball Bounce
function changeDirection(){
    // Wall bounce
    if (ballPosition[0] >= (gridWidth - ballWidth) || ballPosition[1] >= (gridHeight - ballWidth)){
        bounceBall()
    }

}

function bounceBall(){
    if (xMove === 2 && yMove === 2) {
        xMove =- 2
        return
    }

}