<<<<<<< HEAD
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

// chart showing score for items, 2 elements
var topKey = document.getElementById('topKey');
var bottomKey = document.getElementById('bottomKey');

function showScoreKey(){
    topKey.style.zIndex = "2";
    bottomKey.style.zIndex = "2";
}
function hideScoreKey(){
    topKey.style.zIndex = "-1";
    bottomKey.style.zIndex = "-1";
}

// victory score thresholds
const specialVictoryScore = 250;
const goodVictoryScore = 100;
// Make the standard unit for a square on the image
let box = 32;
// **************spawn restrictions******
// For full board
// let newfoodX = Math.floor(Math.random()* 17+1)*box;
// let newfoodY = Math.floor(Math.random()* 15+3)*box;
//  For no edge-spawns:
// let newfoodX = Math.floor(Math.random()* 15+2)*box;
// let newfoodY = Math.floor(Math.random()* 13+4)*box;
// will crash when these 9 boxes are occupied at the same time
function xSpawnLimit() {
    return Math.floor(Math.random()* 15+2)*box;
};
function ySpawnLimit() {
    return Math.floor(Math.random()* 13+4)*box;
};

// ratio for missing item pickup
let slipRate;
function getSlipRate() {
    return slipRate = Math.floor(Math.random()*7+9)
};

getSlipRate();
console.log("will miss every [" + slipRate + "] items");

// // ***** NEED WORK ON: 
// INC: save scores (top scoreres list) to local storage (maybe JSON.parse with local storage)
// ************************************

// make vars for image files
const ground = new Image();
ground.src = "../img/snakeground.png";
const gkPatch = new Image();
gkPatch.src = "../img/vectorIcons/gkPatchSmall.png";
// IMAGE RESIZING DOESN'T WORK FOR CANVAS ITEMS
// NEED TO BE RESIZED BEFOREHAND

// Food image variables
// Inc make food list and randomize
let [foodImg1, foodImg2, foodImg3, foodImg4, foodImg5, foodImg6] = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
foodImg1.src = "../../img/vectorIcons/eCap.png";
foodImg2.src= "../../img/vectorIcons/tData.png";
foodImg3.src= "../../img/vectorIcons/dCore.png";
foodImg4.src= "../../img/vectorIcons/sToken.png";
foodImg5.src= "../../img/vectorIcons/oRing.png";
foodImg6.src = "../img/grizzlyRun1.PNG";
// placeholder var for currently spawned food
let spawnedFood1 = new Image();
let spawnedFood2 = new Image();
let spawnedFood3 = new Image();
let spawnedFoodArr = [spawnedFood1, spawnedFood2, spawnedFood3]

var foodValue1 = 1;
var foodValue2 = 2;
var foodValue3 = 3;
var foodValues = [];

// cat images for the snake head and body
const head_cat = new Image();
head_cat.src = "../img/idwHead.png";
// body images for the running snake body
const dummy_cat1 = new Image();
dummy_cat1.src = "../img/runIDW1.PNG" 
const dummy_cat2 = new Image();
dummy_cat2.src = "../img/runIDW2.PNG" 
const dummy_cat3 = new Image();
dummy_cat3.src = "../img/runIDW3.PNG" 
const dummy_cat4 = new Image();
dummy_cat4.src = "../img/runIDW4.PNG" 
const dummy_cat5 = new Image();
dummy_cat5.src = "../img/runIDW5.PNG" 
const dummy_cat6 = new Image();
dummy_cat6.src = "../img/runIDW6.PNG" 
// extra images
const plusS = new Image(); 
plusS.src = "../img/vectorIcons/plusSign.png";

// load audio files
// destructuring assignment **********
let [dead1, dead2, dead3, dead4, dead5] = [new Audio(), new Audio(), new Audio(), new Audio(), new Audio()];

let eat1 = new Audio();
let eat2 = new Audio();
let eat3 = new Audio();

let [comboEaten1, comboEaten2, comboEaten3, comboEaten4, comboEaten5] = [new Audio(), new Audio(), new Audio(), new Audio(), new Audio()];
let bellyFull = new Audio();

let [chorus1, chorus2, chorus3, chorus4, chorus5, chorus6] = [new Audio(), new Audio(), new Audio(), new Audio(), new Audio(), new Audio()]

let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

let victoryDeath = new Audio();
let superWin = new Audio();

dead1.src = "../aud/deathNyan.wav";
dead2.src = "../aud/fatalityChorus.wav";
dead3.src = "../aud/gameShowFail.wav";
dead4.src = "../aud/howcouldthishappenShort.wav";
dead5.src = "../aud/fatalityChorus.wav";
eat1.src = "../aud/nyan1.wav";
eat2.src = "../aud/nyan1.wav";
eat3.src = "../aud/nyan2.wav";
// bootlegging array randomization by declaring the same-source clip multiple times...
// eat4.src = "../aud/nyan2.wav";
comboEaten1.src = "../aud/ChorusToasty.wav";
comboEaten2.src = "../aud/ChorusToasty.wav";
comboEaten3.src = "../aud/airHornShort.wav";
comboEaten4.src = "../aud/ChorusToasty.wav";
comboEaten5.src = "../aud/womboCombo1.wav";
// When big combo is reached:
bellyFull.src = "../aud/imfullNya.wav";
// winning death sounds
victoryDeath.src = "../aud/ahhhClip.wav";
superWin.src = "../aud/mgsWaOh.wav";

// chours sounds for eating with a big train
chorus1.src = "../aud/nyan3chorus2.wav";
chorus2.src = "../aud/nyan1.wav";
chorus3.src = "../aud/nyan3echo3.wav";
chorus4.src = "../aud/chorusOmNya2.wav";
chorus5.src = "../aud/chorusNightmareOmNya.wav";

up.src = "../aud/teleport1.wav";
right.src = "../aud/teleport2.wav";
down.src = "../aud/teleport3.wav";
left.src = "../aud/teleport4.wav";

// *******************odd event clips **************************
let wScream = new Audio();
wScream.src = "../aud/wilhelmScream.mp3";
let grizzlySpawn = new Audio();
grizzlySpawn.src= "../aud/araShikikanGrizzly.wav";
let grizzlyGrabbed = new Audio();
grizzlyGrabbed.src= "../aud/grizzlyMagnum.wav";
let ringSpawn = new Audio();
ringSpawn.src = "../aud/happyIDW.wav";
let ringGrabbed = new Audio();
ringGrabbed.src =  "../aud/sonicRing1.wav";
let shekelGrabbed = new Audio();
shekelGrabbed.src = "../aud/shekels1.wav";
let confusedSound = new Audio();
confusedSound.src = "../aud/confusedCatSound.wav";

// make an array of eating possibilities
let nomSounds = [eat1, eat2, eat3];
// death possibilities array
let deathSounds = [dead1, dead2, dead3, dead4, dead5]
// combo sound bytes
let comboSounds = [comboEaten1, comboEaten2, comboEaten3, comboEaten4, comboEaten5]
// chorus sounds array
let chorusSounds =  [chorus1, chorus2, chorus3, chorus4, chorus5]
// array for food consumed
let consumedFood = [];
// Placeholder for touches to track slip rate
let totalTouchesArr = [];

// create the snake from an array
// set starting position with x/y coords
let snake = [{
    x : 5 * box,
    y : 10 * box
  }];
// instantiate snakeHead var for later reference
let snakeHead = snake[0]

