import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LearnGuruApi from "../api/api";
import "./InstructorBio.css";



const InstructorBio = () => {
    const { instructor_id } = useParams();
    const [instructor, setInstructor] = useState(null);
    const [name, setName] = useState(null);
    const [bio, setBio] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);




    // get the instructors details from the API
    useEffect(() => {
        async function fetchInstructor() {
            try {
                const instructor = await LearnGuruApi.getInstructorName(instructor_id);
                setInstructor(instructor);
                setName(instructor.name);
                setBio(instructor.bio);
                setProfilePicture(instructor.profile_picture);

                console.log(instructor)
            } catch (error) {
                console.error('Error fetching instructor:', error);
            }
        }
        fetchInstructor();
    }, [instructor_id]);

    if (!instructor) return <h1>Loading...</h1>;

    return (
        <div className='InstructorBio'>
            <h1>Instructor's Bio page</h1>
            <h3>{name}</h3>
            <p><small>Bio: {bio}</small></p>
            <p><small>Profile Picture: {profilePicture}</small></p>

        </div>
    );

};
export default InstructorBio;