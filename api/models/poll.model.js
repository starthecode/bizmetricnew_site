import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema(
  {
    answerName: { type: String, required: true },
    ipAddress: { type: String, required: true },
  },
  { timestamps: true }
);

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
