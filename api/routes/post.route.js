import express from 'express';

import {
  createPost,
  deletePostById,
  getPostById,
  getPostBySlug,
  getPosts,
  updatePostById,
} from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createPost);

router.get('/getPosts', getPosts);

router.get('/get/:postId', verifyToken, getPostById);

router.get('/getpost/:slug', getPostBySlug);

router.delete('/delete/:postId', verifyToken, deletePostById);

router.put('/update/:postId', verifyToken, updatePostById);

export default router;
