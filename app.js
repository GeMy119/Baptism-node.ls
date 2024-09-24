import express from "express"
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors"
import morgan from "morgan";
import { connection } from "./config/connectionDB/connection.js";
import globalError from "./config/handleError.js";
import ApiError from "./utils/apiError.js";
import userRouter from "./router/user.router.js";
import baptismRequestRouter from "./router/bastimRequest.router.js";
import contactRouter from "./router/contact.router.js";
const app = express()
const port = process.env.PORT || 8001
if (process.env.MODE_ENV === "development") {
    app.use(morgan("dev"))
    console.log(process.env.MODE_ENV)
}
const corsOptions = {
    origin: ['https://minasatwasitsuadi.com', 'www.minasatwasitsuadi.com'], // Allow this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials
};

app.use(cors(corsOptions));
app.use(express.json())
app.set('view engine', 'ejs');
app.use(cors())
app.use(morgan())
app.use(morgan('combined'));
connection()
app.use(globalError)
app.use(userRouter)
app.use(baptismRequestRouter)
app.use(contactRouter)
app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
process.on("unhandledRejection", (err) => {
    console.error(`unhandledRejection errors: ${err.name} | ${err.message}`)
    server.close(() => {
        console.log("shutting down....")
        process.exit(1)
    })
})