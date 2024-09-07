import { validationResult } from 'express-validator';

/**
 * A global validation function to handle request validation.
 * @param {Array} validations - Array of validation rules from express-validator.
 * @returns {Function} Middleware function for validation.
 */
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
};

export default validate;
