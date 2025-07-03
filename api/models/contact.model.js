import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    message: String,
    source: [String],
    category: String,
    pageSource: String,
    company: String,
    country: String,
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
