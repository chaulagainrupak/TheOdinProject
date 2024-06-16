myLibrary = [];

function Books(name, author, pages, read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {

        if(read == true){
            read = 'read'
        }else {
            read = 'not read yet!'
        }
        console.log(name + ' by '+ author +', ' + pages + ' pages' + ', ' + read);
        return name + ' by '+ author +', ' + pages + ' pages' + ', ' + read;
    }

    this.write = function () {
        myLibrary.push(
            {
                name: name,
                author: author,
                pages: pages,
                read: read
            }
        )
    }
}






let shown = false;
let addBook= () => {
    let form = document.getElementById('bookForm');
    let button = document.getElementById('addButton');
    if(!shown){
        form.style.display = 'flex';
        button.style.display = 'none';
        shown = true;
    }else{
        form.style.display = 'none';
        button.style.display = 'block';
        shown = false;
    }
}


document.addEventListener('submit', function (event){
    event.preventDefault();

    let book = document.getElementById('book').value;
    let author = document.getElementById('author').value;
    let pages = parseInt(document.getElementById('pages').value);
    let read = document.getElementById('read').checked;

    addBookToLibrary(book, author, pages, read);
    console.log(myLibrary);

    document.getElementById('book').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;

    displayBook();
});


let  addBookToLibrary = (name, author, pages, read) => {
    let book = new Books(name, author, pages, read);
    book.write();
}

let displayBook = () => {
    let div = document.querySelector('.books');
    div.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++) {
        let newBook = document.createElement('div');
        newBook.classList.add('card'); 

        let textDiv = document.createElement('div');
        textDiv.classList.add('text'); 

        let title = document.createElement('h1');
        title.textContent = myLibrary[i].name;

        let author = document.createElement('h3');
        author.textContent = myLibrary[i].author;

        let pages = document.createElement('h4');
        pages.textContent = 'Pages: ' + myLibrary[i].pages;

        let readStatus = document.createElement('p');
        readStatus.textContent = myLibrary[i].read ? 'read!' : 'not read yet!';

        textDiv.appendChild(title);
        textDiv.appendChild(author);
        textDiv.appendChild(pages);
        textDiv.appendChild(readStatus);

        newBook.appendChild(textDiv);
        div.appendChild(newBook);
    }
};
