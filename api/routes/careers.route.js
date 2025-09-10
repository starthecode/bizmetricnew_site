import express from 'express';

import { verifyToken } from '../utils/verifyUser.js';
import {
  createCareers,
  getPostById,
  getCareers,
  updateCareersById,
  getCareersBySlug,
} from '../controllers/careers.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createCareers);

router.get('/getCareers', getCareers);

router.get('/get/:postId', verifyToken, getPostById);

router.get('/singleCareers/:slug', getCareersBySlug);

router.put('/update/:postId', verifyToken, updateCareersById);

export default router;
