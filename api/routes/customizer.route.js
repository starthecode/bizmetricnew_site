import express from 'express';
import {
  getCustomizer,
  updateCustomizer,
} from '../controllers/customizer.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/update/:slug', verifyToken, updateCustomizer);

router.get('/get', getCustomizer);

export default router;
