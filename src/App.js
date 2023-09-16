import React, { useEffect, useState, } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Homepage from './Homepage/Homepage.js';
import CourseList from './courses/CourseList.js';
import CourseDetail from './courses/CourseDetail.js';
import LoginForm from './auth/LoginForm.js';
import InstructorLoginForm from './auth/InstructorLoginForm.js';
import SignupForm from './auth/SignupForm.js';
import NavBar from './NavBar.js';
import LearnGuruApi from './api/api.js';
import UserContext from './auth/UserContext.js';
import './App.css';
import ProfileForm from './Profile/ProfileForm.js';

import useLocalStorage from './hooks/useLocalStorage.js';
import { useJwt } from 'react-jwt';
import InstructorBio from './Instructors/InstructorBio.js';

export const TOKEN_STORAGE_ID = 'learnguru-token';
export const ROLE_STORAGE_ID = 'learnguru-role';



function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID, null);

  console.log(TOKEN_STORAGE_ID);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);
    console.log(token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = useJwt(token);
          let currentUser = await LearnGuruApi.getCurrentUser(username);
          setCurrentUser(currentUser);

        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
    }

    getCurrentUser();
  }, [token]);


  // handles log out
  function logout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("learnguru-token");
    navigate("/login");

  };

  /* Handles site-wide signup.
  *
  * Automatically logs them in (set token) upon signup.
  *
  * Make sure you await this function and check its return value!
  */
  async function register(signupData) {
    try {
      let token = await LearnGuruApi.register(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /* Handles site-wide signup.
 *
 * Automatically logs them in (set token) upon signup.
 *
 * Make sure you await this function and check its return value!
 */

  async function login(loginData) {
    try {
      let token = await LearnGuruApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }


  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      <div className="App">

        <NavBar currentUser={currentUser} logout={logout} />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/courses" element={<CourseList />}></Route>
          <Route path="/courses/:course_id" element={<CourseDetail />} />
          <Route path="/instructors/:instructor_id" element={<InstructorBio />} />
          <Route path="/users/:username" element={<ProfileForm />} />


          <Route path="/login" element={<LoginForm login={login} />}>
          </Route>
          <Route path="/instructorlogin" element={<InstructorLoginForm login={login} />} />

          <Route path="/register" element={<SignupForm register={register} />}>
          </Route>
        </Routes>

      </div>
    </UserContext.Provider>
  );
}

export default App;