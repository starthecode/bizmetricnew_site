import sharp from 'sharp';
import path from 'path';

import express from 'express';
import multer from 'multer';
import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Use memory storage for Multer (we’ll directly upload to Azure)
const upload = multer({ storage: multer.memoryStorage() });

// Azure Blob Config
const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;
const UPLOAD_CONTAINER = 'uploads'; // you already created this in Azure

// Create Azure container client
const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient(UPLOAD_CONTAINER);

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Get original name without extension
    const originalName = path.parse(req.file.originalname).name;
    const webpFileName = `${Date.now()}-${originalName}.webp`;

    // Convert buffer to WebP using sharp
    const webpBuffer = await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toBuffer();

    // Upload the converted WebP buffer to Azure
    const blockBlobClient = containerClient.getBlockBlobClient(webpFileName);

    await blockBlobClient.uploadData(webpBuffer, {
      blobHTTPHeaders: { blobContentType: 'image/webp' },
    });

    const blobUrl = blockBlobClient.url;

    res.status(200).json({ fileUrl: blobUrl });
  } catch (error) {
    console.error('Azure upload error:', error.message);
    res.status(500).json({ error: 'Failed to upload to Azure' });
  }
});

// Media Library: List all files from "uploads" container
router.get('/media', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const blobs = [];

    // Get all blobs (consider using a more efficient approach for large collections)
    for await (const blob of containerClient.listBlobsFlat()) {
      const blobClient = containerClient.getBlobClient(blob.name);
      const properties = await blobClient.getProperties();

      blobs.push({
        name: blob.name,
        url: blobClient.url,
        lastModified: properties.lastModified,
      });
    }

    // Sort by lastModified DESC (latest first)
    blobs.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

    // Paginate the results
    const paginatedBlobs = blobs.slice(skip, skip + limit);

    res.status(200).json({
      data: paginatedBlobs,
      total: blobs.length,
      page,
      limit,
      hasMore: skip + limit < blobs.length,
    });
  } catch (err) {
    console.error('Azure media list error:', err.message);
    res.status(500).json({ error: 'Failed to list blobs' });
  }
});

// Delete a blob from "uploads" container
router.delete('/delete/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const blobClient = containerClient.getBlockBlobClient(filename);

    const exists = await blobClient.exists();
    if (!exists) {
      return res.status(404).json({ error: 'File not found' });
    }

    await blobClient.delete();
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error('Azure delete error:', err.message);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

export default router;
