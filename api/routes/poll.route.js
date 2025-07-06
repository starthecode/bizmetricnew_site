import express from 'express';
import Poll from '../models/poll.model.js';

const router = express.Router();

router.post('/submit-poll', async (req, res) => {
  try {
    const { answerName, pollName } = req.body;

    if (!answerName) {
      return res.status(400).json({ error: 'Answer name is required' });
    }

    // Get IP address
    let ipAddress = req.ip;

    if (ipAddress === '::1' || ipAddress === '::ffff:127.0.0.1') {
      ipAddress = '127.0.0.1';
    }

    const alreadySubmitted = await Poll.findOne({ ipAddress });

    if (alreadySubmitted) {
      return res.status(403).json({
        success: false,
        message: 'You have already submitted the poll.',
      });
    }

    // Save to MongoDB
    const newPoll = new Poll({ pollName, answerName, ipAddress });
    await newPoll.save();

    res
      .status(201)
      .json({ message: 'Poll submitted successfully', poll: newPoll });
  } catch (error) {
    console.error('Poll submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/get-polls', async (req, res) => {
  try {
    const data = await Poll.find();

    if (!data) {
      return res.status(400).json({ error: 'No Poll Data Found!' });
    }

    return res.status(201).json({ success: true, pollData: data });
  } catch (error) {}
});

export default router;
