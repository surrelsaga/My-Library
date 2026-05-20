const myLibrary = [];

// function Book(title, author, pages, readStatus, ID) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.readStatus = readStatus;
//   this.ID = ID
// }

// // A helper prototype function to for book objects to toggle its own read status
// Book.prototype.toggleReadStatus = function() {
//   this.readStatus = !this.readStatus;
// }

// REFACTOR
class Book {
  constructor(title, author, pages, readStatus, ID) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.ID = ID;
  }

  // Class methods will always be added to the class constructor prototype property
  toggleReadStatus() {
    this.readStatus = !this.readStatus;
  }
}

function addBookToLibrary(title, author, pages, readStatus) {
  // Assign an unique ID for each book to prevent issues when books are removed or rearranged
  const uuid = crypto.randomUUID();

  // Create book and add to the library
  const oneBook = new Book(title, author, pages, readStatus, uuid);
  myLibrary.push(oneBook);

  return oneBook;
}

// Hardcoded books (examples)
addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 295, true);
addBookToLibrary('Dune','Frank Herbert', 412, false);
addBookToLibrary('Atomic Habits', 'James Clear', 256, true);

// Bring this out so it's in global scope where any functions can access
const libraryGrid = document.querySelector('#library-grid');

function removeBook(bookCard) {
  // Read id to identify which book card to remove
  const bookCardID = bookCard.dataset.id;

  // #1: Remove from DOM
  const bookCardToRemove = document.querySelector(`[data-id="${bookCardID}"]`);
  libraryGrid.removeChild(bookCardToRemove);

  // #2: Remove from the library (it's an array)
  myLibrary.forEach( function(item) {
    if (item.ID === bookCardID) {
      // Find index of item with the id
      const bookIndex = myLibrary.indexOf(item);

      // Remove the book
      myLibrary.splice(bookIndex, 1);
    }
  });

  // Alternative for #2 (cleaner): findIndex()
  // let bookToRemoveIndex = myLibrary.findIndex(book => book.ID === bookCardID);
  // myLibrary.splice(bookToRemoveIndex, 1);
}

function displayBook(oneBook) {
  // Generate book cards then put inside the display grid
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.setAttribute('data-id', oneBook.ID); // Add a data-id attribute to each book card so later is used to identify which book card to remove
  libraryGrid.appendChild(bookCard);

  // Retrieve book's data and display in the book card
  const bookTitle = document.createElement('p');
  bookTitle.textContent = oneBook.title;
  bookTitle.classList.add('book-title');

  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = `Author: ${oneBook.author}`;
  bookAuthor.classList.add('book-author');

  const bookPages = document.createElement('p');
  bookPages.textContent = `Number of pages: ${oneBook.pages}`;
  bookPages.classList.add('book-pages');
  
  const readStatus = document.createElement('p');
  readStatus.classList.add('book-read-status');
  if (oneBook.readStatus) {
    readStatus.textContent = 'Already read';
    readStatus.classList.add('read');
  } else {
    readStatus.textContent = "Haven't read";
    readStatus.classList.add('not-read');
  }

  //BUTTONS 
  const cardButtons = document.createElement('div');
  cardButtons.classList.add('card-buttons');

  const toggleStatusBtn = document.createElement('button');
  toggleStatusBtn.textContent = 'Toggle read';
  toggleStatusBtn.classList.add('btn-toggle-read');

  const removeBookBtn = document.createElement('button');
  removeBookBtn.classList.add('btn-remove');
  removeBookBtn.textContent = 'Remove';

  cardButtons.appendChild(toggleStatusBtn);
  cardButtons.appendChild(removeBookBtn);

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(readStatus);
  bookCard.appendChild(cardButtons);

  // Add click event to each new remove buttons of a book card
  removeBookBtn.addEventListener('click', function() {
    removeBook(bookCard);
  });

  toggleStatusBtn.addEventListener('click', function() {
    if(oneBook.readStatus) {
      // Clear styling of the status text
      readStatus.classList.remove('read');

      // Rerender the status text
      readStatus.textContent = "Haven't read";
      readStatus.classList.add('not-read');

    } else {
      // Clear styling of the status text
      readStatus.classList.remove('not-read');

      // Rerender the status text
      readStatus.textContent = "Already read";
      readStatus.classList.add('read');
    }

    // Change status
    oneBook.toggleReadStatus();
    console.log(myLibrary);
  });
}

// Display book card example
myLibrary.forEach( function(item) {
  displayBook(item);
});

const newBookBtn = document.querySelector("#new-book-btn");
const dialog = document.querySelector("#book-dialog");
const cancelBtn = document.querySelector("#cancel-btn");
const bookForm = document.querySelector("#book-form");

newBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () => dialog.close());

bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // prevents page reload on form submit

  // Read form values
  const newBookTitle = document.querySelector('#title').value;
  const newBookAuthor = document.querySelector('#author').value;
  const newBookPages = Number( document.querySelector('#pages').value );

  let readStatus;
  const alreadyRead = document.querySelector('#read')
  if (alreadyRead.checked) {
    readStatus = true;
  } else {
    readStatus = false;
  }

  const newBook = addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, readStatus);
  dialog.close();
  displayBook(newBook);
});
