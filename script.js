let myLibrary = [];
let shelf = document.querySelector('#shelf');

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.hasRead = function(){
    if(this.read){
        this.read = false;
    } else this.read = true;
}

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title,author,pages,read));
}
addBookToLibrary('Warriors','Erin Hunter',123,false);
addBookToLibrary('Harry Potter','JK Rowling',456,true);
updateLibrary(0);

function updateLibrary(index){
    for(let i = index; i < myLibrary.length; i++){
        let book = document.createElement('div');
        book.classList.add('book');
        
        let title = document.createElement('div');
        let author = document.createElement('div');
        let pages = document.createElement('div');
        let readButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        
        deleteButton.setAttribute("data-id",i);
        deleteButton.addEventListener("click",removeBook)
        readButton.setAttribute("data-id",i)
        readButton.addEventListener("click",toggleRead)

        title.textContent = myLibrary[i].title;
        author.textContent = myLibrary[i].author;
        pages.textContent = myLibrary[i].pages;
        deleteButton.textContent = 'delete';
        if(myLibrary[i].read){
            readButton.textContent = 'Read'
        }
        else
            readButton.textContent = 'Not Read'

        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(readButton);
        book.appendChild(deleteButton);

        shelf.appendChild(book);
       
    }
}

function submitForm(form){
    let title = form.title.value;
    let author = form.author.value;
    let pages = form.pages.value;
    let read = false;
    

    if(form.read.checked){
        read = true;
    }
    if(!(title == "" || author == "" || pages == "")){
    let prevLen = myLibrary.length 

    addBookToLibrary(title,author,pages,read);
    updateLibrary(prevLen);
    closeForm();
    form.read.checked = false;
    form.title.value = "";
    form.author.value = "";
    form.pages.value = "";
    }
    
}

function removeBook(event){
    let index = event.target.getAttribute('data-id');
    myLibrary.splice(index,1);
    shelf.innerHTML = '';
    updateLibrary(0);    
}

function toggleRead(event){
    let index = event.target.getAttribute('data-id');
    let book = myLibrary[index];
    book.hasRead();
    if(book.read){
        event.target.innerHTML = "Read"
    } else{
        event.target.innerHTML = "Not Read"
    }
}

function openForm(){
    document.getElementById("popupForm").style.display = "block";
}
function closeForm(){
    document.getElementById("popupForm").style.display = "none"
}



// Book.prototype.info = function(){
//     if(this.read){
//         return `${this.title} by ${this.author}, ${this.pages} pages, already read`
//     } else
//         return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`
// }

