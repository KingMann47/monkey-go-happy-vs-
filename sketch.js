var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  backGroundImage=loadImage("jungle.jpg");
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  score=0;

}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyIsDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  if(obstacleGroup.isTouching(player)){
    gameState= END;
  }
 else if(gameState===END){

backgr.velocityX=0;
player.visible=false;

 foodGroup.destroyEach();
 obstacleGroup.destroyEach();

 textsize (30);
 fill(255);
 text("GAMEOVER!",300,220)
}
  if(foodGroup.isTouching(player)){
    score=score+2;
    foodGroup.destroyEach();
    player.scale += + 0.1;
  }

player.velocityY=player.velocityY+0.8;   
player.collide(ground);     
spawnObstacles();  
spawnBananas(); 
     
 drawSprites();

  stroke("white");
textSize(20);
fill("white");
text("score: "+ score,500,50);
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
      obstacle = createSprite(650,360,40,10);
      obstacle.x = Math.round(random(200,300 ));
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.2;
      obstacle.velocityX = -3;
      
       //assign lifetime to the variable
      obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
  }
  function spawnBananas(){ if (frameCount % 100 === 0) {
    banana = createSprite(650,360,40,10);
     banana.y = Math.round(random(150,160 ));
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
     banana.lifetime = 200;
    foodGroup.add( banana);
} 

}
   