let score = 0;

//control the snake with arrow keys and appropriate key-codes
let d;
// Instantiate a switch to flag if game is ended or not (to disable movement key sounds)
let gameEnded = false;

// Objects to contain coordinates of foods
let foodCoords1 = {};
let foodCoords2 = {};
let foodCoords3 = {};
let foodCoordsArr = [foodCoords1, foodCoords2, foodCoords3]

// give a placeholder for the newly spawned item's point-value
let newSpawnVal;

// Make an array for the food item images then randomly select through them based on a dice roll
// Control item tier spawn rate / item quality 
let foodItems = [foodImg1, foodImg2, foodImg3, foodImg4, foodImg5, foodImg6];

    // Randomize the food value, and assign it to its associated image
function randomizeFood1(){
    let diceRoll = Math.ceil(Math.random()*20);
    if(diceRoll == 20){
        spawnedFood1 = foodImg6;
        foodValue1 = 50;
    }else if(diceRoll >= 18){
        spawnedFood1 = foodImg5;
        foodValue1 = 25;
    }else if(diceRoll >= 16){
        spawnedFood1 = foodImg4;
        foodValue1 = 10;
    }else if(diceRoll >= 13){
        spawnedFood1 = foodImg3;
        foodValue1 = 5;
    }else if(diceRoll >= 8){
        spawnedFood1 = foodImg2;
        foodValue1 = 2;
    }else{
        spawnedFood1 = foodImg1;
        foodValue1 = 1;
    }
    // (slice out original value for 0 index from array?)
    // do for each of the randomizers
    foodValues[0] = foodValue1;
}
function randomizeFood2(){
    let diceRoll = Math.ceil(Math.random()*20);
    if(diceRoll == 20){
        spawnedFood2 = foodImg6;
        foodValue2 = 50;
    }else if(diceRoll >= 18){
        spawnedFood2 = foodImg5;
        foodValue2 = 25;
    }else if(diceRoll >= 16){
        spawnedFood2 = foodImg4;
        foodValue2 = 10;
    }else if(diceRoll >= 13){
        spawnedFood2 = foodImg3;
        foodValue2 = 5;
    }else if(diceRoll >= 8){
        spawnedFood2 = foodImg2;
        foodValue2 = 2;
    }else{
        spawnedFood2 = foodImg1;
        foodValue2 = 1;
    }
    foodValues[1] = foodValue2;
}
function randomizeFood3(){
    let diceRoll = Math.ceil(Math.random()*20);
    if(diceRoll == 20){
        spawnedFood3 = foodImg6;
        foodValue3 = 50;
    }else if(diceRoll >= 18){
        spawnedFood3 = foodImg5;
        foodValue3 = 25;
    }else if(diceRoll >= 16)
    {
        spawnedFood3 = foodImg4;
        foodValue3 = 10;
    }else if(diceRoll >= 13){
        spawnedFood3 = foodImg3;
        foodValue3 = 5;
    }else if(diceRoll >= 8){
        spawnedFood3 = foodImg2;
        foodValue3 = 2;
    }else{
        spawnedFood3 = foodImg1;
        foodValue3 = 1;
    }
    // arr.push(val) not needed for this case since we wanna keep the length the same, so just reassign the contained vals
    // foodValues.push(foodValue3);
    // Below: replacement via reassignment
    foodValues[2] = foodValue3;
}

// randomizeFood1(foodValue1);
// randomizeFood2(foodValue2);
// randomizeFood3(foodValue3);

// function to make food coordinates (Note, the coords actually have to be drawn within the draw canvas function to appear)

function makeAllFood(){
  for (var i = 0; i < 3; i++){
    while (true) {
        let flipped = false;
        let newfoodX = xSpawnLimit();
        let newfoodY = ySpawnLimit();
        foodCoordsArr[i] = {
        x: newfoodX,
        y: newfoodY
        };
        snake.forEach(function (dummy){
            if((dummy.x == foodCoordsArr[i].x) && (dummy.y == foodCoordsArr[i].y)){
                // console.log(`food failed to spawn on dummy-train at X: ${foodCoordsArr[i].x} Y: ${foodCoordsArr[i].y}`);
                flippedd = true;
            } else if((foodCoordsArr[i].x == snakeHead.x) && (foodCoordsArr[i].y == snakeHead.y)){
            // console.log(`food Spawned on head at X: ${foodCoordsArr[i].x} Y: ${foodCoordsArr[i].y}`);
                flippedd = true;
                // wScream.play();
            }
        });
        // Make sure the food does not spawn on other food by checking x/y coords
        if(i == 1){
            if((foodCoordsArr[0].x == foodCoordsArr[1].x) && (foodCoordsArr[0].y == foodCoordsArr[1].y)){
                // console.log('second food item spawned first! Re-rolling');
                flipped = true;
            }
        } else if (i == 2){
            if(((foodCoordsArr[0].x == foodCoordsArr[2].x) && (foodCoordsArr[0].y == foodCoordsArr[2].y)) || 
            ((foodCoordsArr[1].x == foodCoordsArr[2].x) && (foodCoordsArr[1].y == foodCoordsArr[2].y)) || ((foodCoordsArr[0].x == foodCoordsArr[1].x) && (foodCoordsArr[0].y == foodCoordsArr[1].y))
            ){
                // console.log('third item spawned on prior food! Re-rolling');
                flipped = true;
            }
        }
    // note: food can still spawn on the same coords after this
            if(!flipped){
                    break;
                }
            };
      }
    // for (var i = 0; i < 3; i++){
        randomizeFood1();
        randomizeFood2();
        randomizeFood3();
    // }
};
// make initial food item to start with below
makeAllFood();

function checkForRareSpawnAudio(val) {
    // console.log(`value of ${val} in ${foodValues}`);
    if (val == 50){
        console.log('grizzly appears!');
        grizzlySpawn.play();
    } else if (val == 25){
        console.log('ring appears!');
        ringSpawn.play();
    }
}

function generateFoodVal(i) {
    if (i == 0){
      randomizeFood1();
      return foodValues[0];
    } else if ( i == 1){
      randomizeFood2();
      return foodValues[1];}
      else {
      randomizeFood3();
      return foodValues[2]}
  };


