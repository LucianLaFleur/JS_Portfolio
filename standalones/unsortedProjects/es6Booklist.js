class Vook {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book){
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

  showAlert(message, className){
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
  // insert alert before the Div element
  container.insertBefore(div, form);
  // set a timeout to remove an HTML element after 3 seconds, note that
  //  you have to use a function to target & remove the HTML in question
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
  }

  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local Storage Class
class Store {
  // find book in local storage
  static getBooks() {
    let books;
    if(localStorage.getItem('books') ==null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;
      // Add book to ui
      ui.addBookToList(book);
    });
  }

  static addBook() {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook () {
    const books = Store.getBooks();
    books.forEach(function(book, index){
      if(book.isbn === isbn) {
        // delete one item by targeting the ISBN to get the index of the desired item in the array.
        books.splice(index, 1)
      }
    });
    localStorage.setItem('books', JSON.stringify(books))
  }
}

// DOM load event
document.addEventListener('DomContentLoaded', Store.displayBooks);

// Event listeners, first for adding books
document.getElementById('book-form').addEventListener('submit', 
function(e){
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

//  Instantiate a book
  const book = new Book(title, author, isbn);

//  Instantiate the UI
  const ui = new UI();

  // validate
  if(title === '' || author === '' || isbn ==='') {
    // make an error alert
    ui.showAlert('some fields were missing info', 'error');
  } else {
  // add book to list
  ui.addBookToList(book);
  // add to local storage
  // the following method doesn't need to be instantiated since it's a static method
  Store.addBook(book);
  ui.showAlert('Book added!', 'success');
  ui.clearFields();
  }

  e.preventDefault;
});

// add event listener for delete function
document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  // Remove from local storage
  Store.removeBook(e.parentElement.previousElementSibling.textContent);
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault;
});