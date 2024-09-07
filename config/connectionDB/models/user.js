import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the schema
const userSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        phoneN: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    // Check if the password is modified (e.g., on update)
    if (!this.isModified('password')) return next();

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDED));
        // Hash the password
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// // Add a method to compare passwords
// userSchema.methods.comparePassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.model('User', userSchema);

export default User;
