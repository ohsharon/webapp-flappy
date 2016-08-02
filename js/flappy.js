// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score1 = 0;
var score2 = 0;
var player1;
var player2;
var gapStart = game.rnd.integerInRange(1, 5);
var pipes = [];
var score = 0;
if (score < 1) {
  score += 1;
}
if (score >= 1) {
  score += 2;
}
var pipeInterval = 1.75 * Phaser.Timer.SECOND;





/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg", "../assets/jamesBond.gif");
game.load.audio("scoreSound", "../assets/point.ogg");
game.load.image("player1Img","../assets/flappy.png");
//game.load.image("player2Img","../assets/jamesBond.gif");
game.load.image("pipeBlock","../assets/pipe-end.png");
game.load.image("back","../assets/grasshill.jpg");


}

function clickHandler(event) {
  game.sound.play("scoreSound");
    //alert("Click!");
}

function spaceHandler() {
game.sound.play("scoreSound");}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  var background =game.add.image(0,0,"back");
  background.width=790;
  background.height=400;
  game.add.text(260, 60, "Welcome to my game",{font: "30px Arial", fill:"#fffff"});
//  game.add.sprite(300, 270, "playerImg");
//  game.input.keyboard.SPACEBAR.add(clickHandler);
  game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(player1Jump);
    // set the background colour of the scene
    game.input.onDown.add(clickHandler);
    labelScore = game.add.text(20, 20, "0");
    changeScore();
    game.input
      .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.add(spaceHandler);

    //alert(score);
//    player = game.add.sprite(100, 200, "playerImg");
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
                   .onDown.add(moveRight);
player1_initialisation();
//    player1 = game.add.sprite(150, 200, "player1Img");
    game.input.keyboard.addKey(Phaser.Keyboard.W)
                       .onDown.add(movePlayer2Up);
    game.time.events.loop(
       pipeInterval,
       generatePipe
                       );

}

function changeScore() {
  score1 = score1 + 1;
	labelScore.setText(score1.toString());
}

function moveRight() {
	//player.x = playerImg.x + 1;
}

function movePlayer1Up() {
	player1.y = player1.y - 50;
}

function movePlayer2Up() {
player2.x = player2.x + 10;
}

function generatePipe() {
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count < 5; count++) {
        if (count != gap && count != gap+1) {
            addPipeBlock(750, count * 50);
        }
    }
    changeScore();
}
function addPipeBlock(x, y) {
    // create a new pipe block
    var pipeBlock = game.add.sprite(x,y,"pipeBlock");
      pipes.push(pipeBlock);
      game.physics.arcade.enable(pipeBlock);
      pipeBlock.body.velocity.x = -150;
}
/*
 * This function updates the scene. It is called for every new frame.
 */
 function update() {
     game.physics.arcade.overlap(player1,pipes,gameOver);
 }

 function gameOver() {
   registerScore(score);
  game.state.restart();
 }



function player1_initialisation(){
  player1 = game.add.sprite(100, 200, "player1Img");
  game.input.keyboard.addKey(Phaser.Keyboard.UP)
                     .onDown.add(movePlayer1Up);
  game.physics.arcade.enable(player1);
// player1.body.velocity.y = 100;
//player1.body.velocity.x = 100;
//  player1.body.gravity.x = 800;
  player1.body.gravity.y = 180;

}

function player1Jump() {
    player1.body.velocity.y = -180;
}
