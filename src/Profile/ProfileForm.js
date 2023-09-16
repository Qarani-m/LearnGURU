import React, { useState, useContext, useEffect } from "react";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";
import LearnGuruApi from "../api/api";
import { useJwt } from "react-jwt";
import useLocalStorage from "../hooks/useLocalStorage.js";

/** Form to edit an existing user
 * 
 * Displays profile form and handles change to local form state.
 * Confirmation of a successful signals a simple <Alert>
 * 
 * Routed as /profile
 * Router -> ProfileForm -> Alert
 *
 */

const ProfileForm = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    // Define default values for the form fields
    const defaultFormData = {
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        profile_picture: "",
    };

    const initialFormData = currentUser ? { ...defaultFormData, ...currentUser } : defaultFormData;

    const [formData, setFormData] = useState(initialFormData);

    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [token] = useLocalStorage("learnguru-token");


    console.debug(
        "ProfileForm",
        "currentUser=", currentUser,
        "formData=", formData,
        "formErrors=", formErrors,
        "saveConfirmed=", saveConfirmed,
    )

    /** On form submit:
     * -attempt to save to backend and report any errors
     * -if successful:
     * -    -clear previous error messages and password
     *      - show save-confirmed message
     *      - set current user info throughout app
     * 
     */
    useEffect(function loadProfile() {
        async function getCurrentUser() {
            try {
                const uname = currentUser.username
                const { decodedToken, isExpired } = useJwt(token);


                const { username } = uname ? { 'username': uname } : useJwt(token);

                let profile = await LearnGuruApi.getProfile(username);
                setFormData({
                    firstName: profile.first_name,
                    lastName: profile.last_name,
                    email: profile.email,
                    username: profile.username,
                    profile_picture: profile.profile_picture,
                });
            } catch (err) {
                console.error("ProfileForm loadProfile: problem loading", err);
                setFormErrors(err);
            } finally {
                setIsLoading(false);
            }
        }
        getCurrentUser();
    }, [currentUser ? currentUser.username : ""]);

    async function handleSubmit() {

        let profileData = {
            username: formData.username,
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            profile_picture: formData.profile_picture,
        };

        let username = formData.username;
        let updatedProfile;

        try {
            updatedProfile = await LearnGuruApi.saveProfile(username, profileData);
        } catch (errors) {
            setFormErrors(errors);
            return;
        }

        setFormData(f => ({ ...f, password: "" }));
        setFormErrors([]);
        setSaveConfirmed(true);

        // trigger reloading of user information throughout the site
        setCurrentUser(updatedProfile);
    }

    /** Handle form data changing */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((f) => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([]);
    };

    function handleFileChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
    }

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3>Profile</h3>
            {isLoading ? (
                <p>Loading..</p>
            ) : (

                <div className="card">
                    <div className="card-body">
                        <form method="patch">
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label>Uddate First Name</label>
                                <input
                                    name="first_name"
                                    className="form-control"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Update Last Name</label>
                                <input
                                    name="last_name"
                                    className="form-control"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Update Email</label>
                                <input
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Update Profile Picture</label>
                                <input
                                    type="file"
                                    name="profile_picture"
                                    className="form-control"
                                    onChange={handleFileChange}
                                />
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null}

                            {saveConfirmed
                                ?
                                <Alert type="success" messages={["Updated successfully."]} />
                                : null}

                            <button
                                className="btn btn-primary btn-block mt-4"
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
};


export default ProfileForm;