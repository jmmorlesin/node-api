'use strict';

const express = require('express');
const router = express.Router();

const bookHandler = require('../handlers/book-handler');

router.get('/', (req, res) => {
    bookHandler.getBooks()
        .then(result => {
            res.json(result);
        });
});

router.post('/', (req, res) => {
    let book = req.body;

    if (!bookHandler.validateBook(book)) {
        return res.status(400).json({message: 'Invalid book. Should contain title and author'});
    }

    bookHandler.createBook(book)
        .then(result => {
            res.status(201).json(result);
        });
});

router.get('/:id', (req, res) => {
    let bookId = req.params.id;

    bookHandler.getBook(bookId)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(404).json({message: 'Book not found'});
        });
});

router.delete('/:id', (req, res) => {
    let bookId = req.params.id;

    bookHandler.deleteBook(bookId)
        .then(result => {
            res.json({message: 'Book successfully deleted'});
        });
});

router.put('/:id', (req, res) => {
    let bookId = req.params.id;

    bookHandler.updateBook(bookId, req.body)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(404).json({message: 'Book not found'});
        });
});


module.exports = router;