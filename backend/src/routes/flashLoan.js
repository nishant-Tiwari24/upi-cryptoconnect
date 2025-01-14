import express from 'express';
import { FLHistoryRead, FLHistoryWrite } from '../controllers/flashLoanController.js';

const router = express.Router();

// router.post('/statusRead', FLStatusRead);
// router.post('/statusWrite', FLStatusWrite);
router.post('/historyRead', FLHistoryRead);
router.post('/historyWrite', FLHistoryWrite);

export default router;