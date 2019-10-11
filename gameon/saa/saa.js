// function myFunction() {
//   let rng = document.getElementById("myRange");
//   rng.value = "75";
//   document.getElementById("tar1").innerHTML = rng.value;
// }

// put inside of a vue object for later

let progBar = document.getElementById('inbar-1');
let barXVal = document.getElementById('bar-xval');
let bowSlider = document.getElementById('bow-slider');
let sliderXVal = document.getElementById('slider-xval');
let bowLoaded = document.getElementById('bow-load-msg');
let widthPercent = 1;

function runBar(){
  let barSpd1 = setInterval(frame,10);
    function frame(){
      if (widthPercent >= 100) {
        clearInterval(barSpd1);
      } else {
        widthPercent ++;
        progBar.style.width = widthPercent + '%';

      }
    }
    setTimeout(function(){
      clearInterval(barSpd1);
      widthPercent = 1;
      progBar.style.width = widthPercent + "%";
    }, 1400);
  };

  function reportXVal(){
    barXVal.innerHTML = widthPercent
  };

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


