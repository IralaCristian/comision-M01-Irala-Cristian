import { Router } from 'express';
//importo los controladores para el registro y login de usuario
import {
    ctrlCreateUser,
    ctrlLoginUser,
    ctrlGetUser,
} from '../controllers/user.controller.js';

//importo las validaciones
import {
    loginUserValidations,
    createUserValidations,
    getUserValidations,
} from '../models/validations/user-validations.js';

const authRouter = Router();

authRouter.post('/login', loginUserValidations, ctrlLoginUser);
authRouter.get('/:userId', getUserValidations, ctrlGetUser);
authRouter.post('/register', createUserValidations, ctrlCreateUser);

export { authRouter };