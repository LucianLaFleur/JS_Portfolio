// placeholder note...

// function countDown(secs, el) {
//   // dynamic target whatever ID gets passed in (for the element)
//   var element = document.getElementById(el);
//   element.innerHTML = "wait for "+ secs+ " seconds";s
//   // secs --;
 

// }

function countah(i) {
  return Promise.delay(1000)
    .then(function() {
      if (i > 0) {
        console.log("counting... : " + i);
        return countah(i -= 1);
      }
    });
}


function changeColor(id_var) {
  document.body.style.background = document.getElementById(id_var).innerHTML;
  // id_var.preventDefault();
}