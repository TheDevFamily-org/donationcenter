import { Router } from 'express';
const router = Router();

import {intent} from '../controller/donation.controller.js';
import { verifyToken } from '../middleware/jwt.js';
import {isAdmin} from '../middleware/isAdmin.js';

// router.get("/:type", getAll);
// router.get("/",verifyToken, isAdmin, getAllByAdminId);
router.post("/create-payment-intent/:campaignId", intent);
// router.post("/:id", verifyToken, isAdmin, closecampaign);

export default router;