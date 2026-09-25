const myLibrary = [];
const history = [];
const libraryContainer = document.getElementById("library-container");
const newBookBtn = document.getElementById("new-book-btn");
const dialog = document.getElementById("book-dialog");
const closeDialogBtn = document.getElementById("close-dialog");
const bookForm = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const undoBtn = document.getElementById("undo-btn");

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read, recordHistory = true) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  if (recordHistory) {
    history.push({
      type: "add",
      book: book,
    });
  }
//   console.log(history);
}

function displayBooks() {
  libraryContainer.innerHTML = "";

  myLibrary.forEach(function (book) {
    const card = document.createElement("div");

    card.classList.add("book-card");

    card.dataset.id = book.id;

    card.innerHTML = `
    <h2>${book.title}</h2>
    <p><strong>Author:</strong>${book.author}</p>
    <p><strong>Pages:</strong>${book.pages}</p>
    <p><strong>Status:</strong>
        ${book.read ? "Read" : "Not Read"}
    </p>
    <button class="remove-btn">Remove</button>
    <button class="toggle-btn">Toggle Read</button>
    `;

    // const removeBtn = card.querySelector(".remove-btn");
    // const toggleBtn=card.querySelector(".toggle-btn");

    // removeBtn.addEventListener("click", function () {
    //   const index = myLibrary.findIndex(function (item) {
    //     return item.id === book.id;
    //   });

    //   myLibrary.splice(index, 1);

    //   displayBooks();
    // });

    // toggleBtn.addEventListener("click",function(){
    //     book.toggleReadStatus();
    //     displayBooks();
    // });

    libraryContainer.appendChild(card);
  });
}

addBookToLibrary("Atomic Habits", "James Clear", 320, true);

addBookToLibrary("Harry Potter", "J.K. Rowling", 450, false);

addBookToLibrary("The Alchemist", "Paulo Coelho", 208, true);

console.log(myLibrary);

displayBooks();

libraryContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-btn")) {
    const card = event.target.closest(".book-card");
    const id = card.dataset.id;
    const index = myLibrary.findIndex(function (book) {
      return book.id === id;
    });

    const deletedBook = myLibrary[index];

    history.push({
      type: "delete",

      book: deletedBook,

      index: index,
    });

    console.log(history);

    myLibrary.splice(index, 1);

    displayBooks();
  }

  if (event.target.classList.contains("toggle-btn")) {
    const card = event.target.closest(".book-card");

    const id = card.dataset.id;

    const book = myLibrary.find(function (book) {
      return book.id === id;
    });

    history.push({
      type: "toggle",

      id: book.id,
    });

    console.log(history);

    book.toggleReadStatus();

    displayBooks();
  }
});

undoBtn.addEventListener("click", () => {
  const lastAction = history.pop();

  if (!lastAction) {
    return;
  }

  if (lastAction.type === "add") {
    const index = myLibrary.findIndex(function (book) {
      return book.id === lastAction.book.id;
    });

    myLibrary.splice(index, 1);
  }

  if (lastAction.type === "delete") {
    myLibrary.splice(
      lastAction.index,

      0,

      lastAction.book,
    );
  }

  if (lastAction.type === "toggle") {
    const book = myLibrary.find(function (book) {
      return book.id === lastAction.id;
    });

    if (book) {
      book.toggleReadStatus();
    }
  }

  displayBooks();
});

console.log(history);

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", function () {
  dialog.close();
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //   const title = document.getElementById("title").value;
  //   const author = document.getElementById("author").value;
  //   const pages = document.getElementById("pages").value;
  //   const read = document.getElementById("read").checked;

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = Number(pagesInput.value);
  const read = readInput.checked;
  addBookToLibrary(title, author, pages, read);

  displayBooks();

  bookForm.reset();

  dialog.close();
});
