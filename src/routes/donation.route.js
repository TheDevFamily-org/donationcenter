import { Router } from 'express';
const router = Router();

import {createDonation} from '../controller/donation.controller.js';

router.post("/create-payment-intent/:campaignId", createDonation);

export default router;