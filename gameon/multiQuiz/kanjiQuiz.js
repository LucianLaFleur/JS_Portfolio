// INC adjust timer in its own test file, faster rendering, random target item of a target width, see if it matches....
// Render cursor of fized width to go through it by adjusting left margin
// make timer bar of fixed width

// OVERHAUL 1 : Slime-smasher
// Overhaul ??? : Re-skin for de-structing T-droids
// make a score of slime's health bar, cut it with each correct answer, as if you hit the punch button

// Important variables
const questionTime = 10;
// size of timer bar
const gaugeWidth = 250; // 250px width
const gaugePortion = gaugeWidth / questionTime;

//make vars for all elements (starting with title card)
const slime = document.getElementById("slime");
const slimeBG = document.getElementById("slime-wtbg");
const healthBar = document.getElementById("slime-health");
const axe = document.getElementById("axeVector");
const hitMsg = document.getElementById("hit-msg");
const testBtns = document.getElementById("testBtns");

const gameContainer = document.getElementById("gameContainer");
const startImg = document.getElementById("titleImg");
const titleIcon = document.getElementById("titleIcon2");
const titleIcon2 = document.getElementById("titleIcon");
const titleBtns = document.getElementById("titleBtns");
const titleBackBtn = document.getElementById("titleBackBtn");
const titleDropdownBtn = document.getElementById("titeDropdownBtn");
const startButton = document.getElementById("start");
// vars for quiz cards
const quizCards = document.getElementById("quizCards");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
// Declared a fourth choice below ****************
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGaugeFiller = document.getElementById("timeGaugeFiller");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


var vueOne = new Vue({
    el:'#vue-app',
    data:{
        // health percentage of the slime
        health: 100,
        // switch for ending the battle with the slime
        ended: false,
        //   make a switch to hide damage dealt message when no attack has yet been done
        punched: false,
        // Minimum and maximum swing damage
        minSwingDmg: 3,
        maxSwingDmg: 7,
        //   make a bumper to store damage from dealt attack
        bumper: 0,
        responseTimeBonus: 1,
        // placeholder for total damage dealt *** needs local storage
        totalDmgDealt: 0,
        // INC: number of slimes defeated *** needs local storage
            // Incomplete: time-responsive dialogue messages
        // Strong hit and weak hit used as dialogue triggers
        strongHit: false,
        normHit: false,
        weakHit: false
    },
    methods: {

    scoreFromResponseTime: function() {
        if(count <= 3){
            responseTimeBonus = 3;
            strongHit = true;
            console.log("quick bonus!");
        } else if (count <= 6){
            responseTimeBonus = 2;
            normHit = true;
            console.log("normal speed");
        } else {
            responseTimeBonus = 1;
            normHit = true;
            console.log("slow response");
        }
    },

        // make a random num generator to use for punch damage values
    generateRandInt: function() {
        let randNum = 0;
        randNum += Math.floor(Math.random() * (this.maxSwingDmg - +this.minSwingDmg)) + this.minSwingDmg;
        // damNum = randNum*responseTimeBonus
        console.log(`${randNum} dmg generated on hit`);  
        this.totalDmgDealt += randNum;
        return randNum;
        },

// add a class to control the animation of the axe over the slime
//   document.getElementById('logo').classList.add("animatedClass1");

// make separate function for red bg so it can be timed out
    reddenBackground: function(){
        slime.style.backgroundColor = "rgba(185, 40, 40, 0.79)";
    },

    // Function to animate dealing damage to slime
    animateSlimeDamage: function(){
    // make axe show up
    axe.style.display = "block";
    // add class to conjure animation
    axe.classList.add("weaponSwing");
    },

    revertSlime: function(){
    slimeBG.style.backgroundColor = "white";
    slime.style.removeProperty('background-color');
    axe.style.display = "none";
    axe.classList.remove("weaponSwing");
    slime.classList.remove("dodgeDucking")
    },
      punchSlime: function() {
        const randNum = this.generateRandInt();
        this.health -= randNum;
        this.bumper = randNum;
        // Run the axe animation
        this.animateSlimeDamage();
        // make the background go red after a delay
            setTimeout(() => {
                this.reddenBackground();
            }, 269);
    // make axe and red BG disappear, custom revert function revertSlime()
    // ALIGN THIS TIMEOUT TO THE CSS ANIMATION!
            setTimeout(() => {
                this.revertSlime();
            }, 845);
        this.punched = true;
        if(this.health <= 0){
          this.ended = true;
        };
      },
      missSlime: function() {
        slime.classList.add("dodgeDucking");
        setTimeout(() => {
            this.revertSlime();
        }, 830);
      },
    // restart function for the slime splatter
      restoreSlimeHealth: function() {
        this.health = 100;
        this.ended = false;
        this.bumper = 0;
        this.punched = false;
      },
    },
    computed: {
    }
  });

