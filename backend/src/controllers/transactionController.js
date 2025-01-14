import Transaction from '../models/Transaction.js';

export const addTransaction = async (req, res) => {
  try {
    const { amount, currency, category, description, transactionType } = req.body;

    const newTransaction = new Transaction({
      userId: req.user.id,
      amount,
      currency,
      category,
      description,
      transactionType,
    });

    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ timestamp: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getIncome = async (req, res) => {
  const { month } = req.params;
  const startDate = new Date(month);
  const endDate = new Date(month);
  endDate.setMonth(endDate.getMonth() + 1);

  try {
    const income = await Transaction.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(req.user.id), transactionType: 'credit', timestamp: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } }
    ]);

    res.status(200).json(income);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const deleteTransaction = async (req, res) => {
  const transactionId = req.params.id;

  try {
    // Find the transaction by ID and ensure it belongs to the current user
    const transaction = await Transaction.findOneAndDelete({
      _id: transactionId,
      userId: req.user.id, // Assuming req.user.id is available from authentication middleware
    });

    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    res.json({ msg: 'Transaction deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};