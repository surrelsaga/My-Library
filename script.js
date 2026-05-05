const myLibrary = [];

// YOUR CODE HERE
// Book constructor, addBookToLibrary, removeBookFromLibrary, displayBooks...
function Book(title, author, pages, readStatus, ID) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.ID = ID
}

function addBookToLibrary(title, author, pages, readStatus) {
  // Assign an unique ID for each book to prevent issues when books are removed or rearranged
  const uuid = crypto.randomUUID();

  // Create book and add to the library
  const oneBook = new Book(title, author, pages, readStatus, uuid);
  myLibrary.push(oneBook);
}

// Hardcoded books (temporary)
addBookToLibrary('H', 'G', 250, true);
addBookToLibrary('G','K', 69, false);
console.log(myLibrary);

function displayBooks(myLibrary) {
  myLibrary.forEach( function(item) {
    // Generate book cards then put inside the display grid
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    const libraryGrid = document.querySelector('#library-grid');
    libraryGrid.appendChild(bookCard);

    // Retrieve book's data from the library and display in the book card
    let bookTitle = document.createElement('p');
    bookTitle.textContent = item.title;
    bookTitle.classList.add('book-title');

    let bookAuthor = document.createElement('p');
    bookAuthor.textContent = `Author: ${item.author}`;
    bookAuthor.classList.add('book-author');

    let bookPages = document.createElement('p');
    bookPages.textContent = `Number of pages: ${item.pages}`;
    bookPages.classList.add('book-pages');

    let bookReadStatus = document.createElement('button');
    bookReadStatus.textContent = `Status: ${item.readStatus}`;
    bookReadStatus.classList.add('book-read-status');

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookReadStatus);
  });
}

// Test display
displayBooks(myLibrary);

// =====================
// UI BOILERPLATE
// =====================

const newBookBtn = document.querySelector("#new-book-btn");
const dialog = document.querySelector("#book-dialog");
const cancelBtn = document.querySelector("#cancel-btn");
const bookForm = document.querySelector("#book-form");

newBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () => dialog.close());

bookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents page reload on form submit

  // YOUR CODE HERE
  // read form values, call your functions, re-render, close dialog

  // Read form values
  const newBookTitle = document.querySelector('#title').value;
  let newBookAuthor = document.querySelector('#author').value;
  let newBookPages = Number( document.querySelector('#pages').value );

  let readStatus;
  let alreadyRead = document.querySelector('#read')
  if (alreadyRead.checked) {
    readStatus = true;
  } else {
    readStatus = false;
  }

  addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, readStatus);
  dialog.close();
  displayBooks(myLibrary);
});
