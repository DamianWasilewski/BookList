class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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

  showAlert(message, className) {
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

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI;

      ui.addBookToList(book);
    });
  }

  static addBookToLocal(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBookFromLocal(isbn) {
    const books = Store.getBooks();
    
    books.forEach(function(book, index) {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

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
    //Add book to Local Storage
    Store.addBookToLocal(book);
    ui.showAlert("Book Added!", 'success');
    ui.clearFields();
  }

  e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {

  const ui = new UI();

  ui.deleteBook(e.target);
  //Remove from Local Storage
  Store.removeBookFromLocal(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('Record removed!', 'success');

  e.preventDefault();
});