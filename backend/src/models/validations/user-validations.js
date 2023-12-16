import { body, param} from 'express-validator';
import { applyValidations } from '../../middlewares/apply-validations.js';
import { UserModel } from '../user.model.js';
import { isValidObjectId } from 'mongoose';


//validaciones para el registro de un nuevo usuario
export const createUserValidations = [

    body('username')
        .notEmpty().withMessage('El campo { username } no debe estar vacio.')
        .isString().withMessage('El campo { username } debe ser un string.')
        //validación para no repetir nombre de usuario
        .custom(async (value) => {
            const user = await UserModel.findOne({ username: value });

            if (user) throw new Error('username already in use');

            return true;
        }),
    body('password')
        .notEmpty().withMessage('El campo { password } no debe estar vacio.')
        .isString().withMessage('El campo { password } debe ser un string.'),
    body('email')
        .notEmpty().withMessage('El campo { email } no debe estar vacio.')
        .isEmail().withMessage('El campo { email } debe ser un email válido.')
        // validación para no tener emails repetidos
        .custom(async (value) => {
            const user = await UserModel.findOne({ email: value });

            if (user) throw new Error('Email already in use');

            return true;
        }),
    body('avatarURL')
        .notEmpty().withMessage('El campo { avatarURL } no debe estar vacio.')
        .isString().withMessage('El campo { avatarURL } debe ser un string.')
        .isURL().withMessage('El campo { avatarURL } debe ser una URL válida.'),
    applyValidations,

];

export const loginUserValidations = [
    body('email')
        .notEmpty().withMessage('El campo { email } no debe estar vacio.')
        .isEmail().withMessage('El campo { email } debe ser un email válido.'),
    body('password')
        .notEmpty().withMessage('El campo { password } no debe estar vacio.')
        .isString().withMessage('El campo { password } debe ser un string.'),
    applyValidations,
];

export const getUserValidations = [
    param('userId')
        .notEmpty().withMessage('El parametro { userId } no debe estar vacio.')
        .isString().withMessage('El parametro { userId } debe ser un string.')
        .custom(isValidObjectId).withMessage('El parametro { userId } debe ser una id valida.'),
    applyValidations,
];