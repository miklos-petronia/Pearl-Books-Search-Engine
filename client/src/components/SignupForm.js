import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";

import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

const SignupForm = () => {
    // arrange initial form state
    const [userFormData, setUserFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    // arrange state for form validation
    const [validated] = useState(false);
    // arrange state for warning
    const [showAlert, setShowAlert] = useState(false);

    const [addUser, { error }] = useMutation(ADD_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();