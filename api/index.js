import express from 'express';
import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import cors from 'cors';

import path from 'path';
import userRoutes from './routes/user.route.js';

import authRoutes from './routes/auth.route.js';

import uploadRoutes from './routes/upload.route.js';

import pageRoutes from './routes/pages/page.route.js';

import postRoutes from './routes/post.route.js';
import solutionsRoutes from './routes/solutions.route.js';

import casestudiesRoutes from './routes/casestudies.route.js';

import newslettersRoutes from './routes/newsletters.route.js';

import settingsRoutes from './routes/settings.route.js';

import customizerRoutes from './routes/customizer.route.js';

import actionRoutes from './routes/action.route.js';

import contactRoutes from './routes/contact.route.js';

import blogRoutes from './routes/blog.route.js';

import pollRoutes from './routes/poll.route.js';

import compression from 'compression';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Database is connected'))
  .catch((err) => {
    console.log('error:', err);
  });

const __dirname = path.resolve();

const app = express();

app.use(compression());

// Middleware
app.use(express.json()); // Add this if you're handling JSON requests

app.use(cookieParser());

// Allow CORS from your frontend
app.use(
  cors({
    origin: 'http://localhost:5173', // Vite dev server
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes
app.use('/api/user', userRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/file', uploadRoutes);

app.use('/api/page', pageRoutes);

app.use('/api/post', postRoutes);

app.use('/api/solutions', solutionsRoutes);
app.use('/api/casestudies', casestudiesRoutes);

app.use('/api/newsletters', newslettersRoutes);

app.use('/api/settings', settingsRoutes);

app.use('/api/customizer', customizerRoutes);

app.use('/api/action', actionRoutes);

app.use('/api/poll', pollRoutes);

app.use('/api/contact', contactRoutes);
app.use('/api/blog/', blogRoutes);

app.set('trust proxy', true);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Serve static files
// app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/assets', express.static(path.join(__dirname, 'api', 'assets')));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