// only make one food item instead of all at once
function makeSingleFood(i){
    console.log(`loot bag length: ${consumedFood.length}`)
  while (true) {
        let flipped = false;
        let newfoodX = xSpawnLimit();
        let newfoodY = ySpawnLimit();

        let foodObj = {
        x: newfoodX,
        y: newfoodY
        };
        
        foodCoordsArr.splice(i, 1, foodObj);
    
        // check for spawning on the snake
        snake.forEach(function (dummy){
            if((dummy.x == foodCoordsArr[i].x) && (dummy.y == foodCoordsArr[i].y)){
                console.log('spawned on dummy train');
                console.log("dummy X : " + dummy.x + " and " + foodCoordsArr[i].x);
                console.log("dummy y : " + dummy.x + " and " + foodCoordsArr[i].y);
                flipped = true;
            } else if((snakeHead.x == foodCoordsArr[i].x) && (snakeHead.y == foodCoordsArr[i].y)){
                console.log('spawned on head');
                // wScream.play();
                flipped = true;
            }
            
        });

        // NOT IMPLEMENTED:
        // Currently allows food to spawn on top of one another, targeting is acting too weird for me to fix

        // check the coords of the food objects other than newly spawned one so they don't overlap
        // if the current object is equal to either of the others, so if  foodCoordsArr[i] == foodCoordsArr[1] || foodCoordsArr[i] == foodCoordsArr[2]
        // console.log(i)
        // if (i == 0){
        //     if((foodCoordsArr[i].x == foodCoordsArr[1].x) || (foodCoordsArr[i].x == foodCoordsArr[2].x)){
        //         console.log("food idx-0 spawned on existing item");
        //         flipped = true ;
        //     }
        // } else if (i == 1){
        //     if((foodCoordsArr[i].x == foodCoordsArr[0].x ) || (foodCoordsArr[i].x == foodCoordsArr[2].x)){
        //         console.log("food idx-1 spawned on existing item");
        //         flipped = true ;
        //     }
        // } else if (i == 2){
        //     if((foodCoordsArr[i].x == foodCoordsArr[0].x) || (foodCoordsArr[i].x == foodCoordsArr[1].x)){
        //         console.log("food idx-2 spawned on existing item");
        //         flipped = true ;
        //     }
        // }

        if (!flipped){
            consumedFood.push(spawnedFoodArr[i]);

            let newVal = generateFoodVal(i);
            newSpawnVal = newVal
            console.log(`new value of ${newVal}`);
            // checkForRareSpawnAudio(newVal);
                // generate food val (i)???
            break;
        }
      };  
};

// *Below circumvented by preserving makefood() from above
// initialize food to field
// for (var i = 0; i < 3; i++){
//   makeSingleFood(i);
//   generateFoodVal(i);
// }

// NOT IMPLEMENTED: wrap key controls in boolean switch for winning or losing to disable *
// ***********************************
// make an event on keydown
document.addEventListener("keydown",direction);
// flesh out what happens when each arrow key is pressed
function direction(event){
    let key = event.keyCode;
    //  the && exceptions prohibit it from turning the opposite direction.
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
};
// check for a death collision through a function
function collision(head,array){
  for(let i = 0; i < array.length; i++){
    // see if the head hits the snake body
    // **** might be useful for keeping food from spawning on the body with a conditional in food generation
      if(head.x == array[i].x && head.y == array[i].y){
          return true;
      }
  }
  return false;
}

