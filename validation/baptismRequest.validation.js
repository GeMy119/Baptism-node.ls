import { body } from 'express-validator';


// Validation rules for creating a baptism request
const createBaptismRequestValidationRules = () => {
    return [
        body('applicantName').notEmpty().withMessage('الاسم مطلوب'),
        body('whatsAppUser').notEmpty().withMessage('رقم الواتساب الخاص بك مطلوب'),
        body('nameOfTheServiceProvider').notEmpty().withMessage('اسم مزود الخدمه مطلوب'),
        body('whatsAppServicProvider').notEmpty().withMessage(' رقم واتساب مزود الخدمة مطلوب'),
        body('baptismPeriod').notEmpty().withMessage('فتره التعميد مطلوبة'),
        body('servicePrice').isNumeric().withMessage('سعر الخدمة يجب أن يكون رقماً'),
        body('theDayTheBaptismEnded').notEmpty().withMessage('يوم انتهاء التعميد مطلوب'),
        body('agreementDetails').notEmpty().withMessage('تفاصيل الاتفاقية مطلوبة'),
    ];
};
const cancleBaptismRequestValidationRules = () => {
    return [
        body('baptismNumber').notEmpty().withMessage('رقم التعميد مطلوب'),
        body('cancellationReason').notEmpty().withMessage('سبب الألغاء مطلوب مطلوب'),
    ];
};
export { createBaptismRequestValidationRules, cancleBaptismRequestValidationRules }