// OVERHAUL: how od I use a "post" request to local storage in VUE to add an object to this array so I can make new questions from a custom form?
// INC: put choices into an array and randomize it
// shortened for "kanji question"
const kanQ = "What does this Kanji mean?";

// create our questions
let questionsArr = [
  {
    // the text for the question
      question : kanQ,
    //   Image for the question, committed to #qImg area
    // Naming convention note: Make sure the image names contain the English meaning for ease of adding answers
      imgSrc : "../../img/kan/circle_kan.png",
      choiceA : "Circle",
      choiceB : "Nine",
      choiceC : "Arm",
      choiceD : "Sword",
      correct : "A"
  },{
      question : kanQ,
      imgSrc : "../../img/kan/begin_kan.png",
      choiceA : "Farm",
      choiceB : "Begin",
      choiceC : "Light",
      choiceD : "Sword",
      correct : "B"
  },{
      question : kanQ,
      imgSrc :  "../../img/kan/stomach_kan.png",
      choiceA : "Sword",
      choiceB : "Bean",
      choiceC : "Stomach",
      choiceD : "Wing",
      correct : "C"
  },
  {
    question : kanQ,
    imgSrc :  "../../img/kan/only_kan.png",
    choiceA : "Art",
    choiceB : "Beach",
    choiceC : "Fish",
    choiceD : "Only",
    correct : "D"
},
{
    question : kanQ,
    imgSrc :  "../../img/kan/centurion_kan.png",
    choiceA : "Night",
    choiceB : "Car",
    choiceC : "Page",
    choiceD : "Tree",
    correct : "C"
}
];

// Hit and miss messages

let missMessages = [
    "You missed!",
    "The enemy ducks under you attack!",
    "Your foe dodges!",
    "Your attack swings wide!",
    "You clumsily miss the mark",
    "The attack failed to connect!"
];
function randomMissMessage() {
    return missMessages[Math.floor(Math.random()*missMessages.length)];
};

let hitMessages = [
    "You hit for",
    "The strike lands for",
    "Your weapon impacts for",
    "Enemy struck for",
    "Attack connects for"
];
// ******* Conditional here for different hit messages on strong or weak attacks
function randomHitMessage() {
    return hitMessages[Math.floor(Math.random()*hitMessages.length)];
};

// instantiate variables
// get a num to index the last question of the questions array
const lastQuestion = questionsArr.length -1;
// start at 0 as an index for iterating through the Questions Array
let currentQuestionIdx = 0;
// make a counter for the timer
let count = 0;

let TIMER;
// instantiate score variable
// Changed from "score" to track the number of correct questions 
// (the important score is the damage dealt to the slime)
let correctQs = 0;

// render the current question
// making a placeholder in case I need to access this outside of the function l8r.
let q;

// FUNCTION DECLARATIONS**************************
//   not implemented alert placeholder thing
function ni(){
    alert('Nothing is implemented over this element yet');
}

function resizeMsg1(){
    alert('Please resize the window to see this title card format change; also, hit the Eng 1st option after hovering over the "switch to" button');
}

function resizeMsg2(){
    alert('Thank you for re-sizing!');
}

function disableCardInputs() {
    quizCards.style.pointerEvents = "none";
}

