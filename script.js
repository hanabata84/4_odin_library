const container = document.getElementById('sub-cont')
const addBookBtn = document.getElementById('add-book')

// Form Elements
const form = document.querySelector('form')
const titleInput = document.querySelector('input[placeholder="Title"]');
const authorInput = document.querySelector('input[placeholder="Author"]');
const pagesInput = document.querySelector('input[placeholder="Pages"]');
const isReadInput = document.querySelector('input[type="checkbox"]');

// Modal Elements
const openModalBtn = document.getElementById('open-modal')
const addBookModal = document.getElementById('addBookModal')
const closeModal = document.getElementById('closeModal')
const editBookModal = document.getElementById('editBookModal')

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
    closeAddModal()
})

function closeAddModal() {
    addBookModal.style.display = 'none'
}

addBookBtn.addEventListener('click', () => {
    event.preventDefault(); // prevent the form from being submitted

    // Input values
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const isRead = isReadInput.checked;

    library.push(new Book(title, author, pages, isRead))

    displayBooks()
    clearForm()
    closeAddModal()
})

function displayBooks() {
    container.textContent = ''

    library.forEach((book, index) => {
        // Create elements for the table
        const deleteBtn = document.createElement('button')
        const editBtn = document.createElement('button')
        const listContainer = document.createElement('div');

        listContainer.className = 'list-cont';
        editBtn.innerHTML = '<i class="fas fa-pen"></i>'
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'

        // Delete Button in the list
        deleteBtn.addEventListener('click', () => {
            library.splice(index, 1)
            displayBooks()
        })

        // Edit Button in the list
        editBtn.addEventListener('click', () => {
            editBook(index)
        })

        // Create elements for the list
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

function editBook(index) {
    editBookModal.style.display = 'block'

    const modalBody = document.querySelector('.modal-body')
    const modalHead = document.querySelector('.modal-header')
    const modalContent = document.querySelector('.modal-content')
    const form = document.querySelector('form')
    const editHeading = document.querySelector('h2')
    // const titleInput = document.querySelector('input[placeholder="Title"]');
    // const authorInput = document.querySelector('input[placeholder="Author"]');
    // const pagesInput = document.querySelector('input[placeholder="Pages"]');
    // const isReadInput = document.querySelector('input[type="checkbox"]');
    // form.appendChild(titleInput)
    editHeading.textContent = 'Edit Book'
    modalHead.prepend(editHeading)

    modalBody.appendChild(form)
    modalContent.appendChild(modalHead)
    modalContent.appendChild(modalBody)

    editBookModal.appendChild(modalContent)
    titleInput.value = library[index].title
    authorInput.value = library[index].author
    pagesInput.value = library[index].pages
    isReadInput.checked = library[index].isRead
}

function clearForm() {
    form.reset()
}

displayBooks()