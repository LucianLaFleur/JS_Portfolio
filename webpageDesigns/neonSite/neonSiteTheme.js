// All links need to be re-routed for this neon-site demo
const contentAboutMe = document.getElementById("content-about-me");
const hide1 = document.getElementById('hide-btn1');
const menuIcon = document.getElementById("menu-icon");
const slideoutMenu = document.getElementById("slideout-menu");
const searchIcon = document.getElementById("search-icon");
// const searchBox = document.getElementById("searchbox");
const idwBlurb1 = document.getElementById('idw-game-blurb');

// call IDW game total points bank from storage
idwBlurb1.innerHTML += JSON.parse(localStorage.getItem('pts-storage') || '0') + " total pts earned!"

function hideAboutMe() {
  if(contentAboutMe.style.display == "none"){
    contentAboutMe.style.display = "block"; 
    hide1.innerHTML = "[hide blurb]";
  } else {
    contentAboutMe.style.display = "none";  
    hide1.innerHTML = "[show blurb]";
  };
}