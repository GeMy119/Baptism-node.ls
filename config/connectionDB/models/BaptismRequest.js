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
    // This function should implement the logic to generate a unique number
    // You could use a sequence, a random number, or any other strategy
    const baptismNumber = `${Date.now()}`; // Example: using timestamp for simplicity
    return baptismNumber;
};

// Pre-save hook to add the unique number
baptismRequestSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.baptismNumber = await generatebaptismNumber();
    }
    next();
});

// Create and export the model
const BaptismRequest = mongoose.model('BaptismRequest', baptismRequestSchema);
export default BaptismRequest;
