// function myFunction() {
//   let rng = document.getElementById("myRange");
//   rng.value = "75";
//   document.getElementById("tar1").innerHTML = rng.value;
// }

// put inside of a vue object for later

let progBar = document.getElementById('inbar-1');
let xReport = document.getElementById('bar-xval');
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
    xReport.innerHTML = widthPercent
  }
