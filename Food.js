class Food{
constructor(){
this.image = loadImage("Milk.png");
this.foodStock = foodStock;
this.foodStock = database.ref("food");
this.lastFed = lastFed;
}

  getFoodStock(){
    var foodRef = database.ref("food");
    foodRef.on("value",function(data){
    foodStock = data.val();
    })
  }

  updateFoodStock(food){
    console.log("lol")
    database.ref("/").update({
    food : food
    })
  }

  deductFood(x){
  if(x <= 0){
    x = 0;
  } 
  else {
   x--;
  }
    database.ref("/").update({
        food: x
    })
  }

display(){
var x = 80
var y = 100;
imageMode(CENTER);

  if(foodStock!==0){
  for(var i=0;i < foodStock;i++){
    
   if(i%35===0){
   x = 80;
   y = y+50;
   }
    image(this.image,x,y,50,50);
    x = x+30;
   }
  }
 }
}
