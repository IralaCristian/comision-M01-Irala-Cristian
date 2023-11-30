import { Router } from 'express';

//controllers
import {
  ctrlCreatePost,
  ctrlDeletePost,
  ctrlGetPost,
  ctrlListAllPosts,
  ctrlListUserPosts,
  ctrlUpdatePost,
} from '../controllers/post.controller.js';

//validations
import {
  createPostValidations,
  deletePostValidations,
  getPostValidations,
  listUserPostsValidations,
  updatePostValidations
} from '../models/validations/post-validations.js';

//middlewares
import { authHeader } from '../models/validations/auth-validation.js';
import { validateToken } from '../middlewares/validate-token.js';


const postRouter = Router();


//Obtiene todos los post, no necesita verificación de usuario logueado (Público)
postRouter.get('/', ctrlListAllPosts);

//Obtiene todos los post del usuario logueado
//postRouter.get('/', listUserPostsValidations, ctrlListUserPosts);

postRouter.post('/',authHeader, validateToken, createPostValidations, ctrlCreatePost);
postRouter.get('/:postId', getPostValidations, ctrlGetPost);
postRouter.patch('/:postId', authHeader, validateToken, updatePostValidations, ctrlUpdatePost);
postRouter.delete('/:postId', authHeader, validateToken, deletePostValidations, ctrlDeletePost);

export { postRouter };
