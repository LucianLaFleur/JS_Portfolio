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

// blur event listeners for the form inputs
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('zip').addEventListener('blur', validateZip);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);

// use regex to validate names
function validateName() {
  const name = document.getElementById('name');
  // 3-10 letters from a-z
  const re = /^[a-zA-z]{3,10}$/;

  if(!re.test(name.value)) {
    name.classList.add('is-invalid');
  } else {
    name.classList.remove('is-invalid');
  }
}

function validateZip() {
  const zip = document.getElementById('zip');
  // 5 nums required, optional "-1234"
  // start with 5 nums, then a (grouping) of literal - then 4 nums, and the group itself is made optional with the ?
  const re = /^[0-9]{5}(-[0-9]{4})?$/;

  if(!re.test(zip.value)) {
    zip.classList.add('is-invalid');
  } else {
    zip.classList.remove('is-invalid');
  }
}

function validateEmail() {
  const email = document.getElementById('email');
  const re = /^([a-zAZ0-9_\-\.]+)@([a-zAZ0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  if(!re.test(email.value)) {
    email.classList.add('is-invalid');
  } else {
    email.classList.remove('is-invalid');
  }
}

function validatePhone() {
  const phone = document.getElementById('phone');
  // parenthesis optional around 3 digits, then an optional dash, period, or space as a separator, 3 more digits, separator optional, 4 more digits 
  const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
  if(!re.test(phone.value)) {
    phone.classList.add('is-invalid');
  } else {
    phone.classList.remove('is-invalid');
  }
}