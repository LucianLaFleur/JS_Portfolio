const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');
// Second canvas blur problem unresolved
// const lootCvs = document.getElementById('lootBag');
// const lootCtx = lootCvs.getContext('2d');
// lootCvs.width = 1600;
// lootCvs.height = 1600;
// lootCtx.style.width = "100px";
// lootCtx.style.height = "100px";


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


// // ***** NEED WORK ON: 
// INC: save scores (top scoreres list) to local storage (maybe JSON.parse with local storage)
// counter above loot bag  (like counter for score)
//  similar to [Changa] drawing the score to canvas 
// consumedItems.length instead of score
// ************************************
// Dropdown of LI's, which has an image and tells score value
// *How draw-image works: ctx.drawImage(imageName, X, Y, Width, Height);
// no units are needed when declaring the positioning

// Make the standard unit
let box = 32;
// ctx.fillStyle = "black";

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
let spawnedFood = new Image();
let foodValue = 0;

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

//  after 5 make chours sounds for eating
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

// make an array of eating possibilities
let nomSounds = [eat1, eat2, eat3];
// death possibilities array
let deathSounds = [dead1, dead2, dead3, dead4, dead5]
// combo sound bytes
let comboSounds = [comboEaten1, comboEaten2, comboEaten3, comboEaten4]
// chorus sounds array
let chorusSounds =  [chorus1, chorus2, chorus3, chorus4, chorus5]
// array for food consumed
let consumedFood = [];

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

let newfoodObject = {};

// Make an array for the food item images then randomly select through them based on a dice roll
// Control item tier spawn rate / item quality 
let foodItems = [foodImg1, foodImg2, foodImg3, foodImg4, foodImg5, foodImg6];
function randomizeFood(){
    let diceRoll = Math.ceil(Math.random()*20);
    if(diceRoll == 20){
        spawnedFood = foodImg6;
        foodValue = 50;
    }else if(diceRoll >= 18){
        spawnedFood = foodImg5;
        foodValue = 25;
    }else if(diceRoll >= 16)
    {
        spawnedFood = foodImg4;
        foodValue = 10;
    }else if(diceRoll >= 13){
        spawnedFood = foodImg3;
        foodValue = 5;
    }else if(diceRoll >= 8){
        spawnedFood = foodImg2;
        foodValue = 2;
    }else{
        spawnedFood = foodImg1;
        foodValue = 1;
    }
}

randomizeFood();
// function to make food coordinates (Note, the coords actually have to be drawn within the draw canvas function to appear)
function makeFood(){
 while (true) {
    let flipped = false;
    let newfoodX = xSpawnLimit();
    let newfoodY = ySpawnLimit();
    newfoodObject = {
    x: newfoodX,
    y: newfoodY
    };
    snake.forEach(function (dummy){
        if((dummy.x == newfoodObject.x) && (dummy.y == newfoodObject.y)){
            console.log(`food failed to spawn on dummy-train at X: ${newfoodObject.x} Y: ${newfoodObject.y}`);
            flipped = true;
        } else if((newfoodObject.x == snakeHead.x) && (newfoodObject.y == snakeHead.y)){
        console.log(`food Spawned on head at X: ${newfoodObject.x} Y: ${newfoodObject.y}`);
            flipped = true;
            wScream.play();
        }
    });
    if(!flipped){
        // ctx.drawImage(spawnedFood, newfoodObject.x, newfoodObject.y, 32, 32);
        console.log('food coords generated successfully');
        // randomize the food selected from the array each time food is generated
        randomizeFood();
            break;
        }
    };
    // console.log('food spawned successfully');
    // ctx.drawImage(foodImg, newfoodObject.x, newfoodObject.y, 32, 32)
};
// make initial food item to start with below
makeFood();

// wrap in boolean switch for winning or losing to disable *
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

