const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const publicDir = path.join(__dirname, 'public');
const brainDir = 'C:/Users/ASUS/.gemini/antigravity/brain/5a51aa7d-af13-483f-8fd8-cddebfe94ee5';

async function convertImages() {
  const files = [];
  function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) walk(fullPath);
      else files.push(fullPath);
    });
  }
  walk(publicDir);

  const images = files.filter(f => 
    /\.(png|jpe?g)$/i.test(f) && path.basename(f) !== 'og-image.png'
  );

  for (const imgPath of images) {
    const ext = path.extname(imgPath);
    const newPath = imgPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
    console.log(`Converting ${path.basename(imgPath)} to WebP...`);
    try {
      await sharp(imgPath).webp({ quality: 85 }).toFile(newPath);
      fs.unlinkSync(imgPath); // delete original
    } catch (e) {
      console.error(`Failed to convert ${imgPath}:`, e);
    }
  }
}

async function convertVideos() {
  const videos = [
    path.join(publicDir, 'media', 'Dark.mp4'),
    path.join(publicDir, 'media', 'lllll.mp4')
  ];

  for (const vid of videos) {
    if (!fs.existsSync(vid)) {
      console.log(`Video ${path.basename(vid)} not found, skipping.`);
      continue;
    }
    const newPath = vid.replace(/\.mp4$/i, '.webm');
    console.log(`Converting ${path.basename(vid)} to WebM...`);
    await new Promise((resolve, reject) => {
      ffmpeg(vid)
        .outputOptions([
          '-c:v libvpx-vp9',
          '-crf 30',
          '-b:v 0',
          '-deadline realtime',
          '-cpu-used 4'
        ])
        .toFormat('webm')
        .on('end', () => {
          console.log(`Done converting ${path.basename(vid)}`);
          fs.unlinkSync(vid); // delete original
          resolve();
        })
        .on('error', (err) => {
          console.error(`Error converting ${path.basename(vid)}:`, err);
          reject(err);
        })
        .save(newPath);
    });
  }
}

async function createPosters() {
  const darkPosterPath = path.join(publicDir, 'media', 'dark_poster.webp');
  const lightPosterPath = path.join(publicDir, 'media', 'light_poster.webp');
  const darkFrame = path.join(brainDir, 'dark_frame.png');
  const lightFrame = path.join(brainDir, 'light_frame.png');

  if (fs.existsSync(darkFrame)) {
    console.log('Compressing dark_frame.png to dark_poster.webp...');
    await sharp(darkFrame).webp({ quality: 85 }).toFile(darkPosterPath);
  }
  if (fs.existsSync(lightFrame)) {
    console.log('Compressing light_frame.png to light_poster.webp...');
    await sharp(lightFrame).webp({ quality: 85 }).toFile(lightPosterPath);
  }
}

async function main() {
  await convertImages();
  await createPosters();
  await convertVideos();
  console.log('All conversions done!');
}

main().catch(console.error);
