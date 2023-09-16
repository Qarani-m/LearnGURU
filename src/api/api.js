import axios from "axios";
import { TOKEN_STORAGE_ID } from "../App";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** api class
 * 
 * Static Class tying together get/send to the API
 * 
 */

class LearnGuruApi {
    // the token for interactions with the API will be stored here
    static token;

    static async init() {
        const token = localStorage.getItem(TOKEN_STORAGE_ID);
        LearnGuruApi.token = token;
    }

    static async request(endpoint, data = {}, method = 'get') {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${LearnGuruApi.token}` };
        const params = (method === 'get')
            ? data : {};
        try {
            const res = (await axios({ url, method, data, params, headers }))
            // Check if the response has a data property before accessing it
            if (res.data) {
                return res.data;
            } else {
                throw new Error("Unexpected response from the server.");
            }
        } catch (err) {
            // Check if err.response exists before accessing its properties
            if (err.res) {
                console.error("API Error:", err.response);
                let message = err.res.data.error.message;
                throw Array.isArray(message) ? message : [message];
            } else {
                console.error("API Error:", err.message);
                throw new Error("Error connecting to the server. Please try again later.");
            }
        }
    }

    // Individual API routes

    /** Get the current user. */

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get all courses */

    static async getCourses(title) {
        let res = await this.request("courses", { title });
        return res.courses;
    }

    /** Get details on a course by course_id. */

    static async getCourse(course_id) {
        let res = await this.request(`courses/${course_id}`);
        return res.course;
    }


    // /** Get all instructors */
    static async getInstructors() {
        let res = await this.request("instructors");
        return res.instructors;
    }
    // Get instructor name by instructor_id
    static async getInstructorName(instructor_id) {
        let res = await this.request(`instructors/${instructor_id}`);
        return res.instructor;
    }

    /** Enroll to a class */

    static async enrollInClass(username, course_id, user_id) {
        console.log("Enrolling User:", username, "in Course:", course_id)
        return await this.request("enrollment", {"user_id": user_id, "course_id": course_id}, "post")
    }

    /** Rate course */
    static async rateCourse(username, user_id, course_id, rating, feedback) {
        const data = {"user_id": user_id, "course_id": course_id, "rating": rating, "feedback": feedback}
        console.log("Rating Course by:", username, "Values:", data);
        return await this.request("rate", data, 'post');
    }

    /** Get token for login from username, password. */

    static async login(data) {
        let res = await this.request(`login`, data, "post");
        return res.token;
    }

    /** Login Instructor and return token */
    static async loginInstructor(data) {
        let res = await this.request("login_instructor", data, "post");
        return res.token
    }

    /** Signup for site. */
    static async register(data) {
        try {
            const res = await this.request("users", data, "post");
            return res.user;
        } catch (error) {
            console.error("Error during signup:", error);
            throw new Error("Error connecting to the server. Please try again later.");
        }
    }


    // Profile page for user    
    static async getProfile(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }


    /** Save user profile page. */

    static async saveProfile(username, data) {
        try{
            const res = await this.request(`users/${username}`, data, "patch");
            return res;
        } catch (error) {
            console.error("Error during updating profile:", error);
            throw(error)
        }
    }
}


export default LearnGuruApi;
