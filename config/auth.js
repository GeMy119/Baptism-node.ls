import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js'; // Adjust the path to your ApiError class

const authenticateUser = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            try {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
                req.user = decodedToken;
                next();
            } catch (error) {
                next(new ApiError('Invalid token', 401)); // Use ApiError for token verification errors
            }
        } else {
            next(new ApiError('No token provided', 401)); // Use ApiError for missing token
        }
    } else {
        next(new ApiError('No authorization header provided', 401)); // Use ApiError for missing authorization header
    }
};

export default authenticateUser;
