// progress bar manipulaitons
let barPercentFull = 0;
let boxOpen = false;
//  rate at which box opens
let pryPerClick = 25;
let coins = 0;

// INC: different tiers of boxes randomly appear?
let intactBoxImg = document.getElementById("intactBoxImg");
let openBoxImg = document.getElementById('openBoxImg');
let pryBtn = document.getElementById('pryBtn');
let rewardBtn = document.getElementById('rewardBtn');
// disable reward btn because it starts off un-clickable
rewardBtn.disabled = true;

function showHideRewardBtn() {
  if (boxOpen) {
    intactBoxImg.style.display = "none"
    openBoxImg.style.display = "block"
    rewardBtn.disabled = false;
    rewardBtn.innerHTML = `Collect loot!`;
  } else {
    // if box isn't open, show intact box and keep open box hidden
    intactBoxImg.style.display = "block"
    openBoxImg.style.display = "none"
    rewardBtn.disabled = true;
    rewardBtn.innerHTML = 'crate not broken';
  }
}

function showBarPercent(){
  inbar1.style = "width:" + barPercentFull + "%;"
  breakPercent.innerHTML = ` ${barPercentFull} %`;
}

function increasePryPercent() {
    // variable call for box-open rate per-click
  barPercentFull += pryPerClick;
  // add the value to the inner bar
  showBarPercent();
  if(barPercentFull >= 100){
    boxOpen = true;
    pryBtn.style.display = 'none';
    // play sound for opening box
    inbar1.style.background = "gold";
    breakPercent.innerHTML = ` 100 %`;
    showHideRewardBtn()
  }
}

function getPaid(){
  // re-do so coins are worth the value of a fish extracted from a randomized array
  boxOpen = false;
  // change btn text after loot is gathered
  rewardBtn.innerHTML = 'crate looted';
  rewardBtn.disabled = true;
  barPercentFull = 0;
  coinsFound = Math.ceil((Math.random() * 15) + 5);
  console.log (`Found ${coinsFound} coins!`)
  // add coins to pouch
  coins += coinsFound;
  coinPouch.innerHTML = coins;
};

// function clearBank(){
//   let dataMsg;
//   if (confirm("Are you sure you want to clear all points earned?")) {
//       window.localStorage.clear();
//       dataMsg = "Okay, deleting all "
//       console.log(dataMsg + this.gameController.pts + " pts");
//   } else {
//       dataMsg = "aborted deletion process"
//       console.log(dataMsg);
//   }
// }

function resetCrate() {
  boxOpen = false;
  rewardBtn.disabled = true;
  barPercentFull = 0;
  showBarPercent();
  rewardBtn.innerHTML = 'crate not broken';
  pryBtn.style.display = 'inline-block';
  showHideRewardBtn();
}

function crateResetWarning(){
  if(boxOpen){
    if (confirm("Are zombies so close that you want to abandon an opened crate?")) {
        warnMsg = "You abandoned the loot"
        console.log(warnMsg);
        resetCrate();
    } else {
        warnMsg = "You decided not to abandon the loot"
        console.log(warnMsg);
        // do not reset open crate if they pick cancel
    }
  } else if (barPercentFull > 0) {
    if (confirm(`Abandon progress?`)) {
      warnMsg = "You abandoned the loot"
      console.log(warnMsg);
      resetCrate();
  } else {
      warnMsg = "You decided not to abandon the loot"
      console.log(warnMsg);
      // do not reset open crate if they pick cancel
  }
  }
}

// this.setinterval? NEED RESEARCH INTERVAL AND CLEAR INTERVAL!!!
// setInterval, clear interval will stop the thing from running
var d, h, m, s, hdeg, ampm;

// no need for document.getelementbyid?
// INC: make the clock chime different tunes on the 30 and hr?

function setThirtyM() {
  document.getElementById('timer-length').value = 1800;
}

function adjustClock(){
  d = new Date();
  h = d.getHours();
  m = d.getMinutes();
  s = d.getSeconds();
  // 12 hrs * 30 deg = 360 degrees
  hdeg = (h*30) + (m/2);
  // hour hand
  hh.style.transform = "rotate("+ hdeg + "deg)";
  // minute hand, 60 full minutes would bt 360 degrees
  mh.style.transform = "rotate("+ m*6 + "deg)";
  sh.style.transform = "rotate("+ s*6 + "deg)";
};

window.addEventListener('load', function(){
  // make it tick every second
  setInterval(adjustClock, 1000);
});
// INC need a conditional buffer 0 if less than 10 for all these

function digiDisplay(){
  d = new Date();
  h = d.getHours();
  m = d.getMinutes();
  s = d.getSeconds();
  if (h > 12){
    h = (h-12);
  };
  if(h >= 12){ ampm = "PM"; } else {ampm = "AM";}
  digiDisp.innerHTML = "<div>" + h + " : " + m + " .. " + s + "s</div>"; 
  amORpm.innerHTML = ampm;  
};

window.addEventListener('load', function(){
  // make it tick every second
  setInterval(digiDisplay, 1000);
});

function countDown(secs, el) {
  // dynamic target whatever ID gets passed in (for the element)
  var element = document.getElementById(el);
  element.innerHTML = secs+ " seconds remain";
  if(secs < 1){
    clearTimeout(timer);
    element.innerHTML = 'Countdown Over';
  }
  secs --;
  // pass the variables into the timer using concat.
 var timer = setTimeout('countDown('+secs+',"'+el+'")', 1000);

}

// function countah(i) {
//   return Promise.delay(1000)
//     .then(function() {
//       if (i > 0) {
//         console.log("counting... : " + i);
//         return countah(i -= 1);
//       }
//     });
// }


function changeColor(id_var) {
  document.body.style.background = document.getElementById(id_var).innerHTML;
  // id_var.preventDefault();
}