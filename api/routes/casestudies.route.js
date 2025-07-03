import express from 'express';

import { verifyToken } from '../utils/verifyUser.js';
import {
  createCasestudies,
  getPostById,
  getCasestudies,
  updateCasestudiesById,
  getCasestudiesBySlug,
} from '../controllers/casestudies.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createCasestudies);

router.get('/getCasestudies', getCasestudies);

router.get('/get/:postId', verifyToken, getPostById);

router.get('/singleCasestudies/:slug', getCasestudiesBySlug);

router.put('/update/:postId', verifyToken, updateCasestudiesById);

export default router;
