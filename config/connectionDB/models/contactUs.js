import mongoose from 'mongoose';

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


const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
