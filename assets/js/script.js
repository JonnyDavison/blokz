let grid = document.querySelector('.grid')
const brickWidth = '100px'
const brickHeight = '20px'

// Create Brick
class brick {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + brickWidth, yAxis]
        this.topLeft = [xAxis, yAxis + brickHeight]
        this.topRight = [xAxis + brickHeight, yAxis + brickHeight]
    }
}
// Make multiple bricks
let bricks = [
    new brick(10, 280)
]


//Draw brick
function makeBrick() {
    for (let i=0; i < bricks.length; i++ ) {
        let brick = document.createElement('div');
        brick.classList.add('brick')
        brick.style.left = bricks[i].bottomLeft[0] + 'px'
        brick.style.bottom = bricks[i].bottomLeft[1] + 'px'
        grid.appendChild(brick)
    }
}

makeBrick()