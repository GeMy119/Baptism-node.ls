import express from 'express';
import validate from '../validation/globalValidation.js';
import { cancelBaptismRequestValidationRules, createBaptismRequestValidationRules } from '../validation/baptismRequest.validation.js';
import authenticateUser from '../config/auth.js';
import { cancelBaptismRequest, createBaptismRequest } from '../controller/baptismRequest.controller.js';

const baptismRequestRouter = express.Router();

// Optional authentication middleware
const optionalAuthenticateUser = (req, res, next) => {
    // Check if the user is logged in
    if (req.headers.authorization) {
        // If there is an authorization header, call the authenticateUser middleware
        return authenticateUser(req, res, next);
    }
    // If not logged in, proceed to the next middleware
    next();
};

// Route to create a baptism request
baptismRequestRouter.post(
    '/createBaptism',
    optionalAuthenticateUser, // Use optional authentication
    validate(createBaptismRequestValidationRules()),
    createBaptismRequest
);

// Route to cancel a baptism request
baptismRequestRouter.post(
    '/cancelBaptism',
    authenticateUser, // Require authentication
    validate(cancelBaptismRequestValidationRules()),
    cancelBaptismRequest
);

export default baptismRequestRouter;
