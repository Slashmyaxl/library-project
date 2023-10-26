const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = isRead(read);

        function isRead(read) {
            return Boolean(read) === true ? 'Read' : 'Unread';
        }
    }
}

const enableForm = document.querySelector('#enable-form');
const form = document.querySelector('#book-form');
const addBookButton = document.getElementById('add');
const bookshelf = document.querySelector('.bookshelf');
let readButtons;
let removeButtons;

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
        readButton.setAttribute('class', 'status');
        readButton.setAttribute('id', `${object.read.toLowerCase()}`);
        readButton.textContent = `${object.read}`;
        bookRead.appendChild(readButton);

        const bookRemove = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'remove');
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

    readButtons = document.querySelectorAll('.status');
    removeButtons = document.querySelectorAll('.remove');

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            myLibrary.splice(button.id, 1);
            tabulateLibrary(myLibrary);
        });
    });

    readButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.getAttribute('id') === 'unread') {
                button.setAttribute('id', 'read');
                button.textContent = 'Read';
            } else {
                button.setAttribute('id', 'unread');
                button.textContent = 'Not Read';
            }    
        });
    });
}


// Buttons

enableForm.addEventListener('click', () => {
    form.toggleAttribute('hidden');
});

addBookButton.addEventListener('click', function(event) {

    event.preventDefault();
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');
    
    const newBook = new Book (title.value, author.value, pages.value, read.value);
    addBookToLibrary(newBook);
})