// check for collision through a function
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
    if(i==0){
    ctx.drawImage(consumedFood[i], 608, 96, box, box)
    } else if(i < 15){
    ctx.drawImage(consumedFood[i], 608, (i*32)+96, box, box);
    } else if(i < 29){
    ctx.drawImage(consumedFood[i], 640, ([i-15]*32)+96, box, box);
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
//   ***********draw starter food image (always starts out low)*********
  ctx.drawImage(spawnedFood, newfoodObject.x, newfoodObject.y, 32, 32);

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

let coincidence = (snakeX == newfoodObject.x && snakeY == newfoodObject.y)
// when the snake occupyies the same, area as the food, it eats it at the [coincidence]
  if(coincidence){
    // ******* OR ********************
    // add the item to the array with "push"
    // .unshift can visually show a difference here....
    consumedFood.push(spawnedFood);

    score+= foodValue;
    // conditionals keep voices from overlapping on each other
    if(spawnedFood == foodImg6){
        // console.log('Grizzly acquired!')
        grizzlyGrabbed.play();
        makeFood();
    } else if (spawnedFood == foodImg5) {
        // console.log('ring acquired!')
        ringGrabbed.play();
        makeFood();
    } else if(spawnedFood == foodImg4){
        // console.log('+1 shekel')
        shekelGrabbed.play();
        //NOTE: if you forget to make food, then the item will stay on the current square
        makeFood();
    } else {
    // if nothing special was consumed, generate random item and see if special thing was generated
        makeFood();
        if (spawnedFood == foodImg6){
            console.log('grizzly appears!')
            grizzlySpawn.play();
        }else if(spawnedFood == foodImg5){
            // console.log('ring appears!')
            ringSpawn.play();
        }

//  ************ check if special loot was spawned to play that sound

    // conditionals for score benchmarks triggering different sounds
    // had to change from score measuring this chorus trigger to body-length causing trigger, 
        else if ((snake.length > 10) && (snake.length % 5 != 0)){
            let currentChorus = chorusSounds[Math.floor(Math.random()*chorusSounds.length)];
            currentChorus.play();
            // makeFood();
        } else if(snake.length % 20 == 0){
            bellyFull.play();
            // makeFood();
        } else if(snake.length % 5 == 0){
            // randomly generate an index, then use it to target an item in the array of sounds to choose from
            let currentCombo = comboSounds[Math.floor(Math.random()*comboSounds.length)];
            currentCombo.play();
            // makeFood();
        }
        else{
        let currentNom = nomSounds[Math.floor(Math.random()*nomSounds.length)];
        currentNom.play();
        // makeFood();
        };
    }
// end of special conbo sound conditions 
// below "else" is when there's no collision with the food item
  }else{
      // if the snake moves and doesn't eat we remove the tail to maintain the size and movement
      snake.pop();
  }
 
// add new Head when snake eats the food
let newHead = {
  x : snakeHead.x,
  y : snakeHead.y
}

// game over conditions
// can make a special conditional if [snake.length = 195] (13*15, which is all the squares minus one for the border of the play area
// filling all the boxes would force the following to become (else)SS
if(score >= specialVictoryScore || snake.length == 194){
    console.log(`Special win conditions completed; scored ${score}`);
    
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
   
//  ** junk not implemented yet**

// else if(i == (Math.floor(Math.random()*10))) {
//     // Iterate this out as a switch so you can add a custom audio cue
//     ctx.drawImage(grizzly, snake[i].x, snake[i].y, box, box);

// testing for random num generation 7 times
// for (var i = 1; i < 8; i++) console.log((Math.floor(Math.random()*6))+3);

        //  TEST ********************
    // snake.forEach(function (dummy, idx) {
    //     console.log(`Dummy ${idx} X coord: ${dummy.x}`);
    //     console.log(`Dummy ${idx} Y coord: ${dummy.y}`);
    //     if(idx == (snake.length - 1)){
    //         console.log('End of dummy conga line')
    //     }
    // });

    // see what's occupied where (debugging purposes)
// function checkOccupation() {
//     let snakeBody = [];
//     snake.forEach(function (dummy, idx) {
//         // console.log(`${idx}: ${dummy.x} ${dummy.y} `);
//         snakeBody.unshift(dummy);
//         if(idx == (snake.length - 1)){
//             console.log('End of dummy conga line')
//             console.log(`food x at ${food.x} and y at ${food.y}`)
//             console.log(snakeBody);
//         };
//         if(food.x == dummy.x && food.y == dummy.y){
//             console.log('*****food generated on  dummy train!!!!')
//         }
//     })
//     };