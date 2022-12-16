//Game States
var PLAY=1;
var END=0;
var gameState=1;

var soldier,enemy ,people,enemyGroup,peopleGroup, score,r,randomEnemy, position;
var soldierImage , enemy1, enemy2 ,enemy3,enemy4, peopleImage, gameOverImage;
var gameOverSound ,knifeSwoosh;
var bg;

function preload(){
  
  soldierImage = loadImage("soldier.png");
  peopleImage = loadAnimation("people.png")
  enemy1 = loadImage("enemy1.png");
  enemy2 = loadImage("enemy2.png");
  enemy3 = loadImage("enemy3.png");
  enemy4 = loadImage("enemy4.png");
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
  bg = loadImage("fairy-kingdom.jpg");
}



function setup() {
  createCanvas(1200, 600);
  
  //creating sword
   soldier=createSprite(40,200,20,20);
   soldier.addImage(soldierImage);
   soldier.scale=0.7
  
  
  
  //set collider for sword
  soldier.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  enemyGroup=createGroup();
  peopleGroup=createGroup();
  
}

function draw() {
  background(bg);
  
  if(gameState===PLAY){
    
    //Call enemy and people function
    enemy();
    people();
    
    // Move soldier with mouse
    soldier.y=World.mouseY;
    soldier.x=World.mouseX;
  
    // Increase score if soldier touching enemy
    if(enemyGroup.isTouching(soldier)){
      enemyGroup.destroyEach();
      
       knifeSwooshSound.play();
    


           score=score+2;

    }
    else
    {
      // Go to end state if soldier touching people
      if(peopleGroup.isTouching(soldier)){
        gameState=END;
        //gameover sound
        gameOverSound.play()
        
        enemyGroup.destroyEach();
        peopleGroup.destroyEach();
        enemyGroup.setVelocityXEach(0);
        peopleGroup.setVelocityXEach(0);
        
        // Change the animation of soldier to gameover and reset its position
        soldier.addImage(gameOverImage);
        soldier.scale=2;
        soldier.x=300;
        soldier.y=300;
      }
    }
  }
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function Peoples(){
  if(World.frameCount%200===0){
    people=createSprite(400,200,20,20);
    people.addAnimation("moving", peopleImage);
    people.y=Math.round(random(100,550));
    people.velocityX=-(8+(score/10));
    people.setLifetime=50;
    
    peopleGroup.add(people);
  }
}

function enemys(){
  if(World.frameCount%80===0){
    enemy=createSprite(400,200,20,20);
    enemy.x = 0    
  //Increase the velocity of enemy after score 4 

       enemy.velocityX= (7+(score/4));
     
     
    enemy.scale=0.2;
     r=Math.round(random(1,4));
    if (r == 1) {
      enemy.addImage(enemy1);
    } else if (r == 2) {
      enemy.addImage(enemy2);
    } else if (r == 3) {
      enemy.addImage(enemy3);
    } else {
      enemy.addImage(enemy4);
    }
    
    enemy.y=Math.round(random(50,550));
   
    
    enemy.setLifetime=100;
    
    enemyGroup.add(enemy);
  }
}