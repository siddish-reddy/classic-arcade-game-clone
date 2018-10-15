// rock's dimensions approximately 101x 171, removing shadow
const X = 101; // X is the width of rock, pixels a player moves in each step
const Y = 83; // Y is pixels a player moves vertically in each step
const RIGHT_CORNER = 3 * X;
const BOTTOM_CORNER = 4 * Y;
const LEFT_CORNER = X;
const TOP_CORNER = 0;
const RIGHT_CORNER_BUGS = 8 * Y;

/**
 *  constructor for class to manage enemies our players must avoid
 * @constructor
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
    if (this.x > RIGHT_CORNER_BUGS) {
        // to avoid memory wastage reusing older enemy instances
        this.x = -101; // so that it seems as new one
        this.y = getRandRow() * 70;
    } else
        this.x = this.x + this.speed * dt;
    this.checkCollisions();
};

/**
 * Draw the enemy on the screen, required method for game
 * 
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

/**
 *  Checks collision occured or not
 *  if occurred it conveys the same and loads the game again.
 *
 */
Enemy.prototype.checkCollisions = function() {
    if ((Math.abs(player.y - this.y) < 20) && (Math.abs(player.x - this.x) < 50)) {
        alert('Bhooom! \nBetter luck next time :)');
        location.reload();
    }
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
    this.checkWinning();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check if player has reached to water and reset the game by changing players positions and keeping bugs count same.
Player.prototype.checkWinning = function() {
        if (this.y == -32) {
            alert("  You have won the game !");
            // Resetting the position of the player to again normal block
            this.y = 4 * 75;
        }
    }
    /**
     *  handles the key pressed by the player and updates position and status.
     *
     * @param {string} keyPressed which is pressed by the player
     */
Player.prototype.handleInput = function(keyPressed) {
    if ((keyPressed === 'left') && (this.x >= LEFT_CORNER)) {
        this.x -= X;
    } else if ((keyPressed === 'right') && (this.x <= RIGHT_CORNER)) {
        this.x += X;
    }
    // the canvas measures from top to bottom so opposite signs unlike normal algebra
    else if ((keyPressed === 'up') && (this.y >= TOP_CORNER)) {
        if (this.y == -32) {
            this.checkWinning();
        } else {
            this.y -= Y;
        }
    } else if ((keyPressed === 'down') && (this.y <= BOTTOM_CORNER)) {
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