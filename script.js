class Book {
    constructor (id, title, author, pages) {
        this._id = id
        this._title = title;
        this._author = author;
        this._pages = pages;
        this.read = false;
    }
    get id(){
        return this._id

    }
    get title(){
        return this._title;
    }

    set title(newTitle){
        this._title = newTitle;
    }

    get author(){
        return this._author;
    }

    get pages(){
        return this._pages;
    }

    set author(newAuthor){
        this._author = newAuthor;
    }

    set pages(newPages){
        this._pages =  newPages;
    }


    markAsRead(){
        if (!this.read){
        this.read = true;}
        else{
            this.read = false
        }
    }

    isRead(){
        return this.read
    }

    info(){
        let title = this._title;
        let author = this._author;
        let pages = this._pages;
        let status
        if (this.read){
            status = "was read";
        } else {
            status = "not read yet"
        }
        return `${title} by ${author}, ${pages} pages, ${status}`
    }
}
class Library{
    constructor(){
        this._books = [];
    }
    addBook(book){
        this._books.push(book);
    }
    addBooks(books){
        for(book of books){
            this._books.push(book);
        }
    }
    removeBookById(bookId){
        const index = this._books.findIndex(book => book.id === bookId);
        if (index !== -1){
            this._books.splice(index, 1)
        }

    }
    getBook(bookId){
        return this._books.find(book =>book.id === bookId);
        
    }
    display(section){
        const library = this;
        section.innerHTML = "";
        this._books.forEach(book => {
            let card = document.createElement("div");
            card.setAttribute("class", "card");
            card.setAttribute("id", `${book.id}`)
            let status = book.isRead()? "Read": "Not Read"
            card.innerHTML = `<h2>${book.title}</h2>
                              <div class="subtext"><div>Author:</div><div>${book.author}</div></div>
                              <div class="subtext"><div>Pages:</div><div>${book.pages}</div></div>
                              <div class="buttons">
                              </div>`;
            // Add Read Button
            const readButton = document.createElement('button');
            readButton.textContent = status;
            readButton.className = `${status} button`;
            readButton.addEventListener('click', function(){
                book.markAsRead();
                library.display(section);
            });
            card.querySelector('.buttons').appendChild(readButton);

            // Add Remove Button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove button';
            removeButton.addEventListener('click', function(){
                library.removeBookById(book.id);
                library.display(section); 
            });
            card.querySelector('.buttons').appendChild(removeButton);

            section.appendChild(card);
        });
    }
};

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

let library = new Library();
let dialog = document.querySelector("dialog");
let addButton = document.getElementsByClassName("add-book")[1];
addButton.addEventListener("click", function(){
  dialog.showModal();
});
let form = dialog.querySelector("form");
form.addEventListener("submit", function(){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('is-read').checked;
    let book = new Book(generateUniqueId(), title, author, pages);
    if(isRead){
        book.markAsRead()
    }
    library.addBook(book);
    let section = document.getElementsByClassName("book-section")[0];
    library.display(section);
    dialog.close();
    dialog.querySelector('form').reset();
})



