import express from 'express';
import Contact from '../models/contact.model.js';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/sendForm', async (req, res) => {
  const {
    fullName,
    email,
    phone,
    message,
    source,
    category,
    pageSource,
    company,
    country,
  } = req.body;

  // Email validation logic
  const isBusinessEmail = (email) => {
    const publicDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'aol.com',
      'icloud.com',
      'test.com',
      'mail.com',
      'yopmail.com',
    ];
    const domain = email.split('@')[1]?.toLowerCase();
    return domain && !publicDomains.includes(domain);
  };

  const isFakeEmail = (email) => {
    const fakePatterns = [
      /^test/,
      /dummy/,
      /fake/,
      /example/,
      /noreply/,
      /no-reply/,
      /yopmail/,
    ];
    return fakePatterns.some((pattern) => pattern.test(email.toLowerCase()));
  };

  // Conditional validation
  if (category === 'Business Offerings') {
    if (!isBusinessEmail(email)) {
      return res.status(400).json({
        error: 'Please provide a valid business email id.',
      });
    }
  } else {
    if (isFakeEmail(email)) {
      return res.status(400).json({
        error: 'Dummy Email not allowed.',
      });
    }
  }

  // Optional: basic validation
  if (!fullName || !email || !message || !category) {
    return res
      .status(400)
      .json({ error: 'Please fill in all required fields.' });
  }

  // Additional field validations
  if (fullName.length < 5 || fullName.length > 50) {
    return res
      .status(400)
      .json({ error: 'Full name must be between 5 and 50 characters.' });
  }

  if (company && (company.length < 5 || company.length > 50)) {
    return res
      .status(400)
      .json({ error: 'Company name must be between 5 and 50 characters.' });
  }

  const linkPattern = /https?:\/\/|www\./i;
  if (linkPattern.test(message)) {
    return res
      .status(400)
      .json({ error: 'Message should not contain links or URLs.' });
  }

  if (message.length > 200) {
    return res
      .status(400)
      .json({ error: 'Message must be 200 characters or fewer.' });
  }

  if (phone && !/^\+?[0-9]{7,15}$/.test(phone)) {
    return res
      .status(400)
      .json({ error: 'Please enter a valid phone number.' });
  }

  try {
    // Save to MongoDB
    const newContact = new Contact({
      fullName,
      email,
      phone,
      message,
      source,
      category,
      pageSource,
      company,
      country,
    });
    await newContact.save();

    // Configure transporter
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
      to: 'madanmohan.malhotra@bizmetric.com',
      subject: `Bizmetric New Contact Form Inquiry - ${category}`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 10px;">
      <h2 style="color: #f2692a; border-bottom: 1px solid #ccc; padding-bottom: 10px;">New Contact Form Submission</h2>

      <p style="margin: 10px 0;"><strong>Name:</strong><span style="color: #4b4f53;"> ${fullName}</span></p>
      <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}"><span style="color: #4b4f53;"> ${email}</span></a></p>
      <p style="margin: 10px 0;"><strong>Phone:</strong> <span style="color: #4b4f53;"> ${
        phone || 'N/A'
      }</span></p>
      <p style="margin: 10px 0;"><strong>Category:</strong> <span style="color: #4b4f53;"> ${category}</span></p>
          ${
            company
              ? `<p style="margin: 10px 0;"><strong>Company:</strong> <span style="color: #4b4f53;"> ${company}</span></p>`
              : ''
          }

      ${
        country
          ? `<p style="margin: 10px 0;"><strong>Country:</strong> <span style="color: #4b4f53;"> ${country}</span></p>`
          : ''
      }
      <p style="margin: 10px 0;"><strong>Source:</strong> <span style="color: #4b4f53;"> ${
        source?.join(', ') || 'N/A'
      }</span></p>
      <p style="margin: 10px 0;"><strong>Page Source:</strong> <span style="color: #4b4f53;"> ${pageSource}</span></p>

      <h3 style="margin-top: 30px; color: #333;">Message:</h3>
      <p style="background: #cdf9ee; padding: 15px; border-left: 4px solid #1bc095; white-space: pre-line;">
        ${message}
      </p>

      <footer style="margin-top: 30px; font-size: 12px; color: #f2692a; text-align: center;">
        © ${new Date().getFullYear()} BIZ-METRIC PARTNERS. ALL RIGHTS RESERVED.
      </footer>
    </div>
  `,
    };

    // Send email
    const mailResult = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', mailResult.messageId);

    return res
      .status(200)
      .json({ message: 'Form submitted and email sent successfully.' });
  } catch (error) {
    console.error('Error processing form:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while submitting the form.' });
  }
});

router.get('/getInquires', async (req, res) => {
  try {
    const contacts = await Contact.find({});
    return res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({ error: 'Failed to fetch inquiries.' });
  }
});

router.delete('/deleteInquiry', async (req, res) => {
  const { id } = req.body;

  try {
    const del = await Contact.deleteMany({ _id: { $in: id } });
    if (!del) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
