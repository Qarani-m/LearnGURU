import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LearnGuruApi from '../api/api.js';
import UserContext from '../auth/UserContext.js';
import { Link } from 'react-router-dom';
import CourseRating from './CourseRating.js';
import Alert from '../common/Alert.js';
import './CourseDetail.css';

// shows details of a course
// rendered in the CourseCard
// CourseList -> CourseCard -> CourseDetail
// rendered at /courses/:course_id
const CourseDetail = () => {
    const { currentUser } = React.useContext(UserContext);
    const { course_id } = useParams();
    const [course, setCourse] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    // gets the course details and instructor namefrom the API
    useEffect(() => {
        async function fetchCourse() {
            try {
                const course = await LearnGuruApi.getCourse(course_id);
                setCourse(course);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        }
        fetchCourse();
    }, [course_id]);

    // function to handle enrollment 
    async function handleEnroll() {
        await LearnGuruApi.enrollInClass(currentUser.username, course_id, currentUser.user_id)
        .then(resp => {
            console.log(resp.enrollment)
            setSuccessMessage("User Enrolled successfully!");
        })
        .catch (error => {
            console.error('Error enrolling in course:', error);
            setErrorMessage("Error in enrolling user");
        })
    };


    if (!course) return <h1>Loading...</h1>;

    return (
        <div className='CourseDetail'>
            <h3>{course.title}</h3>
            <div className='courseInfo'>
                <p><small>Description: {course.description}</small></p>
                <p><small>Rating: {course.rating}</small></p>
                <p><small>Price: {course.price}</small></p>
                <p>
                    <button id="instructor-btn">
                        <Link to={`/instructors/${course.instructor_id}`}>
                            Instructor Details
                        </Link>
                    </button>
                </p>
            </div>

            <div className="enroll">
                {currentUser && ( // if there is a current user, show the enroll button
                    <button onClick={handleEnroll}>Enroll</button>
                )}
            </div>
            <div>
                <CourseRating course_id={course_id} />
            </div>
            {successMessage.length > 1 ? 
                <Alert type="success" messages={["User Enrolled successfully!"]} />
                : null}
            {errorMessage.length> 1 ?
                <Alert type="danger" messages={["Error in enrolling user!"]} />
                : null}
        </div>
    );
};
export default CourseDetail;
