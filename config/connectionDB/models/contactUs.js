// import mongoose from 'mongoose';
// import sendEmail from '../../sendEmail.js';

// // Define the schema
// const contactSchema = new mongoose.Schema(
//     {
//         userName: { type: String, required: true },
//         email: { type: String, required: true },
//         phoneN: { type: String, required: true },
//         subject: { type: String, required: true }
//     },
//     {
//         timestamps: true
//     }
// );

// // Pre-save hook to send emails before saving the contact
// contactSchema.pre('save', async function (next) {
//     const contact = this;

//     // Email to the company to notify about the contact request
//     const companyMailOptions = {
//         text: `
//             مرحبًا،

//             لقد تم تقديم طلب تواصل جديد من قبل:

//             الاسم: ${contact.userName}
//             البريد الإلكتروني: ${contact.email}
//             رقم الهاتف: ${contact.phoneN}
//             الموضوع: ${contact.subject}

//             برجاء متابعة الطلب في أقرب وقت.

//             تحياتي,
//             فريق الموقع
//         `
//     };
//     await sendEmail(process.env.EMAIL_USER, 'طلب تواصل جديد', companyMailOptions)
//     // Email to the user in Arabic confirming receipt of their request
//     const userMailOptions = {
//         to: contact.email,                   // Recipient email (user)
//         subject: 'تم استلام طلب التواصل الخاص بك',
//         text: `
//             مرحبًا ${contact.userName}،

//             شكرًا لتواصلك معنا. لقد تم استلام طلبك بنجاح وسنتواصل معك قريبًا.

//             تفاصيل طلبك:
//             الاسم: ${contact.userName}
//             البريد الإلكتروني: ${contact.email}
//             رقم الهاتف: ${contact.phoneN}
//             الموضوع: ${contact.subject}

//             تحياتي,
//             فريق الموقع
//         `
//     };

// try {
//     // Send email to the company
//     await sendEmail(process.env.EMAIL_USER, 'طلب تواصل جديد', companyMailOptions)
//     console.log('Email sent to company successfully');

//     // Send email to the user
//     await sendEmail(contact.email, 'تم استلام طلب التواصل الخاص بك', userMailOptions)
//     console.log('Confirmation email sent to user successfully');

//     next(); // Proceed with saving the contact
// } catch (error) {
//     console.error('Error sending email:', error);
//     next(error); // Pass the error to the next middleware
// }
// });

// // Create the model
// const Contact = mongoose.model('Contact', contactSchema);

// export default Contact;
import mongoose from 'mongoose';
import sendEmail from '../../sendEmail.js';

// Define the schema
const contactSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true },
        phoneN: { type: String, required: true },
        subject: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

// // Pre-save hook to send emails before saving the contact
// contactSchema.pre('save', async function (next) {
//     const contact = this;

//     // Email to the company to notify about the contact request (HTML format)
//     const companySubject = 'طلب تواصل جديد'
//     const companyMailOptions = {
//         html: `
//             <p>مرحبًا،</p>
//             <p>لقد تم تقديم طلب تواصل جديد من قبل:</p>
//             <ul>
//                 <li><strong>الاسم:</strong> ${contact.userName}</li>
//                 <li><strong>البريد الإلكتروني:</strong> ${contact.email}</li>
//                 <li><strong>رقم الهاتف:</strong> ${contact.phoneN}</li>
//                 <li><strong>الموضوع:</strong> ${contact.subject}</li>
//             </ul>
//             <p>برجاء متابعة الطلب في أقرب وقت.</p>
//             <p>تحياتي،<br>فريق الموقع</p>
//         `
//     };

//     // Email to the user in Arabic confirming receipt of their request (HTML format)
//     const emailUserSubject = 'تم استلام طلب التواصل الخاص بك';
//     const userMailOptions = {
//         html: `
//             <p>مرحبًا ${contact.userName}،</p>
//             <p>شكرًا لتواصلك معنا. لقد تم استلام طلبك بنجاح وسنتواصل معك قريبًا.</p>
//             <p><strong>تفاصيل طلبك:</strong></p>
//             <ul>
//                 <li><strong>الاسم:</strong> ${contact.userName}</li>
//                 <li><strong>البريد الإلكتروني:</strong> ${contact.email}</li>
//                 <li><strong>رقم الهاتف:</strong> ${contact.phoneN}</li>
//                 <li><strong>الموضوع:</strong> ${contact.subject}</li>
//             </ul>
//             <p>تحياتي،<br>فريق الموقع</p>
//         `
//     };

//     try {
//         // Send email to the company
//         await sendEmail('mahmoud.gamal1191998@gmail.com', companySubject, companyMailOptions)
//         console.log('Email sent to company successfully');

//         // Send email to the user
//         await sendEmail(contact.email, emailUserSubject, userMailOptions)
//         console.log('Confirmation email sent to user successfully');

//         next(); // Proceed with saving the contact
//     } catch (error) {
//         console.error('Error sending email:', error);
//         next(error); // Pass the error to the next middleware
//     }
// });

// Create the model
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
