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


window.onload  = function  (){

    book.info();
    book.write();
    console.log(myLibrary);


    let div = document.querySelector('.books');
    let newBook = document.createElement('div');



    // newBook.textContent = myLibrary[0].name;
    // div.appendChild(newBook);

}



let shown = false;
let addBook= () => {
    let form = document.getElementById('bookForm');
    if(!shown){
        form.style.display = 'flex';
        shown = true;
    }else{
        form.style.display = 'none';
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
});


function addBookToLibrary(name, author, pages, read) {
    let book = new Books(name, author, pages, read);
    book.write();
}