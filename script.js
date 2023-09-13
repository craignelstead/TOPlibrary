//Get page elements: shelves, books, buttons, form
const shelf1 = document.getElementById('topshelf');
const shelf2 = document.getElementById('midshelf');
const shelf3 = document.getElementById('bottomshelf');

//Add a book button on shelf
const bookAddBtn = document.getElementById('bookshelfbtn');

//Buttons
const addToShelfBtn = document.getElementById('addtoshelf');
const cancelBtn = document.getElementById('cancel');
const bookShelfBtn = document.getElementById('bookshelfbtn');
const submitChangesBtn = document.getElementById('submitchanges');
const removeBtn = document.getElementById('remove');

//Card header
const cardTitle = document.getElementById('notecardheadtitle');

//Form fields
const valTitle = document.getElementById('title');
const valAuthor = document.getElementById('author');
const valPages = document.getElementById('pages');
const valHaveRead = document.getElementById('haveread');

//Form validation messages
const invalidTitle = document.getElementById('titlemessage');
const invalidAuthor = document.getElementById('authormessage');
const invalidPages = document.getElementById('pagesmessage');

//Array of books
const myLibrary = [];

//Visibility on for form inputs and labels
function showForm() {
    const labelsNL = document.querySelectorAll('label');
    const inputsNL = document.querySelectorAll('input');

    const labels = Array.from(labelsNL);
    const inputs = Array.from(inputsNL);

    labels.forEach((label) => label.classList.remove('hiddenclass'));
    inputs.forEach((input) => input.classList.remove('hiddenclass'));

    valTitle.focus();
}

//Set default form visibility to hidden
hideForm();
//Visibility on for form inputs and labels
function hideForm() {
    const labelsNL = document.querySelectorAll('label');
    const inputsNL = document.querySelectorAll('input');

    const labels = Array.from(labelsNL);
    const inputs = Array.from(inputsNL);

    labels.forEach((label) => label.classList.add('hiddenclass'));
    inputs.forEach((input) => input.classList.add('hiddenclass'));

    invalidTitle.classList.add('hiddenclass');
    invalidAuthor.classList.add('hiddenclass');
    invalidPages.classList.add('hiddenclass');
}

//Constructor for book
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    myLibrary.push(this);
}

//Default books on shelf
const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const book2 = new Book('1984', 'George Orwell', 328, true);
const book3 = new Book('Life of Pi', 'Yann Martel', 352, false);
const book4 = new Book('The Help', 'Kathryn Stockett', 524, false);
const book5 = new Book('The Street', 'Ann Petry', 435, false);
const book6 = new Book('The Sweetness of Water', 'Nathan Harris', 368, false);

listenToButtons();
//Add event listeners
function listenToButtons() {
    addToShelfBtn.addEventListener('click', addBookToLibrary);
    cancelBtn.addEventListener('click', cancelEdit);
    bookShelfBtn.addEventListener('click', createNewBook, false);
    submitChangesBtn.addEventListener('click', editBook, false);
    removeBtn.addEventListener('click', removeBook, false);
}

//
function addBookToLibrary(event) {
    //Prevent submit default action
    event.preventDefault();

    if (valTitle.classList.contains('hiddenclass')) {return;}

    let invalidInput = validateInput();

    if (invalidInput) {
        return;
    }

    //Create new book
    const newBook = new Book(valTitle.value, valAuthor.value, valPages.value, 
        valHaveRead.checked);

    newBook.displayBook();

    cardTitle.textContent = 'Select or add a book to get started';
    valTitle.value = '';
    valAuthor.value = '';
    valPages.value = '';
    valHaveRead.checked = false

    bookShelfBtn.classList.remove('bookshelfbtncurrent');

    hideForm();
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
        bookDiv.addEventListener('click', function(event) {
            showForm();

            //Remove selectedBook class from all books
            const allBooksNL = document.getElementsByClassName('book');
            const allBooks = Array.from(allBooksNL);
            allBooks.forEach(book => {
                if (book !== event.currentTarget) {
                    //Remove selectedBook
                    book.classList.remove('selectedBook');
                }
                else {book.classList.add('selectedBook')}
            });

            //Enable / disable buttons
            submitChangesBtn.removeAttribute('disabled');
            addToShelfBtn.setAttribute('disabled', 'disabled');
            removeBtn.removeAttribute('disabled');

            const bookNum = this.getAttribute('data-bookNum');

            cardTitle.textContent = myLibrary[bookNum].title;
            valTitle.value = myLibrary[bookNum].title;
            valAuthor.value = myLibrary[bookNum].author;
            valPages.value = myLibrary[bookNum].pages;
            valHaveRead.checked = myLibrary[bookNum].read;
        });

        //Determine which shelf to add book to
        //If shelf is full, removes book add btn from that shelf
        if (bookCount >= 0 && bookCount < 8) {
            shelf1.insertBefore(bookDiv, bookAddBtn);
        }
        else if(bookCount === 8) {
            shelf1.insertBefore(bookDiv, bookAddBtn);
            shelf2.appendChild(bookAddBtn);
        }
        else if(bookCount > 8 && bookCount < 16) {
            shelf2.insertBefore(bookDiv, bookAddBtn);
        }
        else if(bookCount === 16) {
            shelf2.insertBefore(bookDiv, bookAddBtn);
            shelf3.appendChild(bookAddBtn);
        }
        else if(bookCount > 16 && bookCount < 24) {
            shelf3.insertBefore(bookDiv, bookAddBtn);
        }
        else {
            shelf3.insertBefore(bookDiv, bookAddBtn);
            bookAddBtn.remove();
        }
        addToShelfBtn.setAttribute('disabled', 'disabled');
        return;
    }
}

