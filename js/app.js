// Enemies our player must avoid
var Enemy = function (posX, posY, speed) {
    // Variables applied to each of our instances go here,
    this.x = posX;
    this.y = posY;
    this.speed = speed;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // The enemies positions will change with speed
    this.x += dt * this.speed;

    // If the enemy crosses the edge, reset the positions
    // And give it a new random speed within 150-400
    if (this.x >= 500) {
        this.x = -50;
        this.speed = Math.floor(Math.random() * 250 + 150);
    }
    // The collision detection
    // Will be called when the player and enemy in the same floor
    // Then to detect the collision on x-axis
    if (player.y == this.y)
        if (this.x > player.x - 80 && this.x < player.x + 80) {
            player.x = 200;
            player.y = 390;
        }



};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
let Player = function () {
    this.x = 200;
    this.y = 390;
    // The image for the player
    this.sprite = 'images/char-boy.png';
}
// Draw the player image on the canvas
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// If the player reached the river,
// Reset the player position
Player.prototype.update = function () {
    if (this.y < 70) {
        this.y = 390;
        this.x = 200;
    }
}
// Move the player's position with key pressed
// Also, protect the player wont cross the edge
Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case "left":
            if (this.x > 0)
                this.x -= 100;
            break;
        case "right":
            if (this.x < 400)
                this.x += 100;
            break;
        case 'up':
            this.y -= 80;
            break;
        case 'down':
            if (this.y < 390)
                this.y += 80;
            break;
    }
}
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemyOne = new Enemy(0, 230, Math.floor(Math.random() * 250 + 150));
let enemyTwo = new Enemy(0, 150, Math.floor(Math.random() * 250 + 150));
let enemyThree = new Enemy(0, 70, Math.floor(Math.random() * 250 + 150));
let allEnemies = [];
let player = new Player();
allEnemies.push(enemyOne);
allEnemies.push(enemyTwo);
allEnemies.push(enemyThree);

// This listens for key presses and sends the keys to 
// Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});