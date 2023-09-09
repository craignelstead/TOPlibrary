//Get page elements: shelves, books, buttons, form
const shelf1 = document.getElementById('topshelf');
const shelf2 = document.getElementById('midshelf');
const shelf3 = document.getElementById('bottomshelf');

//Add a book button on shelf
const bookAddBtn = document.getElementById('bookshelfbtn');

//Buttons
const editBookBtn = document.getElementById('editbook');
const addToShelfBtn = document.getElementById('addtoshelf');
const cancelBtn = document.getElementById('cancel');
const deleteBtn = document.getElementById('delete');
const bookShelfBtn = document.getElementById('bookshelfbtn');

//Card header
const cardTitle = document.getElementById('notecardheadtitle');

//Form fields
const valTitle = document.getElementById('title');
const valAuthor = document.getElementById('author');
const valPages = document.getElementById('pages');
const valHaveRead = document.getElementById('haveread');

//Array of books
const myLibrary = [];

toggleForm();
//Toggles visibility class on form inputs and labels
function toggleForm() {
    const labelsNL = document.querySelectorAll('label');
    const inputsNL = document.querySelectorAll('input');

    const labels = Array.from(labelsNL);
    const inputs = Array.from(inputsNL);

    labels.forEach((label) => label.classList.toggle('hiddenclass'));
    inputs.forEach((input) => input.classList.toggle('hiddenclass'));
}

//Constructor for book
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    myLibrary.push(this);
}

//let bookCount = booksOnShelfArr.length;

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const book2 = new Book('The Very Hungry Caterpillar', 'Eric Carle', 32, true);
const book3 = new Book('1984', 'George Orwell', 328, true);
const book4 = new Book('Life of Pi', 'Yann Martel', 281, false);
const book5 = new Book('The Help', 'Kathryn Stockett', 371, false);
// const book6 = new Book('1984', 'George Orwell', 328, true);
// const book7 = new Book('1984', 'George Orwell', 328, true);
// const book8 = new Book('1984', 'George Orwell', 328, true);
// const book9 = new Book('1984', 'George Orwell', 328, true);

listenToButtons();
//Add event listeners
function listenToButtons() {
    editBookBtn.addEventListener('click', editBook);
    addToShelfBtn.addEventListener('click', addBookToLibrary);
    cancelBtn.addEventListener('click', cancelEdit);
    deleteBtn.addEventListener('click', deleteBook);
    bookShelfBtn.addEventListener('click', createNewBook);
}

//
function addBookToLibrary() {
    /*
    Validate input
    Take form info and create new object with it
    Add new book to DOM before last child
    */
}

Book.prototype.displayBook = function() {
    for (let i = 0; i < myLibrary.length; i++) {
        //Get current books
        const booksOnShelfNL = document.getElementsByClassName('book');
        const booksOnShelfArr = Array.from(booksOnShelfNL);
        let bookCount = booksOnShelfArr.length;

        //Create Book Container div
        const bookDiv = document.createElement('div');
        //Give the book dataset relative to spot in array
        bookDiv.setAttribute('data-bookNum', bookCount -1);
        bookDiv.classList.add('book');

        //Create Title p
        const bookTitle = document.createElement('p');
        bookTitle.classList.add('title');
        bookTitle.textContent = `${this.title}`;
        bookDiv.appendChild(bookTitle);

        //Create Author p
        const bookAuthor = document.createElement('p')
        bookAuthor.classList.add('author');
        bookAuthor.textContent = `${this.author}`;
        bookDiv.appendChild(bookAuthor);

        //Add event listener to book
        //NEED TO ADJUST DATA NUM attribute
        bookDiv.addEventListener('click', function(event) {
            console.log(this.getAttribute('data-bookNum'));
        });

        //Determine which shelf to add book to
        if (bookCount >= 0 && bookCount < 8) {
            shelf1.insertBefore(bookDiv, bookAddBtn);
        }
        else if(bookCount >= 8 && bookCount < 16) {
            //Need to add something that moves book button to new shelf
            shelf2.insertBefore(bookDiv, bookAddBtn);
        }
        else if(bookCount >= 16 && bookCount < 24) {
            shelf3.insertBefore(bookDiv, bookAddBtn);
        }

        // bookCount = myLibrary.length;
        // console.log(bookCount);
        return;
    }
    console.log(myLibrary.length);
}

//Display book info on card
Book.prototype.displayCardInfo = function() {

}

myLibrary.forEach(function(book) {book.displayBook()});

//
function editBook() {

}

//
function cancelEdit() {

}

//
function deleteBook() {

}

//
function createNewBook() {

}
