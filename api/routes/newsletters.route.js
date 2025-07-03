import express from 'express';

import { verifyToken } from '../utils/verifyUser.js';
import {
  createNewsletter,
  getPostById,
  getNewsletters,
  updateNewslettersById,
  getNewsletterBySlug,
} from '../controllers/newsletters.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createNewsletter);

router.get('/getNewsletters', getNewsletters);

router.get('/get/:postId', verifyToken, getPostById);

router.get('/singleNewsletter/:slug', getNewsletterBySlug);

router.put('/update/:postId', verifyToken, updateNewslettersById);

export default router;
