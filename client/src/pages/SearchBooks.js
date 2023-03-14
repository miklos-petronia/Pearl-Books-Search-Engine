import React, { useState, useEffect } from 'react';
import decode from 'jwt-decode';
import {
    Container,
    Col,
    Form,
    Button,
    Card,
    Row
} from 'react-bootstrap';
import { useMutation } from "@apollo/react-hooks";

import Auth from "../utils/auth";
import { searchGoogleBooks } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import { SAVE_BOOK } from "../utils/mutations";

const SearchBooks = () => {
    // develop state for holding returned google api data
    const [searchedBooks, setSearchedBooks] = useState([]);
    // develop state for holding our search field data
    const [searchInput, setSearchInput] = useState("");
    // develop state to hold saved bookId values
    const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

    const [saveBook] = useMutation(SAVE_BOOK);

    // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
    // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    useEffect(() => {
        return () => saveBookIds(savedBookIds);
    });

    // create method to search for books and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchGoogleBooks(searchInput);

            if (!response.ok) {
                throw new Error("something went wrong!");
            }

            const { items } = await response.json();

            const bookData = items.map((book) => ({
                bookId: book.id,
                authors: book.volumeInfo.authors || ["No author to display"],
                title: book.volumeInfo.title,
                description: book.volumeInfo.description,
                link: book.volumeInfo.infoLink,
                image: book.volumeInfo.imageLinks?.thumbnail || "",
            }));

            setSearchedBooks(bookData);
            setSearchInput("");
        } catch (err) {
            console.error(err);
        }
    };
