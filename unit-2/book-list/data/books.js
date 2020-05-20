const books = [
    {title: 'East of Eden', author: 'John Steinbeck'},
    {title: 'Brave New World', author: 'Aldous Huxley'},
    {title: 'Green Eggs and Ham', author: 'Dr Seuss'},
    {title: 'The Illiad', author: 'Homer'},
    {title: 'Curious George Goes to the Zoo', author: 'Margret and H. A. Rey'},
    {title: 'The Fountainhead', author: 'Ayn Rand'}
];

module.exports = {
    getAll,
    getOne,
    deleteOne,
    add,
    update
}

function update(idx, book) {
    books[idx] = book;
}

function add(book) {
    books.push(book);
}

function getAll() {
    return books;
}

function getOne(idx) {
    return books[idx];
}

function deleteOne(idx) {
    books.splice(idx, 1);
}




