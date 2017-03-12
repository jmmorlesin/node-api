'use strict';

const mongoose = require('mongoose');

// Overrides promises from mongoose (deprecated in mongosse)
mongoose.Promise = global.Promise;

const Book = require('../models/book');

function createBook(book) {
    let bookInstance = new Book(book);

    return bookInstance.save();
}

function getBooks() {
    return Book.find();
}

function getBook(id) {
    return Book.findById(id);
}

function deleteBook(id) {
    return Book.remove({_id : id});
}

function updateBook(id, book) {
    return getBook(id)
        .then(bookInstance => {
            return Object.assign(bookInstance, book).save();
        });
}

function validateBook(book) {
    if (book == null) return false;
    if (Object.keys(book).length != 2) return false;
    if (!book.hasOwnProperty('title') || !book.hasOwnProperty('author')) return false;

    for (let property in book)
        if (book[property] == null || book[property].trim() === '')
            return false;

    return true;
}

module.exports = {
    createBook,
    getBooks,
    getBook,
    deleteBook,
    updateBook,
    validateBook
};