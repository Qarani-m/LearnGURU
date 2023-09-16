const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        // adds new user to learnGURU db
        const { username, first_name, last_name, email, password, profile_picture } = req.body;

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database using pg-promise
        const addUser = await db.one(
            'INSERT INTO users (username, first_name, last_name, email, password, profile_picture) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [username, first_name, last_name, email, hashedPassword, profile_picture]
        );

        // Remove the hashed password from the response
        delete newUser.password;

        res.status(201).json(addUser);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
