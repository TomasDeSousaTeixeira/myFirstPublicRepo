import express from "express";
import { insertLog } from "../controllers/logs/insertLog.js";
import { getLogs, getLastLogs } from "../controllers/logs/getLogs.js";
import authenticateToken from "../middleware/authenticateToken.js.js";
const router = express.Router();

router.post("/insertLog",authenticateToken, insertLog);
router.get("/myLogs", authenticateToken, getLogs);
router.get("/myLastLogs",authenticateToken, getLastLogs);

export default router;
