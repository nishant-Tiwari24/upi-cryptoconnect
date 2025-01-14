import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { jwtSecret } from '../config.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = await User.findById(decoded.user.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ msg: 'User not found' });
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;