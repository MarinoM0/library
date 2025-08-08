const myLibrary = [];

function Book(title,author,pages,read) {
    this.id = crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function addBookToLibrary(title,author,pages,read) {
    let book= new Book(title,author,pages,read);
    myLibrary.push(book);
}

function displayBooks() {
    const libraryDisplay=document.getElementById("libraryDisplay");
    libraryDisplay.innerHTML = "";

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.setAttribute("data-id", book.id);

        card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Status:</strong> ${book.read ? "Read" : "Not read"}</p>
        <button class="toggle-read">Toggle Read</button>
        <button class="remove-book">Remove</button>
        `;

        libraryDisplay.appendChild(card);

        document.querySelectorAll(".remove-book").forEach(btn => {
            btn.addEventListener("click",removeBook);
        })

        document.querySelectorAll(".toggle-read").forEach(btn => {
            btn.addEventListener("click",toggleBookRead)
        })
    });
}

function removeBook(e) {
    const bookId = e.target.parentElement.getAttribute("data-id");
    const index= myLibrary.findIndex(book => bookId === book.id);

    if(index !== -1) {
        myLibrary.splice(index,1);
        displayBooks();
    }
}

function toggleBookRead(e) {
    const bookId = e.target.parentElement.getAttribute("data-id");
    const book = myLibrary.find(book => bookId === book.id);

    if(book){
        book.read = !book.read;
    }
    displayBooks();
}


// dialog handling

const newBookBtn = document.getElementById("newBookBtn");
const bookDialog = document.getElementById("bookDialog");
const closeDialogBtn = document.getElementById("closeDialog");
const bookForm = document.getElementById("bookForm");

newBookBtn.addEventListener("click", ()=> bookDialog.showModal());
closeDialogBtn.addEventListener("click", () => bookDialog.close());

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("read").ariaChecked;

    addBookToLibrary(title,author,pages,read);
    displayBooks();

    bookForm.reset();
    bookDialog.close();
})













addBookToLibrary("book1","ante a",100,true);
addBookToLibrary("book2", "marino m",150,true)
displayBooks();