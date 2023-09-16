import React, { useState } from "react";
import UserContext from '../auth/UserContext.js';
import './CourseRating.css';
import LearnGuruApi from "../api/api.js";
import Alert from "../common/Alert.js";

function CourseRating({ course_id }) {
    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const { currentUser } = React.useContext(UserContext);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [rateData, setRateData] = useState({
        rate: "",
        feedback: "",
    });

    const togglePopUp = () => {
        setPopUpVisible(!isPopUpVisible);
    };
    const handleRatingChange = (event) => {
        const { value } = event.target;
        setRateData({ ...rateData, rate: value });
    };

    const handleFeedbackChange = (event) => {
        const { value } = event.target;
        setRateData({ ...rateData, feedback: value });
    };

    async function handleSubmit(){
        await LearnGuruApi.rateCourse(currentUser.username, currentUser.user_id, course_id, rateData.rate, rateData.feedback)
        .then(res => {
            console.log(res.rate);
            setSuccessMessage("Rating submitted successfully!");
            setErrorMessage("");
            setRateData({
                rate: "",
                feedback: "",
            });
            togglePopUp();
        })
        .catch (error => {
            console.log("Error rating course:", error);
            setErrorMessage("Error in Rating!");
            setSuccessMessage("");
            setRateData({
                rate: "",
                feedback: "",
            });
            togglePopUp();
        })
    }

    return (
        <div>
            <div className="enroll">
                {currentUser && (
                    <button onClick={togglePopUp}>Rate Course</button>
                )}
            </div>
            {isPopUpVisible && (
            <div className="modal-overlay">
                <div className="modal">
                    <h2>Rate This Course</h2>
                    <div class="rate">
                        <input type="radio" id="star5" name="rate" value="5"
                            onChange={handleRatingChange}/>
                        <label for="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" 
                            onChange={handleRatingChange}/>
                        <label for="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3"
                            onChange={handleRatingChange}/>
                        <label for="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2"
                            onChange={handleRatingChange}/>
                        <label for="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1"
                        onChange={handleRatingChange}/>
                        <label for="star1" title="text">1 star</label>
                    </div>
                    <div>
                        <textarea
                            name="feedback"
                            rows="4"
                            value={rateData.feedback}
                            onChange={handleFeedbackChange}/>

                    </div>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={togglePopUp}>Close</button>
                </div>
            </div>
        )}
        {successMessage.length > 1 ? 
            <Alert type="success" messages={["Rating submitted successfully!"]} />
            : null}
        {errorMessage.length> 1 ?
            <Alert type="danger" messages={["Error in Rating!"]} />
            : null}
        </div>  
    )
}

export default CourseRating;