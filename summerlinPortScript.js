// links to the "index.html" in this directory

const contentAboutMe = document.getElementById("content-about-me");
const hide1 = document.getElementById('hide-btn1');
const menuIcon = document.getElementById("menu-icon");
const slideoutMenu = document.getElementById("slideout-menu");
const searchIcon = document.getElementById("search-icon");
const searchBox = document.getElementById("searchbox");

function hideMe() {
  if(contentAboutMe.style.display == "none"){
    contentAboutMe.style.display = "block"; 
    hide1.innerHTML = "[hide blurb]";
  } else {
    contentAboutMe.style.display = "none";  
    hide1.innerHTML = "[show blurb]";
  };
}

searchIcon.addEventListener('click', function () {
  if (searchBox.style.top == '72px') {
    searchBox.style.top = '24px';
    searchBox.style.pointerEvents = 'none';
  } else {
    searchBox.style.top = '72px';
    searchBox.style.pointerEvents = 'auto';
  }
});

menuIcon.addEventListener('click', function () {
  if (slideoutMenu.style.opacity == "1") {
    slideoutMenu.style.opacity = '0';
    slideoutMenu.style.pointerEvents = 'none';
  } else {
    slideoutMenu.style.opacity = '1';
    slideoutMenu.style.pointerEvents = 'auto';
  }
});