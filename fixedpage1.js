// this.setinterval? NEED RESEARCH INTERVAL AND CLEAR INTERVAL!!!
// setInterval, clear interval will stop the thing from running
var d, h, m, s, hdeg, ampm;

// no need for document.getelementbyid?
// INC: make the clock chime different tunes on the 30 and hr?

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