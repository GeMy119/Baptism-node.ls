import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import { connection } from "./config/connectionDB/connection.js";
import globalError from "./config/handleError.js";
import ApiError from "./utils/apiError.js";
import userRouter from "./router/user.router.js";
import baptismRequestRouter from "./router/bastimRequest.router.js";
import contactRouter from "./router/contact.router.js";

const app = express();
const port = process.env.PORT || 8002;

// CORS configuration
const corsOptions = {
    origin: ['https://minasatwasitsuadi.com', 'https://www.minasatwasitsuadi.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Include OPTIONS
    credentials: true, // Allow credentials (cookies, tokens)
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Explicitly allow headers
    optionsSuccessStatus: 200 // Ensure preflight request returns a success
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests globally
app.options('*', cors(corsOptions));

// Enable morgan logging in development mode
if (process.env.MODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log("Running in development mode");
}

// Parse incoming JSON requests
app.use(express.json());

// Use EJS as the template engine
app.set('view engine', 'ejs');

// Database connection
connection();

// Add logging using morgan for request logging
app.use(morgan('combined'));

// Route Handlers
app.use(userRouter);
app.use(baptismRequestRouter);
app.use(contactRouter);

// Handle undefined routes
app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);

// Start server
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.name} | ${err.message}`);
    server.close(() => {
        console.log("Shutting down the server due to unhandled promise rejection...");
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${err.name} | ${err.message}`);
    server.close(() => {
        console.log("Shutting down the server due to uncaught exception...");
        process.exit(1);
    });
});
