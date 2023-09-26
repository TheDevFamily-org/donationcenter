// routes/recipients.route.js

import express from 'express';
const router = express.Router();
import { getRecentRecipients } from '../controller/recipients.controller.js';

router.get('/recent', getRecentRecipients);

export default router;
