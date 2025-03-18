import express from "express";
import logRoutes from "./logRoutes.js"
import authRoutes from "./authRoutes.js"
import createQR from "./createQR.js"
const router = express.Router();

router.use(logRoutes)
router.use(authRoutes)
router.use(createQR)

export default router;
