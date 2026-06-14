import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const sourceDir = "d:/Placement/SellSavvy/media";
const destDir = "d:/Placement/SellSavvy/public/media/services";

async function run() {
  try {
    const files = await fs.readdir(sourceDir);
    const jpegs = files.filter(f => f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.jpg'));
    
    console.log(`Found ${jpegs.length} JPEGs in ${sourceDir}`);
    
    await fs.mkdir(destDir, { recursive: true });

    let convertedCount = 0;
    for (const file of jpegs) {
      const sourcePath = path.join(sourceDir, file);
      const baseName = path.basename(file, path.extname(file)).toLowerCase().replace(/_/g, '-');
      const destPath = path.join(destDir, `${baseName}.webp`);

      await sharp(sourcePath)
        .webp({ quality: 80 })
        .toFile(destPath);
        
      console.log(`Converted ${file} to ${baseName}.webp`);
      convertedCount++;
    }
    console.log(`Successfully converted ${convertedCount} images.`);
  } catch (error) {
    console.error("Error converting images:", error);
  }
}

run();
