import { Router } from 'express';
const router = Router();
import {register, login, logout, forgotpassword, resetpassword, updatepassword} from '../controller/auth.controller.js';
import { verifyToken } from '../middleware/jwt.js';



router.post('/register', register);
router.post('/login', login);
router.get('/logout', verifyToken, logout);
router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword", resetpassword);
router.post("/updatepassword",verifyToken, updatepassword)


export default router;