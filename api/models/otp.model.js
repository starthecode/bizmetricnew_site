import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    otp: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 6,
    },
    type: {
      type: String,
      required: true,
      enum: ['signup', 'signin', 'forgotpass'],
      default: 'signin',
    },
    attempts: {
      type: Number,
      default: 0,
      max: 5, // Maximum 5 attempts before OTP is invalidated
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries and TTL (Time To Live) for auto-deletion
OtpSchema.index({ email: 1, type: 1 });
OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 }); // Auto-delete after 5 minutes

// Pre-save middleware to ensure email is lowercase and trimmed
OtpSchema.pre('save', function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase().trim();
  }
  next();
});

// Static method to find valid OTP
OtpSchema.statics.findValidOtp = function (email, otp, type) {
  return this.findOne({
    email: email.toLowerCase().trim(),
    otp,
    type,
    isUsed: false,
    attempts: { $lt: 5 }, // Less than 5 attempts
    createdAt: { $gt: new Date(Date.now() - 5 * 60 * 1000) }, // Created within last 5 minutes
  });
};

// Instance method to mark OTP as used
OtpSchema.methods.markAsUsed = function () {
  this.isUsed = true;
  return this.save();
};

// Instance method to increment attempt count
OtpSchema.methods.incrementAttempt = function () {
  this.attempts += 1;
  return this.save();
};

const Otp = mongoose.model('Otp', OtpSchema);

export default Otp;
