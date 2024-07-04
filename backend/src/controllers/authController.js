import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { jwtSecret } from '../config.js';

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      email,
      password,
      name,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      console.log(token);
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// upis linkings
export const linking = async(req, res)=>{
  try {
    const { email, upi, metamask } = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          upiId: upi,
          metamaskId: metamask,
        },
      },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(500).json({ message: 'Failed to update user' });
    }
    return res.status(200).json({ message: 'Links updated successfully', user: updatedUser });

  } catch (error) {
    return res.status(400).json({message: 'server updating error.'});
  }
}

// update use details
export const update = async(req, res)=>{
  try {
    const {name, email, mob, age, dob, address, status} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"Invalid credentials"});
    }

    const updateUser = await User.findOneAndUpdate(
      {email},
      {
        $set:{
          name, 
          mobile:mob, 
          age, 
          dob, 
          address, 
          status,
        },
      },
      {new: true}
    )
    if (!updateUser) {
      return res.status(500).json({ message: 'Failed to update user' });
    }
    return res.status(200).json({ message: 'updated successfully', user: updateUser });

  } catch (error) {
    return res.status(400).json({message: 'server updating error.'});
  }
}