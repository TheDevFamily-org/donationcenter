import { Router } from 'express';
const router = Router();

import {createSubscription, confirm} from '../controller/subscription.controller.js';
import { verifyToken } from '../middleware/jwt.js';
import {isAdmin} from '../middleware/isAdmin.js';

router.post("/create-payment-subscription",verifyToken, isAdmin, createSubscription);
router.put("/", verifyToken, confirm)


export default router;