import Contact from '../config/connectionDB/models/contactUs.js';
import sendEmail from '../config/sendEmail.js';
import ApiError from '../utils/apiError.js'; // Adjust the path as necessary


// start send contact
const sendContact = async (req, res) => {
    try {
        const { userName, email, phoneN, subject } = req.body;

        // Create a new contact object
        const newContact = new Contact({
            userName,
            email,
            phoneN,
            subject
        });

        // Company email options
        const companySubject = 'طلب تواصل جديد';
        const companyEmail = process.env.EMAIL_USER
        const companyMailOptions = {
            html: `
            <div style="direction: rtl; font-family: Arial, sans-serif; width: 100%;">
             <p style="text-align: center;">مرحبًا،</p>
                <p>لقد تم تقديم طلب تواصل جديد من قبل:</p>
                <ul>
                    <li><strong>الاسم:</strong> ${userName}</li>
                    <li><strong>البريد الإلكتروني:</strong> ${email}</li>
                    <li><strong>رقم الهاتف:</strong> ${phoneN}</li>
                    <li><strong>الموضوع:</strong> ${subject}</li>
                </ul>
                <p style="text-align: center;">مرحبًا برجاء متابعة الطلب في أقرب وقت.</p>
                <p style="text-align: center;">مرحبًا تحياتي،<br>فريق منصة وسيط</p>
            </div>
               
            `
        };

        // User email options
        const userMailSubject = 'تم استلام طلب التواصل الخاص بك'
        const userMailOptions = {
            html: `
            <div style="direction: rtl; font-family: Arial, sans-serif; width: 100%;">
            <p style="text-align: center;">مرحبًا ${userName}،</p>
                <p>شكرًا لتواصلك معنا. لقد تم استلام طلبك بنجاح وسنتواصل معك قريبًا.</p>
                <p><strong>تفاصيل طلبك:</strong></p>
                <ul>
                    <li><strong>الاسم:</strong> ${userName}</li>
                    <li><strong>البريد الإلكتروني:</strong> ${email}</li>
                    <li><strong>رقم الهاتف:</strong> ${phoneN}</li>
                    <li><strong>الموضوع:</strong> ${subject}</li>
                </ul>
                <p style="text-align: center;">تحياتي،<br>فريق منصة وسيط</p>
            </div>
                
            `
        };

        // Send emails
        console.log('Sending email to company:', companyEmail);
        await sendEmail(companyEmail, companySubject, companyMailOptions.html);
        console.log('Email sent to company successfully');

        await sendEmail(email, userMailSubject, userMailOptions.html);
        console.log('Confirmation email sent to user successfully');

        // Save the new contact to the database
        await newContact.save();

        // Send a success response
        res.status(201).json({ message: "تم إرسال الطلب بنجاح" });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error: error.message });
    }
};

// end send contact us


export { sendContact };
