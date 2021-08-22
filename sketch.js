const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var zombie;

var stones = [];
var backImg, zombieImg;
var stoneImg;
var breakButton;

function preload(){
   backImg = loadImage("background.png");
   zombieImg = loadImage("zombie.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  zombie = createSprite(width / 2, height - 110);
  zombie.addImage(zombieImg);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

  breakButton = createButton("break");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakButton");
  breakButton.mousePressed(handleButtonPress);




  ground = new Base(0, height - 10, width * 2, 20, "#795548", true);
  leftWall = new Base(0, height / 2 + 50, 200, 350, "#8d6e63", true);
  rightWall = new Base(width - 0, height / 2 + 50, 200, 350, "#8d6e63", true);

  bridge = new Bridge(30, { x: 0, y: 250 });
  jointPoint = new Base(width - 0, 250, 40, 20, "#8d6e63", true);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 120,120);
    stones.push(stone);
  }
}

function draw() {
  background(51);
  Engine.update(engine);

  ground.display();
  bridge.show();
  leftWall.display();
  rightWall.display();

  for (var stone of stones) {
    stone.display();
    var pos = stone.body.position;
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);
    if(distance <= 50){
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body, {x : 10, y : -10});
      collided = true;
    }
  }

  drawSprites();
}

function handleButtonPress(){
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
