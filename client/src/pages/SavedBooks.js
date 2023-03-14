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

    // Provide information if data isn't here yet
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
            <div fluid="true" className='text-light bg-dark p-5'>
                <Container>
                    <h1>Viewing saved books!</h1>
                </Container>
            </div>
            <Container>
                <h2>
                    {userData.savedBooks.length
                        ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? "book" : "books"
                        }:`
                        : "You have no saved books!"}
                </h2>
                <Row>
                    {userData.savedBooks.map((book) => {
                        return (
                            <Col key={book.bookId} md="4" >
                                <Card key={book.bookId} border="dark">
                                    {book.image ? (
                                        <Card.Img
                                            src={book.image}
                                            alt={`The cover for ${book.title}`}
                                            variant="top"
                                        />
                                    ) : null}
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
                                        <p className='small'>Authors: {book.authors}</p>
                                        <Card.Text>{book.description}</Card.Text>
                                        <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                                            Delete this Book!
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
};

export default SavedBooks;