//Add initial books to shelf
myLibrary.forEach(function(book) {book.displayBook()});

//Cancels any edits
function cancelEdit() {
    bookShelfBtn.classList.remove('bookshelfbtncurrent');
    hideForm();
    cardTitle.textContent = 'Select or add a book to get started';

    //Remove selectedBook class from all books
    const allBooksNL = document.getElementsByClassName('book');
    const allBooks = Array.from(allBooksNL);
    allBooks.forEach(book => book.classList.remove('selectedBook'));

    valTitle.classList.remove('invalid');
    valAuthor.classList.remove('invalid');
    valPages.classList.remove('invalid');

    addToShelfBtn.setAttribute('disabled', 'disabled');
    submitChangesBtn.setAttribute('disabled', 'disabled');
    removeBtn.setAttribute('disabled', 'disabled');
}

//Creates new book
function createNewBook() {
    showForm();
    submitChangesBtn.setAttribute('disabled', 'disabled');
    addToShelfBtn.removeAttribute('disabled');
    removeBtn.setAttribute('disabled', 'disabled');

    //Remove selectedBook class from all books
    const allBooksNL = document.getElementsByClassName('book');
    const allBooks = Array.from(allBooksNL);
    allBooks.forEach(book => book.classList.remove('selectedBook'));

    bookShelfBtn.classList.add('bookshelfbtncurrent');

    //Set blank values for form
    cardTitle.textContent = 'Enter New Book Info';
    valTitle.value = '';
    valAuthor.value = '';
    valPages.value = '';
    valHaveRead.checked = false
}

function doNothing() {
    //The most useless function in the world
}

//Validate input
function validateInput() {
    let invalidInput = false;

    //Validate title input
    if (valTitle.value.length === 0 || valTitle.value.length > 22) {
        valTitle.classList.add('invalid');
        invalidTitle.classList.remove('hiddenclass');
        invalidTitle.textContent = 'Book title must be between 1 and 22 characters.';
        invalidInput = true;
    }
    else {
        valTitle.classList.remove('invalid');
        invalidTitle.classList.add('hiddenclass');
    }

    //Validate author input
    if (valAuthor.value.length === 0 || valAuthor.value.length > 22) {
        valAuthor.classList.add('invalid');
        invalidAuthor.classList.remove('hiddenclass');
        invalidAuthor.textContent = 'Author name must be between 1 and 22 characters.';
        invalidInput = true;
    }
    else {
        valAuthor.classList.remove('invalid');
        invalidAuthor.classList.add('hiddenclass');
    }

    //Validate pages input
    if (valPages.value < 1) {
        valPages.classList.add('invalid');
        invalidPages.classList.remove('hiddenclass');
        invalidPages.textContent = 'Page number must be greater than 0.';
        invalidInput = true;
    }
    else {
        valPages.classList.remove('invalid');
        invalidPages.classList.add('hiddenclass');
        valPages.value = Math.round(valPages.value);
    }

    return invalidInput;
}

//Submit edits to book
function editBook(event) {
    //Prevent submit default action
    event.preventDefault();

    const allBooksNL = document.getElementsByClassName('book');
    const thisBook = Array.from(allBooksNL).filter((book) => book.classList.contains('selectedBook'));

    //Filtered array - only value is the book with the selectedBook class
    const bookNum = thisBook[0].getAttribute('data-bookNum');

    //Data validation
    let invalidInput = validateInput();
    if (invalidInput) {
        return;
    }

    //Update values
    myLibrary[bookNum].title = valTitle.value;
    myLibrary[bookNum].author= valAuthor.value;
    myLibrary[bookNum].pages = valPages.value;
    myLibrary[bookNum].read = valHaveRead.checked;

    //Change appearance on shelf
    let shelfTitle = thisBook[0].querySelector('.title');
    shelfTitle.textContent = myLibrary[bookNum].title;
    let shelfAuthor = thisBook[0].querySelector('.author');
    shelfAuthor.textContent = myLibrary[bookNum].author;

    cardTitle.textContent = 'Select or add a book to get started';
    hideForm();

    submitChangesBtn.setAttribute('disabled', 'disabled');


    //Remove selectedBook class from all books
    const allBooks = Array.from(allBooksNL);
    allBooks.forEach((book) => book.classList.remove('selectedBook'));
}

submitChangesBtn.setAttribute('disabled', 'disabled');
addToShelfBtn.setAttribute('disabled', 'disabled');

//Remove book from library
function removeBook(event) {
    //Prevent submit default action
    event.preventDefault();

    //Blank form and change card header
    hideForm();
    cardTitle.textContent = 'Select or add a book to get started';

    //Get all books, then filter to currently selected book
    const allBooksNL = document.getElementsByClassName('book');
    const allBooks = Array.from(allBooksNL);
    const deleteBook = Array.from(allBooksNL).filter((book) => book.classList.contains('selectedBook'));
    //Filtered array - only value is the book with the selectedBook class
    const bookNum = deleteBook[0].getAttribute('data-bookNum');

    let libCount = allBooks.length;

    //Remove selectedBook class from each book
    // allBooks.forEach(book => book.classList.remove('selectedBook'));

    // myLibrary.splice(myLibrary[bookNum], 1);

    for (let i = 0; i < libCount; i++) {;
        //If book to be deleted, remove from array
        if (bookNum == i) {
            myLibrary.splice(bookNum, 1);
        }
        //Remove all books from DOM to be re added later
        allBooks[i].remove();
    }

    //Re add bookAddBtn
    shelf1.appendChild(bookAddBtn);

    //Re add all books to shelf
    myLibrary.forEach(function(book) {book.displayBook()});
}