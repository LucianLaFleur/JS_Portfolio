const STORAGE_KEY = 'item-storage';
const CART_VAL_STORED = 'cart-in-storage';

var cartController = new Vue({
  // can target el as a class, just like CSS
  //  ex: <section class="cartApp">
  el: '.cartApp',
  data: {
    cartTotal: 0,
    // *** Control prices and key-names below!***
    forSale: {
      "Vapor-Wave": 87,
      "f-bird": 13,
      "Liquid-Anime": 18
    },
    items: [
      // {id: 0, itemName: 'placeholderItem', price: 555}
    ]
  },
  // use lifecycle hook to display items from localstorage
  created (){
    // get stored object, or make an empty array if null
    this.items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    // Get stored cart total, set to 0 if none
    this.cartTotal = JSON.parse(localStorage.getItem(CART_VAL_STORED) || '0');
    document.getElementById('cart-price').innerHTML = "$" + this.cartTotal;
  },
  methods:{
    addCartItem(input1) {
      this.items.push({id: this.items.length, itemName: input1, price:this.forSale[input1]});
    //  console.log("price : " + this.forSale[input1]);
    // add price of item to total
      this.cartTotal += this.forSale[input1];
      document.getElementById('cart-price').innerHTML = "$" + this.cartTotal;
      // Save items and total price to local storage on add
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
      localStorage.setItem(CART_VAL_STORED, JSON.stringify(this.cartTotal))
    },
    removeItem(item) {
      // console.log("deleted item's price was: " + this.items[this.items.indexOf(item)].price);
      // Delete the price from the total
      this.cartTotal -= this.items[this.items.indexOf(item)].price;
      // at the index of the item, remove that one item
      this.items.splice(this.items.indexOf(item), 1);
      document.getElementById('cart-price').innerHTML = "$" + this.cartTotal;
       // Save items and total price to local storage on remove
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      localStorage.setItem(CART_VAL_STORED, JSON.stringify(this.cartTotal))
    },
    clearCart(){
    let clearMsg;
      if (confirm("Are you sure you want to clear your cart?")) {
        clearMsg = "Deleting all "
        console.log(clearMsg + this.items.length + " items worth a total of $" + this.cartTotal);
        window.localStorage.clear();
        window.location.reload();
        // *** ALTERNATIVELY the 4 lines below also work: longer, but more specific
        // localStorage.setItem(STORAGE_KEY, "[]");
        // localStorage.setItem(CART_VAL_STORED, "0");
        // this.items = [];
        // this.cartTotal = 0;
        document.getElementById('cart-price').innerHTML = "$" + this.cartTotal;
    } else {
        dataMsg = "Aborted cart deletion"
        console.log(dataMsg);
    }
      
      // localStorage.clear();
    }
  }

});
// ******************** FORM VALIDATION ********
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
