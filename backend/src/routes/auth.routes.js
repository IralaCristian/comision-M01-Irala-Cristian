import { Router } from 'express';
//importo los controladores para el registro y login de usuario
import {
    ctrlCreateUser,
    ctrlLoginUser,
} from '../controllers/user.controller.js';

//importo las validaciones
import {
    loginUserValidations,
    createUserValidations,
} from '../models/validations/user-validations.js';

const authRouter = Router();

authRouter.post('/login', loginUserValidations, ctrlLoginUser);
authRouter.post('/register', createUserValidations, ctrlCreateUser);

export { authRouter };