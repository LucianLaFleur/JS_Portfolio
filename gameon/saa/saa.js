// function myFunction() {
//   let rng = document.getElementById("myRange");
//   rng.value = "75";
//   document.getElementById("tar1").innerHTML = rng.value;
// }

// put inside of a vue object for later
// INC: keyboard bindings for different inputs

let progBar = document.getElementById('inbar-1');
let tar1 = document.getElementById('target-chunk-1');
let barXVal = document.getElementById('bar-xval');
let bowSlider = document.getElementById('bow-slider');
let sliderXVal = document.getElementById('slider-xval');
let bowLoaded = document.getElementById('bow-load-msg');
let stopBarBtn = document.getElementById('stop-bar-btn');
let ammoDisplay = document.getElementById('ammo-display');
let casesDisplay = document.getElementById('cases-display');
let fireBtn = document.getElementById('fire-btn');
let SAAreload = document.getElementById('saa-reload-btn');
let SAAeject = document.getElementById('saa-eject-btn');
let hitMsg = document.getElementById('hit-msg');
let totalDmgMsg = document.getElementById('total-dmg');
// let widthPercent = 1;
let leftPercent = 0;
let bulletsLoaded = 6;
let emptyCases = 0;
let clearChambers = 0;
let totalDmgInflicted = 0;


function checkForEmptyCases() {
  if(emptyCases != 0){
    SAAeject.style.borderColor = "blue"
    SAAeject.disabled = false;
  } else {
    SAAeject.style.borderColor = "#a2a2a2"
    SAAeject.disabled = true;
  }
}

function checkForClearChambers() {
  if(clearChambers != 0){
    SAAreload.style.borderColor = "gold"
    SAAreload.disabled = false;
  } else {
    SAAreload.style.borderColor = "#a2a2a2"
    SAAreload.disabled = true;
  }
}

function checkForLoadedBullets(){
  if(clearChambers != 0){
    SAAreload.style.borderColor = "gold"
    SAAreload.disabled = false;
  } else {
    SAAreload.style.borderColor = "#a2a2a2"
    SAAreload.disabled = true;
  }
}

function showChamberStats() {
  ammoDisplay.innerHTML = bulletsLoaded + " remaining";
  casesDisplay.innerHTML = emptyCases + " empty casings";
  
}

function fireBar(){
  stopBarBtn.disabled = false;
  stopBarBtn.style.border = "3px solid lime";
  let barSpd1 = setInterval(frame,10);
    function frame(){
      // if (widthPercent >= 100) {
      if (leftPercent >= 100) {
        clearInterval(barSpd1);
      } else {
        leftPercent ++;
        // progBar.style.width = widthPercent + '%';
        progBar.style.left = leftPercent + '%';

      }
    }
    setTimeout(function(){
      clearInterval(barSpd1);
      leftPercent = 0;
      progBar.style.left = leftPercent + "%";
      stopBarBtn.disabled = true;
      stopBarBtn.style.border = "3px solid #a2a2a2";
    }, 1050);
    showChamberStats;

    if(bulletsLoaded == 0){
      fireBtn.disabled = true;
    }
  };

  // function disableBtn(btn) {
  //   btn.disabled = true;
  //   btn.style.border = "3px solid #a2a2a2";
  // }

  function roll1d6(){
    let diceRoll = Math.ceil(Math.random()*6);
    // console.log(`got a [::${diceRoll}::]`)
    return diceRoll;
  };

  function roll4d6(){
    total = 0;
    for (var i = 1; i < 5; i++){
      // console.log(`roll # ${i}`);
      total += roll1d6();}
    console.log("total dmg: " + total); 
    return total;
  };

  // test roll of 4d6
  // roll4d6();

  // function reportXVal(){
  function fireSAA(){
    bulletsLoaded -= 1;
    emptyCases += 1;
    showChamberStats();
    // allow the stop button to be active
    barXVal.innerHTML = leftPercent;
    stopBarBtn.disabled = true;
    stopBarBtn.style.border = "3px solid #a2a2a2";
    if((leftPercent >= 70) && (leftPercent <= 80)){
      let dmgRoll = roll4d6();
      tar1.style.background = "lime";
      hitMsg.innerHTML = "Hit for " + dmgRoll;
      totalDmgInflicted += dmgRoll;
      totalDmgMsg.innerHTML = totalDmgInflicted + " total damage" ;
    } else {
      // turn target blue if missed
      tar1.style.background = "aliceblue";
    }
    // enable reload and ejection, and manage border colors
    checkForEmptyCases();
    checkForClearChambers();
  };


  function ejectCasing(){
    if(emptyCases != 0){
      emptyCases -= 1;
      clearChambers += 1;
      showChamberStats();
      SAAeject.style.borderColor = "orange";
      SAAeject.disabled = true;
      SAAreload.disabled = true;
      SAAreload.style.borderColor = "#a2a2a2"
      // disable the reload for a moment as the shell is removed, demo'd by border color change
      // Also, disabling reload too since you can't reload and eject at the same time
      setTimeout(function(){
        checkForEmptyCases();
        checkForClearChambers();
      }, 350);
      // change border color to indicate if more cases need ejection, greying it out if there are no more
    }
    // need to have state for chamber, indicator img for current chamber loaded, spent-shell, or clear.
    // NOT IMPLEMENTED: play audio file of case ejection
  }
  function loadShell(){
    if(clearChambers != 0){
      clearChambers -= 1;
      bulletsLoaded +=1;
      showChamberStats();
      SAAreload.style.borderColor = "orange";
      SAAreload.disabled = true;
      SAAeject.disabled = true;
      SAAeject.style.borderColor = "#a2a2a2"
      // disable the reload for a moment as the bullet is inserted, demo'd by border color change
    setTimeout(function(){
      checkForClearChambers();
      checkForEmptyCases();
      }, 350);
    }
  }
  // when slider is changed check for it's value
  //  "this" is referring to "bow-slider", the element being acted upon within this scope
  bowSlider.oninput = function(){
    sliderXVal.innerHTML = this.value;
    if(this.value < 6){
      this.disabled = true;
      bowLoaded.style.display = 'block';
    };
  }

  function shootBow(){
    // other functions on shooting
    bowSlider.disabled = false;
    sliderXVal.innerHTML = "Thwap!!"
    bowSlider.value = 100;
    bowLoaded.style.display = 'none';
    //  generate damage
    // play arrow firing audio
  }
  // disable slider if < 5 , enable "fire" button INCOMPLETE, need to make element and set it to initially disabled; CSS to grey out and light up disabled/enabled btn


