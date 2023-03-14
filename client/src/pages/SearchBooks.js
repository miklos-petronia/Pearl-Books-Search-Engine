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