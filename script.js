class Book {
    constructor(title,author,pages,read) {
        this.id = crypto.randomUUID();
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.read=read;
}}


class Library {

constructor() {
    this.books = [];
}

addBookToLibrary(title,author,pages,read) {
    let book= new Book(title,author,pages,read);
    this.books.push(book);
}

removeBook(e) {
    const bookId = e.target.parentElement.getAttribute("data-id");
    const index= this.books.findIndex(book => bookId === book.id);

    if(index !== -1) {
        this.books.splice(index,1);
        this.displayBooks();
    }
}

toggleBookRead(e) {
    const bookId = e.target.parentElement.getAttribute("data-id");
    const book = this.books.find(book => bookId === book.id);

    if(book){
        book.read = !book.read;
    }
    this.displayBooks();
}

displayBooks() {
    const libraryDisplay=document.getElementById("libraryDisplay");
    libraryDisplay.innerHTML = "";

    this.books.forEach(book => {
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
        })

        document.querySelectorAll(".remove-book").forEach(btn => {
            btn.addEventListener("click",e => this.removeBook(e));
        })

        document.querySelectorAll(".toggle-read").forEach(btn => {
            btn.addEventListener("click",e => this.toggleBookRead(e))
        })
    }
}


// dialog handling
let myLibrary = new Library();

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

    myLibrary.addBookToLibrary(title,author,pages,read);
    myLibrary.displayBooks();

    bookForm.reset();
    bookDialog.close();
})


myLibrary.addBookToLibrary("book1","ante a",100,true);
myLibrary.addBookToLibrary("book2", "marino m",150,true)
myLibrary.displayBooks();