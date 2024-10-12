import { BaptismRequest, generatebaptismNumber } from '../config/connectionDB/models/BaptismRequest.js';
import sendEmail from '../config/sendEmail.js';
import ApiError from '../utils/apiError.js';

/**
 * Creates a new BaptismRequest.
 * @param {Object} req - The request object containing baptism request details in the body.
 * @param {Object} res - The response object to send the response.
 * @returns {Promise<void>}
 */
const createBaptismRequest = async (req, res) => {
    try {
        const userEmail = req.user.email; // Assuming `userId` is available from authenticated user
        const {
            applicantName,
            whatsAppUser,
            nameOfTheServiceProvider,
            whatsAppServicProvider,
            servicePrice,
            agreementDetails,
            baptismPeriod,
            theDayTheBaptismEnded
        } = req.body;

        // Validate input data
        if (!applicantName || !nameOfTheServiceProvider || !whatsAppServicProvider || !whatsAppUser || !servicePrice || !agreementDetails || !baptismPeriod || !theDayTheBaptismEnded) {
            throw new ApiError('All fields are required', 400);
        }

        // Generate the baptism number before saving
        const baptismNumber = await generatebaptismNumber();

        // Prepare email content for the user
        const emailSubject = 'طلب تعميد جديد';
        const emailHtml = `
            <div style="direction: rtl; font-family: Arial, sans-serif; width: 100%;">
                <h1 style="text-align: center;">معلومات طلب تعميد</h1>
                <p><strong>رقم التعميد:</strong> ${baptismNumber}</p>
                <p><strong>أسم مقدم الطلب:</strong> ${applicantName}</p>
                <p><strong>رقم الواتساب الخاص بمقدم الطلب:</strong> ${whatsAppUser}</p>
                <p><strong>أسم مقدم الخدمة:</strong> ${nameOfTheServiceProvider}</p>
                <p><strong>رقم الواتساب الخاص بمقدم الخدمة:</strong> ${whatsAppServicProvider}</p>
                <p><strong>مبلغ التعميد:</strong> ${servicePrice} ريال</p>
                <p><strong>فترة التعميد بالأيام:</strong> ${baptismPeriod}</p>
                <p><strong>يوم انتهاء التعميد:</strong> ${theDayTheBaptismEnded}</p>
                <p style="text-align: center;">© تعميد عبر منصة وسيط لخدمات التعميد.</p>
            </div>
        `;

        // Prepare email content for admin
        const adminEmailSubject = 'تم تقديم طلب تعميد جديد';
        const adminEmailHtml = `
            <div style="direction: rtl; font-family: Arial, sans-serif; width: 100%;">
                <h1 style="text-align: center;">تم تقديم طلب تعميد جديد</h1>
                <p><strong>أسم مقدم الطلب:</strong> ${applicantName}</p>
                <p><strong>رقم الواتساب الخاص بمقدم الطلب:</strong> ${whatsAppUser}</p>
                <p><strong>أسم مقدم الخدمة:</strong> ${nameOfTheServiceProvider}</p>
                <p><strong>رقم الواتساب الخاص بمقدم الخدمة:</strong> ${whatsAppServicProvider}</p>
                <p><strong>مبلغ التعميد:</strong> ${servicePrice} ريال</p>
                <p><strong>فترة التعميد بالأيام:</strong> ${baptismPeriod}</p>
                <p><strong>يوم انتهاء التعميد:</strong> ${theDayTheBaptismEnded}</p>
                <p>يرجى متابعة حالة الطلب في النظام.</p>
            </div>
        `;

        // Send email to the user
        await sendEmail(userEmail, emailSubject, emailHtml);

        // Send email to admin (replace 'admin@example.com' with your email)
        await sendEmail(process.env.EMAIL_USER, adminEmailSubject, adminEmailHtml);

        // After email is sent, create and save the BaptismRequest object
        const newBaptismRequest = new BaptismRequest({
            applicantName,
            whatsAppUser,
            nameOfTheServiceProvider,
            whatsAppServicProvider,
            servicePrice,
            agreementDetails,
            baptismPeriod,
            theDayTheBaptismEnded,
            baptismNumber
        });

        // Save the new BaptismRequest to the database
        const savedRequest = await newBaptismRequest.save();

        // Send a success response
        res.status(201).json({ message: 'Baptism request created successfully', data: savedRequest });
    } catch (error) {
        // Handle errors
        console.error('Error creating BaptismRequest:', error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
    }
};


const cancelBaptismRequest = async (req, res) => {
    try {
        const userEmail = req.user.email; // Assuming `userId` is available from authenticated user
        const { baptismNumber, cancellationReason } = req.body;

        // Validate input data
        if (!baptismNumber) {
            throw new ApiError('رقم التعميد مطلوب', 400);
        }

        // Find the BaptismRequest by the baptism number
        const baptismRequest = await BaptismRequest.findOne({ baptismNumber });

        if (!baptismRequest) {
            throw new ApiError('طلب التعميد غير موجود', 404);
        }

        // Update the request status to canceled
        baptismRequest.isCancelled = true;
        baptismRequest.cancellationReason = cancellationReason;
        await baptismRequest.save();

        // Prepare email content for the user
        const emailSubject = 'إلغاء طلب التعميد';
        const emailHtml = `
            <div style="direction: rtl; font-family: Arial, sans-serif; width: 100%;">
                <h1 style="text-align: center;">إلغاء طلب التعميد</h1>
                <p>نأسف لإبلاغك بأنه تم إلغاء طلب التعميد رقم: ${baptismRequest.baptismNumber}.</p>
                <p><strong>أسم مقدم الطلب:</strong> ${baptismRequest.applicantName}</p>
                <p><strong>رقم الواتساب الخاص بمقدم الطلب:</strong> ${baptismRequest.whatsAppUser}</p>
                <p><strong>أسم مقدم الخدمة:</strong> ${baptismRequest.nameOfTheServiceProvider}</p>
                <p><strong>رقم الواتساب الخاص بمقدم الخدمة:</strong> ${baptismRequest.whatsAppServicProvider}</p>
                <p><strong>سبب الإلغاء:</strong> ${cancellationReason ? cancellationReason : 'لم يتم توفير سبب للإلغاء'}</p>
                <p>لقد تم إلغاء هذا الطلب بناءً على طلبك. نشكرك على استخدام خدماتنا.</p>
                <p style="text-align: center;">© تعميد عبر منصة وسيط لخدمات التعميد.</p>
            </div>
        `;

        // Send email to the user
        await sendEmail(userEmail, emailSubject, emailHtml);

        // Prepare email content for the admin
        const adminEmailSubject = 'تم إلغاء طلب تعميد';
        const adminEmailHtml = `
            <div style="direction: rtl; font-family: Arial, sans-serif; width: 100%;">
                <h1 style="text-align: center;">إلغاء طلب تعميد</h1>
                <p>تم إلغاء طلب التعميد رقم: ${baptismRequest.baptismNumber}.</p>
                <p><strong>أسم مقدم الطلب:</strong> ${baptismRequest.applicantName}</p>
                <p><strong>رقم الواتساب الخاص بمقدم الطلب:</strong> ${baptismRequest.whatsAppUser}</p>
                <p><strong>أسم مقدم الخدمة:</strong> ${baptismRequest.nameOfTheServiceProvider}</p>
                <p><strong>رقم الواتساب الخاص بمقدم الخدمة:</strong> ${baptismRequest.whatsAppServicProvider}</p>
                <p><strong>سبب الإلغاء:</strong> ${cancellationReason ? cancellationReason : 'لم يتم توفير سبب للإلغاء'}</p>
            </div>
        `;

        // Send email to the admin (replace 'admin@example.com' with the actual admin email)
        await sendEmail('admin@example.com', adminEmailSubject, adminEmailHtml);

        // Send a success response
        res.status(200).json({ message: 'تم إلغاء طلب التعميد بنجاح', data: baptismRequest });
    } catch (error) {
        // Handle errors
        console.error('Error canceling BaptismRequest:', error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
    }
};


export { cancelBaptismRequest, createBaptismRequest }