// Need a way to randomly generate questions from an array
// Like, generate a random number randNum =  rand 0 to questionsArr.length, then remove questionsArr[randNum] from array
// Test with shuffling, should be in Snake notes
function renderQuestion(){
    let q = questionsArr[currentQuestionIdx];
    qImg.style.backgroundImage = "url(\'" + q.imgSrc + "\')";
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    //   qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

// target "start" div to start the quiz when clicked on
start.addEventListener("click",startQuiz);

// build function for starting the quiz
function startQuiz(){
// Hide all title divs and elements 
//   gameContainer.style.display = "none";
  start.style.display = "none";
  startImg.style.display = "none";
  titleIcon.style.display = "none";
  titleIcon2.style.display = "none"
  titleBtns.style.display = "none";
  testBtns.style.display = "block";
  renderQuestion();
  quizCards.style.display = "grid";
//   display slime and health bar
  slime.style.display = "block";
  healthBar.style.zIndex = "2";
  hitMsg.style.zIndex= "2";
//   note, can't get rid of the container since the cards are "in" it, but I can hide the background and shading
  gameContainer.style.background = "none";
  gameContainer.style.boxShadow = "none";
  renderProgress();
  renderCounter();
//   Call the counter every second
  TIMER = setInterval(renderCounter,1000); 
}

// render progress
function renderProgress(){
    // Render a card as long as we still got question cards remaining
  for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
    // calling the index that we're iterating over as an ID param for an HTML tag
      progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
  }
}

// function shows the timer bar and the number counting up

function renderCounter(){
  if(count <= questionTime){
      counter.innerHTML = count;
    //   width is filled in proportion to the time counter
      timeGaugeFiller.style.width = count * gaugePortion + "px";
      count++
  }else{
    // INC: could make color change as time drains, making the bar yellow at 50% then red at 20%
    // INC: link fast-answer bonus to a faster response?
    // *******^^^^^^********
    // reset counter to 0 after each question
      count = 0;
      // change progress color to red
      answerIsWrong();
      // check if there are any questions left in the list of questions, render a fresh timer and question if so
      if(currentQuestionIdx < lastQuestion){
          currentQuestionIdx++;
          renderQuestion();
      }else{
          // clear out the timer
          clearInterval(TIMER);
      }
  }
}

// CHECK FOR GAME-END CONDITION: RUNNING OUT OF CARDS!!!
function checkRemainingCards(){
    //   show next card if that wasn't the last card, or else end the game
    if(currentQuestionIdx < lastQuestion){
        currentQuestionIdx++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        disableCardInputs();
        scoreRender();
    }
}

// checkAnwer

function checkAnswer(answer){
  if( answer == questionsArr[currentQuestionIdx].correct){
      // if the answer of the current question is correct, incrememt score, then run the function associated with "correct"
    //   
      correctQs++;
    // ********* moved to vue object!!!!!! ******  
    // scoreFromResponseTime();
      answerIsCorrect();
      checkRemainingCards();
  }else{
      answerIsWrong();
      checkRemainingCards();
  }
  count = 0;
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(currentQuestionIdx).style.backgroundColor = "#0f0";
    // Punch the slime!
    this.vueOne.punchSlime();
    hitMsg.innerHTML = `${randomHitMessage()} ` + vueOne.bumper + " damage";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(currentQuestionIdx).style.backgroundColor = "#f00";
    this.vueOne.missSlime();
    //   INC **** itterate through an array of "miss" messages, ducks under the blow, you swing wide, slinks away from the strike
    hitMsg.innerHTML = `${randomMissMessage()}`
}

// render the score 
function scoreRender(){
    scoreDiv.style.display = "flex";
    // calculate the amount of question percent answered by the user
    const correctPercent = Math.round(100 * correctQs/questionsArr.length);
    
  //  // choose the image based on the scorePerCent
  //  let img = (scorePerCent >= 80) ? "img/5.png" :
  //            (scorePerCent >= 60) ? "img/4.png" :
  //            (scorePerCent >= 40) ? "img/3.png" :
  //            (scorePerCent >= 20) ? "img/2.png" :
  //            "img/1.png";
   
  //  scoreDiv.innerHTML = "<img src="+ img +">";

//   Change to questions correct and total damage dealt
 scoreDiv.innerHTML += "<p> <span id='dmgScored'> " + this.vueOne.totalDmgDealt+ "</span> damage dealt! <br>"+ correctPercent +"% correct, " +  correctQs + " out of " + questionsArr.length + " questions </p>";
}

function myFunction() {
    var w = window.outerWidth;
    var h = window.outerHeight;
    var txt = "Window size: width=" + w + ", height=" + h;
    document.getElementById("demo").innerHTML = txt;
  }


//   document.getElementById('logo').classList.add("animatedClass1");

// set timeout fat arrow husk for builder notes
// setTimeout(() => {
// }, 1300);