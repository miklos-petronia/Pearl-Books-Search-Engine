import React from "react";
import {
    Container,
    Col,
    Row,
    Card,
    Button,
} from "react-bootstrap";
import { useQuery, useMutation } from '@apollo/client';

import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";

const SavedBooks = () => {

    const { loading, data } = useQuery(GET_ME);
    const [removeBook, { error }] = useMutation(REMOVE_BOOK);

    const userData = data?.me || [];

    // develop an application that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteBook = async (bookId) => {

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            // const response = await deleteBook(bookId, token);
            const { data } = await removeBook({
                variables: { bookId }
            });

            // remove book's id from localStorage
            removeBookId(bookId);
        } catch (err) {
            console.error(err);
        }
    };