//  Fake database no idea how to add items to cart and I ain't fucking learning 
// ********************
// instantiate switch booleans for checking if forms are valid
let goodName = false;
let goodZip = false;
let goodEMail = false;
let goodPhone = false;

// when item loses focus, run function on the element to check validation
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('zip').addEventListener('blur', validateZip);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);

const submitBtn = document.getElementById('submit-btn')
// check for all validations when hovering over submit
submitBtn.addEventListener('click', validateAll);

function submitStyleControl() {
  if(goodName && goodZip && goodEMail && goodPhone){
    submitBtn.style.outlineColor = "lime";
    submitBtn.style.background = "#37f";
  } else {
    submitBtn.style.outlineColor = "#666";
    submitBtn.style.background = "#225";
  }
}

// use regex to validate names
function validateName() {
  const name = document.getElementById('name');
  // 3-10 letters from a-z
  const re = /^[a-zA-Z]{3,10}$/;

  if(!re.test(name.value)) {
    name.classList.add('is-invalid');
    goodName = false;
    submitStyleControl() 
  } else {
    name.classList.remove('is-invalid');
    goodName = true;
    submitStyleControl();
  }
}

function validateZip() {
  const zip = document.getElementById('zip');
  // 5 nums required, optional "-1234"
  // start with 5 nums, then a (grouping) of literal - then 4 nums, and the group itself is made optional with the ?
  const re = /^[0-9]{5}(-[0-9]{4})?$/;

  if(!re.test(zip.value)) {
    zip.classList.add('is-invalid');
    goodZip = false;
    sumbitStyleControl();
  } else {
    zip.classList.remove('is-invalid');
    goodZip = true;
    submitStyleControl(); 
  }
}

function validateEmail() {
  const email = document.getElementById('email');
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  if(!re.test(email.value)) {
    email.classList.add('is-invalid');
    goodEMail = false;
    submitStyleControl(); 
  } else {
    email.classList.remove('is-invalid');
    goodEMail = true;
    submitStyleControl(); 
  }
}

function validatePhone() {
  const phone = document.getElementById('phone');
  // parenthesis optional around 3 digits, then an optional dash, period, or space as a separator, 3 more digits, separator optional, 4 more digits 
  const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
  if(!re.test(phone.value)) {
    phone.classList.add('is-invalid');
    goodPhone = false;
    submitStyleControl(); 
  } else {
    phone.classList.remove('is-invalid');
    goodPhone = true;
    submitStyleControl(); 
  }
}

function validateAll(){
  if(goodName && goodZip && goodEMail && goodPhone){
    alert('All fields are valid, thanks for partaking in this form demo. See JS file for regex used');
  } else {
    alert('You appear to have some missing or invalid fields');
  }
}

const STORAGE_KEY = 'item-storage';

var cartController = new Vue({
  // can target el as a class, just like CSS
  //  ex: <section class="cartApp">
  el: '.cartApp',
  data: {
    // newCartItem: 'potato of power',
    items: [
      // {id: 0, itemName: 'placeholderItem', price: 555}
    ]
  },
  // use lifecycle hook to display items from localstorage
  created (){
    // get stored object, or make an empty array if null
    this.items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  methods:{
    //  alt syntax : responseTime: function(){}
    addCartItem(input1) {
      this.items.push({id: this.items.length, itemName: input1});
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },
    removeItem(item) {
      // at the index of the item, remove that one item
      this.items.splice(this.items.indexOf(item), 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    }
  }

});

//  set a timeout to make the newly purchased item be hilit with a bright cyan background for a few seconds at 
// followsbuild a vue.js app using local storage with Program with Erik