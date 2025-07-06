import express from 'express';
import Poll from '../models/poll.model.js';

const router = express.Router();

router.post('/submit-poll', async (req, res) => {
  try {
    const { answerName } = req.body;

    console.log('answerName', req.body);

    if (!answerName) {
      return res.status(400).json({ error: 'Answer name is required' });
    }

    // Get IP address
    let ipAddress = req.ip;

    if (ipAddress === '::1' || ipAddress === '::ffff:127.0.0.1') {
      ipAddress = '127.0.0.1';
    }

    // Save to MongoDB
    const newPoll = new Poll({ answerName, ipAddress });
    await newPoll.save();

    res
      .status(201)
      .json({ message: 'Poll submitted successfully', poll: newPoll });
  } catch (error) {
    console.error('Poll submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