// "draw" everything to the canvas with a draw function
function draw(){
// actively draw consumed item history (loot bag) on the side
for(let i=0; i < consumedFood.length; i++){
    if(i < 15){
    ctx.drawImage(dummy_cat1, 608, (i*32)+96, box, box);
    } else if(i < 29){
    ctx.drawImage(dummy_cat1, 640, ([i-15]*32)+96, box, box);
    } else {
    // placeholder for ellipsis, 15 and 29 above thresholds
    // i-15 (29 for the second leaves one space for the plus sign ender)
    ctx.drawImage (plusS, 642, 544, box, 28);
    }
}
// draw the play area image 
  ctx.drawImage(ground,0,0);
//   **************************
//   draw GK patch as loot-bag head
  ctx.drawImage(gkPatch, 607, 0);
//   draw the score box
  ctx.fillStyle = "black";
  ctx.fillRect(619, 40, 51, 40);

  for(let i=0; i < snake.length; i++){
    // Make the cell contain a dummy if after the head
    if(i==0){
      ctx.drawImage(head_cat,  snake[i].x, snake[i].y, box, box);
    } else if ( ( (i+6)%6 ) == 1) {
        // use modulo to assign frames of run animation
      ctx.drawImage(dummy_cat1, snake[i].x, snake[i].y, box, box);
    } else if ( ( (i+6)%6 ) == 2) {
      ctx.drawImage(dummy_cat2, snake[i].x, snake[i].y, box, box);
    }
    else if ( ( (i+6)%6 ) == 3) {
      ctx.drawImage(dummy_cat3, snake[i].x, snake[i].y, box, box);
    }
    else if ( ( (i+6)%6 ) == 4) {
      ctx.drawImage(dummy_cat4, snake[i].x, snake[i].y, box, box);
    }
    else if ( ( (i+6)%6 ) == 5) {
      ctx.drawImage(dummy_cat5, snake[i].x, snake[i].y, box, box);
      }
    else {
      ctx.drawImage(dummy_cat6, snake[i].x, snake[i].y, box, box);
    }
  }

//   ***********draw starter food images *********
  ctx.drawImage(spawnedFood1, foodCoordsArr[0].x, foodCoordsArr[0].y, 32, 32);
  ctx.drawImage(spawnedFood2, foodCoordsArr[1].x, foodCoordsArr[1].y, 32, 32);
  ctx.drawImage(spawnedFood3, foodCoordsArr[2].x, foodCoordsArr[2].y, 32, 32);

 // old head position
 let snakeX = snake[0].x;
 let snakeY = snake[0].y;
 
 // track movement direction, update snake head accounting for motion
 if( d == "LEFT"){
    snakeX -= box;
    snakeHead.x = snakeX;
    snakeHead.y = snakeY}
 if( d == "UP"){
    snakeY -= box;
    snakeHead.x = snakeX;
    snakeHead.y = snakeY}
 if( d == "RIGHT"){
    snakeX += box;
    snakeHead.x = snakeX;
    snakeHead.y = snakeY}
 if( d == "DOWN"){
    snakeY += box;
    snakeHead.x = snakeX;
    snakeHead.y = snakeY}

let foodTouched = false;

for (var i = 0; i < 3; i++){    
  let coincidence = (snakeX == foodCoordsArr[i].x && snakeY == foodCoordsArr[i].y)
// when the snake occupyies the same, area as the food, it eats it at the [coincidence]
  if(coincidence){
    totalTouchesArr.push(spawnedFoodArr[i])
    foodTouched = true;
    // ********** consumedFood.push(spawnedFoodArr[i]);
    // console.log(`our index is ${i} and val = ` + foodValues[i]);
    score+= foodValues[i];
    // conditionals keep voices from overlapping on each other
    // PRIOR: compared image objects to trigger sound
    // if(spawnedFoodArr[i] == foodImg6){
        // ******* NOTE FOR MISSING ITEM PICKUP

       
    if(foodValues[i] == 50){
        // console.log('Grizzly acquired!')
        grizzlyGrabbed.play();
        makeSingleFood(i);
        // Add time delay to allow grizzly to finish her line when grabbed
        setTimeout(() => {
            checkForRareSpawnAudio(newSpawnVal);
        }, 1200); 
    } else if(snake.length % 30 == 0){
        bellyFull.play();
        // (don't play spawn sound for the combo announcement)
        // setTimeout(() => {
        //     checkForRareSpawnAudio(i);
        // }, 2500);
        makeSingleFood(i);
    }else if((totalTouchesArr.length % slipRate == 0)){
         // Deliberately make a slip every % X item so she goes through it, missing the item
        console.log(`missed on ${snake.length}`)
        score-= foodValues[i];
        consumedFood.pop(spawnedFoodArr[i]);
        confusedSound.play();
        // Maintain the snake size by removing item from snake arr
        snake.pop()
    } 
    else if (foodValues[i] == 25) {
        // console.log('ring acquired!')
        ringGrabbed.play();
        makeSingleFood(i);
        setTimeout(() => {
            checkForRareSpawnAudio(newSpawnVal);
        }, 200); 
    } else if(foodValues[i] == 10){
        // console.log('+1 shekel')
        shekelGrabbed.play();
        //NOTE: if you forget to make food, then the item will stay on the current square
        makeSingleFood(i);
        setTimeout(() => {
            checkForRareSpawnAudio(newSpawnVal);
        }, 1100); 
    } else {
        makeSingleFood(i);

    // conditionals for score benchmarks triggering different sounds
    // had to change from score measuring this chorus trigger to body-length causing trigger, 
        // Chorus plays on normal nom after 10+ dummies 
        if ((snake.length > 10) && (snake.length % 5 != 0)){
            let currentChorus = chorusSounds[Math.floor(Math.random()*chorusSounds.length)];
            currentChorus.play();
            setTimeout(() => {
                checkForRareSpawnAudio(newSpawnVal);
            }, 380); 
        } else if(snake.length % 5 == 0){
            let currentCombo = comboSounds[Math.floor(Math.random()*comboSounds.length)];
            currentCombo.play();
            setTimeout(() => {
                checkForRareSpawnAudio(newSpawnVal);
            }, 1100); 
        }
        else{
        let currentNom = nomSounds[Math.floor(Math.random()*nomSounds.length)];
            currentNom.play();
        setTimeout(() => {
                checkForRareSpawnAudio(newSpawnVal);
            }, 380); 
        };
    }
  } 
  }
  if(!foodTouched){
    // if the snake moves and doesn't eat we remove the tail to maintain the size and movement
    snake.pop();
};

// draw a new Head when snake eats the food
// if(foodTouched){
    let newHead = {
        x : snakeHead.x,
        y : snakeHead.y
        }
    // };

// game over conditions
// special conditional if [snake.length = 195] (13*15, which is all the squares minus one for the border of the play area
// filling all the boxes would force the following to become (else)
if(score >= specialVictoryScore || snake.length == 194){
    console.log(`Special win conditions completed; scored ${score}`);
    gameEnded = true;
    // stop the game from running (stop painting new canvases)
    clearInterval(game);
    // Victory audio cue
    superWin.play();
    setTimeout(function(){
    var specialWin = document.getElementById('special-win-container');
    var hideBtn = document.getElementById('hide-picture');
    var titleCard = document.getElementById('snake-title');
    var res = document.getElementById('results');
    res.innerHTML= `You won with ${score} points from ${consumedFood.length} items! (=^･ω･^=)`;
    res.style.display = "block";
    res.style.background = "#225";
    res.style.height = "96px"
    res.style.color = "gold";
    res.style.width= "474px";
    res.style.padding= "0px 5px";
    res.style.left= "63px";
    specialWin.style.display = "block";
    hideBtn.style.display = "block";
    hideBtn.innerHTML = "clear off picture";
    titleCard.style.backgroundColor = "#225";
    titleCard.style.color = "gold";
    titleCard.style.padding = "0 18px";
    titleCard.innerHTML = "Super special win!!!";
    let resetBtn = document.getElementById('reset-btn');
    resetBtn.style.outline= "2px solid black";
    resetBtn.style.top = "171px";
    resetBtn.style.width= "89px";
    }, 
    2490);
    // INC: causes of death would go in a conditinoal below
  } else if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
  console.log(`Final score of ${score}`);
// stop the game from running (stop painting new canvases)
  gameEnded = true;
  clearInterval(game);
  // score threshold for "victory condition")
  if(score < goodVictoryScore){
    // audio for bad-end death animation
    let currentDeath = deathSounds[Math.floor(Math.random()*deathSounds.length)];
    currentDeath.play();
    // Note that the TIMEOUT function is used here
    setTimeout(function(){
        var injury = document.getElementById('injury-container');
        var hideBtn = document.getElementById('hide-picture')
        var res = document.getElementById('results');
        var titleCard = document.getElementById('snake-title');
        res.innerHTML= `You only got ${score} points from ${consumedFood.length} items`;
        res.style.display = "block";
        injury.style.display = "block";
        hideBtn.style.display = "block";
        hideBtn.style.zIndex = "2";
        titleCard.style.color = "#225"
        titleCard.innerHTML = `Lose! (Try for ${goodVictoryScore}+)`;
        // "CAT-tastrophy"
        let resetBtn = document.getElementById('reset-btn');
        resetBtn.style.outline= "5px solid red";
        }, 
        // .44s time delay
        440);
  } else {
    victoryDeath.play();
    setTimeout(function(){
    var victory = document.getElementById('victory-container');
    var hideBtn = document.getElementById('hide-picture');
    var titleCard = document.getElementById('snake-title');
    var res = document.getElementById('results');
    res.innerHTML= `You scored ${score} points! And ate ${consumedFood.length} items!`;
    res.style.display = "block";
    res.style.border = "2px solid green";
    res.style.borderRadius = "9px";
    res.style.width= "472px";
    res.style.padding= "0px 10px";
    res.style.left= "64px";
    res.style.background = "#ddd";
    res.style.color = "#44b";
    res.style.fontSize = "41px";
    res.style.fontWeight = "600";
    victory.style.display = "block";

    hideBtn.innerHTML = "clear off picture";
    hideBtn.style.display = "block";
    hideBtn.style.zIndex = "2";
    titleCard.style.color = "#44b";
    titleCard.style.textAlign = "center";
    // below caused problems for position absolute
    // titleCard.style.padding = "8px 0";
    titleCard.innerHTML = "Win! (Try for 250+)";
    let resetBtn = document.getElementById('reset-btn');
    resetBtn.style.outline= "2px solid black";
    resetBtn.style.top = "162px";
    resetBtn.style.left = "242px";
    resetBtn.style.width= "126px";
    resetBtn.style.height= "30px";
    }, 
    3140);
  }
}
// move the newly generated head to the front of the snake body array
  snake.unshift(newHead);

// Draw the score
ctx.fillStyle = "white";
// changa one as the font family
ctx.font = "45px Changa one";
// content and positioning of the score counter
ctx.fillText(score,2.2*box,1.6*box);

// Draw food count (loot bag)
    if (consumedFood.length >= 99){
    ctx.fillStyle = "gold";    
    ctx.font = "50px Changa one";
    ctx.fontWeight = "700"
    ctx.fillText(99,620,76);
    }else{
    ctx.fillStyle = "red";
    // changa one as the font family
    ctx.font = "50px Changa one";
    ctx.fontWeight = "700"
    // content and positioning of the score counter
    ctx.fillText(consumedFood.length,620,76);
    }
};

// Adjust movement speed here (default 90)
let game = setInterval (draw, 90);

function hidePics(){
    var injury = document.getElementById('injury-container');
    var victory = document.getElementById('victory-container');
    var sWin = document.getElementById('special-win-container');
    var hideBtn = document.getElementById('hide-picture');
    // there's probably  better way to do this, but...
    if(injury.style.display == "block") {
        injury.style.display = "none";
        hideBtn.innerHTML = "Show pic";
    } else if(injury.style.display == "none"){
        injury.style.display = "block";
        hideBtn.innerHTML = "Hide pic";
    } 
    else if(victory.style.display == "block") {
        victory.style.display = "none";
        hideBtn.innerHTML = "Show pic";
    } else if(victory.style.display == "none"){
        victory.style.display = "block";
        hideBtn.innerHTML = "Hide pic";
    } 
    else if(sWin.style.display == "none") {
        sWin.style.display = "block";
        hideBtn.innerHTML = "Hide Win pic";
    } else {
        sWin.style.display = "none";
        hideBtn.innerHTML = "Show Win pic";
    }
}
||||||| merged common ancestors
=======
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

