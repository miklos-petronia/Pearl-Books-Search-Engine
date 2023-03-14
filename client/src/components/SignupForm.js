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