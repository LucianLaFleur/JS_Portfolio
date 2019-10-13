// INC: put major things inside of a vue object for later
// INC: keyboard bindings for different inputs
// INC: need to add pulling back the hammer
// how to change cursor to image on click?

var saaObj = new Vue({
  el: '.saaObj',
  data: {
    progBar : document.getElementById('inbar-1'),
    tar1 : document.getElementById('target-chunk-1'),
    barXVal : document.getElementById('bar-xval'),
    stopBarBtn : document.getElementById('stop-bar-btn'),
    ammoDisplay : document.getElementById('ammo-display'),
    casesDisplay : document.getElementById('cases-display'),
    clearChamberDisplay : document.getElementById('clear-chambers'),
    fireBtn : document.getElementById('fire-btn'),
    SAAreload : document.getElementById('saa-reload-btn'),
    SAAeject : document.getElementById('saa-eject-btn'),
    hitMsg : document.getElementById('hit-msg'),
    totalDmgMsg : document.getElementById('total-dmg'),
    leftPercent : 0,
    bulletsLoaded : 6,
    emptyCases : 0,
    clearChambers : 0,
    totalDmgInflicted : 0
  },
  // lifecycle hook, localstorage SAMPLE:::
  created (){
    // get stored pts or set to 0 if none in storage
    // this.pts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '0')
  },
  methods:{
    roll1d6(){
      let diceRoll = Math.ceil(Math.random()*6);
      console.log(`got a [::${diceRoll}:: ${this.bulletsLoaded}]`)
      return diceRoll;
    },
    //  Damage output range: 4 - 24
    roll4d6(){
      total = 0;
      for (var i = 1; i < 5; i++){
        console.log(`roll # ${i}`);
        total += this.roll1d6();}
      console.log("total dmg: " + total); 
      return total;
    },
    checkForEmptyCases() {
      if(emptyCases != 0){
        this.SAAeject.style.borderColor = "blue"
        this.SAAeject.disabled = false;
      } else {
        this.SAAeject.style.borderColor = "#a2a2a2"
        this.SAAeject.disabled = true;
      }
    },   
    checkForClearChambers() {
      if(clearChambers != 0){
        this.SAAreload.style.borderColor = "gold"
        this.SAAreload.disabled = false;
      } else {
        this.SAAreload.style.borderColor = "#a2a2a2"
        this.SAAreload.disabled = true;
      }
    },
    checkForLoadedBullets(){
      if(bulletsLoaded != 0){
        this.SAAreload.style.borderColor = "gold"
        this.SAAreload.disabled = false;
      } else {
        this.SAAreload.style.borderColor = "#a2a2a2"
        this.SAAreload.disabled = true;
      }
    }, 
    showChamberStats() {
      this.ammoDisplay.innerHTML = this.bulletsLoaded + " remaining";
      this.casesDisplay.innerHTML = this.emptyCases + " empty casings";
      this.clearChamberDisplay.innerHTML = this.clearChambers + " clear chambers";
    },
    fireBar(){
      this.stopBarBtn.disabled = false;
      this.stopBarBtn.style.border = "3px solid lime";
      let barSpd1 = setInterval(frame,10);
        function frame(){
      // if (widthPercent >= 100) {
      if (this.leftPercent >= 100) {
        clearInterval(barSpd1);
      } else {
        this.leftPercent ++;
        // progBar.style.width = widthPercent + '%';
        this.progBar.style.left = this.leftPercent + '%';
      }
    }
    setTimeout(function(){
      clearInterval(barSpd1);
      this.leftPercent = 0;
      this.progBar.style.left = this.leftPercent + "%";
      this.stopBarBtn.disabled = true;
      this.stopBarBtn.style.border = "3px solid #a2a2a2";
    }, 1050);
    this.showChamberStats();
    },
  // INC: stop tic at position when clicked?
    fireSAA(){
      this.bulletsLoaded -= 1;
      this.emptyCases += 1;
      showChamberStats();
      // allow the stop button to be active
      this.barXVal.innerHTML = this.leftPercent;
      this.stopBarBtn.disabled = true;
      this.stopBarBtn.style.border = "3px solid #a2a2a2";
      if((this.leftPercent >= 70) && (this.leftPercent <= 80)){
        let dmgRoll = roll4d6();
        this.tar1.style.background = "lime";
        this.hitMsg.innerHTML = "Hit for " + dmgRoll;
        this.totalDmgInflicted += dmgRoll;
        this.totalDmgMsg.innerHTML = this.totalDmgInflicted + " total damage" ;
      } else {
        // turn target blue if missed
        this.tar1.style.background = "aliceblue";
      }
      // enable reload and ejection, and manage border colors
      this.checkForEmptyCases();
      this.checkForClearChambers();
    },
    ejectCasing(){
    if(this.emptyCases != 0){
      this.emptyCases -= 1;
      this.clearChambers += 1;
      showChamberStats();
      this.SAAeject.style.borderColor = "orange";
      this.SAAeject.disabled = true;
      this.SAAreload.disabled = true;
      this.SAAreload.style.borderColor = "#a2a2a2"
      // disable the reload for a moment as the shell is removed, demo'd by border color change
      // Also, disabling reload too since you can't reload and eject at the same time
      setTimeout(function(){
        this.checkForEmptyCases();
        this.checkForClearChambers();
      }, 350);
      // change border color to indicate if more cases need ejection, greying it out if there are no more
    }
    // need to have state for chamber, indicator img for current chamber loaded, spent-shell, or clear.
    // NOT IMPLEMENTED: play audio file of case ejection
  },
  loadShell(){
    if(this.clearChambers != 0){
      this.clearChambers -= 1;
      this.bulletsLoaded +=1;
      showChamberStats();
      this.SAAreload.style.borderColor = "orange";
      this.SAAreload.disabled = true;
      this.SAAeject.disabled = true;
      this.SAAeject.style.borderColor = "#a2a2a2"
      // disable the reload for a moment as the bullet is inserted, demo'd by border color change
    setTimeout(function(){
      this.checkForClearChambers();
      this.checkForEmptyCases();
      this.fireBtn.disabled = false;
      }, 350);
    }
  },
  // disable keyboard inputs
  // disableSpacebar(key){
  //   this.hitMsg.style.borderColor = "white"
  //   //  target the spacebar (targeting negatively)
  //   if (key != 32) {
  //     // nothing happens if the key is anything other than space
  //   } else {
  //     // if it is key-32, then it's disabled with preventDefault();
  //     e.preventDefault();
  //   }
  // },
// setup the event listener to recieve the spacebar input
//  start the aim-bar progression when space is hit.
// !!! KEEP IN GLOBAL SCOPE, ATTACH TO saaObj
  
  // space is key code 32
  fire(e){
      let key = e.keyCode;
      //  the && exceptions prohibit it from turning the opposite direction.
      if( (key == 32) && (this.bulletsLoaded != 0)){
          // this.saaObj.fireBar();
        this.fireBar();
        // setTimeout(function(){ 
        //   this.disableSpacebar(e);
        // }, 1050);
      }
      // this.hitMsg.style.borderColor = "purple";
    }

    // Local storage sample::::
    // savePtsOnPickup(x) {
    //   this.pts += (x);
    //   localStorage.setItem(STORAGE_KEY, JSON.stringify(this.pts))
    // },
  }
});

// changes positioning of target 1 to be from 30px from left to 136px from left
// function moveTargetChunk(){
//   let diceRoll = Math.ceil(Math.random()*106 + 30);
//   tar1.style.left = diceRoll + "px";
//   return diceRoll;
// };

// test roll of 4d6
this.saaObj.roll4d6();

//  *************8regbfihwkebgiubwrasigvb2erybviqevi2erubw
document.addEventListener("keydown", this.saaObj.fire);

  // *************************** Bow functionality below, belongs in its own class/object ******************* 

  let bowSlider = document.getElementById('bow-slider');
  let sliderXVal = document.getElementById('slider-xval');
  let bowLoaded = document.getElementById('bow-load-msg');

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


