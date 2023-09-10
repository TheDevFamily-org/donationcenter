import { Router } from 'express';
const router = Router();

import {deleteUser, getUser} from '../controller/user.controller.js';
import { verifyToken } from '../middleware/jwt.js';

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);

export default router;