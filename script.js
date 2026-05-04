const myLibrary = [];

// YOUR CODE HERE
// Book constructor, addBookToLibrary, removeBookFromLibrary, displayBooks...

// =====================
// UI BOILERPLATE
// =====================

const newBookBtn = document.getElementById("new-book-btn");
const dialog = document.getElementById("book-dialog");
const cancelBtn = document.getElementById("cancel-btn");
const bookForm = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () => dialog.close());

bookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents page reload on form submit

  // YOUR CODE HERE
  // read form values, call your functions, re-render, close dialog
});
