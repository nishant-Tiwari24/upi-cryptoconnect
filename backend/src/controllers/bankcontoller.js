import BankDetails from '../models/bank.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User.js';
import requestMoney from '../models/requestMoney.js';

const generateUpiId = () => {
  return `upi${crypto.randomBytes(6).toString('hex')}`;
};

export const linking = async (req, res) => {
  try {
    const { upi, metamask } = req.body;
    const userId = req.user.id;
    console.log(userId);
    if (!upi || !metamask) {
      return res.status(400).json({ message: 'UPI and Metamask IDs are required' });
    }

    const r = await requestMoney.create(
      {
        user: userId,
        upi: upi,
        metamask: metamask,
      });

    const updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      {
        $set: {
          upiId: upi,
          metamaskId: metamask,
          requests: r._id,
        },
        kyc: true,
      },
      { new: true }
    );

    await updatedUser.save();
    if (!updatedUser) {
      return res.status(500).json({ message: 'Failed to update user', updatedUser });
    }

    return res.status(200).json({ message: 'Links updated successfully', user: updatedUser });

  } catch (error) {
    const { bid } = req.body;
    await BankDetails.deleteOne({_id:bid});
    return res.status(500).json({ message: 'Server updating error: ' + error });
  }
};

export const addBankDetails = async (req, res) => {
  const { bankName, ifscCode, accountHolder, accountAddress, accountType, amount } = req.body;
  const userId = req.user.id; 

  try {
    let bankDetails = await BankDetails.findOne({ user: userId });
    if (bankDetails) {
      return res.status(400).json({ message: 'Bank details already exist for this user' });
    }

    const upiId = generateUpiId();

    bankDetails = new BankDetails({
      user: userId,
      bankName,
      ifscCode,
      accountHolder,
      accountAddress,
      accountType,
      amount,
      upiId,
    });

    const bd = await bankDetails.save();
    console.log(bd);

    return res.status(201).json({ message: 'Bank details added successfully', upiId, id:bd._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const usersWithBankAccounts = await BankDetails.find().distinct('user');

    const users = await User.find({ _id: { $in: usersWithBankAccounts } }).select('name');
    const bankDetails = await BankDetails.find({ user: { $in: usersWithBankAccounts } });
    const usersWithDetails = users.map(user => {
      const userBankDetails = bankDetails.find(detail => detail.user.toString() === user._id.toString());
      const userDetails = {
        _id: user._id,
        name: user.name,
        bankDetails: userBankDetails ? {
          accountNumber: userBankDetails.accountNumber,
          bankName: userBankDetails.bankName,
          branchName: userBankDetails.branchName,
          ifscCode: userBankDetails.ifscCode,
          upiId: userBankDetails.upiId,
          balance: userBankDetails.amount,
          createdAt: userBankDetails.createdAt,
          updatedAt: userBankDetails.updatedAt
        } : null
      };

      return userDetails;
    });

    res.json(usersWithDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}


export const getLoggedUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;  
    const userWithBankAccount = await BankDetails.findOne({ user: userId });

    if (!userWithBankAccount) {
      return res.status(404).json({ msg: 'No bank details found for this user' });
    }

    const user = await User.findById(userId).select('name');
    const userDetails = {
      _id: user._id,
      name: user.name,
      bankDetails: {
        bankName: userWithBankAccount.bankName,
        ifscCode: userWithBankAccount.ifscCode,
        upiId: userWithBankAccount.upiId,
        balance: userWithBankAccount.amount,
        createdAt: userWithBankAccount.createdAt,
        updatedAt: userWithBankAccount.updatedAt,
      }
    };

    res.json(userDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
