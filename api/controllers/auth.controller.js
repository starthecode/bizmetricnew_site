import User from '../models/user.model.js';

import bcryptjs from 'bcryptjs';
import { errorhandler } from '../utils/error.js';

import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
      return next(errorhandler(400, 'All fields are required'));
    }

    const emailUsername = email.split('@')[0];
    const uniqueNumber = Math.floor(1000 + Math.random() * 9000);
    const userName = `${emailUsername}${uniqueNumber}`;
    const hashedPass = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      userName,
      email: email.toLowerCase(),
      password: hashedPass,
    });

    const savedUser = await newUser.save();

    // ✅ Send a proper JSON response
    // res.status(201).json({
    //   message: 'User registered successfully',
    //   user: {
    //     id: savedUser._id,
    //     userName: savedUser.userName,
    //     email: savedUser.email,
    //   },
    // });

    const token = jwt.sign(
      {
        id: savedUser._id,
        isAdmin: savedUser.isAdmin,
        role: savedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '10h' }
    );

    const { password: pass, ...rest } = savedUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: false, // only use true if HTTPS (prod)
        sameSite: 'Lax', // or 'None' if cross-origin + secure
      })
      .json(rest);
  } catch (error) {
    return next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return next(errorhandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorhandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorhandler(400, 'Invalid Password'));
    }

    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin,
        role: validUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '10h' }
    );

    const { password: pass, ...rest } = validUser._doc;

    // 🧪 Debug: Log the token

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: false, // only use true if HTTPS (prod)
        sameSite: 'Lax', // or 'None' if cross-origin + secure
      })
      .json(rest);
  } catch (error) {
    return next(error);
  }
};

// Add this to your auth routes (e.g., auth.route.js)
export const updatePassword = async (req, res, next) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword || email === '' || newPassword === '') {
    return next(errorhandler(400, 'All fields are required'));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorhandler(404, 'User not found'));
    }

    // Hash the new password
    const hashedPassword = bcryptjs.hashSync(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
