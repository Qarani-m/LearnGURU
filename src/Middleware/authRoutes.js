const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureCorrectUserOrAdmin } = require('./auth');
const db = require('../db');


// Route to get all users (only for admin)
router.get("/profile", ensureLoggedIn, (req, res) => {
    try {
        const user = res.locals.user;
        res.json({ user });
    } catch (error) {
        console.error("Failed to fetch users", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




// Route to update user information (only for authenticated user or admin)

router.put('/users/:username', ensureCorrectUserOrAdmin, async (req, res, next) => {
    const { username } = req.params;
    const updatedUserData = req.body; // Data to update the user

    try {
        // Check if the user exists and update the user
        // Example: const updatedUser = await updateUser(username, updatedUserData);

        // Send the updated user as a response (this can be adjusted based on your needs)
        // Example: res.json({ user: updatedUser });
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        // Handle errors
        next(error);
    }
});

module.exports = router;
