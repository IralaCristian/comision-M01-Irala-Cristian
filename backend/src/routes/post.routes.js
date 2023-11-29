import { Router } from 'express';

//controllers
import {
  ctrlCreatePost,
  ctrlDeletePost,
  ctrlGetPost,
  ctrlListPosts,
  ctrlUpdatePost,
} from '../controllers/post.controller.js';

//validations
import {
  createPostValidations,
  deletePostValidations,
  getPostValidations,
  listPostsValidations,
  updatePostValidations
} from '../models/validations/post-validations.js';

const postRouter = Router();

postRouter.post('/', createPostValidations, ctrlCreatePost);
postRouter.get('/', listPostsValidations, ctrlListPosts);

postRouter.get('/:postId', getPostValidations, ctrlGetPost);
postRouter.patch('/:postId', updatePostValidations, ctrlUpdatePost);
postRouter.delete('/:postId', deletePostValidations, ctrlDeletePost);

export { postRouter };