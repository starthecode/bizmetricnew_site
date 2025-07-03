import express from 'express';

import { verifyToken } from '../utils/verifyUser.js';
import { deleteById } from '../controllers/action.controller.js';

const router = express.Router();

router.delete('/delete/:type/:postId', verifyToken, deleteById);

export default router;
