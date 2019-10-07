// OVERHAUL 1 : Slime-smasher
// Overhaul ??? : Re-skin for de-structing T-droids
// make a score of slime's health bar, cut it with each correct answer, as if you hit the punch button

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
        bumper: 0
    },
    methods: {
        // make a random num generator to use for punch damage values
    generateRandInt: function() {
        let randNum = 0;
        randNum += Math.floor(Math.random() * (this.maxSwingDmg - +this.minSwingDmg)) + this.minSwingDmg;
        console.log(`${randNum} dmg generated on hit`);  
        return randNum;
        },
    // assignRandInt: function(var1) {
    //     let min = 20;
    //     let max = 40;
    //     var1 = (Math.floor(Math.random() * (+max - +min)) +min);
    //     console.log(`num rolled : ${var1}`);  
    //     },
    //   punchSlime: function(){
    //     // punch the slime
    //     this.health -= 10
    //     // "this" is the current vue instance, allowing us to access the "health" property declared in data above
    //     if (this.health <= 0){
    //         this.ended = true;
    //     } 
    //   },
    // renderHitMessage: function(){
    //     hitMsg.innerHTML = "<p> hit for " + this.vueOne.bumper + " damage </p>"
    //   },
    //   random generation punch damage for ref;

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
  }
];

// instantiate variables
// get a num to index the last question of the questions array
const lastQuestion = questionsArr.length -1;
// start at 0 as an index for iterating through the Questions Array
let currentQuestionIdx = 0;
// make a counter for the timer
let count = 0;
// timer length; 10 means [10 seconds]
const questionTime = 2000;
// size of timer bar
const gaugeWidth = 250; // 250px width
const gaugePortion = gaugeWidth / questionTime;
let TIMER;
// instantiate score variable
let score = 0;
// hit damage value
let hitDmg;

// render the current question
// making a placeholder in case I need to access this outside of the function l8r.
let q;

// FUNCTION DECLARATIONS**************************
//   not implemented alert placeholder thing
function ni(){
    alert('Nothing is implemented over this element yet');
}

function resizeMsg1(){
    alert('Please resize the window to see this title card format change');
}

function resizeMsg2(){
    alert('Thank you for re-sizing!');
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
  TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}


// render progress
function renderProgress(){
  for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
    // calling the index that we're iterating over as an ID param for an HTML tag
      progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
  }
}

// function shows the timer bar and the number counting up

function renderCounter(){
  if(count <= questionTime){
      counter.innerHTML = count;
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
      // check if there are any questions left in the list of questions
      if(currentQuestionIdx < lastQuestion){
          currentQuestionIdx++;
          renderQuestion();
      }else{
          // end the quiz and show the score
          clearInterval(TIMER);
          scoreRender();
      }
  }
}

// checkAnwer

function checkAnswer(answer){
  if( answer == questionsArr[currentQuestionIdx].correct){
      // answer is correct
      score++;
      // change progress color to green
      answerIsCorrect();
  }else{
      // answer is wrong
      // change progress color to red
      answerIsWrong();
  }
  count = 0;
  if(currentQuestionIdx < lastQuestion){
      currentQuestionIdx++;
      renderQuestion();
  }else{
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
  }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(currentQuestionIdx).style.backgroundColor = "#0f0";
    // Punch the slime!
    this.vueOne.punchSlime();
    hitMsg.innerHTML = "Hit for " + vueOne.bumper + " damage";
}


// answer is Wrong
function answerIsWrong(){
    document.getElementById(currentQuestionIdx).style.backgroundColor = "#f00";
    this.vueOne.missSlime();
    //   INC **** itterate through an array of "miss" messages, ducks under the blow, you swing wide, slinks away from the strike
    hitMsg.innerHTML = "You missed!"
}

// render the score score
function scoreRender(){
    scoreDiv.style.display = "block";
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
  //  // choose the image based on the scorePerCent
  //  let img = (scorePerCent >= 80) ? "img/5.png" :
  //            (scorePerCent >= 60) ? "img/4.png" :
  //            (scorePerCent >= 40) ? "img/3.png" :
  //            (scorePerCent >= 20) ? "img/2.png" :
  //            "img/1.png";
   
  //  scoreDiv.innerHTML = "<img src="+ img +">";
   scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
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