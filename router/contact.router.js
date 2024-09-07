import express from "express"
import validate from "../validation/globalValidation.js"
import { contactValidationRules } from "../validation/contact.validation.js"
import { sendContact } from "../controller/contact.controller.js"


const contactRouter = express.Router()

contactRouter.post("/sendContact", validate(contactValidationRules()), sendContact)



export default contactRouter