const container = document.getElementById('sub-cont')
const addBookBtn = document.getElementById('add-book')
const editBookBtn = document.getElementById('edit-book')

// Form Elements
const addForm = document.getElementById('add-form')
const titleInput = document.querySelector('input[placeholder="Title"]');
const authorInput = document.querySelector('input[placeholder="Author"]');
const pagesInput = document.querySelector('input[placeholder="Pages"]');
const isReadInput = document.querySelector('input[type="checkbox"]');

// Modal Elements
const openModalBtn = document.getElementById('open-modal')
const addBookModal = document.getElementById('addBookModal')
const closeModal = document.getElementById('closeModal-add')
const closeModalEdit = document.getElementById('closeModal-edit')
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

function closeEditModal() {
    editBookModal.style.display = 'none'
}

console.log('Outside')
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
        editBtn.setAttribute('id', 'edit-btn-list')
        editBtn.innerHTML = '<i class="fas fa-pen"></i>'
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'

        // Delete Button in the list
        deleteBtn.addEventListener('click', () => {
            library.splice(index, 1)
            displayBooks()
        })

        // Edit Button in the list
        editBtn.addEventListener('click', editBook.bind(null, index));

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

    const editTitle = document.getElementById('edit-title')
    const editAuthor = document.getElementById('edit-author')
    const editPages = document.getElementById('edit-pages')
    const editIsRead = document.getElementById('isReadEdit')

    closeModalEdit.addEventListener('click', () => {
        closeEditModal()
    })

    editTitle.value = library[index].title
    editAuthor.value = library[index].author
    editPages.value = library[index].pages
    editIsRead.checked = library[index].isRead

    editBookBtn.addEventListener('click', () => {
        event.preventDefault(); // prevent the form from being submitted

        // update the book object in the library array
        library[index].title = editTitle.value;
        library[index].author = editAuthor.value;
        library[index].pages = editPages.value;
        library[index].isRead = editIsRead.checked;

        displayBooks()
        closeEditModal()
    }, { once: true })

}

function clearForm() {
    addForm.reset()
}

displayBooks()