const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
const bookSchema = require('./Book');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        // arrange the savedBooks to be an array of data that adheres to the bookSchema
        savedBooks: [bookSchema],
    },
    // arrange this to use virtual below
    {
        toJSON: {
            virtuals: true,
        },
    }
);