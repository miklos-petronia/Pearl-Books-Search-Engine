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