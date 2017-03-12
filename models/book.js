'use strict';

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let bookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Book', bookSchema);