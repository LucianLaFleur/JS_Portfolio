// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI(){
}

UI.prototype.addBookToList = function (book){
  // Target the container that'll contain the list of added items
  const list = document.getElementById('book-list')
  const row = document.createElement('tr');
  // insert columns
  row.innerHTML =`
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}

//  Show Alert
UI.prototype.showAlert = function(message, className) {
  // create HTML div
  const div = document.createElement('div');
  // add classes
  div.className = `alert ${className}`;
  // add text to the alert
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector('.container');
  //  get the form
  const form = document.querySelector('#book-form');
  // insert alert
  container.insertBefore(div, form);
  // set a timeout to remove an HTML element after 3 seconds, note that
  //  you have to use a function to target & remove the HTML in question
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

//  Clear the input fields between submits, so make a function for that
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event listeners
document.getElementById('book-form').addEventListener('submit', 
function(e){
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

//  Instantiate a book
  const book = new Book(title, author, isbn);

//  Instantiate the UI
  const ui = new UI();

  // validate
  if(title === '' || author === '' || isbn ===''){
    // make an error alert
    ui.showAlert('some fields were missing info', 'error')
  } else {
  // add book to list
  ui.addBookToList(book);
  ui.showAlert('Book added!', 'success');
  ui.clearFields();
  }

  e.preventDefault;
});

// add event listener for delete function
document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault;
});