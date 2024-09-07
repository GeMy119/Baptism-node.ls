import User from '../config/connectionDB/models/user.js'; // Adjust the path as necessary
import ApiError from '../utils/apiError.js'; // Adjust the path as necessary
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
// /**
//  * Registers a new user.
//  * @param {Object} req - The request object containing user details in the body.
//  * @param {Object} res - The response object to send the response.
//  * @returns {Promise<void>}
//  */

// start reqister
const register = async (req, res) => {
    try {
        const { userName, email, phoneN, password } = req.body;

        // Check if a user with the provided userName or email already exists
        const existingUser = await User.findOne({
            $or: [{ userName }, { email }]
        });

        if (existingUser) {
            throw new ApiError("اسم المستخدم موجود بالفعل", 400);
        }


        // Create a new user object
        const newUser = new User({
            userName,
            email,
            phoneN,
            password
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: "تم التسجيل بنجاح" });
    } catch (error) {
        // Handle errors
        console.error('Error registering user:', error);
        res.status(error.statusCode || 500).json({ message: error.message || "خطأ في الخادم الداخلي" });
    }
};
// end register

// start login
const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ userName });
        if (!user) {
            throw new ApiError("اليوزر غير موجود", 404);
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ApiError("كلمة المرور غير صحيحة", 400);
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, userName: user.userName, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token expires in 1 hour
        );

        // Send a success response with the token
        res.status(200).json({ message: "تم تسجيل الدخول بنجاح", token });
    } catch (error) {
        // Handle errors
        console.error('Error logging in user:', error);
        res.status(error.statusCode || 500).json({ message: error.message || "خطأ في الخادم الداخلي" });
    }
};
// end login


export { register, login };
