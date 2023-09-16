import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LearnGuruApi from '../api/api.js';
import UserContext from "./UserContext.js";
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

function InstructorLoginForm({ login }) {
    const { setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const [, setToken] = useLocalStorage("learnguru-token", "");



    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    /** Handle form submit:
     *
     * Calls login func prop and, if successful, redirect to /companies.
     */

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            let token = await LearnGuruApi.loginInstructor(formData);


            // Check if the token exists (successful login)
            if (token) {
                let { user_id } = useJwt(token);
                // set token in localStorage
                setToken(token);
                // set currentUser in App
                setCurrentUser(formData.email);
                // Clear form data
                setFormData({
                    email: "",
                    password: "",
                });
                console.log(token)

                // Redirect to /courses
                navigate(`/instructors/${user_id}`);
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
            <h1>Instructor Log In</h1>
            <div className="LoginForm">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
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
                                >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <a href="/login"><small>Login As User</small></a>
            </div>
        </div>
    );
}

export default InstructorLoginForm;