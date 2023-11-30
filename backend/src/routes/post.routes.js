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

const postRouter = Router();
//const postRouterPublic = Router();

postRouter.post('/', createPostValidations, ctrlCreatePost);

//Obtiene todos los post, no necesita verificacion de usuario logueado (Público)
//postRouterPublic.get('/', ctrlListAllPosts);
//Obtiene todos los post del usuario logueado
postRouter.get('/', listUserPostsValidations, ctrlListUserPosts);

postRouter.get('/:postId', getPostValidations, ctrlGetPost);
postRouter.patch('/:postId', updatePostValidations, ctrlUpdatePost);
postRouter.delete('/:postId', deletePostValidations, ctrlDeletePost);

export { postRouter };
//export { postRouterPublic };