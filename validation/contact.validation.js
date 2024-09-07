import { body } from 'express-validator';

/**
 * Validation rules for user registration.
 */
const contactValidationRules = () => {
    return [
        body('userName')
            .notEmpty().withMessage('اسم المستخدم مطلوب')
            .isLength({ min: 3 }).withMessage('اسم المستخدم يجب أن يحتوي على 3 أحرف على الأقل'),
        body('email')
            .notEmpty().withMessage('البريد الإلكتروني مطلوب')
            .isEmail().withMessage('البريد الإلكتروني غير صالح'),
        body('phoneN')
            .notEmpty().withMessage('رقم الهاتف مطلوب'),
        body('subject')
            .notEmpty().withMessage('الموضوع مطلوب')
    ];
};


export { contactValidationRules };
