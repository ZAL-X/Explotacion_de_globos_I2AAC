
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage,
blue_balloonImage, yellow_balloonImage, purple_balloonImage, backgroundImage;

var score =0, scoreImg, SCORE;

var cooldown, cooldownBar;

function preload(){
  
  backgroundImage = loadImage("background0.png");

  scoreImg = loadImage("score.png");
  
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  yellow_balloonImage = loadImage("yellow_balloon0.png");
  purple_balloonImage = loadImage("purple_balloon0.png");
}



function setup() {
  createCanvas(400, 400);
  
  //crear fondo
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  //crear arco para disparar las flechas
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;

  //puntuación
   score = 0  
   SCORE=createSprite(300,50,10,10);
   SCORE.addImage(scoreImg);
   SCORE.scale= 0.008

   //grupo de globos rojos
redB = createGroup();
 //grupo de flechas
arrowGroup = createGroup();

     //Enfriamiento para el disparo de la flecha
     cooldown=createSprite(200,200,1,400);
     cooldown.visible=false;
     cooldownBar=createSprite(300,200,1,400);
     cooldownBar.visible=false;
}

function draw() {
 background(0);
 

 
 if(gameState === PLAY)
 {

  if (frameCount>295) {
  gameState=END; 
}
      // mover el suelo
      scene.velocityX = -3 

      // reiniciar el fondo
      if (scene.x < 0){
      scene.x = scene.width/2;
      }
      // mover arco
      bow.y = World.mouseY      

      if (arrowGroup.isTouching(redB)) {
        redB.destroyEach();
        gameState=END;
        arrowGroup.destroyEach();
        score=score+100
      }

  
   //liberar las flechas al presionar la barra espaciadora 
  if (keyDown("space")&& cooldownBar.collide(cooldown)) {
    createArrow();
    cooldownBar.x= 300;
  }
    //Enfriamiento para el disparo de la flecha
    cooldownBar.velocityX= -3
    cooldownBar.bounceOff(cooldown);

  //crear enemigos continuos
  var select_balloon = Math.round(random(1,6));
  
  if (World.frameCount % 100 == 0) {
    switch(select_balloon ){
      case 1: redBalloon();
      break;
      case 2:blueBalloon();
      break;
      case 3:pinkBalloon();
      break;
      case 4:greenBalloon();
      break;
      case 5:yellowBalloon();
      break;
      case 6:purpleBalloon();
      break;
      default:break;
    }
  }
 }


  if (gameState === END) {
      //destruir el arco
      bow.destroy();
      //reiniciar el fondo
      if (scene.x < 0){
      scene.x = scene.width/2;
      }
     //detener el movimiento del fondo
      scene.velocityX = 0;


  }



  drawSprites();
  textSize(20)
  text(score, 330,56);
}


function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1

}

function yellowBalloon() {
  var yellow = createSprite(0,Math.round(random(20, 370)), 10, 10);
  yellow.addImage(yellow_balloonImage);
  yellow.velocityX = 3;
  yellow.lifetime = 150;
  yellow.scale = 1;
}

function purpleBalloon() {
  var purple = createSprite(0,Math.round(random(20, 370)), 10, 10);
  purple.addImage(purple_balloonImage);
  purple.velocityX = 3;
  purple.lifetime = 150;
  purple.scale = 1;
}

// Crear flechas para el arco
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
  arrow.debug= true
  arrow.setCollider("rectangle",-10,0,220,60);

}
