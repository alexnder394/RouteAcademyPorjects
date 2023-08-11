// *CREATE UPDATE READ DELETE + SEARCH

// Object to hold the input fields for bookmarks.
var bookMarksList = {
  bookmarkName: document.getElementById("bn"),
  bookmarkLink: document.getElementById("bl"),
};

// References to the HTML table body and the Add/Update button.
var tableBody = document.getElementById("tableBody");
var addButton = document.getElementById("addBtn");

// Array to hold all the bookmarks.
var bookmarks = [];

// Check if bookmarks are saved in localStorage, if so, retrieve and use them.
if (localStorage.getItem("bookmarks")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
}

// Display bookmarks on page load.
displayBookmarks();

// * C => create
// Function to add a new bookmark or update an existing one.
function createNewBookmark(index) {
  // Create a bookmark object from the input values.
  var newBookmark = {
    name: bookMarksList.bookmarkName.value,
    link: bookMarksList.bookmarkLink.value,
  };

  // If the button says "Add", add the new bookmark to the array.
  if (addButton.innerHTML == "Add" || typeof index === "undefined") {
    bookmarks.push(newBookmark);
  }
  // If the button says "Update", replace the existing bookmark at the given index.
  else if (addButton.innerHTML == "Update") {
    bookmarks.splice(index, 1, newBookmark);
    // Reset button to "Add" mode after updating.
    addButton.innerHTML = "Add";
    addButton.classList.replace("btn-outline-warning", "btn-outline-info");
    addButton.onclick = function () {
      createNewBookmark();
    };
  }
  // Save the updated bookmarks array to localStorage.
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Refresh the displayed bookmarks.
  displayBookmarks();

  // Clear the input fields for the next operation.
  clearInput();
  bookMarksList.bookmarkLink.classList.remove("is-valid");
  bookMarksList.bookmarkName.classList.remove("is-valid");
}
// This will validate the link format when the user moves away from the input field.
function validateLink() {
  // Regular expression pattern to validate URL format.
  var linkPattern =
    /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?$/;

  if (!linkPattern.test(bookMarksList.bookmarkLink.value)) {
    bookMarksList.bookmarkLink.classList.add("is-invalid");
    return false;
  } else {
    bookMarksList.bookmarkLink.classList.remove("is-invalid");
    bookMarksList.bookmarkLink.classList.add("is-valid");
    return true;
  }
}
function validateName() {
  var namePattern = /^[A-Z][a-zA-Z]*$/;
  if (!namePattern.test(bookMarksList.bookmarkName.value)) {
    bookMarksList.bookmarkName.classList.add("is-invalid");
    return false;
  } else {
    bookMarksList.bookmarkName.classList.remove("is-invalid");
    bookMarksList.bookmarkName.classList.add("is-valid");
    return true;
  }
}
bookMarksList.bookmarkLink.onkeyup = function () {
  validateLink();
  if (validateLink()) {
    addButton.removeAttribute("disabled");
  } else {
    addButton.disabled = "true";
  }
};
bookMarksList.bookmarkName.onkeyup = function () {
  validateName();
  if (validateName()) {
    addButton.removeAttribute("disabled");
  } else {
    addButton.disabled = "true";
  }
};
// clear all input fields
function clearInput() {
  bookMarksList.bookmarkName.value = "";
  bookMarksList.bookmarkLink.value = "";
}
// Logic to display a single bookmark.
function displayBookmark(bookmark, index) {
  return `
    <tr>
      <td>${index + 1}</td>
      <td>${bookmark.name}</td>
      <td>
        <a href="${bookmark.link}" 
        class="btn btn-primary" target="_blank">Visit</a>
      </td>
      <td>
        <button class="btn btn-warning" onclick="updateRecord(${index})">Update</button>
      </td>
      <td>
        <button class="btn btn-danger" onclick="deleteBookmark(${index})">Delete</button>
      </td>
    </tr>
  `;
}

// * R => read
// Function to display all bookmarks in the table.
function displayBookmarks() {
  var displayList = "";
  for (var i = 0; i < bookmarks.length; i++) {
    displayList += displayBookmark(bookmarks[i], i);
  }
  tableBody.innerHTML = displayList;
}

// * U => update
// Function to prepare for updating a bookmark.

function updateRecord(index) {
  // Populate the input fields with the data from the selected bookmark.
  let updateIndex = index;
  bookMarksList.bookmarkName.value = bookmarks[updateIndex].name;
  bookMarksList.bookmarkLink.value = bookmarks[updateIndex].link;

  // Change the button to "Update" mode.
  addButton.innerHTML = "Update";
  addButton.classList.replace("btn-outline-info", "btn-outline-warning");

  // Set the button's click event to call createNewBookmark with the current index, for updating.
  addButton.onclick = function () {
    createNewBookmark(updateIndex);
  };
}

// * D => delete
// Function to delete a bookmark.
function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks();
}

// * S => search
// Function to search through all bookmarks
function searchBookmarks(term) {
  //  For each bookmark in the bookmarks array, the arrow function tests if the bookmark's name (converted to lowercase) includes the search term (also converted to lowercase). If the test returns true, the bookmark is added to the new foundBookmarks array. Otherwise, it's excluded.
  var foundBookmarks = bookmarks.filter((bookmark) =>
    bookmark.name.toLowerCase().includes(term.toLowerCase())
  );
  var searchResults = foundBookmarks
    .map((bookmark) => displayBookmark(bookmark, bookmarks.indexOf(bookmark)))
    .join("");

  tableBody.innerHTML = searchResults;
}
