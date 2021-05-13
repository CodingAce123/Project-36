var dog,dogImg
var happyDog,happyDogImg;

var food,foodObj,foodStock
var milk,milkImg;

var feedPetButton,addFoodButton;
var feedTime;
var fedTime,lastFed;
var input,button;

var database;
var nameref;
var petName;

function preload(){
dogImg = loadImage("Dog.png"); 
happyDogImg = loadImage("happy dog.png");
milkImg = loadImage("Milk.png")
}

function setup(){
 createCanvas(1300,600)
database = firebase.database();

  foodRef = database.ref("Food");
  foodRef.on("value",function(data){
  foodStock = data.val();
  });

  nameref = database.ref("petName");
  nameref.on("value",function(data){
  petName = data.val();
  })


  dog = createSprite(1100,430,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.27;

  milk = createSprite(1000,465,10,10);
  milk.addImage(milkImg);
  milk.scale = 0.0725;

  addFoodButton = createButton("Add Food");
  addFoodButton.position(1000,23);
  textFont("Arial")
  addFoodButton.mousePressed(addFoods);

  feedPetButton = createButton("Feed Dog");
  feedPetButton.position(1100,23);
  textFont("Arial")
  feedPetButton.mousePressed(feedDog);

  foodObj = new Food();

  fedTime = database.ref('feedTime')
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  
  input=createInput("Your Pet Name");
  input.position(578,23);
  
  
  button=createButton("Ok 👍🏻");
  button.position(760,23);
  button.mousePressed(namingDog)
}

function draw(){
background("darkgreen")


foodObj.display();
foodObj.getFoodStock();

  stroke("black")
  fill("white")
  textSize(23)
  textFont("Arial")
  if(lastFed >= 12){
    text("Last Fed : " + lastFed % 12 + " PM", 10,30)
  } else if(lastFed == 0){
    text("Last Fed : 12 AM",10,30)
  } else{
    text("Last Fed : " + lastFed + " AM",10,30)
  }

  stroke("black")
  fill("white")
  textSize(25)
  textFont("Arial")
  text("Let's feed " + petName,450,30)

  drawSprites();
}

function addFoods(){
  dog.addImage(dogImg);
  foodStock++;
  database.ref("/").update({
  food: foodStock
 });
}

function feedDog(){
  dog.addImage(happyDogImg);
  foodObj.deductFood(foodStock);
  database.ref("/").update({
    food: foodStock,
    feedTime: hour()
  })
}

function namingDog(){
  petName = input.value();
  button.hide();
  input.hide();
  database.ref("/").update({
    petName:petName
  })
}
