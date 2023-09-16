const { Pool } = require("pg");
const { getDatabaseUri } = require("./config");

const pool = new Pool({
    connectionString: getDatabaseUri(),
});

// Function to get all available courses from the database
async function getAllCourses() {
    const query = "SELECT * FROM courses";
    const { rows } = await pool.query(query);
    return rows;

}


// Get a specifc course by course_id
async function getCourse(course_id) {
    const query = "SELECT * FROM courses WHERE course_id = $1";
    const { rows } = await pool.query(query, [course_id]);
    return rows[0];
}

// Function to get all users from database
async function getUsers() {
    const query = "SELECT * FROM users";
    const { rows } = await pool.query(query);
    return rows;
}
// Function to get all users from database
async function getEnrollment() {
    const query = "SELECT * FROM enrollments";
    const { rows } = await pool.query(query);
    return rows;
}
// Function to get all users from database
async function getInstructors() {
    const query = "SELECT * FROM instructors";
    const { rows } = await pool.query(query);
    return rows;
}

// Function to get Instructor name by instructor_id
async function getInstructorName(instructor_id) {
    const query = "SELECT * FROM instructors WHERE instructor_id = $1";
    const { rows } = await pool.query(query, [instructor_id]);
    return rows[0];
}

// Function to get Instructor bio by instructor_id
async function getInstructorBio(instructor_id) {
    const query = "SELECT * FROM instructors WHERE instructor_id = $1";
    const { rows } = await pool.query(query, [instructor_id]);
    return rows[0];
}




// Function to get all users from database
async function getRatings() {
    const query = "SELECT * FROM ratings";
    const { rows } = await pool.query(query);
    return rows;
}

// Rate Course
async function rateCourse(user_id, course_id, rating, feedback) {
    const query = "INSERT INTO ratings (user_id, course_id, rating, review) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [user_id, course_id, rating, feedback]
    const { rows } = await pool.query(query, values);
    return rows[0];
}

// getuser by username from database
async function getUserByUsername(username) {
    const query = "SELECT * FROM users WHERE username = $1";
    const { rows } = await pool.query(query, [username]);
    return rows[0];
}

// getinstructor by email from the database
async function getInstructorByEmail(email) {
    const query = "SELECT * FROM instructors WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
}

async function addUser(user_id, username, first_name, last_name, email, password, profile_picture) {
    try {
        const query = "INSERT INTO users ( user_id, username, first_name, last_name, email, password, profile_picture) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
        const values = [user_id, username, first_name, last_name, email, password, profile_picture];
        console.log("Add User Query:", query, "Values:", values);

        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error("Error in addUser:", error);
        throw error;
    }
}

async function editUser(username, first_name, last_name, email, profile_picture) {
    try {
        const query = "UPDATE users SET first_name=$1, last_name=$2, email=$3, profile_picture=$4 WHERE username=$5 RETURNING *";
        const values = [first_name, last_name, email, profile_picture, username];
        console.log("Editing User Query:", query, 'Values:', values);

        const { rows } = await pool.query(query, values)
        if (rows.length === 0) {
            throw new Error("No rows were updated."); // Handle this case based on your requirements
        }
        return rows[0]
    } catch (error) {
        console.error("Error Editing User:", error);
        throw error;
    }
}

async function addEnrollment(user_id, course_id) {
    try {
        const currentDate = new Date();
        const query = "INSERT INTO enrollments (user_id, course_id, enrollment_date) VALUES ($1, $2, $3) RETURNING *";
        const values = [user_id, course_id, currentDate];
        console.log("Add Course Enrollment Query:", query, "Values", values);

        const { rows } = await pool.query(query, values);
        return rows[0]
    } catch (error) {
        console.log("Error during Course Enrollment:", error);
        throw error;
    }
}


module.exports = {
    getAllCourses,
    getCourse,
    getUsers,
    getEnrollment,
    getInstructors,
    getInstructorName,
    getInstructorBio,
    getRatings,
    getUserByUsername,
    addUser,
    addEnrollment,
    editUser,
    getInstructorByEmail,
    rateCourse
};
