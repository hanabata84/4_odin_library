const container = document.getElementById('sub-cont')
const addBookBtn = document.getElementById('add-book')
const form = document.querySelector('form')
const titleInput = document.querySelector('input[placeholder="Title"]');
const authorInput = document.querySelector('input[placeholder="Author"]');
const pagesInput = document.querySelector('input[placeholder="Pages"]');
const isReadInput = document.querySelector('input[type="checkbox"]');

// The modal
const openModalBtn = document.getElementById('open-modal')
const addBookModal = document.getElementById('addBookModal')
const closeModal = document.getElementById('closeModal')

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

openModalBtn.addEventListener('click', () => {
    addBookModal.style.display = 'block'
})

closeModal.addEventListener('click', () => {
    addBookModal.style.display = 'none'
})

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
        const deleteBtn = document.createElement('button')
        const editBtn = document.createElement('button')
        const listContainer = document.createElement('div');

        listContainer.className = 'list-cont';
        editBtn.innerHTML = '<i class="fas fa-pen"></i>'
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'

        deleteBtn.addEventListener('click', () => {
            library.splice(index, 1)
            displayBooks()
        })
        const titlePara = document.createElement('p')
        titlePara.className = 'title'
        titlePara.textContent = book.title
        listContainer.appendChild(titlePara)

        const authorPara = document.createElement('p');
        authorPara.className = 'author'
        authorPara.textContent = book.author;
        listContainer.appendChild(authorPara);

        const pagesPara = document.createElement('p');
        pagesPara.className = 'pages'
        pagesPara.innerHTML = `<i class="fas fa-duotone fa-book-open"></i>${book.pages} pages`;
        listContainer.appendChild(pagesPara);

        const readPara = document.createElement('p');
        readPara.className = 'is-read'
        readPara.textContent = book.isRead ? 'Already Read' : 'Not Read Yet';

        listContainer.appendChild(readPara);
        listContainer.appendChild(editBtn)
        listContainer.appendChild(deleteBtn)

        container.appendChild(listContainer);
    });
}

function clearForm() {
    form.reset()
}

displayBooks()