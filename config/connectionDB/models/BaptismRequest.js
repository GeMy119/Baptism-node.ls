import mongoose from 'mongoose';

// Define the schema
const baptismRequestSchema = new mongoose.Schema(
    {
        applicantName: { type: String, required: true },   // اسم صاحب الطلب
        whatsAppUser: { type: String, required: true },    // رقم صاحب الطلب       
        nameOfTheServiceProvider: { type: String, required: true }, // اسم مقدم الخدمة
        whatsAppServicProvider: { type: String, required: true },  // رقم مقدم الخدمة
        baptismPeriod: { type: String, required: true },   // فترة التعميد
        servicePrice: { type: Number, required: true },   // سعر الخدمة
        agreementDetails: { type: String, required: true },  // تفاصيل الاتفاق
        theDayTheBaptismEnded: { type: String, required: true },
        baptismNumber: { type: String, unique: true },     // رقم التعميد
        isCancelled: { type: Boolean, default: false },    // حالة الإلغاء
        cancellationReason: { type: String }               // سبب الإلغاء
    },
    {
        timestamps: true
    }
);

// Function to generate a unique number
const generatebaptismNumber = async () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // آخر رقمين من السنة
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24).toString().padStart(3, '0'); // رقم اليوم في السنة
    const randomPart = Math.floor(100 + Math.random() * 900).toString(); // جزء عشوائي بين 100 و 999

    const baptismNumber = `${year}${dayOfYear}${randomPart}`;
    return baptismNumber;
};

// Create and export the model
const BaptismRequest = mongoose.model('BaptismRequest', baptismRequestSchema);
export { BaptismRequest, generatebaptismNumber };