// chart showing score for items, 2 elements
var topKey = document.getElementById('topKey');
var bottomKey = document.getElementById('bottomKey');

function showScoreKey(){
    topKey.style.zIndex = "2";
    bottomKey.style.zIndex = "2";
}
function hideScoreKey(){
    topKey.style.zIndex = "-1";
    bottomKey.style.zIndex = "-1";
}

// victory score thresholds
const specialVictoryScore = 250;
const goodVictoryScore = 100;
// Make the standard unit for a square on the image
let box = 32;
// **************spawn restrictions******
// For full board
// let newfoodX = Math.floor(Math.random()* 17+1)*box;
// let newfoodY = Math.floor(Math.random()* 15+3)*box;
//  For no edge-spawns:
// let newfoodX = Math.floor(Math.random()* 15+2)*box;
// let newfoodY = Math.floor(Math.random()* 13+4)*box;
// will crash when these 9 boxes are occupied at the same time
function xSpawnLimit() {
    return Math.floor(Math.random()* 15+2)*box;
};
function ySpawnLimit() {
    return Math.floor(Math.random()* 13+4)*box;
};

// ratio for missing item pickup
let slipRate;
function getSlipRate() {
    return slipRate = Math.floor(Math.random()*7+9)
};

getSlipRate();
console.log("will miss every [" + slipRate + "] items");

// // ***** NEED WORK ON: 
// INC: save scores (top scoreres list) to local storage (maybe JSON.parse with local storage)
// ************************************

// make vars for image files
const ground = new Image();
ground.src = "../img/snakeground.png";
const gkPatch = new Image();
gkPatch.src = "../img/vectorIcons/gkPatchSmall.png";
// IMAGE RESIZING DOESN'T WORK FOR CANVAS ITEMS
// NEED TO BE RESIZED BEFOREHAND

// Food image variables
// Inc make food list and randomize
let [foodImg1, foodImg2, foodImg3, foodImg4, foodImg5, foodImg6] = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
foodImg1.src = "../../img/vectorIcons/eCap.png";
foodImg2.src= "../../img/vectorIcons/tData.png";
foodImg3.src= "../../img/vectorIcons/dCore.png";
foodImg4.src= "../../img/vectorIcons/sToken.png";
foodImg5.src= "../../img/vectorIcons/oRing.png";
foodImg6.src = "../img/grizzlyRun1.PNG";
// placeholder var for currently spawned food
let spawnedFood1 = new Image();
let spawnedFood2 = new Image();
let spawnedFood3 = new Image();
let spawnedFoodArr = [spawnedFood1, spawnedFood2, spawnedFood3]

var foodValue1 = 1;
var foodValue2 = 2;
var foodValue3 = 3;
var foodValues = [];

// cat images for the snake head and body
const head_cat = new Image();
head_cat.src = "../img/idwHead.png";
// body images for the running snake body
const dummy_cat1 = new Image();
dummy_cat1.src = "../img/runIDW1.PNG" 
const dummy_cat2 = new Image();
dummy_cat2.src = "../img/runIDW2.PNG" 
const dummy_cat3 = new Image();
dummy_cat3.src = "../img/runIDW3.PNG" 
const dummy_cat4 = new Image();
dummy_cat4.src = "../img/runIDW4.PNG" 
const dummy_cat5 = new Image();
dummy_cat5.src = "../img/runIDW5.PNG" 
const dummy_cat6 = new Image();
dummy_cat6.src = "../img/runIDW6.PNG" 
// extra images
const plusS = new Image(); 
plusS.src = "../img/vectorIcons/plusSign.png";

// load audio files
// destructuring assignment **********
let [dead1, dead2, dead3, dead4, dead5] = [new Audio(), new Audio(), new Audio(), new Audio(), new Audio()];

let eat1 = new Audio();
let eat2 = new Audio();
let eat3 = new Audio();

let [comboEaten1, comboEaten2, comboEaten3, comboEaten4, comboEaten5] = [new Audio(), new Audio(), new Audio(), new Audio(), new Audio()];
let bellyFull = new Audio();

let [chorus1, chorus2, chorus3, chorus4, chorus5, chorus6] = [new Audio(), new Audio(), new Audio(), new Audio(), new Audio(), new Audio()]

let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

let victoryDeath = new Audio();
let superWin = new Audio();

dead1.src = "../aud/deathNyan.wav";
dead2.src = "../aud/fatalityChorus.wav";
dead3.src = "../aud/gameShowFail.wav";
dead4.src = "../aud/howcouldthishappenShort.wav";
dead5.src = "../aud/fatalityChorus.wav";
eat1.src = "../aud/nyan1.wav";
eat2.src = "../aud/nyan1.wav";
eat3.src = "../aud/nyan2.wav";
// bootlegging array randomization by declaring the same-source clip multiple times...
// eat4.src = "../aud/nyan2.wav";
comboEaten1.src = "../aud/ChorusToasty.wav";
comboEaten2.src = "../aud/ChorusToasty.wav";
comboEaten3.src = "../aud/airHornShort.wav";
comboEaten4.src = "../aud/ChorusToasty.wav";
comboEaten5.src = "../aud/womboCombo1.wav";
// When big combo is reached:
bellyFull.src = "../aud/imfullNya.wav";
// winning death sounds
victoryDeath.src = "../aud/ahhhClip.wav";
superWin.src = "../aud/mgsWaOh.wav";

// chours sounds for eating with a big train
chorus1.src = "../aud/nyan3chorus2.wav";
chorus2.src = "../aud/nyan1.wav";
chorus3.src = "../aud/nyan3echo3.wav";
chorus4.src = "../aud/chorusOmNya2.wav";
chorus5.src = "../aud/chorusNightmareOmNya.wav";

up.src = "../aud/teleport1.wav";
right.src = "../aud/teleport2.wav";
down.src = "../aud/teleport3.wav";
left.src = "../aud/teleport4.wav";

// *******************odd event clips **************************
let wScream = new Audio();
wScream.src = "../aud/wilhelmScream.mp3";
let grizzlySpawn = new Audio();
grizzlySpawn.src= "../aud/araShikikanGrizzly.wav";
let grizzlyGrabbed = new Audio();
grizzlyGrabbed.src= "../aud/grizzlyMagnum.wav";
let ringSpawn = new Audio();
ringSpawn.src = "../aud/happyIDW.wav";
let ringGrabbed = new Audio();
ringGrabbed.src =  "../aud/sonicRing1.wav";
let shekelGrabbed = new Audio();
shekelGrabbed.src = "../aud/shekels1.wav";
let confusedSound = new Audio();
confusedSound.src = "../aud/confusedCatSound.wav";

// make an array of eating possibilities
let nomSounds = [eat1, eat2, eat3];
// death possibilities array
let deathSounds = [dead1, dead2, dead3, dead4, dead5]
// combo sound bytes
let comboSounds = [comboEaten1, comboEaten2, comboEaten3, comboEaten4, comboEaten5]
// chorus sounds array
let chorusSounds =  [chorus1, chorus2, chorus3, chorus4, chorus5]
// array for food consumed
let consumedFood = [];
// Placeholder for touches to track slip rate
let totalTouchesArr = [];

// create the snake from an array
// set starting position with x/y coords
let snake = [{
    x : 5 * box,
    y : 10 * box
  }];
// instantiate snakeHead var for later reference
let snakeHead = snake[0]

let score = 0;

