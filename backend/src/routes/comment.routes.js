import { Router } from "express";

//controllers
import {
    ctrlCreateComment, ctrlDeleteComment, ctrlGetComment, ctrlUpdateComment
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
//Delete comment route
commentRouter.delete('/:commentId', authHeader, validateToken, deleteCommentValidations, ctrlDeleteComment);



export { commentRouter };