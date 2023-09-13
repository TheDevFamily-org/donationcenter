import { Router } from 'express';
const router = Router();

import {createDonation} from '../controller/donation.controller';
import { verifyToken } from '../middleware/jwt.js';
import {isAdmin} from '../middleware/isAdmin.js';

// router.get("/:type", getAll);
// router.get("/",verifyToken, isAdmin, getAllByAdminId);
router.post("/", createDonation);
router.post("/:id", verifyToken, isAdmin, closecampaign);

export default router;