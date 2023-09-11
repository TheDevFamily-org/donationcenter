import { Router } from 'express';
const router = Router();

import {getAll, getAllByAdminId, createcampaign, closecampaign} from '../controller/campaign.controller.js';
import { verifyToken } from '../middleware/jwt.js';
import {isAdmin} from '../middleware/isAdmin.js';

router.get("/:type", getAll);
router.get("/",verifyToken, isAdmin, getAllByAdminId);
router.post("/",verifyToken, isAdmin, createcampaign);
router.post("/:id", verifyToken, isAdmin, closecampaign);

export default router;