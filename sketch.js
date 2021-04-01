var bg , bgImg;
var rocket , rocketImg;
var climber , climberImg;
var star , starImg;
var star_Group , climber_Group;
var magicSound ;
var meteor , meteorImg;
var meteor_Group;
var score = 0;
var gameState = "start";
var game,gameImg;
var destruct;

function preload(){
bgImg = loadImage("images/planet.jpg");
rocketImg = loadImage("images/rocket.png");
climberImg = loadImage("images/climber.jpg");
starImg = loadImage("images/image.png");
magicSound = loadSound("starSound.mp3");
meteorImg = loadImage("images/meteor.png");
gameImg = loadImage("images/game.png");
destruct = loadSound("destruct.wav");
}

function setup() {
  createCanvas(1200,600);

  //console.log()
  bg = createSprite(600,300);
  bg.addImage(bgImg);
  bgImg.resize(windowWidth, windowHeight)
 bg.scale = 1.8
 bg.velocityX = -4

 rocket = createSprite(80,500);
 rocket.addImage(rocketImg);
 rocket.scale = 0.4;

 star_Group = createGroup();
 climber_Group = createGroup();
 meteor_Group = createGroup();
 }

function draw() {

  
  background(255,255,255);  
 // console.log("score")
 if(gameState === "start"){

  if(bg.x < 400){
    bg.x = 600
  }



  if(keyDown("left_arrow")){
    rocket.x = rocket.x-5;
  }
  
  if(keyDown("right_arrow")){
    rocket.x = rocket.x + 5;
  }

  if(keyDown("up_arrow")){
    rocket.y = rocket.y -5;
  }

  if(keyDown("down_arrow")){
    rocket.y = rocket.y + 5;
  }

  if(frameCount % 150 === 0){
    climb();
    bubble_star();
  }

  if(frameCount % 160 === 0){
    meteor_fall();
  }

  if(star_Group.isTouching(rocket)){
  star.destroy();
  score = score + 1
  magicSound.play();
  }
}

if(meteor_Group.isTouching(rocket)){
  rocket.destroy();
  gameState = "end"
  destruct.play();
}

if(gameState === "end"){
//var blank = createSprite(600,300,windowWidth,windowHeight);
//blank.shapeColor = "black"

game = createSprite(450,250)
game.addImage(gameImg)
game.scale = 1
bg.depth = game.depth;
bg.depth = bg.depth + 1
}

if(keyDown("k")){
  gameState = "start"
}

  drawSprites();

  stroke("white")
  fill("black")
strokeWeight(2)
textSize(40)
text("score : "+score,1000,30)
}

function climb(){
  climber = createSprite(600,400,100,100);
  climber.addImage(climberImg);
  climber.y = Math.round(random(200,600));
  climber.scale = 0.5;
  climber.velocityX = -3;

  climber_Group.add(climber);
}

function bubble_star(){
  star = createSprite(600,150,100,100);
   star.addImage(starImg);
   star.y = climber.y-60 ;
   star.velocityX = -3;
   star.scale = 0.2

   star_Group.add(star);
}

function meteor_fall(){
  meteor = createSprite(0,5);
  meteor.addImage(meteorImg);
  meteor.x = Math.round(random(300,600));
  meteor.scale = 0.3;
  meteor.velocityY = 4;

  meteor_Group.add(meteor);
}

