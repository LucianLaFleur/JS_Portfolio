//  Fake database no idea how to add items to cart and I ain't fucking learning 
// How would I dynamically generate HTML from this, to affect my setup?
// const dataTable = [
//   {
//     itemID: 1,
//     price: 11,
//     name: 'Bird',
//     perks: ['Fun', 'Addictive', 'Flappy', 'Birdy']
//   },
//   {
//     itemID: 2,
//     price: 22,
//     name: 'Vaporwave',
//     perks: ['perkV1', 'perkV2', 'perkV3', 'perkV4']
//   },
//   {
//     itemID: 3,
//     price: 35,
//     name: 'Moe',
//     perks: ['perkM1', 'perkM2', 'perkM3', 'perkM4']
//   }
// ];

// const shopping_cart = document.querySelector('.item-collection');
// const clearBtn = document.querySelector('.clear-cart');

// // Load all event listeners
// loadEventListeners();

// function loadEventListeners() {
//   // DOM Load event
//   document.addEventListener('DOMContentLoaded', getCart);
//   // Add task event
//   document.getElementsByClassName('add-to-cart-btn').addEventListener('click', addToCart);
//   // Remove task event
//   // taskList.addEventListener('click', removeTask);
//   // // Clear task event
//   // clearBtn.addEventListener('click', clearTasks);
//   // // Filter tasks event
//   // filter.addEventListener('keyup', filterTasks);
// }

// //  Get items from cart in local storage
// function getCart() {
//   let cart;
//   // If no items in local storage, make an array with an empty cart
//   if(localStorage.getItem('cart') === null){
//     cart = [];
//   } else {
//     cart = JSON.parse(localStorage.getItem('cart'));
//   }

//   cart.forEach(function(item){
//     // Create li element
//     const li = document.createElement('li');
//     // Add class
//     li.className = 'collection-item';
//     // Create text node and append to li
//     li.appendChild(document.createTextNode(item));
//     // Create new link element
//     const link = document.createElement('a');
//     // Add class
//     link.className = 'delete-item secondary-content';
//     // Add icon html
//     link.innerHTML = '<i class="fa fa-remove"></i>';
//     // Append the link to li
//     li.appendChild(link);

//     // Append li to ul
//     shopping_cart.appendChild(li);
//   });
// }

// ********************


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
    alert('All fields are valid, thanks for partaking in this form demo');
  } else {
    alert('You appear to have some missing or invalid fields');
  }
}

//  set a timeout to make the newly purchased item be hilit with a bright cyan background for a few seconds at first