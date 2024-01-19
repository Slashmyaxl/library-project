const myLibrary = [];

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');

const enableForm = document.querySelector('#enable-form');
const form = document.querySelector('#book-form');
const addBookButton = document.getElementById('add');
const bookshelf = document.querySelector('.bookshelf');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

let book1 = new Book('Fahrenheit 451', 'Ray Bradbury', 459, true);
let book2 = new Book('Macbeth', 'William Shakespeare', 231, false);
let book3 = new Book('Foundation', 'Isaac Asimov', 392, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

function addBookToLibrary(book) {
    myLibrary.push(book);
    tabulateLibrary(myLibrary);
}

function tabulateLibrary(array) {

    while (bookshelf.firstChild) {
        bookshelf.removeChild(bookshelf.lastChild);
        }
    
    array.forEach(object => {
        
        const newSlot = document.createElement('tr');

        const bookTitle = document.createElement('td');
        bookTitle.textContent = `${object.title}`;

        const bookAuthor = document.createElement('td');
        bookAuthor.textContent = `${object.author}`;

        const bookPages = document.createElement('td');
        bookPages.textContent = `${object.pages}`;

        const bookRead = document.createElement('td');
        const readButton = document.createElement('button');
        readButton.className = `read ${object.read}`
        object.read === true ? readButton.textContent = 'Read' : readButton.textContent = 'Not Read';
            readButton.addEventListener('click', (e) => {
                console.log(e.target);
                console.log(object.read);
    
                if (object.read === true) {
                    object.read = false;
                    e.target.className = 'read false';
                    e.target.textContent = 'Not Read';
                } else {
                    object.read = true;
                    e.target.className = 'read true';
                    e.target.textContent = 'Read';
                }    
            });
        bookRead.appendChild(readButton);

        const bookRemove = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove');
        removeButton.setAttribute('id', `${array.indexOf(object)}`)
        removeButton.textContent = 'X';
        
        bookRemove.appendChild(removeButton);

        bookshelf.appendChild(newSlot);
        newSlot.appendChild(bookTitle);
        newSlot.appendChild(bookAuthor);
        newSlot.appendChild(bookPages);
        newSlot.appendChild(bookRead);
        newSlot.appendChild(bookRemove);
    });

    let removeButtons = document.querySelectorAll('.remove');

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            myLibrary.splice(button.id, 1);
            tabulateLibrary(myLibrary);
        });
    });
};

// Buttons

enableForm.addEventListener('click', () => {
    form.toggleAttribute('hidden');
});

pages.addEventListener('input', checkPages);

function checkPages () {
    const error = document.querySelector('#pages + span.error');

    if (pages.validity.patternMismatch) {
        error.textContent = 'Please enter number of pages.';
        error.className = 'error active';
    } else {
        error.className = 'error';
        error.textContent = '';
    }
}

function checkTitle () {
    const error = document.querySelector('#title + span.error');

    if (!title.validity.valid) {
        error.textContent = 'Please enter a title.';
        error.className = 'error active';
    } else {
        error.className = 'error';
        error.textContent = '';
    }
}

form.addEventListener('submit', function(event) {
    checkTitle();

    if (!pages.validity.valid | !title.validity.valid) {
        event.preventDefault();
    } else {
        const newBook = new Book (title.value, author.value, pages.value, read.checked);
        addBookToLibrary(newBook);
        event.preventDefault();
    }
});
