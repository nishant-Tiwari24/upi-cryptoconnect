import express from 'express';
const router = express.Router();
import { register, login, linking, details, update } from '../controllers/authController.js';

router.post('/register', register);
router.post('/login', login);
router.post('/linking', linking);
router.post('/updatedet', update);

export default router;
