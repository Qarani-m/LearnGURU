"use strict";

/** Convenience middleware to handle common auth cases in routes. */
const { verify, sign } = require("react-jwt");

const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");



/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        console.log("authHeader:", authHeader);
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = verify(token, SECRET_KEY);
        }
        return next();
    } catch (err) {
        console.log("error in authenticateJWT", err);
        return next();
    }
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
    try {
        if (!res.locals.user) throw new UnauthorizedError();
        return next();
    } catch (err) {
        return next(err);
    }
}


/** Middleware to use when they be logged in as an admin user.
 *
 *  If not, raises Unauthorized.
 */

function ensureAdmin(req, res, next) {
    try {
        if (!res.locals.user || !res.locals.user.isAdmin) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 *
 *  If not, raises Unauthorized.
 */

function ensureCorrectUserOrAdmin(req, res, next) {
    try {
        const user = res.locals.user;
        if (!(user && (user.isAdmin || user.username === req.params.username))) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (err) {
        return next(err);
    }
};

// // Function to generate an authentication token
function generateAuthToken(user) {
    const payload = {
        username: user.username || user.email,
        password: user.password,
        user_id: user.user_id || user.instructor_id

    };
    const options = {
        expiresIn: "24h", // Set the expiration time for token
    };
    return (payload, SECRET_KEY, options);

};


module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin,
    ensureCorrectUserOrAdmin,
    generateAuthToken,
};