//control the snake with arrow keys and appropriate key-codes
let d;
// Instantiate a switch to flag if game is ended or not (to disable movement key sounds)
let gameEnded = false;

// Objects to contain coordinates of foods
let foodCoords1 = {};
let foodCoords2 = {};
let foodCoords3 = {};
let foodCoordsArr = [foodCoords1, foodCoords2, foodCoords3]

// give a placeholder for the newly spawned item's point-value
let newSpawnVal;

// Make an array for the food item images then randomly select through them based on a dice roll
// Control item tier spawn rate / item quality 
let foodItems = [foodImg1, foodImg2, foodImg3, foodImg4, foodImg5, foodImg6];

    // Randomize the food value, and assign it to its associated image
function randomizeFood1(){
    let diceRoll = Math.ceil(Math.random()*20);
    if(diceRoll == 20){
        spawnedFood1 = foodImg6;
        foodValue1 = 50;
    }else if(diceRoll >= 18){
        spawnedFood1 = foodImg5;
        foodValue1 = 25;
    }else if(diceRoll >= 16){
        spawnedFood1 = foodImg4;
        foodValue1 = 10;
    }else if(diceRoll >= 13){
        spawnedFood1 = foodImg3;
        foodValue1 = 5;
    }else if(diceRoll >= 8){
        spawnedFood1 = foodImg2;
        foodValue1 = 2;
    }else{
        spawnedFood1 = foodImg1;
        foodValue1 = 1;
    }
    // (slice out original value for 0 index from array?)
    // do for each of the randomizers
    foodValues[0] = foodValue1;
}
function randomizeFood2(){
    let diceRoll = Math.ceil(Math.random()*20);
    if(diceRoll == 20){
        spawnedFood2 = foodImg6;
        foodValue2 = 50;
    }else if(diceRoll >= 18){
        spawnedFood2 = foodImg5;
        foodValue2 = 25;
    }else if(diceRoll >= 16){
        spawnedFood2 = foodImg4;
        foodValue2 = 10;
    }else if(diceRoll >= 13){
        spawnedFood2 = foodImg3;
        foodValue2 = 5;
    }else if(diceRoll >= 8){
        spawnedFood2 = foodImg2;
        foodValue2 = 2;
    }else{
        spawnedFood2 = foodImg1;
        foodValue2 = 1;
    }
    foodValues[1] = foodValue2;
}
function randomizeFood3(){
    let diceRoll = Math.ceil(Math.random()*20);
    if(diceRoll == 20){
        spawnedFood3 = foodImg6;
        foodValue3 = 50;
    }else if(diceRoll >= 18){
        spawnedFood3 = foodImg5;
        foodValue3 = 25;
    }else if(diceRoll >= 16)
    {
        spawnedFood3 = foodImg4;
        foodValue3 = 10;
    }else if(diceRoll >= 13){
        spawnedFood3 = foodImg3;
        foodValue3 = 5;
    }else if(diceRoll >= 8){
        spawnedFood3 = foodImg2;
        foodValue3 = 2;
    }else{
        spawnedFood3 = foodImg1;
        foodValue3 = 1;
    }
    // arr.push(val) not needed for this case since we wanna keep the length the same, so just reassign the contained vals
    // foodValues.push(foodValue3);
    // Below: replacement via reassignment
    foodValues[2] = foodValue3;
}

// randomizeFood1(foodValue1);
// randomizeFood2(foodValue2);
// randomizeFood3(foodValue3);

// function to make food coordinates (Note, the coords actually have to be drawn within the draw canvas function to appear)

function makeAllFood(){
  for (var i = 0; i < 3; i++){
    while (true) {
        let flipped = false;
        let newfoodX = xSpawnLimit();
        let newfoodY = ySpawnLimit();
        foodCoordsArr[i] = {
        x: newfoodX,
        y: newfoodY
        };
        snake.forEach(function (dummy){
            if((dummy.x == foodCoordsArr[i].x) && (dummy.y == foodCoordsArr[i].y)){
                // console.log(`food failed to spawn on dummy-train at X: ${foodCoordsArr[i].x} Y: ${foodCoordsArr[i].y}`);
                flippedd = true;
            } else if((foodCoordsArr[i].x == snakeHead.x) && (foodCoordsArr[i].y == snakeHead.y)){
            // console.log(`food Spawned on head at X: ${foodCoordsArr[i].x} Y: ${foodCoordsArr[i].y}`);
                flippedd = true;
                // wScream.play();
            }
        });
        // Make sure the food does not spawn on other food by checking x/y coords
        if(i == 1){
            if((foodCoordsArr[0].x == foodCoordsArr[1].x) && (foodCoordsArr[0].y == foodCoordsArr[1].y)){
                // console.log('second food item spawned first! Re-rolling');
                flipped = true;
            }
        } else if (i == 2){
            if(((foodCoordsArr[0].x == foodCoordsArr[2].x) && (foodCoordsArr[0].y == foodCoordsArr[2].y)) || 
            ((foodCoordsArr[1].x == foodCoordsArr[2].x) && (foodCoordsArr[1].y == foodCoordsArr[2].y)) || ((foodCoordsArr[0].x == foodCoordsArr[1].x) && (foodCoordsArr[0].y == foodCoordsArr[1].y))
            ){
                // console.log('third item spawned on prior food! Re-rolling');
                flipped = true;
            }
        }
    // note: food can still spawn on the same coords after this
            if(!flipped){
                    break;
                }
            };
      }
    // for (var i = 0; i < 3; i++){
        randomizeFood1();
        randomizeFood2();
        randomizeFood3();
    // }
};
// make initial food item to start with below
makeAllFood();

function checkForRareSpawnAudio(val) {
    // console.log(`value of ${val} in ${foodValues}`);
    if (val == 50){
        console.log('grizzly appears!');
        grizzlySpawn.play();
    } else if (val == 25){
        console.log('ring appears!');
        ringSpawn.play();
    }
}

function generateFoodVal(i) {
    if (i == 0){
      randomizeFood1();
      return foodValues[0];
    } else if ( i == 1){
      randomizeFood2();
      return foodValues[1];}
      else {
      randomizeFood3();
      return foodValues[2]}
  };


// only make one food item instead of all at once
function makeSingleFood(i){
    console.log(`loot bag length: ${consumedFood.length}`)
  while (true) {
        let flipped = false;
        let newfoodX = xSpawnLimit();
        let newfoodY = ySpawnLimit();

        let foodObj = {
        x: newfoodX,
        y: newfoodY
        };
        
        foodCoordsArr.splice(i, 1, foodObj);
    
        // check for spawning on the snake
        snake.forEach(function (dummy){
            if((dummy.x == foodCoordsArr[i].x) && (dummy.y == foodCoordsArr[i].y)){
                console.log('spawned on dummy train');
                console.log("dummy X : " + dummy.x + " and " + foodCoordsArr[i].x);
                console.log("dummy y : " + dummy.x + " and " + foodCoordsArr[i].y);
                flipped = true;
            } else if((snakeHead.x == foodCoordsArr[i].x) && (snakeHead.y == foodCoordsArr[i].y)){
                console.log('spawned on head');
                // wScream.play();
                flipped = true;
            }
            
        });

        // NOT IMPLEMENTED:
        // Currently allows food to spawn on top of one another, targeting is acting too weird for me to fix

        // check the coords of the food objects other than newly spawned one so they don't overlap
        // if the current object is equal to either of the others, so if  foodCoordsArr[i] == foodCoordsArr[1] || foodCoordsArr[i] == foodCoordsArr[2]
        // console.log(i)
        // if (i == 0){
        //     if((foodCoordsArr[i].x == foodCoordsArr[1].x) || (foodCoordsArr[i].x == foodCoordsArr[2].x)){
        //         console.log("food idx-0 spawned on existing item");
        //         flipped = true ;
        //     }
        // } else if (i == 1){
        //     if((foodCoordsArr[i].x == foodCoordsArr[0].x ) || (foodCoordsArr[i].x == foodCoordsArr[2].x)){
        //         console.log("food idx-1 spawned on existing item");
        //         flipped = true ;
        //     }
        // } else if (i == 2){
        //     if((foodCoordsArr[i].x == foodCoordsArr[0].x) || (foodCoordsArr[i].x == foodCoordsArr[1].x)){
        //         console.log("food idx-2 spawned on existing item");
        //         flipped = true ;
        //     }
        // }

        if (!flipped){
            consumedFood.push(spawnedFoodArr[i]);

            let newVal = generateFoodVal(i);
            newSpawnVal = newVal
            console.log(`new value of ${newVal}`);
            // checkForRareSpawnAudio(newVal);
                // generate food val (i)???
            break;
        }
      };  
};

