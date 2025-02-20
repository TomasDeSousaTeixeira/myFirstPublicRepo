import express from 'express';
import authenticateToken from "../middleware/authenticateToken.js.js";
import { createQrData } from '../utils/QR/createQR.js';
const router = express.Router();

router.post('/createQR',authenticateToken, createQrData);

export default router;