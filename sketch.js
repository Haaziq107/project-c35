//Create variables here
var dog, happyDog, database, foodS, foodStock,dogsad;
var NOTE;
var feed,addFood;
var fedTime, lastFed;
var foodObj;

function preload(){
  //load images here
  dogsad=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  database=firebase.database();
  dog = createSprite(250,250);
  dog.addImage(dogsad);
  dog.scale=0.1;

  foodObj=new Food();

  feed=createButton('Feed the dog')
  feed.position(600,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFood);

  var foodStockRef=database.ref('Food');
  foodStockRef.on("value",readStock);

   
}

function draw() {  
  background(46, 139, 87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){ 
    lastFed=data.val();
  });
  textSize (15)
  fill(255,255,255);
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12+"PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed +"AM",350,30);
  }
  drawSprites();
  //add styles here
  //text("Note:Press UP_ARROW key To Feed Drago Milk! ",100, 100);
}


  function addFood(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }

  function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
    FeedTime:hour()
    })
  }
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}