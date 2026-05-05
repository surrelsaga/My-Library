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

addBookToLibrary('H', 'G', 250, true);
addBookToLibrary('G','K', 69, false);
console.log(myLibrary);

// =====================
// UI BOILERPLATE
// =====================

// const newBookBtn = document.querySelector("new-book-btn");
// const dialog = document.querySelector("book-dialog");
// const cancelBtn = document.querySelector("cancel-btn");
// const bookForm = document.querySelector("book-form");

// newBookBtn.addEventListener("click", () => dialog.showModal());
// cancelBtn.addEventListener("click", () => dialog.close());

// bookForm.addEventListener("submit", (e) => {
//   e.preventDefault(); // prevents page reload on form submit

//   // YOUR CODE HERE
//   // read form values, call your functions, re-render, close dialog
// });
