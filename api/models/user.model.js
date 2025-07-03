import mongoose from 'mongoose';

const userSchems = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    role: {
      type: [String],
      required: true,
      enum: ['admin', 'manager', 'subscriber', 'user'],
      default: ['user'],
    },
  },

  { timestamps: true }
);

const User = mongoose.model('User', userSchems);

export default User;
