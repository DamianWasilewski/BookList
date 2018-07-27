function Book (title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  const listRow = document.createElement('tr');
  listRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(listRow);
}

UI.prototype.showAlert = function (message, className) {
  const errorDiv = document.createElement('div');
  errorDiv.className = `alert ${className}`;
  errorDiv.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(errorDiv, form);

  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 2000);
}

UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

document.getElementById('book-form').addEventListener('submit', function(e){
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value


  const book = new Book(title, author, isbn);

  const ui = new UI();
  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill all fields', 'error');
  } else {
    ui.addBookToList(book);
    ui.showAlert("Book Added!", 'success');
    ui.clearFields();
  }

  e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {

  const ui = new UI();

  ui.deleteBook(e.target);
  ui.showAlert('Record removed!', 'success');

  e.preventDefault();
});