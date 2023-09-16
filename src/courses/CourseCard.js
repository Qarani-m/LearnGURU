import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import LearnGuruApi from '../api/api';
import "./CourseCard.css"

// show limited information about the course
// rendered in the Course List 
// CourseList -> CourseCard -> CourseDetail


const CourseCard = ({ course_id, title, description, price, rating, instructor_id }) => {
    // const { currentUser } = React.useContext(UserContext);
    const [instructorName, setInstructorName] = useState(null);
    console.log(instructor_id);

    //function to take instructor_id and return instructor name
    const getInstructorName = async (instructor_id) => {
        try {
            const instructor = await LearnGuruApi.getInstructorName(instructor_id);
            setInstructorName(instructor.name);
            return instructor.name;
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    }
    useEffect(() => {
        getInstructorName(instructor_id);
    }, [instructor_id]);


    console.debug('CourseCard');

    // // function to handle enrollment
    // async function handleEnroll() {
    //     try {
    //         await LearnGuruApi.enrollInClass(currentUser.username, course_id);
    //     } catch (error) {
    //         console.error('Error enrolling in course:', error);
    //     }
    // };

    return (
        <Link className="CourseCard card" to={`/courses/${course_id}`}>
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                {instructorName && <p>Instructor: {instructorName}</p>}
            </div>
        </Link>


    )

}

export default CourseCard;