// *Below circumvented by preserving makefood() from above
// initialize food to field
// for (var i = 0; i < 3; i++){
//   makeSingleFood(i);
//   generateFoodVal(i);
// }

// NOT IMPLEMENTED: wrap key controls in boolean switch for winning or losing to disable *
// ***********************************
// make an event on keydown
document.addEventListener("keydown",direction);
// flesh out what happens when each arrow key is pressed
function direction(event){
    let key = event.keyCode;
    //  the && exceptions prohibit it from turning the opposite direction.
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
};
// check for a death collision through a function
function collision(head,array){
  for(let i = 0; i < array.length; i++){
    // see if the head hits the snake body
    // **** might be useful for keeping food from spawning on the body with a conditional in food generation
      if(head.x == array[i].x && head.y == array[i].y){
          return true;
      }
  }
  return false;
}

// "draw" everything to the canvas with a draw function
function draw(){
// actively draw consumed item history (loot bag) on the side
for(let i=0; i < consumedFood.length; i++){
    if(i < 15){
    ctx.drawImage(dummy_cat1, 608, (i*32)+96, box, box);
    } else if(i < 29){
    ctx.drawImage(dummy_cat1, 640, ([i-15]*32)+96, box, box);
    } else {
    // placeholder for ellipsis, 15 and 29 above thresholds
    // i-15 (29 for the second leaves one space for the plus sign ender)
    ctx.drawImage (plusS, 642, 544, box, 28);
    }
}
// draw the play area image 
  ctx.drawImage(ground,0,0);
//   **************************
//   draw GK patch as loot-bag head
  ctx.drawImage(gkPatch, 607, 0);
//   draw the score box
  ctx.fillStyle = "black";
  ctx.fillRect(619, 40, 51, 40);

  for(let i=0; i < snake.length; i++){
    // Make the cell contain a dummy if after the head
    if(i==0){
      ctx.drawImage(head_cat,  snake[i].x, snake[i].y, box, box);
    } else if ( ( (i+6)%6 ) == 1) {
        // use modulo to assign frames of run animation
      ctx.drawImage(dummy_cat1, snake[i].x, snake[i].y, box, box);
    } else if ( ( (i+6)%6 ) == 2) {
      ctx.drawImage(dummy_cat2, snake[i].x, snake[i].y, box, box);
    }
    else if ( ( (i+6)%6 ) == 3) {
      ctx.drawImage(dummy_cat3, snake[i].x, snake[i].y, box, box);
    }
    else if ( ( (i+6)%6 ) == 4) {
      ctx.drawImage(dummy_cat4, snake[i].x, snake[i].y, box, box);
    }
    else if ( ( (i+6)%6 ) == 5) {
      ctx.drawImage(dummy_cat5, snake[i].x, snake[i].y, box, box);
      }
    else {
      ctx.drawImage(dummy_cat6, snake[i].x, snake[i].y, box, box);
    }
  }

//   ***********draw starter food images *********
  ctx.drawImage(spawnedFood1, foodCoordsArr[0].x, foodCoordsArr[0].y, 32, 32);
  ctx.drawImage(spawnedFood2, foodCoordsArr[1].x, foodCoordsArr[1].y, 32, 32);
  ctx.drawImage(spawnedFood3, foodCoordsArr[2].x, foodCoordsArr[2].y, 32, 32);

 // old head position
 let snakeX = snake[0].x;
 let snakeY = snake[0].y;
 
 // track movement direction, update snake head accounting for motion
 if( d == "LEFT"){
    snakeX -= box;
    snakeHead.x = snakeX;
    snakeHead.y = snakeY}
 if( d == "UP"){
    snakeY -= box;
    snakeHead.x = snakeX;
    snakeHead.y = snakeY}
 if( d == "RIGHT"){
    snakeX += box;
    snakeHead.x = snakeX;
    snakeHead.y = snakeY}
 if( d == "DOWN"){
    snakeY += box;
    snakeHead.x = snakeX;
    snakeHead.y = snakeY}

let foodTouched = false;

for (var i = 0; i < 3; i++){    
  let coincidence = (snakeX == foodCoordsArr[i].x && snakeY == foodCoordsArr[i].y)
// when the snake occupyies the same, area as the food, it eats it at the [coincidence]
  if(coincidence){
    totalTouchesArr.push(spawnedFoodArr[i])
    foodTouched = true;
    // ********** consumedFood.push(spawnedFoodArr[i]);
    // console.log(`our index is ${i} and val = ` + foodValues[i]);
    score+= foodValues[i];
    // conditionals keep voices from overlapping on each other
    // PRIOR: compared image objects to trigger sound
    // if(spawnedFoodArr[i] == foodImg6){
        // ******* NOTE FOR MISSING ITEM PICKUP

       
    if(foodValues[i] == 50){
        // console.log('Grizzly acquired!')
        grizzlyGrabbed.play();
        makeSingleFood(i);
        // Add time delay to allow grizzly to finish her line when grabbed
        setTimeout(() => {
            checkForRareSpawnAudio(newSpawnVal);
        }, 1200); 
    } else if(snake.length % 30 == 0){
        bellyFull.play();
        // (don't play spawn sound for the combo announcement)
        // setTimeout(() => {
        //     checkForRareSpawnAudio(i);
        // }, 2500);
        makeSingleFood(i);
    }else if((totalTouchesArr.length % slipRate == 0)){
         // Deliberately make a slip every % X item so she goes through it, missing the item
        console.log(`missed on ${snake.length}`)
        score-= foodValues[i];
        consumedFood.pop(spawnedFoodArr[i]);
        confusedSound.play();
        // Maintain the snake size by removing item from snake arr
        snake.pop()
    } 
    else if (foodValues[i] == 25) {
        // console.log('ring acquired!')
        ringGrabbed.play();
        makeSingleFood(i);
        setTimeout(() => {
            checkForRareSpawnAudio(newSpawnVal);
        }, 200); 
    } else if(foodValues[i] == 10){
        // console.log('+1 shekel')
        shekelGrabbed.play();
        //NOTE: if you forget to make food, then the item will stay on the current square
        makeSingleFood(i);
        setTimeout(() => {
            checkForRareSpawnAudio(newSpawnVal);
        }, 1100); 
    } else {
        makeSingleFood(i);

    // conditionals for score benchmarks triggering different sounds
    // had to change from score measuring this chorus trigger to body-length causing trigger, 
        // Chorus plays on normal nom after 10+ dummies 
        if ((snake.length > 10) && (snake.length % 5 != 0)){
            let currentChorus = chorusSounds[Math.floor(Math.random()*chorusSounds.length)];
            currentChorus.play();
            setTimeout(() => {
                checkForRareSpawnAudio(newSpawnVal);
            }, 380); 
        } else if(snake.length % 5 == 0){
            let currentCombo = comboSounds[Math.floor(Math.random()*comboSounds.length)];
            currentCombo.play();
            setTimeout(() => {
                checkForRareSpawnAudio(newSpawnVal);
            }, 1100); 
        }
        else{
        let currentNom = nomSounds[Math.floor(Math.random()*nomSounds.length)];
            currentNom.play();
        setTimeout(() => {
                checkForRareSpawnAudio(newSpawnVal);
            }, 380); 
        };
    }
  } 
  }
  if(!foodTouched){
    // if the snake moves and doesn't eat we remove the tail to maintain the size and movement
    snake.pop();
};

// draw a new Head when snake eats the food
// if(foodTouched){
    let newHead = {
        x : snakeHead.x,
        y : snakeHead.y
        }
    // };

// game over conditions
// special conditional if [snake.length = 195] (13*15, which is all the squares minus one for the border of the play area
// filling all the boxes would force the following to become (else)
if(score >= specialVictoryScore || snake.length == 194){
    console.log(`Special win conditions completed; scored ${score}`);
    gameEnded = true;
    // stop the game from running (stop painting new canvases)
    clearInterval(game);
    // Victory audio cue
    superWin.play();
    setTimeout(function(){
    var specialWin = document.getElementById('special-win-container');
    var hideBtn = document.getElementById('hide-picture');
    var titleCard = document.getElementById('snake-title');
    var res = document.getElementById('results');
    res.innerHTML= `You won with ${score} points from ${consumedFood.length} items! (=^･ω･^=)`;
    res.style.display = "block";
    res.style.background = "#225";
    res.style.height = "96px"
    res.style.color = "gold";
    res.style.width= "474px";
    res.style.padding= "0px 5px";
    res.style.left= "63px";
    specialWin.style.display = "block";
    hideBtn.style.display = "block";
    hideBtn.innerHTML = "clear off picture";
    titleCard.style.backgroundColor = "#225";
    titleCard.style.color = "gold";
    titleCard.style.padding = "0 18px";
    titleCard.innerHTML = "Super special win!!!";
    let resetBtn = document.getElementById('reset-btn');
    resetBtn.style.outline= "2px solid black";
    resetBtn.style.top = "171px";
    resetBtn.style.width= "89px";
    }, 
    2490);
    // INC: causes of death would go in a conditinoal below
  } else if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
  console.log(`Final score of ${score}`);
// stop the game from running (stop painting new canvases)
  gameEnded = true;
  clearInterval(game);
  // score threshold for "victory condition")
  if(score < goodVictoryScore){
    // audio for bad-end death animation
    let currentDeath = deathSounds[Math.floor(Math.random()*deathSounds.length)];
    currentDeath.play();
    // Note that the TIMEOUT function is used here
    setTimeout(function(){
        var injury = document.getElementById('injury-container');
        var hideBtn = document.getElementById('hide-picture')
        var res = document.getElementById('results');
        var titleCard = document.getElementById('snake-title');
        res.innerHTML= `You only got ${score} points from ${consumedFood.length} items`;
        res.style.display = "block";
        injury.style.display = "block";
        hideBtn.style.display = "block";
        hideBtn.style.zIndex = "2";
        titleCard.style.color = "#225"
        titleCard.innerHTML = `Lose! (Try for ${goodVictoryScore}+)`;
        // "CAT-tastrophy"
        let resetBtn = document.getElementById('reset-btn');
        resetBtn.style.outline= "5px solid red";
        }, 
        // .44s time delay
        440);
  } else {
    victoryDeath.play();
    setTimeout(function(){
    var victory = document.getElementById('victory-container');
    var hideBtn = document.getElementById('hide-picture');
    var titleCard = document.getElementById('snake-title');
    var res = document.getElementById('results');
    res.innerHTML= `You scored ${score} points! And ate ${consumedFood.length} items!`;
    res.style.display = "block";
    res.style.border = "2px solid green";
    res.style.borderRadius = "9px";
    res.style.width= "472px";
    res.style.padding= "0px 10px";
    res.style.left= "64px";
    res.style.background = "#ddd";
    res.style.color = "#44b";
    res.style.fontSize = "41px";
    res.style.fontWeight = "600";
    victory.style.display = "block";

    hideBtn.innerHTML = "clear off picture";
    hideBtn.style.display = "block";
    hideBtn.style.zIndex = "2";
    titleCard.style.color = "#44b";
    titleCard.style.textAlign = "center";
    // below caused problems for position absolute
    // titleCard.style.padding = "8px 0";
    titleCard.innerHTML = "Win! (Try for 250+)";
    let resetBtn = document.getElementById('reset-btn');
    resetBtn.style.outline= "2px solid black";
    resetBtn.style.top = "162px";
    resetBtn.style.left = "242px";
    resetBtn.style.width= "126px";
    resetBtn.style.height= "30px";
    }, 
    3140);
  }
}
// move the newly generated head to the front of the snake body array
  snake.unshift(newHead);

