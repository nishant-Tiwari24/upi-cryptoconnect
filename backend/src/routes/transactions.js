import express from 'express';
import { addTransaction, getTransactions } from '../controllers/transactionController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { deleteTransaction } from '../controllers/transactionController.js';

const router = express.Router();

router.post('/', authMiddleware, addTransaction);
router.get('/', authMiddleware, getTransactions);
router.delete('/:id', authMiddleware, deleteTransaction);

export default router;
