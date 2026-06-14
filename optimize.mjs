import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../../../../../d:/Placement/SellSavvy'); // Need to target the right dir when running from scratch

const directoriesToProcess = [
  "d:/Placement/SellSavvy/public/media/services/carousel",
  "d:/Placement/SellSavvy/public/media/services/reference",
  "d:/Placement/SellSavvy/public/brand"
];

async function optimizeImages() {
  for (const dir of directoriesToProcess) {
    const fullPath = path.resolve(dir);
    try {
      const files = await fs.readdir(fullPath);
      for (const file of files) {
        if (file.toLowerCase().endsWith(".png")) {
          const inputPath = path.join(fullPath, file);
          const outputPath = path.join(fullPath, file.replace(/\.png$/i, ".webp"));
          
          console.log(`Optimizing: ${inputPath}`);
          await sharp(inputPath)
            .webp({ quality: 80, effort: 6 })
            .toFile(outputPath);
            
          console.log(`Created: ${outputPath}`);
        }
      }
    } catch (err) {
      console.error(`Error processing directory ${dir}:`, err);
    }
  }
}

optimizeImages().then(() => console.log("Done")).catch(console.error);
