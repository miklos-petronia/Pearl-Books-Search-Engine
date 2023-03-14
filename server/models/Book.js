const { Schema } = require('mongoose');

// Subdocument schema, it won't be its own model however we will use it as the schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema({
    authors: [
        {
            type: String,
        },
    ],
    description: {
        type: String,
        required: true,
    },
    // saved book id from GoogleBooks
    bookId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
});

module.exports = bookSchema;