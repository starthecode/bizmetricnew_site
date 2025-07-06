import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema(
  {
    pollName: { type: String, required: true },
    answerName: { type: String, required: true },
    ipAddress: { type: String, required: true },
  },
  { timestamps: true }
);

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
