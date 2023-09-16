const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express();
const { PORT } = require("./config");
const db = require("./db");
const { generateAuthToken, ensureLoggedIn, authenticateJWT } = require("./Middleware/auth");
const userRouter = require("./users/user");
const uuid = require("uuid");
// const authRoutes = require("./Middleware/authRoutes");


// Middleware to parse incoming URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));


// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// User register from userRouter
app.use("/register", userRouter);



// courselist endpoint
app.get("/courses", async (req, res) => {
    try {
        const courses = await db.getAllCourses();
        res.json({ courses });
    } catch (error) {
        console.error("Failed to fetch courses", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// courses by course_id endpoint

app.get(`/courses/:course_id`, async (req, res) => {
    try {
        const course = await db.getCourse(req.params.course_id);
        res.json({ course });
    } catch (error) {
        console.error("Failed to fetch course", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// users endpoint
app.get("/users", async (req, res) => {
    try {
        const users = await db.getUsers();
        res.json({ users });
    } catch (error) {
        console.error("Failed to fetch users", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// users endpoint by username
app.get('/users/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await db.getUserByUsername(username);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        console.error("Failed to fetch user", error);
        res.status(500).json({ error: "Internal server error" });
    }

});
// patch user data
app.patch('/users/:username/', async (req, res) => {
    try {
        const { username, first_name, last_name, email, profile_picture } = req.body
        const user = await db.editUser(username, first_name, last_name, email, profile_picture);
        console.log(user)
        return res.status(200).json({ message: "User profile updated successfully", user });
    } catch (error) {
        console.log("Failed to update user profile.");
        res.status(500).json({error: "Internal server error"});
    }
})



// instructors endpoint
app.get("/instructors", async (req, res) => {
    try {
        const instructors = await db.getInstructors();
        res.json({ instructors });
    } catch (error) {
        console.error("Failed to fetch instructors", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// get instructor name by instructor_id
app.get(`/instructors/:instructor_id`, async (req, res) => {
    try {
        const instructor = await db.getInstructorBio(req.params.instructor_id);
        res.json({ instructor });
    } catch (error) {
        console.error("Failed to fetch instructor", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//  enrollment endpoint
app.get("/enrollment", async (req, res) => {
    try {
        const enrollment = await db.getEnrollment();
        res.json({ enrollment });
    } catch (error) {
        console.error("Failed to fetch enrollment", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// add user to a course and adjust enrollment
app.post('/enrollment', async (req, res) => {
    const { user_id, course_id } = req.body;
    try {
        const enrollment = await db.addEnrollment(user_id, course_id);
        return res.status(201).json({ enrollment });
    } catch (error) {
        console.error("Error during enrollment:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// ratings endpoint
app.get("/ratings", async (req, res) => {
    try {
        const ratings = await db.getRatings();
        res.json({ ratings });
    } catch (error) {
        console.error("Failed to fetch ratings", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Rate a course
app.post("/rate", async(req, res) => {
    const { user_id, course_id, rating, feedback } = req.body;
    try {
        const rate = await db.rateCourse(user_id, course_id, rating, feedback);
        res.json({ rate })
    } catch (error) {
        console.error("Faled to rate course", error)
        res.status(500).json({ error: "Internal server error" })
    }
})

//  validate a login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;


    try {
        const user = await db.getUserByUsername(username);

        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // If the credentials are valid, generate an authentication token
        const token = generateAuthToken(user);
        res.json({ token });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Validate instructor login
app.post("/login_instructor", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user =  await db.getInstructorByEmail(email);

        if (!user || user.password !== password) {
            return res.status(401).json({error: "Invalid credentials"});
        }
        console.log(user)
        const token = generateAuthToken(user);
        res.json({ token });
    } catch (error) {
        console.error("Error during instructor login:", error);
        res.status(500).json({ error: "Internal server error"});
    }
});

// function register new user to users
app.post('/users', async (req, res) => {
    const { username, first_name, last_name, email, password, profile_picture } = req.body;
    const randomUserId = uuid.v4();
    try {

        const user = await db.addUser(randomUserId, username, first_name, last_name, email, password, profile_picture);
        res.status(201).json({ user });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