// Draw the score
ctx.fillStyle = "white";
// changa one as the font family
ctx.font = "45px Changa one";
// content and positioning of the score counter
ctx.fillText(score,2.2*box,1.6*box);

// Draw food count (loot bag)
    if (consumedFood.length >= 99){
    ctx.fillStyle = "gold";    
    ctx.font = "50px Changa one";
    ctx.fontWeight = "700"
    ctx.fillText(99,620,76);
    }else{
    ctx.fillStyle = "red";
    // changa one as the font family
    ctx.font = "50px Changa one";
    ctx.fontWeight = "700"
    // content and positioning of the score counter
    ctx.fillText(consumedFood.length,620,76);
    }
};

// Adjust movement speed here (default 90)
let game = setInterval (draw, 90);

function hidePics(){
    var injury = document.getElementById('injury-container');
    var victory = document.getElementById('victory-container');
    var sWin = document.getElementById('special-win-container');
    var hideBtn = document.getElementById('hide-picture');
    // there's probably  better way to do this, but...
    if(injury.style.display == "block") {
        injury.style.display = "none";
        hideBtn.innerHTML = "Show pic";
    } else if(injury.style.display == "none"){
        injury.style.display = "block";
        hideBtn.innerHTML = "Hide pic";
    } 
    else if(victory.style.display == "block") {
        victory.style.display = "none";
        hideBtn.innerHTML = "Show pic";
    } else if(victory.style.display == "none"){
        victory.style.display = "block";
        hideBtn.innerHTML = "Hide pic";
    } 
    else if(sWin.style.display == "none") {
        sWin.style.display = "block";
        hideBtn.innerHTML = "Hide Win pic";
    } else {
        sWin.style.display = "none";
        hideBtn.innerHTML = "Show Win pic";
    }
}
>>>>>>> afc08aded728b7c82f6b18fcb6ae4b01672f99b4
