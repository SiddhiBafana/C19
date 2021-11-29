var hero, heroImg;
var rock, rock2, rockImg;
var monster, monsterImg;
var dagger, daggerImg;
var coin, coinImg;
var path, pathImg;

var gameOver, gameOverImg;

var monsterG, rockG, coinsG, daggerG;

var PLAY = 1;
var END = 0;
var gameState = 1;

var score = 0;

function preload(){
   heroImg = loadImage("hero.png");
   rockImg = loadAnimation("rock.gif");
   monsterImg = loadImage("monster.png");
   daggerImg = loadImage("dagger.png");
   coinImg = loadImage("coin.png");
   
   pathImg = loadImage("background.jpg");

   gameOverImg = loadImage("gameOver.png");

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    path=createSprite(width/2,200);
    path.addImage(pathImg);
    path.velocityY = 4;

    hero = createSprite(50,height-70,20,50);
    hero.addImage(heroImg);
    hero.setCollider('circle',0,0,350)
    hero.scale = 0.08;

    gameOver = createSprite(width/2,height/2- 50);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;
    gameOver.scale = 0.5;

    coinsG=new Group();
    daggerG=new Group();
    monsterG=new Group();
    rockG=new Group();

}

function draw() {

  if(gameState === PLAY){

    edges= createEdgeSprites();
    hero.collide(edges);

    if(keyDown("left_arrow")){
      hero.x = hero.x - 3;
    }
    if(keyDown("right_arrow")){
     hero.x = hero.x + 3;
   }
    if(keyDown("up_arrow")){
     hero.velocityY= - 10;
   }

    hero.velocityY = hero.velocityY + 0.8;

   if(path.y > height){
     path.y = height/2;
   }

   createCoins();
   createDagger();
   createMonster();
   createRock();

   if ( monsterG.isTouching(hero) ||
      daggerG.isTouching(hero) ||
      rockG.isTouching(hero) )  {

    gameState = END;

    hero.x=width/2;
    hero.y=height/2;
    hero.scale=0.6;
    
    coinsG.destroyEach();
    daggerG.destroyEach();
    rockG.destroyEach();
    monsterG.destroyEach();
    
    coinsG.setVelocityYEach(0);
    daggerG.setVelocityYEach(0);
    rockG.setVelocityYEach(0);
    monsterG.setVelocityYEach(0);
}
    else {
      if (coinsG.isTouching(hero)) {
        coinsG.destroyEach();
        score = score + 10;
      }
}

drawSprites();  
textSize(20);
fill("black")
text("Score: "+ score,30,50);                             
 }

}

function createCoins() {
    if (World.frameCount % 200 == 0) {
    var coin = createSprite(Math.round(random(50, width-50),40, 10, 10));
    coin.addImage(coinImg);
    coin.scale=0.12;
    //coin.velocityY = 5;
    coin.lifetime = 200;
    coinsG.add(coin);
    }
  }

function createDagger(){
    if (World.frameCount % 530 == 0) {
    var dagger = createSprite(Math.round(random(50, width-50),40, 10, 10));
    dagger.addImage(daggerImg);
    dagger.scale=0.1;
    //sword.velocityY = 4;
    dagger.lifetime = 200;
    daggerG.add(dagger);
    }
  }

  function createMonster(){
    if (World.frameCount % 530 == 0) {
    var monster = createSprite(Math.round(random(50, width-50),40, 10, 10));
    monster.addImage(monsterImg);
    monster.scale=0.1;
    monster.velocityX = 2;
    monster.lifetime = 200;
    monsterG.add(monster);
    }
  }

  function createRock(){
    if (World.frameCount % 530 == 0) {
    var rock = createSprite(Math.round(random(50, width-50),40, 10, 10));
    rock.addImage(rockImg);
    rock.scale=0.1;
    rock.velocityX = 4;
    rock.lifetime = 200;
    rockG.add(rock);
    }
  }