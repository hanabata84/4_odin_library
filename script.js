const container = document.querySelector('div')
const addBookBtn = document.getElementById('add-book')
const form = document.querySelector('form')
const titleInput = document.querySelector('input[placeholder="Title"]');
const authorInput = document.querySelector('input[placeholder="Author"]');
const pagesInput = document.querySelector('input[placeholder="Pages"]');
const isReadInput = document.querySelector('input[type="checkbox"]');

const library = [
    {
        title: 'Game of Thrones',
        author: 'G.R.R Martin',
        pages: 1050,
        isRead: true
    },
    {
        title: 'Ship of Magic',
        author: 'Robbin Hobb',
        pages: 880,
        isRead: true
    },
    {
        title: 'The Scarlet Tides',
        author: 'David Hair',
        pages: 688,
        isRead: false
    }
]

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

addBookBtn.addEventListener('click', () => {
    event.preventDefault(); // prevent the form from being submitted

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const isRead = isReadInput.checked;
    library.push(new Book(title, author, pages, isRead))

    console.log(library);
    displayBooks()
    clearForm()
})

function displayBooks() {
    container.textContent = ''

    library.forEach((book, index) => {
        const para = document.createElement('p');
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', () => {
            console.log(index)
            library.splice(index, 1)
            displayBooks()
        })
        para.textContent = `Title: ${book.title}, Author: ${book.author}, Pages: ${book.pages}, Read: ${book.isRead ? 'already read' : 'not read yet'}`;
        para.appendChild(deleteBtn)
        container.appendChild(para);
    });
}

function clearForm() {
    form.reset()
}

displayBooks()