import express from 'express';
import {login} from "../controllers/auth/login.js"
import {register} from '../controllers/auth/register.js';
import {refreshToken} from '../controllers/auth/refreshToken.js';
import {logout} from '../controllers/auth/logout.js';
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post("/refresh-token", refreshToken);
router.post('/logout', logout);
export default router;