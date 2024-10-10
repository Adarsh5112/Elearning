import express from 'express'
import register, { loginUser, myProfile, verifyUser } from '../controllers/userControllers.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router()

router.post('/user/register', register)
router.post('/user/verify', verifyUser)
router.post('/user/login', loginUser)
router.get('/user/me', isAuth, myProfile)

export default router;
