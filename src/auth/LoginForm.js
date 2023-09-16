import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LearnGuruApi from '../api/api.js';
import UserContext from "../auth/UserContext";

import { useJwt } from "react-jwt";
import useLocalStorage from "../hooks/useLocalStorage.js";
import "./LoginForm.css"


/** Log IN form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /profile route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
    const { setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const [, setToken] = useLocalStorage("learnguru-token");


    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    async function navigateToUserPage(token) {
        try {
            const { username } = useJwt(token);
            const url = `/users/${username}`;
            navigate(url)
        } catch (error) {
            console.error("Error during navigation:", error);
        }
    }

    /** Handle form submit:
     *
     * Calls login func prop and, if successful, redirect to /companies.
     */

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            let token = await LearnGuruApi.login(formData);

            // Check if the token exists (successful login)
            if (token) {
                // set token in localStorage
                setToken(token);
                // set currentUser in App
                setCurrentUser(formData.username);
                // Clear form data
                setFormData({
                    username: "",
                    password: "",
                });

                // Redirect to /courses
                navigateToUserPage(token);
            } else {
                // If token does not exist, show an alert
                setFormErrors(["Invalid username or password"]);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setFormErrors(["Error connecting to the server. Please try again later."]);
        }
    }


    /** Update form data field */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div>
            <h1>Log In</h1>
            <div className="LoginForm">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input
                                        name="username"
                                        className="form-control"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary float-right"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <a href="/instructorlogin"><small>Login As Instructor</small></a>
            </div>
        </div>
    );
}

export default LoginForm;