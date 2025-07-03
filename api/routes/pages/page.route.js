import express from 'express';
import { verifyToken } from '../../utils/verifyUser.js';
import { createPage } from '../../controllers/page.controller.js';

import { getPages } from '../../controllers/page.controller.js';

import { getPageById } from '../../controllers/page.controller.js';

import { getPageBySlug } from '../../controllers/page.controller.js';

import { deletePageById } from '../../controllers/page.controller.js';

import { updatePageById } from '../../controllers/page.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createPage);

router.get('/getpages', getPages);

router.get('/get/:pageId', verifyToken, getPageById);

router.get('/getpage/:slug', getPageBySlug);

router.delete('/delete/:pageId', verifyToken, deletePageById);

router.put('/update/:pageId', verifyToken, updatePageById);

export default router;
