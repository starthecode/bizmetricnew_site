import bcryptjs from 'bcryptjs';
import { errorhandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorhandler(403, 'You are not allowed to update this user'));
  }

  try {
    const updateData = {};

    // Validate and set password if provided
    if (req.body.password && req.body.password.trim() !== '') {
      if (req.body.password.length < 6) {
        return next(
          errorhandler(400, 'Password must be at least 6 characters')
        );
      }
      updateData.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Validate firstName
    if (req.body.firstName) {
      if (req.body.firstName.length < 4 || req.body.firstName.length > 20) {
        return next(
          errorhandler(400, 'First Name must be between 4 and 20 characters')
        );
      }
      updateData.firstName = req.body.firstName;
    }

    // Validate lastName
    if (req.body.lastName) {
      if (req.body.lastName.length < 4 || req.body.lastName.length > 20) {
        return next(
          errorhandler(400, 'Last Name must be between 4 and 20 characters')
        );
      }
      updateData.lastName = req.body.lastName;
    }

    // Validate and set userName
    if (req.body.userName) {
      if (req.body.userName.length < 5 || req.body.userName.length > 10) {
        return next(
          errorhandler(400, 'Username must be between 5 and 10 characters')
        );
      }
      if (req.body.userName.includes(' ')) {
        return next(errorhandler(400, 'Username cannot contain spaces'));
      }
      if (req.body.userName !== req.body.userName.toLowerCase()) {
        return next(errorhandler(400, 'Username must be lowercase'));
      }
      if (!req.body.userName.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          errorhandler(400, 'Username can only contain letters and numbers')
        );
      }
      updateData.userName = req.body.userName;
    }

    // Optional updates
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.profilePicture)
      updateData.profilePicture = req.body.profilePicture;

    // Perform update
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateData },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json('User has been sign out');
  } catch (error) {
    next(error);
  }
};
