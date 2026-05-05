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

// Bring this out so it's in global scope that any function can access
const libraryGrid = document.querySelector('#library-grid');

function displayBooks(myLibrary) {
  myLibrary.forEach( function(item) {
    // Generate book cards then put inside the display grid
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-id', item.ID); // Add a data-id attribute to each book card so later is used to identify which book card to remove
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

    let removeBookBtn = document.createElement('button');
    removeBookBtn.classList.add('btn-remove');
    removeBookBtn.textContent = 'Remove';

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookReadStatus);
    bookCard.appendChild(removeBookBtn);
  });
}

function removeBook(bookCard) {
  const bookCardID = bookCard.dataset.id;
  const bookCardToRemove = document.querySelector(`[data-id="${bookCardID}"]`);
  libraryGrid.removeChild(bookCardToRemove);
}


// Test display
displayBooks(myLibrary);

const removeBookBtn = [...document.querySelectorAll('.btn-remove')];
console.log(removeBookBtn);
removeBookBtn.forEach( function(item) {
  item.addEventListener('click', function() {
    removeBook( item.parentNode );
    console.log("hi");
  });
});

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
  // Because displayBooks will iterate through myLibrary and display all the books
  // If use that function for myLibrary, it will end up displaying duplicates
  // Fix: put the new book inside an array and pass to displayBooks()
  displayBooks( [ myLibrary[myLibrary.length - 1] ] );
});
