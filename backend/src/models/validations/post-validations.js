import { header, param, body } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { applyValidations } from '../../middlewares/apply-validations.js';

export const createPostValidations = [
    body('title')
        .notEmpty().withMessage('El campo { title } no debe estar vacio.')
        .isString().withMessage('El campo { title } debe ser un string.')
        .isLength({ min: 3, max: 100 }).withMessage('El campo { title } debe tener un minimo de 3 carácteres y un maximo de 100'),
    body('description')
        .notEmpty().withMessage('El campo { description } no debe estar vacio.')
        .isString().withMessage('El campo { descripcion } debe ser un String'),
    body('imageURL')
        .notEmpty().withMessage('El campo { imageURL} no debe estar vacio')
        .isURL().withMessage('El campo { imageURL } debe ser una URL'),
    applyValidations,
];

export const listPostsValidations = [
    header('authorization').exists(),
    applyValidations,
];

export const getPostValidations = [
    param('postId')
        .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
        .isString().withMessage('El parametro { postId } debe ser un string.')
        .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
    applyValidations,
];

export const updatePostValidations = [
    param('postId')
        .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
        .isString().withMessage('El parametro { postId } debe ser un string.')
        .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
    body('title')
        .optional()
        .notEmpty().withMessage('El campo { title } no debe estar vacio.')
        .isString().withMessage('El campo { title } debe ser un string.'),
    applyValidations,
];

export const deletePostValidations = [
    param('postId')
        .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
        .isString().withMessage('El parametro { postId } debe ser un string.')
        .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
    applyValidations,
];