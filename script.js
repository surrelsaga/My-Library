const myLibrary = [];

// YOUR CODE HERE
// Book constructor, addBookToLibrary, removeBookFromLibrary, displayBooks...
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(title, author, pages, readStatus) {
  const oneBook = new Book(title, author, pages, readStatus);
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
