import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Use memory storage (we’ll save manually after conversion)
const upload = multer({ storage: multer.memoryStorage() });

// Define local upload path inside "public/uploads"
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Get original name without extension
    const originalName = path.parse(req.file.originalname).name;
    const webpFileName = `${Date.now()}-${originalName}.webp`;
    const filePath = path.join(uploadDir, webpFileName);

    // Convert buffer to WebP and save locally
    await sharp(req.file.buffer).webp({ quality: 80 }).toFile(filePath);

    // Return only the file name (not full URL)
    res.status(200).json({ fileName: webpFileName });
  } catch (error) {
    console.error('Local upload error:', error.message);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// List uploaded files
router.get('/media', async (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir);

    const fileData = files.map((name) => {
      const stats = fs.statSync(path.join(uploadDir, name));
      return {
        name,
        url: `/uploads/${name}`, // accessible from frontend
        lastModified: stats.mtime,
      };
    });

    // Sort by latest
    fileData.sort(
      (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
    );

    res.status(200).json({ data: fileData, total: files.length });
  } catch (err) {
    console.error('Local media list error:', err.message);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

// Delete file
router.delete('/delete', async (req, res) => {
  try {
    const filename = req.query.name;
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    fs.unlinkSync(filePath);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error('Local delete error:', err.message);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

export default router;
