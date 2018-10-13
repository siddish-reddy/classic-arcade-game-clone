//rock's dimensions approximately 101x 171, removing shadow
let X = 101;
let Y = 83;
let rightCorner = 3 * X;
let bottomCorner = 4 * Y;
let leftCorner = X;
let topCorner = 0;
let rightCorner4bug = 8 * Y;
// Enemies our player must avoid
var Enemy = function(row, speed) {
    // speed indicating number of pixels to be moved per frame of animation
    this.x = -50;
    this.y = row * 70;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > rightCorner4bug) {
        this.x = -50;
        this.y = getRandRow() * 70;
    } else
        this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 2 * X;
    this.y = 4 * 75;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    checkCollisions();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
    if ((keyPressed === 'left') && (this.x >= leftCorner)) {
        this.x -= X;
    } else if ((keyPressed === 'right') && (this.x <= rightCorner)) {
        this.x += X;
    }
    // the canvas measures from top to bottom so opposite signs unlike normal algebra
    else if ((keyPressed === 'up') && (this.y >= topCorner)) {
        this.y -= Y;
        if (this.y == -32) {
            setTimeoutalert("  You have won the game !");
            this.y = 4 * 75;
        }
    } else if ((keyPressed === 'down') && (this.y <= bottomCorner)) {
        this.y += Y;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [];
allEnemies.push(new Enemy(getRandRow(), 200));
allEnemies.push(new Enemy(getRandRow(), 100));
setTimeout(addEnemy, 3000, 50);
setTimeout(addEnemy, 5000, 100);
setTimeout(addEnemy, 100000, 150);
setTimeout(addEnemy, 15 * 1000, 200);

function addEnemy(speed) {
    allEnemies.push(new Enemy(getRandRow(), speed));
}

function checkCollisions() {
    for (enemy of allEnemies) {
        //console.log('Enemy y:', enemy.y);
        if ((Math.abs(player.y - enemy.y) < 20) && (Math.abs(player.x - enemy.x) < 50)) {
            alert('Bhooom! \nBetter luck next time :)');
            location.reload();
        }
    }
};

function getRandRow() {
    return (Math.floor(Math.random() * 3) + 1);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});