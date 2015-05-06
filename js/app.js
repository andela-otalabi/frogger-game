// Enemies our player must avoid
var positionBug = [65, 150, 235];
var score = 0;
var gameOver = false;
var gameOverSound = new Audio('music/gameover.mp3');
var bugHit = new Audio('music/insect.mp3');
var waterLevel = new Audio('music/water.mp3');

var Gems = function (x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    // this.pix = pix;

}
Gems.prototype.update = function() {
    
}

Gems.prototype.render = function() {
      ctx.drawImage(Resources.get(this.pix), this.x, this.y);
};

var gem1 = new Gems(201,400,'images/Gem Orange.png');
// var gem2 = new Gems(100,60,'images/Star.png');
// var gem3 = new Gems(150,60,'images/Heart.png');
var allGems = [];
allGems.push(gem1);

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = positionBug[Math.floor(Math.random() * 3)]; //selects position randomly 
    this.speed = 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 500) {
      this.x = -100
      this.y = this.y + 85;
      this.speed = Math.floor(100 + (Math.random() * this.speed));
      if (this.y > 235) {
        this.y = 65;
      }
    } 
    collision(this, player);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Places all enemy objects in an array called allEnemies
var allEnemies = [];
for(var i =0; i <=4; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = 201;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt){
}

//Draws player on the screen
Player.prototype.render = function(){
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//A method to let the user manipulate the player using the keyboard
Player.prototype.handleInput = function(key){  
  if (!gameOver) {
    if(key === "left"){
      if(this.x - 100 >= 1){
        this.x = this.x - 100;
      }
    }
    else if(key === "right"){
      if(this.x + 100 <= 401){
        this.x = this.x + 100;
      }
    }
    else if(key === "up"){
      if(this.y - 85 >= 60){
        this.y = this.y - 85;
      }
      else{
        this.x = 201;
        this.y = 400;
        score += 5;
        waterLevel.play();
      }              
      player.currScore();
    }
    else if(key === "down"){
      if(this.y + 85 <= 400){
        this.y = this.y + 85;
      }
    }
  }
}

// Resets the position of the player and bugs restart
Player.prototype.reset = function() {
  this.x = 201;
  this.y = 400;
  for(var e in allEnemies){
    allEnemies[e].x = -100;
    allEnemies[e].y = positionBug[Math.floor(Math.random() * 3)];
  }
}

// Gets the player's current score
Player.prototype.currScore = function() {
    document.getElementById('score').innerHTML = "Score: "+ score;
}

// Place the player object in a variable called player
var player = new Player();

function collision(enemy, player) {
  if(player.x >= enemy.x - 30 && player.x <= enemy.x + 30){
    if(player.y >= enemy.y - 30 && player.y <= enemy.y + 30){ 
      score -= 2;
      bugHit.play();
      if(score <= 0) { 
        document.getElementById('over').innerHTML = "Oops! Game Over"; 
        allEnemies = [];
        player.x = 201;
        player.y = 400;
        gameOver = true;
        score = 0; 
        player.currScore();
        gameOverSound.play();
        document.getElementById("refresh").innerHTML = "<a href='#' onclick='location.reload()'>Try again</a>";  
      } else {
        player.currScore();
      }
      player.reset();
    }          
  }   
}


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

 



