import express from 'express';
import validate from '../validation/globalValidation.js';
import { cancleBaptismRequestValidationRules, createBaptismRequestValidationRules } from '../validation/baptismRequest.validation.js';

import authenticateUser from '../config/auth.js';
import { cancelBaptismRequest, createBaptismRequest } from '../controller/baptismRequest.controller.js';
const baptismRequestRouter = express.Router();

baptismRequestRouter.post('/createBaptism', validate(createBaptismRequestValidationRules()), authenticateUser, createBaptismRequest);
baptismRequestRouter.post('/cancleBaptism', validate(cancleBaptismRequestValidationRules()), authenticateUser, cancelBaptismRequest);




export default baptismRequestRouter;