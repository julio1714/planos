import BookService from './services/BookService';
const bookService = new BookService();
//import jsPDF from ('jspdf');
//const $ = require( 'jquery' );


import { format } from 'timeago.js';

class UI{
    async renderBooks() {
        const books = await bookService.getBook();
        const booksCardContainer = document.getElementById('books-cards');
        booksCardContainer.innerHTML = '';
        books.forEach((book) => {
          const div = document.createElement('div');
          div.className = '';
          div.innerHTML = `  
            
              <table class="table table-borderless border border-dark table-responsive id="pdf">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col" colspan="2" class="h3 text-center"> Control de Diseño</th>
                   
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <h3>${book.title}</h3>
                      <h5>${book.author}</h5>
                      <h5>${book.isbn}</h5>
                    </td>

                    <td colspan="2">
                      <img src='http://localhost:3000${book.imagePath}' class="card-img-top">
                    </td>

                    <td class="h5">
                    <p class="text-lowercase" style="margin:0 0 7em"> ${book.ancho/2+0.5} </p>
                    <p class="text-lowercase" style="margin:0 0 7em">  ${book.alto+0.8} </p>
                    <p class="text-lowercase"> ${book.ancho/2+0.5} </p>          
                    </td>

                  </tr>
                  <tr>
                    <td></td>
                    <td class="h5">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;${book.largo+0.3}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;${book.ancho+0.5}     
                    </td>
                    <td class="h5">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;${book.largo+0.5}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${book.ancho+0.3} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${3.5}
                    </td>
                    <td ></td>
                  </tr>
                  <th scope="row"></th>
                    <td>
                      <a href="#" class="btn btn-outline-danger delete" _id="${book._id}">Eliminar</a>               
      
                    <td>
                      <a class="btn btn-outline-success" id="dpdf">Descargar PDF</a>
                    </td>
                    <td>
                      <small>${format(book.created_at)}</small>
                    </td>
                </tbody>
              </table>
            

          `;
          booksCardContainer.appendChild(div);
        });
      }
    
    async addANewBook(book) {
      await bookService.postBook(book);
      this.renderBooks(this.URI);
      this.clearBookForm();
    }
    
    clearBookForm() {
      document.getElementById('book-form').reset();
      document.getElementById('title').focus();
    }

    async deleteBook(bookId) {
      await bookService.deleteBook(bookId);
      this.renderBooks();
    }

      /**
      renderMessage(message, colorMessage, secondsToRemove) {
        // Creating a div
        const div = document.createElement('div');
        // Styling the div
        div.className = `message ${colorMessage}`;
        // Adding Text to the div
        div.appendChild(document.createTextNode(message));
        // Puting in the documnet
        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');
        container.insertBefore(div, bookForm);
        // Removing the div after some secconds
        setTimeout(() => {
          document.querySelector('.message').remove();
        }, secondsToRemove);
      }  */
       
       
      genPDF() {
        const doc = new jsPDF({
          orientation: 'landscape'
        })
         
        doc.text('Diseño de Planos', 125, 15);
        doc.fromHTML($('#pdf').get(0), 15, 15);
        doc.save('plano.pdf');     
      }

      
}

export default UI;