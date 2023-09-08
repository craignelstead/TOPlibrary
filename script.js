//Get page elements: shelves, books, buttons, form
const shelf1 = document.getElementById('topshelf');
const shelf2 = document.getElementById('midshelf');
const shelf3 = document.getElementById('bottomshelf');

const bookAddBtn = document.getElementById('bookshelfbtn');

const booksOnShelfNL = document.getElementsByClassName('book');
const booksOnShelfArr = Array.from(booksOnShelfNL);

const myLibrary = [];

//Constructor for book
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    myLibrary.push(this);
}

let bookCount = booksOnShelfArr.length;

console.log(bookCount);

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const book2 = new Book('The Very Hungry Caterpillar', 'Eric Carle', 32, true);
const book3 = new Book('1984', 'George Orwell', 328, true);

// Book.prototype.sayHello = function() {
//     console.log('Hello, I am a book');
// }

function addBookToLibrary() {
    /*
    Validate input
    Take form info and create new object with it
    Add new book to DOM before last child
    */
}

Book.prototype.displayBook = function() {
    for (let i = 0; i < bookCount; i++) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const bookTitle = document.createElement('p');
        bookTitle.classList.add('title');
        bookTitle.textContent = `${this.title}`;
        bookDiv.appendChild(bookTitle);

        const bookAuthor = document.createElement('p')
        bookAuthor.classList.add('author');
        bookAuthor.textContent = `${this.author}`;
        bookDiv.appendChild(bookAuthor);

        //shelf1.appendChild(bookDiv);
        shelf1.insertBefore(bookDiv, bookAddBtn)
    }
}

myLibrary.forEach(function(book) {book.displayBook()});