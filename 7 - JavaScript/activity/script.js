let library = [];

// Function used to check if localStorage is supported.
function isLocalStorageSupported() {
  return typeof localStorage !== undefined && localStorage !== null;
}
console.log(isLocalStorageSupported());

function getBooks() {
  const lib = localStorage.getItem("library");
  if (lib != null) {
    library = JSON.parse(lib);
  } else {
    library = [];
  }
}

function updateBooks() {
  if (library) {
    const deserializedValue = JSON.stringify(library);
    localStorage.setItem("library", deserializedValue);
  }
  displayAvailableBooks();
}

function enterABook() {
  event.preventDefault();
  let title = document.getElementById("title-id").value;
  var result = library.findIndex((book) => {
    return book.title === title;
  });
  if (result > -1) {
    document.getElementById("errorDiv").innerHTML =
      "<font color=red>Title already exists!</font>";
    return false;
  }
  document.getElementById("errorDiv").innerHTML = "";
  let book = {
    title: title,
    author: document.getElementById("author-id").value,
    isAvailable: true,
  };
  library.push(book);
  updateBooks();
  enterBook.reset();
}

function displayAvailableBooks() {
  let lib = document.querySelector("#booksLibrary");
  lib.innerHTML = "";
  let divEntry = document.createElement("div");
  let divTitle = document.createElement("div");
  let divAuthor = document.createElement("div");
  let divBorrowReturn = document.createElement("div");
  divEntry.className = "row";
  divTitle.className = "rowHeader";
  divAuthor.className = "rowHeader";
  divBorrowReturn.className = "rowHeader";
  divTitle.textContent = "Title";
  divAuthor.textContent = "Author";
  divBorrowReturn.textContent = "Borrow/Return";
  divEntry.append(divTitle, divAuthor, divBorrowReturn);
  lib.appendChild(divEntry);
  for (let book of library) {
    let divEntry = document.createElement("div");
    let divTitle = document.createElement("div");
    let divAuthor = document.createElement("div");
    let divBorrowReturn = document.createElement("div");
    divEntry.className = "row";
    divTitle.className = "rowEntry";
    divAuthor.className = "rowEntry";
    divBorrowReturn.className = "rowEntry";
    divTitle.textContent = book.title;
    divAuthor.textContent = book.author;
    let btnBorrow = document.createElement("button");
    if (book.isAvailable) {
      btnBorrow.textContent = "Borrow";
      btnBorrow.addEventListener("click", borrowBook);
    } else {
      btnBorrow.textContent = "Return";
      btnBorrow.addEventListener("click", borrowBook);
    }
    divBorrowReturn.appendChild(btnBorrow);
    divEntry.append(divTitle, divAuthor, divBorrowReturn);
    lib.appendChild(divEntry);
  }
}

function borrowBook() {
  event.preventDefault();
  const target = event.target;
  let title = target.parentElement.parentElement.firstChild.textContent.trim();
  var result = library.findIndex((book) => {
    return book.title === title;
  });
  if (library[result].isAvailable) {
    library[result].isAvailable = false;
    alert("Confirming book borrow");
  } else {
    library[result].isAvailable = true;
    alert("Book returned");
  }
  updateBooks();
}

getBooks();
displayAvailableBooks();
let enterBook = document.getElementById("enterBook");
enterBook.addEventListener("submit", enterABook);
