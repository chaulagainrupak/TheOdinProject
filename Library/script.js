function books(name, author, pages, read){
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
}


let book = new books('book', 'writer', 69, true)

book.info();

console.log(books.prototype);
console.log(Object.getPrototypeOf(book) === books.prototype);

//Helo more test commit