function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, have ${read ? '' : 'not '}read`;
    }
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const book2 = new Book('The Tall One', 'J.K. Jokin', 590, true);

console.log(book1.info());
console.log(book2.info());

Book.prototype.sayHello = function() {
    console.log('Hello, I am a book');
}

book1.sayHello();
book2.sayHello();