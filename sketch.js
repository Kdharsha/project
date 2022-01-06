
var runner,runnerAnim;
var jungle,jungleImg;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var gameOver,restart;
var gameState = "play"
var score=0;

function preload(){

jungleImg = loadImage("jungle.png");
runnerAnim=loadAnimation("runner.gif");
tree1 = loadImage("tree1.png");
tree2 = loadImage("tree2.png");
tree3 = loadImage("tree3.png");
tree4 = loadImage("tree4.png");

gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
createCanvas(600,600);

jungle=createSprite(300,300),
jungle.addImage("jungle",jungleImg);
jungle.velocityY = 1;

treeGroup = new Group();

runner = createSprite(width/2,height-20,20,20);
runner.scale = 0.3;
runner.addImage("runner", runnerAnim);

gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;

  score = 0;
}

function draw() {
 background(220);
 textSize(20);
  fill("black")
  text("Score: "+ score,30,50);



if(gameState==="play"){

    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);

    if(keyDown("space")){
  
       runner.velocityX = +10;

    }

    if(jungle.x > 400){
        jungle.x = 300
    }

    spawnObstacles();

    runner.velocityX = runner.velocityX + 0.8;

    if(treeGroup.isTouching(runner)){
        runner.destroy();
        gameState="end";
   
        }

}else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;

    treeGroup.setLifetimeEach(-1);
   
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
}

drawSprites();
}
function spawnObstacles() {
    if(frameCount % 60 === 0) {
        var obstacle = createSprite(200, -50);
    
      obstacle.setCollider('circle',0,0,45)
      // obstacle.debug = true
    
      obstacle.velocityX = -(6 + 3*score/100);
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;  
        case 4: obstacle.addImage(obstacle4);
                break;              
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.3;
      obstacle.lifetime = 300;
      obstacle.depth = runner.depth;
      runner.depth +=1;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);

      obstacle.velocityY = 1;

           
      obstacle.lifetime = 800;
     
      obstaclesGroup.add(obstacle);
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    
    trex.changeAnimation("running",trex_running);
    
    score = 0;
    
  }
  
