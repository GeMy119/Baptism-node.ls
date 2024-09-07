import nodemailer from 'nodemailer';

// Configure the transporter with your email service
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
        user: "baptism769@gmail.com", // Your email address
        pass: "rwirzscunnxftddg"  // Your email password or app-specific password
    }
});

// Function to send an email
const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER, // Sender address
            to,                        // List of recipients
            subject,                   // Subject line
            html                       // Plain text body
        });

        console.log('Email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

export default sendEmail;
