const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, have ${read ? '' : 'not '}read`;
    }
}

// const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
// const book2 = new Book('The Tall One', 'J.K. Jokin', 590, true);

// Book.prototype.sayHello = function() {
//     console.log('Hello, I am a book');
// }

function addBookToLibrary() {
    
}