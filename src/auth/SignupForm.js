import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LearnGuruApi from '../api/api.js';
import UserContext from './UserContext.js';
import './SignupForm.css';
// import Alert from "../common/Alert";

/**Sign up form.
*Shows form and manages update to state on changes. 
* On Submission:
* - call register function prop
* - redirects to /courses route
*
* Routes -> SignupForm -> Alert
* Routed as "/register"
*/

function SignupForm({ register }) {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);
    const handleClick = () => { navigate("/login") };
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        profile_picture: "",
    })
    const [formErrors, setFormErrors] = useState([]);



    console.debug(
        "SignupForm",
        "register=", typeof register,
        "formData=", formData,
        "formErrors=", formErrors,
    );


    /** Handle form submit:
    *
    * Calls login function prop and, if successful, redirct to /courses .
    */
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let token = await LearnGuruApi.register(formData);
            console.log(token);
            if (token.success) {
                setFormData({
                    username: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    profile_picture: "",
                });
                // store token in localStorage
                setCurrentUser(formData.username);
            } else {
                // If token does not exist, show an alert
                setFormErrors(["Error signing up. Please try again later."]);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setFormErrors(["Error connecting to the server. Please try again later."]);
        }
    }


    /** Update form data field*/
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    }


    return (
        <div> <h1>Sign Up</h1>
            <div className="SignupForm">
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
                                    <label>First name:</label>
                                    <input
                                        name="first_name"
                                        className="form-control"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last name:</label>
                                    <input
                                        name="last_name"
                                        className="form-control"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
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
                                <div className="form-group">
                                    <label>Profile Picture:</label>
                                    <input
                                        type='file'
                                        name="profile_picture"
                                        className="form-control"
                                        value={formData.profile_picture}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary float-right"
                                    onClick={(e) => {
                                        handleSubmit(e);
                                        handleClick();
                                    }}


                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignupForm;