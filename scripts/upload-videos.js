#!/usr/bin/env node

/**
 * Upload videos to Vercel Blob Storage
 *
 * Usage:
 * 1. Set your BLOB_READ_WRITE_TOKEN in .env.local
 * 2. Run: node scripts/upload-videos.js
 */

import { put } from '@vercel/blob';
import { readFileSync } from 'fs';
import { basename } from 'path';

const VIDEOS = [
  'public/assets/work/videos/focusmode.mp4',
  'public/assets/work/videos/landfill-lens.mp4',
];

async function uploadVideos() {
  console.log('🚀 Starting video upload to Vercel Blob Storage...\n');

  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN not found in environment variables');
    console.error('Please add it to your .env.local file');
    console.error('\nGet your token from: https://vercel.com/dashboard/stores');
    process.exit(1);
  }

  const uploadedUrls = {};

  for (const videoPath of VIDEOS) {
    try {
      console.log(`📤 Uploading ${videoPath}...`);

      const fileBuffer = readFileSync(videoPath);
      const fileName = basename(videoPath);

      const blob = await put(`videos/${fileName}`, fileBuffer, {
        access: 'public',
        token: token,
      });

      uploadedUrls[fileName] = blob.url;
      console.log(`✅ Uploaded: ${blob.url}\n`);

    } catch (error) {
      console.error(`❌ Failed to upload ${videoPath}:`, error.message);
    }
  }

  console.log('\n📋 Upload Summary:');
  console.log('─'.repeat(80));
  Object.entries(uploadedUrls).forEach(([name, url]) => {
    console.log(`${name}: ${url}`);
  });
  console.log('─'.repeat(80));

  console.log('\n📝 Next steps:');
  console.log('1. Copy the URLs above');
  console.log('2. Update lib/projectsData.js with the new URLs');
  console.log('3. Remove videos from public/assets/work/videos/');
  console.log('4. Commit changes and deploy to Vercel');
}

uploadVideos().catch(console.error);
