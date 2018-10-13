//rock's dimensions approximately 101x 171, removing shadow
const X = 101, // X is the width of rock, pixels a player moves in each step
    Y = 83, // Y is pixels a player moves vertically in each step
    rightCorner = 3 * X,
    bottomCorner = 4 * Y,
    leftCorner = X,
    topCorner = 0,
    rightCorner4bug = 8 * Y;

/**
 *  constructor for class to manage enemies our players must avoid
 *
 * @param {number} row  row where new enemy will appear
 * @param {number} speed    speed for enemy to move along x-axis
 */
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

/**
 *  This function is called for every update of the game
 *  and updates the position of the enemy depending upon his position
 * @param {number} dt delta time
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > rightCorner4bug) {
        // to avoid memory wastage reusing older enemy instances
        this.x = -101; // so that it seems as new one
        this.y = getRandRow() * 70;
    } else
        this.x = this.x + this.speed * dt;
};

/**
 * Draw the enemy on the screen, required method for game
 * 
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


/**
 * constructor for class Player managing position, inputs, winning, colliding...
 *
 */
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

/**
 *  handles the key pressed by the player and updates position and status.
 *
 * @param {string} keyPressed which is pressed by the player
 */
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

// Player object as am instant of Player class.
var player = new Player();

// list of enemies currently on screen with diffrent speeds.
var allEnemies = [];
allEnemies.push(new Enemy(getRandRow(), 200));
allEnemies.push(new Enemy(getRandRow(), 100));

setTimeout(addEnemy, 3000, 50);
setTimeout(addEnemy, 5000, 100);
setTimeout(addEnemy, 100000, 150);
setTimeout(addEnemy, 15 * 1000, 200);

/**
 * adds the newly created enemy in a random row.
 *
 * @param {number} speed speed of the enemy to be added
 */
function addEnemy(speed) {
    allEnemies.push(new Enemy(getRandRow(), speed));
}

/**
 *  Checks collision occured or not
 *  if occurred it conveys the same and loads the game again.
 *
 */
function checkCollisions() {
    for (enemy of allEnemies) {
        //console.log('Enemy y:', enemy.y);
        if ((Math.abs(player.y - enemy.y) < 20) && (Math.abs(player.x - enemy.x) < 50)) {
            alert('Bhooom! \nBetter luck next time :)');
            location.reload();
        }
    }
};

/**
 *  Function to get random row
 *
 * @returns {number} row number among 1,2,3 returned randomly
 */
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