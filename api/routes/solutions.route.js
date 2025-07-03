import express from 'express';

import { verifyToken } from '../utils/verifyUser.js';
import {
  createSolution,
  getPostById,
  getSolutions,
  updateSolutionsById,
  getSolutionBySlug,
} from '../controllers/solutions.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createSolution);

router.get('/getSolutions', getSolutions);

router.get('/get/:postId', verifyToken, getPostById);

router.get('/singleSolution/:slug', getSolutionBySlug);

router.put('/update/:postId', verifyToken, updateSolutionsById);

export default router;
