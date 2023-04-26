"use strict";
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputYear = document.querySelector('#year');
const addBtn = document.querySelector('#addBtn');
const bookList = document.querySelector('#book-list');
let bookArr = [];









function addToLocal(bookArray) {
    localStorage.setItem('book', JSON.stringify(bookArray));
    displayBooks(bookArray);
};
function displayBooks(booksArray) {
    bookList.textContent = '';
    booksArray.forEach((book) => {
        let bookNameEl = document.createElement('th');
        bookNameEl.textContent = `${book.bookName}`;

        let bookAuthorEl = document.createElement('th');
        bookAuthorEl.textContent = `${book.bookAuthor}`;

        let bookYearEl = document.createElement('th');
        bookYearEl.textContent = `${book.bookYear}`;

        let deleteEl = document.createElement('th');
        let deleteIcon = document.createElement('i');
        deleteIcon.classList = 'fa fa-remove btn ';
        deleteIcon.style.cssText = 'font-size:22px;color: tomato;';
        deleteEl.append(deleteIcon);
        deleteEl.setAttribute('onclick', `deleteBook(${book.id})`);
        let row = document.createElement('tr');

        row.append(bookNameEl, bookAuthorEl, bookYearEl, deleteEl);
        bookList.append(row);

    });
};
function deleteBook(bookId) {
    bookArr = JSON.parse(localStorage.getItem('book'));
    let bookIndex = bookArr.findIndex((book) => {
        return book.id === bookId
    });
    bookArr.splice(bookIndex, 1);
    addToLocal(bookArr);
    displayBooks(bookArr);
}

addBtn.addEventListener('click', (el) => {
    el.preventDefault();

    if (inputTitle.value === '' || inputAuthor.value === '' || inputYear.value === '') {
        alert(`Please Fill Inputs!`);
        inputTitle.focus();
    } else {
        let bookObj = {
            id: bookArr.length + 1,
            bookName: inputTitle.value,
            bookAuthor: inputAuthor.value,
            bookYear: inputYear.value,
        };
        bookArr.push(bookObj);

        addToLocal(bookArr);

        inputTitle.value = '';
        inputAuthor.value = '';
        inputYear.value = '';
    };
});

window.addEventListener('load', () => {
    displayBooks(JSON.parse(localStorage.getItem('book')));
})
