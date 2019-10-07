
function changeColor(id_var) {
  document.getElementById("grid_g1").style.background = document.getElementById(id_var).innerHTML;
  // id_var.preventDefault();
}

function showFixedMenu() {
  var x = document.getElementById("fixedmenu");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
