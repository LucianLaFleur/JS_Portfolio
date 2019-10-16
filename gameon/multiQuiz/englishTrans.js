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
      imgSrc : "English keyword (srry, just a placeholder)",
      choiceA : "kanji img1",
      choiceB : "kanji img2",
      choiceC : "kanji img3",
      choiceD : "kanji img4",
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

var VueOne = new Vue({
    el:'#vue-app',
    data:{
        // num for the correct questions (moved into the Vue object)
        // Changed from "score" to track the number of correct questions since the important score is the damage dealt to the slime and gold earned on performance.
        correctQs: 0,
        // placeholder for percentage of questions correct
        correctPercent: 0,
        // health percentage of the slime
        // *** convert to local storage
        health: 100,
        // switch for ending the battle with the slime
        slimeSlain: false,
        // INC: number of slimes defeated *** needs local storage
        totalSlimesSlain: 0,
        //   make a switch to hide damage dealt message when no attack has yet been done
        punched: false,
        // Minimum and maximum swing damage
        minSwingDmg: 7,
        maxSwingDmg: 12,
        //   make a bumper to store damage from dealt attack
        bumper: 0,
        responseTimeBonus: 1,
        // placeholder for total damage dealt *** needs local storage
        sessionDmgDealt: 0,
        // gold earned from this game session
        sessionGoldEarned: 0,
        // placeholder for gold earned *** needs local storage
        totalGoldEarned: 0
    },
    methods: {

        // Thresholds for fast, med, and slow responses below
    responseTime: function() {
        if(count <= 3){
            return 3;
        } else if (count <= 6){
            return 2;
        } else {
            return 1;
        }
    },

        // make a random num generator to use for punch damage values
    generateRandInt: function() {
        let randNum = 0;
        let damNum = 0;
        let mult;

        randNum += Math.floor(Math.random() * (this.maxSwingDmg - +this.minSwingDmg)) + this.minSwingDmg;
        // check timer for response time bonus
        mult = this.responseTime();
        // Calculate damage with time multiplier
        damNum = randNum * mult;
        console.log(`${randNum} x ${mult} for ${damNum} damage to slime`);  
        this.sessionDmgDealt += damNum;
        return damNum;
        },

        // function scoreRender() (outside of vue object)
    generateGold: function() {
        // calculate the amount of question percent answered by the user
        this.correctPercent = Math.round(100 * this.correctQs/questionsArr.length);
        let goldMult = 1;
        // make a multiplier based on percent correct, if none scored, give one gold for each question

        (this.correctPercent == 100) ? (goldMult = 4):
        (this.correctPercent >= 70) ? (goldMult = 3):
        (this.correctPercent >= 50) ? (goldMult = 2):
        (this.correctPercent == 0) ? this.sessionGoldEarned = questionsArr.length: 
        (goldMult = 1);

         this.sessionGoldEarned = (this.sessionDmgDealt * goldMult);
         this.totalGoldEarned
        console.log(`x${goldMult} gold for ${this.correctPercent}% correct earning you ${this.sessionGoldEarned}`);

        //  // choose an image based on the percentage correct?
        //  let img = (scorePerCent >= 80) ? "img/5.png" :
        //            (scorePerCent >= 60) ? "img/4.png" :
        //            (scorePerCent >= 40) ? "img/3.png" :
        //            (scorePerCent >= 20) ? "img/2.png" :
        //            "img/1.png";
        //  scoreDiv.style.backgroundImg = "url('some/path/here.jpg')";
    },

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
    slime.classList.remove("dodgeDucking");
    slime.classList.remove("slimeSummoned")
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
          console.log('Slime defeated!')
          this.slimeSlain = true;
          this.totalSlimesSlain = (this.totalSlimesSlain + 1)
        };
      },
      missSlime: function() {
        slime.classList.add("dodgeDucking");
        setTimeout(() => {
            this.revertSlime();
        }, 830);
      },
      summonSlime: function(){
        slime.classList.add("slimeSummoned");
        slime.classList.remove("defeated");
        this.health = 100;
        this.slimeSlain = false;
        this.bumper = 0;
        this.punched = false;
        setTimeout(() => {
            this.revertSlime();
        }, 500);
      },
   
    //   restoreSlimeHealth: function() {  
    //     this.health = 100;
    //     this.slimeSlain = false;
    //     this.bumper = 0;
    //     this.punched = false;
    //   },
    },
    computed: {
    }
  });

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

// Array selection for differnt messages on hit, (depending on response time, as shown in function below)
let strongHitMessages = [
    "An impactful blow",
    "A powerful strike",
    "Nice hit",
    "A swift attack"
]
let normalHitMessages = [
    "You hit for",
    "The strike lands for",
    "Your weapon impacts for",
    "Enemy struck for",
    "Attack connects for"
];
let weakHitMessages = [
    "Barely a scratch",
    "Grazes for",
    "A light hit"
];
// simple function to draw a random item out of any input array
function randomMsgFromArray(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

function randomHitMessage() {
    if (this.VueOne.responseTime() == 3){
        return randomMsgFromArray(strongHitMessages);
    } else if (this.VueOne.responseTime() == 2){
        return randomMsgFromArray(normalHitMessages)
    } else {
        return randomMsgFromArray(weakHitMessages)
    }
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
        this.VueOne.generateGold();
        //  INC save gold to local storage
        // game ends so show the ending message
        scoreDiv.style.display = "flex";

        if(this.VueOne.correctPercent == 0){
            scoreDiv.innerHTML += "<p id='allMissedMsg'> You get " + questionsArr.length + " gold for your effort</p> <button value='Refresh Page' onClick='window.location.reload();'> Back to title </button>";
        } else {
        scoreDiv.innerHTML += "<p id='sessionEndMsg'> <span id='dmgScored'> " + this.VueOne.sessionDmgDealt+ "</span> damage dealt! <br>"+ this.VueOne.correctPercent +"% correct, " +  this.VueOne.correctQs + " out of " + questionsArr.length + " questions </p> <p id='goldEarnedMsg'>" + this.VueOne.sessionGoldEarned + " gold earned </p> <button value='Refresh Page' onClick='window.location.reload();'> Back to title </button>";}
        if (this.VueOne.slimeSlain){
            this.VueOne.sessionGoldEarned += 100;
            scoreDiv.innerHTML += "<p id='slimeSlainMsg'> Bonus 100 gold for slaying the slime! </p>"}
            // check if the hundred slay bonus is added
            console.log("gold earned this session : " + this.VueOne.sessionGoldEarned + " and killed " + this.VueOne.totalSlimesSlain + " total slimes")
    }
}

// checkAnwer

function checkAnswer(answer){
  if( answer == questionsArr[currentQuestionIdx].correct){
      // if the answer of the current question is correct, incrememt score, then run the function associated with "correct"
    //   
      this.VueOne.correctQs++;
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
    this.VueOne.punchSlime();
    hitMsg.innerHTML = `${randomHitMessage()} ` + VueOne.bumper + " damage";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(currentQuestionIdx).style.backgroundColor = "#f00";
    this.VueOne.missSlime();
    //   INC **** itterate through an array of "miss" messages, ducks under the blow, you swing wide, slinks away from the strike
    hitMsg.innerHTML = `${randomMissMessage()}`
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