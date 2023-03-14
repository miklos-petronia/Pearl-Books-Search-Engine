// View SignupForm.js for notes
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";

import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: "", password: "" });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [login, { error }] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();