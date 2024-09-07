import express from "express"
import { login, register } from "../controller/user.controller.js"
import validate from "../validation/globalValidation.js"
import { loginValidationRules, registerValidationRules } from "../validation/user.validation.js"


const userRouter = express.Router()

userRouter.post("/register", validate(registerValidationRules()), register)
userRouter.post("/login", validate(loginValidationRules()), login)


export default userRouter