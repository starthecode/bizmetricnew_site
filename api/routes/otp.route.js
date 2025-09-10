import express from 'express';
import Otp from '../models/otp.model.js';
import nodemailer from 'nodemailer';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorhandler } from '../utils/error.js';

const router = express.Router();

// Utility to validate only gmail.com
const isProEmail = (email) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain === 'gmail.com';
};

router.post('/getOtp', async (req, res, next) => {
  const { email, password, type } = req.body;

  if (!email || email === '') {
    return next(errorhandler(400, 'Email is required'));
  }

  // For signup and signin, password is required
  if (type !== 'forgotpass' && (!password || password === '')) {
    return next(errorhandler(400, 'Password is required'));
  }

  try {
    // Check if user exists for non-signup flows
    if (type !== 'signup') {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return next(errorhandler(404, 'User not found'));
      }

      // For signin, validate password
      if (type === 'signin') {
        const validPassword = bcryptjs.compareSync(
          password,
          validUser.password
        );
        if (!validPassword) {
          return next(errorhandler(400, 'Invalid password'));
        }
      }
    } else {
      // For signup, check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(errorhandler(400, 'User already registered'));
      }
    }

    // Only Gmail validation
    if (!isProEmail(email)) {
      return next(errorhandler(400, 'Only official accounts are allowed'));
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Delete any existing OTPs for this email
    await Otp.deleteMany({ email });

    // Save to MongoDB
    const newOtp = new Otp({
      email,
      otp,
      type,
      createdAt: new Date(),
    });

    await newOtp.save();

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: `Bizmetric verification code - ${otp}`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 10px;">
        <h2 style="color: #f2692a; border-bottom: 1px solid #ccc; padding-bottom: 10px;">Verify your request</h2>
        <p style="margin: 10px 0;"><strong>OTP:</strong><span style="color: #4b4f53;"> ${otp}</span></p>
        <footer style="margin-top: 30px; font-size: 12px; color: #f2692a; text-align: center;">
          © ${new Date().getFullYear()} BIZ-METRIC PARTNERS. ALL RIGHTS RESERVED.
        </footer>
      </div>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'OTP sent to your email',
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return next(errorhandler(500, 'An error occurred while sending OTP'));
  }
});

router.post('/verifyOtp', async (req, res, next) => {
  const { email, otp, type } = req.body;

  if (!email || !otp) {
    return next(errorhandler(400, 'Email and OTP are required'));
  }

  try {
    // Find matching OTP record
    const record = await Otp.findOne({ email, otp, type });

    console.log('record', record);

    if (!record) {
      return next(errorhandler(400, 'Invalid OTP'));
    }

    // Check OTP expiry (2 minutes)
    const now = Date.now();
    const created = new Date(record.createdAt).getTime();

    if (now - created > 2 * 60 * 1000) {
      // Delete expired OTP
      await Otp.deleteOne({ _id: record._id });
      return next(errorhandler(400, 'OTP expired. Please request again.'));
    }

    // Delete the used OTP
    await Otp.deleteOne({ _id: record._id });

    // Success!
    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      type,
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return next(errorhandler(500, 'An error occurred while verifying OTP'));
  }
});

export default router;
