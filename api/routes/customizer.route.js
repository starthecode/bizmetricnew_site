import express from 'express';
import {
  getSingleCustomizer,
  updateCustomizer,
} from '../controllers/customizer.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/update/:slug', verifyToken, updateCustomizer);

router.get('/getSingle/:slug', getSingleCustomizer);

export default router;
