import "./styles/app.css";
import Book from './models/Book.js';
import UI from './UI.js';

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  ui.renderBooks();
});


document.getElementById('book-form')
  .addEventListener('submit', function(e) {

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const largo = document.getElementById('largo').value;
    const ancho = document.getElementById('ancho').value;
    const alto = document.getElementById('alto').value;
    const image = document.getElementById('image').files;
    
    
    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);
    formData.append('largo', largo);
    formData.append('ancho', ancho);
    formData.append('alto', alto);


    // Instatiating the UI
    const ui = new UI();

    // New Book Object
    const book = new Book(title, author, isbn, largo, ancho, alto);

    // Validating User Input
    if (title === '' || author === '' || isbn === '') {
      ui.renderMessage('Please fill all the fields', 'error', 3000);
    } else {
      // Pass the new book to the UI
      ui.addANewBook(formData);
     //ui.renderMessage('New Book Added Successfully', 'success', 2000);
    }

    e.preventDefault();
  });


document.getElementById('books-cards')
  .addEventListener('click', e => {
    const ui = new UI();

    if (e.target.classList.contains('delete')) {
      ui.deleteBook(e.target.getAttribute('_id'));
      ui.renderMessage('¡Plano Eliminado con éxito!', 'error', 3000);
    }

    genPDF();
    e.preventDefault();
  });
