import { body } from 'express-validator';

/**
 * Validation rules for user registration.
 */
const registerValidationRules = () => {
    return [
        body('userName')
            .notEmpty().withMessage('اسم المستخدم مطلوب')
            .isLength({ min: 3 }).withMessage('اسم المستخدم يجب أن يحتوي على 3 أحرف على الأقل'),
        body('email')
            .notEmpty().withMessage('البريد الإلكتروني مطلوب')
            .isEmail().withMessage('البريد الإلكتروني غير صالح'),
        body('phoneN')
            .notEmpty().withMessage('رقم الهاتف مطلوب'),
        body('password')
            .notEmpty().withMessage('كلمة المرور مطلوبة')
            .isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل'),
    ];
};

/**
 * Validation rules for user login.
 */
const loginValidationRules = () => {
    return [
        body('userName')
            .notEmpty().withMessage('اسم المستخدم مطلوب')
            .isLength({ min: 3 }).withMessage('اسم المستخدم يجب أن يحتوي على 3 أحرف على الأقل'),
        body('password')
            .notEmpty().withMessage('كلمة المرور مطلوبة'),
    ];
};

export { registerValidationRules, loginValidationRules };
