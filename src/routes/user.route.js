import { Router } from 'express';
const router = Router();

import {deleteUser, getUser, updateUser, getAllUsers, getAllAdmins, blockUserOrAdmin} from '../controller/user.controller.js';
import { verifyToken } from '../middleware/jwt.js';
import { isAdmin } from '../middleware/isAdmin.js';

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);
router.get("/gusers", verifyToken, isAdmin, getAllUsers);
router.get("/gusers", verifyToken, isAdmin, getAllAdmins);
router.patch("/block/:id", verifyToken, isAdmin, blockUserOrAdmin);
router.patch("/", verifyToken, updateUser);

export default router;