import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import transactionRoutes from './routes/transactions.js';
import { connectDB } from './database/config.js'; 
import bankRoutes from './routes/BankRoutes.js';
import { config } from 'dotenv';
import bankRoutes from './routes/bank.js';
import moneyTransferRoutes from './routes/moneyTransferRoutes.js';
import FLRoutes from './routes/flashLoan.js';


config({
  path:'./.env',
})
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/bank', bankRoutes);
app.use('/api/money-transfer', moneyTransferRoutes);
app.use('/loan', FLRoutes);


const PORT = 5550;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
