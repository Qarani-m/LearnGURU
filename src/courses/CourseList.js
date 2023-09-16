import React, { useState, useEffect } from 'react';
import LearnGuruApi from '../api/api.js';
import CourseCard from './CourseCard.js';
import './CourseList.css';

// course list component
// renders a list of courses
// rendered in the homepage
// Homepage -> CourseList -> CourseCard -> CourseDetail

const CourseList = () => {
    const [courses, setCourses] = useState([]);


    // fetches all courses from the API
    // sets the state of courses to the list of courses
    useEffect(() => {
        async function fetchCourses() {
            try {
                const courses = await LearnGuruApi.getCourses();
                setCourses(courses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);

    return (
        <div>
            <h3>Available Courses</h3>
            <ul>
                {courses.map(course => (
                    <li key={course.course_id}>
                        <CourseCard
                            title={course.title}
                            description={course.description}
                            price={course.price}
                            rating={course.rating}
                            instructor_id={course.instructor_id}
                            course_id={course.course_id}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default CourseList;





