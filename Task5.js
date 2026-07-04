// Array to store all books
let books = [];

// Load books from Local Storage
let savedBooks = localStorage.getItem("books");

if (savedBooks) {
    books = JSON.parse(savedBooks);
}

// ===============================
// Display Books
// ===============================
function displayBooks(bookList) {

    let tableBody = document.getElementById("bookTableBody");

    // Clear old table rows
    tableBody.innerHTML = "";

    // Check if there are no books
    if (bookList.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No books found.
                </td>
            </tr>
        `;

        return;
    }
    
    // Loop through books
    bookList.forEach(function (book) {

        tableBody.innerHTML += `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td>${book.status}</td>

                <td>

                    <button onclick="toggleStatus('${book.id}')">
                        ${book.status === "Available" ? "Issue" : "Return"}
                    </button>

                    <button onclick="deleteBook('${book.id}')">
                        Delete
                    </button>

                </td>

            </tr>
        `;

    });

}

// ===============================
// Update Dashboard
// ===============================
function updateDashboard() {

    let totalBooks = books.length;

    let availableBooks = books.filter(function (book) {
        return book.status === "Available";
    }).length;

    let issuedBooks = books.filter(function (book) {
        return book.status === "Issued";
    }).length;

    document.getElementById("totalBooks").textContent = totalBooks;

    document.getElementById("availableBooks").textContent = availableBooks;

    document.getElementById("issuedBooks").textContent = issuedBooks;

}

// Display books and dashboard on page load
displayBooks(books);
updateDashboard();

// ===============================
// Add Book
// ===============================
let bookForm = document.getElementById("bookForm");

bookForm.addEventListener("submit", function (event) {

    // Stop page refresh
    event.preventDefault();

    // Get form values
    let bookId = document.getElementById("bookId").value.trim();
    let bookTitle = document.getElementById("bookTitle").value.trim();
    let author = document.getElementById("author").value.trim();
    let category = document.getElementById("category").value.trim();
    let status = document.getElementById("status").value;

    // Validate inputs
    if (
        bookId === "" ||
        bookTitle === "" ||
        author === "" ||
        category === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    // Check duplicate Book ID
    let exists = books.some(function (book) {
        return book.id === bookId;
    });

    if (exists) {
        alert("Book ID already exists.");
        return;
    }

    // Create book object
    let book = {
        id: bookId,
        title: bookTitle,
        author: author,
        category: category,
        status: status
    };

    // Add book to array
    books.push(book);

    // Save to Local Storage
    localStorage.setItem("books", JSON.stringify(books));

    // Refresh UI
    displayBooks(books);
    updateDashboard();

    // Clear form
    bookForm.reset();

});

// ===============================
// Search Books
// ===============================
let searchBook = document.getElementById("searchBook");

searchBook.addEventListener("keyup", function () {

    let searchText = searchBook.value.toLowerCase();

    let filteredBooks = books.filter(function (book) {

        return (

            book.id.toLowerCase().includes(searchText) ||
            book.title.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText) ||
            book.category.toLowerCase().includes(searchText) ||
            book.status.toLowerCase().includes(searchText)

        );

    });

    displayBooks(filteredBooks);

});

// ===============================
// Issue / Return Book
// ===============================
function toggleStatus(bookId) {

    books.forEach(function (book) {

        if (book.id === bookId) {

            if (book.status === "Available") {

                book.status = "Issued";

            } else {

                book.status = "Available";

            }

        }

    });

    // Save changes
    localStorage.setItem("books", JSON.stringify(books));

    // Refresh UI
    displayBooks(books);
    updateDashboard();

}

// ===============================
// Delete Book
// ===============================
function deleteBook(bookId) {

    let confirmDelete = confirm("Are you sure you want to delete this book?");

    if (!confirmDelete) {
        return;
    }

    books = books.filter(function (book) {

        return book.id !== bookId;

    });

    // Save updated books
    localStorage.setItem("books", JSON.stringify(books));

    // Refresh UI
    displayBooks(books);
    updateDashboard();

}