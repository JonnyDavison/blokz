let grid = document.querySelector('.grid')


// Slider Starting point
let sliderStart = [230, 10];
let sliderPosition = sliderStart;

// Ball starting point
let ballStart = [270, 30]


// Create Brick
const brickWidth = '100px'
const brickHeight = '20px'

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
            slider.style.right = sliderPosition[0] + 'px'
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
    ball.ballStart[0] += 2;
    ball.ballStart[1] += 2;
    ball.style.left = ballStart[0] + 'px';
    ball.style.bottom = ballStart[1] + 'px';
}

setInterval(moveBall, 30);