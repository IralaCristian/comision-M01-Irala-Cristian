import { Router } from "express";

//controllers
import {
    ctrlCreateComment, ctrlGetComment, ctrlUpdateComment
} from "../controllers/comment.controller.js";

//validations
import {
    createCommentValidations,
    deleteCommentValidations,
    getCommentValidations,
    updateCommentValidations
} from "../models/validations/comment-validations.js";

//Auth middlewares
import { authHeader } from "../models/validations/auth-validation.js";
import { validateToken } from "../middlewares/validate-token.js";

const commentRouter= Router();

//routes

//comment create route
commentRouter.post('/:postId', authHeader, validateToken, createCommentValidations, ctrlCreateComment);
//get comment route
commentRouter.get('/:commentId', authHeader, validateToken, getCommentValidations, ctrlGetComment);
//Update comment route
commentRouter.patch('/:commentId', authHeader, validateToken, updateCommentValidations, ctrlUpdateComment);



export { commentRouter };